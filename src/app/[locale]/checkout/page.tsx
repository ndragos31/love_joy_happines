"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart, CartItem } from "@/lib/context/CartContext";
import { getFreeQuantity, getItemEffectivePrice } from "@/lib/utils/price";
import { Elements } from "@stripe/react-stripe-js";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import Image from "next/image";

// Promo code config - category-restricted discounts
const JOY10_EXCLUDED_SLUGS = ["etichete", "flyere"];

const isJoy10Eligible = (item: CartItem) =>
  !item.product.categories.some((cat) =>
    JOY10_EXCLUDED_SLUGS.some((slug) => cat.slug.includes(slug))
  );

const promoCodeConfig: Record<string, { discount: number; filter: (item: CartItem) => boolean }> = {
  JOY10: { discount: 0.1, filter: isJoy10Eligible },
};

const inputClassName =
  "h-12 w-full rounded-2xl border border-line bg-surface px-4 transition outline-none placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary-soft";

const labelClassName = "mb-2 block text-sm font-medium";

// Payment form component
interface OrderData {
  orderNumber: string;
  customerName: string;
  customerType?: string;
  companyName?: string;
  cui?: string;
  regCom?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postalCode: string;
  items: Array<{
    name: string;
    quantity: number;
    freeQuantity?: number;
    price: number;
    attributes?: Record<string, string>;
  }>;
  subtotal: number;
  discount?: number;
  shipping: number;
  total: number;
  promoCode?: string;
  paymentMethod: string;
}

function CheckoutForm({
  onSuccess,
  orderData,
}: {
  onSuccess: () => void;
  orderData: OrderData;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const t = useTranslations("checkout");
  const tErrors = useTranslations("errors");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    // Store order data before payment starts (in case of redirect)
    if (orderData) {
      sessionStorage.setItem("pendingOrder", JSON.stringify(orderData));
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || tErrors("paymentFailed"));
      setProcessing(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (confirmError) {
      setError(confirmError.message || tErrors("paymentFailed"));
      setProcessing(false);
      return;
    }

    // This will never be reached due to redirect, but keep for completeness
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <PaymentElement />
      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 font-medium text-white transition duration-200 hover:bg-primary-hover active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {processing ? t("processing") : t("pay")}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const tForms = useTranslations("forms");
  const tErrors = useTranslations("errors");
  const tOffer = useTranslations("freeItemOffer");
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const { items, subtotal, clearCart, removeItem } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "ramburs">(
    "ramburs"
  );
  const [formData, setFormData] = useState({
    // Customer type
    customerType: "individual", // "individual" or "company"
    // Company information
    companyName: "",
    cui: "",
    regCom: "",
    // Shipping information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
    postalCode: "",
    // Payment information
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderItems, setOrderItems] = useState<typeof items>([]);
  const [finalSubtotal, setFinalSubtotal] = useState<number>(0);
  const [finalShipping, setFinalShipping] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>("");
  const [promoCodeError, setPromoCodeError] = useState<string>("");

  // Shipping cost calculation - fixed standard shipping
  const getShippingCost = () => {
    if (subtotal > 200) return 0; // Free shipping over 200 Lei
    return 25; // Standard shipping cost
  };

  const shipping = getShippingCost();
  
  const calculateDiscount = useCallback((code: string, cartItems: CartItem[]): number => {
    const config = promoCodeConfig[code.toUpperCase()];
    if (!config) return 0;
    const eligibleSubtotal = cartItems
      .filter(config.filter)
      .reduce((sum, item) => sum + getItemEffectivePrice(item) * item.quantity, 0);
    return eligibleSubtotal * config.discount;
  }, []);

  const discount = appliedPromoCode ? calculateDiscount(appliedPromoCode, items) : 0;
  const total = subtotal - discount + shipping;

  useEffect(() => {
    if (step === 2 && paymentMethod === "card") {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch(() => {
          // Handle error silently or show user-friendly message
        });
    }
  }, [step, total, paymentMethod]);

  const handleApplyPromoCode = () => {
    setPromoCodeError("");
    const code = promoCode.trim().toUpperCase();
    
    if (!code) {
      setPromoCodeError(tErrors("promoRequired"));
      return;
    }

    // Validate the promo code
    const config = promoCodeConfig[code];
    const hasEligibleItems = config ? items.some(config.filter) : false;
    if (config && hasEligibleItems) {
      setAppliedPromoCode(code);
      setPromoCode("");
      setPromoCodeError("");
    } else {
      setPromoCodeError(tErrors("promoInvalid"));
      setPromoCode("");
    }
  };

  const handleRemovePromoCode = () => {
    setAppliedPromoCode("");
    setPromoCode("");
    setPromoCodeError("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle autofill
  useEffect(() => {
    const interval = setInterval(() => {
      const autofillInputs = document.querySelectorAll(
        "input:-webkit-autofill"
      );
      autofillInputs.forEach((input) => {
        const inputElement = input as HTMLInputElement;
        if (inputElement.value && inputElement.name) {
          setFormData((prev) => {
            if (
              prev[inputElement.name as keyof typeof prev] !==
              inputElement.value
            ) {
              return {
                ...prev,
                [inputElement.name]: inputElement.value,
              };
            }
            return prev;
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sendOrderEmails = useCallback(async () => {
    try {
      const orderDetails = {
        orderNumber,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerType: formData.customerType,
        companyName: formData.companyName,
        cui: formData.cui,
        regCom: formData.regCom,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        county: formData.county,
        postalCode: formData.postalCode,
        items: items.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          freeQuantity: getFreeQuantity(item.product, item.quantity),
          price: Number(item.product.price),
          attributes: item.selectedAttributes || undefined,
        })),
        subtotal,
        discount: appliedPromoCode ? calculateDiscount(appliedPromoCode, items) : 0,
        shipping,
        total,
        promoCode: appliedPromoCode || undefined,
        paymentMethod: paymentMethod === "card" ? "Card" : "Ramburs",
      };

      const response = await fetch("/api/send-order-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...orderDetails, locale }),
      });

      if (!response.ok) {
        throw new Error("Failed to send order emails");
      }

      await response.json();
    } catch {
      // Handle error silently or show user-friendly message
    }
  }, [
    orderNumber,
    formData.customerType,
    formData.companyName,
    formData.cui,
    formData.regCom,
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.phone,
    formData.address,
    formData.city,
    formData.county,
    formData.postalCode,
    items,
    subtotal,
    shipping,
    total,
    paymentMethod,
    appliedPromoCode,
    locale,
    calculateDiscount,
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2 && paymentMethod === "ramburs") {
      // Generate order number before setting step to 3
      const uniqueId = uuidv4();
      const orderPrefix = "LJH";
      const year = new Date().getFullYear();
      const newOrderNumber = `${orderPrefix}-${uniqueId.slice(0, 8)}-${year}`;
      setOrderNumber(newOrderNumber);
      // Store current cart items and totals
      setOrderItems([...items]);
      const finalDiscount = appliedPromoCode ? calculateDiscount(appliedPromoCode, items) : 0;
      setFinalSubtotal(subtotal);
      setFinalShipping(shipping);
      setFinalTotal(subtotal - finalDiscount + shipping);
      // Then set step to 3
      setStep(3);
    }
  };

  // Separate useEffect for handling order completion actions
  // Use a ref to track if emails have been sent to prevent duplicates
  const emailsSentRef = useRef(false);

  useEffect(() => {
    if (step === 3 && orderNumber && !emailsSentRef.current) {
      emailsSentRef.current = true;

      // Send confirmation emails
      sendOrderEmails()
        .then(() => {
          // Clear the cart only after emails are sent
          clearCart();
        })
        .catch(() => {
          // Reset the flag so emails can be retried if needed
          emailsSentRef.current = false;
        });
    }
  }, [step, orderNumber, clearCart, sendOrderEmails]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <header className="container-custom pt-14 pb-10 md:pt-20 md:pb-14">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance md:text-7xl">
            {t("heading")}
          </h1>
          <ol className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[t("steps.delivery"), t("steps.payment"), t("steps.confirmation")].map((label, index) => (
              <li
                key={label}
                aria-current={step === index + 1 ? "step" : undefined}
                className={`border-t-2 pt-3 text-sm font-medium transition-colors ${
                  index < step ? "border-primary" : "border-line text-muted"
                }`}
              >
                <span className={`block font-display tabular-nums ${index < step ? "text-primary" : ""}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {label}
              </li>
            ))}
          </ol>
        </header>

        <div className="container-custom grid gap-10 pb-20 md:pb-28 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {step === 1 && (
              <form onSubmit={handleSubmit}>
                <section className="rounded-4xl bg-surface p-6 sm:p-8">
                  <h2 className="font-display text-2xl font-medium">{t("deliveryInfo")}</h2>

                  <fieldset className="mt-6">
                    <legend className={labelClassName}>{t("customerType")}</legend>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
                      <label className="flex h-12 cursor-pointer items-center gap-3 rounded-2xl border border-line px-4 transition-colors hover:border-foreground/40 has-checked:border-primary has-checked:bg-primary-soft">
                        <input
                          type="radio"
                          name="customerType"
                          value="individual"
                          checked={formData.customerType === "individual"}
                          onChange={handleChange}
                          className="size-4 accent-primary"
                        />
                        {t("individual")}
                      </label>
                      <label className="flex h-12 cursor-pointer items-center gap-3 rounded-2xl border border-line px-4 transition-colors hover:border-foreground/40 has-checked:border-primary has-checked:bg-primary-soft">
                        <input
                          type="radio"
                          name="customerType"
                          value="company"
                          checked={formData.customerType === "company"}
                          onChange={handleChange}
                          className="size-4 accent-primary"
                        />
                        {t("company")}
                      </label>
                    </div>
                  </fieldset>

                  {formData.customerType === "company" && (
                    <div className="mt-6 grid gap-5 rounded-3xl bg-sand p-5 sm:grid-cols-2 sm:p-6">
                      <div className="sm:col-span-2">
                        <label htmlFor="companyName" className={labelClassName}>
                          {tForms("companyName")} <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required={formData.customerType === "company"}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label htmlFor="cui" className={labelClassName}>
                          {tForms("cui")} <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          id="cui"
                          name="cui"
                          value={formData.cui}
                          onChange={handleChange}
                          required={formData.customerType === "company"}
                          className={inputClassName}
                        />
                      </div>
                      <div>
                        <label htmlFor="regCom" className={labelClassName}>
                          {tForms("regCom")} <span className="text-primary">*</span>
                        </label>
                        <input
                          type="text"
                          id="regCom"
                          name="regCom"
                          value={formData.regCom}
                          onChange={handleChange}
                          required={formData.customerType === "company"}
                          className={inputClassName}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 grid gap-5 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="firstName" className={labelClassName}>
                        {tForms("firstName")} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={inputClassName}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="lastName" className={labelClassName}>
                        {tForms("lastName")} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={inputClassName}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="email" className={labelClassName}>
                        {tForms("email")} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={(e) => {
                          handleChange(e);
                        }}
                        required
                        className={inputClassName}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className={labelClassName}>
                        {tForms("phone")} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={inputClassName}
                      />
                    </div>
                    <div className="sm:col-span-6">
                      <label htmlFor="address" className={labelClassName}>
                        {tForms("address")} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className={inputClassName}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="city" className={labelClassName}>
                        {tForms("city")} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className={inputClassName}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="county" className={labelClassName}>
                        {tForms("county")} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="county"
                        name="county"
                        value={formData.county}
                        onChange={handleChange}
                        required
                        className={inputClassName}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="postalCode" className={labelClassName}>
                        {tForms("postalCode")} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        className={inputClassName}
                      />
                    </div>
                  </div>
                </section>

                <div className="mt-6 flex flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
                  <Link href="/cart" className="group inline-flex items-center gap-2 font-medium">
                    <ArrowLeftIcon />
                    <span className="underline decoration-foreground/20 decoration-2 underline-offset-8 transition-colors group-hover:decoration-primary">
                      {t("backToCart")}
                    </span>
                  </Link>
                  <button
                    type="submit"
                    className="group inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 font-medium text-white transition duration-200 hover:bg-primary-hover active:scale-98 sm:w-auto"
                  >
                    {t("continueToPayment")}
                    <ArrowRightIcon />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <section className="rounded-4xl bg-surface p-6 sm:p-8">
                <h2 className="font-display text-2xl font-medium">{t("paymentMethod")}</h2>

                <div className="mt-6 grid gap-3">
                  <label className="flex cursor-pointer items-center gap-4 rounded-3xl border border-line p-4 transition-colors hover:border-foreground/40 has-checked:border-primary has-checked:bg-primary-soft sm:p-5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value as "card" | "ramburs"
                        )
                      }
                      className="size-4 shrink-0 accent-primary"
                    />
                    <span className="grow">
                      <span className="block font-medium">{t("cardPayment")}</span>
                      <span className="mt-0.5 block text-sm text-muted">{t("cardPaymentDesc")}</span>
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-primary">
                      <CardIcon />
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-4 rounded-3xl border border-line p-4 transition-colors hover:border-foreground/40 has-checked:border-primary has-checked:bg-primary-soft sm:p-5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ramburs"
                      checked={paymentMethod === "ramburs"}
                      onChange={(e) =>
                        setPaymentMethod(
                          e.target.value as "card" | "ramburs"
                        )
                      }
                      className="size-4 shrink-0 accent-primary"
                    />
                    <span className="grow">
                      <span className="block font-medium">{t("cashOnDelivery")}</span>
                      <span className="mt-0.5 block text-sm text-muted">{t("cashOnDeliveryDesc")}</span>
                    </span>
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-primary">
                      <CashIcon />
                    </span>
                  </label>
                </div>

                {paymentMethod === "card" && clientSecret && (
                  <div className="mt-8 border-t border-line pt-8">
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        locale: locale === "en" ? "en" : "ro",
                        appearance: {
                          theme: "stripe",
                          variables: {
                            colorPrimary: "#7a2bbf",
                            colorBackground: "#ffffff",
                            colorText: "#1f1b16",
                            colorDanger: "#b42318",
                            borderRadius: "16px",
                            fontFamily: "Geist, system-ui, sans-serif",
                          },
                        },
                      }}
                    >
                      <CheckoutForm
                        orderData={{
                          orderNumber: `LJH-${uuidv4().slice(
                            0,
                            8
                          )}-${new Date().getFullYear()}`,
                          customerName: `${formData.firstName} ${formData.lastName}`,
                          customerType: formData.customerType,
                          companyName: formData.companyName,
                          cui: formData.cui,
                          regCom: formData.regCom,
                          email: formData.email,
                          phone: formData.phone,
                          address: formData.address,
                          city: formData.city,
                          county: formData.county,
                          postalCode: formData.postalCode,
                          items: items.map((item) => ({
                            name: item.product.name,
                            quantity: item.quantity,
                            freeQuantity: getFreeQuantity(item.product, item.quantity),
                            price: Number(item.product.price),
                          })),
                          subtotal,
                          shipping,
                          total,
                          paymentMethod: "Card",
                        }}
                        onSuccess={() => {
                          // Payment successful callback (may not execute due to redirect)
                        }}
                      />
                    </Elements>
                  </div>
                )}

                {paymentMethod === "ramburs" && (
                  <form
                    onSubmit={handleSubmit}
                    className="mt-8 flex flex-col-reverse items-center gap-5 border-t border-line pt-8 sm:flex-row sm:justify-between"
                  >
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="group inline-flex cursor-pointer items-center gap-2 font-medium"
                    >
                      <ArrowLeftIcon />
                      <span className="underline decoration-foreground/20 decoration-2 underline-offset-8 transition-colors group-hover:decoration-primary">
                        {t("backToDelivery")}
                      </span>
                    </button>
                    <button
                      type="submit"
                      className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 font-medium text-white transition duration-200 hover:bg-primary-hover active:scale-98 sm:w-auto"
                    >
                      {t("placeOrder")}
                    </button>
                  </form>
                )}
              </section>
            )}

            {step === 3 && (
              <section className="flex flex-col items-center rounded-4xl bg-surface px-6 py-12 text-center sm:px-10 md:py-16">
                <span className="grid size-20 place-items-center rounded-full bg-success/10 text-success">
                  <CheckIcon className="size-10" />
                </span>
                <p className="mt-6 text-sm font-medium text-muted">{t("orderConfirmation")}</p>
                <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-balance md:text-5xl">
                  {t("thankYou")}
                </h2>
                <p className="mt-4 max-w-md text-pretty text-muted">{t("orderPlaced")}</p>

                <dl className="mt-8 grid w-full max-w-md gap-5 rounded-3xl bg-sand p-6 text-left sm:grid-cols-2">
                  <div>
                    <dt className="text-sm text-muted">{t("orderNumber")}</dt>
                    <dd className="mt-1 font-medium break-all">{orderNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted">{t("orderTotal")}</dt>
                    <dd className="mt-1 font-display text-2xl tabular-nums">{finalTotal.toFixed(2)} lei</dd>
                  </div>
                </dl>

                <Link
                  href="/products"
                  className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-8 font-medium text-background transition duration-200 hover:bg-primary active:scale-98"
                >
                  {t("continueShopping")}
                </Link>
              </section>
            )}
          </div>

          <div className="lg:col-span-5">
            <aside className="rounded-4xl bg-sand p-6 sm:p-8 lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-medium">{t("orderSummary")}</h2>

              <ul className="mt-6 grid gap-4">
                {(step === 3 ? orderItems : items).map((item) => (
                  <li key={item.id} className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5 sm:flex">
                    <Link
                      href={`/products/${item.id}`}
                      className="relative row-span-2 size-12 shrink-0 overflow-hidden rounded-2xl bg-surface transition-opacity hover:opacity-80 sm:size-16"
                    >
                      {item.product.images &&
                      item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0].src}
                          alt={
                            item.product.images[0].alt || item.product.name
                          }
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="grid h-full place-items-center px-1 text-center text-xs text-muted">
                          {t("noImage")}
                        </span>
                      )}
                    </Link>
                    <div className="min-w-0 grow">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="line-clamp-2 text-sm font-medium transition-colors hover:text-primary"
                      >
                        {item.product.name}
                      </Link>
                      {item.selectedAttributes && Object.keys(item.selectedAttributes).length > 0 && (
                        <p className="mt-0.5 text-xs text-muted">
                          {Object.entries(item.selectedAttributes).map(([key, value], index) => (
                            <span key={`${item.id}-attr-${key}-${index}`}>
                              {index > 0 && ", "}
                              <span className="font-medium text-foreground">{key}:</span> {value}
                            </span>
                          ))}
                        </p>
                      )}
                      <p className="mt-0.5 text-xs text-muted">
                        {t("quantity")} {item.quantity}
                        {getFreeQuantity(item.product, item.quantity) > 0 && (
                          <span className="font-medium whitespace-nowrap text-success">
                            {" "}
                            {tOffer("freeLine", { count: getFreeQuantity(item.product, item.quantity) })}
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="col-start-2 shrink-0 font-display tabular-nums">
                      {(
                        Number(item.product.price) * item.quantity
                      ).toFixed(2)}{" "}
                      lei
                    </p>
                    {step < 3 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        title={t("removeItem")}
                        aria-label={t("removeItem")}
                        className="col-start-3 row-span-2 row-start-1 -mr-2 grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-error/10 hover:text-error"
                      >
                        <CloseIcon />
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              {step < 3 && (
                <div className="mt-6 border-t border-line pt-6">
                  {appliedPromoCode ? (
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-success/10 px-4 py-3">
                      <span className="flex items-center gap-2 text-sm font-medium text-success">
                        <CheckIcon className="size-5" />
                        {t("promoApplied")} {appliedPromoCode}
                      </span>
                      <button
                        type="button"
                        onClick={handleRemovePromoCode}
                        className="cursor-pointer text-sm font-medium text-muted underline decoration-foreground/20 decoration-2 underline-offset-4 transition-colors hover:text-error hover:decoration-error"
                      >
                        {t("removePromo")}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="promoCode" className={labelClassName}>
                        {t("promoCode")}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="promoCode"
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value.toUpperCase());
                            setPromoCodeError("");
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleApplyPromoCode();
                            }
                          }}
                          placeholder={t("promoPlaceholder")}
                          className={`${inputClassName} min-w-0`}
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromoCode}
                          disabled={!promoCode.trim()}
                          className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition duration-200 enabled:hover:bg-primary enabled:active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {t("applyPromo")}
                        </button>
                      </div>
                      {promoCodeError && (
                        <p className="mt-2 text-sm text-error">{promoCodeError}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <dl className="mt-6 grid gap-3 border-t border-line pt-6">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted">{t("subtotal")}</dt>
                  <dd className="font-display text-lg tabular-nums">
                    {step === 3
                      ? finalSubtotal.toFixed(2)
                      : subtotal.toFixed(2)}{" "}
                    lei
                  </dd>
                </div>

                {(discount > 0 || (step === 3 && appliedPromoCode)) && (
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-muted">
                      {t("discount")} {appliedPromoCode && `(${appliedPromoCode})`}
                    </dt>
                    <dd className="font-display text-lg text-success tabular-nums">
                      -{step === 3
                        ? (appliedPromoCode ? calculateDiscount(appliedPromoCode, orderItems) : 0).toFixed(2)
                        : discount.toFixed(2)} lei
                    </dd>
                  </div>
                )}

                <div className="flex items-baseline justify-between gap-4">
                  <dt className="text-muted">{t("shipping")}</dt>
                  <dd
                    className={`font-display text-lg tabular-nums ${
                      (step === 3 ? finalShipping : shipping) === 0 ? "text-success" : ""
                    }`}
                  >
                    {(step === 3 ? finalShipping : shipping) === 0
                      ? t("shippingFreeValue")
                      : `${(step === 3 ? finalShipping : shipping).toFixed(
                          2
                        )} lei`}
                  </dd>
                </div>

                <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-line pt-5">
                  <dt className="font-medium">{t("total")}</dt>
                  <dd className="font-display text-3xl font-medium tabular-nums">
                    {step === 3 ? finalTotal.toFixed(2) : total.toFixed(2)}{" "}
                    lei
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

const CheckIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    aria-hidden
  >
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const CardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3 10h18M7 15h3" />
  </svg>
);

const CashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="size-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 10v4M18 10v4" />
  </svg>
);

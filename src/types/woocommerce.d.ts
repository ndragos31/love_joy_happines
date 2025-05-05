declare module "@woocommerce/woocommerce-rest-api" {
  interface WooCommerceRestApiOptions {
    url: string;
    consumerKey: string;
    consumerSecret: string;
    version?: string;
    wpAPIPrefix?: string;
    queryStringAuth?: boolean;
    timeout?: number;
    axiosConfig?: unknown;
  }

  interface WooCommerceRestApiResponse {
    data: unknown;
    status: number;
    headers: Record<string, string>;
  }

  class WooCommerceRestApi {
    constructor(options: WooCommerceRestApiOptions);
    get(
      endpoint: string,
      params?: Record<string, unknown>
    ): Promise<WooCommerceRestApiResponse>;
    post(
      endpoint: string,
      data: unknown,
      params?: Record<string, unknown>
    ): Promise<WooCommerceRestApiResponse>;
    put(
      endpoint: string,
      data: unknown,
      params?: Record<string, unknown>
    ): Promise<WooCommerceRestApiResponse>;
    delete(
      endpoint: string,
      params?: Record<string, unknown>
    ): Promise<WooCommerceRestApiResponse>;
    options(
      endpoint: string,
      params?: Record<string, unknown>
    ): Promise<WooCommerceRestApiResponse>;
  }

  export default WooCommerceRestApi;
}

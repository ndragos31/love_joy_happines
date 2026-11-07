"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./LabelScene.module.css";

type Phase = "sheet" | "peel" | "fly" | "flat" | "wrapped" | "shine" | "leave";

const STAGE_WIDTH = 520;
const labelTones = ["#7a2bbf", "#cf4f78", "#4f8a76", "#d07a26"];
const applySteps: [Phase, number][] = [
  ["sheet", 900],
  ["peel", 600],
  ["fly", 650],
  ["flat", 560],
  ["wrapped", 420],
];
const sheetSlots = [styles.slotTopLeft, styles.slotBottomLeft, styles.slotBottomRight];

const wait = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const toneStyle = (index: number) =>
  ({ "--tone": labelTones[index % labelTones.length] }) as React.CSSProperties;

interface LabelSceneProps {
  labelNames: string[];
  caption: string;
  subtitle: string;
  miniSubtitle: string;
  sheetNote: string;
  description: string;
}

export default function LabelScene({
  labelNames,
  caption,
  subtitle,
  miniSubtitle,
  sheetNote,
  description,
}: LabelSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("wrapped");
  const [labelIndex, setLabelIndex] = useState(0);
  const [typedName, setTypedName] = useState(labelNames[0]);
  const [captionName, setCaptionName] = useState(labelNames[0]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const observer = new ResizeObserver(() =>
      scene.style.setProperty("--scale", String(scene.clientWidth / STAGE_WIDTH))
    );
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let isCancelled = false;

    const play = async () => {
      for (let round = 0; ; round++) {
        const index = round % labelNames.length;
        const name = labelNames[index];
        setLabelIndex(index);
        setTypedName("");

        for (const [nextPhase, duration] of applySteps) {
          if (isCancelled) return;
          setPhase(nextPhase);
          await wait(duration);
        }

        for (let length = 1; length <= name.length; length++) {
          if (isCancelled) return;
          setTypedName(name.slice(0, length));
          await wait(120);
        }

        if (isCancelled) return;
        setCaptionName(name);
        setPhase("shine");
        await wait(2400);

        if (isCancelled) return;
        setPhase("leave");
        await wait(520);
      }
    };

    play();
    return () => {
      isCancelled = true;
    };
  }, [labelNames]);

  const isTyping = phase === "wrapped" && typedName !== labelNames[labelIndex];

  return (
    <div ref={sceneRef} role="img" aria-label={description} data-phase={phase} className={styles.scene}>
      <div className={styles.stage}>
        <div className={styles.table} />

        <div className={styles.sheet}>
          {sheetSlots.map((slotClassName, slotIndex) => (
            <div key={slotClassName} className={`${styles.slot} ${slotClassName}`}>
              <div className={styles.label} style={toneStyle(slotIndex + 1)}>
                <span className={styles.wash} />
                <div className={styles.text}>
                  <span className={styles.name}>{labelNames[(slotIndex + 1) % labelNames.length]}</span>
                  <span className={styles.subtitle}>{miniSubtitle}</span>
                </div>
              </div>
            </div>
          ))}
          <div className={`${styles.slot} ${styles.slotTopRight}`} />
          <span className={styles.sheetNote}>{sheetNote}</span>
        </div>

        <div className={styles.bottleShadow} />
        <div className={styles.bottle}>
          <div className={styles.cap} />
          <div className={styles.glass}>
            <span className={styles.glint} />
          </div>
        </div>

        <div
          className={`${styles.label} ${styles.flying} ${isTyping ? styles.typing : ""}`}
          style={toneStyle(labelIndex)}
        >
          <span className={styles.wash} />
          <div className={styles.text}>
            <span className={styles.name}>{typedName}</span>
            <span className={styles.subtitle}>{subtitle}</span>
            <span className={styles.brand}>Love Joy Happiness</span>
          </div>
          <span className={styles.shade} />
          <span className={styles.shine} />
        </div>

        <span className={`${styles.spark} ${styles.sparkTopLeft}`} />
        <span className={`${styles.spark} ${styles.sparkTopRight}`} />
        <span className={`${styles.spark} ${styles.sparkBottomLeft}`} />
        <span className={`${styles.spark} ${styles.sparkBottomRight}`} />
      </div>

      <p className="absolute bottom-4 left-4 hidden items-center gap-2.5 rounded-full bg-background/90 py-2 pr-4 pl-3 text-sm shadow-soft sm:inline-flex">
        <span className="h-2 w-3 -rotate-12 rounded-full bg-primary" />
        {caption} <b className="font-semibold">{captionName}</b>
      </p>
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState, type ElementType, type CSSProperties } from "react";

export interface TextRevealProps {
  text: string;
  hoverText?: string;
  as?: ElementType;
  href?: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: string;
  staggerDelay?: number;
  duration?: number;
  easing?: string;
  color?: string;
  hoverColor?: string;
  hoverPalette?: string[];
  direction?: "up" | "down";
  onClick?: (e: React.MouseEvent) => void;
}

const TextReveal = React.memo(function TextReveal({
  text,
  hoverText,
  as: Component = "a",
  href,
  target,
  className = "",
  style,
  fontSize = "3rem",
  staggerDelay = 25,
  duration = 250,
  easing = "ease-in-out",
  color = "inherit",
  hoverColor = "#b2c73a",
  hoverPalette,
  direction = "up",
  onClick,
}: TextRevealProps) {
  const [hovered, setHovered] = useState(false);
  const [displayColor, setDisplayColor] = useState(color);
  const colorTimerRef = useRef<number | null>(null);

  const chars = useMemo(() => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (s) => s.segment);
    }
    return [...text];
  }, [text]);

  const hoverChars = useMemo(() => {
    if (!hoverText) return [];
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(hoverText), (s) => s.segment);
    }
    return [...hoverText];
  }, [hoverText]);

  const offsetEm = 1;
  const palette = hoverPalette?.length ? hoverPalette : null;

  const clearColorTimer = () => {
    if (colorTimerRef.current !== null) {
      window.clearInterval(colorTimerRef.current);
      colorTimerRef.current = null;
    }
  };

  useEffect(() => {
    clearColorTimer();

    if (!hovered) {
      setDisplayColor(color);
      return;
    }

    if (!palette) {
      setDisplayColor(hoverColor);
      return;
    }

    let index = 0;
    setDisplayColor(palette[index] ?? color);

    if (palette.length === 1) return;

    const stepMs = Math.max(18, Math.round(duration / palette.length));
    colorTimerRef.current = window.setInterval(() => {
      index += 1;
      if (index >= palette.length) {
        clearColorTimer();
        setDisplayColor(palette[palette.length - 1]);
        return;
      }
      setDisplayColor(palette[index]);
    }, stepMs);

    return clearColorTimer;
  }, [hovered, palette, color, hoverColor, duration]);

  const rootProps: Record<string, unknown> = {
    className: `inline-block relative no-underline font-extrabold uppercase tracking-tight overflow-hidden cursor-pointer select-none ${className}`.trim(),
    style: {
      fontSize,
      color: displayColor,
      transition: "color 0.35s ease",
      padding: 0,
      lineHeight: 0.92,
      ...style,
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
    "aria-label": hoverText ?? text,
  };

  if (Component === "a") {
    rootProps.href = href ?? "#";
    if (target) rootProps.target = target;
    if (target === "_blank") rootProps.rel = "noopener noreferrer";
  }

  return (
    <Component {...rootProps}>
      {hoverText ? (
        <span
          className="relative inline-grid w-fit align-top whitespace-nowrap overflow-visible"
          style={{ lineHeight: 0.92 }}
          aria-hidden="true"
        >
          <span
            className="col-start-1 row-start-1 inline-flex whitespace-nowrap"
            style={{
              opacity: hovered ? 0 : 1,
              transform: hovered ? "translateY(-0.18em)" : "translateY(0)",
              transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
              willChange: "opacity, transform",
            }}
          >
            {chars.map((char, i) => (
              <span
                key={`base-${i}`}
                className="inline-block"
                style={{ transitionDelay: `${i * staggerDelay}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
          <span
            className="col-start-1 row-start-1 inline-flex whitespace-nowrap"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(0.18em)",
              transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
              willChange: "opacity, transform",
            }}
          >
            {hoverChars.map((char, i) => (
              <span
                key={`hover-${i}`}
                className="inline-block"
                style={{ transitionDelay: `${i * staggerDelay}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </span>
      ) : (
        <span
          className="inline-flex relative whitespace-nowrap"
          style={{ height: `${offsetEm}em` }}
          aria-hidden="true"
        >
          {chars.map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                transition: `opacity ${duration}ms ${easing}`,
                opacity: 1,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </span>
      )}
    </Component>
  );
});

TextReveal.displayName = "TextReveal";
export { TextReveal };

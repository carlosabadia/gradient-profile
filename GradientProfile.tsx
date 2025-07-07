import { cn } from 'clsx-for-tailwind';
import React, { useMemo } from 'react';

interface GradientProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string | number;
  className?: string;
  availableColors?: string[];
}

const PREDEFINED_COLORS = [
  "tomato", "ruby",
  "crimson", "pink", "plum", "purple", "iris", "indigo", "blue",
  "cyan", "teal", "jade", "green", "grass", "brown", "orange", "sky", "mint",
  "lime", "yellow", "amber", "gold", "bronze",
];

const SHADES = [9, 10, 11];
const SHADES_COUNT = SHADES.length;

function simpleHashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const GradientProfile: React.FC<GradientProfileProps> = ({
  text,
  className,
  availableColors = PREDEFINED_COLORS,
  ...restProps
}) => {
  const inputTextAsString = useMemo(() => String(text), [text]);

  const seed = useMemo(() => simpleHashCode(inputTextAsString), [inputTextAsString]);

  const normalizedAvailableColors = useMemo(() => {
    return availableColors.length > 0 ? availableColors : PREDEFINED_COLORS;
  }, [availableColors]);

  const { color1, color2 } = useMemo(() => {
    const numAvailable = normalizedAvailableColors.length;
    const index1 = seed % numAvailable;
    const c1 = normalizedAvailableColors[index1];

    const secondarySeed = simpleHashCode(String(seed));
    let index2 = secondarySeed % numAvailable;

    if (index2 === index1) {
      index2 = (index1 + 1) % numAvailable;
    }
    const c2 = normalizedAvailableColors[index2];

    return { color1: c1, color2: c2 };
  }, [normalizedAvailableColors, seed]);

  const shade1 = SHADES[seed % SHADES_COUNT];
  const shade2Seed = simpleHashCode(String(seed));
  const shade2 = SHADES[shade2Seed % SHADES_COUNT];

  const gradientStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(to bottom, var(--${color1}-${shade1}), var(--${color2}-${shade2}))`,
  }), [color1, color2, shade1, shade2]);

  const combinedClassName = cn(
    "size-4 pointer-events-none",
    className
  );

  return (
    <div
      style={gradientStyle}
      className={combinedClassName}
      role="img"
      {...restProps}
    />
  );
};

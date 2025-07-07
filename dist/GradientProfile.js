import React, { useMemo } from 'react';

const PREDEFINED_COLORS = [
    "tomato", "ruby", "crimson", "pink", "plum", "purple", "iris", "indigo", "blue",
    "cyan", "teal", "jade", "green", "grass", "brown", "orange", "sky", "mint",
    "lime", "yellow", "amber", "gold", "bronze",
];

const SHADES = [9, 10, 11];

function simpleHashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

const GradientProfileComponent = ({
    seed = "0",
    className,
    availableColors = PREDEFINED_COLORS,
    ...restProps
}) => {
    const colors = availableColors.length > 0 ? availableColors : PREDEFINED_COLORS;
    const seedStr = String(seed);
    const hash = simpleHashCode(seedStr);

    const colorCount = colors.length;
    const goldenRatio = 2.618;

    const color1 = colors[hash % colorCount];
    const color2 = colors[Math.floor((hash * goldenRatio) % colorCount)];

    const shade1 = SHADES[hash % SHADES.length];
    const shade2 = SHADES[Math.floor((hash * goldenRatio) % SHADES.length)];

    const gradientStyle = useMemo(() => ({
        backgroundImage: `linear-gradient(to bottom, var(--${color1}-${shade1}), var(--${color2}-${shade2}))`,
    }), [color1, color2, shade1, shade2]);

    return React.createElement("div", {
        style: gradientStyle,
        className: className,
        role: "img",
        ...restProps
    });
};

export const GradientProfile = React.memo(GradientProfileComponent);

export default GradientProfile; 
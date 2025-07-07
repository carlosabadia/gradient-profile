import React, { useMemo } from 'react';

const PREDEFINED_COLORS = [
    "tomato", "ruby",
    "crimson", "pink", "plum", "purple", "iris", "indigo", "blue",
    "cyan", "teal", "jade", "green", "grass", "brown", "orange", "sky", "mint",
    "lime", "yellow", "amber", "gold", "bronze",
];

const SHADES = [9, 10, 11];
const SHADES_COUNT = SHADES.length;

function simpleHashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

export const GradientProfile = ({
    seed,
    className,
    availableColors = PREDEFINED_COLORS,
    ...restProps
}) => {
    const inputSeedAsString = useMemo(() => String(seed), [seed]);

    const hashedSeed = useMemo(() => simpleHashCode(inputSeedAsString), [inputSeedAsString]);

    const normalizedAvailableColors = useMemo(() => {
        return availableColors.length > 0 ? availableColors : PREDEFINED_COLORS;
    }, [availableColors]);

    const { color1, color2 } = useMemo(() => {
        const numAvailable = normalizedAvailableColors.length;
        const index1 = hashedSeed % numAvailable;
        const c1 = normalizedAvailableColors[index1];

        const secondarySeed = simpleHashCode(String(hashedSeed));
        let index2 = secondarySeed % numAvailable;

        if (index2 === index1) {
            index2 = (index1 + 1) % numAvailable;
        }
        const c2 = normalizedAvailableColors[index2];

        return { color1: c1, color2: c2 };
    }, [normalizedAvailableColors, hashedSeed]);

    const shade1 = SHADES[hashedSeed % SHADES_COUNT];
    const shade2Seed = simpleHashCode(String(hashedSeed));
    const shade2 = SHADES[shade2Seed % SHADES_COUNT];

    const gradientStyle = useMemo(() => ({
        backgroundImage: `linear-gradient(to bottom, var(--${color1}-${shade1}), var(--${color2}-${shade2}))`,
    }), [color1, color2, shade1, shade2]);

    return React.createElement(
        "div",
        {
            style: gradientStyle,
            className: className,
            role: "img",
            ...restProps
        }
    );
}; 
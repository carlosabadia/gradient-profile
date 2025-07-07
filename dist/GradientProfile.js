import React, { useMemo, memo } from 'react';

const COLORS = [
    "tomato", "ruby", "crimson", "pink", "plum", "purple", "iris", "indigo", "blue",
    "cyan", "teal", "jade", "green", "grass", "brown", "orange", "sky", "mint",
    "lime", "yellow", "amber", "gold", "bronze",
];

const SHADES = [9, 10, 11];

function hash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

/** @typedef {{
 *   seed?: string | number,
 *   className?: string,
 *   availableColors?: string[],
 * }} GradientProfileProps */

/** @type {React.FC<GradientProfileProps>} */
const GradientProfile = ({ seed, className, availableColors = COLORS, ...props }) => {
    const style = useMemo(() => {
        const h = hash(String(seed ?? 0));
        const colors = availableColors?.length ? availableColors : COLORS;

        const i1 = h % colors.length;
        let i2 = (h + 1) % colors.length;
        if (i1 === i2) i2 = (i2 + 1) % colors.length;

        const color1 = colors[i1];
        const color2 = colors[i2];

        const shade1 = SHADES[h % SHADES.length];
        let shade2 = SHADES[(h >> 8) % SHADES.length];
        if (shade1 === shade2) {
            shade2 = SHADES[(SHADES.indexOf(shade2) + 1) % SHADES.length];
        }

        return {
            backgroundImage: `linear-gradient(to bottom, var(--${color1}-${shade1}), var(--${color2}-${shade2}))`
        };
    }, [seed, availableColors]);

    return (
        <div
            style={style}
            className={className}
            role="img"
            aria-label={`Avatar for ${seed ?? 'default'}`}
            {...props}
        />
    );
};

export { GradientProfile };
export default memo(GradientProfile);
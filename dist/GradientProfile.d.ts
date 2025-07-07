import React from 'react';

export interface GradientProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    seed?: string | number;
    className?: string;
    availableColors?: string[];
}

export declare const GradientProfile: React.FC<GradientProfileProps>; 
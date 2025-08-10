"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface Props {
    text: string;
}

export default function ScrollFadeText({ text }: Props) {
    const words = text.split(" ");
    return (
        <div
            className="h-fit flex flex-col items-center justify-center px-6"
        >
            <div
                className="max-w-2xl text-center leading-relaxed flex flex-wrap gap-2"
            >
                {
                    words.map((word, index) => (
                        <FadeWord key={index} word={word} />
                    ))
                }
            </div>
        </div>
    )
}

function FadeWord({ word }: { word: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { amount: 0.6, margin: "-50px" });

    return (
        <motion.span
            ref={ref}
            className="transition-opacity duration-300 ease-in-out font-geist text-4xl text-white-cream"
            animate={{ opacity: inView ? 1 : 0.5 }}
        >
            {word}
        </motion.span>
    )
}
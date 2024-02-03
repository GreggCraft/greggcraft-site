import { defineConfig, presetUno, presetWebFonts, transformerVariantGroup } from "unocss";
import { presetScrollbar } from "unocss-preset-scrollbar";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import colors from "./colors.json" assert { type: "json" };

export default defineConfig({
    presets: [
        presetUno(),
        presetScrollbar(),
        presetWebFonts({
            provider: "none",
            fonts: {
                sans: "sans-serif",
                mono: "monospace",
            },
        }),
    ],
    transformers: [transformerVariantGroup()],
    preflights: [
        {
            getCSS: ({ theme }: Record<string, any>) => {
                const preflightRaw = readFileSync(join(__dirname, "src", "res", "css", "preflight.scss"), "utf-8");
                let preflight = preflightRaw;
                const matches = preflightRaw.matchAll(/(theme)[^"]*/g);

                for (const match of matches) {
                    const instance = preflightRaw.substring(match.index!, match.index! + match[0].length).split(".");
                    const [category, property] = instance.slice(1);
                    preflight = preflight.replace(`"${instance.join(".")}"`, theme[category][property]);
                }

                return preflight;
            }
        }
    ],
    theme: { colors },
})

import type { Config } from "tailwindcss";
import { Color } from "./_src/shared/ui/colors";

const config: Config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./_src/**/*.{js,ts,jsx,tsx,mdx}",
		"./stories/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: ["var(--font-inter)"],
		},
		colors: {
			primary: {
				100: Color.Primary100,
				200: Color.Primary200,
				300: Color.Primary300,
				400: Color.Primary400,
				500: Color.Primary500,
				600: Color.Primary600,
				700: Color.Primary700,
				800: Color.Primary800,
				900: Color.Primary900,
			},
			warning: {
				100: Color.Warning100,
				200: Color.Warning200,
				300: Color.Warning300,
				400: Color.Warning400,
				500: Color.Warning500,
				600: Color.Warning600,
				700: Color.Warning700,
				800: Color.Warning800,
				900: Color.Warning900,
			},
			success: {
				100: Color.Success100,
				200: Color.Success200,
				300: Color.Success300,
				400: Color.Success400,
				500: Color.Success500,
				600: Color.Success600,
				700: Color.Success700,
				800: Color.Success800,
				900: Color.Success900,
			},
			error: {
				100: Color.Error100,
				200: Color.Error200,
				300: Color.Error300,
				400: Color.Error400,
				500: Color.Error500,
				600: Color.Error600,
				700: Color.Error700,
				800: Color.Error800,
				900: Color.Error900,
			},
			info: {
				100: Color.Info100,
				200: Color.Info200,
				300: Color.Info300,
				400: Color.Info400,
				500: Color.Info500,
				600: Color.Info600,
				700: Color.Info700,
				800: Color.Info800,
				900: Color.Info900,
			},
			neutral: {
				100: Color.Neutral100,
				200: Color.Neutral200,
				300: Color.Neutral300,
				400: Color.Neutral400,
				500: Color.Neutral500,
				600: Color.Neutral600,
				700: Color.Neutral700,
				800: Color.Neutral800,
				900: Color.Neutral900,
			},
			white: "#ffffff",
		},
		extend: {
			keyframes: {
				popup: {
					"0%": {
						opacity: "0",
						transform: "translateY(-6px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0px)",
					},
				},
				bottomUpFadeIn: {
					"0%": {
						opacity: "0",
						transform: "translateY(50%)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0px)",
					},
				},
				rightLeftFadeIn: {
					"0%": {
						opacity: "0",
						transform: "translateX(50%)",
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0px)",
					},
				},
				leftRightFadeIn: {
					"0%": {
						opacity: "0",
						transform: "translateX(-50%)",
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0px)",
					},
				},
				downOut: {
					"0%": {
						opacity: "0",
						transform: "translateY(-20px)",
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0px)",
					},
				},
				fadeIn: {
					"0%": {
						opacity: "0",
						transform: "scale(0.95)",
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)",
					},
				},
				rotation: {
					to: {
						transform: "rotate(1turn)",
					},
				},
			},
			animation: {
				popup: "popup 0.2s",
				"popup-reverse": "popup 0.2s reverse",
				downOut: "downOut 0.3s",
				"rotation-linear": "rotation 1s infinite linear",
				"fade-in": "fadeIn 0.3s",
				"fade-in-reverse": "fadeIn 0.3s reverse",
				"bottom-up-fade-in": "bottomUpFadeIn 0.3s",
				"bottom-up-fade-in-reverse": "bottomUpFadeIn 0.3s reverse",
				"right-left-fade-in": "rightLeftFadeIn 0.3s",
				"right-left-fade-in-reverse": "rightLeftFadeIn 0.3s reverse",
				"left-right-fade-in": "leftRightFadeIn 0.3s",
				"left-right-fade-in-reverse": "leftRightFadeIn 0.3s reverse",
			},
		},
	},
	plugins: [],
};
export default config;

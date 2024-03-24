/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				"70/30": "70% 28%",
			},
		},
	},
	plugins: [
		nextui({
			themes: {
				light: {
					colors: {
						background: "#F4F7FE",
						primary: {
							50: "#F4F7FE",
							100: "#CFDBFB",
							200: "#ABBFF9",
							300: "#86A4F6",
							400: "#6288F3",
							500: "#3D6DF1",
							600: "#1951EE",
							700: "#1148E3",
							800: "#0F42D0",
							900: "#0E3CBE",
							950: "#0B0A9B",
							DEFAULT: "#3D6DF1",
							foreground: "#CFDBFB",
						},
						focus: "#3D6DF1",
					},
				},
				dark: {
					colors: {
						background: "#020819",
						foreground: "#1951EE",
						primary: {
							50: "#020819",
							100: "#030E2C",
							200: "#061A50",
							300: "#071F62",
							400: "#092575",
							500: "#0A2B87",
							600: "#0E3CBE",
							700: "#1148E3",
							800: "#0F42D0",
							900: "#1951EE",
							950: "#5C94FF",
							DEFAULT: "#0A2B87",
							foreground: "#FEFEFE",
						},
						focus: "#0A2B87",
					},
				},
			},
		}),
	],
};

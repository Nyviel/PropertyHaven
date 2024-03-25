"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const NextThemesWrapper = ({ children }) => {
	return (
		<NextThemesProvider attribute="class" defaultTheme="light">
			{children}
		</NextThemesProvider>
	);
};
export default NextThemesWrapper;

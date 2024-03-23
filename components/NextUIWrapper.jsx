"use client";
import { NextUIProvider } from "@nextui-org/react";
const NextUIWrapper = ({ children }) => {
	return (
		<NextUIProvider className="h-screen flex flex-col">
			{children}
		</NextUIProvider>
	);
};
export default NextUIWrapper;

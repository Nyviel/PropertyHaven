"use client";
import { NextUIProvider } from "@nextui-org/react";
const NextUIWrapper = ({ children }) => {
	return <NextUIProvider>{children}</NextUIProvider>;
};
export default NextUIWrapper;

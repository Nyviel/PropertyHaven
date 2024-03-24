"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div>
			<Switch
				defaultSelected
				onValueChange={(e) => {
					if (e) {
						setTheme("light");
					} else {
						setTheme("dark");
					}
				}}
				size="lg"
				color="default"
				thumbIcon={({ isSelected, className }) =>
					isSelected ? (
						<SunIcon className={className} />
					) : (
						<MoonIcon className={className} />
					)
				}
			></Switch>
		</div>
	);
}

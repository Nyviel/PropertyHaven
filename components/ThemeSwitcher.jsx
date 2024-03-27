"use client";

import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon } from "./SunIcon";
import { MoonIcon } from "./MoonIcon";

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [selected, setSelected] = useState(true);

	useEffect(() => {
		if (theme === "dark") {
			setSelected(false);
		} else {
			setSelected(true);
		}
	}, []);

	useEffect(() => {
		if (selected) {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	}, [selected]);

	return (
		<Switch
			isSelected={selected}
			onValueChange={setSelected}
			size="lg"
			color="default"
			startContent={<MoonIcon />}
			endContent={<SunIcon />}
			thumbIcon={({ isSelected, className }) =>
				isSelected ? (
					<SunIcon className={className} />
				) : (
					<MoonIcon className={className} />
				)
			}
		></Switch>
	);
}

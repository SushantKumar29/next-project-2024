"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Tooltip } from "@mui/material";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Tooltip title={theme!.toUpperCase()}>
			<Button variant='outline' size='icon' onClick={toggleTheme}>
				{theme === "light" ? (
					<SunIcon className='h-[1.2rem] w-[1.2rem]' />
				) : (
					<MoonIcon className='h-[1.2rem] w-[1.2rem]' />
				)}
				<span className='sr-only'>Toggle theme</span>
			</Button>
		</Tooltip>
	);
}

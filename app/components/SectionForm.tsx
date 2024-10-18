"use client";

import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, Button, Box } from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";

const SectionForm: React.FC = () => {
	const { theme } = useNextTheme();
	const isDark = theme === "dark";
	const isLight = theme === "light";

	const [name, setName] = useState<string>("");
	// const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!name) {
			// setError("Please provide a valid section name.");
			return;
		}

		try {
			const response = await fetch("/api/sections", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			});

			if (!response.ok) {
				throw new Error("Failed to create section.");
			}

			setName("");
			// setError(null);
		} catch (error) {
			console.error(error);
			// setError((error as Error).message);
		}
	};

	// Create MUI theme based on the current theme
	const themeMui = createTheme({
		palette: {
			mode: isDark ? "dark" : isLight ? "light" : "dark", // Default to light if system mode
		},
	});

	return (
		<ThemeProvider theme={themeMui}>
			<Box component='form' onSubmit={handleSubmit} className='mt-4'>
				<div>
					<TextField
						id='name'
						label='Section Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						variant='outlined'
						fullWidth
						error={!name}
					/>
				</div>

				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					style={{ marginTop: 16 }}
					disabled={!name}
				>
					Add Section
				</Button>
			</Box>
		</ThemeProvider>
	);
};

export default SectionForm;

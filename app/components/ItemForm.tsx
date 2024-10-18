import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, FormControl, MenuItem, Button, Box } from "@mui/material";
import { useTheme as useNextTheme } from "next-themes";

interface Section {
	_id: string;
	name: string;
}

interface ItemFormProps {}

const ItemForm: React.FC<ItemFormProps> = () => {
	const { theme } = useNextTheme();

	const isDark = theme === "dark";
	const [name, setName] = useState<string>("");
	const [sections, setSections] = useState<Section[]>([]);
	const [selectedSection, setSelectedSection] = useState<string>("");
	const [error, setError] = useState<string | null>(null);

	// Fetch section when the form loads
	useEffect(() => {
		const fetchSection = async () => {
			try {
				const response = await fetch("/api/sections"); // Assuming this is the API endpoint
				const data = await response.json();
				setSections(data.sections);
			} catch (error) {
				console.error("Failed to fetch section:", error);
			}
		};

		fetchSection();
	}, []);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!name || !selectedSection) {
			setError("Please provide valid name, price, and section.");
			return;
		}

		try {
			const uid = name.replace(/\s+/g, "-").toLowerCase();
			const response = await fetch("/api/items", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, uid, section: selectedSection }),
			});

			if (!response.ok) {
				throw new Error("Failed to create item.");
			}

			// Reset form
			setName("");
			setSelectedSection("");
			setError(null);

			// Optionally, refresh the items list on successful creation
		} catch (error) {
			setError((error as Error).message);
		}
	};

	const themeMui = createTheme({
		palette: {
			mode: isDark ? "dark" : "light",
		},
	});

	return (
		<ThemeProvider theme={themeMui}>
			<Box component='form' onSubmit={handleSubmit} className='mt-4'>
				<div className='mb-2'>
					<FormControl fullWidth>
						<TextField
							id='section'
							select
							label='Select'
							onChange={(e) => setSelectedSection(e.target.value)}
							value={
								selectedSection || (sections.length > 0 ? sections[0]._id : "")
							}
						>
							{sections.map((option) => (
								<MenuItem key={option._id} value={option._id}>
									{option.name}
								</MenuItem>
							))}
						</TextField>
					</FormControl>
				</div>

				<div>
					<TextField
						id='name'
						label='Item Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						variant='outlined'
						fullWidth
					/>
				</div>

				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					style={{ marginTop: 16 }}
				>
					Add Item
				</Button>
			</Box>
		</ThemeProvider>
	);
};

export default ItemForm;

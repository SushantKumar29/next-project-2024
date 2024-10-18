"use client";

import {
	Box,
	Button,
	Container,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import ItemForm from "../components/ItemForm";
import Link from "next/link";
import { useTheme as useNextTheme } from "next-themes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LaunchIcon from "@mui/icons-material/Launch";
import Loader from "../components/Loader";

interface Item {
	_id: string;
	name: string;
	created_at: string;
	updated_at: string;
	items: {
		_id: string;
		name: string;
	}[];
}

const ItemPage: React.FC = () => {
	const { isLoaded, isSignedIn } = useUser();
	const [items, setItems] = useState<Item[]>([]);
	const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { theme } = useNextTheme(); // Access the current theme
	const isDark = theme === "dark";

	// Create MUI theme based on the current theme
	const muiTheme = createTheme({
		palette: {
			mode: isDark ? "dark" : "light", // Toggle between dark and light mode
		},
	});

	// Fetch items from the API
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch("/api/items");
				const data = await response.json();
				setItems(data.items);
				setIsLoading(false);
			} catch (error) {
				console.error("Failed to fetch items:", error);
				setIsLoading(false);
			}
		};

		fetchItems();
	}, []);

	if (!isLoaded || !isSignedIn) {
		return null;
	}

	const handleToggleForm = () => {
		setIsFormVisible((prevState) => !prevState);
	};

	return (
		<ThemeProvider theme={muiTheme}>
			<Container maxWidth='lg'>
				<Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
					<Button
						variant='outlined'
						component={Link}
						href='/sections'
						sx={{ alignSelf: "flex-start", mb: 2 }}
					>
						Back to Sections
					</Button>
					<Typography variant='h4' gutterBottom>
						Item Page
					</Typography>

					{isFormVisible ? (
						<Button
							variant='outlined'
							onClick={handleToggleForm}
							sx={{ alignSelf: "flex-start", mb: 2 }}
						>
							Back to Items
						</Button>
					) : (
						<Button
							variant='outlined'
							onClick={handleToggleForm}
							sx={{ alignSelf: "flex-end", mb: 2 }}
						>
							Create New Item
						</Button>
					)}

					{isFormVisible ? (
						<ItemForm />
					) : isLoading ? (
						<Loader />
					) : (
						<TableContainer
							sx={{
								maxHeight: 440,
								bgcolor: (theme) => theme.palette.background.paper, // Background color based on theme
							}}
						>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<TableCell>Name</TableCell>
										<TableCell>Created At</TableCell>
										<TableCell>Updated At</TableCell>
										<TableCell></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{items.map((item) => (
										<TableRow key={item._id}>
											<TableCell component='th' scope='row'>
												<Typography>{item.name}</Typography>
											</TableCell>
											<TableCell component='th' scope='row' align='left'>
												<Typography>
													{new Intl.DateTimeFormat("en-US", {
														year: "numeric",
														month: "long",
														day: "2-digit",
														hour: "2-digit",
														minute: "2-digit",
													}).format(new Date(item.created_at))}
												</Typography>
											</TableCell>
											<TableCell component='th' scope='row' align='left'>
												<Typography>
													{new Intl.DateTimeFormat("en-US", {
														year: "numeric",
														month: "long",
														day: "2-digit",
														hour: "2-digit",
														minute: "2-digit",
													}).format(new Date(item.updated_at))}
												</Typography>
											</TableCell>
											<TableCell component='th' scope='row' align='left'>
												<Link href={`/items/${item._id}`}>
													<Typography>
														<LaunchIcon fontSize='small' />
													</Typography>
												</Link>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					)}
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default ItemPage;

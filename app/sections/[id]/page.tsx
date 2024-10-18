"use client";

import Loader from "@/app/components/Loader";
import { useUser } from "@clerk/nextjs";
import {
	Container,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Button,
	Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme as useNextTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Item {
	_id: string;
	name: string;
	created_at: string;
	updated_at: string;
}

interface ISection {
	_id: string;
	name: string;
	created_at: string;
	updated_at: string;
}

interface SectionItemsPageProps {
	params: {
		id: string;
	};
}

const SectionItemsPage = ({ params }: SectionItemsPageProps) => {
	const { id } = params;
	const { isLoaded, isSignedIn } = useUser();
	const [section, setSection] = useState<ISection>();
	const [items, setItems] = useState<Item[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { theme } = useNextTheme();
	const isDark = theme === "dark";

	useEffect(() => {
		const fetchSections = async () => {
			try {
				const response = await fetch(`/api/sections/${id}`);
				const data = await response.json();
				setSection(data.section);
				setItems(data.items);
				setIsLoading(false);
			} catch (error) {
				console.error("Failed to fetch sections:", error);
				setIsLoading(false);
			}
		};

		fetchSections();
	}, [id]);

	if (!isLoaded || !isSignedIn) {
		return null;
	}

	const muiTheme = createTheme({
		palette: {
			mode: isDark ? "dark" : "light",
		},
	});

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
						Items for Section {section?.name}
					</Typography>
					{isLoading ? (
						<Loader />
					) : (
						<>
							{!items || items.length === 0 ? (
								<Typography variant='h6' gutterBottom>
									No items found for this section.
								</Typography>
							) : (
								<>
									<TableContainer
										sx={{
											maxHeight: 440,
											bgcolor: (theme) => theme.palette.background.paper, // Background color based on theme
										}}
									>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>Name</TableCell>
													<TableCell>Created At</TableCell>
													<TableCell>Updated At</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{items.map((item) => (
													<TableRow key={item._id}>
														<TableCell component='th' scope='row'>
															{item.name}
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
													</TableRow>
												))}
											</TableBody>
										</Table>
									</TableContainer>
								</>
							)}
						</>
					)}
				</Box>
			</Container>
		</ThemeProvider>
	);
};

export default SectionItemsPage;

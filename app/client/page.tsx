"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

const ClientPage = () => {
	const { isLoaded, isSignedIn, user } = useUser();

	if (!isLoaded || !isSignedIn) {
		return null;
	}

	return (
		<Container className='mx-auto'>
			<Typography variant='h4' gutterBottom>
				Hello, {user.firstName} welcome to Next Project 2024
			</Typography>

			<Box className='flex gap-2'>
				<Button
					variant='outlined'
					component={Link}
					href='/sections'
					sx={{ mt: 4 }}
					color='primary'
				>
					Manage Sections
				</Button>

				<Button
					variant='outlined'
					component={Link}
					href='/items'
					sx={{ mt: 4 }}
					color='primary'
				>
					Manage Items
				</Button>
			</Box>
		</Container>
	);
};

export default ClientPage;

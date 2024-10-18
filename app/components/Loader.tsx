"use client";

import { Box } from "@mui/material";
import React from "react";
import { ThreeCircles } from "react-loader-spinner";
const Loader = () => {
	return (
		<Box className='mx-auto'>
			<ThreeCircles
				visible={true}
				height='100'
				width='100'
				color='#3B82F6'
				ariaLabel='three-circles-loading'
				wrapperStyle={{}}
				wrapperClass=''
			/>
		</Box>
	);
};

export default Loader;

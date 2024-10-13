"use server";

import User from "../models/user.model";
import { connect } from "@/connect";

interface IUser {
	clerkId: string;
	email: string;
	username: string;
	firstName: string;
	lastName: string;
	photo: string;
}

export async function createUser(user: IUser) {
	try {
		await connect();
		const newUser = await User.create(user);
		return JSON.parse(JSON.stringify(newUser));
	} catch (error) {
		console.log(error);
	}
}

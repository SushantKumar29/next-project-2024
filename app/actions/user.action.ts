"use server";

import User from "../models/user.model";
import { connect } from "@/connect";

interface IUser {
	clerkId: string;
	email: string;
	username: string | null;
	firstName: string | null;
	lastName: string | null;
	photo: string | null;
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

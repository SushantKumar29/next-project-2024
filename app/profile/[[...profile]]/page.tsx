import { UserProfile } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Profile = async () => {
	const { userId } = auth();
	const isAuthenticated = !!userId;
	const user = await currentUser();
	if (!isAuthenticated) {
		redirect("/");
	}
	return (
		<div className='flex flex-col items-center justify-center mt-8'>
			<h1 className='text-2xl'>
				{`${user?.firstName} ${user?.lastName}` ||
					user?.username ||
					user?.emailAddresses[0]?.emailAddress}
			</h1>
			<UserProfile />
		</div>
	);
};

export default Profile;

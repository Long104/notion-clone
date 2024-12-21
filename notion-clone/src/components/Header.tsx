"use client";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
	useUser,
} from "@clerk/nextjs";
import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

const Header = () => {
	const { isLoaded, isSignedIn, user } = useUser();
	// if (!isLoaded || !isSignedIn) {
	// 	return null;
	// }
	return (
		<div className="flex items-center justify-between p-5">
			{user && (
				<h1 className="text-2xl">
					{" "}
					{user?.firstName}
					{`'s`} Space{" "}
				</h1>
			)}

      <Breadcrumbs />

			<div>
				<SignedOut>
					<SignInButton />
				</SignedOut>

				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};

export default Header;

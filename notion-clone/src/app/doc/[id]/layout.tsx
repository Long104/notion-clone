import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import React, { use } from "react";

// type Params = Promise<{ id: string }>;
// function DocLayout({
// 	children,
// 	params,
// }: { children: React.ReactNode; params: Params }) {
// 	// const { id } = await params;
// 	auth.protect();
// 	const param = use(params);
// 	const id = param.id;
// 	return <RoomProvider roomId={id}>{children}</RoomProvider>;
// }
// export default DocLayout;

const layout = async ({
	children,
	params,
}: { children: React.ReactNode; params: Promise<{ id: string }> }) => {
	auth.protect();
	const id = (await params).id;
	return <RoomProvider roomId={id}>{children}</RoomProvider>;
};

export default layout;

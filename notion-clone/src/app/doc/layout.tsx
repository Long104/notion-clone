import LiveBlocksProvider from "@/components/LiveBlocksProvider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
}

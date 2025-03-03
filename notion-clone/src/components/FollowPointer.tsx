import React from "react";

import { motion } from "framer-motion";
import stringToColor from "@/lib/stringToColor";
const FollowPointer = ({
	x,
	y,
	info,
}: {
	x: number;
	y: number;
	info: {
		name: string;
		email: string;
		avatar: string;
	};
}) => {
	const color = stringToColor(info.email || "1");
	return (
		<motion.div
			className="h-4 w-4 rounded-full absolute z-50"
			style={{
				top: y,
				left: x,
				pointerEvents: "none",
			}}
			initial={{
				scale: 1,
				opacity: 1,
			}}
			animate={{
				scale: 1,
				opacity: 1,
			}}
			exit={{
				scale: 0,
				opacity: 0,
			}}
		>
			<svg
				stroke={color}
				fill={color}
				strokeWidth="1"
				viewBox="0 0 16 16"
				className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px]`}
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M14.5 1.5L7 15l-2-4.5-4.5-2 14-7z" />
			</svg>
			<motion.div
				style={{
					backgroundColor: color,
				}}
				initial={{
					scale: 0.5,
					opacity: 0,
				}}
				animate={{
					scale: 1,
					opacity: 1,
				}}
				exit={{
					scale: 0.5,
					opacity: 0,
				}}
				className="px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full"
			>
				{info?.name || info.email}
			</motion.div>
		</motion.div>
	);
};

export default FollowPointer;

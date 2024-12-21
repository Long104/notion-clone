"use client";
import React from "react";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import {  InviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

const InviteUser = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isPending, startTransition] = React.useTransition();
	const pathname = usePathname();
	const [email, setEmail] = React.useState("");

	async function handleInvite(e:React.FormEvent) {
    e.preventDefault();
		const roomId = pathname.split("/").pop();
		if (!roomId) return;
		startTransition(async () => {
			const { success } = await InviteUserToDocument(roomId, email);
			if (success) {
				setIsOpen(false);
        setEmail("");
				toast.success("add user success");
			} else {
				toast.error("Failed to add user to the room ");
			}
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Button asChild variant="outline">
				<DialogTrigger>Invite</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite a User to collaborate!</DialogTitle>
					<DialogDescription>
						Enter the email of the user you want to invite
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleInvite} className="flex gap-2">
					<Input
						type="email"
						placeholder="Email"
						className="w-full"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
						<Button type="submit" disabled={!email || isPending}>
							{isPending ? "Inviting..." : "Invite"}
						</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default InviteUser;

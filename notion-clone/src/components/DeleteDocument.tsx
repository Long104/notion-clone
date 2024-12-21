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
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";

const DeleteDocument = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [isPending, startTransition] = React.useTransition();
	const pathname = usePathname();
	const router = useRouter();

	async function handleDelete() {
		const roomId = pathname.split("/").pop();
		if (!roomId) return;
		startTransition(async () => {
			const { success } = await deleteDocument(roomId);

			if (success) {
				setIsOpen(false);
				router.replace("/");
				toast.success("Document Deleted");
			} else {
				toast.error("Failed to delete document");
			}
		});
	}
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Button asChild variant="destructive">
				<DialogTrigger>Delete</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure you want to Delete?</DialogTitle>
					<DialogDescription>
						This will delete the document and all its contents, removeing all
						users from the document
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="sm:justify-end gap-2">
					<Button
						type="button"
						variant="destructive"
						onClick={handleDelete}
						disabled={isPending}
					>
						{isPending ? "Deleting..." : "Delete"}
					</Button>
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteDocument;

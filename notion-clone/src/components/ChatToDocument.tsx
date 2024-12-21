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
import { InviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";

const ChatToDocument = ({ doc }: { doc: Y.Doc }) => {
	const [input, setInput] = React.useState("");
	const [isOpen, setIsOpen] = React.useState(false);
	const [isPending, startTransition] = React.useTransition();
	const [summary, setSummary] = React.useState("");
	const [question, setQuestion] = React.useState("");

	async function handleAskQuestion(e: React.FormEvent) {
		e.preventDefault();
		setQuestion(input);
		startTransition(async () => {
			const documentData = doc.get("document-store").toJSON();
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/chatDocument`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ question: input, documentData }),
				},
			);
			if (res.ok) {
				const { message } = await res.json();
				setInput("");
				setSummary(summary);

				toast.success("question ask successfully");
			}
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Button asChild variant="outline">
				<DialogTrigger>
					<MessageCircleCode className="mr-2" />
					Chat toDocument
				</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chat to the Document!</DialogTitle>
					<DialogDescription>
						Ask a question or make a comment about the document.
					</DialogDescription>
					<hr className="mt-5" />
					{question && <p className="mt-5 text-gray-500">Q: {question}</p>}
				</DialogHeader>
				{summary && (
					<div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
						<div className="flex">
							<BotIcon className="w-10 flex-shrink-0" />
							<p className="font-bold">
								GPT {isPending ? "is thinking..." : "answered"}
							</p>
						</div>
						<p>{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}</p>
					</div>
				)}
				<form onSubmit={handleAskQuestion} className="flex gap-2">
					<Input
						type="text"
						placeholder="i.e. what is this about?"
						className="w-full"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button type="submit" disabled={!input || isPending}>
						{isPending ? "Asking..." : "Ask"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ChatToDocument;

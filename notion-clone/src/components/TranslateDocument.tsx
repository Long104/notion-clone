"use client";
import React from "react";
import * as Y from "yjs";
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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
	Select,
	SelectContent,
	SelectTrigger,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";
import Markdown from "react-markdown";

type Language =
	| "english"
	| "spanish"
	| "portuguese"
	| "german"
	| "french"
	| "chinese"
	| "arabic"
	| "hindi"
	| "russian"
	| "japanese"
	| "thai"
	| "burmese";

const languages: Language[] = [
	"english",
	"spanish",
	"portuguese",
	"german",
	"french",
	"chinese",
	"arabic",
	"hindi",
	"russian",
	"japanese",
	"thai",
	"burmese",
];

const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
	const [isOpen, setIsOpen] = React.useState(false);
	const [summary, setSummary] = React.useState("");
	const [language, setLanguage] = React.useState<string>("");
	const [question, setQuestion] = React.useState("");
	const [isPending, startTransition] = React.useTransition();
	const handleAskQuestion = (e: React.FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			const documentData = doc.get("document-store").toJSON();
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ documentData, targetLanguage: language }),
				},
			);
			if (res.ok) {
				const { translated_text } = await res.json();
				setSummary(translated_text);
				toast.success("Document translated successfully");
			}
		});
	};
	return (
		<>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<Button asChild variant="outline">
					<DialogTrigger>
						<LanguagesIcon />
						Translate
					</DialogTrigger>
				</Button>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Translate the Document</DialogTitle>
						<DialogDescription>
							Select a language to translate the document with AI and summary
							for you
						</DialogDescription>
						<hr className="mt-5" />
						{question && <p className="mt-5 bg-gray-500">Q: {question}</p>}
					</DialogHeader>

					{summary && (
						<div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5  bg-gray-100">
							<div className="flex">
								<BotIcon className="w-10 flex-shrink-0" />
								<p className="font-bold">
									GPT {isPending ? "is thinking..." : "Says"}
								</p>
							</div>
							<div>
								{isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}
							</div>
						</div>
					)}
					<form onSubmit={handleAskQuestion} className="flex gap-2">
						<Select
							value={language}
							onValueChange={(value) => setLanguage(value)}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a language" />
								<SelectContent>
									{languages.map((lang) => (
										<SelectItem key={lang} value={lang}>
											{/* {lang.charAt(0).toUpperCase() + lang.slice(1)} */}
											{lang.charAt(0).toUpperCase() + lang.slice(1)}
										</SelectItem>
									))}
								</SelectContent>
							</SelectTrigger>
						</Select>
						<Button type="submit" disabled={!language || isPending}>
							{isPending ? "Translating..." : "Translate"}
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default TranslateDocument;

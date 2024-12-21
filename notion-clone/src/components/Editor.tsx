"use client";
import { useRoom } from "@liveblocks/react/suspense";
import React, { useEffect } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/stringToColor";
import { useSelf } from "@liveblocks/react/suspense";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

type EditorProps = {
	doc: Y.Doc;
	provider: any;
	darkMode: boolean;
};

function BlockNote({ doc, provider, darkMode }: EditorProps) {
	const userInfo = useSelf((me) => me.info);

	const editor: BlockNoteEditor = useCreateBlockNote({
		collaboration: {
			provider,
			fragment: doc.getXmlFragment("document-store"),
			user: {
				name: userInfo?.name,
				color: stringToColor(userInfo?.email),
			},
		},
	});
	return (
		<div className="relative max-w-6xl mx-auto">
			<BlockNoteView
				className="min-h-screen"
				editor={editor}
				theme={darkMode ? "dark" : "light"}
			/>
		</div>
	);
}

const Editor = () => {
	const room = useRoom();
	const [doc, setDoc] = React.useState<Y.Doc>();
	const [provider, setProvider] = React.useState<LiveblocksYjsProvider>();
	const [darkMode, setDarkMode] = React.useState(false);

	useEffect(() => {
		const yDoc = new Y.Doc();
		const yProvider = new LiveblocksYjsProvider(room, yDoc);
		setDoc(yDoc);
		setProvider(yProvider);

		return () => {
			yDoc?.destroy();
			yProvider?.destroy();
		};
	}, [room]);

	const style = `hover:text-white ${
		darkMode
			? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
			: "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
	}`;
	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex items-center gap-2 justify-end mb-10">
				<TranslateDocument doc={doc!} />
				<ChatToDocument doc={doc!}/>

				<Button className={style} onClick={() => setDarkMode(!darkMode)}>
					{darkMode ? <SunIcon /> : <MoonIcon />}
				</Button>
			</div>

			{doc && provider ? (
				<BlockNote doc={doc} provider={provider} darkMode={darkMode} />
			) : (
				<p>Loading editor...</p>
			)}
		</div>
	);
};

export default Editor;
"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createNewDocument } from "@/actions/actions";

const NewDocumentButton = () => {
	const [isPending, startTransaction] = useTransition();
  const router = useRouter();
	const handCreateNewDocument = () => {
		startTransaction(async () => {
      const {docId} = await createNewDocument();
      router.push(`/doc/${docId}`);
    });
	};
	return <Button onClick={handCreateNewDocument} disabled={isPending}>{isPending? "Creating..." : "New Document"}</Button>;
};

export default NewDocumentButton;

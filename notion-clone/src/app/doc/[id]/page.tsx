'use client'
import Document from "@/components/Document";
import React,{ use } from 'react'

type Params = Promise<{ id: string }>;

const DocumentPage = (props: { params: Params }) => {
const params = use(props.params)
const id = params.id;
	return (
		<div className="flex flex-col flex-1 min-h-screen">
			<Document id={id} />
		</div>
	);
};

export default DocumentPage;

// const DocumentPage = ({
// 	params: { id },
// }: {
// 	params: {
// 		id: string;
// 	};
// }) => {
// 	return <>DocumentPage : {id}</>;
// };

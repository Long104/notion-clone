import OpenAi from "openai";
import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
	OPEN_AI_KEY: string;
	AI: Ai;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
	"/*",
	cors({
		origin: "*",
		allowHeaders: [
			"Content-Type",
			"X-Custom-Header",
			"Updrade-Insecure-Requests",
		],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
		maxAge: 600,
		credentials: true,
	}),
);

app.post("chatToDocument", async (c) => {
	const openai = new OpenAi({ apiKey: c.env.OPEN_AI_KEY });
	const { documentData, question } = await c.req.json();
	const chatCompletion = await openai.chat.completions.create({
		messages: [
			{
				role: "system",
				content:
					"You are a helpful assistant to the user document i am providing json file  of the markdown  for the document. Using this, answer the user question in the clearest way possible, the document is about" +
					documentData,
			},
			{
				role: "user",
				content: "My question is " + question,
			},
		],
		model: "gpt-4o",
		temperature: 0.5,
	});

	const response = chatCompletion.choices[0].message.content;
	return c.json({ message: response });
});

app.post("/translateDocument", async (c) => {
	const { documentData, targetLanguage } = await c.req.json();

	const summaryResponse = await c.env.AI.run("@cf/facebook/bart-large-cnn", {
		input_text: documentData,
		max_length: 1000,
	});
	const response = await c.env.AI.run("@cf/meta/m2m100-1.2b", {
		text: summaryResponse.summary,
		source_lang: "english",
		target_lang: targetLanguage,
	});

	return new Response(JSON.stringify(response));
});

app.post("/summarizeDocument", async (c) => {
	const { documentData } = await c.req.json();
	const messages: any[] = [
		{
			role: "system",
			content:
				"you are an senior developer and you are helping the user to answer their problem.",
		},
		{
			role: "user",
			content:
				"answer this based on the question. If question that is includes multiple-choice options (e.g., A, B, C, D or 1,2,3,4 or if it has set of choice answer), analyze the options and select the best possible answer without explanation just only the choice, but if input has no choice and it have keyword  but only question such as explain..., describe... please explain the answer" +
				documentData,
		},
	];
	const response = await c.env.AI.run("@cf/meta/llama-3.2-3b-instruct" as any, {
		messages,
	});

	return c.json({ message: response });
});

export default app;

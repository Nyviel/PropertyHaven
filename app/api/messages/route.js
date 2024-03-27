import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

//GET: /api/messages
export const GET = async (request) => {
	try {
		await connectDB();
		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response(
				JSON.stringify({
					message: "Must be logged in to fetch messages",
				}),
				{ status: 401 }
			);
		}

		const messages = await Message.find({ recipient: sessionUser.userId })
			.populate("sender", "name")
			.populate("property", "name");

		return new Response(JSON.stringify({ messages }), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};

//POST: /api/messages
export const POST = async (request) => {
	try {
		await connectDB();
		const { name, email, phone, body, recipient, property } =
			await request.json();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response(
				JSON.stringify({
					message: "Must be logged in to send a message",
				}),
				{ status: 401 }
			);
		}

		if (sessionUser.userId === recipient) {
			return new Response(
				JSON.stringify({ message: "Can't send message to self" }),
				{ status: 400 }
			);
		}

		const message = new Message({
			sender: sessionUser.userId,
			recipient: recipient,
			property: property,
			name: name,
			email: email,
			phone: phone,
			body: body,
		});

		await message.save();

		return new Response(JSON.stringify(message), { status: 200 });
	} catch (error) {
		console.log("API: (/api/messages POST): ", error);
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};

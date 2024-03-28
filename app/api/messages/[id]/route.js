import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//PUT: /api/messages/:id
export const PUT = async (request, { params }) => {
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
		const { id } = params;
		const message = await Message.findById(id);
		if (!message) {
			return new Response(
				JSON.stringify({ message: "Message not found" }),
				{ status: 404 }
			);
		}

		if (message.recipient.toString() !== sessionUser.userId) {
			return new Response(JSON.stringify({ message: "Unauthorized" }), {
				status: 401,
			});
		}

		message.read = !message.read;

		await message.save();

		return new Response(JSON.stringify(message), { status: 200 });
	} catch (error) {
		console.error("API (messages/:id PUT): " + error);
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};

//DELETE: /api/messages/:id
export const DELETE = async (request, { params }) => {
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
		const { id } = params;
		const message = await Message.findById(id);
		if (!message) {
			return new Response(
				JSON.stringify({ message: "Message not found" }),
				{ status: 404 }
			);
		}

		if (message.recipient.toString() !== sessionUser.userId) {
			return new Response(JSON.stringify({ message: "Unauthorized" }), {
				status: 401,
			});
		}

		await message.deleteOne();

		return new Response(
			JSON.stringify({ message: "Successfully deleted message" }),
			{ status: 200 }
		);
	} catch (error) {
		console.error("API (messages/:id PUT): " + error);
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};

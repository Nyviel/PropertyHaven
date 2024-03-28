import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

//GET: /api/messages/unread-count
export const GET = async (_) => {
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

		const unreadMessages = await Message.find({
			recipient: sessionUser.userId,
			read: false,
		});

		return new Response(JSON.stringify({ count: unreadMessages.length }), {
			status: 200,
		});
	} catch (error) {
		console.error("API (messages/unread-count GET): " + error);
		return new Response(
			JSON.stringify({ message: "Something went wrong" }),
			{ status: 500 }
		);
	}
};

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
export const dynamic = "force-dynamic";

// POST: /api/bookmarks/check
export const POST = async (request) => {
	try {
		await connectDB();
		const { propertyID } = await request.json();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response("Session is required", { status: 401 });
		}

		const user = await User.findOne({ _id: sessionUser.userId });
		let isBookmarked = user.bookmarks.includes(propertyID);

		return new Response(JSON.stringify({ isBookmarked }));
	} catch (error) {
		console.error(error);
		return new Response("Something went wrong", { status: 500 });
	}
};

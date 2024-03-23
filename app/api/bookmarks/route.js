import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
export const dynamic = "force-dynamic";

export const GET = async (_) => {
	try {
		await connectDB();

		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response("Session is required", { status: 401 });
		}

		const user = await User.findOne({ _id: sessionUser.userId });

		const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

		return new Response(JSON.stringify({ bookmarks }), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response("Something went wrong", { status: 500 });
	}
};

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
		let message;
		if (isBookmarked) {
			user.bookmarks.pull(propertyID);
			message = "Bookmark removed successfully";
			isBookmarked = false;
		} else {
			user.bookmarks.push(propertyID);
			message = "Bookmark added successfully";
			isBookmarked = true;
		}
		await user.save();
		return new Response(JSON.stringify({ message, isBookmarked }), {
			status: 200,
		});
	} catch (error) {
		console.error(error);
		return new Response("Something went wrong", { status: 500 });
	}
};

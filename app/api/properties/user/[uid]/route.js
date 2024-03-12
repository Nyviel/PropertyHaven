import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET: /api/properties/user/:userId
export const GET = async (request, { params }) => {
	try {
		await connectDB();
		const uid = params.uid;
		if (!uid) {
			return new Response("User ID is reuqired", { status: 400 });
		}
		const properties = await Property.find({ owner: uid });
		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.error(
			"API:(/api/properties/user/:uid) ENCOUNTERED ERROR: ",
			error
		);
		return new Response("Unexpected server error", { status: 500 });
	}
};

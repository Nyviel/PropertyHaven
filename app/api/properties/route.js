import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET: /api/properties
export const GET = async (request) => {
	try {
		await connectDB();
		const properties = await Property.find();
		return new Response(JSON.stringify(properties), { status: 200 });
	} catch (error) {
		console.error("API:(/api/properties) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};

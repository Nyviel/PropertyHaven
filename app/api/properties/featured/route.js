import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET: /api/properties/featured
export const GET = async (request) => {
	try {
		await connectDB();
		const total = 3;
		const properties = await Property.find({ is_featured: true }).limit(
			total
		);
		return new Response(JSON.stringify({ properties, total }), {
			status: 200,
		});
	} catch (error) {
		console.error(
			"API:(/api/properties/featured) ENCOUNTERED ERROR: ",
			error
		);
		return new Response("Unexpected server error", { status: 500 });
	}
};

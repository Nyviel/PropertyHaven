import connectDB from "@/config/database";
import Property from "@/models/Property";

//GET: /api/properties/:id
export const GET = async (_, { params }) => {
	try {
		await connectDB();
		const property = await Property.findById(params.id);
		if (!property) {
			return new Response("Property Not Found", { status: 404 });
		}
		return new Response(JSON.stringify(property), { status: 200 });
	} catch (error) {
		console.error("API:(/api/properties) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected Server Error", { status: 500 });
	}
};

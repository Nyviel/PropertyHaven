import connectDB from "@/config/database";
import Property from "@/models/Property";

// GET: /api/properties/featured
export const GET = async (request) => {
	try {
		await connectDB();
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page") || 1;
		const pageSize = searchParams.get("pageSize") || 6;
		const skip = (page - 1) * pageSize;

		const total = await Property.countDocuments();

		const properties = await Property.find({ is_featured: true })
			.skip(skip)
			.limit(pageSize);
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

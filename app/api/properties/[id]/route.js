import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";

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

//DELETE: /api/properties/:id
export const DELETE = async (_, { params }) => {
	try {
		// Verify user
		const user = await getSessionUser();
		if (!user || !user.userId) {
			return new Response("User ID is Required", { status: 401 });
		}

		await connectDB();

		// Validate property
		const property = await Property.findById(params.id);
		if (!property) {
			return new Response("Property Not Found", { status: 404 });
		}
		if (property.owner.toString() !== user.userId) {
			return new Response("Unathorized", { status: 404 });
		}

		await property.deleteOne();

		return new Response("Successfully deleted property", { status: 200 });
	} catch (error) {
		console.error("API:(/api/properties) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected Server Error", { status: 500 });
	}
};

// PUT: /api/properties/:id
export const PUT = async (request, { params }) => {
	try {
		const sessionUser = await getSessionUser();
		if (!sessionUser || !sessionUser.userId) {
			return new Response("User ID is required", { status: 401 });
		}

		await connectDB();

		const formData = await request.formData();

		const amenities = formData.getAll("amenities");

		const propertyToUpdate = await Property.findById(params.id);
		if (!propertyToUpdate) {
			return new Response("Failed to find property with given ID", {
				status: 404,
			});
		}

		if (propertyToUpdate.owner.toString() !== sessionUser.userId) {
			return new Response("Unathorized", { status: 401 });
		}

		const propertyData = {
			type: formData.get("type"),
			name: formData.get("name"),
			description: formData.get("description"),
			location: {
				street: formData.get("location.street"),
				city: formData.get("location.city"),
				state: formData.get("location.state"),
				zipcode: formData.get("location.zipcode"),
			},
			beds: formData.get("beds"),
			baths: formData.get("baths"),
			square_feet: formData.get("square_feet"),
			amenities,
			rates: {
				weekly: formData.get("rates.weekly"),
				monthly: formData.get("rates.monthly"),
				nightly: formData.get("rates.nightly"),
			},
			seller_info: {
				name: formData.get("seller_info.name"),
				email: formData.get("seller_info.email"),
				phone: formData.get("seller_info.phone"),
			},
		};

		const updatedProperty = await Property.findByIdAndUpdate(
			params.id,
			propertyData
		);

		return new Response(JSON.stringify(updatedProperty), { status: 200 });
	} catch (error) {
		console.error("API:(/api/properties) ENCOUNTERED ERROR: ", error);
		return new Response("Failed to add a property", { status: 500 });
	}
};

import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

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

// POST: /api/properties
export const POST = async (request) => {
	try {
		await connectDB();
		const formData = await request.formData();
		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response("User ID is required", { status: 401 });
		}

		const { userId } = sessionUser;

		const amenities = formData.getAll("amenities");
		const images = formData
			.getAll("images")
			.filter((image) => image.name !== "");

		const propertyData = {
			type: formData.get("type"),
			name: formData.get("name"),
			description: formData.get("description"),
			location: {
				street: formData.get("location.street"),
				city: formData.get("location.city"),
				state: formData.get("location.state"),
				zipcode: formData.get("location.zipcode"),
				latitude: formData.get("location.latitude"),
				longitude: formData.get("location.longitude"),
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
			owner: userId,
		};

		const uploadPromises = images.map(async (image) => {
			const imageBuffer = await image.arrayBuffer();
			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);

			const imageBase64 = imageData.toString("base64");
			return cloudinary.uploader
				.upload(`data:image/png;base64,${imageBase64}`, {
					folder: "property-haven",
				})
				.then((result) => result.secure_url);
		});

		const imageUploads = await Promise.all(uploadPromises);
		if (imageUploads) {
			propertyData.images = imageUploads;
		} else {
			return new Response(`Failed to upload images`, {
				status: 500,
			});
		}

		const newProperty = await Property.create(propertyData);

		return new Response(JSON.stringify(newProperty), { status: 200 });
	} catch (error) {
		console.error("API:(/api/properties) ENCOUNTERED ERROR: ", error);
		return new Response("Failed to add a property", { status: 500 });
	}
};

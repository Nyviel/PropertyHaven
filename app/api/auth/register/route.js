import connectDB from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcrypt";

// POST: api/auth/register
export const POST = async (request) => {
	try {
		await connectDB();
		const body = await request.json();
		const { username, email, password } = body;
		console.log(username, email, password);
		const hash = await bcrypt.hash(password, 10);
		const createdUser = await User.create({
			username,
			email,
			password: hash,
		});
		if (createdUser) {
			return new Response("User created successfully", { status: 200 });
		} else {
			return new Response("Failed to create user", { status: 500 });
		}
	} catch (error) {
		console.error("API:(/api/auth) ENCOUNTERED ERROR: ", error);
		return new Response("Unexpected server error", { status: 500 });
	}
};

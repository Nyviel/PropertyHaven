import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
	mongoose.set("strictQuery", true);

	if (connected) {
		console.log("DB: MONGODB IS ALREADY CONNECTED");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI);
		connected = true;
		console.log("DB: MONGODB CONNECTED");
	} catch (error) {
		console.log("DB: FAILED TO CONNECT TO MONGODB, ERROR: ", error);
	}
};

export default connectDB;

import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: [true, "Email already exists"],
			required: [true, "Email is required"],
		},
		name: {
			type: String,
			required: [true, "User name is required"],
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		picture: {
			type: String,
		},
		bookmarks: [
			{
				type: Schema.Types.ObjectId,
				ref: "Property",
			},
		],
	},
	{
		timestamps: true,
	}
);

const User = models.User || model("User", UserSchema);
export default User;

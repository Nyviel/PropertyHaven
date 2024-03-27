"use client";

import { sendMessage } from "@/services/messageService";
import { Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const PropertyContactForm = ({ property }) => {
	const [fields, setFields] = useState({
		name: "",
		email: "",
		phone: "",
		body: "",
	});
	const [wasSubmitted, setWasSubmitted] = useState(false);
	const { data: session } = useSession();
	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			name: fields.name,
			email: fields.email,
			phone: fields.phone,
			body: fields.body,
			recipient: property.owner,
			property: property._id,
		};

		try {
			const [status, res] = await sendMessage(data);
			if (status === 200) {
				toast.success("Message sent sucessfully!");
				setWasSubmitted(true);
			} else {
				toast.error(res.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(
				"Something went wrong while attempting to send message"
			);
		}
	};

	return (
		<div className="bg-primary-100 p-6 rounded-lg shadow-md">
			<h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
			{!session ? (
				<p>You must be logged in to send a message</p>
			) : wasSubmitted ? (
				<p className="text-green-500 text-semibold text-lg">
					Your message has been sent
				</p>
			) : (
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<Input
							id="name"
							type="text"
							label="Name"
							placeholder="Enter your name..."
							value={fields.name}
							onChange={(e) => {
								setFields((prev) => ({
									...prev,
									name: e.target.value,
								}));
							}}
							isRequired
						/>
					</div>
					<div className="mb-4">
						<Input
							id="email"
							type="email"
							label="Email"
							placeholder="Enter your email..."
							value={fields.email}
							onChange={(e) => {
								setFields((prev) => ({
									...prev,
									email: e.target.value,
								}));
							}}
							isRequired
						/>
					</div>
					<div className="mb-4">
						<Input
							id="phone"
							type="text"
							label="Phone"
							value={fields.phone}
							onChange={(e) => {
								setFields((prev) => ({
									...prev,
									phone: e.target.value,
								}));
							}}
							placeholder="Enter your phone number..."
						/>
					</div>
					<div className="mb-4">
						<Textarea
							id="message"
							label="Message"
							placeholder="Enter your message..."
							value={fields.body}
							onChange={(e) => {
								setFields((prev) => ({
									...prev,
									body: e.target.value,
								}));
							}}
							isRequired
						></Textarea>
					</div>
					<div>
						<button
							className="bg-primary-500 hover:bg-primary-600 text-gray-100 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
							type="submit"
						>
							<i className="fas fa-paper-plane mr-2"></i> Send
							Message
						</button>
					</div>
				</form>
			)}
		</div>
	);
};
export default PropertyContactForm;

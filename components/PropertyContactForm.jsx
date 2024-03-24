import { Input, Textarea } from "@nextui-org/react";

const PropertyContactForm = ({ property }) => {
	return (
		<div className="bg-primary-100 p-6 rounded-lg shadow-md">
			<h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
			<form>
				<div className="mb-4">
					<Input
						id="name"
						type="text"
						label="Name"
						placeholder="Enter your name..."
						isRequired
					/>
				</div>
				<div className="mb-4">
					<Input
						id="email"
						type="email"
						label="Email"
						placeholder="Enter your email..."
						isRequired
					/>
				</div>
				<div className="mb-4">
					<Input
						id="phone"
						type="text"
						label="Phone"
						placeholder="Enter your phone number..."
					/>
				</div>
				<div className="mb-4">
					<Textarea
						id="message"
						label="Message"
						placeholder="Enter your message..."
					></Textarea>
				</div>
				<div>
					<button
						className="bg-primary-500 hover:bg-primary-600 text-gray-100 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
						type="submit"
					>
						<i className="fas fa-paper-plane mr-2"></i> Send Message
					</button>
				</div>
			</form>
		</div>
	);
};
export default PropertyContactForm;

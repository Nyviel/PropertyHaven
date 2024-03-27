"use client";

const Message = ({ message }) => {
	return (
		<div className="flex flex-col gap-3 bg-primary-200 p-4 rounded-md shadow-md ">
			<h2 className="text-xl mb-4 text-primary-950">
				<span className="font-bold text-primary-900">
					Property Inquiry:{" "}
				</span>
				{message.property.name}
			</h2>
			<p className="text-primary-950">{message.body}</p>

			<ul className="mt-4 text-primary-950">
				<li>
					<strong>Name: </strong> {message.name}
				</li>

				<li>
					<strong>Reply Email: </strong>
					{message.email}
				</li>
				<li>
					<strong>Reply Phone: </strong>
					{message.phone}
				</li>
				<li>
					<strong>Received: </strong>
					{new Date(message.createdAt).toUTCString()}
				</li>
			</ul>
			<div className="flex">
				<button className="mt-4 mr-3 bg-primary-400 text-white py-2 px-4 rounded-md">
					Mark As Read
				</button>
				<a
					href="mailto:recipient@example.com"
					className="mt-4 mr-3 bg-primary-700 text-white py-2 px-4 rounded-md"
				>
					Reply
				</a>
				<button className="mt-4 bg-primary-950 text-white py-2 px-4 rounded-md">
					Delete
				</button>
			</div>
		</div>
	);
};
export default Message;

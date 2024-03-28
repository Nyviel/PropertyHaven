"use client";

import { useGlobalContext } from "@/context/GlobalContext";
import { deleteMessage, toggleRead } from "@/services/messageService";
import { useState } from "react";
import { toast } from "react-toastify";

const Message = ({ message }) => {
	const { setUnreadCount } = useGlobalContext();
	const [isRead, setIsRead] = useState(message.read);
	const [isDeleted, setIsDeleted] = useState(false);

	const handleMarkAsRead = async () => {
		try {
			const result = await toggleRead(message._id);
			if (!result) {
				toast.error("Couldn't toggle the read status");
			} else {
				setIsRead(result.read);
				setUnreadCount((prevCount) =>
					result.read ? prevCount - 1 : prevCount + 1
				);
				toast.success("Successfully toggled the read status");
			}
		} catch (error) {
			console.error(error);
			toast.error("Failed to mark as read");
		}
	};

	const handleDeleteMessage = async () => {
		try {
			const result = await deleteMessage(message._id);
			if (!result) {
				toast.error("Couldn't delete the message");
			} else {
				setIsDeleted(true);
				setUnreadCount((prevCount) =>
					isRead ? prevCount : prevCount - 1
				);
				toast.success("Successfully deleted the message");
			}
		} catch (error) {
			console.error(error);
			toast.error("Failed to delete message");
		}
	};

	if (isDeleted) return null;

	return (
		<div className="flex flex-col relative gap-3 bg-primary-200 p-4 rounded-md shadow-md ">
			{!isRead && (
				<div className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-md">
					New
				</div>
			)}
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
				<button
					onClick={handleMarkAsRead}
					className={`${
						isRead ? "bg-yellow-500" : "bg-primary-400"
					} mt-4 mr-3 py-2 px-4 text-white rounded-md`}
				>
					{isRead ? "Mark As New" : "Mark As Read"}
				</button>
				<a
					href="mailto:recipient@example.com"
					className="mt-4 mr-3 bg-primary-700 text-white py-2 px-4 rounded-md"
				>
					Reply
				</a>
				<button
					onClick={handleDeleteMessage}
					className="mt-4 bg-primary-950 text-white py-2 px-4 rounded-md"
				>
					Delete
				</button>
			</div>
		</div>
	);
};
export default Message;

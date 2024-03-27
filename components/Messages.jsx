"use client";

import { fetchMessages } from "@/services/messageService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Message from "./Message";
import Spinner from "./Spinner";

const Messages = () => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getMessages = async () => {
			const res = await fetchMessages();
			if (res) {
				setMessages(res.messages);
				console.log(res.messages);
			} else {
				toast.error("Failed to fetch messages");
			}
			setLoading(false);
		};
		setLoading(true);
		getMessages();
	}, []);
	return (
		<section>
			<div className="container m-auto py-24 max-w-6xl">
				<div className="bg-primary-100 px-6 py-8 mb-4 shadow-md shadow-primary-300 rounded-md m-4 md:m-0">
					<h1 className="text-3xl font-bold mb-4">Your Messages</h1>

					<div className="space-y-4">
						{(!messages.length && loading) ?? (
							<Spinner loading={loading} />
						)}
						{!messages.length ? (
							<p>You have no messages</p>
						) : (
							messages.map((message, index) => {
								return (
									<Message message={message} key={index} />
								);
							})
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
export default Messages;

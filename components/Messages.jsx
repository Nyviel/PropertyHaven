"use client";

import { fetchMessages } from "@/services/messageService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Messages = () => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getMessages = async () => {
			const res = await fetchMessages();
			if (res) {
				setMessages(res);
			} else {
				toast.error("Failed to fetch messages");
			}
			setLoading(false);
		};
		setLoading(true);
		getMessages();
	}, []);
	return <div>Messages</div>;
};
export default Messages;

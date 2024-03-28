const api = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function sendMessage(data) {
	try {
		if (!api) {
			return null;
		}

		const res = await fetch(`${api}/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		return [res.status, await res.json()];
	} catch (error) {
		console.log("SERVICE (message sendMessage): ", error);
		return null;
	}
}

export async function fetchMessages() {
	try {
		if (!api) {
			return [];
		}

		const res = await fetch(`${api}/messages`);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log("SERVICE (message fetchMessages): ", error);
		return null;
	}
}

export async function toggleRead(id) {
	try {
		if (!api) {
			return null;
		}

		const res = await fetch(`${api}/messages/${id}`, { method: "PUT" });
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log("SERVICE (message toggleRead): ", error);
		return null;
	}
}

export async function deleteMessage(id) {
	try {
		if (!api) {
			return null;
		}

		const res = await fetch(`${api}/messages/${id}`, { method: "DELETE" });
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log("SERVICE (message deleteMessage): ", error);
		return null;
	}
}

export async function fetchUnreadCount() {
	try {
		if (!api) {
			return null;
		}

		const res = await fetch(`${api}/messages/unread-count`);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log("SERVICE (message fetchUnreadCount): ", error);
		return null;
	}
}

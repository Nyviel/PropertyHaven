const api = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const toggleBookmark = async (property) => {
	try {
		const response = await fetch(`${api}/bookmarks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ propertyID: property._id }),
		});
		if (response.ok) {
			const data = response.json();
			return data;
		} else {
			return null;
		}
	} catch (error) {}
};

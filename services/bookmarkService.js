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
			return response.json();
		} else {
			return null;
		}
	} catch (error) {
		console.log("SERVICE: (bookmarks toggleBookmark):", error);
		return null;
	}
};

export const checkBookmark = async (property) => {
	try {
		const response = await fetch(`${api}/bookmarks/check`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ propertyID: property._id }),
		});
		if (response.ok) {
			return response.json();
		} else {
			return null;
		}
	} catch (error) {
		console.log("SERVICE: (bookmarks checkBookmark):", error);
		return null;
	}
};

export const fetchBookmarkedProperties = async () => {
	try {
		const response = await fetch(`${api}/bookmarks`);
		if (response.ok) {
			return response.json();
		} else {
			return [];
		}
	} catch (error) {
		console.log("SERVICE: (bookmarks fetchBookmarkedProperties): ", error);
		return null;
	}
};

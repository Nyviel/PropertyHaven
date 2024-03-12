const api = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties() {
	try {
		if (!api) {
			return [];
		}

		const res = await fetch(`${api}/properties`, { cache: "no-store" });
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log("SERVICE:(/properties) Error: ", error);
		return [];
	}
}

export async function fetchProperty(id) {
	try {
		if (!api) {
			return null;
		}
		const res = await fetch(`${api}/properties/${id}`);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log("SERVICE:(/properties/:id) Error: ", error);
		return null;
	}
}

export async function fetchPropertiesByUID(uid) {
	try {
		if (!api) {
			return [];
		}
		const res = await fetch(`${api}/properties/user/${uid}`);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log("SERVICE:(/properties/user/:uid Error: ", error);
		return [];
	}
}

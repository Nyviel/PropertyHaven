export async function fetchProperties() {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`
		);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log("SERVICE:(/properties) Error: ", error);
	}
}

export async function fetchProperty(id) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`
		);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log("SERVICE:(/properties/:id) Error: ", error);
	}
}

const api = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties(page = 1, pageSize = 9) {
	try {
		if (!api) {
			return [];
		}

		const res = await fetch(
			`${api}/properties?page=${page}&pageSize=${pageSize}`,
			{ cache: "no-store" }
		);
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.error("SERVICE (properties fetchProperties): ", error);
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
		console.error("SERVICE (properties fetchProperty): ", error);
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
		console.error("SERVICE (properties fetchPropertiesByUID: ", error);
		return [];
	}
}

export async function addProperty(propertyFormData) {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`,
			{
				method: "POST",
				body: propertyFormData,
			}
		);
		if (res.ok) {
			return res;
		} else {
			return null;
		}
	} catch (error) {
		console.error("SERVICE (properties addProperty):", error);
		return null;
	}
}

export async function deleteProperty(id) {
	try {
		if (!api) {
			return false;
		}
		const res = await fetch(`${api}/properties/${id}`, {
			method: "DELETE",
		});
		if (!res.ok) {
			throw new Error("Failed to delete property");
		}
		return true;
	} catch (error) {
		console.error("SERVICE (properties deleteProperty): ", error);
		return false;
	}
}

export async function updateProperty(id, formData) {
	try {
		if (!api) {
			return null;
		}
		const res = await fetch(`${api}/properties/${id}`, {
			method: "PUT",
			body: formData,
		});
		if (!res.ok) {
			throw new Error("Failed to update property");
		}
		return res.json();
	} catch (error) {
		console.error("SERVICE (properties updateProperty): ", error);
		return null;
	}
}

export async function fetchSearchResults(location, propertyType) {
	try {
		if (!api) {
			return null;
		}
		const res = await fetch(
			`${api}/properties/search?location=${location}&propertyType=${propertyType}`
		);
		if (!res.ok) {
			throw new Error("Failed to update property");
		}
		return res.json();
	} catch (error) {
		console.error("SERVICE (properties fetchSearchResults): ", error);
		return null;
	}
}

export async function fetchFeaturedProperties() {
	try {
		if (!api) {
			return [];
		}

		const res = await fetch(`${api}/properties/featured`, {
			cache: "no-store",
		});
		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.error("SERVICE (properties fetchFeaturedProperties): ", error);
		return [];
	}
}

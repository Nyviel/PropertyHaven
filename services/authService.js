const api = process.env.NEXT_PUBLIC_API_DOMAIN || null;
export async function postUser(user) {
	try {
		if (!api) {
			return false;
		}

		const res = await fetch(`${api}/auth/register`, {
			method: "POST",
			body: JSON.stringify(user),
		});
		if (!res.ok) {
			throw new Error("Failed to create user");
		}
		return true;
	} catch (error) {
		console.log("SERVICE:(/auth) Error: ", error);
		return false;
	}
}

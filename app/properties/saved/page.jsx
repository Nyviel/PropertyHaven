"use client";

import PropertyCard from "@/components/PropertyCard";
import Spinner from "@/components/Spinner";
import { fetchBookmarkedProperties } from "@/services/bookmarkService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
	const { data: session } = useSession();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (!session || !session?.user) {
			router.replace("/");
		}
	}, [session]);

	useEffect(() => {
		const getProperties = async () => {
			const newProperties = await fetchBookmarkedProperties();
			if (newProperties) {
				setProperties(newProperties.bookmarks);
			} else {
				toast.error("Failed to fetch bookmarks");
			}
			setLoading(false);
		};
		setLoading(true);
		getProperties();
	}, [session]);

	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{loading ? (
					<Spinner loading={loading} />
				) : (
					<>
						<h1 className="text-3xl font-bold mb-6">
							Your Saved Properties
						</h1>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{properties.map((property, index) => {
								return (
									<PropertyCard
										key={index}
										property={property}
									/>
								);
							})}
						</div>
					</>
				)}
			</div>
		</section>
	);
};
export default SavedPropertiesPage;

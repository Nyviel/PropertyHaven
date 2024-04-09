"use client";

import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { fetchFeaturedProperties } from "@/services/propertiesService";
import { toast } from "react-toastify";

const FeaturedProperties = () => {
	const [featuredProperties, setFeaturedProperties] = useState([]);
	useEffect(() => {
		const getFeaturedProps = async () => {
			const res = (await fetchFeaturedProperties()).properties;
			if (!res) {
				toast.error("Failed to fetch featured properties");
			} else {
				setFeaturedProperties(res.slice(0, 3));
			}
		};
		getFeaturedProps();
	}, []);
	return (
		<section className="px-4 pb-12 pt-6 mt-10 bg-primary-400">
			<div className="md:container mx-auto">
				<h2 className="text-3xl font-semibold text-primary-950 mt-10 mb-6 text-center">
					Featured Properties
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{!featuredProperties.length ? (
						<p>No Properties Found</p>
					) : (
						featuredProperties.map((property) => (
							<PropertyCard
								key={property._id}
								property={property}
							/>
						))
					)}
				</div>
			</div>
		</section>
	);
};
export default FeaturedProperties;

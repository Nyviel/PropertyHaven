"use client";

import PropertyCard from "./PropertyCard";
import Link from "next/link";
import { fetchProperties } from "@/services/propertiesService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const HomeProperties = () => {
	const [properties, setProperties] = useState([]);
	useEffect(() => {
		const getProps = async () => {
			const properties = (await fetchProperties()).properties;
			if (!properties) {
				toast.error("Failed fetching properties");
			} else {
				const recentProperties = properties
					.sort(() => Math.random() - Math.random())
					.slice(0, 3);
				setProperties(recentProperties);
			}
		};
		getProps();
	}, []);

	return (
		<>
			<section className="px-4 py-6">
				<div className="container-xl lg:container m-auto">
					<h2 className="text-3xl font-semibold text-blue-500 mt-10 mb-6 text-center">
						Recent Properties
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{!properties.length ? (
							<p>No Properties Found</p>
						) : (
							properties.map((property) => (
								<PropertyCard
									key={property._id}
									property={property}
								/>
							))
						)}
					</div>
				</div>
			</section>
			<section className="m-auto max-w-lg my-10 px-6">
				<Link
					href="/properties"
					className="block bg-primary-500 text-white text-center py-4 px-6 rounded-xl shadow-xl hover:bg-blue-700"
				>
					View All Properties
				</Link>
			</section>
		</>
	);
};

export default HomeProperties;

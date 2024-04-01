"use client";

import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/PropertySearchForm";
import Spinner from "@/components/Spinner";
import { fetchSearchResults } from "@/services/propertiesService";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const SearchResultsPage = () => {
	const searchParams = useSearchParams();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	const location = searchParams.get("location");
	const propertyType = searchParams.get("propertyType");

	useEffect(() => {
		const fetchResults = async () => {
			const results = await fetchSearchResults(location, propertyType);
			if (results) {
				setProperties(results);
			} else {
				toast.error("Failed to fetch properties");
			}
			setLoading(false);
		};
		setLoading(true);
		fetchResults();
	}, [location, propertyType]);

	return (
		<>
			<section className="bg-primary-500 py-4">
				<div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
					<PropertySearchForm />
				</div>
			</section>
			{loading ? (
				<Spinner loading={loading} />
			) : (
				<section className="px-4 py-3">
					<div className="container-xl lg:container m-auto px-4 py-6">
						<Link
							href="/properties"
							className="flex items-center text-primary-700 hover:underline mb-6"
						>
							<FaArrowLeft className="mr-2" /> Return To
							Properties
						</Link>
						<h1 className="text-3xl text-primary-800 mb-4">
							Search Results
						</h1>
						{!properties.length ? (
							<p className="text-xl">No properties found</p>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								{properties.map((property) => (
									<PropertyCard
										key={property._id}
										property={property}
									/>
								))}
							</div>
						)}
					</div>
				</section>
			)}
			;
		</>
	);
};
export default SearchResultsPage;

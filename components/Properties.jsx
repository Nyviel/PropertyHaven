"use client";

import { fetchProperties } from "@/services/propertiesService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropertyCard from "./PropertyCard";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const Properties = () => {
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(6);
	const [totalItems, setTotalItems] = useState(0);
	useEffect(() => {
		const getProperties = async () => {
			const props = await fetchProperties(page, pageSize);
			if (!props) {
				toast.error("Failed to fetch properties!");
			} else {
				setTotalItems(props.total);
				props.properties.sort(
					(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
				);
				setProperties(props.properties);
			}
			setLoading(false);
		};
		getProperties();
	}, [page, pageSize]);
	const handlePageChange = (newPage) => {
		setPage(newPage);
	};
	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto px-4 py-6">
				{loading && <Spinner loading={loading} />}
				{!loading && !properties.length ? (
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
				<Pagination
					page={page}
					pageSize={pageSize}
					totalItems={totalItems}
					onPageChange={handlePageChange}
				/>
			</div>
		</section>
	);
};
export default Properties;

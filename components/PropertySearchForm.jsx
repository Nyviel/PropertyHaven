"use client";

import { Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PROPERTY_TYPES = [
	"All",
	"Apartment",
	"Condo",
	"House",
	"Cabin Or Cottage",
	"Room",
	"Studio",
	"Other",
];

const PropertySearchForm = () => {
	const [location, setLocation] = useState("");
	const [propertyType, setPropertyType] = useState("All");
	const router = useRouter();
	const handleSubmit = (e) => {
		e.preventDefault();
		if (location === "" && propertyType === "All") {
			router.push("/properties");
		} else {
			const query = `?location=${location}&propertyType=${propertyType}`;
			router.push("/properties/search-results" + query);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
		>
			<div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
				<Input
					type="text"
					id="location"
					placeholder="Enter Location (City, State, Zip, etc)"
					label="Location"
					value={location}
					onChange={(e) => {
						setLocation(e.target.value);
					}}
				/>
			</div>
			<div className="w-full md:w-2/5 md:pl-2">
				<Select
					id="property-type"
					label="Property Type"
					placeholder="All..."
					value={propertyType}
					onChange={(e) => {
						setPropertyType(e.target.value);
					}}
				>
					{PROPERTY_TYPES.map((property) => {
						return (
							<SelectItem key={property} value={property}>
								{property}
							</SelectItem>
						);
					})}
				</Select>
			</div>
			<button
				type="submit"
				className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-primary-700 text-white hover:bg-primary-600 focus:outline-none focus:ring focus:ring-blue-500"
			>
				Search
			</button>
		</form>
	);
};
export default PropertySearchForm;

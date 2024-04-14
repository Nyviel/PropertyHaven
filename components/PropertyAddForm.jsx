"use client";
import React from "react";
import {
	Checkbox,
	Divider,
	Input,
	Select,
	SelectItem,
	Textarea,
	Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { addProperty } from "@/services/propertiesService";
import Dropzone from "react-dropzone";

const PROPERTY_TYPES = [
	"Apartment",
	"Condo",
	"House",
	"Cabin Or Cottage",
	"Room",
	"Studio",
	"Other",
];

const PropertyAddForm = () => {
	const router = useRouter();
	const [submittingForm, setSubmittingForm] = useState(false);
	const [fields, setFields] = useState({
		type: "",
		name: "",
		description: "",
		location: {
			street: "",
			city: "",
			state: "",
			zipcode: "",
			latitude: "",
			longitude: "",
		},
		beds: "",
		baths: "",
		square_feet: "",
		amenities: [],
		rates: {
			nightly: "",
			weekly: "",
			monthly: "",
		},
		seller_info: {
			name: "",
			email: "",
			phone: "",
		},
		images: [],
	});

	const handleSelectChange = (e) => {
		setFields((prev) => ({ ...prev, type: e.target.value }));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name.includes(".")) {
			const [outerKey, innerKey] = name.split(".");
			setFields((prev) => ({
				...prev,
				[outerKey]: { ...prev[outerKey], [innerKey]: value },
			}));
		} else {
			setFields((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleAmenitiesChange = (e) => {
		const { checked, value } = e.target;

		const updatedAmenities = [...fields.amenities];
		if (checked) {
			updatedAmenities.push(value);
		} else {
			const index = updatedAmenities.indexOf(value);
			if (index !== -1) {
				updatedAmenities.splice(index, 1);
			}
		}
		setFields((prev) => ({ ...prev, amenities: updatedAmenities }));
	};

	const handleImageChange = (files) => {
		const updatedImages = [...fields.images];
		for (const file of files) {
			updatedImages.push(file);
		}
		setFields((prev) => ({ ...prev, images: updatedImages }));
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		toast.info("Adding new properties is currently disabled");
		// if (submittingForm) return;
		// setSubmittingForm(true);

		// const formData = new FormData(e.target);
		// for (const image of fields.images) {
		// 	formData.append("images", image);
		// }

		// const res = await addProperty(formData);
		// if (res) {
		// 	const newProperty = await res.json();
		// 	router.replace(
		// 		`${process.env.NEXT_PUBLIC_DOMAIN}/properties/${newProperty._id}`
		// 	);
		// 	toast.success("Property has been added!");
		// } else {
		// 	toast.error("Failed to add property");
		// }
		// setSubmittingForm(false);
	};

	return (
		<form onSubmit={handleFormSubmit} className="bg-background">
			<h2 className="text-3xl text-center font-semibold mb-6 text-blue-500">
				Add Property
			</h2>

			<div className="flex flex-col gap-4 my-4">
				<Select
					id="type"
					name="type"
					label="Property Type"
					color="default"
					placeholder="Select property type"
					value={fields.type}
					onChange={handleSelectChange}
					isRequired
				>
					{PROPERTY_TYPES.map((type) => {
						return (
							<SelectItem key={type} value={type}>
								{type}
							</SelectItem>
						);
					})}
				</Select>

				<Input
					type="text"
					id="name"
					label="Property Name"
					placeholder="eg. Beautiful Apartment In Miami"
					name="name"
					value={fields.name}
					onChange={handleChange}
					isRequired
				/>

				<Textarea
					id="description"
					name="description"
					rows="4"
					label="Description"
					placeholder="Add an optional description of your property"
					value={fields.description}
					onChange={handleChange}
				></Textarea>
			</div>

			<div className="mb-4 bg-primary-500 text-white p-4 flex flex-col gap-3 rounded-md">
				<h3 className="font-bold mb-2">
					Location
					<Tooltip
						showArrow={true}
						color="primary"
						content="Latitude and Longitude are necessary to show your property on a map"
					>
						<span>
							<FaQuestionCircle className="inline-block ml-2 mb-1" />
						</span>
					</Tooltip>
				</h3>
				<Input
					type="text"
					id="street"
					name="location.street"
					label="Street"
					placeholder="Enter street name"
					value={fields.location.street}
					onChange={handleChange}
					isRequired
				/>
				<Input
					type="text"
					id="city"
					name="location.city"
					label="City"
					placeholder="Enter city name"
					isRequired
					value={fields.location.city}
					onChange={handleChange}
				/>
				<Input
					type="text"
					id="state"
					name="location.state"
					label="State"
					placeholder="Enter state name"
					isRequired
					value={fields.location.state}
					onChange={handleChange}
				/>
				<Input
					type="text"
					id="zipcode"
					name="location.zipcode"
					label="Zipcode"
					placeholder="Enter zipcode"
					value={fields.location.zipcode}
					onChange={handleChange}
					isRequired
				/>
				<Input
					type="text"
					id="latitude"
					name="location.latitude"
					label="Latitude"
					placeholder="Enter latitude"
					value={fields.location.latitude}
					onChange={handleChange}
					isRequired
				/>
				<Input
					type="text"
					id="longitude"
					name="location.longitude"
					label="Longitude"
					placeholder="Enter longitude"
					value={fields.location.longitude}
					onChange={handleChange}
					isRequired
				/>
			</div>
			<Divider className="my-4" />
			<div className="my-6 flex flex-wrap">
				<div className="w-full sm:w-1/3 pr-2">
					<Input
						type="number"
						id="beds"
						name="beds"
						label="Beds"
						placeholder="Enter beds count..."
						isRequired
						value={fields.beds}
						onChange={handleChange}
					/>
				</div>
				<div className="w-full sm:w-1/3 px-2">
					<Input
						type="number"
						id="baths"
						name="baths"
						label="Baths"
						placeholder="Enter baths count..."
						isRequired
						value={fields.baths}
						onChange={handleChange}
					/>
				</div>
				<div className="w-full sm:w-1/3 pl-2">
					<Input
						type="number"
						id="square_feet"
						name="square_feet"
						label="Square Feet"
						placeholder="Input square feet count..."
						isRequired
						value={fields.square_feet}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="my-8 border-2 border-primary-200 p-4 rounded-md">
				<label className="block text-primary-700 font-bold mb-3">
					Select Amenities
				</label>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_wifi"
							name="amenities"
							value="Wifi"
							checked={fields.amenities.includes("Wifi")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_wifi">Wifi</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_kitchen"
							name="amenities"
							value="Full Kitchen"
							checked={fields.amenities.includes("Full Kitchen")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_kitchen">Full kitchen</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_washer_dryer"
							name="amenities"
							value="Washer & Dryer"
							checked={fields.amenities.includes(
								"Washer & Dryer"
							)}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_washer_dryer">
							Washer & Dryer
						</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_free_parking"
							name="amenities"
							value="Free Parking"
							checked={fields.amenities.includes("Free Parking")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_free_parking">
							Free Parking
						</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_pool"
							name="amenities"
							value="Swimming Pool"
							checked={fields.amenities.includes("Swimming Pool")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_pool">Swimming Pool</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_hot_tub"
							name="amenities"
							value="Hot Tub"
							checked={fields.amenities.includes("Hot Tub")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_hot_tub">Hot Tub</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_24_7_security"
							name="amenities"
							value="24/7 Security"
							checked={fields.amenities.includes("24/7 Security")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_24_7_security">
							24/7 Security
						</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_wheelchair_accessible"
							name="amenities"
							value="Wheelchair Accessible"
							checked={fields.amenities.includes(
								"Wheelchair Accessible"
							)}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_wheelchair_accessible">
							Wheelchair Accessible
						</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_elevator_access"
							name="amenities"
							value="Elevator Access"
							checked={fields.amenities.includes(
								"Elevator Access"
							)}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_elevator_access">
							Elevator Access
						</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_dishwasher"
							name="amenities"
							value="Dishwasher"
							checked={fields.amenities.includes("Dishwasher")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_dishwasher">Dishwasher</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_gym_fitness_center"
							name="amenities"
							value="Gym/Fitness Center"
							checked={fields.amenities.includes(
								"Gym/Fitness Center"
							)}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_gym_fitness_center">
							Gym/Fitness Center
						</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_air_conditioning"
							name="amenities"
							value="Air Conditioning"
							checked={fields.amenities.includes(
								"Air Conditioning"
							)}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_air_conditioning">
							Air Conditioning
						</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_balcony_patio"
							name="amenities"
							value="Balcony/Patio"
							checked={fields.amenities.includes("Balcony/Patio")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_balcony_patio">
							Balcony/Patio
						</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_smart_tv"
							name="amenities"
							value="Smart TV"
							checked={fields.amenities.includes("Smart TV")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_smart_tv">Smart TV</label>
					</div>
					<div>
						<Checkbox
							type="checkbox"
							id="amenity_coffee_maker"
							name="amenities"
							value="Coffee Maker"
							checked={fields.amenities.includes("Coffee Maker")}
							onChange={handleAmenitiesChange}
						/>
						<label htmlFor="amenity_coffee_maker">
							Coffee Maker
						</label>
					</div>
				</div>
			</div>

			<div className="mb-4 bg-primary-500 p-4 text-white rounded-md">
				<label className="block  font-bold mb-2">
					Rates
					<Tooltip
						showArrow={true}
						color="primary"
						content="Leave blank if not applicable"
					>
						<span>
							<FaQuestionCircle className="inline-block ml-2 mb-1" />
						</span>
					</Tooltip>
				</label>
				<div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
					<div className="flex flex-col gap-1">
						<Input
							type="number"
							id="nightly_rate"
							name="rates.nightly"
							label="Nightly"
							placeholder="Enter nightly rates..."
							value={fields.rates.nightly}
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<Input
							type="number"
							id="weekly_rate"
							name="rates.weekly"
							label="Weekly"
							placeholder="Enter weekly rates..."
							value={fields.rates.weekly}
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<Input
							type="number"
							id="monthly_rate"
							name="rates.monthly"
							label="Monthly"
							placeholder="Enter monthly rates..."
							value={fields.rates.monthly}
							onChange={handleChange}
						/>
					</div>
				</div>
			</div>
			<Divider className="my-4" />
			<div className="mb-4">
				<Input
					type="text"
					id="seller_name"
					name="seller_info.name"
					label="Seller Name"
					placeholder="Enter seller name..."
					value={fields.seller_info.name}
					onChange={handleChange}
					isRequired
				/>
			</div>
			<div className="mb-4">
				<Input
					type="email"
					id="seller_email"
					name="seller_info.email"
					label="Seller Email"
					placeholder="Enter email address..."
					value={fields.seller_info.email}
					onChange={handleChange}
					isRequired
				/>
			</div>
			<div className="mb-4">
				<Input
					type="tel"
					id="seller_phone"
					name="seller_info.phone"
					label="Seller Phone"
					placeholder="Enter phone number..."
					value={fields.seller_info.phone}
					onChange={handleChange}
					isRequired
				/>
			</div>
			<Divider className="my-4" />

			<div className="mb-4 bg-primary-500 p-4 text-white rounded-md">
				<label htmlFor="images" className="block font-bold mb-2">
					Images
					<Tooltip
						showArrow={true}
						color="primary"
						content="Enter up to 4 images"
					>
						<span>
							<FaQuestionCircle className="inline-block ml-2 mb-1" />
						</span>
					</Tooltip>
				</label>
				<Dropzone onDrop={handleImageChange}>
					{({ getRootProps, getInputProps }) => (
						<section>
							<div
								{...getRootProps()}
								className="h-48 w-full p-2 border-dashed rounded-md border-gray-300 border-2"
							>
								<input {...getInputProps()} />
								<p>
									Drag 'n' drop some files here, or click to
									select files
								</p>
							</div>
						</section>
					)}
				</Dropzone>
				{fields.images.length ? (
					<div className="my-4">
						<h3 className="font-bold text-white">
							Selected Images
						</h3>
						<div className="flex flex-col gap-3 my-2">
							{fields.images.map((image, index) => {
								return (
									<div
										key={index}
										className="text-black flex gap-2 p-3 bg-gray-200 border-white border-1 rounded-md"
									>
										<p>
											<span className="font-semibold">
												File name:{" "}
											</span>
											{image.name}
										</p>
										<p>
											<span className="font-semibold">
												File size:{" "}
											</span>
											{image.size}B
										</p>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<div></div>
				)}
			</div>

			<div>
				<button
					className={`${
						!submittingForm
							? "bg-primary-500 hover:bg-primary-600"
							: "bg-gray-600"
					}  text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline`}
					type="submit"
					disabled={submittingForm}
				>
					Add Property
				</button>
			</div>
		</form>
	);
};
export default PropertyAddForm;

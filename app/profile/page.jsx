"use client";

import Image from "next/image";
import ProfileDefault from "@/assets/images/profile.png";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
	deleteProperty,
	fetchPropertiesByUID,
} from "@/services/propertiesService";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const ProfilePage = () => {
	const { data: session } = useSession();
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getProps = async () => {
			if (!session) return;

			try {
				const newProperties = await fetchPropertiesByUID(
					session.user.id
				);
				setProperties(newProperties);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		getProps();
	}, [session]);

	const handleDeleteProperty = async (id) => {
		const confirmed = window.confirm(
			"Are you sure you want to delete this property?"
		);

		if (!confirmed) {
			toast.error("Deletion Prompt Rejected!");
			return;
		}

		const res = await deleteProperty(id);
		if (res) {
			const updatedProperties = properties.filter(
				(property) => property._id !== id
			);
			setProperties(updatedProperties);
			toast.success("Property Deleted Successfully!");
		} else {
			toast.error("Failed To Delete Property!");
			alert("Failed to delete property");
		}
	};
	return (
		<section className="">
			<div className="container m-auto py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<h1 className="text-3xl font-bold mx-10 mb-10 lg:mb-20 text-blue-500 text-center">
						Your Profile
					</h1>
					<div className="flex flex-col md:flex-row">
						<div className="md:w-1/4 md:mx-10 mx-auto text-center md:text-left mb-10">
							<div className="mb-4">
								<Image
									className="h-32 w-32 lg:h-48 lg:w-48 md:mx-0 rounded-full "
									src={ProfileDefault}
									alt="User"
									height={0}
									width={0}
									sizes={"100vw"}
								/>
							</div>
							<h2 className="text-xl mb-4">
								<span className="font-bold block">Name</span>{" "}
								{session ? session.user?.name : ""}
							</h2>
							<h2 className="text-xl">
								<span className="font-bold block">Email</span>{" "}
								{session ? session.user?.email : ""}
							</h2>
						</div>

						<div className="md:w-3/4 md:pl-4">
							<h2 className="text-xl font-semibold mb-4">
								Your Listings
							</h2>
							{!properties.length && loading && (
								<Spinner loading={loading} />
							)}
							{!properties.length && !loading ? (
								<div>
									<p className="font-base text-lg mb-5">
										There are no properties added yet.
										<br /> Add your first property by
										clicking the button below.
									</p>
									<Link
										href="/properties/add"
										className="0 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
									>
										Add Property!
									</Link>
								</div>
							) : (
								properties.map((property, index) => {
									return (
										<div
											key={index}
											className="mb-10 shadow-lg shadow-blue-300 p-4 rounded-md"
										>
											<Link
												href={`/properties/${property._id}`}
											>
												<Image
													className="h-32 w-full rounded-md object-cover"
													src={property.images[0]}
													alt="Property Thumbnail"
													height={0}
													width={0}
													sizes={"100vw"}
												/>
											</Link>
											<div className="mt-2">
												<p className="text-lg font-semibold">
													{property.name}
												</p>
												<p className="text-gray-600">
													Address:{" "}
													{`${property.location.street} ${property.location.city}, ${property.location.state}`}
												</p>
											</div>
											<div className="mt-2">
												<Link
													href={`/properties/${property._id}/edit`}
													className="0 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
												>
													Edit
												</Link>
												<Link
													href={`/properties/${property._id}`}
													className="bg-orange-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-orange-600"
												>
													Details
												</Link>
												<button
													className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
													type="button"
													onClick={() => {
														handleDeleteProperty(
															property._id
														);
													}}
												>
													Delete
												</button>
											</div>
										</div>
									);
								})
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default ProfilePage;

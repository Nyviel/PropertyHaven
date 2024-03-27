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
import ProfileListing from "@/components/ProfileListing";
import { FaArrowLeft } from "react-icons/fa";

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
		<section>
			<div className="bg-primary-500">
				<div className="container mx-auto min-h-48 text-center py-5">
					<Link
						href="/"
						className="flex items-center text-white hover:underline py-3"
					>
						<FaArrowLeft className="mr-2" /> Return to Home
					</Link>
					<h1 className="text-3xl font-bold mx-10 my-10 text-primary-950 text-center">
						Your Profile
					</h1>
					<div className="w-full flex flex-col items-center justify-center">
						<Image
							src={ProfileDefault}
							alt="User"
							height={0}
							width={0}
							sizes={"100vw"}
							className="w-48 h-48 rounded-full"
						></Image>
						<h2 className="text-xl mt-6 mb-4 text-white">
							<span className="font-bold block text-primary-950">
								Name
							</span>{" "}
							{session ? session.user?.name : ""}
						</h2>
						<h2 className="text-xl mb-4 text-white">
							<span className="font-bold block text-primary-950">
								Email
							</span>{" "}
							{session ? session.user?.email : ""}
						</h2>
					</div>
				</div>
			</div>
			<div className="container m-auto my-12">
				<div className="px-6 py-8 mb-4 m-4 md:m-0">
					<div className="flex flex-col md:flex-row">
						<div className="w-full md:pl-4">
							<h2 className="text-2xl font-semibold mb-4 text-primary-700">
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
										className="bg-primary-500 hover:bg-primary-600 text-primary-950 font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
									>
										Add Property!
									</Link>
								</div>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{properties.map((property, index) => {
										return (
											<ProfileListing
												property={property}
												deleteHandler={
													handleDeleteProperty
												}
												key={index}
											/>
										);
									})}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
export default ProfilePage;

"use client";

import Image from "next/image";
import ProfileDefault from "@/assets/images/profile.png";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchPropertiesByUID } from "@/services/propertiesService";
const ProfilePage = () => {
	const { data: session } = useSession();
	const [properties, setProperties] = useState([]);
	useEffect(() => {
		const getProps = async () => {
			if (!session) return;

			setProperties(await fetchPropertiesByUID(session.user.id));
		};
		getProps();
	}, [session]);
	return (
		<section className="bg-blue-50">
			<div className="container m-auto py-24">
				<div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<h1 className="text-3xl font-bold mb-4">Your Profile</h1>
					<div className="flex flex-col md:flex-row">
						<div className="md:w-1/4 mx-20 mt-10">
							<div className="mb-4">
								<Image
									className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
									src={ProfileDefault}
									alt="User"
									height={0}
									width={0}
									sizes={"100vw"}
								/>
							</div>
							<h2 className="text-2xl mb-4">
								<span className="font-bold block">Name: </span>{" "}
								{session ? session.user?.name : ""}
							</h2>
							<h2 className="text-2xl">
								<span className="font-bold block">Email: </span>{" "}
								{session ? session.user?.email : ""}
							</h2>
						</div>

						<div className="md:w-3/4 md:pl-4">
							<h2 className="text-xl font-semibold mb-4">
								Your Listings
							</h2>
							{!properties.length ? (
								<div>
									<p className="font-base text-lg mb-5">
										There are no properties added yet.
										<br /> Add your first property by
										clicking the button below.
									</p>
									<Link
										href="/properties/add"
										className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
									>
										Add Property!
									</Link>
								</div>
							) : (
								properties.map((property, index) => {
									return (
										<div key={index} className="mb-10">
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
													href="/properties/add"
													className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
												>
													Edit
												</Link>
												<button
													className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
													type="button"
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

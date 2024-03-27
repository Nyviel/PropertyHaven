import Image from "next/image";
import Link from "next/link";

const ProfileListing = ({ property, deleteHandler }) => {
	return (
		<div className="mb-10 bg-primary-50 shadow-lg shadow-primary-300 p-4 rounded-md">
			<Link href={`/properties/${property._id}`}>
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
				<p className="text-lg text-primary-800 font-semibold">
					{property.name}
				</p>
				<p className="text-primary-600">
					Address:{" "}
					{`${property.location.street} ${property.location.city}, ${property.location.state}`}
				</p>
			</div>
			<div className="mt-2 flex gap-2 flex-wrap">
				<Link
					href={`/properties/${property._id}/edit`}
					className="bg-orange-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-orange-600"
				>
					Edit
				</Link>
				<Link
					href={`/properties/${property._id}`}
					className="bg-primary-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-primary-600"
				>
					Details
				</Link>
				<button
					className="bg-red-500 text-white px-3 py-3 rounded-md hover:bg-red-600"
					type="button"
					onClick={() => {
						deleteHandler(property._id);
					}}
				>
					Delete
				</button>
			</div>
		</div>
	);
};
export default ProfileListing;

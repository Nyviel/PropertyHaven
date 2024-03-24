import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import {
	FaBed,
	FaBath,
	FaRulerCombined,
	FaMoneyBill,
	FaMapMarker,
} from "react-icons/fa";

const PropertyCard = ({ property }) => {
	const getRateDisplay = () => {
		const { rates } = property;
		if (rates.monthly) {
			return `${rates.monthly.toLocaleString()}/mo`;
		} else if (rates.weekly) {
			return `${rates.weekly.toLocaleString()}/wk`;
		} else if (rates.nightly) {
			return `${rates.nightly.toLocaleString()}/nt`;
		}
	};
	return (
		<div className="bg-primary-50 rounded-xl shadow-lg shadow-primary-200 relative">
			<Image
				src={property.images[0]}
				alt=""
				height={0}
				width={0}
				sizes="100vw"
				className="w-full h-auto rounded-t-xl"
			/>
			<div className="p-4">
				<div className="text-left md:text-center lg:text-left mb-6">
					<div className="text-primary-700">{property.type}</div>
					<h3 className="text-primary-800 text-xl font-bold">
						{property.name}
					</h3>
				</div>
				<h3 className="absolute top-[10px] right-[10px] bg-primary-50 px-4 py-2 rounded-lg text-primary-700 font-bold text-right md:text-center lg:text-right">
					${getRateDisplay()}
				</h3>

				<div className="flex justify-center gap-4 text-primary-700 mb-4">
					<p>
						<FaBed className="inline mr-2" /> {property.beds}{" "}
						<span className="md:hidden lg:inline">Beds</span>
					</p>
					<p>
						<FaBath className="inline mr-2" /> {property.baths}{" "}
						<span className="md:hidden lg:inline">Baths</span>
					</p>
					<p>
						<FaRulerCombined className="inline mr-2" />
						{property.square_feet}{" "}
						<span className="md:hidden lg:inline">sqft</span>
					</p>
				</div>

				<div className="flex justify-center gap-4 text-green-500 text-sm mb-4">
					{property.rates.nightly && (
						<p>
							<FaMoneyBill className="inline mr-2" />
							Nightly
						</p>
					)}
					{property.rates.weekly && (
						<p>
							<FaMoneyBill className="inline mr-2" />
							Weekly
						</p>
					)}
					{property.rates.monthly && (
						<p>
							<FaMoneyBill className="inline mr-2" />
							Monthly
						</p>
					)}
				</div>

				<Divider className="bg-primary-900 my-5" />

				<div className="flex flex-col lg:flex-row justify-between mb-4">
					<div className="flex align-middle gap-2 mb-4 lg:mb-0">
						<FaMapMarker className="mt-1 text-orange-600" />
						<span className="text-orange-600">
							{property.location.city} {property.location.state}
						</span>
					</div>
					<Link
						href={`/properties/${property._id}`}
						className="h-[36px] bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-center text-sm"
					>
						Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PropertyCard;

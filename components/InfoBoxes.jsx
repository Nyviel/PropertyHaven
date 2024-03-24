import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
	return (
		<section>
			<div className="container-xl lg:container m-auto mt-10">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
					<InfoBox
						heading="For Renters"
						textColor="text-primary-900"
						backgroundColor="bg-primary-50"
						buttonInfo={{
							text: "Browse Properties",
							link: "/properties",
							backgroundColor: "bg-orange-700",
						}}
					>
						Find your dream rental property. Bookmark properties and
						contact owners.
					</InfoBox>
					<InfoBox
						heading="For Property Owners"
						textColor="text-primary-900"
						backgroundColor="bg-primary-100"
						buttonInfo={{
							text: "Add Property",
							link: "/properties/add",
							backgroundColor: "bg-primary-500",
						}}
					>
						List your properties and reach potential tenants. Rent
						as an airbnb or long term.
					</InfoBox>
				</div>
			</div>
		</section>
	);
};

export default InfoBoxes;

import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	TwitterIcon,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from "react-share";

const ShareButtons = ({ property }) => {
	const shareURL = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
	const propertyHashtag = "#" + property.type.replace(/\s/g, "") + "ForRent";
	return (
		<>
			<h3 className="text-xl font-bold text-center pt-2">
				Share this Property:
			</h3>
			<div className="flex gap-3 justify-center pb-5">
				<FacebookShareButton
					url={shareURL}
					quote={property.name}
					hashtag={propertyHashtag}
				>
					<FacebookIcon size={40} round={true} />
				</FacebookShareButton>
				<TwitterShareButton
					url={shareURL}
					title={property.name}
					hashtags={propertyHashtag}
				>
					<TwitterIcon size={40} round={true} />
				</TwitterShareButton>
				<WhatsappShareButton
					url={shareURL}
					title={property.name}
					separator=":: "
				>
					<WhatsappIcon size={40} round={true} />
				</WhatsappShareButton>
				<EmailShareButton
					url={shareURL}
					subject={property.name}
					body={`Checkout this property listing: ${shareURL}`}
				>
					<EmailIcon size={40} round={true} />
				</EmailShareButton>
			</div>
		</>
	);
};
export default ShareButtons;

import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
const Footer = () => {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-blue-700 py-4">
			<div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
				<div className="mb-4 md:mb-0 flex gap-3 items-center text-white font-semibold text-lg">
					<Image src={logo} alt="Logo" className="h-8 w-auto" />
					<span>PropertyHaven</span>
				</div>

				<div>
					<p className=" text-white mt-2 md:mt-0">
						&copy; {currentYear} PropertyHaven. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

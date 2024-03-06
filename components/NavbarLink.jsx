import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLink = ({ route, text, onClick }) => {
	const pathname = usePathname();
	return (
		<Link
			href={route}
			className={`${
				pathname === route ? "border-b-2 border-orange-600" : ""
			} text-white hover:bg-orange-800 px-3 py-2`}
			onClick={() => onClick()}
		>
			{text}
		</Link>
	);
};

export default NavbarLink;

import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
	title: "Property Haven | Your go to rental website",
	description: "Browse, rent, buy and sell properties on Property Haven!",
	keywords:
		"rental, properties, apartments, find properties, rent properties, rent",
};

const MainLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Navbar></Navbar>
				<main>{children}</main>
			</body>
		</html>
	);
};

export default MainLayout;

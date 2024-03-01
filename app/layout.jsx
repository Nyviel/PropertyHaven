import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
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
			<body className="flex flex-col">
				<Navbar />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
};

export default MainLayout;

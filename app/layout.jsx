import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { inter } from "./ui/inter";
import { poppins } from "./ui/poppins";
import NextUIWrapper from "@/components/NextUIWrapper";

export const metadata = {
	title: "Property Haven | Your go to rental website",
	description: "Browse, rent, buy and sell properties on Property Haven!",
	keywords:
		"rental, properties, apartments, find properties, rent properties, rent",
};

const MainLayout = ({ children }) => {
	return (
		<AuthProvider>
			<html lang="en">
				<body
					className={`${poppins.className} ${inter.className} antialiased flex flex-col bg-blue-50`}
				>
					<NextUIWrapper>
						<Navbar />
						<main className="flex-1">{children}</main>
						<Footer />
					</NextUIWrapper>
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="colored"
						transition={Bounce}
					/>
				</body>
			</html>
		</AuthProvider>
	);
};

export default MainLayout;

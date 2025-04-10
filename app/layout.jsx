import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";
import { inter } from "./ui/inter";
import { poppins } from "./ui/poppins";
import NextUIWrapper from "@/components/NextUIWrapper";
import NextThemesWrapper from "@/components/NextThemesWrapper";
import { GlobalProvider } from "@/context/GlobalContext";
import Banner from "@/components/Banner";
export const metadata = {
	title: "Property Haven | Your go to rental website",
	description: "Browse, rent, buy and sell properties on Property Haven!",
	keywords:
		"rental, properties, apartments, find properties, rent properties, rent",
};

const MainLayout = ({ children }) => {
	return (
		<GlobalProvider>
			<AuthProvider>
				<html lang="en" suppressHydrationWarning={true}>
					<body
						className={`${poppins.className} ${inter.className} antialiased bg-background`}
					>
						<NextUIWrapper>
							<NextThemesWrapper>
								<Banner />
								<Navbar />
								<main className="flex-1">{children}</main>
								<Footer />
							</NextThemesWrapper>
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
		</GlobalProvider>
	);
};

export default MainLayout;

"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const res = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});
		if (!res.ok) {
			setError("Failed to auth user");
			toast.error("Login Failed!");
		} else {
			router.replace("/");
			toast.success("Signed In Successfully!");
		}
	};
	return (
		<section className="bg-blue-50 h-full">
			<div className="container mx-auto h-full py-24 flex justify-center items-center">
				<div className="w-11/12 md:w-1/2 lg:w-1/3 bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<form
						onSubmit={(e) => {
							handleFormSubmit(e);
						}}
					>
						<h2 className="text-3xl text-center font-semibold mb-6 text-blue-500">
							Login
						</h2>
						<hr />
						<div className="my-6 font-semibold text-center">
							Log in with your email address
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 font-bold mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="border rounded w-full py-2 px-3 mb-2"
								placeholder="Email address"
								required
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 font-bold mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="border rounded w-full py-2 px-3 mb-2"
								placeholder="Password"
								required
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>

						<div className="my-1">
							{error && (
								<p className="text-red-500 text-base font-medium">
									{"Error: " + error}
								</p>
							)}
						</div>

						<div>
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-5 mb-2 rounded-full w-full focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Login
							</button>
							<Link
								href="/auth/register"
								className="text-blue-500 text-base p-1 flex items-center underline font-light hover:text-blue-950"
							>
								Not a member yet? Register with us here!
								<FaArrowRight className="inline-block ml-2" />
							</Link>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default LoginPage;

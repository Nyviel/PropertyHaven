"use client";

import { postUser } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (!email || !name || !password || !repeatPassword) {
			setError("Form fields can't be empty");
			return;
		}

		if (password !== repeatPassword) {
			setError("Passwords don't match");
			return;
		}

		const res = await postUser({ name, email, password });
		if (!res) {
			setError("Failed to create an account");
		} else {
			router.replace("/auth/login");
		}
	};
	return (
		<section className="bg-blue-50 h-full w-full">
			<div className="container h-full m-auto flex py-12 justify-center items-center">
				<div className="sm:w-11/12 md:w-1/2 lg:w-1/3 bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<form
						onSubmit={(e) => {
							handleFormSubmit(e);
						}}
					>
						<h2 className="text-3xl text-center font-semibold mb-6 text-blue-500">
							Create An Account
						</h2>
						<hr />
						<div className="my-6 font-semibold text-center">
							Register with your email address
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 font-bold mb-2">
								Name
							</label>
							<input
								type="text"
								name="name"
								className="border rounded w-full py-2 px-3 mb-2"
								placeholder="Full name..."
								required
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</div>

						<div className="mb-4">
							<label
								className="block text-gray-700 font-bold mb-2"
								htmlFor="email"
							>
								Email
							</label>
							<input
								type="email"
								name="email"
								className="border rounded w-full py-2 px-3 mb-2"
								placeholder="Email address..."
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
								name="password"
								className="border rounded w-full py-2 px-3 mb-2"
								placeholder="Password"
								required
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 font-bold mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								name="repeatPassword"
								className="border rounded w-full py-2 px-3 mb-2"
								placeholder="Confirm Password"
								required
								onChange={(e) => {
									setRepeatPassword(e.target.value);
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
								className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-5 mb-2 rounded-full w-full focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Register
							</button>
							<Link
								href="/auth/login"
								className="text-blue-500 text-base p-1 flex items-center underline font-light hover:text-blue-950"
							>
								Already have an account? Proceed to the login
								page
								<FaArrowRight className="inline-block ml-2" />
							</Link>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default RegisterPage;

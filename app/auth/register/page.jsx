"use client";

import { postUser } from "@/services/authService";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const { data: session } = useSession();

	useEffect(() => {
		if (session && session.user) {
			router.replace("/");
		}
	}, [session]);

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
			toast.error("Account Creation Failed!");
		} else {
			router.replace("/auth/login");
			toast.success("New Account Created Successfully!");
		}
	};
	return (
		<section className=" h-full w-full">
			<div className="container h-full m-auto flex py-12 justify-center items-center">
				<div className="sm:w-11/12 md:w-1/2 lg:w-1/3 bg-primary-100 px-6 py-8 mb-4 shadow-lg shadow-primary-300 m-4 md:m-0">
					<form
						onSubmit={(e) => {
							handleFormSubmit(e);
						}}
					>
						<h2 className="text-3xl text-center font-semibold mb-6 text-blue-500">
							Create An Account
						</h2>
						<hr />
						<div className="my-6 font-semibold text-center text-primary-800">
							Register with your email address
						</div>
						<div className="mb-4">
							<Input
								type="text"
								name="name"
								label="Name"
								placeholder="Enter full name..."
								isRequired
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</div>

						<div className="mb-4">
							<Input
								type="email"
								name="email"
								label="Email"
								placeholder="Enter email address..."
								isRequired
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>

						<div className="mb-4">
							<Input
								type="password"
								name="password"
								label="Password"
								placeholder="Enter password..."
								isRequired
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>

						<div className="mb-4">
							<Input
								type="password"
								name="repeatPassword"
								label="Confirm Password"
								placeholder="Enter the password again..."
								isRequired
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
								className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 mt-5 mb-2 rounded-full w-full focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Register
							</button>
							<Link
								href="/auth/login"
								className="text-primary-700 p-1 flex items-center underline font-light hover:text-primary-800"
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

const RegisterPage = () => {
	return (
		<section className="bg-blue-50 h-full w-full">
			<div className="container h-full m-auto flex py-12 justify-center items-center">
				<div className="sm:w-11/12 md:w-1/2 lg:w-1/3 bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<form>
						<h2 className="text-3xl text-center font-semibold mb-6">
							Create An Account
						</h2>

						<div className="my-6 font-semibold text-center">
							Register with your email address
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 font-bold mb-2">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="border rounded w-full py-2 px-3 mb-2"
								placeholder="Full name..."
								required
							/>
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
								placeholder="Email address..."
								required
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
							/>
						</div>

						<div className="mb-4">
							<label className="block text-gray-700 font-bold mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								id="password2"
								name="password2"
								className="border rounded w-full py-2 px-3 mb-2"
								placeholder="Confirm Password"
								required
							/>
						</div>

						<div>
							<button
								className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
								type="submit"
							>
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default RegisterPage;

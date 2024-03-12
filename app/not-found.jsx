import Link from "next/link";

const NotFoundPage = () => {
	return (
		<section className="bg-blue-100 h-full w-full flex items-center justify-center">
			<div className="container max-w-2xl">
				<div className="px-6 py-10 m-4 md:m-0">
					<div className="flex justify-center">
						<p className="text-8xl font-extrabold text-red-500">
							404
						</p>
					</div>
					<div className="text-center">
						<h1 className="text-3xl font-bold mt-4 mb-2">
							Page Not Found
						</h1>
						<p className="text-gray-500 text-xl mt-10 mb-8">
							The page you are looking for does not exist.
						</p>
						<Link
							href="/"
							className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-4 px-6 rounded"
						>
							Go Home
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default NotFoundPage;

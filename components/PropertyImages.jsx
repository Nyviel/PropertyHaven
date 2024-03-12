import Image from "next/image";

const PropertyImages = ({ images }) => {
	return (
		<section className="bg-blue-50 p-8">
			<div className="container mx-auto px-5">
				<h1 className="font-bold text-3xl text-blue-500 pt-2 pb-5">
					Property Images
				</h1>
				{images.length === 1 ? (
					<Image
						src={images[0]}
						alt="Property Image"
						className="object-cover h-[400px] mx-auto rounded-xl"
						width={1800}
						height={400}
						priority={true}
					/>
				) : (
					<div className="grid grid-cols-2 gap-4">
						{images.map((image, index) => {
							return (
								<div
									key={index}
									className={`${
										images.length === 3 && index === 2
											? "col-span-2"
											: "col-span-1"
									}`}
								>
									<Image
										src={image}
										alt="Property Image"
										className="object-cover h-[400px] w-full rounded-xl"
										width={1800}
										height={400}
										priority={true}
									/>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};
export default PropertyImages;

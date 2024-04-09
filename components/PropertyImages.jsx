import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";

const PropertyImages = ({ images }) => {
	return (
		<Gallery>
			<section className=" p-8">
				<div className="container mx-auto px-5">
					<h1 className="font-bold text-3xl text-blue-500 pt-2 pb-5">
						Property Images
					</h1>
					{images.length === 1 ? (
						<Item
							original={images[0]}
							thumbnail={images[0]}
							width={1000}
							height={600}
						>
							{({ ref, open }) => (
								<Image
									ref={ref}
									onClick={open}
									src={images[0]}
									alt="Property Image"
									className="object-cover h-[400px] mx-auto rounded-xl"
									width={1800}
									height={400}
									priority={true}
								/>
							)}
						</Item>
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
										<Item
											original={image}
											thumbnail={image}
											width={1000}
											height={600}
										>
											{({ ref, open }) => (
												<Image
													ref={ref}
													onClick={open}
													src={image}
													alt="Property Image"
													className="object-cover h-[400px] mx-auto rounded-xl hover:cursor-pointer"
													width={1800}
													height={400}
													priority={true}
												/>
											)}
										</Item>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</section>
		</Gallery>
	);
};
export default PropertyImages;

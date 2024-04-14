/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		images: {
			unoptimized: true,
		},
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;

import { toggleBookmark } from "@/services/bookmarkService";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
	const { data: session } = useSession();
	const uid = session?.user?.id;
	const [isBookmarked, setIsBookmarked] = useState(false);
	const handleClick = async () => {
		if (!uid) {
			toast.error("You need to sign in to bookmark a property");
			return;
		}

		try {
			const res = await toggleBookmark(property);
			console.log(res);
			if (res) {
				toast.success(res.message);
				setIsBookmarked(res.isBookmarked);
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		}
	};
	return (
		<button
			onClick={() => {
				handleClick();
			}}
			className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
		>
			<FaBookmark className="inline-block mr-2" />{" "}
			{isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
		</button>
	);
};
export default BookmarkButton;

const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
	const totalPages = Math.ceil(totalItems / pageSize);
	return (
		<section class="container mx-auto flex justify-center items-center my-8">
			<button
				disabled={page === 1}
				class="mr-2 px-2 py-1  bg-primary-500 rounded-md text-white"
				onClick={() => {
					if (page >= 2) onPageChange(page - 1);
				}}
			>
				Previous
			</button>
			<span class="mx-2">
				Page {page} of {totalPages}
			</span>
			<button
				disabled={page === totalPages}
				class="ml-2 px-2 py-1  bg-primary-500 rounded-md text-white"
				onClick={() => {
					if (page <= totalPages - 1) onPageChange(page + 1);
				}}
			>
				Next
			</button>
		</section>
	);
};
export default Pagination;

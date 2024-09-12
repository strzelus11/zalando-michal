export default function ImageInput({ images, setImages }) {
	return (
		<>
			<label>Images</label>
			{!images?.length && (
				<div className="text-slate-500">No images in this product</div>
			)}
			<div className="my-2 flex flex-wrap gap-3">
				{images?.length > 0 && images.map((link, index) => <div></div>)}
				<label className="w-24 h-24 cursor-pointer rounded-lg border flex flex-col items-center justify-center gap-1 text-primary bg-gray-100 shadow-md"></label>
			</div>
		</>
	);
}

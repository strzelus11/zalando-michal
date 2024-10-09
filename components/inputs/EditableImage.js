import { useState } from "react";
import UserIcon from "../icons/UserIcon";
import Backdrop from "../Backdrop";
import toast from "react-hot-toast";

export default function EditableImage({ image, setImage, setFullImage }) {
	async function handleFileChange(e) {
		const files = e.target?.files;
		if (files?.length === 1) {
			const data = new FormData();
			data.set("file", files[0]);

			if (!files[0].type.startsWith("image/")) {
				toast.error("Please select an image file.");
				return;
			}

			const uploadPromise = fetch("/api/upload", {
				method: "POST",
				body: data,
			}).then((response) => {
				if (response.ok) {
					return response.json().then((object) => {
						setImage(object.links[0]);
					});
				}
				throw new Error("Something went wrong");
			});

			await toast.promise(uploadPromise, {
				loading: "Uploading...",
				success: "Upload complete!",
				error: "Upload error.",
			});
		}
	}

	return (
		<div className="p-2 inline-flex items-center flex-col gap-2">
			<div className="rounded-full flex items-center justify-center bg-white/50 p-1 size-[120px] shadow-lg">
				{image ? (
					<>
						<img
							className="w-full h-full object-cover rounded-full cursor-pointer"
							src={image}
							onClick={() => setFullImage(true)}
							alt=""
						/>
					</>
				) : (
					<UserIcon className="text-color-800" />
				)}
			</div>
			<label className="bg-white/50 border-2 border-color-800 shadow-lg text-center py-1 rounded-md hover:scale-105 transition delay-100 duration-300 cursor-pointer w-full">
				<input
					type="file"
					accept="image/*"
					className="hidden"
					onChange={handleFileChange}
				/>
				<span>Edit</span>
			</label>
		</div>
	);
}

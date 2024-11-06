import Backdrop from "@/components/Backdrop";
import Spinner from "@/components/Spinner";
import UserForm from "@/components/inputs/UserForm";
import AccountLayout from "@/components/layout/AccountLayout";
import { useImage } from "@/hooks/useImage";
import useProfile from "@/hooks/useProfile";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
	const session = useSession();
	const [fullImage, setFullImage] = useState(false);

	const { user, loading } = useProfile();
	const { setUserImage } = useImage();

	async function handleProfileUpdate(e, data) {
		e.preventDefault();

		const savingPromise = new Promise(async (resolve, reject) => {
			const response = await fetch("/api/profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				setUserImage(data.image);
				resolve();
			} else reject();
		});

		await toast.promise(savingPromise, {
			loading: "Saving...",
			success: "Profile saved!",
			error: "Error while saving.",
		});
	}

	return (
		<>
			{fullImage && (
				<Backdrop handleClose={() => setFullImage(false)}>
					<img className="rounded-lg max-h-[65vh]" src={user?.image} alt="" />
				</Backdrop>
			)}
			<AccountLayout title="My profile">
				{loading ? (
					<Spinner />
				) : (
					<UserForm
						user={user}
						setFullImage={setFullImage}
						onSubmit={handleProfileUpdate}
					/>
				)}
			</AccountLayout>
		</>
	);
}

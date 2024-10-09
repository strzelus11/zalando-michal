import { usePathname } from "next/navigation";
import { useState } from "react";
import ImageInput from "./ImageInput";
import EditableImage from "./EditableImage";

export default function UserForm({ user, onSubmit, setFullImage }) {
	const [userName, setUserName] = useState(user?.name || "");
	const [email, setEmail] = useState(user?.email || "");
	const [image, setImage] = useState(user?.image || "");
	const [phone, setPhone] = useState(user?.phone || "");
	const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
	const [postalCode, setPostalCode] = useState(user?.postalCode || "");
	const [city, setCity] = useState(user?.city || "");
	const [country, setCountry] = useState(user?.country || "");

	const pathname = usePathname();

	return (
		<form
			onSubmit={(e) =>
				onSubmit(e, {
					name: userName,
					image,
					phone,
					streetAddress,
					postalCode,
					city,
					country,
				})
			}
			className={`${
				pathname.includes("account") && "flex flex-col sm:flex-row gap-5 p-3"
			}`}
		>
			<div className="flex justify-center">
				{pathname.includes("account") && (
					<EditableImage
						image={image}
						setImage={setImage}
						setFullImage={setFullImage}
					/>
				)}
			</div>
			<div>
				<label>Name:</label>
				<input
					type="text"
					placeholder="e.g. John Doe"
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label>Email:</label>
				{pathname.includes("account") && (
					<input type="email" disabled value={user?.email} />
				)}
				{pathname.includes("cart") && (
					<input
						type="email"
						placeholder="e.g. johndoe@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				)}
				<label>Name:</label>
				<input
					type="tel"
					placeholder="e.g. 123 456 789"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
				{pathname.includes("account") && (
					<button type="submit" className="mt-3 primary hidden sm:flex">
						Save all changes
					</button>
				)}
			</div>
			<div className="mt-3 sm:mt-0">
				<div className="md:flex gap-5">
					<div className="flex-1">
						<label>City:</label>
						<input
							type="text"
							placeholder="e.g. London"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</div>
					<div className="flex-1">
						<label>Postal Code:</label>
						<input
							type="text"
							placeholder="e.g. 12-345"
							value={postalCode}
							onChange={(e) => setPostalCode(e.target.value)}
						/>
					</div>
				</div>
				<label>Street Address:</label>
				<input
					type="text"
					placeholder="e.g. Bakery Street"
					value={streetAddress}
					onChange={(e) => setStreetAddress(e.target.value)}
				/>
				<label>Country:</label>
				<input
					type="text"
					placeholder="e.g. England"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
				/>
			</div>
			{pathname.includes("account") && (
				<button
					type="submit"
					className="mt-3 flex justify-center primary sm:hidden"
				>
					Save all changes
				</button>
			)}
			{pathname.includes("cart") && (
				<button
					type="submit"
					onClick={() => {}}
					className="bg-color-700 text-white w-full justify-center mt-3"
				>
					Continue to payment
				</button>
			)}
		</form>
	);
}

import Backdrop from "@/components/Backdrop";
import AccountLayout from "@/components/layout/AccountLayout";
import ProductCard from "@/components/layout/ProductCard";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserProductsPage() {
	const session = useSession();
	const userId = session?.data?.user.id;

	const [products, setProducts] = useState([]);
	const [confirm, setConfirm] = useState(false);

	async function handleDelete() {
		await axios.delete("/api/products/?id=" + confirm);
		toast.success("Product deleted!");
		setConfirm(false);
		router.push("/products");
	}

	useEffect(() => {
		if (session.status === "authenticated") {
			axios.get("/api/products?userId=" + userId).then((response) => {
				setProducts(response.data);
			});
		}
	}, [userId, session]);

	return (
		<>
			<AnimatePresence>
				{confirm && (
					<Backdrop handleClose={() => setConfirm(false)}>
						<h3>Are you sure you want to delete this product?</h3>
						<div className="flex gap-3 justify-center">
							<button onClick={handleDelete} className="delete">
								Yes, delete!
							</button>
							<button onClick={() => setConfirm(false)} className="cancel">
								No, cancel.
							</button>
						</div>
					</Backdrop>
				)}
			</AnimatePresence>
			<AccountLayout title="My products">
				<div className="mt-5 flex flex-col sm:mx-10 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
					{products.map((product, index) => (
						<ProductCard
							key={index}
							{...product}
							index={index}
							setConfirm={() => setConfirm(product._id)}
						/>
					))}
				</div>
			</AccountLayout>
		</>
	);
}

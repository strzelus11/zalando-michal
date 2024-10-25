import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/motion";
import useProfile from "@/hooks/useProfile";
import Spinner from "@/components/Spinner";
import UserForm from "@/components/inputs/UserForm";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/hooks/CartContext";

function getFadeDirection() {
	if (typeof window !== "undefined") {
		return window.innerWidth < 640 ? "down" : "left";
	}
	return "left";
}

export default function CartPage() {
	const { cartProducts, clearCart } = useContext(CartContext);
	const { user, loading } = useProfile();

	const [fadeDirection, setFadeDirection] = useState(getFadeDirection());

	useEffect(() => {
		function handleResize() {
			setFadeDirection(getFadeDirection());
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Layout>
			<div className="flex justify-center p-0 sm:p-10">
				<div className="sm:min-w-[40rem] sm:w-[80%] flex flex-col sm:grid grid-cols-3 gap-10 items-start">
					<motion.div
						variants={fadeIn("right", "spring", 0.1, 1)}
						initial="hidden"
						whileInView="show"
						className="box p-5 col-span-2 text-sm sm:text-normal w-full"
					>
						{!cartProducts?.length && (
							<h3 className="text-2xl font-bold">Your cart is empty.</h3>
						)}
					</motion.div>
					<motion.div
						variants={fadeIn("left", "spring", 0.3, 1)}
						initial="hidden"
						whileInView="show"
						className="box p-5 sticky top-[120px]"
					>
						<h3 className="text-2xl font-bold mb-3">Order information</h3>
						{loading ? (
							<Spinner />
						) : (
							<div className="w-full">
								<UserForm user={user} />
							</div>
						)}
					</motion.div>
				</div>
			</div>
		</Layout>
	);
}

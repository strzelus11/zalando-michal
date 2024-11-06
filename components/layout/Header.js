import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { slideIn } from "@/utils/motion";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import CartIcon from "../icons/CartIcon";
import SearchButton from "../buttons/SearchButton";
import UserButton from "../buttons/UserButton";
import { CartContext } from "@/hooks/CartContext";
import CategoriesLink from "../buttons/CategoriesLink";
import MobileCategories from "../buttons/MobileCategories";
import { useSession } from "next-auth/react";
import UserIcon from "../icons/UserIcon";

const links = ["Link1", "Link2", "Link3", "Link4"];

const Header = () => {
	const inactiveLink =
		"hover:text-primary cursor-pointer hover:scale-105 hover:decoration-primary decoration-color-800 underline underline-offset-4 transition-all delay-150 duration-300";
	const activeLink = inactiveLink.replace(
		"decoration-color-800",
		"decoration-white"
	);

	const [navOpen, setNavOpen] = useState(false);
	const { cartProducts } = useContext(CartContext);

	const router = useRouter();
	const pathname = usePathname();

	const session = useSession();

	return (
		<>
			<header className="fixed top-0 w-full hidden lg:flex justify-around h-[60px] items-center bg-color-800 text-white z-[10] shadow-xl">
				<div>Logo</div>
				<nav className="flex gap-10">
					<Link
						className={`
							${pathname === "/" ? activeLink : inactiveLink}`}
						href={"/"}
					>
						Home
					</Link>
					<Link
						className={`
							${pathname.includes("products") ? activeLink : inactiveLink}`}
						href={"/products"}
					>
						All products
					</Link>
					<CategoriesLink inactiveLink={inactiveLink} activeLink={activeLink} />
				</nav>
				<nav className="flex gap-10 items-center">
					<SearchButton />
					<UserButton />
					<Link href={"/cart"}>
						<div className="flex items-center h-[60px] relative transition-all delay-150 duration-300">
							<CartIcon className="size-7" />
							<div className="absolute top-2 left-4 bg-color-800 text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs">
								{cartProducts.length}
							</div>
						</div>
					</Link>
				</nav>
			</header>
			<header
				className={`w-full lg:hidden fixed top-0 z-10 flex justify-around h-[60px] items-center transition delay-50 duration-500 shadow-xl ${
					navOpen ? "bg-color-900" : "bg-color-800"
				} text-white`}
			>
				<div onClick={() => setNavOpen(true)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="size-7"
					>
						<path
							fillRule="evenodd"
							d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
				<div>Logo</div>
				<Link href={"/cart"} className="group">
					<div className="flex items-center h-[60px] relative transition-all delay-150 duration-300 group-hover:text-primary">
						<CartIcon className="size-7" />
						<div className="absolute top-2 left-4 bg-color-800 text-white border-2 border-white rounded-full items-center justify-center flex size-5 text-xs transition delay-150 duration-300 group-hover:text-primary group-hover:border-primary">
							{cartProducts.length}
						</div>
					</div>
				</Link>
				<AnimatePresence>
					{navOpen && (
						<motion.nav
							variants={slideIn("left", "tween", 0, 0.5, false)}
							initial="hidden"
							whileInView="show"
							exit="exit"
							className="fixed z-10 top-0 left-0 h-screen bg-color-800 w-[60%] pl-[20px]"
						>
							<div
								onClick={() => setNavOpen(false)}
								className="absolute top-5 right-5"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="size-7"
								>
									<path
										fillRule="evenodd"
										d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<div className="flex flex-col justify-between items-start mt-[100px]">
								<nav className="flex flex-col gap-10 justify-center mb-10 text-lg">
									<Link
										className={`${
											pathname === "/" ? activeLink : inactiveLink
										}`}
										href={"/"}
									>
										Home
									</Link>
									<Link
										className={`${
											pathname.includes("/products") ? activeLink : inactiveLink
										}`}
										href={"/products"}
									>
										All products
									</Link>
									<MobileCategories
										inactiveLink={inactiveLink}
										activeLink={activeLink}
										setNavOpen={setNavOpen}
									/>
									<nav className="flex flex-col gap-10 justify-center mt-3 w-full items-start ">
										{session?.status !== "loading" && (
											<>
												{session.status === "authenticated" ? (
													<Link
														href={"/account/profile"}
														className="flex gap-3 items-center my-10"
													>
														{/* {userImage ? (
															<img
																className="size-9 rounded-full object-cover"
																src={userImage}
																alt="User Image"
															/>
														) : ( */}
														<UserIcon className="size-7" />
														{/* )} */}
														<span>Account</span>
													</Link>
												) : (
													<Link href="/login" className="mt-10">
														<span
															className="flex gap-3 items-center cursor-pointer"
															onClick={() => setUserButton((prev) => !prev)}
														>
															<UserIcon className="flex size-7" />
															Login / Signup
														</span>
													</Link>
												)}
											</>
										)}
									</nav>
								</nav>
							</div>
						</motion.nav>
					)}
				</AnimatePresence>
			</header>
		</>
	);
};

export default Header;

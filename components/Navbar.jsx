"use client";

import Image from "next/image";
import logo from "@/assets/images/logo-white.png";
import profileDefault from "@/assets/images/profile.png";
import Link from "next/link";
import { FaSignInAlt, FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import NavbarLink from "./NavbarLink";
import { signOut, useSession } from "next-auth/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { fetchUnreadCount } from "@/services/messageService";
import { useGlobalContext } from "@/context/GlobalContext";

const Navbar = () => {
	const { data: session } = useSession();

	const { unreadCount, setUnreadCount } = useGlobalContext();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (session?.user) {
			console.log(session);
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [session]);

	useEffect(() => {
		const getUnreadMessagesCount = async () => {
			const res = await fetchUnreadCount();
			if (res) {
				setUnreadCount(res.count);
			}
		};
		if (session?.user) {
			getUnreadMessagesCount();
		}
	}, [session]);

	return (
		<nav className="bg-primary-500 border-b border-primary-700">
			<div className="mx-auto lg:container px-2 sm:px-6 lg:px-0">
				<div className="relative flex h-20 items-center justify-between">
					{/* <!-- Mobile menu button--> */}
					<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
						<button
							type="button"
							id="mobile-dropdown-button"
							className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false"
							onClick={() => {
								setIsMobileMenuOpen((prev) => !prev);
							}}
						>
							<span className="absolute -inset-0.5"></span>
							<span className="sr-only">Open main menu</span>
							<svg
								className="block h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</button>
					</div>

					<div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
						{/* <!-- Logo --> */}
						<Link
							className="hidden sm:flex flex-shrink-0 items-center"
							href="/"
						>
							<Image
								className="h-10 w-auto"
								src={logo}
								priority="true"
								alt="PropertyHaven"
							/>

							<span className="hidden md:block text-white text-2xl font-bold ml-2">
								PropertyHaven
							</span>
						</Link>
						{/* <!-- Desktop Menu Hidden below md screens --> */}
						<div className="hidden md:ml-6 md:block">
							<div className="flex space-x-2">
								<NavbarLink route="/" text="Home" />
								<NavbarLink
									route="/properties"
									text="Properties"
								/>
								{isLoggedIn && (
									<NavbarLink
										route="/properties/add"
										text="Add Property"
									/>
								)}
							</div>
						</div>
					</div>

					{/* Theme switching menu */}
					<div className="mr-24 md:mr-0">
						<ThemeSwitcher />
					</div>

					{/* <!-- Right Side Menu (Logged Out) --> */}
					{!isLoggedIn && (
						<div className="hidden md:block md:ml-6">
							<div className="flex items-center gap-3">
								<Link
									href="/auth/login"
									className="flex items-center text-white bg-primary-800 hover:bg-primary-900 hover:text-white rounded-md px-3 py-2"
								>
									<FaSignInAlt className="inline-block mr-2" />
									<span>Login</span>
								</Link>
								<Link
									href="/auth/register"
									className="flex items-center text-white bg-primary-600 hover:bg-primary-800 hover:text-white rounded-md px-3 py-2"
								>
									<FaPen className="inline-block mr-2" />
									<span>Register</span>
								</Link>
							</div>
						</div>
					)}

					{/* <!-- Right Side Menu (Logged In) --> */}
					{isLoggedIn && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
							<Link href="/messages" className="relative group">
								<button
									type="button"
									className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
								>
									<span className="absolute -inset-1.5"></span>
									<span className="sr-only">
										View notifications
									</span>
									<svg
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
										/>
									</svg>
								</button>
								{unreadCount > 0 && (
									<span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
										{unreadCount}
									</span>
								)}
							</Link>
							{/* <!-- Profile dropdown button --> */}
							<div className="relative ml-3">
								<div>
									<button
										type="button"
										className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
										id="user-menu-button"
										aria-expanded="false"
										aria-haspopup="true"
										onClick={() => {
											setIsProfileMenuOpen(
												(prev) => !prev
											);
										}}
									>
										<span className="absolute -inset-1.5"></span>
										<span className="sr-only">
											Open user menu
										</span>
										<Image
											className="h-8 w-8 rounded-full"
											src={profileDefault}
											alt=""
										/>
									</button>
								</div>

								{/* <!-- Profile dropdown --> */}
								{isProfileMenuOpen && (
									<div
										id="user-menu"
										className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
										role="menu"
										aria-orientation="vertical"
										aria-labelledby="user-menu-button"
										tabIndex="-1"
									>
										<Link
											href="/profile"
											className="block px-4 py-2 text-sm text-gray-700"
											role="menuitem"
											tabIndex="-1"
											id="user-menu-item-0"
											onClick={() => {
												setIsProfileMenuOpen(false);
											}}
										>
											Your Profile
										</Link>
										<Link
											href="/properties/saved"
											className="block px-4 py-2 text-sm text-gray-700"
											role="menuitem"
											tabIndex="-1"
											id="user-menu-item-2"
											onClick={() => {
												setIsProfileMenuOpen(false);
											}}
										>
											Saved Properties
										</Link>
										<button
											className="block px-4 py-2 text-sm text-gray-700"
											role="menuitem"
											tabIndex="-1"
											id="user-menu-item-2"
											onClick={() => {
												setIsProfileMenuOpen(false);
												signOut();
											}}
										>
											Sign Out
										</button>
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* <!-- Mobile menu, show/hide based on menu state. --> */}
			{isMobileMenuOpen && (
				<div id="mobile-menu" className="block md:hidden">
					<div className="flex flex-col gap-y-3 px-2 pb-3 pt-2">
						<NavbarLink
							route="/"
							text="Home"
							click={() => {
								setIsMobileMenuOpen((prev) => !prev);
							}}
						/>
						<NavbarLink
							route="/properties"
							text="Properties"
							click={() => {
								setIsMobileMenuOpen((prev) => !prev);
							}}
						/>
						{isLoggedIn && (
							<NavbarLink
								route="/properties/add"
								text="Add Property"
								click={() => {
									setIsMobileMenuOpen((prev) => !prev);
								}}
							/>
						)}
						<Link
							href="/auth/login"
							className="flex items-center text-white 0 hover:bg-blue-900 hover:text-white rounded-md px-3 py-2"
							onClick={() => {
								setIsMobileMenuOpen((prev) => !prev);
							}}
						>
							<FaSignInAlt className="inline-block mr-2" />
							<span>Login</span>
						</Link>
						<Link
							href="/auth/register"
							className="flex items-center text-white bg-primary-600 hover:bg-primary-800 hover:text-white rounded-md px-3 py-2"
							onClick={() => {
								setIsMobileMenuOpen((prev) => !prev);
							}}
						>
							<FaPen className="inline-block mr-2" />
							<span>Register</span>
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;

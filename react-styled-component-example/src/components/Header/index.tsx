"use client";

import React, { useCallback, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Link from "next/link";
import Image from "next/image";

interface IMenu {
	key: string;
	title: string;
	link?: string;
	submenu?: {
		key: string;
		title: string;
		link?: string;
		menu?: {
			title: string;
			link: string;
		}[];
	}[];
}
[];

const Container = styled.header`
	display: flex;
	position: relative;
	align-items: center;
	width: 100%;
`;

const Wrap = styled.div<{ $scroll: boolean; $hover: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top: 0rem;
	height: ${(props) => (props.$hover ? "25.9rem" : "7.2rem")};
	width: 100%;
	z-index: 10;
	background-color: ${(props) =>
		props.$scroll || props.$hover ? "#fff" : "transparent"};
	border-bottom: ${(props) =>
		props.$scroll || props.$hover ? "0.1rem solid #ececec" : "none"};

	transition: height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

	@media (max-width: 768px) {
		height: 5.4rem;
	}
`;

const HeaderContainer = styled.div<{ $scroll: boolean; $hover: boolean }>`
	display: flex;
	align-items: center;
	padding: 2.4rem 3rem;
	width: 100%;

	img:first-child {
		margin-right: 8rem;
		cursor: pointer;
	}

	> div > span,
	a {
		color: ${(props) => (props.$scroll || props.$hover ? "#000" : "#fff")};
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 2.4rem;
		margin-right: 9rem;
		cursor: pointer;

		&:hover {
			color: #ea3460;
		}
	}

	img:last-child {
		display: none;
	}

	@media (max-width: 768px) {
		justify-content: space-between;
		padding: 1.5rem;

		> div {
			display: none;
		}

		img:last-child {
			display: block;
		}
	}
`;

const NavContainer = styled.nav<{ $hover: boolean }>`
	display: flex;
	width: 100%;
	border-top: ${(props) => (props.$hover ? "0.1rem solid #ececec" : "none")};
	padding: 2.4rem 20.3rem;
	height: 18.6rem;
	visibility: ${(props) => (props.$hover ? "visible" : "hidden")};
`;

const Nav = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;

	span {
		color: #000;
		font-size: 1.6rem;
		font-weight: 600;
		line-height: 2.4rem;
		margin-right: 9rem;
		z-index: 10;
		white-space: nowrap;
	}

	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		z-index: 10;
		a {
			color: #c6c6c6;
			font-size: 1.4rem;
			font-weight: 600;
			line-height: 2.1rem;
		}
	}

	@media (max-width: 768px) {
		gap: 1.5rem;
		span {
			font-weight: 500;
		}
	}
`;

export const Menu = styled.div<{
	$show: boolean;
}>`
	display: ${({ $show }) => ($show ? "block" : "none")};
	position: fixed;
	top: 5.4rem;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: white;
	z-index: 1;
	padding: 4rem 0;
	overflow-y: auto;
	@media (min-width: 768px) {
		display: none;
	}
	a {
		color: inherit;
		font: inherit;
	}
	ul {
		color: var(--text-main, #232230);
		font-size: 1.6rem;
		font-style: normal;
		font-weight: 500;
		line-height: 160%;
		li {
			display: flex;
			gap: 1rem;
			padding: 2rem 1.5rem 0rem 1.5rem;
			.title {
				color: var(--text-sub-1, #616572);
				font-size: 1.4rem;
				font-style: normal;
				font-weight: 500;
				line-height: 150%;
				min-width: 8rem;
			}
			.subs {
				display: flex;
				flex-direction: column;
				gap: 4rem;
				flex-grow: 1;
			}
			.line {
				height: 1px;
				width: 100%;
				background-color: #e6e7ed;
			}
		}
	}
`;

const Overlay = styled.div<{ $show: boolean }>`
	display: ${(props) => (props.$show ? "block" : "none")};
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(8, 7, 7, 0.6);
	z-index: 9;
`;

const Header = () => {
	const [showNavBar, setShowNavBar] = useState<boolean>(false);
	const [changeHeader, setChangeHeader] = useState<boolean>(false);
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [clientWidth, setClientWidth] = useState<boolean>(false);

	const scrollController = useCallback(() => {
		const scrollY = window.scrollY;
		if (scrollY === 0 && !openMenu) {
			setChangeHeader(false);
		} else {
			setChangeHeader(true);
		}
	}, [openMenu]);

	useEffect(() => {
		scrollController();
		setClientWidth(typeof window !== "undefined" && window.innerWidth <= 768);
		window.addEventListener("scroll", scrollController);
		return () => {
			window.removeEventListener("scroll", scrollController);
		};
	}, [scrollController]);

	const MenuList: IMenu[] = [
		{
			key: "event",
			title: "이벤트",
			submenu: [
				{
					key: "walk",
					title: "산책 챌린지",
					menu: [
						{
							title: "2023 산책 챌린지",
							link: "https://petping.com/site/miracle2023",
						},
						{
							title: "2021 산책 챌린지",
							link: "https://petping.com/site/miracle",
						},
					],
				},
				{
					key: "donation",
					title: "기부 챌린지",
					menu: [
						{
							title: "2022 DOGNATION",
							link: "https://petping.com/site/dognation2022",
						},
						{
							title: "2021 DOGNATION",
							link: "https://petping.com/site/dognation",
						},
					],
				},
				{
					key: "run",
					title: "댕댕런",
					link: "https://blog.naver.com/hi_petping/222832751893",
				},
			],
		},
		{
			key: "info",
			title: clientWidth ? "문의" : "서비스 문의",
			link: "mailto:hi@petping.com",
			submenu: clientWidth
				? [
						{
							key: "info",
							title: "서비스 문의",
							link: "mailto:hi@petping.com",
						},
				  ]
				: [],
		},
	];
	return (
		<Container>
			<Wrap
				$scroll={changeHeader}
				$hover={showNavBar}
				onMouseLeave={() => setShowNavBar(false)}
			>
				<HeaderContainer $scroll={changeHeader} $hover={showNavBar}>
					<Image
						src={`/images/${
							changeHeader || showNavBar ? "logo" : "logo_white"
						}.svg`}
						width={93}
						height={25}
						alt="logo"
					/>
					<div>
						{MenuList.map((item) =>
							item.link ? (
								<Link key={item.key} href={item.link}>
									{item.title}
								</Link>
							) : (
								<span
									onMouseEnter={() => setShowNavBar(true)}
									key={item.key}
								>
									{item.title}
								</span>
							)
						)}
					</div>
					{openMenu ? (
						<Image
							src={"/images/icon_close.svg"}
							width={24}
							height={24}
							alt="icon_close"
							onClick={() => {
								setChangeHeader(false);
								setOpenMenu(false);
							}}
						/>
					) : (
						<Image
							src={
								changeHeader
									? "/images/icon_hamburger.svg"
									: "/images/icon_hamburger_white.svg"
							}
							width={24}
							height={24}
							alt="hamburger"
							onClick={() => {
								setChangeHeader(true);
								setOpenMenu(true);
							}}
						/>
					)}
				</HeaderContainer>
				<NavContainer $hover={showNavBar}>
					{MenuList.map((mitem) =>
						mitem.submenu?.map((sitem) => (
							<Nav key={sitem.key}>
								<span>
									{sitem.link ? (
										<Link href={sitem.link}>
											<span>{sitem.title}</span>
										</Link>
									) : (
										sitem.title
									)}
								</span>
								<div>
									{sitem.menu?.map((item, i) => (
										<Link key={i} href={item.link}>
											{item.title}
										</Link>
									))}
								</div>
							</Nav>
						))
					)}
				</NavContainer>
			</Wrap>
			<Overlay $show={showNavBar} />
			<Menu $show={openMenu}>
				<ul>
					{MenuList.map((item, index) => {
						return (
							<li key={index}>
								<div className="title">{item.title}</div>
								<div className="subs">
									{item.submenu?.map((sitem, idx) => {
										return (
											<Nav key={sitem.key}>
												<span>
													{sitem.link ? (
														<Link href={sitem.link}>
															<span>{sitem.title}</span>
														</Link>
													) : (
														sitem.title
													)}
												</span>
												<div>
													{sitem.menu?.map((item, i) => (
														<Link key={i} href={item.link}>
															{item.title}
														</Link>
													))}
												</div>
											</Nav>
										);
									})}
									{index < MenuList.length - 1 && (
										<div className="line" />
									)}
								</div>
							</li>
						);
					})}
				</ul>
			</Menu>
		</Container>
	);
};

export default Header;

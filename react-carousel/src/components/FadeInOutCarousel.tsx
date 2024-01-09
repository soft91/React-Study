"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface ISelectCase {
	key: string;
	title: string;
	subTitle: string;
}
[];

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 4rem;

	.section_three_bottom_title {
		margin-top: 6rem;
		color: #242230;
		text-align: center;
		font-size: 1.6rem;
		font-weight: 500;
		line-height: 2.4rem;
	}
`;

const Wrap = styled.div`
	display: flex;
	gap: 7.5rem;
	width: 100%;
	justify-content: center;

	@media (max-width: 1024px) {
		gap: 3rem;
	}
`;

const Top = styled.div`
	display: flex;
	gap: 3rem;
	margin-bottom: 8rem;

	span {
		color: #242230;
		font-size: 2rem;
		font-weight: 600;
		line-height: 3rem;
		cursor: pointer;
	}

	.selected {
		color: #ea3460;
		text-decoration-line: underline;
	}

	@media (max-width: 768px) {
		display: none;
	}
`;

const Side = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(3, 1fr);
	gap: 7.5rem;
	align-items: center;
	justify-items: center;

	> div {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 12rem;
		height: 12rem;
	}

	.on {
		opacity: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1);
		background-color: #fff;
		animation: scaleBox 4.5s ease;
		border-radius: 2rem;
		width: 12rem;
		height: 12rem;
		transition: all 400ms ease-in-out;
		z-index: 1;
	}

	.img_on {
		animation: fadeInOut 4s ease;
		z-index: 2;
	}

	@keyframes fadeInOut {
		0%,
		100% {
			opacity: 0.2;
		}
		50% {
			opacity: 1;
		}
	}

	@keyframes scaleBox {
		0%,
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0.1);
		}
		50% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	@media (max-width: 1024px) {
		gap: 3rem;
		img {
			width: 5.1rem;
			height: 5.1rem;
		}
		> div {
			width: 10rem;
			height: 10rem;
		}
	}

	@media (max-width: 768px) {
		display: none;
	}
`;

const Center = styled.div`
	position: relative;
	display: flex;
	min-width: 27rem;
	height: 58rem;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 3rem;
	border: 0.6rem solid #fff;
	background: #fff;
	box-shadow: -2rem 2rem 4rem 0rem rgba(0, 0, 0, 0.2);

	.image {
		opacity: 1;
		transition: opacity 500ms ease-in-out;
		border-radius: 3rem;
	}

	.show_img {
		transition-duration: 1000ms;
	}

	.hide_img {
		opacity: 0;
	}
`;

const Bottom = styled.div`
	display: none;
	@media (max-width: 768px) {
		display: flex;
		gap: 0.6rem;
		margin-top: 2rem;
		div {
			width: 0.6rem;
			height: 0.6rem;
			background-color: #d6d6d6;
			border-radius: 50%;
		}

		.selected {
			background-color: #ea3460;
			text-decoration-line: underline;
		}
	}
`;

const FadeInOutCarousel = () => {
	const caseMenu: ISelectCase[] = [
		{
			key: "dashboard",
			title: "대시보드",
			subTitle: `내 반려견의 산책과 식사 기록의 상태는 물론,<br>
			유용한 정보와 팁도 제공하고 있어요.`,
		},
		{
			key: "walk",
			title: "산책",
			subTitle: `펫핑만의 산책 지도를 경험해 보세요. <br>마킹을 남기고, 유용한 장소 정보도 알 수 있어요`,
		},
		{
			key: "meal_history",
			title: "식사기록",
			subTitle: `내 반려견의 식사를 기록 습관은<br> 규칙적이고 일관된 식사량 관리를 할 수 있어요.`,
		},
		{
			key: "shop",
			title: "펫핑샵",
			subTitle: `건강한 반려견 삶을 위한 다양한 상품을 둘러보고<br>
			리워드 핑(포인트)으로 구매해 보세요.`,
		},
		{
			key: "insurance",
			title: "펫보험",
			subTitle: `갑자기 닥칠 사고나 건강 위협에 대비하세요.<br>
			합리적인 펫보험 상품에 가입할 수 있어요.`,
		},
	];

	const [selectCase, setSelectCase] = useState<string>("dashboard");

	const changeImages = useCallback(() => {
		const caseOrder = [
			"dashboard",
			"walk",
			"meal_history",
			"shop",
			"insurance",
		];

		setSelectCase((prevSelectCase) => {
			let currentIndex = caseOrder.indexOf(prevSelectCase);

			const currentComp: HTMLElement | any =
				document.querySelectorAll(".image")[currentIndex];
			const nextComp: HTMLElement | any =
				document.querySelectorAll(".image")[
					(currentIndex + 1) % caseOrder.length
				];

			if (currentComp && nextComp) {
				setTimeout(() => {
					if (prevSelectCase === selectCase) {
						currentComp.classList.add("hide_img");
						nextComp.classList.remove("hide_img");
					}
				}, 50);
			}

			currentIndex = (currentIndex + 1) % caseOrder.length;
			return caseOrder[currentIndex];
		});
	}, [selectCase]);

	useEffect(() => {
		const intervalId = setInterval(() => changeImages(), 3000);

		return () => clearInterval(intervalId);
	}, [changeImages, selectCase]);

	return (
		<Container>
			<Top>
				{caseMenu.map((item) => (
					<span
						key={item.key}
						className={item.key === selectCase ? "selected" : ""}
						onClick={() => setSelectCase(item.key)}
					>
						{item.title}
					</span>
				))}
			</Top>
			<Wrap>
				<Side>
					<div>
						<div className={selectCase === "walk" ? "on" : "off"}></div>
						<Image
							className={selectCase === "walk" ? "img_on" : "img_off"}
							src={`/images/Carousel/location_${
								selectCase === "walk" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="location"
						/>
					</div>
					<div>
						<div
							className={selectCase === "dashboard" ? "on" : "off"}
						></div>
						<Image
							className={
								selectCase === "dashboard" ? "img_on" : "img_off"
							}
							src={`/images/Carousel/scale_${
								selectCase === "dashboard" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="scale"
						/>
					</div>
					<div>
						<div className={selectCase === "shop" ? "on" : "off"}></div>
						<Image
							className={selectCase === "shop" ? "img_on" : "img_off"}
							src={`/images/Carousel/cart_${
								selectCase === "shop" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="cart"
						/>
					</div>
					<div>
						<div
							className={selectCase === "meal_history" ? "on" : "off"}
						></div>
						<Image
							className={
								selectCase === "meal_history" ? "img_on" : "img_off"
							}
							src={`/images/Carousel/chart_${
								selectCase === "meal_history" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="chart"
						/>
					</div>
					<div>
						<div
							className={selectCase === "insurance" ? "on" : "off"}
						></div>
						<Image
							className={
								selectCase === "insurance" ? "img_on" : "img_off"
							}
							src={`/images/Carousel/sheild_${
								selectCase === "insurance" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="sheild"
						/>
					</div>
					<div>
						<div
							className={selectCase === "dashboard" ? "on" : "off"}
						></div>
						<Image
							className={
								selectCase === "dashboard" ? "img_on" : "img_off"
							}
							src={`/images/Carousel/heart_${
								selectCase === "dashboard" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="heart"
						/>
					</div>
				</Side>
				<Center>
					<Image
						className={
							selectCase === "dashboard" ? "image" : "hide_img image"
						}
						src={`/images/Carousel/dashboard.png`}
						fill={true}
						style={{
							width: "100%",
							height: "100%",
						}}
						alt="phone"
						quality={100}
					/>
					<Image
						className={
							selectCase === "walk" ? "show_img image" : "hide_img image"
						}
						src={`/images/Carousel/walk.png`}
						fill={true}
						style={{
							width: "100%",
							height: "100%",
						}}
						alt="phone"
						quality={100}
					/>
					<Image
						className={
							selectCase === "meal_history"
								? "show_img image"
								: "hide_img image"
						}
						src={`/images/Carousel/meal_history.png`}
						fill={true}
						style={{
							width: "100%",
							height: "100%",
						}}
						alt="phone"
						quality={100}
					/>
					<Image
						className={
							selectCase === "shop" ? "show_img image" : "hide_img image"
						}
						src={`/images/Carousel/shop.png`}
						fill={true}
						style={{
							width: "100%",
							height: "100%",
						}}
						alt="phone"
						quality={100}
					/>
					<Image
						className={
							selectCase === "insurance"
								? "show_img image"
								: "hide_img image"
						}
						src={`/images/Carousel/insurance.png`}
						fill={true}
						style={{
							width: "100%",
							height: "100%",
						}}
						alt="phone"
						quality={100}
					/>
				</Center>
				<Side>
					<div>
						<div
							className={selectCase === "meal_history" ? "on" : "off"}
						></div>
						<Image
							className={
								selectCase === "meal_history" ? "img_on" : "img_off"
							}
							src={`/images/Carousel/calendar_${
								selectCase === "meal_history" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="calendar"
						/>
					</div>
					<div>
						<div className={selectCase === "shop" ? "on" : "off"}></div>
						<Image
							className={selectCase === "shop" ? "img_on" : "img_off"}
							src={`/images/Carousel/point_${
								selectCase === "shop" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="point"
						/>
					</div>
					<div>
						{" "}
						<div
							className={selectCase === "dashboard" ? "on" : "off"}
						></div>
						<Image
							className={
								selectCase === "dashboard" ? "img_on" : "img_off"
							}
							src={`/images/Carousel/dog_${
								selectCase === "dashboard" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="dog"
						/>
					</div>
					<div>
						<div
							className={selectCase === "insurance" ? "on" : "off"}
						></div>
						<Image
							className={
								selectCase === "insurance" ? "img_on" : "img_off"
							}
							src={`/images/Carousel/hand_${
								selectCase === "insurance" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="hand"
						/>
					</div>
					<div>
						<div className={selectCase === "shop" ? "on" : "off"}></div>
						<Image
							className={selectCase === "shop" ? "img_on" : "img_off"}
							src={`/images/Carousel/ball_${
								selectCase === "shop" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="ball"
						/>
					</div>
					<div>
						<div className={selectCase === "walk" ? "on" : "off"}></div>
						<Image
							className={selectCase === "walk" ? "img_on" : "img_off"}
							src={`/images/Carousel/ping_${
								selectCase === "walk" ? "on" : "off"
							}.svg`}
							width={62}
							height={62}
							alt="ping"
						/>
					</div>
				</Side>
			</Wrap>
			<div
				className="section_three_bottom_title"
				dangerouslySetInnerHTML={{
					__html: caseMenu.find((item) => item.key === selectCase)
						?.subTitle as string,
				}}
			></div>
			<Bottom>
				{caseMenu.map((item) => (
					<div
						key={item.key}
						className={item.key === selectCase ? "selected" : ""}
						onClick={() => setSelectCase(item.key)}
					></div>
				))}
			</Bottom>
		</Container>
	);
};

export default FadeInOutCarousel;

import {
	Children,
	ReactNode,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import classes from "./index.module.css";

interface IProps {
	children: ReactNode | any;
	type?: "auto" | "slider";
}

const TouchSilderCarousel = ({ children, type }: IProps) => {
	const containerRef = useRef<any>(null);
	const [current, setCurrent] = useState<number>(1);
	const [translateX, setTranslateX] = useState<number>(0);

	// Silder State
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [touchStartX, setTouchStartX] = useState<number>(0);

	/* Slide에 사용할 Children */
	const slides = useMemo(() => {
		if (children.length > 1) {
			let items = Children.map(children, (child, index) => (
				<li key={index} className={classes.carousel_slide}>
					{child}
				</li>
			));

			return [
				<li key={children.length + 1} className={classes.carousel_slide}>
					{children[children.length - 1]}
				</li>,
				...items,
				<li key={children.length + 2} className={classes.carousel_slide}>
					{children[0]}
				</li>,
			];
		}

		return [];
	}, [children]);

	const handleTouchStart = (e: TouchEvent | any) => {
		setTouchStartX(e.touches[0].clientX);
	};

	const handleTouchEnd = (e: TouchEvent | any) => {
		const touchEndX = e.changedTouches[0].clientX;
		const touchDistance = touchEndX - touchStartX;

		if (touchDistance > 0) {
			handlePrevSlide();
		} else if (touchDistance < 0) {
			handleNextSlide();
		}
	};

	const handleNextSlide = () => {
		if (current >= children.length) {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
			setCurrent(1);
		} else {
			setCurrent((prev) => ++prev);
		}
	};

	const handlePrevSlide = () => {
		if (current <= 1) {
			setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
			setCurrent(children.length);
		} else {
			setCurrent((prev) => --prev);
		}
	};

	useEffect(() => {
		const translationEnd = () => {
			if (current <= 1) {
				containerRef.current.style.transitionDuration = "0ms";
				setTranslateX(containerRef.current.clientWidth * current);
			}

			if (current >= children.length) {
				containerRef.current.style.transitionDuration = "0ms";
				setTranslateX(containerRef.current.clientWidth * children.length);
			}
		};
		document.addEventListener("translationEnd", translationEnd);

		return () => {
			document.removeEventListener("translationEnd", translationEnd);
		};
	}, [current, children]);

	useEffect(() => {
		containerRef.current.style.transform = `translateX(-${
			currentSlide * 100
		}%)`;
	}, [currentSlide]);

	useEffect(() => {
		setTranslateX(containerRef.current?.clientWidth * current);
	}, [current]);

	return (
		<div className={classes.carousel_container}>
			<ul
				ref={containerRef}
				className={classes.carousel_wrapper}
				style={{
					transform: `translate3d(${-translateX}px, 0, 0)`,
				}}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				{slides}
			</ul>
			<div className={classes.carousel_indicator}>
				{children.map((item: any, index: number) => {
					return (
						<div
							key={index}
							className={
								current === index + 1
									? classes.carousel_indicator_circle_active
									: classes.carousel_indicator_circle
							}
						></div>
					);
				})}
			</div>
		</div>
	);
};

export default TouchSilderCarousel;

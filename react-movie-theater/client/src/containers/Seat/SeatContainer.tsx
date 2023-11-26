import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./seat.module.css";
import classNames from "classnames/bind";
import { socket } from "../../socket";

const cx = classNames.bind(styles);

interface Seat {
	seatNumber: string;
	status: number;
}

const SeatContainer: React.FC = () => {
	const { id, title } = useParams<{ id: string; title: string }>();
	const [booked, setBooked] = useState<string>("");
	const [seats, setSeats] = useState<Seat[][]>([]);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	useEffect(() => {
		socket.emit("join", id);
		// return () => {
		// 	socket.disconnect();
		// };
	}, [id]);

	useEffect(() => {
		function setSeat(data: Seat[][]) {
			console.log(data);
			setSeats(data);
		}
		socket.on("sSeatMessage", setSeat);
		return () => {
			socket.off("sSeatMessage", setSeat);
		};
	}, []);

	const onClickHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		if (isDisabled) return;
		const { id, status } = e.currentTarget.dataset;
		if (status === "3" || status === "0") return;
		setBooked(id || "");
		const tempSeats = seats.map((s) => {
			return s.map((i) => {
				let temp = { ...i };
				if (i.seatNumber === id) {
					temp = { ...i, status: 2 };
				} else {
					temp = { ...i, status: i.status === 2 ? 1 : i.status };
				}
				return temp;
			});
		});
		setSeats(tempSeats);
	};

	const onConfirmHandler = () => {
		if (!booked) return;
		socket.emit("addSeat", booked);
		setIsDisabled(true);
	};

	return (
		<div className={cx("seat_container")}>
			<h2 className={cx("title")}>{title}</h2>
			<div className={cx("screen")}>screen</div>
			<ul className={cx("wrap_seats")}>
				{seats.map((v, rowIndex) => {
					return v.map((i, colIndex) => (
						<li
							key={`seat_${rowIndex}_${colIndex}`}
							data-id={i.seatNumber}
							data-status={i.status}
							className={cx(
								"seat",
								i.status === 0 && "empty",
								i.status === 1 && "default",
								i.status === 2 && "active",
								i.status === 3 && "soldout"
							)}
							onClick={onClickHandler}
						></li>
					));
				})}
			</ul>
			<div className={cx("r_wrap")}>
				<h4 className={cx("r_title")}>{booked}</h4>
				{!isDisabled && (
					<button className={cx("r_confirm")} onClick={onConfirmHandler}>
						Confirm
					</button>
				)}
			</div>
		</div>
	);
};

export default SeatContainer;

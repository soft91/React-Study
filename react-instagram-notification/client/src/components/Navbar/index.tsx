import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { socket } from "../../socket";
import styles from "./index.module.css";

interface Notification {
	type: string;
}

const Navbar: React.FC = () => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	useEffect(() => {
		const getNotification = (data: Notification) => {
			console.log(data);
			const { type } = data;
			const temp =
				type === "0"
					? [...notifications, data]
					: notifications.slice(0, -1);
			setNotifications(temp);
		};
		socket.on("getNotification", getNotification);

		return () => {
			socket.off("getNotification", getNotification);
		};
	}, [notifications]);

	return (
		<div className={styles.navbar}>
			<span className={styles.logo}>Instagram</span>
			<div className={styles.icons}>
				<div className={styles.heartContainer}>
					{notifications.length > 0 && (
						<span className={styles.noti}></span>
					)}
					<AiOutlineHeart size={20} className={styles.heart} />
					{notifications.length > 0 && (
						<div className={styles.likeBubble}>
							<AiFillHeart size={15} color="#fff" />{" "}
							<div className={styles.count}>{notifications.length}</div>
						</div>
					)}
				</div>
				<HiOutlinePaperAirplane className={styles.airplane} size={20} />
			</div>
		</div>
	);
};

export default Navbar;

import React, { useState, MouseEvent } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BiMessageRounded } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";

import { socket } from "../../socket";
import styles from "./index.module.css";

interface CardProps {
	key: string;
	post: {
		userName: string;
		userImg: string;
		location: string;
		postImg: string;
	};
	loginUser: string;
}

const Card: React.FC<CardProps> = ({ key, post, loginUser }: CardProps) => {
	const [liked, setLiked] = useState<boolean>(false);

	const onLikeHandler = (e: MouseEvent<SVGSVGElement>) => {
		const { type } = e.currentTarget.dataset;
		setLiked(type === "0");

		console.log(post.userName);

		socket.emit("sendNotification", {
			senderName: loginUser,
			receiverName: post.userName,
			type,
		});
	};

	return (
		<div className={styles.card}>
			<div className={styles.info}>
				<div className={styles.userInfo}>
					<img src={post.userImg} alt="" className={styles.userImg} />
					<div className={styles.username}>
						<div>{post.userName}</div>
						<div className={styles.loc}>{post.location}</div>
					</div>
				</div>
				<FiMoreVertical size={20} />
			</div>
			<img src={post.postImg} alt="" className={styles.postImg} />
			<div className={styles.icons}>
				{liked ? (
					<AiFillHeart
						className={styles.fillHeart}
						size={20}
						onClick={onLikeHandler}
						data-type="1"
					/>
				) : (
					<AiOutlineHeart
						className={styles.heart}
						size={20}
						onClick={onLikeHandler}
						data-type="0"
					/>
				)}
				<BiMessageRounded className={styles.msg} size={20} />
				<HiOutlinePaperAirplane className={styles.airplane} size={20} />
			</div>
		</div>
	);
};

export default Card;

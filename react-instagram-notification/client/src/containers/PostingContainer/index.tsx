import { useEffect, useState, useContext } from "react";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { socket } from "../../socket";
import { Context } from "../../context";

interface Post {
	id: string;
	userName: string;
	userImg: string;
	location: string;
	postImg: string;
}

const PostingContainer: React.FC = () => {
	const {
		state: { userName },
	} = useContext(Context);
	const [post, setPost] = useState<Post[]>([]);

	useEffect(() => {
		socket.emit("userList", {});
	}, []);

	useEffect(() => {
		function setPosting(data: Post[]) {
			setPost(data);
		}
		socket.on("user-list", setPosting);
		return () => {
			socket.off("user-list", setPosting);
		};
	}, []);

	return (
		<div>
			<h2>{`Login as a ${userName}`}</h2>
			<div>
				<Navbar />
				{post.map((p) => (
					<Card key={p.id} post={p} loginUser={userName} />
				))}
			</div>
		</div>
	);
};

export default PostingContainer;

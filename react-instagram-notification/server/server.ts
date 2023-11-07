import { Server, Socket } from "socket.io";
import { posts } from "./data";

const io = new Server(5000, {
	cors: {
		origin: "http://localhost:3000",
	},
});

interface User {
	id: number;
	userName: string;
	location: string;
	userImg: string;
	postImg: string;
	socketId: string;
}

let users: User[] = [];

const addNewUser = (userName: string, socketId: string) => {
	!users.some((user) => user.userName === userName) &&
		users.unshift({
			...posts[Math.floor(Math.random() * 5)],
			userName,
			socketId,
		});
};

const getUser = (userName: string) => {
	return users.find((user) => user.userName === userName);
};

io.use((socket: Socket, next) => {
	const userName = socket.handshake.auth.userName;
	if (!userName) {
		console.log("err");
		return next(new Error("invalid userName"));
	}
	next();
});

io.on("connection", (socket: Socket) => {
	const userName = socket.handshake.auth.userName;

	addNewUser(userName, socket.id);

	socket.on("userList", () => {
		io.sockets.emit("user-list", users);
	});
	socket.on("sendNotification", ({ senderName, receiverName, type }) => {
		const receiver: any = getUser(receiverName);
		console.log(type);
		io.to(receiver.socketId).emit("getNotification", {
			senderName,
			type,
		});
	});

	socket.on("disconnect", () => {
		console.log("logout");
	});
});

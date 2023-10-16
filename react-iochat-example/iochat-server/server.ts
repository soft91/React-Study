import http from "http";
import { Server } from "socket.io";

const socket = (server: http.Server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
		},
	});

	io.sockets.on("connection", (socket) => {
		const clients = new Map();

		socket.on("message", (res) => {
			const { target } = res;
			if (target) {
				const toUser = clients.get(target);
				io.sockets.to(toUser).emit("sMessage", res);
				return;
			}

			const myRooms = Array.from(socket.rooms);
			if (myRooms.length > 1) {
				socket.broadcast.in(myRooms[1]).emit("sMessage", res);
				return;
			}
			socket.broadcast.emit("sMessage", res);
		});
		socket.on("login", (data) => {
			const { userId, roomNumber } = data;

			socket.join(roomNumber);
			clients.set(userId, socket.id);
			socket.broadcast.emit("sLogin", userId);
		});
		socket.on("disconnect", () => {
			console.log("user disconnected");
		});
	});
};

export default socket;

const { Server } = require("socket.io");

const io = new Server("5001", {
	cors: {
		origin: "http://localhost:3000",
	},
});

const clinets = new Map();

io.sockets.on("connection", (socket) => {
	socket.on("message", (res) => {
		const { target } = res;
		const toUser = clinets.get(target);
		target
			? io.sockets.to(toUser).emit("sMessage", res)
			: socket.broadcast.emit("sMessage", res);

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
		clinets.set(userId, socket.id);
		socket.broadcast.emit("sLogin", userId);
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

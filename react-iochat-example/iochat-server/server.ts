const { Server } = require("socket.io");

const io = new Server("5000", {
	cors: {
		origin: "http://localhost:3000",
	},
});

const clinets = new Map();

io.sockets.on("connection", (socket) => {
	socket.on("message", (res) => {
		const { target } = res;
		const toUser = clinets.get(target);
		console.log(toUser);
		target
			? io.sockets.to(toUser).emit("sMessage", res)
			: socket.broadcast.emit("sMessage", res);
	});
	socket.on("login", (data) => {
		clinets.set(data, socket.id);
		socket.broadcast.emit("sLogin", data);
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

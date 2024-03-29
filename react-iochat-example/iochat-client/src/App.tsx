import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
	MouseEvent,
} from "react";
import { io } from "socket.io-client";
import logo from "./images/iologo.png";
import "./App.css";
interface IMessageData {
	msg: string;
	type: string;
	id: string;
}

const webSocket = io("http://localhost:5001");

function App() {
	const messagesEndref = useRef<HTMLLIElement | null>(null);
	const [userId, setUserId] = useState<string>("");
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [msg, setMsg] = useState<string>("");
	const [msgList, setMsgList] = useState<IMessageData[]>([]);

	const [privateTarget, setPrivateTarget] = useState<string>("");

	const [roomNumber, setRoomNumber] = useState<string>("1");

	useEffect(() => {
		if (!webSocket) return;

		const sMessageCallback = (msg: any) => {
			const { data, id, target } = msg;
			setMsgList((prev) => [
				...prev,
				{
					msg: data,
					type: target ? "private" : "other",
					id: id,
				},
			]);
		};

		webSocket.on("sMessage", sMessageCallback);
		return () => {
			webSocket.off("sMessage", sMessageCallback);
		};
	}, []);

	useEffect(() => {
		if (!webSocket) return;

		const sLoginCallback = (msg: any) => {
			setMsgList((prev) => [
				...prev,
				{
					msg: `${msg} joins the chat`,
					type: "welcome",
					id: "",
				},
			]);
		};
		webSocket.on("sLogin", sLoginCallback);
		return () => {
			webSocket.off("sLogin", sLoginCallback);
		};
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [msgList]);

	const scrollToBottom = () => {
		messagesEndref.current?.scrollIntoView({ behavior: "smooth" });
	};

	const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		webSocket.emit("login", { userId: userId, roomNumber: roomNumber });
		setIsLogin(true);
	};

	const onChangeUserIdHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setUserId(e.target.value);
	};

	const onSendSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const sendData = {
			data: msg,
			id: userId,
			target: privateTarget,
		};

		webSocket.emit("message", sendData);
		setMsgList((prev) => [
			...prev,
			{
				msg: msg,
				type: "me",
				id: userId,
			},
		]);
		setMsg("");
	};

	const onChangeMsgHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setMsg(e.target.value);
	};

	const onSetPrivateTarget = (e: MouseEvent<HTMLLIElement>) => {
		const { id } = e.currentTarget.dataset;
		setPrivateTarget((prev) => (prev === id ? "" : id || ""));
	};

	const onRoomChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value);
		setRoomNumber(e.target.value);
	};

	return (
		<div className="app-container">
			<div className="wrap">
				{isLogin ? (
					<div className="chat-box">
						<h3>
							Login as a "{userId}" in Room {roomNumber}
						</h3>
						<ul className="chat">
							{msgList.map((v, i) =>
								v.type === "welcome" ? (
									<li className="welcome" key={`${i}_li`}>
										<div className="line"></div>
										<div>{v.msg}</div>
										<div className="line"></div>
									</li>
								) : (
									<li
										className={v.type}
										key={`${i}_li`}
										data-id={v.id}
										onClick={onSetPrivateTarget}
									>
										<div
											className={
												v.id === privateTarget
													? "private-user"
													: "userId"
											}
											data-id={v.id}
										>
											{v.id}
										</div>
										<div className={v.type} data-id={v.id}>
											{v.msg}
										</div>
									</li>
								)
							)}
							<li ref={messagesEndref} />
						</ul>
						<form
							className="send-form"
							onSubmit={(e) => onSendSubmitHandler(e)}
						>
							{privateTarget && (
								<div className="private-target">{privateTarget}</div>
							)}
							<input
								placeholder="Enter your message"
								onChange={onChangeMsgHandler}
								value={msg}
							/>
							<button type="submit">send</button>
						</form>
					</div>
				) : (
					<div className="login-box">
						<div className="login-title">
							<img src={logo} width="40px" height="40px" alt="logo" />
							<div>IOChat</div>
						</div>
						<form
							className="login-form"
							onSubmit={(e) => onSubmitHandler(e)}
						>
							<select onChange={(e) => onRoomChangeHandler(e)}>
								<option value="1">Room 1</option>
								<option value="2">Room 2</option>
							</select>
							<input
								placeholder="Enter your ID"
								onChange={onChangeUserIdHandler}
								value={userId}
							/>
							<button type="submit">Login</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;

import React, {
	ChangeEvent,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { io } from "socket.io-client";
import logo from "./images/iologo.png";
import "./App.css";
interface IMessageData {
	msg: string;
	type: string;
	id: string;
}

const webSocket = io("http://localhost:5000");

function App() {
	const messagesEndref = useRef<HTMLLIElement | null>(null);
	const [userId, setUserId] = useState<string>("");
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const [msg, setMsg] = useState<string>("");
	const [msgList, setMsgList] = useState<IMessageData[]>([]);

	useEffect(() => {
		if (!webSocket) return;

		const sMessageCallback = (msg: any) => {
			const { data, id } = msg;
			setMsgList((prev) => [
				...prev,
				{
					msg: data,
					type: "other",
					id: id,
				},
			]);
		};

		console.log("git test");

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
		webSocket.emit("login", userId);
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
	};

	const onChangeMsgHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setMsg(e.target.value);
	};

	return (
		<div className="app-container">
			<div className="wrap">
				{isLogin ? (
					<div className="chat-box">
						<h3>Login as a "{userId}"</h3>
						<ul className="chat">
							{msgList.map((v, i) =>
								v.type === "welcome" ? (
									<li className="welcome" key={`${i}_li`}>
										<div className="line"></div>
										<div>{v.msg}</div>
										<div className="line"></div>
									</li>
								) : (
									<li className={v.type} key={`${i}_li`}>
										<div className="userId">{v.id}</div>
										<div className={v.type}>{v.msg}</div>
									</li>
								)
							)}
							<li ref={messagesEndref} />
						</ul>
						<form
							className="send-form"
							onSubmit={(e) => onSendSubmitHandler(e)}
						>
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

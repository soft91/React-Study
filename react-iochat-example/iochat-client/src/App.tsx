import React, { useEffect, useRef, useState } from "react";

import "./App.css";
import { io } from "socket.io-client";

interface IMessageData {
	msg: any;
	type: string;
	id: string;
}

const webSocket = io("http://localhost:5000");

function App() {
	const messagesEndref = useRef(null);
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

	const onSubmitHandler = (e) => {
		e.preventDefault();
		webSocket.emit("login", userId);
		setIsLogin(true);
	};

	const onChangeHandler = (e) => {
		setUserId(e.target.value);
	};

	const onSendSubmitHandler = (e) => {
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

  const onChangeMsgHandler = (e) => {
    setMsg(e.target.value);
  }

	return <div className="app-contianer">
    <div className="wrap">
      {isLogin ? (
        <div className="chat-box">
          <h3>Login as a "{userId}"</h3>
          <ul className="chat">
            {msgList.map((v, i) => 
              v.type === "welcome" ? (
                <li className="welcome">
                  <div className="line"></div>
                  <div>{v.msg}</div>
                  <div className="line"></div>
                </li>
              ): (
                <li className={v.type} key={`${i}_li`}>
                  <div className="userId">{v.id}</div>
                  <div className={v.type}>{v.msg}</div>
                </li>
              )}
              <li ref={messagesEndref}></li>
          </ul>
        </div>
      )}
    </div>
  </div>;
}

export default App;

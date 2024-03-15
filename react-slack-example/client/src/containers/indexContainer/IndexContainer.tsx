import React, { useState, useEffect } from "react";
import {
	indexContainerCss,
	loginWrapCss,
	headerCss,
	loginFormCss,
	inputCss,
	btnCss,
} from "./indexContainer.style";
import { socket, socketPrivate, socketGroup } from "../../socket";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

const IndexContainer: React.FC = () => {
	const [user, setUser] = useState<string>("");
	const navigate = useNavigate();

	useEffect(() => {
		socket.on("connect_error", (err) => {
			if (err.message === "invalid userId") {
				console.log("err");
			}
		});
	}, []);

	const onLoginHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) return;
		socket.auth = { userId: user };
		socket.connect();
		socketPrivate.auth = { userId: user };
		socketPrivate.connect();
		socketGroup.auth = { userId: user };
		socketGroup.connect();
		navigate("/main");
	};

	const onUserNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser(e.target.value);
	};

	return (
		<div css={indexContainerCss}>
			<div css={loginWrapCss}>
				<h1 css={headerCss}>
					<img src={logo} width="100px" height="auto" alt="logo" />
				</h1>
				<form css={loginFormCss} onSubmit={onLoginHandler}>
					<input
						css={inputCss}
						type="text"
						value={user}
						placeholder="Enter your ID"
						onChange={onUserNameHandler}
					/>
					<button type="submit" css={btnCss}>
						Sign in
					</button>
				</form>
			</div>
		</div>
	);
};

export default IndexContainer;

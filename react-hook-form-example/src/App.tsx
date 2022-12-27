import { useState, useCallback, ChangeEvent } from "react";
import styled from "styled-components";
import TextField from "./components/TextField";
import { useForm, SubmitHandler } from "react-hook-form";
interface ISignUp {
	userId: string;
	password: string;
	passwordCheck: string;
	username: string;
}

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
`;

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISignUp>({ mode: "onBlur" });
	const onSubmit: SubmitHandler<ISignUp> = () => {
		console.log(inputData);
	};
	const [inputData, setInputData] = useState<ISignUp>({
		userId: "",
		password: "",
		passwordCheck: "",
		username: "",
	});

	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setInputData((prev) => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		},
		[setInputData]
	);
	return (
		<FormContainer onSubmit={handleSubmit(onSubmit)}>
			<TextField
				name="userId"
				setValue={onChangeHandler}
				value={inputData.userId}
				placeholder="아이디를 입력해주세요."
				register={register("userId", {
					required: { value: true, message: "아이디 입력은 필수입니다." },
					minLength: {
						value: 5,
						message: "5자리 이상 입력해주시기 바랍니다.",
					},
					maxLength: {
						value: 8,
						message: "8자리 미만으로 입력해주시기 바랍니다.",
					},
					pattern: {
						value: /^[a-zA-Z][0-9a-zA-Z]{4,7}$/g,
						message: "영문 또는 영문+숫자의 조합만 입력 가능합니다.",
					},
					onChange(event) {
						onChangeHandler(event);
					},
				})}
			/>
			<span>{errors.userId?.message as string}</span>
			<TextField
				type="password"
				name="password"
				setValue={onChangeHandler}
				value={inputData.password}
				placeholder="비밀번호를 입력해주세요."
				register={register("password", {
					required: {
						value: true,
						message: "비밀번호 입력은 필수입니다.",
					},
					minLength: {
						value: 9,
						message: "비밀번호는 8자리 이상 입력해주세요.",
					},
					maxLength: {
						value: 20,
						message: "비밀번호는 20자리 미만 입력해주세요.",
					},
					pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*\W)(?=\S+$).{8,20}/,
					onChange(event) {
						onChangeHandler(event);
					},
				})}
			/>
			<span>{errors.password?.message as string}</span>
			<TextField
				type="password"
				name="passwordCheck"
				setValue={onChangeHandler}
				value={inputData.passwordCheck}
				placeholder="비밀번호를 한번 더 입력해주세요."
				register={register("passwordCheck", {
					required: {
						value: true,
						message: "비밀번호를 한번 더 입력해주세요.",
					},
					onChange(event) {
						onChangeHandler(event);
					},
				})}
			/>
			<span>
				{
					(inputData.password !== inputData.passwordCheck
						? "동일한 비밀번호를 입력해주세요."
						: errors.passwordCheck?.message) as string
				}
			</span>
			<TextField
				name="username"
				setValue={onChangeHandler}
				value={inputData.username}
				placeholder="이름을 입력해주세요."
				register={register("username", {
					required: {
						value: true,
						message: "이름 입력은 필수입니다.",
					},
					maxLength: 10,
					pattern: /^[가-힣]{2,10}$/,
					onChange(event) {
						onChangeHandler(event);
					},
				})}
			/>
			<span>{errors.username?.message as string}</span>
			<input type="submit" />
		</FormContainer>
	);
}

export default App;

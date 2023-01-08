import { ChangeEvent, useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { IProps, IFileTypes } from "./types";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100px;
`;

const UploadLabel = styled.label<{ isDrag: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 402px;
	height: 138px;
	border: 2px dashed #e9e9e9;
	background-color: ${({ isDrag }) => isDrag && "#327adf"};
	opacity: 0.5;
	border-radius: 8px;
	box-sizing: border-box;
	cursor: pointer;
`;

const UploadItem = styled.div`
	display: flex;
	align-items: center;
	width: 402px;
	height: 53px;
	background: #e7f1fd;
	border-radius: 8px;

	img:first-child {
		padding-left: 15px;
	}
	img:last-child {
		cursor: pointer;
		padding-right: 15px;
	}
`;

const UploadTitle = styled.span`
	height: 18px;
	font-size: 14px;
	color: #327adf;
	padding-left: 10px;
	width: 100%;
`;

const ALLOW_FILE_EXTENSION = "image/jpg, image/png, image/jpeg"; // 이미지만 업로드 가능.

const FileUpload = ({
	className,
	value,
	setValue,
	drag = false,
	multiple = false,
}: IProps) => {
	const [isDrag, setIsDrag] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement | null>(null);
	const dragRef = useRef<HTMLLabelElement | null>(null);
	const fileId = useRef<number>(0);

	console.log(setValue);

	const onChangeFiles = useCallback(
		(e: ChangeEvent<HTMLInputElement> | any): void => {
			let selectFiles: File[] = [];
			let tempFiles: IFileTypes[] = value;

			if (e.type === "drop") {
				selectFiles = e.dataTransfer.files;
			} else {
				selectFiles = e.target.files;
			}

			for (const file of selectFiles) {
				tempFiles = [
					...tempFiles,
					{
						id: fileId.current++,
						file: file,
					},
				];
			}

			setValue(tempFiles);
		},
		[value, setValue]
	);

	const handleFilterFile = useCallback(
		(id: number): void => {
			setValue(value.filter((file: IFileTypes) => file.id !== id));
			if (inputRef.current !== null) {
				inputRef.current.value = "";
			}
		},
		[value, setValue]
	);

	const handleDragIn = useCallback((e: DragEvent): void => {
		e.preventDefault();
		e.stopPropagation();
	}, []);

	const handleDragOut = useCallback((e: DragEvent): void => {
		e.preventDefault();
		e.stopPropagation();

		setIsDrag(false);
	}, []);

	const handleDragOver = useCallback((e: DragEvent): void => {
		e.preventDefault();
		e.stopPropagation();

		if (e.dataTransfer!.files) {
			setIsDrag(true);
		}
	}, []);

	const handleDrop = useCallback(
		(e: DragEvent): void => {
			e.preventDefault();
			e.stopPropagation();

			onChangeFiles(e);
			setIsDrag(false);
		},
		[onChangeFiles]
	);

	const initDragEvents = useCallback((): void => {
		if (dragRef.current !== null) {
			dragRef.current.addEventListener("dragenter", handleDragIn);
			dragRef.current.addEventListener("dragleave", handleDragOut);
			dragRef.current.addEventListener("dragover", handleDragOver);
			dragRef.current.addEventListener("drop", handleDrop);
		}
	}, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

	const resetDragEvents = useCallback((): void => {
		if (dragRef.current !== null) {
			dragRef.current.removeEventListener("dragenter", handleDragIn);
			dragRef.current.removeEventListener("dragleave", handleDragOut);
			dragRef.current.removeEventListener("dragover", handleDragOver);
			dragRef.current.removeEventListener("drop", handleDrop);
		}
	}, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

	useEffect(() => {
		if (drag) {
			initDragEvents();
			return () => resetDragEvents();
		}
	}, [initDragEvents, resetDragEvents, drag]);

	return (
		<Container className={className}>
			<input
				type="file"
				id="fileUpload"
				ref={inputRef}
				style={{ display: "none" }}
				onChange={onChangeFiles}
				accept={ALLOW_FILE_EXTENSION}
				multiple={multiple}
			/>
			<UploadLabel htmlFor="fileUpload" ref={dragRef} isDrag={isDrag}>
				{drag ? "파일을 끌어서 업로드해주세요." : "파일을 선택해주세요."}
			</UploadLabel>

			{value &&
				value.length > 0 &&
				value.map((value: IFileTypes) => (
					<UploadItem key={value.id}>
						<UploadTitle>{value.file.name}</UploadTitle>
						<button onClick={() => handleFilterFile(value.id)}>X</button>
					</UploadItem>
				))}
		</Container>
	);
};

export default FileUpload;

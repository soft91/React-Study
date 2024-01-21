import { css } from "@emotion/react";

export const container = css`
	.quill {
		height: 100vh;
		padding: 20px;
		margin: 20px;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
		background-color: #fff;
	}
	.ql-contianer.ql-snow {
		border: none;
		display: flex;
		justify-content: center;
	}
	.ql-contianer.ql-editor {
		width: 100%;
	}
	.ql-toolbar.ql-snow {
		display: flex;
		justify-content: center;
		position: sticky;
		z-index: 1;
		top: 0;
		background-color: #f3f3f3;
		border: none;
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
	}
`;

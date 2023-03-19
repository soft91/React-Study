import styled from "styled-components";

export const AccordionDiv = styled.div`
	&.on .accoArrow {
		transform: rotate(-180deg);
	}
`;

export const AccordionContainer = styled.div<{ border?: boolean }>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2rem;
	border-bottom: ${(props) => props.border && "1px solid #D9D9D9;"};
	& > div:first-child {
		font-size: 1.6rem;
		color: #222222;
		font-weight: 400;
	}
	& .accoArrow {
		transition: transform 0.3s;
	}
`;

export const AccordionContent = styled.div`
	& .accoWrap {
		transition: height 0.4s;
		overflow: hidden;
		height: 0;
	}
	& .accoCont {
		background-color: #f5f5f5;
		font-size: 1.2rem;
		color: #222222;
		font-weight: 400;
		padding: 2rem;
		line-height: 1.738rem;
		text-align: left;
		word-break: break-all;
	}
`;

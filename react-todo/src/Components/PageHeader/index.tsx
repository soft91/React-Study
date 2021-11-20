import React from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1E40FF;
`;

const Title = styled.div`
  padding: 20px;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 600;
`;

const GoBack = styled(Link)`
  padding: 20px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  position: absolute;
  left: 20px;
`;

export const PageHeader = () => {
  const { pathname } = useLocation();
  let title = "에러";

  if(pathname === '/') {
    title = "할 일 목록";
  } else if (pathname === "/add") {
    title = "할 일 추가";
  } else if (pathname.startsWith("/detail")) {
    title = "할 일 상세";
  }

  return (
    <Container>
      <Title>{title}</Title>
      {pathname !== '/' && <GoBack to ="/">돌아가기</GoBack>}
    </Container>
  )
}
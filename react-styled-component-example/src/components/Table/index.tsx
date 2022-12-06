import React from "react";
import styled from "styled-components";

interface IProps {
  header?: Array<string>;
  items?: Array<object>;
}

const Container = styled.div`
  display: grid;
  padding: 5px;
  gap: 5px;
  border: 3px solid currentColor;
  border-radius: 5px;
  font-size: 1.2em;
  background: #ffe300;
  transition: 0.5s;
  height: 100%;
`;

const HeaderContainer = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.cols}, 1fr)`};
  gap: 5px;
`;

const Header = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  border-radius: 3px;
  font-weight: bold;
  background: red;
  transition: 0.4s;
  height: 50px;
`;

const ItemContainer = styled.div<{ rows: number }>`
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.rows}, 1fr)`};
  gap: 5px;
`;

const Items = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  border-radius: 3px;
  font-weight: bold;
  background: #26ab1c;
  transition: 0.4s;
  height: 3rem;
`;

const Table = ({ header, items }: IProps) => {
  const headerDummy = ["Header1", "Header2", "Header3"];
  const itemDummy = [
    { test1: "111", test2: "222", test3: "333" },
    { test1: "122", test2: "211", test3: "322" },
    { test1: "133", test2: "233", test3: "311" },
  ];

  return (
    <Container>
      <HeaderContainer cols={headerDummy.length}>
        {headerDummy.map((headerItem, index) => (
          <Header key={index}>{headerItem}</Header>
        ))}
      </HeaderContainer>
      {itemDummy.map((item) => {
        return (
          <ItemContainer rows={itemDummy.length}>
            {Object.values(item).map((value, index) => (
              <Items key={index}>{value}</Items>
            ))}
          </ItemContainer>
        );
      })}
    </Container>
  );
};

export default Table;

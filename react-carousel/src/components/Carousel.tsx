import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SliderBtn = styled.button<{ direction: string; disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 0px;
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 700px;
  height: 260px;
  gap: 16px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    max-width: 738px;
  }
`;

const Item = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  white-space: nowrap;
  background-color: #dddddd;
  padding: 0px;
  gap: 4px;
`;

const tempData = [
  {
    id: "0",
    userName: "admin",
    title: "Data 0",
  },
  {
    id: "1",
    userName: "admin",
    title: "Data 1",
  },
  {
    id: "2",
    userName: "admin",
    title: "Data 2",
  },
  {
    id: "3",
    userName: "admin",
    title: "Data 3",
  },
  {
    id: "4",
    userName: "admin",
    title: "Data 4",
  },
  {
    id: "5",
    userName: "admin",
    title: "Data 5",
  },
  {
    id: "6",
    userName: "admin",
    title: "Data 6",
  },
  {
    id: "7",
    userName: "admin",
    title: "Data 7",
  },
  {
    id: "8",
    userName: "admin",
    title: "Data 8",
  },
  {
    id: "9",
    userName: "admin",
    title: "Data 9",
  },
  {
    id: "10",
    userName: "admin",
    title: "Data 10",
  },
  {
    id: "11",
    userName: "admin",
    title: "Data 11",
  },
  {
    id: "12",
    userName: "admin",
    title: "Data 12",
  },
  {
    id: "13",
    userName: "admin",
    title: "Data 13",
  },
  {
    id: "14",
    userName: "admin",
    title: "Data 14",
  },
  {
    id: "15",
    userName: "admin",
    title: "Data 15",
  },
  {
    id: "16",
    userName: "admin",
    title: "Data 16",
  },
  {
    id: "17",
    userName: "admin",
    title: "Data 17",
  },
  {
    id: "18",
    userName: "admin",
    title: "Data 18",
  },
  {
    id: "19",
    userName: "admin",
    title: "Data 19",
  },
  {
    id: "20",
    userName: "admin",
    title: "data 20",
  },
];

const Carousel = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [btnDisabled, setBtnDisabled] = useState<{
    left: boolean;
    right: boolean;
  }>({
    left: true,
    right: true,
  });

  const BtnDisabled = useCallback(() => {
    const offsetWidth = container.current?.offsetWidth as number;
    const scrollLeft = container.current?.scrollLeft as number;
    const scrollWidth = container.current?.scrollWidth as number;

    if (scrollLeft === 0 && offsetWidth < scrollWidth) {
      setBtnDisabled((prev) => ({
        ...prev,
        left: true,
        right: false,
      }));
    } else if (scrollLeft + offsetWidth >= scrollWidth) {
      setBtnDisabled((prev) => ({
        ...prev,
        left: false,
        right: true,
      }));
    } else {
      setBtnDisabled((prev) => ({
        ...prev,
        left: false,
      }));
    }
  }, [setBtnDisabled]);

  // Prev Button
  const Prev = useCallback(() => {
    container.current?.scrollTo({
      left: (container.current.scrollLeft -= container.current?.clientWidth),
    });
    BtnDisabled();
  }, [container, BtnDisabled]);

  // Next Button
  const Next = useCallback(() => {
    container.current?.scrollTo({
      left: (container.current.scrollLeft += container.current?.clientWidth),
    });
    BtnDisabled();
  }, [container, BtnDisabled]);

  useEffect(() => {
    BtnDisabled();
  }, [BtnDisabled]);

  return (
    <Container>
      <SliderBtn direction="left" disabled={btnDisabled.left} onClick={Prev}>
        {"<"}
      </SliderBtn>
      <Contents ref={container}>
        {tempData.map((item) => (
          <Item>{item.title}</Item>
        ))}
      </Contents>
      <SliderBtn direction="right" disabled={btnDisabled.right} onClick={Next}>
        {">"}
      </SliderBtn>
    </Container>
  );
};

export default Carousel;

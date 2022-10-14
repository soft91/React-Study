import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import { PaginationTypes } from "../types/product";
import { useRouter } from "next/router";
import { usePagination } from "../hooks/index";

const Pagination = ({ total, currentPage }: PaginationTypes) => {
  const router = useRouter();
  const pagination = usePagination();
  const maxPage = Math.ceil(total / 10);
  let pageNumbers = [];

  for (let i = pagination.page; i < pagination.page + 5 && i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  const goPrevPage = () => {
    pagination.setPage((pagination.page -= 5));
    return (currentPage -= 5);
  };

  const goNextPage = () => {
    pagination.setPage((pagination.page += 5));
    return currentPage + 5 > maxPage ? maxPage : (currentPage += 5);
  };

  return (
    <Container>
      <Button
        disabled={currentPage - 5 < 1}
        onClick={() => {
          router.push(`/pagination?page=${goPrevPage()}`);
        }}
      >
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {pageNumbers.map((value, i) => (
          <Page
            key={value}
            selected={value === currentPage}
            onClick={() => {
              router.push(`/pagination?page=${value}`);
            }}
            disabled={value === currentPage}
          >
            {value}
          </Page>
        ))}
      </PageWrapper>
      <Button
        disabled={currentPage === maxPage}
        onClick={() => {
          router.push(`/pagination?page=${goNextPage()}`);
        }}
      >
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  cursor: pointer;
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? "#000" : "transparent")};
  color: ${({ selected }) => (selected ? "#fff" : "#000")};
  font-size: 20px;
  cursor: pointer;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;

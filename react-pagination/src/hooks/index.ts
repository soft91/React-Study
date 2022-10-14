import React, { useState } from "react";

export const usePagination = () => {
  const [count, setCount] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  return { count, totalCount, page, setPage, setTotalCount, setCount };
};

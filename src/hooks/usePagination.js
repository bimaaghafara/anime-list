import { useState } from "react";

const usePagination = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const handleChangePerPage = (e) => {
    setPage(1);
    setPerPage(e.target.value);
  }
  return {
    page,
    setPage,
    perPage,
    setPerPage,
    handleChangePerPage,
  }
}

export default usePagination;
import { useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
 
export function ShowPagination({totalPages, onPageChange} : {totalPages: number,onPageChange: (pageNumber: number) => void}) {
  const [page, setPage] = useState<number>(1);

  function handlePageChange(pageNumber: number) {
    setPage(pageNumber)
    onPageChange(pageNumber);
  };

  function handlePreviousPage() {
    if (page > 1) {
      setPage(page - 1)
      onPageChange(page - 1);
    }
  }

  function handleNextPage() {
    if (page < totalPages) {
      setPage(page + 1)
      onPageChange(page + 1);
    }
  }


  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePreviousPage} />
        </PaginationItem>

        {
          totalPages && [...Array(totalPages)].map((_, index) => (
            <PaginationItem>
              <PaginationLink href="#" onClick={() => handlePageChange(index + 1)} isActive={page === index + 1}>{index + 1}</PaginationLink>
            </PaginationItem>
          ))
        }

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
import React from 'react';

const PaginationTasks = ({
  currentPage,
  totalPages,
  totalCount,
  setCurrentPage,
}) => {
  return (
    <div className='pagination'>
      <button
        onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {totalPages}, Total de Tarefas: {totalCount}
      </span>
      <button
        onClick={() =>
          setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
        }
        disabled={currentPage === totalPages}
      >
        Próximo
      </button>
    </div>
  );
};

export default PaginationTasks;

const Pagination = ({ pageSize, quantity, page, setPage }) => {
    const pagesNumber = quantity % pageSize === 0 ? quantity / pageSize : (quantity / pageSize) + 1
    const pages = []
    for (let index = 1; index <= pagesNumber; index++) {
      pages.push(index)
    }
    
    return (
      <div className="pagination-container">
        <div className="pagination-list">
        {pages.map((p) => (
         <div key={p} className={`pagination-element ${page === p && 'pagination-element-atual'}`} onClick={() => setPage(p)}>{p}</div>
        ))}
        </div>
      </div>
    )
  }
  
  export default Pagination
// Define the Pagination component
const Pagination = ({ pageSize, quantity, page, setPage }) => {
  // Calculate the total number of pages based on the quantity of items and page size
    const pagesNumber = quantity % pageSize === 0 ? quantity / pageSize : (quantity / pageSize) + 1
    
    // Generate an array of page numbers
    const pages = []
    for (let index = 1; index <= pagesNumber; index++) {
      pages.push(index)
    }
    
    // Render the Pagination component
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
  
  // Export the Pagination component
  export default Pagination
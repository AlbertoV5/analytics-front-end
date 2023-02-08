
const TableControls = ({page, setPage}: {page: number, setPage: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <section className='py-2'>
      <ul className="pagination">
          <li className="page-item">
              <p style={{cursor:"pointer"}} className="page-link" onClick={() => setPage(prev => prev - 1)}>Prev</p>
          </li>
          <li className="page-item">
              <p className="page-link disabled">{page + 1}</p>
          </li>
          <li className="page-item">
              <p style={{cursor:"pointer"}} className="page-link" onClick={() => setPage(prev => prev + 1)}>Next</p>
          </li>
      </ul>
    </section>
  )
}

export default TableControls
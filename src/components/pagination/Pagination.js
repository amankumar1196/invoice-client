import React from 'react'
import { connect } from 'react-redux'
import "./Pagination.css"

const Pagination = (props) => {
  const { filters, currentTotalRecords, filterHook, pagination: { totalPages, currentPage, totalRecords } } = props;
  // const startIndex = (filters.rpp*(filters.page-1)+1);
  // const endIndex = startIndex+currentTotalRecords-1;
  
  const onFilterChange = (filter) => {
    filterHook({...filters, ...filter})
  }

  return(
    totalRecords > 5 && <div className="pagination-container d-flex flex-row align-items-center justify-content-end">
      {/* <div className="d-flex flex-row align-items-center">
        <span>Show</span>
        <select  value={filters.rpp} onChange={(a)=> onFilterChange({page: 1, rpp: a.target.value})}>
          <option>5</option>
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
        <span className="text-nowrap">entries of {totalRecords} ({startIndex} to {endIndex})</span>
      </div> */}
      <select className='pagination-show mr-16' value={filters.rpp} onChange={(a)=> onFilterChange({page: 1, rpp: a.target.value})}>
        <option>5</option>
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>100</option>
      </select>
      <div className='pagination-wrapper'>
        { filters.page > 1 ?
          <>
            <span className='pagination-item' onClick={() => onFilterChange({page: 1})}><i class='bx bx-chevrons-left'></i></span>
            <span className='pagination-item' onClick={() => onFilterChange({page: filters.page-1})}><i class='bx bx-chevron-left'></i></span>
          </>
          :
          <>
            <span className='pagination-item'><i class='bx bx-chevrons-left'></i></span>
            <span className='pagination-item'><i class='bx bx-chevron-left'></i></span>
          </>
        }
        <span className='pagination-item'>{currentPage}</span>
        { filters.page < totalPages ?
          <>
            <span className='pagination-item' onClick={() => onFilterChange({page: filters.page+1})}><i class='bx bx-chevron-right'></i></span>
            <span className='pagination-item' onClick={() => onFilterChange({page: totalPages})}><i class='bx bx-chevrons-right'></i></span>
          </>
          :
          <>
            <span className='pagination-item'><i class='bx bx-chevron-right'></i></span>
            <span className='pagination-item'><i class='bx bx-chevrons-right'></i></span>
          </>
        }
        <span className='pagination-page-count'>/ {totalPages && totalPages.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</span>
      </div>
    </div>
  )
}

export default connect()(Pagination)
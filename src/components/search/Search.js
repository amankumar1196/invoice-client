import { debounce } from 'lodash';
import React from 'react'
import { connect } from 'react-redux'

const Search = (props) => {
  const { filters, searchHook, placeholder } = props;
  
  const onSearchChange = (filter) => {
    let debounceFun =debounce(()=>searchHook({...filters, ...filter}),2000)
    debounceFun();
  }

  return(
    <div class="invoice-page-header-right">
      <div class="header__search">
        <input type="search" placeholder={placeholder} class="header__input" onChange={(e) => onSearchChange({searchStr: e.target.value})}/>
        <i class='bx bx-search header__icon'></i>
      </div>
    </div>
  )
}

export default connect()(Search)
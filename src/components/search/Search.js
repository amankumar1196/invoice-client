import { debounce } from 'lodash';
import React, { useCallback } from 'react'
import { connect } from 'react-redux'

const Search = (props) => {
  const { filters, searchHook, placeholder } = props;

  const debouncedCallback = useCallback(
		debounce(val => searchHook(val), 1500),
		[], // will be created only once initially
	);

  const onSearchChange = (search) => {
		debouncedCallback({...filters, ...search});
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
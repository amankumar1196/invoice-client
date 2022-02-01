import React, { useState, useEffect, useRef } from "react";

function debounce(fn, delay) {
  let timer;
  const thisContext = this;
  const args = arguments;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return fn.apply(thisContext, args);
    }, delay);
  };
}

class DropDownListItem extends React.Component {
  constructor(props) {
    super(props);
    this.debouncedToggleChangeListItem = debounce(
      this.toggleChangeListItem,
      100
    );
  }
  toggleChangeListItem = () => {
    const { listData, uniqueKey } = this.props;
    this.props.selectListItem(listData[uniqueKey]);
  };
  onKeyUp = e => {
    if (e.keyCode === 13) {
      const { listData, uniqueKey } = this.props;
      this.props.selectListItem(listData[uniqueKey]);
    }
  };
  render() {
    const { listData, isChecked } = this.props;
    const id = `${listData.label}__${listData.value}`;
    return (
      <div
        tabIndex={0}
        className={`drop-down__list-item d-flex align-items-center justify-content-between ${isChecked && "active"}`}
        onClick={this.debouncedToggleChangeListItem}
        onKeyUp={this.onKeyUp}
      >
        <input
          tabIndex={-1}
          id={id}
          type="checkbox"
          checked={isChecked}
          value={listData.value}
          className="d-none"
        />
        <label className="pl-8" htmlFor={id}>{listData.label}</label>
        { isChecked && <i className="bx bx-check fs-20 color-primary"></i> }
      </div>
    );
  }
}


const SingleSelectDropdown = (props) => {
  const { uniqueKey, placeholder, data, defaultSelectedValue, showContent, customRenderDropDownIcon, onChangeHook, requiredSelected, title } = props;
  const [ selected, setSelected ] = useState(defaultSelectedValue ? defaultSelectedValue : null);
  const [ isOpen, setIsOpen ] = useState(false);
  
  const wrapper = useRef(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClickOutside = event => {
    if (wrapper.current && !wrapper.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const selectListItem = val => {
    setSelected(val);
    onChangeHook && onChangeHook(val);
  };

  const renderDropDownIcon = () => {
    if (customRenderDropDownIcon) {
      return customRenderDropDownIcon();
    } else {
      return isOpen ? <i class='bx bx-chevron-up fs-20'></i> : <i class='bx bx-chevron-down fs-20'></i>;
    }
  };

  const renderSelected = () => {
    let labelContent = "";
    if (selected) {
      labelContent = selected;
    } else labelContent = placeholder
    const activeClass = isOpen ? "single-select-drop-down--is-open" : "";
    
    return (
      <button
        className={`btn btn-link d-flex align-items-center ${activeClass}`}  // new-drop-down__button
        onClick={() => setIsOpen(!isOpen)}
      >
        {showContent && <span>{labelContent}</span>}
        {renderDropDownIcon()}
      </button>
    );
  };

  const renderDropDownList = () => {
    let data_ = [...data];

    const getIsChecked = ({ listData, uniqueKey, selected }) => {
      let isChecked = false;
      if (listData[uniqueKey] === selected) {
        isChecked = true;
      } else {
        isChecked = false;
      }
      return isChecked;
    };

    return data_.map((listData, index) => {
      const isChecked = getIsChecked({ listData, uniqueKey, selected });
      return (
        <DropDownListItem
          key={index}
          selectListItem={selectListItem}
          listData={listData}
          uniqueKey={uniqueKey}
          isChecked={isChecked}
        />
      );
    });
  };

  return (
    <div className="single-select-drop-down">
      {renderSelected()}
      {isOpen && (
        <div className="single-select-drop-down__list-wrapper" ref={wrapper}>
          {title && <label className="single-select-dropdown-title">{title}</label>}
          {renderDropDownList()}
        </div>
      )}
    </div>
  );
}

export default SingleSelectDropdown;
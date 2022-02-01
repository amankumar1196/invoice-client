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
    const { listData, uniqueKey, requiredSelected } = this.props;
    this.props.toggleChangeListItem(listData[uniqueKey]);
  };
  onKeyUp = e => {
    if (e.keyCode === 13) {
      const { listData, uniqueKey } = this.props;
      this.props.toggleChangeListItem(listData[uniqueKey]);
    }
  };
  render() {
    const { listData, isChecked } = this.props;
    const id = `${listData.label}__${listData.value}`;
    return (
      <div
        tabIndex={0}
        className="drop-down__list-item"
        onClick={this.debouncedToggleChangeListItem}
        onKeyUp={this.onKeyUp}
      >
        <input
          tabIndex={-1}
          id={id}
          type="checkbox"
          checked={isChecked}
          value={listData.value}
        />
        <label htmlFor={id}>{listData.label}</label>
      </div>
    );
  }
}


const MultiSelectDropdown = (props) => {
  const { uniqueKey, data, defaultSelectedValues, shouldHaveSelectAll, showContent, customRenderDropDownIcon, onChangeHook, requiredSelected, title } = props;
  const [ selected, setSelected ] = useState(defaultSelectedValues ? defaultSelectedValues : []);
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

  const toggleChangeListItem = val => {
    if (val === "ALL") {
      if (selected.length === data.length) {
        setSelected([]);
        onChangeHook && onChangeHook([]);

      } else {
        const allUniqueKeys = data.map(
          item => item[uniqueKey]
        );
        setSelected(allUniqueKeys);
        onChangeHook && onChangeHook(allUniqueKeys);
      }
    } else {
      let updatedSelected = [...selected];
      if(!requiredSelected || updatedSelected.length > 1 || updatedSelected[0] !== val){ 
        if (updatedSelected.indexOf(val) > -1) {
          updatedSelected.splice(updatedSelected.indexOf(val), 1);
        } else {
          updatedSelected.push(val);
        }
        setSelected(updatedSelected);
        onChangeHook && onChangeHook(updatedSelected);
      }
    }

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
    if (!selected.length) {
      labelContent = "None Selected";
    } else if (selected.length === data.length) {
      labelContent = "All Selected";
    } else if (selected.length === 1) {
      const selectedOne = data.find(item => item[uniqueKey] === selected[0]);
      labelContent = selectedOne.label;
    } else {
      labelContent = `${selected.length} Selected`;
    }
    const activeClass = isOpen ? "multiselect-drop-down--is-open" : "";
    
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

    if (shouldHaveSelectAll) {
      data_ = [{ label: "All", value: "ALL" }, ...data];
    }

    const getIsChecked = ({ listData, uniqueKey, selected }) => {
      let isChecked = false;
      if (listData[uniqueKey] === "ALL") {
        if (selected.length === data.length) {
          isChecked = true;
        } else {
          isChecked = false;
        }
      } else {
        isChecked = selected.indexOf(listData[uniqueKey]) > -1;
      }
      return isChecked;
    };

    return data_.map((listData, index) => {
      const isChecked = getIsChecked({ listData, uniqueKey, selected });
      return (
        <DropDownListItem
          key={index}
          toggleChangeListItem={toggleChangeListItem}
          listData={listData}
          uniqueKey={uniqueKey}
          isChecked={isChecked}
        />
      );
    });
  };

  return (
    <div className="multiselect-drop-down">
      {renderSelected()}
      {isOpen && (
        <div className="multiselect-drop-down__list-wrapper" ref={wrapper}>
          {title && <label className="multiselect-dropdown-title">{title}</label>}
          {renderDropDownList()}
        </div>
      )}
    </div>
  );
}

/**********************************/
// propTypes
/**********************************/
// NewDropDown.propTypes = {
//     shouldHaveSelectAll: PropTypes.bool,
//     selected: PropTypes.array,
//     data: PropTypes.array,
//     uniqueKey: PropTypes.string,
//     toggleChangeListItem: PropTypes.func,
//     customRenderDropDownIcon: () => null
// };

export default MultiSelectDropdown;
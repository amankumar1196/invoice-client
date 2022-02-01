import "./actionBox.css";

function ActionBox(props) {
	const { viewIcon, iconStyle, items, position } = props;

	return (
    <div class="actionbox-dropdown">
      <span>
        <i class={`bx bx-${viewIcon} ${iconStyle ? iconStyle : ""}`}></i>
      </span>
      <div class={`actionbox-dropdown-content ${position}`}>
        { items.map((item, index) => {
          return (
            <a key={`dropdown-item-${index}-${item.name}`} 
              onClick={() => item.onClickAction()}
            >
              { item.icon && <i className={`fs-16 bx bx-${item.icon}`}></i> }
              { item.name }
            </a>
          )}
        )}
      </div>
    </div>
	);
}

export default ActionBox;
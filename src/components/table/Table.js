// import "./Client.css";
import { connect } from "react-redux";

function Table(props) {
	const { children, filters, columns } = props;

	const getTableColumn = (columns) => {
    return <thead>
      <tr>
        { columns.map(col => (
          <th width={col.width} >
            { col.render ? 
              col.render()
              :
              <div className={col.style}>
                <div onClick={() => col.onClickColumnHook({...filters, sortBy: col.value, sortModal: col.modal, sortDirection: filters.sortDirection == "DESC" ? "ASC" : "DESC"})}>
                  {col.name}
                  {col.allowSorting && filters.sortBy === col.value ?
                    <i class={`bx bxs-${filters.sortDirection == "DESC" ? "down" : "up"}-arrow`}></i>
                    :
                    null
                  }
                </div>
                {col.filterMethod && col.filterMethod()}
              </div>
            }
          </th>
        ))}
      </tr>
    </thead>
	}	

  return (
    <table>
      {getTableColumn(columns)}
      <tbody>
        { children }
      </tbody>
    </table>
  );
}

function mapStateToProps(state) {
  const { filters } = state;
  return {
		filters
  };
}

export default connect(mapStateToProps)(Table);
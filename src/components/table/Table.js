// import "./Client.css";
import { connect } from "react-redux";

function Table(props) {
	const { children, filters, columns } = props;

	const getTableColumn = (columns) => {
    return <thead>
      <tr>
        { columns.map(col => (
          <th onClick={() => col.onClickColumnHook({...filters, sortBy: col.value, sortDirection: filters.sortDirection == "DESC" ? "ASC" : "DESC"})}>
            {col.name} 
            { filters.sortBy === col.value ? 
              filters.sortDirection == "DESC" ?
                <i class='bx bxs-down-arrow'></i>
                :
                <i class='bx bxs-up-arrow' ></i>
              :
              null
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
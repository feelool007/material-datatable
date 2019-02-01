import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  Checkbox
} from "@material-ui/core";
import classNames from "classnames";

import TableToolbar from "../TableToolbar";

const tableStyles = theme => ({
  paper: {
    width: "100%",
    marginBottom: theme.spacing.unit * 1
  },
  tableWrapper: {
    overflowX: "auto"
  },
  table: {
    minWidth: 850
  },
  black: {
    color: "black"
  },
  header: {
    fontSize: "16pt",
    color: "black",
    backgroundColor: "#f5f5f5"
  },
  body: {
    "&:nth-of-type(even)": {
      backgroundColor: "#fafafa"
    }
  },
  hover: {
    "&:hover": {
      backgroundColor: "#E1F5FE"
    }
  },
  pickable: {
    cursor: "pointer"
  },
  picked: {
    backgroundColor: "#FFEBEE",
    "&:nth-of-type(even)": {
      backgroundColor: "#FFEBEE"
    }
  },
  tableCell: {
    maxWidth: 350
  }
});

class _DataTable extends Component {
  constructor(props) {
    super(props);
    let filters = {};
    props.headers.forEach(h => {
      filters[h.column] = {
        label: h.label,
        visible: true
      };
    });
    this.state = {
      sortBy: props.defaultSortBy || props.headers[0].column,
      sortDirection: props.defaultSortDirection,
      page: 0,
      rowsPerPage: props.rowsPerPageOpts[0],
      selected: [],
      picked: "",
      search: "",
      filters
    };
    this.data = props.data;
    this.csvHeaders =
      props.csvHeaders ||
      props.headers.map(d => ({
        ...d,
        key: d.column
      }));
  }

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getLabelDisplayedRows = ({ from, to, count }) => {
    return `第${from} - ${to}筆，共${count}筆`;
  };

  handleChangeSort = nextSortBy => {
    let { sortBy, sortDirection } = this.state;
    let nextSortDirection;
    if (sortDirection === "asc") {
      nextSortDirection = nextSortBy === sortBy ? "desc" : "asc";
    } else {
      nextSortDirection = nextSortBy === sortBy ? "asc" : "desc";
    }
    this.setState({
      sortBy: nextSortBy,
      sortDirection: nextSortDirection
    });
  };

  getSortedData = () => {
    let { sort, data } = this.props;
    let { sortBy, sortDirection } = this.state;
    this.data = data.map((d, index) => {
      return {
        ...d,
        dataIX: index
      };
    });
    if (sort) {
      this.data.sort((a, b) => {
        if (a[sortBy] === b[sortBy]) {
          // 值相等則不更動順序
          return 0;
        }
        if (sortDirection === "asc") {
          // 遞增，小的在前面
          return a[sortBy] < b[sortBy] ? -1 : 1;
        } else {
          // 遞減，大的在前面
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
    }
  };

  getPageData = () => {
    let { page, rowsPerPage } = this.state;
    this.data = this.data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  isSelected = criteria => this.state.selected.indexOf(criteria) > -1;

  isSelectAll = () => {
    let { selectBy, data } = this.props;
    let criteriaList = data.map(d => d[selectBy]);
    return criteriaList.every(this.isSelected);
  };

  handleSelect = criteria => {
    let oldSelected = [...this.state.selected];
    let newSelected = [];
    let index = oldSelected.indexOf(criteria);
    let { onSelect } = this.props;

    if (index === -1) {
      newSelected = oldSelected.concat(criteria);
    } else {
      oldSelected.splice(index, 1);
      newSelected = [...oldSelected];
    }
    this.setState({ selected: newSelected }, () => {
      onSelect(this.state.selected);
    });
  };

  handleSelectAll = () => {
    let newSelected;
    let { onSelect } = this.props;
    if (this.isSelectAll()) {
      newSelected = [];
    } else {
      let { selectBy, data } = this.props;
      newSelected = data.map(d => d[selectBy]);
    }
    this.setState({ selected: newSelected }, () => {
      onSelect(this.state.selected);
    });
  };

  isPick = criteria => criteria === this.state.picked;

  handleChangeSearch = event => {
    this.setState({ search: event.target.value });
  };

  getFiltedData = () => {
    const { headers } = this.props;
    const { search } = this.state;
    this.data = this.data.filter(d => {
      // 只要其中一欄資料有包含search，就回傳true
      return headers.some(h => {
        if (!d[h.column]) return false;
        return d[h.column].toString().includes(search);
      });
    });
  };

  handleResetSearch = () => {
    this.setState({ search: "" });
  };

  handlePick = criteria => () => {
    let { pick, onPick } = this.props;
    if (pick) {
      this.setState(
        prevState => ({
          picked: prevState.picked === criteria ? "" : criteria
        }),
        () => {
          onPick(this.state.picked);
        }
      );
    }
  };

  handleChangeFilter = (event, checked) => {
    const { name } = event.target;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: {
          label: prevState.filters[name].label,
          visible: checked
        }
      }
    }));
  };

  render = () => {
    let {
      classes,
      headers,
      actionHeaders,
      rowsPerPageOpts,
      sort,
      hover,
      select,
      selectBy,
      pick,
      pickBy,
      toolbar,
      searchable,
      filterble,
      csv,
      csvFilename,
      minWidth,
      components,
      getTableRowStyle
    } = this.props;
    let { TBodyCell } = components;
    let children = React.Children.toArray(this.props.children);
    let { page, rowsPerPage, sortBy, sortDirection, search, filters } = this.state;
    let columns = headers.map(h => h.column);
    // generate table data
    this.getSortedData();
    searchable && this.getFiltedData();
    this.getPageData();

    return (
      <Paper className={classes.paper}>
        {toolbar && (
          <TableToolbar
            data={this.props.data}
            searchable={searchable}
            filterble={filterble}
            searchValue={search}
            filters={filters}
            csv={csv}
            csvFilename={csvFilename}
            csvHeaders={this.csvHeaders}
            onSearch={this.handleChangeSearch}
            onResetSearch={this.handleResetSearch}
            onFilter={this.handleChangeFilter}
          />
        )}
        <div className={classes.tableWrapper}>
          <Table style={{ minWidth }}>
            <TableHead>
              <TableRow className={classes.header}>
                {select && (
                  // if select, show checkbox on head
                  <TableCell padding="checkbox">
                    <Checkbox checked={this.isSelectAll()} onChange={this.handleSelectAll} />
                  </TableCell>
                )}
                {headers.map((header, index) => {
                  return (
                    // if visible, show this column
                    filters[header.column].visible && (
                      <TableCell key={index} padding="dense">
                        <TableSortLabel
                          active={sort && sortBy === header.column}
                          direction={sortDirection}
                          onClick={() => this.handleChangeSort(header.column)}
                        >
                          {header.label}
                        </TableSortLabel>
                      </TableCell>
                    )
                  );
                })}
                {children &&
                  // show row actions
                  children.map((_, index) => {
                    return (
                      <TableCell key={index} padding="dense">
                        {actionHeaders[index] || `動作${index + 1}`}
                      </TableCell>
                    );
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.data.map((d, rowIX) => {
                return (
                  <TableRow
                    key={rowIX}
                    className={classNames(classes.body, {
                      [classes.hover]: hover,
                      [classes.pickable]: pick,
                      [classes.picked]: this.isPick(d[pickBy])
                    })}
                    onClick={this.handlePick(d[pickBy])}
                    style={getTableRowStyle(d, rowIX)}
                  >
                    {select && (
                      // if select, show checkbox on each row
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={this.isSelected(d[selectBy])}
                          onChange={() => this.handleSelect(d[selectBy])}
                        />
                      </TableCell>
                    )}
                    {columns.map((col, colIX) => {
                      return (
                        // if visible, show this column
                        filters[col].visible &&
                        // if custom TBodyCell, use TBodyCell
                        (TBodyCell ? (
                          <TBodyCell key={colIX} column={col} columnIndex={colIX} value={d[col]} />
                        ) : (
                          <TableCell key={colIX} padding="dense" className={classes.tableCell}>
                            {d[col]}
                          </TableCell>
                        ))
                      );
                    })}
                    {children &&
                      // show row actions
                      children.map((child, childIX) => {
                        return (
                          <TableCell key={childIX} padding="dense">
                            <child.type {...child.props} data={d} index={d.dataIX} />
                          </TableCell>
                        );
                      })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={this.props.data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOpts}
          labelRowsPerPage={"每頁顯示："}
          labelDisplayedRows={this.getLabelDisplayedRows}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  };
}
const DataTable = withStyles(tableStyles)(_DataTable);

_DataTable.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
  sort: PropTypes.bool,
  hover: PropTypes.bool,
  defaultSortDirection: PropTypes.oneOf(["asc", "desc"]),
  defaultSortBy: PropTypes.string,
  select: PropTypes.bool,
  selectBy: PropTypes.string,
  pick: PropTypes.bool,
  pickBy: PropTypes.string,
  toolbar: PropTypes.bool,
  searchable: PropTypes.bool,
  filterble: PropTypes.bool,
  csv: PropTypes.bool,
  csvHeaders: PropTypes.array,
  csvFilename: PropTypes.string,
  rowsPerPageOpts: PropTypes.array,
  actionHeaders: PropTypes.array,
  minWidth: PropTypes.number,
  components: PropTypes.object,
  onSelect: PropTypes.func,
  onPick: PropTypes.func,
  getTableRowStyle: PropTypes.func
};

_DataTable.defaultProps = {
  sort: true,
  hover: true,
  defaultSortDirection: "desc",
  defaultSortBy: "",
  select: false,
  pick: false,
  toolbar: false,
  searchable: false,
  filterble: false,
  csv: false,
  csvFilename: "export.csv",
  rowsPerPageOpts: [10, 25, 50],
  actionHeaders: [],
  minWidth: 850,
  components: {},
  onSelect: () => {},
  onPick: () => {},
  getTableRowStyle: () => {}
};

export default DataTable;

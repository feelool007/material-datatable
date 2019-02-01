"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _classnames = _interopRequireDefault(require("classnames"));

var _TableToolbar = _interopRequireDefault(require("../TableToolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tableStyles = function tableStyles(theme) {
  return {
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
  };
};

var _DataTable = function (_Component) {
  _inherits(_DataTable, _Component);

  function _DataTable(props) {
    var _this;

    _classCallCheck(this, _DataTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_DataTable).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChangePage", function (_, page) {
      _this.setState({
        page: page
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChangeRowsPerPage", function (event) {
      _this.setState({
        rowsPerPage: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getLabelDisplayedRows", function (_ref) {
      var from = _ref.from,
          to = _ref.to,
          count = _ref.count;
      return "\u7B2C".concat(from, " - ").concat(to, "\u7B46\uFF0C\u5171").concat(count, "\u7B46");
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChangeSort", function (nextSortBy) {
      var _this$state = _this.state,
          sortBy = _this$state.sortBy,
          sortDirection = _this$state.sortDirection;
      var nextSortDirection;

      if (sortDirection === "asc") {
        nextSortDirection = nextSortBy === sortBy ? "desc" : "asc";
      } else {
        nextSortDirection = nextSortBy === sortBy ? "asc" : "desc";
      }

      _this.setState({
        sortBy: nextSortBy,
        sortDirection: nextSortDirection
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSortedData", function () {
      var _this$props = _this.props,
          sort = _this$props.sort,
          data = _this$props.data;
      var _this$state2 = _this.state,
          sortBy = _this$state2.sortBy,
          sortDirection = _this$state2.sortDirection;
      _this.data = data.map(function (d, index) {
        return _objectSpread({}, d, {
          dataIX: index
        });
      });

      if (sort) {
        _this.data.sort(function (a, b) {
          if (a[sortBy] === b[sortBy]) {
            return 0;
          }

          if (sortDirection === "asc") {
            return a[sortBy] < b[sortBy] ? -1 : 1;
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getPageData", function () {
      var _this$state3 = _this.state,
          page = _this$state3.page,
          rowsPerPage = _this$state3.rowsPerPage;
      _this.data = _this.data.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isSelected", function (criteria) {
      return _this.state.selected.indexOf(criteria) > -1;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isSelectAll", function () {
      var _this$props2 = _this.props,
          selectBy = _this$props2.selectBy,
          data = _this$props2.data;
      var criteriaList = data.map(function (d) {
        return d[selectBy];
      });
      return criteriaList.every(_this.isSelected);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSelect", function (criteria) {
      var oldSelected = _toConsumableArray(_this.state.selected);

      var newSelected = [];
      var index = oldSelected.indexOf(criteria);
      var onSelect = _this.props.onSelect;

      if (index === -1) {
        newSelected = oldSelected.concat(criteria);
      } else {
        oldSelected.splice(index, 1);
        newSelected = _toConsumableArray(oldSelected);
      }

      _this.setState({
        selected: newSelected
      }, function () {
        onSelect(_this.state.selected);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSelectAll", function () {
      var newSelected;
      var onSelect = _this.props.onSelect;

      if (_this.isSelectAll()) {
        newSelected = [];
      } else {
        var _this$props3 = _this.props,
            selectBy = _this$props3.selectBy,
            data = _this$props3.data;
        newSelected = data.map(function (d) {
          return d[selectBy];
        });
      }

      _this.setState({
        selected: newSelected
      }, function () {
        onSelect(_this.state.selected);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isPick", function (criteria) {
      return criteria === _this.state.picked;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChangeSearch", function (event) {
      _this.setState({
        search: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getFiltedData", function () {
      var headers = _this.props.headers;
      var search = _this.state.search;
      _this.data = _this.data.filter(function (d) {
        return headers.some(function (h) {
          if (!d[h.column]) return false;
          return d[h.column].toString().includes(search);
        });
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleResetSearch", function () {
      _this.setState({
        search: ""
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePick", function (criteria) {
      return function () {
        var _this$props4 = _this.props,
            pick = _this$props4.pick,
            onPick = _this$props4.onPick;

        if (pick) {
          _this.setState(function (prevState) {
            return {
              picked: prevState.picked === criteria ? "" : criteria
            };
          }, function () {
            onPick(_this.state.picked);
          });
        }
      };
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChangeFilter", function (event, checked) {
      var name = event.target.name;

      _this.setState(function (prevState) {
        return {
          filters: _objectSpread({}, prevState.filters, _defineProperty({}, name, {
            label: prevState.filters[name].label,
            visible: checked
          }))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var _this$props5 = _this.props,
          classes = _this$props5.classes,
          headers = _this$props5.headers,
          actionHeaders = _this$props5.actionHeaders,
          rowsPerPageOpts = _this$props5.rowsPerPageOpts,
          sort = _this$props5.sort,
          hover = _this$props5.hover,
          select = _this$props5.select,
          selectBy = _this$props5.selectBy,
          pick = _this$props5.pick,
          pickBy = _this$props5.pickBy,
          toolbar = _this$props5.toolbar,
          searchable = _this$props5.searchable,
          filterble = _this$props5.filterble,
          csv = _this$props5.csv,
          csvFilename = _this$props5.csvFilename,
          minWidth = _this$props5.minWidth,
          components = _this$props5.components,
          getTableRowStyle = _this$props5.getTableRowStyle;
      var TBodyCell = components.TBodyCell;

      var children = _react.default.Children.toArray(_this.props.children);

      var _this$state4 = _this.state,
          page = _this$state4.page,
          rowsPerPage = _this$state4.rowsPerPage,
          sortBy = _this$state4.sortBy,
          sortDirection = _this$state4.sortDirection,
          search = _this$state4.search,
          filters = _this$state4.filters;
      var columns = headers.map(function (h) {
        return h.column;
      });

      _this.getSortedData();

      searchable && _this.getFiltedData();

      _this.getPageData();

      return _react.default.createElement(_core.Paper, {
        className: classes.paper
      }, toolbar && _react.default.createElement(_TableToolbar.default, {
        data: _this.props.data,
        searchable: searchable,
        filterble: filterble,
        searchValue: search,
        filters: filters,
        csv: csv,
        csvFilename: csvFilename,
        csvHeaders: _this.csvHeaders,
        onSearch: _this.handleChangeSearch,
        onResetSearch: _this.handleResetSearch,
        onFilter: _this.handleChangeFilter
      }), _react.default.createElement("div", {
        className: classes.tableWrapper
      }, _react.default.createElement(_core.Table, {
        style: {
          minWidth: minWidth
        }
      }, _react.default.createElement(_core.TableHead, null, _react.default.createElement(_core.TableRow, {
        className: classes.header
      }, select && _react.default.createElement(_core.TableCell, {
        padding: "checkbox"
      }, _react.default.createElement(_core.Checkbox, {
        checked: _this.isSelectAll(),
        onChange: _this.handleSelectAll
      })), headers.map(function (header, index) {
        return filters[header.column].visible && _react.default.createElement(_core.TableCell, {
          key: index,
          padding: "dense"
        }, _react.default.createElement(_core.TableSortLabel, {
          active: sort && sortBy === header.column,
          direction: sortDirection,
          onClick: function onClick() {
            return _this.handleChangeSort(header.column);
          }
        }, header.label));
      }), children && children.map(function (_, index) {
        return _react.default.createElement(_core.TableCell, {
          key: index,
          padding: "dense"
        }, actionHeaders[index] || "\u52D5\u4F5C".concat(index + 1));
      }))), _react.default.createElement(_core.TableBody, null, _this.data.map(function (d, rowIX) {
        var _classNames;

        return _react.default.createElement(_core.TableRow, {
          key: rowIX,
          className: (0, _classnames.default)(classes.body, (_classNames = {}, _defineProperty(_classNames, classes.hover, hover), _defineProperty(_classNames, classes.pickable, pick), _defineProperty(_classNames, classes.picked, _this.isPick(d[pickBy])), _classNames)),
          onClick: _this.handlePick(d[pickBy]),
          style: getTableRowStyle(d, rowIX)
        }, select && _react.default.createElement(_core.TableCell, {
          padding: "checkbox"
        }, _react.default.createElement(_core.Checkbox, {
          checked: _this.isSelected(d[selectBy]),
          onChange: function onChange() {
            return _this.handleSelect(d[selectBy]);
          }
        })), columns.map(function (col, colIX) {
          return filters[col].visible && (TBodyCell ? _react.default.createElement(TBodyCell, {
            key: colIX,
            column: col,
            columnIndex: colIX,
            value: d[col]
          }) : _react.default.createElement(_core.TableCell, {
            key: colIX,
            padding: "dense",
            className: classes.tableCell
          }, d[col]));
        }), children && children.map(function (child, childIX) {
          return _react.default.createElement(_core.TableCell, {
            key: childIX,
            padding: "dense"
          }, _react.default.createElement(child.type, _extends({}, child.props, {
            data: d,
            index: d.dataIX
          })));
        }));
      })))), _react.default.createElement(_core.TablePagination, {
        component: "div",
        count: _this.props.data.length,
        page: page,
        rowsPerPage: rowsPerPage,
        rowsPerPageOptions: rowsPerPageOpts,
        labelRowsPerPage: "每頁顯示：",
        labelDisplayedRows: _this.getLabelDisplayedRows,
        onChangePage: _this.handleChangePage,
        onChangeRowsPerPage: _this.handleChangeRowsPerPage
      }));
    });

    var _filters = {};
    props.headers.forEach(function (h) {
      _filters[h.column] = {
        label: h.label,
        visible: true
      };
    });
    _this.state = {
      sortBy: props.defaultSortBy || props.headers[0].column,
      sortDirection: props.defaultSortDirection,
      page: 0,
      rowsPerPage: props.rowsPerPageOpts[0],
      selected: [],
      picked: "",
      search: "",
      filters: _filters
    };
    _this.data = props.data;
    _this.csvHeaders = props.csvHeaders || props.headers.map(function (d) {
      return _objectSpread({}, d, {
        key: d.column
      });
    });
    return _this;
  }

  return _DataTable;
}(_react.Component);

var DataTable = (0, _core.withStyles)(tableStyles)(_DataTable);
_DataTable.propTypes = {
  headers: _propTypes.default.array,
  data: _propTypes.default.array,
  sort: _propTypes.default.bool,
  hover: _propTypes.default.bool,
  defaultSortDirection: _propTypes.default.oneOf(["asc", "desc"]),
  defaultSortBy: _propTypes.default.string,
  select: _propTypes.default.bool,
  selectBy: _propTypes.default.string,
  pick: _propTypes.default.bool,
  pickBy: _propTypes.default.string,
  toolbar: _propTypes.default.bool,
  searchable: _propTypes.default.bool,
  filterble: _propTypes.default.bool,
  csv: _propTypes.default.bool,
  csvHeaders: _propTypes.default.array,
  csvFilename: _propTypes.default.string,
  rowsPerPageOpts: _propTypes.default.array,
  actionHeaders: _propTypes.default.array,
  minWidth: _propTypes.default.number,
  components: _propTypes.default.object,
  onSelect: _propTypes.default.func,
  onPick: _propTypes.default.func,
  getTableRowStyle: _propTypes.default.func
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
  onSelect: function onSelect() {},
  onPick: function onPick() {},
  getTableRowStyle: function getTableRowStyle() {}
};
var _default = DataTable;
exports.default = _default;
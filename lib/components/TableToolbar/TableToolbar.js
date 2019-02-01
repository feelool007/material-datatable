"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@material-ui/core");

var _icons = require("@material-ui/icons");

var _CSVDownload = _interopRequireDefault(require("../CSVDownload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toolbarStyles = function toolbarStyles(theme) {
  return {
    root: {
      backgroundColor: "white",
      paddingRight: theme.spacing.unit * 3,
      borderBottom: "1px solid #e0e0e0"
    },
    flex: {
      flex: 1
    },
    search: {
      width: 300
    },
    reset: {
      fontSize: 20,
      color: "rgb(205, 205, 205)",
      cursor: "pointer",
      "&:hover": {
        color: "#ef5350"
      }
    },
    columnMenu: {
      minWidth: 220,
      height: 260,
      padding: theme.spacing.unit * 1
    },
    leftIcon: {
      marginRight: theme.spacing.unit * 1
    },
    rightIcon: {
      marginLeft: theme.spacing.unit * 1
    },
    toolButton: {
      marginRight: theme.spacing.unit * 1
    }
  };
};

var _TableToolbar = function (_Component) {
  _inherits(_TableToolbar, _Component);

  function _TableToolbar(props) {
    var _this;

    _classCallCheck(this, _TableToolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_TableToolbar).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleToggleColumnMenu", function () {
      _this.setState(function (prevState) {
        return {
          open: !prevState.open
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "render", function () {
      var _this$props = _this.props,
          data = _this$props.data,
          searchable = _this$props.searchable,
          searchValue = _this$props.searchValue,
          onSearch = _this$props.onSearch,
          onResetSearch = _this$props.onResetSearch,
          filterble = _this$props.filterble,
          filters = _this$props.filters,
          onFilter = _this$props.onFilter,
          csv = _this$props.csv,
          csvFilename = _this$props.csvFilename,
          csvHeaders = _this$props.csvHeaders,
          classes = _this$props.classes;
      var open = _this.state.open;
      return _react.default.createElement(_core.Toolbar, {
        className: classes.root
      }, _react.default.createElement("div", {
        className: classes.flex
      }, searchable && _react.default.createElement(_core.Input, {
        value: searchValue,
        placeholder: "\u641C\u5C0B...",
        onChange: onSearch,
        endAdornment: _react.default.createElement(_icons.Close, {
          className: classes.reset,
          onClick: onResetSearch
        }),
        className: classes.search
      })), csv && _react.default.createElement(_CSVDownload.default, {
        data: data,
        filename: csvFilename,
        headers: csvHeaders,
        color: "default",
        variant: "outlined",
        className: classes.toolButton
      }, _react.default.createElement(_core.Grid, {
        container: true,
        alignItems: "center"
      }, "\u532F\u51FACSV", _react.default.createElement(_icons.CloudDownload, {
        className: classes.rightIcon
      }))), filterble && _react.default.createElement("div", null, _react.default.createElement(_core.Button, {
        size: "small",
        variant: "outlined",
        color: "default",
        id: "view-column",
        buttonRef: _this.__ref,
        onClick: _this.handleToggleColumnMenu
      }, _react.default.createElement(_core.Grid, {
        container: true,
        alignItems: "center"
      }, "\u9078\u64C7\u6B04\u4F4D", _react.default.createElement(_icons.ViewColumn, {
        className: classes.rightIcon
      }))), _react.default.createElement(_core.Popover, {
        open: open,
        anchorEl: _this.__ref.current,
        anchorOrigin: {
          vertical: 48,
          horizontal: "right"
        },
        onClose: _this.handleToggleColumnMenu,
        classes: {
          paper: classes.columnMenu
        }
      }, _react.default.createElement(_core.FormGroup, null, Object.keys(filters).map(function (k, index) {
        var column = filters[k];
        return _react.default.createElement(_core.FormControlLabel, {
          key: index,
          label: column.label,
          control: _react.default.createElement(_core.Checkbox, {
            name: k,
            checked: column.visible,
            color: "primary",
            onChange: onFilter
          })
        });
      })))));
    });

    _this.state = {
      open: false
    };
    _this.__ref = _react.default.createRef();
    return _this;
  }

  return _TableToolbar;
}(_react.Component);

var TableToolbar = (0, _core.withStyles)(toolbarStyles)(_TableToolbar);
TableToolbar.propTypes = {
  data: _propTypes.default.array,
  searchable: _propTypes.default.bool,
  searchValue: _propTypes.default.string,
  filterble: _propTypes.default.bool,
  filters: _propTypes.default.object,
  csv: _propTypes.default.bool,
  csvHeaders: _propTypes.default.array,
  csvFilename: _propTypes.default.string,
  onSearch: _propTypes.default.func,
  onResetSearch: _propTypes.default.func,
  onFilter: _propTypes.default.func
};
TableToolbar.defaultProps = {
  searchable: true,
  filterble: false,
  csv: false,
  csvFilename: "export.csv",
  onSearch: function onSearch() {},
  onResetSearch: function onResetSearch() {},
  onFilter: function onFilter() {}
};
var _default = TableToolbar;
exports.default = _default;
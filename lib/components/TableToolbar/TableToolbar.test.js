"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _testUtils = require("@material-ui/core/test-utils");

var _core = require("@material-ui/core");

var _TableToolbar = _interopRequireDefault(require("./TableToolbar"));

var _CSVDownload = _interopRequireDefault(require("../CSVDownload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_enzyme.default.configure({
  adapter: new _enzymeAdapterReact.default()
});

var shallow = (0, _testUtils.createShallow)({
  dive: true
});
var wrapper = (0, _testUtils.createShallow)()(_react.default.createElement("div", null));
var props;
var unsortedData = [{
  column1: "A",
  column2: "B",
  column3: "3",
  column4: "C",
  column5: "4"
}, {
  column1: "B",
  column2: "C",
  column3: "1",
  column4: "C",
  column5: "6"
}, {
  column1: "T",
  column2: "N",
  column3: "2",
  column4: "D",
  column5: "1"
}, {
  column1: "G",
  column2: "M",
  column3: "6",
  column4: "D",
  column5: "3"
}, {
  column1: "H",
  column2: "O",
  column3: "7",
  column4: "F",
  column5: "8"
}, {
  column1: "A",
  column2: "S",
  column3: "4",
  column4: "E",
  column5: "9"
}];
var headers = [{
  label: "label1",
  column: "column1"
}, {
  label: "label2",
  column: "column2"
}, {
  label: "label3",
  column: "column3"
}, {
  label: "label4",
  column: "column4"
}, {
  label: "label5",
  column: "column5"
}];
describe("TableToolbar UI Test", function () {
  describe("search test", function () {
    var onSearch;
    var onResetSearch;
    beforeEach(function () {
      onSearch = jest.fn();
      onResetSearch = jest.fn();
      props = {
        data: unsortedData,
        searchable: true,
        searchValue: "",
        onSearch: onSearch,
        onResetSearch: onResetSearch
      };
      wrapper = shallow(_react.default.createElement(_TableToolbar.default, props));
    });
    it("Component snapshot", function () {
      expect(wrapper).toMatchSnapshot();
    });
    it("should invoke onSearch when change value", function () {
      wrapper.find(_core.Input).simulate("change", {
        target: {
          name: "foo",
          value: "bar"
        }
      });
      expect(onSearch).toHaveBeenCalledWith({
        target: {
          name: "foo",
          value: "bar"
        }
      });
    });
    it("should contain Input when searchable is true", function () {
      wrapper.setProps({
        searchable: true
      });
      wrapper.update();
      expect(wrapper.find(_core.Input)).toHaveLength(1);
    });
    it("should not contain Input when searchable is false", function () {
      wrapper.setProps({
        searchable: false
      });
      wrapper.update();
      expect(wrapper.find(_core.Input)).toHaveLength(0);
    });
  });
  describe("filters test", function () {
    var onFilter;
    beforeEach(function () {
      onFilter = jest.fn();
      props = {
        data: unsortedData,
        filterble: true,
        filters: {
          column1: {
            label: "label1",
            visible: true
          },
          column2: {
            label: "label2",
            visible: true
          }
        },
        onFilter: onFilter
      };
      wrapper = shallow(_react.default.createElement(_TableToolbar.default, props));
    });
    it("Component snapshot", function () {
      expect(wrapper).toMatchSnapshot();
    });
    it("should contain 2 FormControlLabel", function () {
      expect(wrapper.find(_core.FormControlLabel)).toHaveLength(2);
    });
    it("should set state.open to true when click #view-column", function () {
      wrapper.find("#view-column").simulate("click");
      expect(wrapper.state("open")).toBeTruthy();
    });
    it("should set state.open to false when close popover", function () {
      wrapper.setState({
        open: true
      });
      wrapper.find(_core.Popover).simulate("close");
      expect(wrapper.state("open")).toBeFalsy();
    });
    it("should contain #view-column when filterble is true", function () {
      wrapper.setProps({
        filterble: true
      });
      wrapper.update();
      expect(wrapper.find("#view-column")).toHaveLength(1);
    });
    it("should not contain #view-column when filterble is not true", function () {
      wrapper.setProps({
        filterble: false
      });
      wrapper.update();
      expect(wrapper.find("#view-column")).toHaveLength(0);
    });
  });
  describe("csv test", function () {
    var csvHeaders = headers.map(function (d) {
      return _objectSpread({}, d, {
        key: d.column
      });
    });
    beforeEach(function () {
      props = {
        data: unsortedData,
        csv: true,
        csvFilename: "export.csv",
        csvHeaders: csvHeaders
      };
      wrapper = shallow(_react.default.createElement(_TableToolbar.default, props));
    });
    it("Component snapshot", function () {
      expect(wrapper).toMatchSnapshot();
    });
    it("should contain 1 CSVDownload when csv is true", function () {
      wrapper.setProps({
        csv: true
      });
      wrapper.update();
      expect(wrapper.find(_CSVDownload.default)).toHaveLength(1);
    });
    it("should not contain CSVDownload when csv is false", function () {
      wrapper.setProps({
        csv: false
      });
      wrapper.update();
      expect(wrapper.find(_CSVDownload.default)).toHaveLength(0);
    });
  });
});
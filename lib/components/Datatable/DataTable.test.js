"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = _interopRequireDefault(require("enzyme"));

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _testUtils = require("@material-ui/core/test-utils");

var _core = require("@material-ui/core");

var _DataTable = _interopRequireDefault(require("./DataTable"));

var _TableToolbar = _interopRequireDefault(require("../TableToolbar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var actionHeaders = ["action 1", "action 2", "action 3"];
describe("DataTable UI Test", function () {
  var data;
  var handleSelect;
  beforeEach(function () {
    data = [].concat(unsortedData);
  });
  describe("With action pass in", function () {
    beforeEach(function () {
      props = {
        headers: headers,
        actionHeaders: actionHeaders,
        data: data,
        rowsPerPageOpts: [10, 25, 50],
        sort: false
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props, _react.default.createElement(_core.Button, null, "button 1"), _react.default.createElement(_core.Button, null, "button 2"), _react.default.createElement(_core.Button, null, "button 3")));
    });
    it("Component snapshot", function () {
      expect(wrapper).toMatchSnapshot();
    });
    it("should contain 5 + 3 <TabelCell /> in table head", function () {
      var tHead = wrapper.find(_core.TableHead);
      expect(tHead.find(_core.TableCell).length).toBe(8);
    });
    it("<TableHead /> should match headers", function () {
      var tHead = wrapper.find(_core.TableHead);
      expect([tHead.find(_core.TableCell).at(0).children().children().text(), tHead.find(_core.TableCell).at(1).children().children().text(), tHead.find(_core.TableCell).at(2).children().children().text(), tHead.find(_core.TableCell).at(3).children().children().text(), tHead.find(_core.TableCell).at(4).children().children().text(), tHead.find(_core.TableCell).at(5).children().text(), tHead.find(_core.TableCell).at(6).children().text(), tHead.find(_core.TableCell).at(7).children().text()]).toEqual(["label1", "label2", "label3", "label4", "label5", "action 1", "action 2", "action 3"]);
    });
    it("should contain 6 <TableRow /> in table body", function () {
      var tBody = wrapper.find(_core.TableBody);
      expect(tBody.find(_core.TableRow).length).toBe(6);
    });
    it("should contain 5 + 3 <TableCell /> in each row of table body", function () {
      var tBody = wrapper.find(_core.TableBody);
      expect([tBody.find(_core.TableRow).at(0).find(_core.TableCell).length, tBody.find(_core.TableRow).at(1).find(_core.TableCell).length, tBody.find(_core.TableRow).at(2).find(_core.TableCell).length, tBody.find(_core.TableRow).at(3).find(_core.TableCell).length, tBody.find(_core.TableRow).at(4).find(_core.TableCell).length, tBody.find(_core.TableRow).at(5).find(_core.TableCell).length]).toEqual([8, 8, 8, 8, 8, 8]);
    });
    it("Actions component should match its own props", function () {
      var tBody = wrapper.find(_core.TableBody);
      var Action1 = tBody.find(_core.TableCell).at(5).children();
      var Action2 = tBody.find(_core.TableCell).at(7).children();
      expect([Action1.props(), Action2.props()]).toEqual([{
        children: Action1.props().children,
        index: 0,
        data: {
          column1: "A",
          column2: "B",
          column3: "3",
          column4: "C",
          column5: "4",
          dataIX: 0
        }
      }, {
        children: Action2.props().children,
        index: 0,
        data: {
          column1: "A",
          column2: "B",
          column3: "3",
          column4: "C",
          column5: "4",
          dataIX: 0
        }
      }]);
    });
  });
  describe("Without action pass in", function () {
    beforeEach(function () {
      props = {
        headers: headers,
        data: data,
        rowsPerPageOpts: [10, 25, 50],
        sort: false
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props));
    });
    it("Component snapshot", function () {
      expect(wrapper).toMatchSnapshot();
    });
    it("should contain 5 <TableCell /> in table head", function () {
      var tHead = wrapper.find(_core.TableHead);
      expect(tHead.find(_core.TableCell).length).toBe(5);
    });
    it("should contain 5 <TableCell /> in each row of table body", function () {
      var tBody = wrapper.find(_core.TableBody);
      expect([tBody.find(_core.TableRow).at(0).find(_core.TableCell).length, tBody.find(_core.TableRow).at(1).find(_core.TableCell).length, tBody.find(_core.TableRow).at(2).find(_core.TableCell).length, tBody.find(_core.TableRow).at(3).find(_core.TableCell).length, tBody.find(_core.TableRow).at(4).find(_core.TableCell).length, tBody.find(_core.TableRow).at(5).find(_core.TableCell).length]).toEqual([5, 5, 5, 5, 5, 5]);
    });
  });
  describe("Pagination Test", function () {
    beforeEach(function () {
      props = {
        headers: headers,
        data: data,
        rowsPerPageOpts: [5, 10, 25],
        sort: false
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props));
    });
    it("should contain 1 <TablePagination />", function () {
      expect(wrapper.find(_core.TablePagination)).toHaveLength(1);
    });
    it("labelDisplayedRows should be '第1 - 5筆，共6筆'", function () {
      var label = wrapper.instance().getLabelDisplayedRows({
        from: 1,
        to: 5,
        count: 6
      });
      expect(label).toBe("第1 - 5筆，共6筆");
    });
    it("labelRowsPerPage should be '每頁顯示：'", function () {
      var pagination = wrapper.find(_core.TablePagination);
      expect(pagination.prop("labelRowsPerPage")).toBe("每頁顯示：");
    });
    it("should change page when invoke handleChangePage", function () {
      wrapper.instance().handleChangePage({}, 1);
      expect(wrapper.state("page")).toBe(1);
    });
    it("should change rows per page when invoke handleChangeRowsPerPage", function () {
      wrapper.instance().handleChangeRowsPerPage({
        target: {
          value: 25
        }
      });
      expect(wrapper.state("rowsPerPage")).toBe(25);
    });
    it("should match data at per page", function () {
      wrapper.setState({
        rowsPerPage: 5
      });
      wrapper.update();
      var instance = wrapper.instance();
      var dataPage1 = instance.data;
      instance.handleChangePage({}, 1);
      wrapper.update();
      var dataPage2 = instance.data;
      expect([dataPage1, dataPage2]).toEqual([[{
        column1: "A",
        column2: "B",
        column3: "3",
        column4: "C",
        column5: "4",
        dataIX: 0
      }, {
        column1: "B",
        column2: "C",
        column3: "1",
        column4: "C",
        column5: "6",
        dataIX: 1
      }, {
        column1: "T",
        column2: "N",
        column3: "2",
        column4: "D",
        column5: "1",
        dataIX: 2
      }, {
        column1: "G",
        column2: "M",
        column3: "6",
        column4: "D",
        column5: "3",
        dataIX: 3
      }, {
        column1: "H",
        column2: "O",
        column3: "7",
        column4: "F",
        column5: "8",
        dataIX: 4
      }], [{
        column1: "A",
        column2: "S",
        column3: "4",
        column4: "E",
        column5: "9",
        dataIX: 5
      }]]);
    });
  });
  describe("Sort Test", function () {
    beforeEach(function () {
      props = {
        headers: headers,
        data: data,
        rowsPerPageOpts: [10, 25, 50]
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props));
    });
    it("should contain 5 <TableSortLabel />", function () {
      expect(wrapper.find(_core.TableSortLabel)).toHaveLength(5);
    });
    it("should invoke handleChangeSort when click <TableSortLabel />", function () {
      var instance = wrapper.instance();
      var spy = jest.spyOn(instance, "handleChangeSort");
      wrapper.find(_core.TableSortLabel).at(0).simulate("click");
      expect(spy).toHaveBeenCalledWith("column1");
    });
    it("should change sortBy only when click on other column", function () {
      wrapper.setState({
        sortBy: "column1",
        sortDirection: "desc"
      });
      wrapper.find(_core.TableSortLabel).at(2).simulate("click");
      expect([wrapper.state("sortBy"), wrapper.state("sortDirection")]).toEqual(["column3", "desc"]);
    });
    it("should change sortDirection only when click on the same column", function () {
      wrapper.setState({
        sortBy: "column1",
        sortDirection: "desc"
      });
      wrapper.find(_core.TableSortLabel).at(0).simulate("click");
      expect([wrapper.state("sortBy"), wrapper.state("sortDirection")]).toEqual(["column1", "asc"]);
    });
    it("should match data when sort asc", function () {
      wrapper.setState({
        sortBy: "column3",
        sortDirection: "asc"
      });
      wrapper.update();
      var instance = wrapper.instance();
      expect(instance.data).toEqual([{
        column1: "B",
        column2: "C",
        column3: "1",
        column4: "C",
        column5: "6",
        dataIX: 1
      }, {
        column1: "T",
        column2: "N",
        column3: "2",
        column4: "D",
        column5: "1",
        dataIX: 2
      }, {
        column1: "A",
        column2: "B",
        column3: "3",
        column4: "C",
        column5: "4",
        dataIX: 0
      }, {
        column1: "A",
        column2: "S",
        column3: "4",
        column4: "E",
        column5: "9",
        dataIX: 5
      }, {
        column1: "G",
        column2: "M",
        column3: "6",
        column4: "D",
        column5: "3",
        dataIX: 3
      }, {
        column1: "H",
        column2: "O",
        column3: "7",
        column4: "F",
        column5: "8",
        dataIX: 4
      }]);
    });
    it("should match data when sort desc", function () {
      wrapper.setState({
        sortBy: "column3",
        sortDirection: "desc"
      });
      wrapper.update();
      var instance = wrapper.instance();
      expect(instance.data).toEqual([{
        column1: "H",
        column2: "O",
        column3: "7",
        column4: "F",
        column5: "8",
        dataIX: 4
      }, {
        column1: "G",
        column2: "M",
        column3: "6",
        column4: "D",
        column5: "3",
        dataIX: 3
      }, {
        column1: "A",
        column2: "S",
        column3: "4",
        column4: "E",
        column5: "9",
        dataIX: 5
      }, {
        column1: "A",
        column2: "B",
        column3: "3",
        column4: "C",
        column5: "4",
        dataIX: 0
      }, {
        column1: "T",
        column2: "N",
        column3: "2",
        column4: "D",
        column5: "1",
        dataIX: 2
      }, {
        column1: "B",
        column2: "C",
        column3: "1",
        column4: "C",
        column5: "6",
        dataIX: 1
      }]);
    });
  });
  describe("Select Test", function () {
    beforeEach(function () {
      handleSelect = jest.fn();
      props = {
        headers: headers,
        data: data,
        sort: false,
        select: true,
        selectBy: "column3",
        onSelect: handleSelect
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props));
    });
    it("Component snapshot", function () {
      expect(wrapper).toMatchSnapshot();
    });
    it("should select item if check checkbox", function () {
      var tBody = wrapper.find(_core.TableBody);
      tBody.find(_core.Checkbox).at(0).simulate("change");
      expect(wrapper.state("selected")).toEqual(["3"]);
    });
    it("should unselect item if uncheck checkbox", function () {
      var tBody = wrapper.find(_core.TableBody);
      wrapper.setState({
        selected: ["3"]
      }, function () {
        wrapper.update();
        tBody.find(_core.Checkbox).at(0).simulate("change");
        expect(wrapper.state("selected")).toEqual([]);
      });
    });
    it("checkbox at head should not be checked if all items have not been selected", function () {
      var tHead = wrapper.find(_core.TableHead);
      wrapper.setState({
        selected: ["3", "1", "2", "6", "7"]
      }, function () {
        wrapper.update();
        expect(tHead.find(_core.Checkbox).props().checked).toBe(false);
      });
    });
    it("checkbox at head should be checked if all items have been selected", function () {
      wrapper.setState({
        selected: ["3", "1", "2", "6", "7", "4"]
      }, function () {
        wrapper.update();
        var tHead = wrapper.find(_core.TableHead);
        var checkbox = tHead.find(_core.Checkbox);
        expect(checkbox.props().checked).toBeTruthy();
      });
    });
    it("checkbox at body should be checked if item have been slected", function () {
      wrapper.setState({
        selected: ["3"]
      }, function () {
        wrapper.update();
        var tBody = wrapper.find(_core.TableBody);
        var checkbox = tBody.find(_core.Checkbox).at(0);
        expect(checkbox.props().checked).toBeTruthy();
      });
    });
    it("should select all items if check the checkbox at head", function () {
      var tHead = wrapper.find(_core.TableHead);
      tHead.find(_core.Checkbox).simulate("change");
      expect(wrapper.state("selected").sort()).toEqual(["3", "1", "2", "6", "7", "4"].sort());
    });
    it("should unselect all items if uncheck the checkbox at head", function () {
      var tHead = wrapper.find(_core.TableHead);
      wrapper.setState({
        selected: ["3", "1", "2", "6", "7", "4"]
      }, function () {
        wrapper.update();
        tHead.find(_core.Checkbox).simulate("change");
        expect(wrapper.state("selected")).toEqual([]);
      });
    });
    it("should invoke handleSelect when check/uncheck checkbox at body", function () {
      var tBody = wrapper.find(_core.TableBody);
      tBody.find(_core.Checkbox).at(0).simulate("change");
      expect(handleSelect).toHaveBeenCalledWith(["3"]);
    });
    it("should invoke handleSelect when check/uncheck checkbox at head", function () {
      var tHead = wrapper.find(_core.TableHead);
      tHead.find(_core.Checkbox).simulate("change");
      expect(handleSelect).toHaveBeenCalledWith(wrapper.state("selected"));
    });
  });
  describe("Pick Test", function () {
    var handlePick = jest.fn();
    var classes = (0, _testUtils.getClasses)(_react.default.createElement(_DataTable.default, props));
    beforeEach(function () {
      props = {
        data: data,
        headers: headers,
        sort: false,
        pick: true,
        pickBy: "column3",
        onPick: handlePick
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props));
    });
    it("Component snapshot", function () {
      expect(wrapper).toMatchSnapshot();
    });
    it("should pick item if click any row", function () {
      wrapper.find(_core.TableBody).find(_core.TableRow).at(2).simulate("click");
      wrapper.update();
      var tBody = wrapper.find(_core.TableBody);
      var row = tBody.find(_core.TableRow).at(2);
      expect(row.hasClass(classes.picked)).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });
    it("could only pick one item each time", function () {
      wrapper.find(_core.TableBody).find(_core.TableRow).at(1).simulate("click");
      wrapper.find(_core.TableBody).find(_core.TableRow).at(2).simulate("click");
      wrapper.update();
      var tBody = wrapper.find(_core.TableBody);
      var row1 = tBody.find(_core.TableRow).at(1);
      var row2 = tBody.find(_core.TableRow).at(2);
      expect([row1.hasClass(classes.picked), row2.hasClass(classes.picked)]).toEqual([false, true]);
    });
    it("should unpick item if the clicked row has been picked", function () {
      wrapper.find(_core.TableBody).find(_core.TableRow).at(2).simulate("click");
      wrapper.update();
      wrapper.find(_core.TableBody).find(_core.TableRow).at(2).simulate("click");
      wrapper.update();
      var tBody = wrapper.find(_core.TableBody);
      var row = tBody.find(_core.TableRow).at(2);
      expect(row.hasClass(classes.picked)).toBeFalsy();
    });
    it("should invoke handlePick when pick/unpick item", function () {
      var tBody = wrapper.find(_core.TableBody);
      var row = tBody.find(_core.TableRow).at(2);
      row.simulate("click");
      expect(handlePick).toHaveBeenCalledWith("2");
    });
  });
  describe("Search Test", function () {
    beforeEach(function () {
      props = {
        data: data,
        headers: headers,
        sort: false,
        toolbar: true,
        searchable: true
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props));
    });
    it("Component snapshot", function () {
      expect(wrapper).toMatchSnapshot();
    });
    it("should return all data when state.search is empty", function () {
      wrapper.setState({
        search: ""
      });
      wrapper.update();
      expect(wrapper.instance().data).toEqual([{
        column1: "A",
        column2: "B",
        column3: "3",
        column4: "C",
        column5: "4",
        dataIX: 0
      }, {
        column1: "B",
        column2: "C",
        column3: "1",
        column4: "C",
        column5: "6",
        dataIX: 1
      }, {
        column1: "T",
        column2: "N",
        column3: "2",
        column4: "D",
        column5: "1",
        dataIX: 2
      }, {
        column1: "G",
        column2: "M",
        column3: "6",
        column4: "D",
        column5: "3",
        dataIX: 3
      }, {
        column1: "H",
        column2: "O",
        column3: "7",
        column4: "F",
        column5: "8",
        dataIX: 4
      }, {
        column1: "A",
        column2: "S",
        column3: "4",
        column4: "E",
        column5: "9",
        dataIX: 5
      }]);
    });
    it("should return filted data when state.search isn't empty", function () {
      wrapper.setState({
        search: "B"
      });
      wrapper.update();
      expect(wrapper.instance().data).toEqual([{
        column1: "A",
        column2: "B",
        column3: "3",
        column4: "C",
        column5: "4",
        dataIX: 0
      }, {
        column1: "B",
        column2: "C",
        column3: "1",
        column4: "C",
        column5: "6",
        dataIX: 1
      }]);
    });
  });
  describe("filter test", function () {
    beforeEach(function () {
      props = {
        data: data,
        headers: headers,
        sort: false,
        toolbar: true,
        searchable: true
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props));
    });
    it("should change filters correctly", function () {
      var spy = jest.spyOn(wrapper.instance(), "handleChangeFilter");
      spy({
        target: {
          name: "column2"
        }
      }, false);
      expect(wrapper.state("filters")).toEqual({
        column1: {
          label: "label1",
          visible: true
        },
        column2: {
          label: "label2",
          visible: false
        },
        column3: {
          label: "label3",
          visible: true
        },
        column4: {
          label: "label4",
          visible: true
        },
        column5: {
          label: "label5",
          visible: true
        }
      });
    });
  });
  describe("csv test", function () {
    beforeEach(function () {
      props = {
        data: data,
        headers: headers,
        sort: false,
        toolbar: true,
        csv: true
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props));
    });
    it("should use headers as csvHeaders if csvHeaders is undefined", function () {
      expect(wrapper.find(_TableToolbar.default).prop("csvHeaders")).toEqual([{
        label: "label1",
        key: "column1",
        column: "column1"
      }, {
        label: "label2",
        key: "column2",
        column: "column2"
      }, {
        label: "label3",
        key: "column3",
        column: "column3"
      }, {
        label: "label4",
        key: "column4",
        column: "column4"
      }, {
        label: "label5",
        key: "column5",
        column: "column5"
      }]);
    });
    it("should use csvHeaders if csvHeaders is defined", function () {
      props = {
        data: data,
        headers: headers,
        sort: false,
        toolbar: true,
        csv: true,
        csvHeaders: [{
          label: "label1",
          key: "column1",
          column: "column1"
        }, {
          label: "label2",
          key: "column2",
          column: "column2"
        }, {
          label: "label5",
          key: "column5",
          column: "column5"
        }]
      };
      wrapper = shallow(_react.default.createElement(_DataTable.default, props));
      expect(wrapper.find(_TableToolbar.default).prop("csvHeaders")).toEqual([{
        label: "label1",
        key: "column1",
        column: "column1"
      }, {
        label: "label2",
        key: "column2",
        column: "column2"
      }, {
        label: "label5",
        key: "column5",
        column: "column5"
      }]);
    });
  });
});
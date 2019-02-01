import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createShallow, getClasses } from "@material-ui/core/test-utils";
import {
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableSortLabel,
  TablePagination,
  Button,
  Checkbox
} from "@material-ui/core";

import DataTable from "./DataTable";
import TableToolbar from "../TableToolbar";

Enzyme.configure({ adapter: new Adapter() });

let shallow = createShallow({ dive: true });
let wrapper = createShallow()(<div />);
let props;

const unsortedData = [
  { column1: "A", column2: "B", column3: "3", column4: "C", column5: "4" },
  { column1: "B", column2: "C", column3: "1", column4: "C", column5: "6" },
  { column1: "T", column2: "N", column3: "2", column4: "D", column5: "1" },
  { column1: "G", column2: "M", column3: "6", column4: "D", column5: "3" },
  { column1: "H", column2: "O", column3: "7", column4: "F", column5: "8" },
  { column1: "A", column2: "S", column3: "4", column4: "E", column5: "9" }
];
const headers = [
  { label: "label1", column: "column1" },
  { label: "label2", column: "column2" },
  { label: "label3", column: "column3" },
  { label: "label4", column: "column4" },
  { label: "label5", column: "column5" }
];
const actionHeaders = ["action 1", "action 2", "action 3"];

describe("DataTable UI Test", () => {
  let data;
  let handleSelect;

  beforeEach(() => {
    // deepcopy unsortedData before every test, or the data will be sorted.
    data = [...unsortedData];
  });

  describe("With action pass in", () => {
    beforeEach(() => {
      props = {
        headers,
        actionHeaders,
        data,
        rowsPerPageOpts: [10, 25, 50],
        sort: false
      };
      wrapper = shallow(
        <DataTable {...props}>
          <Button>button 1</Button>
          <Button>button 2</Button>
          <Button>button 3</Button>
        </DataTable>
      );
    });

    it("Component snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should contain 5 + 3 <TabelCell /> in table head", () => {
      const tHead = wrapper.find(TableHead);
      expect(tHead.find(TableCell).length).toBe(8);
    });

    it("<TableHead /> should match headers", () => {
      const tHead = wrapper.find(TableHead);
      expect([
        tHead
          .find(TableCell)
          .at(0)
          .children()
          .children()
          .text(),
        tHead
          .find(TableCell)
          .at(1)
          .children()
          .children()
          .text(),
        tHead
          .find(TableCell)
          .at(2)
          .children()
          .children()
          .text(),
        tHead
          .find(TableCell)
          .at(3)
          .children()
          .children()
          .text(),
        tHead
          .find(TableCell)
          .at(4)
          .children()
          .children()
          .text(),
        tHead
          .find(TableCell)
          .at(5)
          .children()
          .text(),
        tHead
          .find(TableCell)
          .at(6)
          .children()
          .text(),
        tHead
          .find(TableCell)
          .at(7)
          .children()
          .text()
      ]).toEqual(["label1", "label2", "label3", "label4", "label5", "action 1", "action 2", "action 3"]);
    });

    it("should contain 6 <TableRow /> in table body", () => {
      const tBody = wrapper.find(TableBody);
      expect(tBody.find(TableRow).length).toBe(6);
    });

    it("should contain 5 + 3 <TableCell /> in each row of table body", () => {
      const tBody = wrapper.find(TableBody);
      expect([
        tBody
          .find(TableRow)
          .at(0)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(1)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(2)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(3)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(4)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(5)
          .find(TableCell).length
      ]).toEqual([8, 8, 8, 8, 8, 8]);
    });

    it("Actions component should match its own props", () => {
      const tBody = wrapper.find(TableBody);
      const Action1 = tBody
        .find(TableCell)
        .at(5)
        .children();
      const Action2 = tBody
        .find(TableCell)
        .at(7)
        .children();
      expect([Action1.props(), Action2.props()]).toEqual([
        {
          children: Action1.props().children,
          index: 0,
          data: { column1: "A", column2: "B", column3: "3", column4: "C", column5: "4", dataIX: 0 }
        },
        {
          children: Action2.props().children,
          index: 0,
          data: { column1: "A", column2: "B", column3: "3", column4: "C", column5: "4", dataIX: 0 }
        }
      ]);
    });
  });

  describe("Without action pass in", () => {
    beforeEach(() => {
      props = {
        headers,
        data,
        rowsPerPageOpts: [10, 25, 50],
        sort: false
      };
      wrapper = shallow(<DataTable {...props} />);
    });

    it("Component snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should contain 5 <TableCell /> in table head", () => {
      const tHead = wrapper.find(TableHead);
      expect(tHead.find(TableCell).length).toBe(5);
    });

    it("should contain 5 <TableCell /> in each row of table body", () => {
      const tBody = wrapper.find(TableBody);
      expect([
        tBody
          .find(TableRow)
          .at(0)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(1)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(2)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(3)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(4)
          .find(TableCell).length,
        tBody
          .find(TableRow)
          .at(5)
          .find(TableCell).length
      ]).toEqual([5, 5, 5, 5, 5, 5]);
    });
  });

  describe("Pagination Test", () => {
    beforeEach(() => {
      props = {
        headers,
        data,
        rowsPerPageOpts: [5, 10, 25],
        sort: false
      };
      wrapper = shallow(<DataTable {...props} />);
    });

    it("should contain 1 <TablePagination />", () => {
      expect(wrapper.find(TablePagination)).toHaveLength(1);
    });

    it("labelDisplayedRows should be '第1 - 5筆，共6筆'", () => {
      const label = wrapper.instance().getLabelDisplayedRows({ from: 1, to: 5, count: 6 });
      expect(label).toBe("第1 - 5筆，共6筆");
    });

    it("labelRowsPerPage should be '每頁顯示：'", () => {
      const pagination = wrapper.find(TablePagination);
      expect(pagination.prop("labelRowsPerPage")).toBe("每頁顯示：");
    });

    it("should change page when invoke handleChangePage", () => {
      wrapper.instance().handleChangePage({}, 1);
      expect(wrapper.state("page")).toBe(1);
    });

    it("should change rows per page when invoke handleChangeRowsPerPage", () => {
      wrapper.instance().handleChangeRowsPerPage({ target: { value: 25 } });
      expect(wrapper.state("rowsPerPage")).toBe(25);
    });

    it("should match data at per page", () => {
      wrapper.setState({ rowsPerPage: 5 });
      wrapper.update();
      const instance = wrapper.instance();
      const dataPage1 = instance.data;
      instance.handleChangePage({}, 1);
      wrapper.update();
      const dataPage2 = instance.data;
      expect([dataPage1, dataPage2]).toEqual([
        [
          { column1: "A", column2: "B", column3: "3", column4: "C", column5: "4", dataIX: 0 },
          { column1: "B", column2: "C", column3: "1", column4: "C", column5: "6", dataIX: 1 },
          { column1: "T", column2: "N", column3: "2", column4: "D", column5: "1", dataIX: 2 },
          { column1: "G", column2: "M", column3: "6", column4: "D", column5: "3", dataIX: 3 },
          { column1: "H", column2: "O", column3: "7", column4: "F", column5: "8", dataIX: 4 }
        ],
        [{ column1: "A", column2: "S", column3: "4", column4: "E", column5: "9", dataIX: 5 }]
      ]);
    });
  });

  describe("Sort Test", () => {
    beforeEach(() => {
      props = {
        headers,
        data,
        rowsPerPageOpts: [10, 25, 50]
      };
      wrapper = shallow(<DataTable {...props} />);
    });

    it("should contain 5 <TableSortLabel />", () => {
      expect(wrapper.find(TableSortLabel)).toHaveLength(5);
    });

    it("should invoke handleChangeSort when click <TableSortLabel />", () => {
      const instance = wrapper.instance();
      const spy = jest.spyOn(instance, "handleChangeSort");
      wrapper
        .find(TableSortLabel)
        .at(0)
        .simulate("click");
      expect(spy).toHaveBeenCalledWith("column1");
    });

    it("should change sortBy only when click on other column", () => {
      wrapper.setState({ sortBy: "column1", sortDirection: "desc" });
      wrapper
        .find(TableSortLabel)
        .at(2)
        .simulate("click");
      expect([wrapper.state("sortBy"), wrapper.state("sortDirection")]).toEqual(["column3", "desc"]);
    });

    it("should change sortDirection only when click on the same column", () => {
      wrapper.setState({ sortBy: "column1", sortDirection: "desc" });
      wrapper
        .find(TableSortLabel)
        .at(0)
        .simulate("click");
      expect([wrapper.state("sortBy"), wrapper.state("sortDirection")]).toEqual(["column1", "asc"]);
    });

    it("should match data when sort asc", () => {
      wrapper.setState({ sortBy: "column3", sortDirection: "asc" });
      wrapper.update();
      const instance = wrapper.instance();
      expect(instance.data).toEqual([
        { column1: "B", column2: "C", column3: "1", column4: "C", column5: "6", dataIX: 1 },
        { column1: "T", column2: "N", column3: "2", column4: "D", column5: "1", dataIX: 2 },
        { column1: "A", column2: "B", column3: "3", column4: "C", column5: "4", dataIX: 0 },
        { column1: "A", column2: "S", column3: "4", column4: "E", column5: "9", dataIX: 5 },
        { column1: "G", column2: "M", column3: "6", column4: "D", column5: "3", dataIX: 3 },
        { column1: "H", column2: "O", column3: "7", column4: "F", column5: "8", dataIX: 4 }
      ]);
    });

    it("should match data when sort desc", () => {
      wrapper.setState({ sortBy: "column3", sortDirection: "desc" });
      wrapper.update();
      const instance = wrapper.instance();
      expect(instance.data).toEqual([
        { column1: "H", column2: "O", column3: "7", column4: "F", column5: "8", dataIX: 4 },
        { column1: "G", column2: "M", column3: "6", column4: "D", column5: "3", dataIX: 3 },
        { column1: "A", column2: "S", column3: "4", column4: "E", column5: "9", dataIX: 5 },
        { column1: "A", column2: "B", column3: "3", column4: "C", column5: "4", dataIX: 0 },
        { column1: "T", column2: "N", column3: "2", column4: "D", column5: "1", dataIX: 2 },
        { column1: "B", column2: "C", column3: "1", column4: "C", column5: "6", dataIX: 1 }
      ]);
    });
  });

  describe("Select Test", () => {
    beforeEach(() => {
      handleSelect = jest.fn();
      props = {
        headers,
        data,
        sort: false,
        select: true,
        selectBy: "column3",
        onSelect: handleSelect
      };
      wrapper = shallow(<DataTable {...props} />);
    });

    it("Component snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should select item if check checkbox", () => {
      const tBody = wrapper.find(TableBody);
      tBody
        .find(Checkbox)
        .at(0)
        .simulate("change");
      expect(wrapper.state("selected")).toEqual(["3"]);
    });

    it("should unselect item if uncheck checkbox", () => {
      const tBody = wrapper.find(TableBody);
      wrapper.setState({ selected: ["3"] }, () => {
        wrapper.update();
        tBody
          .find(Checkbox)
          .at(0)
          .simulate("change");
        expect(wrapper.state("selected")).toEqual([]);
      });
    });

    it("checkbox at head should not be checked if all items have not been selected", () => {
      const tHead = wrapper.find(TableHead);
      wrapper.setState({ selected: ["3", "1", "2", "6", "7"] }, () => {
        wrapper.update();
        expect(tHead.find(Checkbox).props().checked).toBe(false);
      });
    });

    it("checkbox at head should be checked if all items have been selected", () => {
      wrapper.setState({ selected: ["3", "1", "2", "6", "7", "4"] }, () => {
        wrapper.update();
        const tHead = wrapper.find(TableHead);
        const checkbox = tHead.find(Checkbox);
        expect(checkbox.props().checked).toBeTruthy();
      });
    });

    it("checkbox at body should be checked if item have been slected", () => {
      wrapper.setState({ selected: ["3"] }, () => {
        wrapper.update();
        const tBody = wrapper.find(TableBody);
        const checkbox = tBody.find(Checkbox).at(0);
        expect(checkbox.props().checked).toBeTruthy();
      });
    });

    it("should select all items if check the checkbox at head", () => {
      const tHead = wrapper.find(TableHead);
      tHead.find(Checkbox).simulate("change");
      expect(wrapper.state("selected").sort()).toEqual(["3", "1", "2", "6", "7", "4"].sort());
    });

    it("should unselect all items if uncheck the checkbox at head", () => {
      const tHead = wrapper.find(TableHead);
      wrapper.setState({ selected: ["3", "1", "2", "6", "7", "4"] }, () => {
        wrapper.update();
        tHead.find(Checkbox).simulate("change");
        expect(wrapper.state("selected")).toEqual([]);
      });
    });

    it("should invoke handleSelect when check/uncheck checkbox at body", () => {
      const tBody = wrapper.find(TableBody);
      tBody
        .find(Checkbox)
        .at(0)
        .simulate("change");
      expect(handleSelect).toHaveBeenCalledWith(["3"]);
    });

    it("should invoke handleSelect when check/uncheck checkbox at head", () => {
      const tHead = wrapper.find(TableHead);
      tHead.find(Checkbox).simulate("change");
      expect(handleSelect).toHaveBeenCalledWith(wrapper.state("selected"));
    });
  });

  describe("Pick Test", () => {
    let handlePick = jest.fn();
    let classes = getClasses(<DataTable {...props} />);

    beforeEach(() => {
      props = {
        data,
        headers,
        sort: false,
        pick: true,
        pickBy: "column3",
        onPick: handlePick
      };
      wrapper = shallow(<DataTable {...props} />);
    });

    it("Component snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    // TODO: FIXED BUG
    it("should pick item if click any row", () => {
      wrapper
        .find(TableBody)
        .find(TableRow)
        .at(2)
        .simulate("click");
      wrapper.update();
      const tBody = wrapper.find(TableBody);
      const row = tBody.find(TableRow).at(2);
      expect(row.hasClass(classes.picked)).toBeTruthy();
      expect(wrapper).toMatchSnapshot();
    });

    it("could only pick one item each time", () => {
      wrapper
        .find(TableBody)
        .find(TableRow)
        .at(1)
        .simulate("click");
      wrapper
        .find(TableBody)
        .find(TableRow)
        .at(2)
        .simulate("click");
      wrapper.update();
      const tBody = wrapper.find(TableBody);
      const row1 = tBody.find(TableRow).at(1);
      const row2 = tBody.find(TableRow).at(2);
      expect([row1.hasClass(classes.picked), row2.hasClass(classes.picked)]).toEqual([false, true]);
    });

    it("should unpick item if the clicked row has been picked", () => {
      // first click to pick.
      wrapper
        .find(TableBody)
        .find(TableRow)
        .at(2)
        .simulate("click");
      wrapper.update();
      // second pick to unpick.
      wrapper
        .find(TableBody)
        .find(TableRow)
        .at(2)
        .simulate("click");
      wrapper.update();
      const tBody = wrapper.find(TableBody);
      const row = tBody.find(TableRow).at(2);
      expect(row.hasClass(classes.picked)).toBeFalsy();
    });

    it("should invoke handlePick when pick/unpick item", () => {
      const tBody = wrapper.find(TableBody);
      const row = tBody.find(TableRow).at(2);
      row.simulate("click");
      expect(handlePick).toHaveBeenCalledWith("2");
    });
  });

  describe("Search Test", () => {
    beforeEach(() => {
      props = {
        data,
        headers,
        sort: false,
        toolbar: true,
        searchable: true
      };
      wrapper = shallow(<DataTable {...props} />);
    });

    it("Component snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should return all data when state.search is empty", () => {
      wrapper.setState({ search: "" });
      wrapper.update();
      expect(wrapper.instance().data).toEqual([
        { column1: "A", column2: "B", column3: "3", column4: "C", column5: "4", dataIX: 0 },
        { column1: "B", column2: "C", column3: "1", column4: "C", column5: "6", dataIX: 1 },
        { column1: "T", column2: "N", column3: "2", column4: "D", column5: "1", dataIX: 2 },
        { column1: "G", column2: "M", column3: "6", column4: "D", column5: "3", dataIX: 3 },
        { column1: "H", column2: "O", column3: "7", column4: "F", column5: "8", dataIX: 4 },
        { column1: "A", column2: "S", column3: "4", column4: "E", column5: "9", dataIX: 5 }
      ]);
    });

    it("should return filted data when state.search isn't empty", () => {
      wrapper.setState({ search: "B" });
      wrapper.update();
      expect(wrapper.instance().data).toEqual([
        { column1: "A", column2: "B", column3: "3", column4: "C", column5: "4", dataIX: 0 },
        { column1: "B", column2: "C", column3: "1", column4: "C", column5: "6", dataIX: 1 }
      ]);
    });
  });

  describe("filter test", () => {
    beforeEach(() => {
      props = {
        data,
        headers,
        sort: false,
        toolbar: true,
        searchable: true
      };
      wrapper = shallow(<DataTable {...props} />);
    });

    it("should change filters correctly", () => {
      const spy = jest.spyOn(wrapper.instance(), "handleChangeFilter");
      spy({ target: { name: "column2" } }, false);
      expect(wrapper.state("filters")).toEqual({
        column1: { label: "label1", visible: true },
        column2: { label: "label2", visible: false },
        column3: { label: "label3", visible: true },
        column4: { label: "label4", visible: true },
        column5: { label: "label5", visible: true }
      });
    });
  });

  describe("csv test", () => {
    beforeEach(() => {
      props = {
        data,
        headers,
        sort: false,
        toolbar: true,
        csv: true
      };
      wrapper = shallow(<DataTable {...props} />);
    });

    it("should use headers as csvHeaders if csvHeaders is undefined", () => {
      expect(wrapper.find(TableToolbar).prop("csvHeaders")).toEqual([
        { label: "label1", key: "column1", column: "column1" },
        { label: "label2", key: "column2", column: "column2" },
        { label: "label3", key: "column3", column: "column3" },
        { label: "label4", key: "column4", column: "column4" },
        { label: "label5", key: "column5", column: "column5" }
      ]);
    });

    it("should use csvHeaders if csvHeaders is defined", () => {
      props = {
        data,
        headers,
        sort: false,
        toolbar: true,
        csv: true,
        csvHeaders: [
          { label: "label1", key: "column1", column: "column1" },
          { label: "label2", key: "column2", column: "column2" },
          { label: "label5", key: "column5", column: "column5" }
        ]
      };
      wrapper = shallow(<DataTable {...props} />);
      expect(wrapper.find(TableToolbar).prop("csvHeaders")).toEqual([
        { label: "label1", key: "column1", column: "column1" },
        { label: "label2", key: "column2", column: "column2" },
        { label: "label5", key: "column5", column: "column5" }
      ]);
    });
  });
});

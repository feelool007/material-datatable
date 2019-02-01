import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { createShallow } from "@material-ui/core/test-utils";
import { Input, Popover, FormControlLabel } from "@material-ui/core";

import TableToolbar from "./TableToolbar";
import CSVDownload from "../CSVDownload";

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

describe("TableToolbar UI Test", () => {
  describe("search test", () => {
    let onSearch;
    let onResetSearch;

    beforeEach(() => {
      onSearch = jest.fn();
      onResetSearch = jest.fn();
      props = {
        data: unsortedData,
        searchable: true,
        searchValue: "",
        onSearch,
        onResetSearch
      };
      wrapper = shallow(<TableToolbar {...props} />);
    });

    it("Component snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should invoke onSearch when change value", () => {
      wrapper.find(Input).simulate("change", { target: { name: "foo", value: "bar" } });
      expect(onSearch).toHaveBeenCalledWith({ target: { name: "foo", value: "bar" } });
    });

    it("should contain Input when searchable is true", () => {
      wrapper.setProps({ searchable: true });
      wrapper.update();
      expect(wrapper.find(Input)).toHaveLength(1);
    });

    it("should not contain Input when searchable is false", () => {
      wrapper.setProps({ searchable: false });
      wrapper.update();
      expect(wrapper.find(Input)).toHaveLength(0);
    });
  });

  describe("filters test", () => {
    let onFilter;

    beforeEach(() => {
      onFilter = jest.fn();
      props = {
        data: unsortedData,
        filterble: true,
        filters: {
          column1: { label: "label1", visible: true },
          column2: { label: "label2", visible: true }
        },
        onFilter
      };
      wrapper = shallow(<TableToolbar {...props} />);
    });

    it("Component snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should contain 2 FormControlLabel", () => {
      expect(wrapper.find(FormControlLabel)).toHaveLength(2);
    });

    it("should set state.open to true when click #view-column", () => {
      wrapper.find("#view-column").simulate("click");
      expect(wrapper.state("open")).toBeTruthy();
    });

    it("should set state.open to false when close popover", () => {
      wrapper.setState({ open: true });
      wrapper.find(Popover).simulate("close");
      expect(wrapper.state("open")).toBeFalsy();
    });

    it("should contain #view-column when filterble is true", () => {
      wrapper.setProps({ filterble: true });
      wrapper.update();
      expect(wrapper.find("#view-column")).toHaveLength(1);
    });

    it("should not contain #view-column when filterble is not true", () => {
      wrapper.setProps({ filterble: false });
      wrapper.update();
      expect(wrapper.find("#view-column")).toHaveLength(0);
    });
  });

  describe("csv test", () => {
    let csvHeaders = headers.map(d => ({
      ...d,
      key: d.column
    }));

    beforeEach(() => {
      props = {
        data: unsortedData,
        csv: true,
        csvFilename: "export.csv",
        csvHeaders
      };
      wrapper = shallow(<TableToolbar {...props} />);
    });

    it("Component snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should contain 1 CSVDownload when csv is true", () => {
      wrapper.setProps({ csv: true });
      wrapper.update();
      expect(wrapper.find(CSVDownload)).toHaveLength(1);
    });

    it("should not contain CSVDownload when csv is false", () => {
      wrapper.setProps({ csv: false });
      wrapper.update();
      expect(wrapper.find(CSVDownload)).toHaveLength(0);
    });
  });
});

import { TableToolbarProps, RowData } from "../TableToolbar";

export interface Header {
  label: string;
  column: string;
}

export interface TBodyCellProps {
  column: string;
  columnIndex: number;
  value: string | number;
}

export interface TableComponents {
  TBodyCell: React.ComponentType<TBodyCellProps>
}

export interface DataTableProps extends TableToolbarProps {
  headers: Header[];
  data: RowData[];
  sort: boolean;
  hover: boolean;
  defaultSortDirection: "asc" | "desc";
  defaultSortBy: string;
  select: boolean;
  selectBy: string;
  pick: boolean;
  pickBy: string;
  toolbar: boolean;
  rowsPerPageOpts: number[];
  actionHeaders: string[];
  minWidth: number;
  components: TableComponents;
  onSelect: (selected: string[] | number[]) => void;
  onPick: (picked: string | number) => void;
  getTableRowStyle: (d: RowData, index: number) => React.CSSProperties;
}

declare const DataTable: React.ComponentType<DataTableProps>;

export default DataTable;

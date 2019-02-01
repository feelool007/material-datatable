export interface Filters {
  label: string;
  visible: boolean;
}

export interface CSVHeader {
  label: string;
  key: string;
  column: string;
}

export interface RowData {
  [key: string]: number | string;
}

export interface TableToolbarProps {
  data: RowData[];
  searchable?: boolean;
  searchValue?: string;
  filterble?: boolean;
  filters?: {
    [key: string]: Filters
  };
  csv?: boolean;
  csvHeaders?: CSVHeader[];
  csvFilename?: string;
  onSearch?: React.ChangeEventHandler<HTMLInputElement>;
  onResetSearch?: React.ReactEventHandler<{}>;
  onFilter?: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

declare const TableToolbar: React.ComponentType<TableToolbarProps>;

export default TableToolbar;

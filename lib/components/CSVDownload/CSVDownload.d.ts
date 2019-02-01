import { ButtonProps } from "@material-ui/core/button";

export interface CSVDownloadProps extends ButtonProps {
  filename: string;
  data: any[];
  headers: { label: string; key: string; column: string }[];
}

declare const CSVDownload: React.ComponentType<CSVDownloadProps>;

export default CSVDownload;

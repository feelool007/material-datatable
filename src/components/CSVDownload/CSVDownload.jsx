import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { CSVLink } from "react-csv";
import PropTypes from "prop-types";

class CSVDownload extends Component {
  constructor(props) {
    super(props);
    this.csvDownloadRef = React.createRef();
  }

  handleDownloadClick = () => {
    let object = this.csvDownloadRef.current;
    object.link.click();
  };

  render() {
    let { filename, data, headers, children, ...rest } = this.props;
    return (
      <div>
        {/* uFEFF是將utf8加入BOM讓EXCEL打開正常 */}
        <CSVLink uFEFF filename={filename} headers={headers} ref={this.csvDownloadRef} data={data} />
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={this.handleDownloadClick}
          {...rest}
        >
          {children}
        </Button>
      </div>
    );
  }
}

CSVDownload.propTypes = {
  filename: PropTypes.string,
  data: PropTypes.array,
  headers: PropTypes.array
};

CSVDownload.defaultProps = {
  data: [],
  text: "CSV"
};

export default CSVDownload;

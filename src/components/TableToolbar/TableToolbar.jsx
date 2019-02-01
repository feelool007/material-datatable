import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Checkbox,
  Input,
  Toolbar,
  Popover,
  Button,
  FormGroup,
  FormControlLabel,
  Grid
} from "@material-ui/core";
import { Close, ViewColumn, CloudDownload } from "@material-ui/icons";
import CSVDownload from "../CSVDownload";

const toolbarStyles = theme => ({
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
});

class _TableToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.__ref = React.createRef();
  }

  handleToggleColumnMenu = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };

  render = () => {
    const {
      data,
      searchable,
      searchValue,
      onSearch,
      onResetSearch,
      filterble,
      filters,
      onFilter,
      csv,
      csvFilename,
      csvHeaders,
      classes
    } = this.props;
    const { open } = this.state;
    return (
      <Toolbar className={classes.root}>
        <div className={classes.flex}>
          {searchable && (
            <Input
              value={searchValue}
              placeholder="搜尋..."
              onChange={onSearch}
              endAdornment={<Close className={classes.reset} onClick={onResetSearch} />}
              className={classes.search}
            />
          )}
        </div>
        {csv && (
          <CSVDownload
            data={data}
            filename={csvFilename}
            headers={csvHeaders}
            color="default"
            variant="outlined"
            className={classes.toolButton}
          >
            <Grid container alignItems="center">
              匯出CSV
              <CloudDownload className={classes.rightIcon} />
            </Grid>
          </CSVDownload>
        )}
        {filterble && (
          <div>
            <Button
              size="small"
              variant="outlined"
              color="default"
              id="view-column"
              buttonRef={this.__ref}
              onClick={this.handleToggleColumnMenu}
            >
              <Grid container alignItems="center">
                選擇欄位
                <ViewColumn className={classes.rightIcon} />
              </Grid>
            </Button>
            <Popover
              open={open}
              anchorEl={this.__ref.current}
              anchorOrigin={{ vertical: 48, horizontal: "right" }}
              onClose={this.handleToggleColumnMenu}
              classes={{ paper: classes.columnMenu }}
            >
              <FormGroup>
                {Object.keys(filters).map((k, index) => {
                  const column = filters[k];
                  return (
                    <FormControlLabel
                      key={index}
                      label={column.label}
                      control={<Checkbox name={k} checked={column.visible} color="primary" onChange={onFilter} />}
                    />
                  );
                })}
              </FormGroup>
            </Popover>
          </div>
        )}
      </Toolbar>
    );
  };
}
const TableToolbar = withStyles(toolbarStyles)(_TableToolbar);

TableToolbar.propTypes = {
  data: PropTypes.array,
  searchable: PropTypes.bool,
  searchValue: PropTypes.string,
  filterble: PropTypes.bool,
  filters: PropTypes.object,
  csv: PropTypes.bool,
  csvHeaders: PropTypes.array,
  csvFilename: PropTypes.string,
  onSearch: PropTypes.func,
  onResetSearch: PropTypes.func,
  onFilter: PropTypes.func
};
TableToolbar.defaultProps = {
  searchable: true,
  filterble: false,
  csv: false,
  csvFilename: "export.csv",
  onSearch: () => {},
  onResetSearch: () => {},
  onFilter: () => {}
};

export default TableToolbar;

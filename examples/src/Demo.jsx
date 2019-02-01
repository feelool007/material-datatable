import React from "react";
import { IconButton } from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

import { DataTable } from "../../src";
import sampleData from "./sampleData";

const DeleteAction = props => {
  return (
    <IconButton onClick={() => alert("You click on id = " + props.data.id)}>
      <DeleteForever />
    </IconButton>
  );
};

export default class extends React.Component {
  headers = [
    { label: "id", column: "id" },
    { label: "first_name", column: "first_name" },
    { label: "last_name", column: "last_name" },
    { label: "email", column: "email" },
    { label: "gender", column: "gender" },
    { label: "ip_address", column: "ip_address" }
  ];

  render = () => {
    return (
      <DataTable toolbar searchable filterble csv headers={this.headers} data={sampleData}>
        <DeleteAction />
      </DataTable>
    );
  };
}

import React from "react";
import { Typography } from "@material-ui/core";
import { PageContext } from "./App";

export const APP_NAME = "The eCommerce App by Kit-t"

export function AppName() {
  const { setPage } = React.useContext(PageContext);
  return (
    <Typography className="app-bar-title" component="h1" variant="h5" style={{cursor: "pointer"}} onClick={() => setPage("home")}>
      {APP_NAME}
    </Typography>
  );
}

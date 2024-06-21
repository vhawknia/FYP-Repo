import React from "react";
import { Helmet } from "react-helmet";

const ElectionManagerAppLayout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="./ElectionManagerApp.css" />
      </Helmet>
      {children}
    </>
  );
};

export default ElectionManagerAppLayout;

import React from "react";
import { Helmet } from "react-helmet";

const VoterAppLayout = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" type="text/css" href="./VoterApp.css" />
      </Helmet>
      {children}
    </>
  );
};

export default VoterAppLayout;

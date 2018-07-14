/**
 *
 * ErrorPage
 *
 */

import React from "react";
import { ErrorMessage, BackDrop } from "./styles";

function ErrorPage() {
  return (
    <BackDrop>
      <ErrorMessage>Something went wrong!</ErrorMessage>
    </BackDrop>
  );
}

ErrorPage.propTypes = {};

export default ErrorPage;

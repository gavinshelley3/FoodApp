import { Button, Card, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function SearchResult(props) {
  const result = props.result;
  const description = props.description;

  console.log("description: ", description);
  return (
    <Card>
      <div>
        <Button>{description}</Button>
      </div>
    </Card>
  );
}

export default SearchResult;

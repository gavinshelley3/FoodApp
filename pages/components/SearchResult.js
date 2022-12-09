import { Button, Card, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function SearchResult(props) {
  const result = props.result;
  const description = props.description;
  const key = props.key;

  console.log("description: ", description);
  return (
    <Card>
      <div className={key}>
        <Button key={key}>{description}</Button>
      </div>
    </Card>
  );
}

export default SearchResult;

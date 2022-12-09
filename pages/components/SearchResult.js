import { Button, Card, Typography } from "@mui/material";
import { useState, useEffect } from "react";

function SearchResult(props) {
  const result = props.result;
  const description = props.description;

  console.log("description: ", description);
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "10px",
        margin: "10px",
      }}
    >
      <div>
        <Button>{description}</Button>
      </div>
    </Card>
  );
}

export default SearchResult;

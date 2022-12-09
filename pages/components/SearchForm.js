// Render Prop
import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import crypto from "crypto";

const SearchForm = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
    console.log("name: ", event.target.value);
    setSearchResults([]);
    searchByName(event.target.value);
  };

  const searchByName = async (name) => {
    setSearchResults([]);
    console.log("searchByName");
    console.log("name: ", name);
    await fetch("/api/products/name/" + name)
      .then((response) => response.json())
      .then((json) => {
        console.log("json: ", json);

        let newSearchResults = [];

        if (json.foods.length === 0) {
          for (let i = 0; i < 5; i++) {
            let key = crypto.randomBytes(16).toString("hex");
            let result = { description: " ... ", key: key };
            //
            newSearchResults.push(result);
          }
        } else {
          for (let i = 0; i < 5; i++) {
            let key = crypto.randomBytes(16).toString("hex");
            json.foods[i].key = key;
            newSearchResults.push(json.foods[i]);
          }
        }
        console.log("searchResults: ", newSearchResults);
        setSearchResults(newSearchResults);
      });
  };

  const syncResults = async (name) => {};

  useEffect(() => {
    // searchByName();
  }, []);

  return (
    <div>
      <FormControl
        margin="normal"
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "10px",
        }}
      >
        <FormHelperText
          id="my-helper-text"
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
          Search for a product by name or ID.
        </FormHelperText>
        <TextField
          id="my-input"
          label="Search"
          variant="outlined"
          autoComplete="off"
          onChange={handleChange}
          sx={{ width: "50%", height: "100%", marginBottom: "3px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton aria-label="search"></IconButton>
              </InputAdornment>
            ),
          }}
        />
        {searchResults.map((result) => (
          <div
            key={result.key}
            style={{
              width: "50%",
            }}
          >
            <SearchResult
              key={result.key}
              result={result}
              description={result.description}
            />
          </div>
        ))}
      </FormControl>
    </div>
  );
};

export default SearchForm;

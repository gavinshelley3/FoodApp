// Render Prop
import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
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
      <FormControl margin="normal" autoComplete="off">
        <TextField
          id="my-input"
          label="Search"
          variant="standard"
          onChange={handleChange}
        />
        <FormHelperText id="my-helper-text">
          Search for a product by name or ID.
        </FormHelperText>
        {searchResults.map((result) => (
          <div key={result.key}>
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

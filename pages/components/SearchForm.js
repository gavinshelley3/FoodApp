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

const SearchForm = () => {
  const searchResults = [];
  const [name, setName] = useState(" ");

  const handleChange = async (event) => {
    setName(event.target.value);
    await searchByName();
  };

  const searchByName = async () => {
    console.log("searchByName");
    console.log("name: ", name);
    await fetch("/api/products/name/" + name)
      .then((response) => response.json())
      .then((json) => {
        console.log("json: ", json);
        if (json.foods.length === 0) {
          for (let i = 0; i < 5; i++) {
            let result = {};
            searchResults.push(" ... ");
          }
        } else {
          for (let i = 0; i < 5; i++) {
            searchResults.push(json.foods[i]);
          }
        }
      });
  };

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
        {searchResults.map((result) => (
          <SearchResult />
        ))}
        <Button variant="text" onClick={searchByName}>
          Search
        </Button>
        <FormHelperText id="my-helper-text">
          Search for a product by name or ID.
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default SearchForm;

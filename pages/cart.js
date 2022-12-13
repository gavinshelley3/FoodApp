import { Button } from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import SearchForm from "./components/SearchForm";

export default function Cart() {
  const searchByID = async () => {
    console.log("searchByID");
    await fetch("/api/products/id/172928")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
      });
  };

  const searchByName = async () => {
    console.log("searchByName");
    await fetch("/api/products/name/cheese")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
      });
  };

  return (
    <>
      <h1>Search for foods found in the USDA database</h1>
      <h2>
        <SearchForm></SearchForm>
        <Button>
          <Link href="/">Back to home</Link>
        </Button>
      </h2>
      <footer className={styles.footer}>
        <a
          href="https://github.com/gavinshelley3/FoodApp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Repo
        </a>
      </footer>
    </>
  );
}

import Link from "next/link";
import { useState, useEffect } from "react";
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
      <h1>Cart</h1>
      <h2>
        <Link href="/">Back to home</Link>
        <SearchForm></SearchForm>
        <button onClick={searchByID}>CLICK</button>
        <button onClick={searchByName}>CLICK</button>
      </h2>
    </>
  );
}

import React from "react";
import { Create } from "./CRUD/Create";
import { Delete } from "./CRUD/Delete";
import { Read } from "./CRUD/Read";
import { Update } from "./CRUD/Update";

export const Home = () => {
  return (
    <div>
      <h1>Create</h1>
        <Create />
      <h1>Read</h1>
        <Read />
      <h1>Update</h1>
        <Update />
      <h1>Delete</h1>
        <Delete />
    </div>
  );
};

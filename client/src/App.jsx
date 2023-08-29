import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./pages/Table";
import AddRes from "./pages/AddRes";
import EditRes from "./pages/EditRes";

const Context = React.createContext();

function App() {
  const [editId, setEditId] = useState(null);

  return (
    <Context.Provider value={{ editId, setEditId }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/add" element={<AddRes />} />
          <Route path="/edit" element={<EditRes />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export { Context };

export default App;

import React from "react";
import s from "./Header.module.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className={s.main}>
      <div className={s.container}>
        <h3>Education Cards</h3>
        <Button variant="contained" color="secondary" size="small">
          <NavLink to="/login">Login</NavLink>
        </Button>
      </div>
    </div>
  );
};

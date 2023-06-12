import React from "react";
import s from "./Header.module.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export const Header = () => {
  const auth = useAppSelector((state) => state.app.auth);
  return (
    <div className={s.main}>
      <div className={s.container}>
        <h3>Education Cards</h3>
        {auth ? (
          <Button variant="text" color="secondary">
            <NavLink to="/profile" className={s.name}>Tania</NavLink>
          </Button>
        ) : (
          <Button variant="contained" color="secondary" size="small">
            <NavLink to="/login" className={s.link}>Sing in</NavLink>
          </Button>
        )}
      </div>
    </div>
  );
};

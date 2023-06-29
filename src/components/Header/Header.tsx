import React from "react";
import s from "./Header.module.css";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import ava from 'assets/IMG_20230424_174148.jpg'

export const Header = () => {
  const auth = useAppSelector((state) => state.app.auth);
  const name = useAppSelector((state) => state.auth.profile.name);
  return (
    <div className={s.main}>
      <div className={s.container}>
        <h3>Education Cards</h3>
        {auth ? (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Button
              variant="text"
              color="secondary"
              style={{ textTransform: "none" }}
            >
              <NavLink to="/rtk-cards/profile" className={s.name}>
                {name}
              </NavLink>
            </Button>
            <img src={ava} alt="#" style={{width: '35px', borderRadius: '50%'}}/>
          </div>
        ) : (
          <Button variant="contained" color="secondary" size="small">
            <NavLink to="/rtk-cards/login" className={s.link}>
              Sing in
            </NavLink>
          </Button>
        )}
      </div>
    </div>
  );
};

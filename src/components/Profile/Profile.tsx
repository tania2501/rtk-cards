import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";
import ava from "../../assets/IMG_20230424_174148.jpg";
import s from "./Profile.module.css";
import { authThunks } from "../Auth/SingUp/auth.slice";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.app.auth);
  const name = useAppSelector((state) => state.auth.profile.name);
  const email = useAppSelector((state) => state.auth.profile.email)
  if (!auth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={s.main}>
      <h3>Personal information</h3>
      <div className={s.ava} >
        <img src={ava} alt="#"/>
      </div>
      <p>{name}</p>
      <p>{email}</p>
      <button onClick={()=>dispatch(authThunks.logOut())}>Log Out</button>
    </div>
  );
};

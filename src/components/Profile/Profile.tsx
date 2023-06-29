import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navigate } from "react-router-dom";
import ava from "assets/IMG_20230424_174148.jpg";
import s from "./Profile.module.css";
import { authThunks } from "../Auth/SingUp/auth.slice";
import edit from "assets/edit-5-32.png";
import save from 'assets/check-mark-3-32.png'

export const Profile = () => {
  const userName = useAppSelector((state) => state.auth.profile.name);
  const email = useAppSelector((state) => state.auth.profile.email);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(userName)
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.app.auth);
  if (!auth) {
    return <Navigate to="/rtk-cards/login" />;
  }
  const changeName = () => {
    dispatch(authThunks.changeName({name}))
    setEditMode(false)
  };
  return (
    <div className={s.main}>
      <h3>Personal information</h3>
      <div className={s.ava}>
        <img src={ava} alt="#" />
      </div>
      {editMode ? (
        <div className={s.name}>
          <input value={userName} onChange={(e)=>setName(e.currentTarget.value)}></input>
          <button><img src={save} alt="#" onClick={changeName}/></button>
        </div>
        
      ) : (
        <div className={s.name}>
          <p>{userName}</p>
          <button>
            <img src={edit} alt="#" onClick={() => setEditMode(true)} />
          </button>
        </div>
      )}
      <p style={{margin: '20px 0px'}}>{email}</p>
      <button
        className={s.logout}
        onClick={() => dispatch(authThunks.logOut())}
      >
        Log Out
      </button>
    </div>
  );
};

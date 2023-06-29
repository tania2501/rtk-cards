import React from 'react';
import mail from 'assets/mail.png'
import { useAppSelector } from 'app/hooks';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import s from './CheckMail.module.css';

export const CheckMail = () => {
  const email = useAppSelector(state=>state.auth.email);
  return (
    <div className={s.main}>
      <h3>Check Email</h3>
      <div><img src={mail} alt="#"/></div>
      <p className={s.text}>We’ve sent an Email with instructions to {email}</p>
      <Button variant="contained" color="secondary" fullWidth className={s.button}><NavLink to={'/rtk-cards/login'}>Back to login</NavLink></Button>
    </div>
  )
}
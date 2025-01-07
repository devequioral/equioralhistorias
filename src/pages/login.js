import React from 'react';
import LoginComponent from '@/components/dashboard/LoginComponent';
import Metaheader from '@/components/Metaheader';
import style from '@/styles/LoginScreen.module.css';
import Image from 'next/image';

export default function LoginScreen() {
  return (
    <>
      <Metaheader />
      <div className={`${style.LoginScreen}`}>
        <div className={`${style.bg}`}>
          <Image
            src="/assets/images/bg-login.jpg?v=0.1"
            width={952}
            height={627}
            alt=""
          />
        </div>
        <LoginComponent
          options={{
            logo: {
              src: '/assets/images/logo.png',
              width: 175,
              height: 89,
              alt: 'Logo',
            },
          }}
        />
      </div>
    </>
  );
}

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
            src="/assets/images/bg-login.jpg"
            width={1920}
            height={1280}
            alt=""
          />
        </div>
        <LoginComponent
          options={{
            logo: {
              src: '/assets/images/logo.svg',
              width: 268,
              height: 63,
              alt: 'Logo',
            },
          }}
        />
      </div>
    </>
  );
}

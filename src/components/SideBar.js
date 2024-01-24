import React from 'react';
import styles from '@/styles/SideBar.module.css';
import MainNavigation from './MainNavigation';

export default function SideBar() {
  return (
    <div
      className={`${styles.SideBar} ${styles.light} hide-xss hide-xs hide-sm`}
    >
      <MainNavigation />
    </div>
  );
}

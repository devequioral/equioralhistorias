import React from 'react';
import styles from '@/styles/SideBar.module.css';
import MainNavigation from '@/components/MainNavigation';

export default function SideBar({ onShowNewNotification, onShowCalendar }) {
  return (
    <div
      className={`${styles.SideBar} ${styles.light} hide-xss hide-xs hide-sm`}
    >
      <MainNavigation
        onShowNewNotification={onShowNewNotification}
        onShowCalendar={onShowCalendar}
      />
    </div>
  );
}

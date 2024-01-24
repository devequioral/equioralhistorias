import React from 'react';
import TopBar from '@/components/TopBar';
import SideBar from '@/components/SideBar';

import styles from '@/styles/Layout.module.css';

import { useSession } from 'next-auth/react';

export default function Layout({
  children,
  theme,
  toogleTheme,
  sidebarCollapsed = false,
}) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <div className={`${styles.LayoutWrapper} ${styles[theme]}`}>
        <TopBar theme={theme} user={user} />
        <div className={`${styles.centerWrapper}`}>
          <SideBar theme={theme} />
          <div className={`${styles.body}`}>{children}</div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import TopBar from '@/components/TopBar';
import SideBar from '@/components/SideBar';

import styles from '@/styles/Layout.module.css';

import { useSession } from 'next-auth/react';
import NewNotificationModal from './dashboard/NewNotificationModal/NewNotificationModal';

export default function Layout({
  children,
  theme,
  toogleTheme,
  sidebarCollapsed = false,
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const [showModalNewNotification, setShowModalNewNotification] = useState(0);

  const onShowNewNotification = (count) => {
    setShowModalNewNotification(count);
  };

  return (
    <>
      <div className={`${styles.LayoutWrapper} ${styles[theme]}`}>
        <TopBar theme={theme} user={user} />
        <div className={`${styles.centerWrapper}`}>
          <SideBar
            theme={theme}
            onShowNewNotification={onShowNewNotification}
          />
          <div className={`${styles.body}`}>{children}</div>
        </div>
        <NewNotificationModal show={showModalNewNotification} />
      </div>
    </>
  );
}

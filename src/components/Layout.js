import React, { useState } from 'react';
import TopBar from '@/components/TopBar';
import SideBar from '@/components/SideBar';

import styles from '@/styles/Layout.module.css';

import { useSession } from 'next-auth/react';
import NewNotificationModal from './dashboard/NewNotificationModal/NewNotificationModal';
import CalendarView from './dashboard/Calendar/CalendarView';

export default function Layout({
  children,
  theme,
  toogleTheme,
  sidebarCollapsed = false,
}) {
  const { data: session } = useSession();
  const user = session?.user;
  const [showModalNewNotification, setShowModalNewNotification] = useState(0);
  const [showModalCalendar, setShowModalCalendar] = useState(0);

  const onShowNewNotification = (count) => {
    setShowModalNewNotification(count);
  };

  const onShowCalendar = (count) => {
    setShowModalCalendar(count);
  };

  return (
    <>
      <div className={`${styles.LayoutWrapper} ${styles[theme]}`}>
        <TopBar theme={theme} user={user} />
        <div className={`${styles.centerWrapper}`}>
          <SideBar
            theme={theme}
            onShowNewNotification={onShowNewNotification}
            onShowCalendar={onShowCalendar}
          />
          <div className={`${styles.body}`}>{children}</div>
        </div>
        <NewNotificationModal show={showModalNewNotification} />
        <CalendarView show={showModalCalendar} />
      </div>
    </>
  );
}

import React from 'react';
import TopBarv2 from '@/components/TopBarv2';
import SideBar from '@/components/SideBar';

import styles from '@/styles/Layout.module.css';

export default function Layout({
  children,
  theme,
  toogleTheme,
  sidebarCollapsed = false,
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(!sidebarCollapsed);
  const TopBarClick = (ev) => {
    if (ev === 'toggle-sidebar') setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className={`${styles.LayoutWrapper} ${styles[theme]}`}>
        <TopBarv2
          onClickEvent={TopBarClick}
          theme={theme}
          toogleTheme={toogleTheme}
          sidebarExpanded={!sidebarCollapsed}
        />
        <div className={`${styles.centerWrapper}`}>
          <SideBar open={sidebarOpen} theme={theme} />
          <div className={`${styles.body}`}>{children}</div>
        </div>
      </div>
    </>
  );
}

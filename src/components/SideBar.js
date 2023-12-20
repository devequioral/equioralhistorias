import styles from '@/styles/SideBar.module.css';
import React from 'react';
import SideBarItemMenu from './SideBarItemMenu';
import Image from 'next/image';

export default function SideBar({ open, theme }) {
  const [expanded, setExpanded] = React.useState(false);
  const onClickMenu = (elem) => {
    const menu = elem.target.dataset.menu;
    console.log(menu, elem.target);
  };
  const onToggleMenu = (elem) => {
    if (elem.target.className !== styles.itemMenu) return;
    setExpanded(!expanded);
  };
  return (
    <>
      <div
        className={`${styles.SideBar} ${open === false && styles.collapse} ${
          styles[theme]
        }`}
      >
        <ul className={`${styles.list}`}>
          <li>
            <SideBarItemMenu
              path="/dashboard"
              icon={{
                src: `/assets/images/theme-${theme}/icon-home.svg`,
                width: 24,
                height: 24,
              }}
              label="Inicio"
              showLabel={open}
              theme={theme}
            ></SideBarItemMenu>
          </li>

          <li>
            <SideBarItemMenu
              path="/dashboard/orders"
              icon={{
                src: `/assets/images/theme-${theme}/icon-orders.svg`,
                width: 24,
                height: 24,
              }}
              label="Ordenes"
              showLabel={open}
              theme={theme}
            >
              <li data-path="/app/categories/categoria-01">
                <Image
                  src={`/assets/images/theme-${theme}/icon-status-light.svg`}
                  width={24}
                  height={24}
                  alt=""
                />
                Pendientes
              </li>
              <li data-path="/app/categories/categoria-02">
                <Image
                  src={`/assets/images/theme-${theme}/icon-status-medium.svg`}
                  width={24}
                  height={24}
                  alt=""
                />
                Procesadas
              </li>
              <li data-path="/app/categories/categoria-03">
                <Image
                  src={`/assets/images/theme-${theme}/icon-status-dark.svg`}
                  width={24}
                  height={24}
                  alt=""
                />
                Completadas
              </li>
            </SideBarItemMenu>
          </li>

          <li>
            <SideBarItemMenu
              path="/close-session"
              icon={{
                src: `/assets/images/theme-${theme}/icon-exit.svg`,
                width: 24,
                height: 24,
              }}
              label="Salir"
              showLabel={open}
              theme={theme}
            ></SideBarItemMenu>
          </li>
        </ul>
      </div>
    </>
  );
}

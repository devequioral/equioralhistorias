import styles from '@/styles/SideBar.module.css';
import React from 'react';
import SideBarItemMenu from './SideBarItemMenu';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function SideBar({ open, theme }) {
  const [expanded, setExpanded] = React.useState(false);
  // const onClickMenu = (elem) => {
  //   const menu = elem.target.dataset.menu;
  //   console.log(menu, elem.target);
  // };
  // const onToggleMenu = (elem) => {
  //   if (elem.target.className !== styles.itemMenu) return;
  //   setExpanded(!expanded);
  // };

  const { data: session } = useSession();
  const user = session?.user;
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
              label="Cotizaciones"
              showLabel={open}
              theme={theme}
            >
              <li data-path="/dashboard/orders/new">
                <Image
                  src={`/assets/images/theme-${theme}/icon-new-order.svg`}
                  width={24}
                  height={24}
                  alt=""
                />
                Nueva
              </li>
              <li data-path="/dashboard/orders">
                <Image
                  src={`/assets/images/theme-${theme}/icon-status-dark.svg`}
                  width={24}
                  height={24}
                  alt=""
                />
                Todas
              </li>
              <li data-path="/dashboard/orders?status=pendiente">
                <Image
                  src={`/assets/images/theme-${theme}/icon-status-light.svg`}
                  width={24}
                  height={24}
                  alt=""
                />
                Pendientes
              </li>
              <li data-path="/dashboard/orders?status=procesada">
                <Image
                  src={`/assets/images/theme-${theme}/icon-status-medium.svg`}
                  width={24}
                  height={24}
                  alt=""
                />
                Procesadas
              </li>
              <li data-path="/dashboard/orders?status=completada">
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
          {user && user?.role === 'admin' && (
            <li>
              <SideBarItemMenu
                path="/dashboard/products"
                icon={{
                  src: `/assets/images/theme-${theme}/icon-products.svg`,
                  width: 24,
                  height: 24,
                }}
                label="Productos"
                showLabel={open}
                theme={theme}
              ></SideBarItemMenu>
            </li>
          )}

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

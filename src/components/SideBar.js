import styles from '@/styles/SideBar.module.css';
import React, { useEffect } from 'react';
import SideBarItemMenu from './SideBarItemMenu';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function SideBar({ open, theme }) {
  const [expanded, setExpanded] = React.useState(open);
  const onToggleItem = (elem) => {
    setExpanded(true);
  };
  // const onToggleMenu = (elem) => {
  //   if (elem.target.className !== styles.itemMenu) return;
  //   setExpanded(!expanded);
  // };

  const { data: session } = useSession();
  const user = session?.user;
  useEffect(() => {
    console.log('expanded', expanded);
  }, [expanded]);
  return (
    <>
      <div
        className={`${styles.SideBar} ${
          expanded === false && styles.collapse
        } ${styles[theme]}`}
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
              showLabel={expanded}
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
              showLabel={expanded}
              theme={theme}
              onToggleItem={onToggleItem}
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
                label="Inventario"
                showLabel={expanded}
                theme={theme}
              >
                <li data-path="/dashboard/products">
                  <Image
                    src={`/assets/images/theme-${theme}/icon-status-dark.svg`}
                    width={24}
                    height={24}
                    alt=""
                  />
                  Productos
                </li>
                <li data-path="/dashboard/products/addons">
                  <Image
                    src={`/assets/images/theme-${theme}/icon-status-light.svg`}
                    width={24}
                    height={24}
                    alt=""
                  />
                  Adicionales
                </li>
              </SideBarItemMenu>
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
              showLabel={expanded}
              theme={theme}
            ></SideBarItemMenu>
          </li>
        </ul>
      </div>
    </>
  );
}

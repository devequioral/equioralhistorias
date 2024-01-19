import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import React, { useContext, useReducer } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import styles from '@/styles/dashboard/orders/NewOrderScreen.module.css';
import productJSON from '@/temp/product.json';

import productReducer from '@/reducers/ProductReducers';
import ConfirmationMessage from '@/components/dashboard/orders/new/ConfirmationMessage';
import { useRouter } from 'next/router';

function CompleteScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();
  const { order_id } = router.query;

  const initialProduct =
    JSON.parse(localStorage.getItem('ArcticBunker_draft_order')) || productJSON;
  const [product, dispatch] = useReducer(productReducer, initialProduct);

  React.useEffect(() => {
    if (localStorage.getItem('ArcticBunker_draft_order')) {
      // if (!localStorage.getItem('ArcticBunker_orders')) {
      //   localStorage.setItem('ArcticBunker_orders', JSON.stringify([]));
      // }
      // if (localStorage.getItem('ArcticBunker_orders')) {
      //   const orders = JSON.parse(localStorage.getItem('ArcticBunker_orders'));
      //   orders.push({
      //     product,
      //     order_id,
      //     status: 'Pendiente',
      //     date: new Date().toLocaleDateString(),
      //   });
      //   localStorage.setItem('ArcticBunker_orders', JSON.stringify(orders));
      // }
      localStorage.removeItem('ArcticBunker_draft_order');
    }
  }, []);

  return (
    <>
      <Metaheader title="Orden Completada | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme} sidebarCollapsed={false}>
        <div className={`container ${styles.container}`}>
          <div className={`row ${styles.row01}`}>
            <div className={`col col-12`}>
              <BreadCrumbs
                theme={theme}
                data={{
                  links: [
                    { href: '/dashboard', title: 'Inicio' },
                    { href: '/dashboard/orders', title: 'Cotizaciones' },
                    {
                      href: '/dashboard/orders/new',
                      title: 'Nueva Cotización',
                    },
                    { href: false, title: 'Cotización Completada' },
                  ],
                }}
              />
            </div>
          </div>

          <div className={`row ${styles.row02}`}>
            <div className={`col col-12 ${styles.colConfirmation}`}>
              <ConfirmationMessage theme={theme} order_id={order_id} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

CompleteScreen.auth = true;
export default CompleteScreen;

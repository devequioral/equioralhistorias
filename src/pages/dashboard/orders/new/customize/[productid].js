import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import Actions from '@/components/dashboard/orders/new/Actions';
import Options from '@/components/dashboard/orders/new/Options';
import Preview from '@/components/dashboard/orders/new/Preview';
import { useContext, useEffect, useReducer } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import styles from '@/styles/dashboard/orders/NewOrderScreen.module.css';
import productJSON from '@/temp/product.json';

import productReducer from '@/reducers/ProductReducers';
import { useRouter } from 'next/router';

function CustomizeOrderScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const router = useRouter();

  console.log(router.query);

  const productid = router.query.productid;
  const productCurrent = productJSON.find((product) => product.id == productid);

  const initialProduct =
    JSON.parse(localStorage.getItem('ArcticBunker_draft_order')) ||
    productCurrent;

  const [product, dispatch] = useReducer(productReducer, initialProduct);

  const onChangeOption = (option, addon, action) => {
    dispatch({ type: 'CHANGE_OPTION', option, addon, action });
  };

  useEffect(() => {
    if (!localStorage.getItem('ArcticBunker_draft_order') && initialProduct) {
      localStorage.setItem(
        'ArcticBunker_draft_order',
        JSON.stringify(initialProduct)
      );
    }
  }, []);
  return (
    <>
      <Metaheader title="Personalizar Orden | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme} sidebarCollapsed={true}>
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
                    { href: false, title: 'Personalizar Producto' },
                  ],
                }}
              />
            </div>
          </div>
          {initialProduct ? (
            <>
              <div className={`row ${styles.row01}`}>
                <div className={`col col-12`}>
                  <Actions />
                </div>
              </div>
              <div className={`row ${styles.row02}`}>
                <div
                  className={`col  col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4 ${styles.colOptions}`}
                >
                  <Options
                    theme={theme}
                    onChangeOption={onChangeOption}
                    product={product}
                  />
                </div>
                <div
                  className={`col col-12 col-sm-6 col-md-8 col-lg-8 ${styles.colPreview}`}
                >
                  <Preview theme={theme} product={product} />
                </div>
              </div>
            </>
          ) : (
            <div className={`row ${styles.row03}`}>
              <div className={`col col-12`}>
                <p>Producto no encontrado</p>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

CustomizeOrderScreen.auth = true;
export default CustomizeOrderScreen;

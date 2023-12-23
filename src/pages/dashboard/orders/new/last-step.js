import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import Actions from '@/components/dashboard/orders/new/Actions';
import OptionsConfirm from '@/components/dashboard/orders/new/OptionsConfirm';
import React, { useContext, useReducer } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import styles from '@/styles/dashboard/orders/NewOrderScreen.module.css';
import productJSON from '@/temp/product.json';

import productReducer from '@/reducers/ProductReducers';
import ConfirmForm from '@/components/dashboard/orders/new/ConfirmForm';

function LastStepScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [forceSubmitForm, setForceSubmitForm] = React.useState(0);

  const initialProduct =
    JSON.parse(localStorage.getItem('ArcticBunker_draft_order')) || productJSON;
  const [product, dispatch] = useReducer(productReducer, initialProduct);

  const onChangeOption = (option, addon, action) => {
    dispatch({ type: 'CHANGE_OPTION', option, addon, action });
  };
  const onActionsEvent = (event) => {
    if (event === 'next') {
      setForceSubmitForm(forceSubmitForm + 1);
    }
  };
  return (
    <>
      <Metaheader title="Último Paso de Cotización | Arctic Bunker" />
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
                    { href: false, title: 'Confirmar Cotización' },
                  ],
                }}
              />
            </div>
          </div>
          <div className={`row ${styles.row01}`}>
            <div className={`col col-12`}>
              <Actions onActionsEvent={onActionsEvent} />
            </div>
          </div>
          <div className={`row ${styles.row02}`}>
            <div
              className={`col  col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4 ${styles.colOptions}`}
            >
              <OptionsConfirm
                theme={theme}
                onChangeOption={onChangeOption}
                product={product}
              />
            </div>
            <div
              className={`col col-12 col-sm-6 col-md-8 col-lg-8 ${styles.colPreview}`}
            >
              <ConfirmForm
                theme={theme}
                product={product}
                forceSubmitForm={forceSubmitForm}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

LastStepScreen.auth = true;
export default LastStepScreen;

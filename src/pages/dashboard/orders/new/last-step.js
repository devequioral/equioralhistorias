import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import Actions from '@/components/dashboard/orders/new/Actions';
import OptionsConfirm from '@/components/dashboard/orders/new/OptionsConfirm';
import React, { useContext, useReducer } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import styles from '@/styles/dashboard/orders/NewOrderScreen.module.css';
import orderModel from '@/models/orderModel';

import orderReducer from '@/reducers/OrderReducer';
import ConfirmForm from '@/components/dashboard/orders/new/ConfirmForm';

import userModel from '@/models/userModel';

async function getProfile() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/get`
  );
  return await res.json();
}

function LastStepScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [forceSubmitForm, setForceSubmitForm] = React.useState(0);
  const flag = React.useRef();

  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState(userModel);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const currentOrder =
    JSON.parse(localStorage.getItem('Equioral_draft_order')) || orderModel;
  const [order, dispatch] = useReducer(orderReducer, currentOrder);

  const onActionsEvent = (event) => {
    if (event === 'next') {
      setForceSubmitForm(forceSubmitForm + 1);
    }
  };

  const onSubmit = (state) => {
    setIsSubmitting(state);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (flag.current) return;
      flag.current = true;
      const fetchProfile = async () => {
        setLoading(true);
        const profileBD = await getProfile();
        if (!profileBD) {
          return;
        }
        const record = profileBD.profile.records[0];
        if (!record) return;
        setProfile({ ...record, password: '', role: '' });
        setLoading(false);
      };
      fetchProfile();
    }
  }, []);

  return (
    <>
      <Metaheader title="Último Paso de Cotización | Equioral" />
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
            <div className={`col col-12`} style={{ minHeight: '81px' }}>
              {!loading && (
                <Actions
                  onActionsEvent={onActionsEvent}
                  isLoading={loading}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>
          <div className={`row ${styles.row02}`}>
            <div
              className={`col  col-12 col-xs-12 col-sm-6 col-md-4 col-lg-4 ${styles.colOptions}`}
            >
              <OptionsConfirm theme={theme} order={order} />
            </div>
            <div
              className={`col col-12 col-sm-6 col-md-8 col-lg-8 ${styles.colPreview}`}
            >
              <ConfirmForm
                isLoading={loading}
                profile={profile}
                theme={theme}
                order={order}
                forceSubmitForm={forceSubmitForm}
                onSubmit={onSubmit}
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

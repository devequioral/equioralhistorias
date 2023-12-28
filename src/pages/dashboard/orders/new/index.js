import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import ProductList from '@/components/dashboard/ProductList';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import ModalWindow from '@/components/dashboard/ModalWindow';
import { useRouter } from 'next/router';

import productJSON from '@/temp/product.json';

function NewOrderScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const draftOrder = localStorage.getItem('ArcticBunker_draft_order');
    if (draftOrder) {
      setShowModal(true);
    }
  }, []);

  const handleModalEvent = (name_event) => {
    if (name_event === 'option01') {
      router.push('/dashboard/orders/new/customize/1');
    }
    if (name_event === 'option02') {
      localStorage.removeItem('ArcticBunker_draft_order');
      setShowModal(false);
    }
  };

  return (
    <>
      <Metaheader title="Nueva Orden | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme} sidebarCollapsed={true}>
        <BreadCrumbs
          theme={theme}
          data={{
            links: [
              { href: '/dashboard', title: 'Inicio' },
              { href: '/dashboard/orders', title: 'Cotizaciones' },
              { href: false, title: 'Nueva Cotización' },
            ],
          }}
        />
        <ProductList theme={theme} products={productJSON} />
        {showModal && (
          <ModalWindow
            options={{
              title: 'Ya tienes una cotización en borrrador',
              option01: {
                name_event: 'option01',
                text: '¿Quieres Continuar con la anterior?',
              },
              option02: {
                name_event: 'option02',
                text: '¿Quieres crear una nueva cotización?',
              },
              closeable: false,
            }}
            handleModalEvent={handleModalEvent}
          ></ModalWindow>
        )}
      </Layout>
    </>
  );
}

NewOrderScreen.auth = true;
export default NewOrderScreen;

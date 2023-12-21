import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import ProductList from '@/components/dashboard/ProductList';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

function NewOrderScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
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
        <ProductList
          theme={theme}
          products={[
            {
              id: 1,
              title: 'ARCTIC BUNKER',
              description:
                'Ocupa muy poco espacio, lo que permite una implementación rápida dentro de un espacio limitado y proporciona 10 tipos de soluciones que requieren capacidades de suministro de energía de 20kVA.',
              image: {
                src: '/assets/images/temp/product-01-t.png',
                width: 105,
                height: 213,
              },
            },
            {
              id: 2,
              title: 'ARCTIC BUNKER 02',
              description:
                'Ocupa muy poco espacio, lo que permite una implementación rápida dentro de un espacio limitado y proporciona 10 tipos de soluciones que requieren capacidades de suministro de energía de 20kVA.',
              image: {
                src: '/assets/images/temp/product-01-t.png',
                width: 105,
                height: 213,
              },
            },
            {
              id: 3,
              title: 'ARCTIC BUNKER 02',
              description:
                'Ocupa muy poco espacio, lo que permite una implementación rápida dentro de un espacio limitado y proporciona 10 tipos de soluciones que requieren capacidades de suministro de energía de 20kVA.',
              image: {
                src: '/assets/images/temp/product-01-t.png',
                width: 105,
                height: 213,
              },
            },
            {
              id: 4,
              title: 'ARCTIC BUNKER 04',
              description:
                'Ocupa muy poco espacio, lo que permite una implementación rápida dentro de un espacio limitado y proporciona 10 tipos de soluciones que requieren capacidades de suministro de energía de 20kVA.',
              image: {
                src: '/assets/images/temp/product-01-t.png',
                width: 105,
                height: 213,
              },
            },
          ]}
        />
      </Layout>
    </>
  );
}

NewOrderScreen.auth = true;
export default NewOrderScreen;

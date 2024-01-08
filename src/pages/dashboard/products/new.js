import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import React, { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

function NewProduct() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <>
      <Metaheader title="Listado de Productos | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <BreadCrumbs
          theme={theme}
          data={{
            links: [
              { href: '/dashboard', title: 'Inicio' },
              { href: '/dashboard/products', title: 'Productos' },
              { href: false, title: 'Nuevo Producto' },
            ],
          }}
        />
      </Layout>
    </>
  );
}

NewProduct.auth = true;
export default NewProduct;

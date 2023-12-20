import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import { useState } from 'react';
import MainBanner from '@/components/dashboard/MainBanner';
import ProductList from '@/components/dashboard/ProductList';
import Banner02 from '@/components/dashboard/Banner02';

function DashBoardScreen() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <>
      <Metaheader />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <MainBanner
          theme={theme}
          data={{
            title: 'Nuevo Gabinete MDC, con más espacio y nuevas funciones',
            description:
              'Se puede aplicar en entornos de menos de 8 metros cuadrados o con una carga informática de menos de 7,0 kW. Es adecuado para aplicaciones de TI en entornos regionales o de pequeñas empresas.',
            image: {
              src: '/assets/images/main-image-banner.jpg?v=0.1',
              width: 721,
              height: 291,
            },
            button01: {
              label: 'Mas información',
              icon: {
                src: '/assets/images/icon-eye.svg',
                width: 20,
                height: 20,
              },
              href: '#',
            },
            button02: {
              label: 'Personalizar Producto',
              icon: {
                src: '/assets/images/icon-customize.svg',
                width: 20,
                height: 20,
              },
              href: '#',
            },
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
        <Banner02
          data={{
            title: 'MONITOREO INTEGRAL',
            description:
              'Nuestro portafolio de soluciones de monitoreo más completo del mercado para la administración, control y analítica de las métricas producidas por la infraestructura física y lógica en su centro de datos.',
            image: {
              src: '/assets/images/banner02-bg.png',
              width: 306,
              height: 428,
            },
            button: {
              label: 'Ordenar',
              icon: {
                src: '/assets/images/icon-cart.svg',
                width: 20,
                height: 20,
              },
              href: '#',
            },
          }}
        />
      </Layout>
    </>
  );
}

DashBoardScreen.auth = true;
export default DashBoardScreen;

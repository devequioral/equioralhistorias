import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import Banner02 from '@/components/dashboard/Banner02';
import MainBanner from '@/components/dashboard/MainBanner';
import NewOrderBanner from '@/components/dashboard/NewOrderBanner';
import ProductList from '@/components/dashboard/ProductList';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext, useEffect, useState } from 'react';

import productJSON from '@/temp/product.json';

async function getProducts(page = 1, pageSize = 5, status = 'all') {
  //SIMULATE SLOW CONNECTION
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products/list?page=${page}&pageSize=${pageSize}&status=${status}`
  );
  return await res.json();
}

function DashBoardScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchProducts = async () => {
        setLoading(true);
        const productsBD = await getProducts(1, 4, 'all');

        if (!productsBD) {
          setProducts([]);
          return;
        }

        const { records } = productsBD.products;

        setProducts(
          records.map((product, index) => {
            return {
              ...product,
            };
          })
        );
        setLoading(false);
      };
      fetchProducts();
    }
  }, []);
  return (
    <>
      <Metaheader />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <NewOrderBanner />
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
        <ProductList theme={theme} products={products} isLoading={loading} />
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

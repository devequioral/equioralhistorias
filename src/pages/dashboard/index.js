import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import SecondaryBanner from '@/components/dashboard/SecondaryBanner';
import MainBanner from '@/components/dashboard/MainBanner';
import NewOrderBanner from '@/components/dashboard/NewOrderBanner';
import ProductList from '@/components/dashboard/ProductList';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Image, Button } from '@nextui-org/react';

async function getProducts(page = 1, pageSize = 5, status = 'all') {
  //SIMULATE SLOW CONNECTION
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/list?page=${page}&pageSize=${pageSize}&status=${status}`
  );
  return await res.json();
}

function DashBoardScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchProducts = async () => {
        setLoading(true);
        const productsBD = await getProducts(1, 4, 'all');

        if (
          !productsBD ||
          !productsBD.products ||
          !productsBD.products.records
        ) {
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
        <MainBanner theme={theme} role={session?.user?.role} />
        <ProductList theme={theme} products={products} isLoading={loading} />
        <SecondaryBanner
          role={session?.user?.role}
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

import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import { ThemeContext } from '@/contexts/ThemeContext';
import React, { useContext, useEffect } from 'react';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import { useRouter } from 'next/router';
import { formatDate, capitalizeFirstLetter } from '@/utils/utils';

async function getOrder(order_id) {
  //SIMULATE SLOW CONNECTION
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/get?order_id=${order_id}`
  );
  return await res.json();
}

function DetailOrderScreen() {
  const [order, setOrder] = React.useState(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchOrder = async (order_id) => {
        const orderBD = await getOrder(order_id);
        if (
          orderBD &&
          orderBD.order &&
          orderBD.order.records &&
          orderBD.order.records.length > 0
        ) {
          const _order = orderBD.order.records[0];
          const product = JSON.parse(_order.product);
          setOrder({
            key: 1,
            order_id: _order.id,
            product: product ? product?.productName : '',
            date: formatDate(_order.createdAt),
            status: capitalizeFirstLetter(_order.status),
          });
        }
      };
      const order_id = router.query['order-id'];
      fetchOrder(order_id);
    }
  }, []);

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Metaheader title="Detalle de Cotización | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <BreadCrumbs
          theme={theme}
          data={{
            links: [
              { href: '/dashboard', title: 'Inicio' },
              { href: '/dashboard/orders', title: 'Cotizaciones' },
              { href: false, title: 'Detalle' },
            ],
          }}
        />
        {order && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold">Detalle de Cotización</h1>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Datos del Producto</h2>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold">Nombre del Producto</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <p className="text-base">{order.product}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Datos de la Cotización</h2>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold">
                        Fecha de la Cotización
                      </h3>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                          <p className="text-base">{order.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold">
                          Estado de la Cotización
                        </h3>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between">
                            <p className="text-base">{order.status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}

DetailOrderScreen.auth = true;
export default DetailOrderScreen;

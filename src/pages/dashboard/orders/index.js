import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import TableComponent from '@/components/dashboard/TableComponent';
import { ThemeContext } from '@/contexts/ThemeContext';
import React, { useContext, useEffect } from 'react';

import ordersJSON from '@/temp/orders.json';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import { Chip } from '@nextui-org/react';
import { Link } from '@nextui-org/react';
import { formatDate, capitalizeFirstLetter } from '@/utils/utils';

async function getOrders() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/list`
  );
  return await res.json();
}

function ListOrders() {
  const [orders, setOrders] = React.useState([]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchOrders = async () => {
        const ordersBD = await getOrders();
        console.log(ordersBD);
        if (
          ordersBD &&
          ordersBD.orders &&
          ordersBD.orders.records &&
          ordersBD.orders.records.length > 0
        ) {
          setOrders(
            ordersBD.orders.records.map((order, index) => {
              const product = JSON.parse(order.product);
              return {
                key: index,
                order_id: order.id,
                product: product ? product?.productName : '',
                date: formatDate(order.createdAt),
                status: capitalizeFirstLetter(order.status),
              };
            })
          );
        }
      };
      fetchOrders();
    }
  }, []);

  const { theme, toggleTheme } = useContext(ThemeContext);
  const renderCell = React.useCallback((record, columnKey) => {
    const cellValue = record[columnKey];
    switch (columnKey) {
      case 'status':
        const statusColorMap = {
          Completada: 'success',
          Pendiente: 'danger',
          Procesada: 'warning',
        };
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[record.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );

      case 'order_id':
        return (
          <Link href={`/dashboard/orders/detail/${record.order_id}`}>
            {cellValue}
          </Link>
        );

      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <Metaheader />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <BreadCrumbs
          theme={theme}
          data={{
            links: [
              { href: '/dashboard', title: 'Inicio' },
              { href: false, title: 'Cotizaciones' },
            ],
          }}
        />
        <TableComponent
          data={{
            title: 'Listado de Cotizaciones',
            button: {
              label: 'Nueva Cotización',
              href: '/dashboard/orders/new',
            },
            columns: [
              { key: 'order_id', label: '# Cotización' },
              { key: 'product', label: 'Producto' },
              { key: 'date', label: 'Fecha' },
              { key: 'status', label: 'Status' },
            ],
            rows: orders,
            pagination: {
              total: ordersJSON.totalPages,
              initialPage: ordersJSON.page,
            },
            renderCell,
          }}
        />
      </Layout>
    </>
  );
}

ListOrders.auth = true;
export default ListOrders;

import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import TableComponent from '@/components/dashboard/TableComponent';
import { ThemeContext } from '@/contexts/ThemeContext';
import React, { useContext } from 'react';

import ordersJSON from '@/temp/orders.json';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import { Chip } from '@nextui-org/react';
import { Link } from '@nextui-org/react';

function ListOrders() {
  const ordersStorage = JSON.parse(localStorage.getItem('ArcticBunker_orders'));

  const orders = ordersStorage.map((order, index) => {
    return {
      key: index,
      order_id: order.order_id,
      product: order.product.productName,
      date: order.date,
      status: order.status,
    };
  });

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

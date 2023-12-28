import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import TableComponent from '@/components/dashboard/TableComponent';
import { ThemeContext } from '@/contexts/ThemeContext';
import React, { useContext, useEffect } from 'react';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatDate, capitalizeFirstLetter } from '@/utils/utils';

async function getOrders(page = 1, pageSize = 5, status = 'all') {
  //SIMULATE SLOW CONNECTION
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders/list?page=${page}&pageSize=${pageSize}&status=${status}`
  );
  return await res.json();
}

function ListOrders() {
  const [orders, setOrders] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { status } = router.query;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchOrders = async () => {
        setLoading(true);
        const ordersBD = await getOrders(page, pageSize, status);

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
          setTotalPages(ordersBD.orders.totalPages);
          setPage(ordersBD.orders.page);
        } else {
          setOrders([]);
          setTotalPages(1);
          setPage(1);
        }
        setLoading(false);
      };
      fetchOrders(page, pageSize);
    }
  }, [page, pageSize, status]);

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
          <Link
            href={`/dashboard/orders/detail/${record.order_id}`}
            style={{
              textDecoration: 'none',
              color: '#0070f0',
            }}
          >
            {cellValue}
          </Link>
        );

      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <Metaheader title="Listado de Cotizaciones | Arctic Bunker" />
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
              total: totalPages,
              initialPage: page,
              isDisabled: loading,
              onChange: (page) => {
                setPage(page);
              },
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

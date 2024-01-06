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

async function getProducts(page = 1, pageSize = 5, status = 'all') {
  //SIMULATE SLOW CONNECTION
  //await new Promise((resolve) => setTimeout(resolve, 2000));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/list?page=${page}&pageSize=${pageSize}&status=${status}`
  );
  return await res.json();
}

function ListProducts() {
  const [products, setProducts] = React.useState([]);
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
        const productsBD = await getProducts(page, pageSize, status);
        if (
          productsBD &&
          productsBD.products &&
          productsBD.products.records &&
          productsBD.products.records.length > 0
        ) {
          setProducts(
            productsBD.products.records.map((product, index) => {
              return {
                key: index,
                id: product.id,
                productName: product.productName,
                date: formatDate(product.createdAt),
                status: 'In Stock',
              };
            })
          );
          setTotalPages(productsBD.products.totalPages);
          setPage(productsBD.products.page);
        } else {
          setProducts([]);
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
            href={`/dashboard/products/detail/${record.order_id}`}
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
      <Metaheader title="Listado de Productos | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <BreadCrumbs
          theme={theme}
          data={{
            links: [
              { href: '/dashboard', title: 'Inicio' },
              { href: false, title: 'Productos' },
            ],
          }}
        />
        <TableComponent
          data={{
            title: 'Listado de Productos',
            button: {
              label: 'Nuevo Producto',
              href: '/dashboard/products/new',
            },
            columns: [
              { key: 'id', label: '#' },
              { key: 'productName', label: 'Producto' },
              { key: 'date', label: 'Fecha' },
              { key: 'status', label: 'Status' },
            ],
            rows: products,
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

ListProducts.auth = true;
export default ListProducts;

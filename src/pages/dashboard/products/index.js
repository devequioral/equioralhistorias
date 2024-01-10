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
import Image from 'next/image';
import ModalComponent from '@/components/dashboard/ModalComponent';

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
  const [showModalCount, setShowModalCount] = React.useState(0);
  const [recordModal, setRecordModal] = React.useState(null);

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
                ...product,
                key: index,
                id: product.id,
                productName: product.productName,
                date: formatDate(product.createdAt),
                status: capitalizeFirstLetter(product.status),
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

  const showModalRecord = (record) => {
    setRecordModal(record);
    setShowModalCount((currCount) => currCount + 1);
  };

  const onNewProduct = () => {
    setRecordModal({});
    setShowModalCount((currCount) => currCount + 1);
  };

  const renderCell = React.useCallback((record, columnKey) => {
    const cellValue = record[columnKey];
    switch (columnKey) {
      case 'expand':
        return (
          <div
            className="expand-cell"
            onClick={() => {
              showModalRecord(record);
            }}
          >
            <Image
              src="/assets/images/icon-expand.svg"
              width={12}
              height={12}
              alt=""
            />
          </div>
        );
      case 'status':
        const statusColorMap = {
          Disponible: 'success',
          Agotado: 'danger',
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

      case 'id':
        return (
          <div
            style={{
              textDecoration: 'none',
              color: '#0070f0',
              cursor: 'pointer',
            }}
            onClick={() => {
              showModalRecord(record);
            }}
          >
            {cellValue}
          </div>
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
              callback: () => {
                onNewProduct();
              },
            },
            columns: [
              { key: 'expand', label: '' },
              { key: 'id', label: 'Product ID' },
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
        <ModalComponent
          show={showModalCount}
          record={recordModal}
          schema={{
            title: 'Detalle de Producto',
            fields: [
              //{ key: 'id', label: 'Product ID', type: 'text', readOnly: true },
              {
                key: 'productName',
                label: 'Nombre del Producto',
                type: 'text',
              },
              { key: 'description', label: 'Descripción', type: 'text' },
              {
                key: 'productImage',
                label: 'Imágen',
                type: 'image',
                preview: true,
              },
              //{ key: 'date', label: 'Fecha', type: 'date' },
              { key: 'status', label: 'Status', type: 'text' },
            ],
          }}
        />
      </Layout>
    </>
  );
}

ListProducts.auth = true;
export default ListProducts;

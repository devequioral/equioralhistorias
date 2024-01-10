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
import productModel from '@/models/productModel';
import { toast } from 'react-toastify';

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
                date: product.createdAt,
                status: product.status,
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
    setRecordModal(productModel);
    setShowModalCount((currCount) => currCount + 1);
  };

  const saveProduct = (record) => {
    //console.log('saveProduct', record);
    fetch('/api/products/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_request: record }),
    })
      .then((response) => {
        //IF RESPONSE STATUS IS NOT 200 THEN THROW ERROR
        if (response.status !== 200) {
          toast.error('No se pudo enviar la información');
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Producto Guardado con éxito');
      })
      .catch((error) => {
        //console.error('Error:', error);
        toast.error('El Producto no se pudo guardar');
      });
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
          disponible: 'success',
          agotado: 'danger',
        };
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[record.status]}
            size="sm"
            variant="flat"
          >
            {capitalizeFirstLetter(cellValue)}
          </Chip>
        );

      case 'date':
        return <div>{formatDate(cellValue)}</div>;

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
          onSave={(record) => {
            saveProduct(record);
          }}
          schema={{
            title: 'Detalle de Producto',
            fields: [
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
              {
                key: 'status',
                label: 'Status',
                type: 'select',
                items: [
                  { value: 'disponible', label: 'Disponible' },
                  { value: 'agotado', label: 'Agotado' },
                ],
              },
            ],
          }}
        />
      </Layout>
    </>
  );
}

ListProducts.auth = true;
export default ListProducts;

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
import DetailAddon from '@/components/dashboard/products/addons/DetailAddon';
import MediaUpload from '@/components/dashboard/MediaUpload';
import addons from '@/temp/addons.json';

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
  const [refreshTable, setRefreshTable] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { status } = router.query;
  const [showModalRecord, setShowModalRecord] = React.useState(0);
  const [showModalChangeImage, setShowModalChangeImage] = React.useState(0);

  const [recordModal, setRecordModal] = React.useState(productModel);
  const [recordChange, setRecordChange] = React.useState(false);
  const [allowUploadImage, setAllowUploadImage] = React.useState(false);
  const [recordImage, setRecordImage] = React.useState(null);

  const onRecordChange = (value) => {
    setRecordChange(value);
  };

  const onFieldChange = (key, value) => {
    const newRecord = { ...recordModal };
    newRecord[key] = value;
    setRecordModal(newRecord);
    setRecordChange(true);
  };

  const onShowModalAddons = () => {
    setShowModalAddons((currCount) => currCount + 1);
  };

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
  }, [page, pageSize, status, refreshTable]);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const showProductDetail = (record) => {
    console.log('showProductDetail');
    setRecordModal(record);
    setShowModalRecord((currCount) => currCount + 1);
  };

  const createRecord = () => {
    setRecordModal(productModel);
    setShowModalRecord((currCount) => currCount + 1);
  };

  const showChangeImage = (image) => {
    setShowModalChangeImage((currCount) => currCount + 1);
  };

  const saveRecord = () => {
    // fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/products/new', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ product_request: recordModal }),
    // })
    //   .then((response) => {
    //     //IF RESPONSE STATUS IS NOT 200 THEN THROW ERROR
    //     if (response.status !== 200) {
    //       toast.error('No se pudo enviar la información');
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     toast.success('Producto Guardado con éxito');
    //     setShowModalRecord(0);
    //     setRefreshTable((currCount) => currCount + 1);
    //   })
    //   .catch((error) => {
    //     //console.error('Error:', error);
    //     toast.error('El Producto no se pudo guardar');
    //   });
  };

  const renderCell = React.useCallback((record, columnKey) => {
    const cellValue = record[columnKey];
    switch (columnKey) {
      case 'expand':
        return (
          <div
            className="expand-cell"
            onClick={() => {
              showProductDetail(record);
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
          <>
            {cellValue ? (
              <Chip
                className="capitalize"
                color={statusColorMap[record.status]}
                size="sm"
                variant="flat"
              >
                {capitalizeFirstLetter(cellValue)}
              </Chip>
            ) : (
              <div></div>
            )}
          </>
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
              showProductDetail(record);
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
      <Metaheader title="Listado de Adicionales | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <BreadCrumbs
          theme={theme}
          data={{
            links: [
              { href: '/dashboard', title: 'Inicio' },
              { href: '/dasboard/products', title: 'Productos' },
              { href: false, title: 'Adicionales' },
            ],
          }}
        />
        <TableComponent
          data={{
            title: 'Listado de Adicionales',
            button: {
              label: 'Nuevo Adicional',
              callback: () => {
                createRecord();
              },
            },
            columns: [
              { key: 'expand', label: '' },
              { key: 'id', label: 'Adicional ID' },
              { key: 'text', label: 'Descripción' },
              { key: 'productName', label: 'Producto' },
              { key: 'category', label: 'Categoria' },
            ],
            rows: addons,
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
          show={showModalRecord}
          onSave={saveRecord}
          title="Detalle del Adicional"
          onCloseModal={() => {
            onRecordChange(false);
          }}
          allowSave={recordChange}
        >
          <DetailAddon
            onRecordChange={(value) => {
              onRecordChange(value);
            }}
            record={recordModal}
            onFieldChange={(key, value) => {
              onFieldChange(key, value);
            }}
            onChangeImage={(image) => {
              showChangeImage(image);
            }}
            schema={{
              title: 'Detalle del Adicional',
              fields: [
                {
                  key: 'text',
                  label: 'Nombre',
                  type: 'text',
                },
                { key: 'help', label: 'Descripción', type: 'text' },
                {
                  key: 'percent',
                  label: '% Valor agregado',
                  type: 'text',
                },
                {
                  key: 'category',
                  label: 'Categoria',
                  type: 'select',
                  items: [
                    { value: 'Seguridad', label: 'Seguridad' },
                    { value: 'Energía', label: 'Energía' },
                    { value: 'Energía', label: 'Energía' },
                    {
                      value: 'Protección Desastres',
                      label: 'Protección Desastres',
                    },
                    { value: 'Refrigeración', label: 'Refrigeración' },
                  ],
                },
                {
                  key: 'productName',
                  label: 'Producto',
                  type: 'text',
                },
              ],
            }}
          />
        </ModalComponent>
      </Layout>
    </>
  );
}

ListProducts.auth = { adminOnly: true };
export default ListProducts;

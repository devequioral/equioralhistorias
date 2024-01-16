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
import DetailProduct from '@/components/dashboard/products/DetailProduct';
import MediaUpload from '@/components/dashboard/MediaUpload';
import { set } from 'mongoose';

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
  const [showModalProductDetail, setShowModalProductDetail] = React.useState(0);
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
    setShowModalProductDetail((currCount) => currCount + 1);
  };

  const onNewProduct = () => {
    setRecordModal(productModel);
    setShowModalProductDetail((currCount) => currCount + 1);
  };

  const showChangeImage = (image) => {
    setShowModalChangeImage((currCount) => currCount + 1);
  };

  const saveProduct = () => {
    fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/products/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product_request: recordModal }),
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
        setShowModalProductDetail(0);
        setRefreshTable((currCount) => currCount + 1);
      })
      .catch((error) => {
        //console.error('Error:', error);
        toast.error('El Producto no se pudo guardar');
      });
  };

  const uploadImage = async () => {
    const body = new FormData();
    body.append('file', recordImage);
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + '/api/media/upload',
      {
        method: 'POST',
        body,
      }
    );

    if (response.ok) {
      const { url, fields, mediaKey, urlMedia } = await response.json();
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('file', recordImage);

      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (uploadResponse.ok) {
        //toast.success('Imágen Guardada con éxito');
        const newRecord = { ...recordModal };
        newRecord.productImage.src = urlMedia;
        setRecordModal(newRecord);
      } else {
        toast.error('La imágen no se pudo guardar');
      }
      setShowModalChangeImage(0);
    }
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
          show={showModalProductDetail}
          onSave={saveProduct}
          title="Detalle de Producto"
          onCloseModal={() => {
            onRecordChange(false);
          }}
          allowSave={recordChange}
        >
          <DetailProduct
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
        </ModalComponent>
        <ModalComponent
          show={showModalChangeImage}
          onSave={uploadImage}
          title="Cambiar Imágen"
          onCloseModal={() => {
            setAllowUploadImage(false);
          }}
          allowSave={allowUploadImage}
        >
          <MediaUpload
            onImageChange={(image) => {
              setRecordImage(image);
              setAllowUploadImage(true);
            }}
          />
        </ModalComponent>
      </Layout>
    </>
  );
}

ListProducts.auth = { adminOnly: true };
export default ListProducts;

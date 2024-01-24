import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import TableComponent from '@/components/dashboard/TableComponent';
import { ThemeContext } from '@/contexts/ThemeContext';
import React, { useContext, useEffect } from 'react';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import { Chip } from '@nextui-org/react';
import { formatDate, capitalizeFirstLetter, shortUUID } from '@/utils/utils';
import Image from 'next/image';
import ModalComponent from '@/components/dashboard/ModalComponent';
import { toast } from 'react-toastify';
import DetailNotification from '@/components/dashboard/notifications/DetailNotification';
import { useSession } from 'next-auth/react';

async function getNotifications(page = 1, pageSize = 5, userRole) {
  const url =
    userRole == 'admin'
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/notifications/list`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/list`;

  const res = await fetch(url);
  return await res.json();
}

function Notifications() {
  const [notifications, setNotifications] = React.useState([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [refreshTable, setRefreshTable] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [showModalRecordDetail, setShowModalRecordDetail] = React.useState(0);

  const [recordModal, setRecordModal] = React.useState(null);
  const [recordChange, setRecordChange] = React.useState(false);
  const [savingRecord, setSavingRecord] = React.useState(false);

  const { data: session } = useSession();

  const onRecordChange = (value) => {
    setRecordChange(value);
  };

  //   const onFieldChange = (key, value) => {
  //     const newRecord = { ...recordModal };
  //     newRecord[key] = value;
  //     setRecordModal(newRecord);
  //     setRecordChange(true);
  //   };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchRecords = async () => {
        setLoading(true);
        const notificationsBD = await getNotifications(
          page,
          pageSize,
          session.user.role
        );

        const { records } = notificationsBD.data;

        if (records && records.length > 0) {
          setNotifications(
            records.map((user, index) => {
              return {
                ...user,
                key: index,
                date: user.createdAt,
              };
            })
          );
          setTotalPages(records.totalPages);
          setPage(records.page);
        } else {
          setNotifications([]);
          setTotalPages(1);
          setPage(1);
        }
        setLoading(false);
      };
      fetchRecords(page, pageSize);
    }
  }, [page, pageSize, refreshTable]);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const showRecordDetail = (record) => {
    setRecordModal(record);
    setShowModalRecordDetail((currCount) => currCount + 1);
  };

  const markAsReaded = () => {
    if (savingRecord) return;
    setSavingRecord(true);
    if (recordModal && recordModal.status === 'readed') return;
    let url =
      session.user.role === 'admin'
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/notifications/markasreaded`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/markasreaded`;

    const body = { record: recordModal };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        //IF RESPONSE STATUS IS NOT 200 THEN THROW ERROR
        if (response.status !== 200) {
          //toast.error('No se pudo enviar la información');
          setSavingRecord(false);
        }
        return response.json();
      })
      .then((data) => {
        //toast.success('Registro Guardado con éxito');
        setSavingRecord(false);
      })
      .catch((error) => {
        //console.error('Error:', error);
        //toast.error('El registro no se pudo guardar');
        setSavingRecord(false);
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
              showRecordDetail(record);
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
          unread: 'danger',
          readed: 'primary',
        };
        const statusLabelMap = {
          unread: 'No Leido',
          readed: 'Leido',
        };

        return (
          <>
            {cellValue ? (
              <Chip
                className="capitalize"
                color={statusColorMap[cellValue]}
                size="sm"
                variant="flat"
              >
                {capitalizeFirstLetter(statusLabelMap[cellValue])}
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
              showRecordDetail(record);
            }}
          >
            {shortUUID(cellValue)}
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Metaheader title="Notificaciones | Arctic Bunker" />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <BreadCrumbs
          theme={theme}
          data={{
            links: [
              { href: '/dashboard', title: 'Inicio' },
              { href: false, title: 'Notificaciones' },
            ],
          }}
        />
        <TableComponent
          data={{
            title: 'Listado de Notificaciones',
            button: false,
            columns: [
              { key: 'expand', label: '' },
              { key: 'id', label: 'Notification ID' },
              { key: 'title', label: 'Titulo' },
              { key: 'status', label: 'Estatus' },
              { key: 'date', label: 'Fecha' },
            ],
            rows: notifications,
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
          show={showModalRecordDetail}
          title="Detalle de la Notificación"
          onCloseModal={() => {
            setRefreshTable((currCount) => currCount + 1);
            onRecordChange(false);
          }}
          allowSave={false}
          showButtonSave={false}
          size={`md`}
        >
          <DetailNotification
            record={recordModal}
            userRole={session.user.role}
            markAsReaded={markAsReaded}
          />
        </ModalComponent>
      </Layout>
    </>
  );
}

Notifications.auth = true;
export default Notifications;

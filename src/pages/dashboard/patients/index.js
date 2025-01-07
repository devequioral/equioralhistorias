import Layout from '@/components/Layout';
import Metaheader from '@/components/Metaheader';
import { ThemeContext } from '@/contexts/ThemeContext';
import React, { useContext, useEffect } from 'react';
import BreadCrumbs from '@/components/dashboard/BreadCrumbs';
import patientModel from '@/models/patientModel';
import MainScreenObject from '@/components/dashboard/MainScreenObject';
import { Button, Chip } from '@nextui-org/react';
import Image from 'next/image';
import { formatDate, capitalizeFirstLetter, shortUUID } from '@/utils/utils';
import { useRouter } from 'next/router';

function ListPatients() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const urlGetRecords = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/list?status=active`;
  const urlNewRecord = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/new`;
  const urlUpdateRecord = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/update`;
  const urlDeleteRecord = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/patients/delete?id={record_id}`;
  const router = useRouter();
  const viewHistory = (record) => {
    router.push('/dashboard/patients/history/' + record.id);
  };
  const renderCell = (record, columnKey, showRecordDetail, showModalDelete) => {
    const cellValue = record[columnKey];
    switch (columnKey) {
      case 'expand':
        return (
          <Button
            size="sm"
            isIconOnly
            color="default"
            variant="link"
            onPress={() => {
              showRecordDetail(record);
            }}
          >
            <Image
              src="/assets/images/icon-expand.svg"
              width={12}
              height={12}
              alt=""
            />
          </Button>
        );
      case 'status':
        const statusColorMap = {
          active: 'success',
          inactive: 'danger',
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

      case 'history':
        return (
          <Button
            size="sm"
            color="primary"
            onPress={() => {
              viewHistory(record);
            }}
          >
            Ver Historia
          </Button>
        );

      case 'delete':
        return (
          <Button
            size="sm"
            isIconOnly
            color="default"
            variant="link"
            onPress={() => {
              showModalDelete(record);
            }}
          >
            <Image
              src="/assets/images/theme-light/icon-delete.svg"
              width={24}
              height={24}
              alt="Borrar"
            />
          </Button>
        );

      case 'id':
        return (
          <Button
            size="sm"
            isIconOnly
            color="default"
            variant="link"
            onPress={() => {
              showRecordDetail(record);
            }}
          >
            {shortUUID(cellValue)}
          </Button>
        );

      default:
        return cellValue;
    }
  };
  return (
    <>
      <Metaheader title="Lista de Pacientes | Equioral" />
      <Layout theme={theme} toogleTheme={toggleTheme}>
        <BreadCrumbs
          theme={theme}
          data={{
            links: [
              { href: '/dashboard', title: 'Home' },
              { href: false, title: 'Pacientes' },
            ],
          }}
        />
        <MainScreenObject
          urlGetRecords={urlGetRecords}
          urlNewRecord={urlNewRecord}
          urlUpdateRecord={urlUpdateRecord}
          urlDeleteRecord={urlDeleteRecord}
          tablePageSize={30}
          model={patientModel}
          tableComponentData={{
            title: 'Lista de pacientes',
            button: {
              label: 'Nuevo paciente',
            },
            columns: [
              { key: 'expand', label: '' },
              { key: 'id', label: 'Paciente ID' },
              { key: 'horse_farm', label: 'Criadero' },
              { key: 'horse', label: 'Caballo' },
              { key: 'date', label: 'Fecha' },
              { key: 'history', label: 'Historia' },
              { key: 'delete', label: '' },
            ],
            renderCell,
          }}
          showSearch={true}
          modalComponentData={{
            title: 'Detalle de Paciente',
          }}
          schema={{
            fields: [
              {
                key: 'id',
                label: 'Paciente ID',
                type: 'hidden',
              },
              {
                key: 'horse',
                label: 'Caballo',
                type: 'text',
                isRequired: true,
              },
              {
                key: 'horse_farm',
                label: 'Criadero',
                type: 'text',
                isRequired: true,
              },
              {
                key: 'owner_name',
                label: 'Nombre del Dueño',
                type: 'text',
                isRequired: true,
              },
              {
                key: 'owner_phone',
                label: 'Teléfono del Dueño',
                type: 'text',
                isRequired: true,
              },
            ],
          }}
        />
      </Layout>
    </>
  );
}

ListPatients.auth = { adminOnly: true };
export default ListPatients;

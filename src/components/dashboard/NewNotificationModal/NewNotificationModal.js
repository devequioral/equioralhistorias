import React, { useEffect, useState } from 'react';
import ModalComponent from '../ModalComponent';
import {
  Input,
  Textarea,
  DatePicker,
  Select,
  SelectItem,
} from '@nextui-org/react';
import {
  now,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from '@internationalized/date';
import { I18nProvider } from '@react-aria/i18n';

const saveNotification = async (data) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/notifications/new`;
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ record: data }),
  });
};
import { toast } from 'react-toastify';

export default function NewNotificationModal({ show }) {
  const [showModal, setShowModal] = useState(0);
  const [allowSave, setAllowSave] = useState(false);
  const [saving, setSaving] = useState(false);
  const defaultData = {
    title: '',
    description: '',
    date: now(getLocalTimeZone()).add({ minutes: 65 }).toAbsoluteString(),
    notification: '30min',
  };
  const [data, setData] = useState(defaultData);
  const notification_options = [
    { key: '5min', label: '5 minutos Antes' },
    { key: '10min', label: '10 minutos Antes' },
    { key: '15min', label: '15 minutos Antes' },
    { key: '20min', label: '20 minutos Antes' },
    { key: '30min', label: '30 minutos Antes' },
    { key: '60min', label: '1 hora Antes' },
  ];
  useEffect(() => {
    setAllowSave(data.title && data.date && data.notification);
  }, [data]);
  useEffect(() => {
    setShowModal(show);
  }, [show]);
  const onChange = (key, value) => {
    const _data = { ...data };
    _data[key] = value;
    setData(_data);
  };
  const onSave = async () => {
    setSaving(true);
    const resp = await saveNotification(data);
    if (resp.ok) {
      //const resp_json = await resp.json();
      setShowModal(0);
      toast.success('Notificación Guardada');
    }
    setSaving(false);
  };
  return (
    <ModalComponent
      show={showModal}
      onSave={onSave}
      title="Crear nueva notificación"
      onCloseModal={() => {
        setAllowSave(false);
        setSaving(false);
        setData(defaultData);
      }}
      allowSave={allowSave}
      savingRecord={saving}
    >
      <Input
        label="Titulo"
        onChange={(e) => onChange('title', e.target.value)}
      />
      <Textarea
        label="Descripción"
        onChange={(e) => onChange('description', e.target.value)}
      />
      <I18nProvider locale="es-La">
        <DatePicker
          label="Fecha"
          variant="bordered"
          hideTimeZone
          showMonthAndYearPickers
          minValue={now(getLocalTimeZone()).add({ minutes: 60 })}
          defaultValue={parseAbsoluteToLocal(defaultData.date)}
          onChange={(value) => onChange('date', value.toAbsoluteString())}
        />
      </I18nProvider>
      <Select
        label="Notificación"
        defaultSelectedKeys={[defaultData.notification]}
        onChange={(e) => onChange('notification', e.target.value)}
      >
        {notification_options.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </ModalComponent>
  );
}

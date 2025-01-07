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
import { saveTask, deleteTask } from './FetchTask';
import { toast } from 'react-toastify';

export default function CreateTaskDialog({
  show,
  onCreateTask,
  onDeleteTask,
  eventSelected,
}) {
  const [showModal, setShowModal] = useState(0);
  const [allowSave, setAllowSave] = useState(false);
  const [allowDelete, setAllowDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [data, setData] = useState(eventSelected);
  const notification_options = [
    { key: '5min', label: '5 minutos Antes' },
    { key: '10min', label: '10 minutos Antes' },
    { key: '15min', label: '15 minutos Antes' },
    { key: '20min', label: '20 minutos Antes' },
    { key: '30min', label: '30 minutos Antes' },
    { key: '60min', label: '1 hora Antes' },
  ];
  useEffect(() => {
    setAllowSave(data && data.title && data.date && data.notification);
  }, [data]);
  useEffect(() => {
    setShowModal(show);
  }, [show]);
  useEffect(() => {
    if (!eventSelected) return;
    setData({
      ...eventSelected,
      date: new Date(eventSelected.date).toISOString(),
    });
    setAllowDelete(true);
  }, [eventSelected]);
  const onChange = (key, value) => {
    const _data = { ...data };
    _data[key] = value;
    setData(_data);
  };
  const onSave = async () => {
    setSaving(true);
    const resp = await saveTask(data);
    if (resp.ok) {
      //const resp_json = await resp.json();
      onCreateTask(data);
      setShowModal(0);
      toast.success('Notificación Guardada');
    }
    setSaving(false);
  };
  const onDelete = async () => {
    setAllowSave(false);
    setDeleting(true);
    const resp = await deleteTask(data);
    if (resp.ok) {
      onDeleteTask(data);
      setShowModal(0);
      toast.success('Notificación Borrada');
    }
    setAllowSave(data && data.title && data.date && data.notification);
    setDeleting(false);
  };
  return (
    <ModalComponent
      show={showModal}
      onSave={onSave}
      onDelete={onDelete}
      title="Crear nueva notificación"
      onCloseModal={() => {
        setAllowSave(false);
        setAllowDelete(false);
        setSaving(false);
        setDeleting(false);
      }}
      allowSave={allowSave}
      savingRecord={saving}
      deletingRecord={deleting}
      showButtonDelete={data && data.id}
      allowDelete={allowDelete}
    >
      <Input
        label="Titulo"
        onChange={(e) => onChange('title', e.target.value)}
        defaultValue={eventSelected ? eventSelected.title : ''}
      />
      <Textarea
        label="Descripción"
        onChange={(e) => onChange('description', e.target.value)}
        defaultValue={eventSelected ? eventSelected.description : ''}
      />
      <I18nProvider locale="es-La">
        <DatePicker
          label="Fecha"
          variant="bordered"
          hideTimeZone
          showMonthAndYearPickers
          minValue={now(getLocalTimeZone()).add({ minutes: 60 })}
          defaultValue={
            eventSelected ? parseAbsoluteToLocal(eventSelected.date) : ''
          }
          onChange={(value) => onChange('date', value.toAbsoluteString())}
        />
      </I18nProvider>
      <Select
        label="Notificación"
        defaultSelectedKeys={[eventSelected ? eventSelected.notification : '']}
        onChange={(e) => onChange('notification', e.target.value)}
      >
        {notification_options.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </ModalComponent>
  );
}

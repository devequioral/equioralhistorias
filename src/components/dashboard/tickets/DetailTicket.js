import React, { useEffect } from 'react';

import {
  Input,
  Image,
  Select,
  SelectItem,
  Button,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Chip,
} from '@nextui-org/react';

import styles from '@/styles/dashboard/tickets/DetailTicket.module.css';

import { formatDate } from '@/utils/utils';

export default function DetailTicket(props) {
  const {
    userRole,
    addResponse,
    record,
    onFieldChange,
    onChangeImage,
    validation,
  } = props;
  //const newRecord = { ...record };

  const [isNewRecord, setIsNewRecord] = React.useState(
    record && record.id ? false : true
  );
  const [addResponseVisible, setAddResponseVisible] = React.useState(false);

  const formatValue = (key, type) => {
    if (!record) return '';
    const value = record[key];
    if (type == 'date') {
      return formatDate(value);
    } else {
      return value;
    }
  };

  const statusColorMap = {
    active: 'primary',
    pending: 'warning',
    close: 'default',
  };
  const statusLabelMap = {
    active: 'Activo',
    pending: 'Pendiente',
    close: 'Cerrado',
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        {isNewRecord ? (
          <>
            <Input
              type={`text`}
              label={`Titulo`}
              isRequired={true}
              isInvalid={validation.title ? true : false}
              errorMessage={validation.title}
              onChange={(e) => {
                onFieldChange('title', e.target.value);
              }}
            />
            <Textarea
              label={`Mensaje`}
              isRequired={true}
              isInvalid={validation.originalMessage ? true : false}
              errorMessage={validation.originalMessage}
              onChange={(e) => {
                onFieldChange('originalMessage', e.target.value);
              }}
            />
          </>
        ) : (
          <>
            {userRole === 'admin' ? (
              <Select
                items={[
                  { value: 'active', label: 'Activo' },
                  { value: 'pending', label: 'Pendiente' },
                  { value: 'close', label: 'Cerrado' },
                ]}
                placeholder={`Seleccione el estatus`}
                isRequired={true}
                isInvalid={validation.status ? true : false}
                errorMessage={validation.status}
                className="max-w-xs"
                defaultSelectedKeys={[record.status]}
                onChange={(e) => {
                  onFieldChange('status', e.target.value);
                }}
              >
                {(item) => (
                  <SelectItem key={item.value}>{item.label}</SelectItem>
                )}
              </Select>
            ) : (
              <div className={`${styles.statusDetail}`}>
                <p className={`${styles.subtitle}`}>Estatus:</p>
                <Chip
                  className="capitalize"
                  color={statusColorMap[record.status]}
                  size="sm"
                  variant="flat"
                >
                  {statusLabelMap[record.status]}
                </Chip>
              </div>
            )}
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className={`${styles.subtitle}`}>Titulo:</p>
                  <p className={`${styles.title}`}>{record.title}</p>
                  <p className={`${styles.date}`}>
                    {formatValue('createdAt', 'date')}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="flex flex-col">
                  <p className={`${styles.subtitle}`}>Mensaje:</p>
                  <p className={`${styles.message}`}>
                    {record.originalMessage}
                  </p>
                </div>
                <div className={`flex flex-col ${styles.metadata}`}>
                  <p className={`${styles.subtitle}`}>Escrito Por:</p>
                  <p className={`${styles.userName}`}>
                    {record.userOwner.name}
                  </p>
                  <p className={`${styles.userEmail}`}>
                    {record.userOwner.email}
                  </p>
                </div>
              </CardBody>
              <Divider />
              {record.responses.length > 0 && (
                <CardFooter>
                  <div className={`${styles.responses}`}>
                    <div>
                      <p className={`${styles.subtitle}`}>Respuestas:</p>
                    </div>
                    {record.responses.map((response, index) => {
                      return (
                        <div key={index}>
                          {index > 0 && <Divider />}
                          <div className={`${styles.response}`}>
                            <div className="flex flex-col">
                              <p className={`${styles.message}`}>
                                {response.message}
                              </p>
                            </div>
                            <div className={`flex flex-col ${styles.metadata}`}>
                              <p className={`${styles.subtitle}`}>
                                Escrito Por:
                              </p>
                              <p className={`${styles.userName}`}>
                                {response.user.name}
                              </p>
                              <p className={`${styles.userEmail}`}>
                                {response.user.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardFooter>
              )}
            </Card>
            {addResponseVisible ? (
              <div className={`${styles.responseTextarea}`}>
                <Textarea
                  label={`Mensaje`}
                  onChange={(e) => {
                    addResponse(e.target.value);
                  }}
                />
              </div>
            ) : (
              record.status !== 'close' && (
                <div className="flex flex-col">
                  <Button
                    color="primary"
                    onClick={() => {
                      setAddResponseVisible(true);
                    }}
                  >
                    Responder
                  </Button>
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  );
}

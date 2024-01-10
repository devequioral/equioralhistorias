import React, { useEffect } from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image,
  Select,
  SelectItem,
} from '@nextui-org/react';

import styles from '@/styles/dashboard/ModalComponent.module.css';
import { formatDateToISOSM } from '@/utils/utils';

export default function App(props) {
  const { show, record, schema, onSave } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [recordChange, setRecordChange] = React.useState(false);
  const newRecord = { ...record };

  const refModalBody = React.useRef(null);

  useEffect(() => {
    if (show > 0) {
      onOpen();
    }
  }, [onOpen, show, record]);

  const formatValue = (value, type) => {
    if (type == 'date') {
      return formatDateToISOSM(value);
    } else {
      return value;
    }
  };

  const changeImage = (field) => {
    console.log(field, newRecord);
  };

  const saveRecord = () => {
    //onSave(newRecord);
    console.log(newRecord);
  };

  const closeModal = () => {
    setRecordChange(false);
  };

  const onFieldChange = (newRecord, key, value) => {
    newRecord[key] = value;
    setRecordChange(true);
  };

  return (
    <>
      <Modal
        className={`${styles.Modal}`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        onClose={() => closeModal()}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {schema.title}
              </ModalHeader>
              <ModalBody ref={refModalBody}>
                <div className="flex flex-col gap-1">
                  {schema.fields.map((field, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-1">
                        {(field.type === 'text' || field.type === 'date') && (
                          <Input
                            isReadOnly={field.readOnly ? true : false}
                            type={field.type}
                            label={field.label}
                            onChange={(e) => {
                              onFieldChange(
                                newRecord,
                                field.key,
                                e.target.value
                              );
                            }}
                            defaultValue={formatValue(
                              newRecord[field.key],
                              field.type
                            )}
                          />
                        )}
                        {field.type === 'image' && (
                          <div className={`${styles.FieldImage}`}>
                            {field.preview && (
                              <div className={`${styles.ImagePreview}`}>
                                {Object.keys(newRecord).length > 0 && (
                                  <Image
                                    className="w-full"
                                    src={newRecord[field.key].src}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}
                            <div
                              className={`${styles.ChangeImage}`}
                              onClick={() => {
                                changeImage(field, newRecord);
                              }}
                            >
                              <span>Change Image</span>
                            </div>
                          </div>
                        )}
                        {field.type === 'select' && (
                          <Select
                            items={field.items}
                            placeholder="Select a option"
                            className="max-w-xs"
                            defaultSelectedKeys={
                              newRecord[field.key]
                                ? [newRecord[field.key]]
                                : null
                            }
                            onChange={(e) => {
                              onFieldChange(
                                newRecord,
                                field.key,
                                e.target.value
                              );
                            }}
                          >
                            {(item) => (
                              <SelectItem key={item.value}>
                                {item.label}
                              </SelectItem>
                            )}
                          </Select>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color={!recordChange ? 'default' : 'primary'}
                  onPress={saveRecord}
                  disabled={!recordChange}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

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
} from '@nextui-org/react';

import styles from '@/styles/dashboard/ModalComponent.module.css';
import { formatDateToISOSM } from '@/utils/utils';

export default function App(props) {
  const { show, record, schema } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [recordChange, setRecordChange] = React.useState(false);

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
    console.log(field, record);
  };

  const saveRecord = () => {
    console.log(record);
  };

  return (
    <>
      <Modal
        className={`${styles.Modal}`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        onClose={() => setRecordChange(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {schema.title}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1">
                  {schema.fields.map((field, index) => {
                    return (
                      <div key={index} className="flex flex-col gap-1">
                        {(field.type == 'text' || field.type == 'date') && (
                          <Input
                            isReadOnly={field.readOnly ? true : false}
                            type={field.type}
                            label={field.label}
                            onChange={(e) => {
                              //record[field.key] = e.target.value;
                              //console.log(record, field.key, e.target.value);
                              setRecordChange(true);
                            }}
                            defaultValue={formatValue(
                              record[field.key],
                              field.type
                            )}
                          />
                        )}
                        {field.type == 'image' && (
                          <div className={`${styles.FieldImage}`}>
                            {field.preview && (
                              <div className={`${styles.ImagePreview}`}>
                                {Object.keys(record).length > 0 && (
                                  <Image
                                    className="w-full"
                                    src={record[field.key].src}
                                    alt=""
                                  />
                                )}
                              </div>
                            )}
                            <div
                              className={`${styles.ChangeImage}`}
                              onClick={() => {
                                changeImage(field, record);
                              }}
                            >
                              <span>Change Image</span>
                            </div>
                          </div>
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

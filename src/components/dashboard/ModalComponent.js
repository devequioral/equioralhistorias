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
} from '@nextui-org/react';

import styles from '@/styles/dashboard/ModalComponent.module.css';
import { formatDateToISOSM } from '@/utils/utils';

export default function App(props) {
  const { show, record, schema } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  return (
    <>
      <Modal
        className={`${styles.Modal}`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {schema.title}
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1">
                  {schema.fields.map((field, index) => (
                    <div key={index} className="flex flex-col gap-1">
                      <Input
                        isReadOnly={field.readOnly ? true : false}
                        type={field.type}
                        label={field.label}
                        defaultValue={formatValue(
                          record[field.key],
                          field.type
                        )}
                      />
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="default" onPress={onClose} disabled>
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

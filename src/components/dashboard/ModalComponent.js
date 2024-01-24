import React, { useEffect } from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';

import styles from '@/styles/dashboard/ModalComponent.module.css';
import { set } from 'mongoose';

export default function App(props) {
  const { size, show, title, onSave, allowSave, children, onCloseModal } =
    props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoading, setIsLoading] = React.useState(false);

  const refModalBody = React.useRef(null);

  useEffect(() => {
    if (show > 0) {
      onOpen();
    } else {
      setIsLoading(false);
      onCloseModal();
    }
  }, [show]);

  const saveRecord = () => {
    setIsLoading(true);
    onSave();
  };

  const closeModal = () => {
    setIsLoading(false);
    onCloseModal();
  };

  return (
    <>
      {show > 0 && (
        <Modal
          className={`${styles.Modal}`}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior={'inside'}
          onClose={() => closeModal()}
          size={size}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {title}
                </ModalHeader>
                <ModalBody ref={refModalBody}>{children}</ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button
                    color={!allowSave ? 'default' : 'primary'}
                    onPress={saveRecord}
                    disabled={!allowSave}
                    isLoading={isLoading}
                  >
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

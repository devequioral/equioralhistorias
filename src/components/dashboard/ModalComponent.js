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

export default function ModalComponent(props) {
  const {
    size,
    show,
    title,
    onSave,
    onDelete,
    allowSave,
    allowDelete,
    showButtonSave = true,
    showButtonDelete = false,
    children,
    onCloseModal,
    savingRecord,
    deletingRecord,
    labelButtonSave,
    labelButtonDelete,
  } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const refModalBody = React.useRef(null);

  useEffect(() => {
    if (show > 0) {
      onOpen();
    } else {
      onCloseModal();
    }
  }, [show]);

  const saveRecord = () => {
    onSave();
  };

  const deleteRecord = () => {
    onDelete();
  };

  const closeModal = () => {
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
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  {showButtonDelete && (
                    <Button
                      color={!allowDelete ? 'default' : 'danger'}
                      onPress={deleteRecord}
                      disabled={!allowDelete}
                      isLoading={deletingRecord}
                    >
                      {labelButtonDelete || 'Delete'}
                    </Button>
                  )}
                  {showButtonSave && (
                    <Button
                      color={!allowSave ? 'default' : 'primary'}
                      onPress={saveRecord}
                      disabled={!allowSave}
                      isLoading={savingRecord}
                    >
                      {labelButtonSave || 'Save'}
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

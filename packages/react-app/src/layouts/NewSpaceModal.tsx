import { modalAtomFamily } from '@state/atoms';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { Button, Modal, TextInput } from 'ui';

const NewSpaceModal = () => {
  const [show, setShow] = useAtom(modalAtomFamily('new-page-modal'));

  const handleHide = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header>
        <Modal.Title title="Add Space" subtitle="Spaces let you group items" />
        <Modal.CloseButton onHide={handleHide} />
      </Modal.Header>
      <Modal.Body>
        <TextInput.Label htmlFor="new-space-modal-name" text="Name" />
        <TextInput
          id="new-space-modal-name"
          placeholder="Space name"
          leftItem={<Button.Icon icon="emoji" iconProps={{ size: 20 }} />}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button label="Cancel" variant="secondary" onClick={handleHide} />
        <Button label="Save" />
      </Modal.Footer>
    </Modal>
  );
};

export default NewSpaceModal;

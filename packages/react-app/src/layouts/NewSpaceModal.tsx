import { queryClient } from '@data';
import { createSpace } from '@data/mutation';
import { fetchSpaces } from '@data/query';
import { Space } from '@data/types';
import { modalAtomFamily } from '@state/atoms';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { Button, Modal, TextInput } from 'ui';

interface FormState {
  emoji: string;
  title: string;
}

const NewSpaceModal = () => {
  const [formState, setFormState] = useState<FormState>({
    emoji: '',
    title: '',
  });
  const [show, setShow] = useAtom(modalAtomFamily('new-page-modal'));

  const { data } = useQuery({
    queryKey: ['spaces'],
    queryFn: fetchSpaces,
  });

  const { mutate } = useMutation<Space, Error, Partial<Space>>({
    mutationFn: createSpace,
    onSuccess(data) {
      queryClient.setQueryData<Space[]>(['spaces'], (prev) =>
        prev ? [...prev, data] : [data],
      );
    },
  });

  const handleHide = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (
        formState.title.length > 0 &&
        !data?.find((space) => space.title === formState.title)
      ) {
        mutate({
          title: formState.title,
          emoji: '🙂',
          slug: formState.title.toLowerCase().replace(' ', '_'),
        });
        setShow(false);
      }
    },
    [data, formState, mutate, setShow],
  );

  return (
    <Modal show={show} onHide={handleHide}>
      <form onSubmit={handleSubmit}>
        <Modal.Header>
          <Modal.Title
            title="Add Space"
            subtitle="Spaces let you group items"
          />
          <Modal.CloseButton onHide={handleHide} />
        </Modal.Header>
        <Modal.Body>
          <TextInput.Label htmlFor="new-space-modal-name" text="Name" />
          <TextInput
            id="new-space-modal-name"
            placeholder="Space name"
            leftItem={<Button.Icon icon="emoji" iconProps={{ size: 20 }} />}
            onChange={(title) => setFormState((prev) => ({ ...prev, title }))}
            value={formState.title}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button label="Cancel" variant="secondary" onClick={handleHide} />
          <Button label="Save" type="submit" />
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default NewSpaceModal;

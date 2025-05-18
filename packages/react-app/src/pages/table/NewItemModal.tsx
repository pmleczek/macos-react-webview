import { useCallback, useState } from "react";
import { emitWithResponse } from "ipc";

import type { NewItemModalProps, SampleItem } from "./types";
import { Button, Modal, TextInput } from "@components";
import { EventType } from "@utils/constants";
import styles from "./index.module.css";

interface FormState {
  id: string;
  date: string;
  emoji: string;
  price: string;
}

const initialState: FormState = {
  id: "",
  date: "",
  emoji: "",
  price: "",
};

const NewItemModal = ({ onSuccess, show, setShow }: NewItemModalProps) => {
  const [state, setState] = useState<FormState>(initialState);

  const handleChange = useCallback(
    (field: keyof FormState) => (value: string) => {
      setState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleCancel = useCallback(() => {
    setState(initialState);
    setShow(false);
  }, [setShow]);

  const handleCreate = useCallback(async () => {
    const response = await emitWithResponse(
      EventType.DATA_CREATE_ITEM,
      EventType.DATA_CREATE_ITEM_REPONSE,
      state
    );

    if (response && typeof response === "object") {
      onSuccess(response as SampleItem);
    }
    setState(initialState);
    setShow(false);
  }, [onSuccess, state, setShow]);

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Container className={styles.create_modal}>
        <Modal.Header onHide={() => setShow(false)} title="New item" />
        <div className={styles.create_modal_body}>
          <TextInput
            label="Item id"
            onChange={handleChange("id")}
            maxLength={8}
            placeholder="abcd1234"
            value={state.id}
          />
          <TextInput
            label="Date"
            onChange={handleChange("date")}
            maxLength={10}
            placeholder="MM/DD/YYYY"
            value={state.date}
          />
          <TextInput
            label="Emoji"
            onChange={handleChange("emoji")}
            maxLength={1}
            placeholder="Emoji"
            value={state.emoji}
          />
          <TextInput
            label="Price"
            onChange={handleChange("price")}
            placeholder="$123.45"
            value={state.price}
          />
        </div>
        <Modal.Footer>
          <Button label="Cancel" onClick={handleCancel} />
          <Button label="Create" onClick={handleCreate} />
        </Modal.Footer>
      </Modal.Container>
    </Modal>
  );
};

export default NewItemModal;

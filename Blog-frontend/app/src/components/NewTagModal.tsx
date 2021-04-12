import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { createNewTag } from '../api/backend';

const NewTagModal = (props) => {
  const [newTag, setNewTag] = useState<string>('');

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Input the name the of the tag you wish to create. Make sure it doesn't already exist.</p>
        <input
          onChange={(e) => setNewTag(e.target.value)}
          autoFocus={true}
          id="create-tag"
          name="text"
          className="form-control form-control-lg form-control-title"
          type="text"
          placeholder="Name of new tag..."
          autoComplete="off"
        />
        <Button
          type="button"
          variant="danger mt-3"
          onClick={() => {
            createNewTag(newTag);
          }}
        >
          Create
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewTagModal;

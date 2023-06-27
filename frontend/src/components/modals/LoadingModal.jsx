import React from "react";
import { Modal, Spinner } from "react-bootstrap";

export default function LoadingModal({ show, setShow }) {
  return (
    <Modal centered show={show} onHide={() => setShow(false)}>
      <Modal.Body>
        <div className="text-center p-3">
          <div className="mb-3 icon-2 mx-auto">
            <img
              className="d-block h-100 w-100"
              src="/assets/img/icon/help.png"
              alt="..."
            />
          </div>
          <h5 className="mb-2 fw-semibold">Starting to Process Your Request</h5>
          <p className="mb-2 small text-black-50">
            <small>Please wait while the little evles take you three</small>
          </p>
          <Spinner animation="grow" variant="primary" />
        </div>
      </Modal.Body>
    </Modal>
  );
}

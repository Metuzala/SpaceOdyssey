import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { makeReservation } from '../../API';

function ReservationForm({checkedFlights, reservationDate}) {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (reservationDate) setShow(true);
  }, [reservationDate]);

  const handleClose = () => { setShow(false) };
  const submitReservation = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const customerInfo = Object.fromEntries(formData.entries());
    makeReservation(checkedFlights, reservationDate, customerInfo).then(() => {
        navigate('/reserv');
    });

  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className='reservation-modal'>
        <Modal.Header closeButton>
          <Modal.Title className='text-warning'>Flight Reservation</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitReservation}>
            <Modal.Body>
            
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className='text-warning'>First Name</Form.Label>
                <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="Name"
                    autoFocus
                    required
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className='text-warning'>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="Surname"
                    required
                />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="warning" type="submit">
                    Done
                </Button>
            </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ReservationForm;
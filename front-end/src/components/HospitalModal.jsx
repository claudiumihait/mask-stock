import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import '../css/HospitalModal.css';

const renderSwitch = (word, object) => {
  switch (word) {
    case "Address":
      return <>
        <td>{word}</td>
        <td>{object.address.city}</td>
        <td>{object.address.address}</td>
      </>;
    case "Taxcode":
      return <>
        <td>{word}</td>
        <td>{object.taxcode}</td>
      </>;
    case "Tax Type":
      return <>
        <td>{word}</td>
        <td>{object.tax_type}</td>
      </>;
    case "Iban":
      return <>
        <td>{word}</td>
        <td>{object.iban}</td>
      </>;
    case "Swift":
      return <>
        <td>{word}</td>
        <td>{object.swift}</td>
      </>;
    case "Account Number":
      return <>
        <td>{word}</td>
        <td>{object.account_number}</td>
      </>;
    case "Phone":
      return <>
        <td>{word}</td>
        <td>{object.phone}</td>
      </>;
    case "Emails":
      return <>
        <td>{word}</td>
        {object.emails.map((item, index) => <td key={index}>{item}</td>)}
      </>;
  }
}

const tableData = (word, data) => {
  // console.log(data)
  return (
    <tr>
      {/* {renderSwitch(word, data)} */}
    </tr>
  )
}


const HospitalModal = (props) => {
  return (
    <Modal size="lg" show={props.show} onHide={props.handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {props.columns.map((word) => { return tableData (word, props.data)})}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  )
}

export default HospitalModal

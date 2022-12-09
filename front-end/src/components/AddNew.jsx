import React, { useState, useRef, usesetFields, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import baseLogo from "../../src/images/register_logo.png";
import succesfulLogo from "../../src/images/succesful.gif";
import Alert from "react-bootstrap/Alert";

const AddNew = () => {
  const [formData, setFormData] = useState({
    name: "",
    users: [{ email: "", admin: false }],
    address: {
      country_code: "",
      post_code: "",
      city: "",
      address: "",
    },
    emails: [],
    taxcode: "",
    iban: "",
    swift: "",
    account_number: "",
    phone: "",
    general_ledger_number: "999",
    tax_type: "",
    custom_billing_settings: {
      payment_method: "aruhitel",
      document_form: "electronic",
      due_days: 0,
      document_currency: "AED",
      template_language_code: "de",
      discount: {
        type: "percent",
        value: 0,
      },
    },
    group_member_tax_number: "999",
  });
  const [hospitalEmailsFields, setHospitalsEmailsFields] = useState([
    { value: "" },
  ]);
  const [usersEmailsFields, setUsersEmailsFields] = useState([{ value: "" }]);
  const [successMessage, setSuccessMessage] = useState("");
  const [validForm, setValidForm] = useState(false);

  const addNewInputField = (whoseFields, setFields) =>
    setFields([...whoseFields, { value: "" }]);

  const removeInputField = (whoseFields, i, property, setFields) => {
    setFields(whoseFields.filter((_, index) => index !== i));
    const newFormData = { ...formData };
    newFormData[property].splice(i, 1);
    updateForm(newFormData);
  };

  const handleEmails = (whoseFields, e, i, property, setFields) => {
    const newFormData = { ...formData };
    property === "emails"
      ? (newFormData[property][i] = e.target.value)
      : (newFormData[property][i] = { email: e.target.value, admin: false });
    updateForm(newFormData);
    const newEmailFields = [...whoseFields];
    newEmailFields[i].value = e.target.value;
    setFields(newEmailFields);
  };

  const handleUserRights = (i) => {
    const newFormData = { ...formData };
    newFormData.users[i] = {
      ...newFormData.users[i],
      admin: !newFormData.users[i].admin,
    };
    updateForm(newFormData);
  };

  const updateForm = (value) =>
    setFormData((prev) => {
      return { ...prev, ...value };
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHospital = { ...formData };
    fetch("http://localhost:9000/api/hospitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHospital),
    })
      .then((res) => res.json())
      .then((message) => {
        setSuccessMessage(message);
        setFormData({
          name: "",
          users: [{ email: "", admin: false }],
          address: {
            country_code: "",
            post_code: "",
            city: "",
            address: "",
          },
          emails: [],
          taxcode: "",
          iban: "",
          swift: "",
          account_number: "",
          phone: "",
          general_ledger_number: "999",
          tax_type: "",
          custom_billing_settings: {
            payment_method: "aruhitel",
            document_form: "electronic",
            due_days: 0,
            document_currency: "AED",
            template_language_code: "de",
            discount: {
              type: "percent",
              value: 0,
            },
          },
          group_member_tax_number: "999",
        });
      })
      .catch((e) => window.alert(e));
  };

  const isFormValid = () => {
    const {
      name,
      users,
      address: { country_code },
      address: { post_code },
      address: { city },
      address: { address },
      emails,
      taxcode,
      iban,
      swift,
      account_number,
      phone,
    } = formData;

    return (
      name !== "" &&
      users !== [] &&
      country_code !== "" &&
      post_code !== "" &&
      city !== "" &&
      address !== "" &&
      emails !== [] &&
      taxcode !== "" &&
      iban !== "" &&
      swift !== "" &&
      account_number !== "" &&
      phone !== ""
    );
  };

  useEffect(() => {
    setValidForm(isFormValid());
    console.log(formData);
  }, [formData]);

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col
          // style={{ padding: "0" }}
          // lg={{ span: 4, offset: 4 }}
          // md={{ span: 6, offset: 3 }}
          // xs={{ span: 8, offset: 2 }}
          sm={6} md={6} lg={6}
        >
          <Card
            bg="dark"
            text="white"
            style={{
              marginTop: "2rem",
              marginBottom: "2rem",
              border: "0",
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}
            className="d-flex flex-column"
          >
            <Card.Img
              variant="top"
              src={!successMessage ? baseLogo : succesfulLogo}
              style={{ width: "50%", marginLeft: "25%" }}
            />
            <Card.Body>
              <Card.Title style={{ textAlign: "center", marginBottom: "2rem" }}>
                Add new hospital
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={formData.name}
                    placeholder="Enter hospital name"
                    onChange={(e) =>
                      updateForm({ ...formData, name: e.target.value })
                    }
                  />
                  <Form.Text>Hospital name</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicContact">
                  <Form.Label>Contact details</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={formData.address.country_code}
                    placeholder="Enter country code"
                    onChange={(e) =>
                      updateForm({
                        address: {
                          ...formData.address,
                          country_code: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Text>Country Code</Form.Text>
                  <Form.Control
                    required
                    type="text"
                    value={formData.address.post_code}
                    placeholder="Enter postal code"
                    onChange={(e) =>
                      updateForm({
                        ...formData,
                        address: {
                          ...formData.address,
                          post_code: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Text>Postal code</Form.Text>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter city"
                    value={formData.address.city}
                    onChange={(e) =>
                      updateForm({
                        ...formData,
                        address: {
                          ...formData.address,
                          city: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Text>City</Form.Text>
                  <Form.Control
                    required
                    type="text"
                    value={formData.address.address}
                    placeholder="Enter address"
                    onChange={(e) =>
                      updateForm({
                        ...formData,
                        address: {
                          ...formData.address,
                          address: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Text>Address</Form.Text>
                  <Form.Control
                    required
                    type="text"
                    value={formData.phone}
                    placeholder="Enter phone number"
                    onChange={(e) =>
                      updateForm({
                        ...formData,
                        phone: e.target.value,
                      })
                    }
                  />
                  <Form.Text>Phone number</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicHospitalEmail">
                  <Form.Label>Hospital emails</Form.Label>
                  {hospitalEmailsFields.map((_, i) => (
                    <div className="d-flex" key={i}>
                      <Form.Control
                        className="mx-1 my-1"
                        required
                        type="text"
                        value={formData.emails[i] || ""}
                        placeholder="Enter hospital email"
                        onChange={(e) =>
                          handleEmails(
                            hospitalEmailsFields,
                            e,
                            i,
                            "emails",
                            setHospitalsEmailsFields
                          )
                        }
                      />
                      <Button
                        className="mx-1 my-1"
                        variant="primary"
                        size="sm"
                        color="blue"
                        data-index={i}
                        onClick={() =>
                          removeInputField(
                            hospitalEmailsFields,
                            i,
                            "emails",
                            setHospitalsEmailsFields
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="d-flex justify-content-center">
                    <Button
                      className="mx-1 my-3"
                      variant="primary"
                      size="sm"
                      color="blue"
                      onClick={() =>
                        addNewInputField(
                          hospitalEmailsFields,
                          setHospitalsEmailsFields
                        )
                      }
                    >
                      Add new hospital email
                    </Button>
                  </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicBankDetails">
                  <Form.Label>Bank Details</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={formData.taxcode}
                    placeholder="Enter tax code"
                    onChange={(e) =>
                      updateForm({
                        ...formData,
                        taxcode: e.target.value,
                      })
                    }
                  />
                  <Form.Text>Tax Code</Form.Text>
                  <Form.Control
                    required
                    type="text"
                    value={formData.iban}
                    placeholder="Enter IBAN"
                    onChange={(e) =>
                      updateForm({
                        ...formData,
                        iban: e.target.value,
                      })
                    }
                  />
                  <Form.Text>IBAN</Form.Text>
                  <Form.Control
                    required
                    type="text"
                    value={formData.swift}
                    placeholder="Enter SWIFT Code"
                    onChange={(e) =>
                      updateForm({
                        ...formData,
                        swift: e.target.value,
                      })
                    }
                  />
                  <Form.Text>SWIFT</Form.Text>
                  <Form.Control
                    required
                    type="text"
                    value={formData.account_number}
                    placeholder="Enter account number"
                    onChange={(e) =>
                      updateForm({
                        ...formData,
                        account_number: e.target.value,
                      })
                    }
                  />
                  <Form.Text>Account Number</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUserEmail">
                  <Form.Label>Users emails</Form.Label>
                  {usersEmailsFields.map((_, i) => (
                    <div className="d-flex align-items-center" key={i}>
                      <Form.Control
                        className="mx-1 my-1"
                        required
                        type="email"
                        value={formData.users[i]?.email || ""}
                        placeholder="Enter user email"
                        onChange={(e) =>
                          handleEmails(
                            usersEmailsFields,
                            e,
                            i,
                            "users",
                            setUsersEmailsFields
                          )
                        }
                      />
                      <Form.Check
                        className="mx-3"
                        checked={formData.users[i]?.admin || false}
                        type="switch"
                        id={`custom-switch-${i}`}
                        label="Admin"
                        onChange={() => handleUserRights(i)}
                      />
                      <Button
                        className="mx-1 my-1"
                        variant="primary"
                        size="sm"
                        color="blue"
                        data-index={i}
                        onClick={() =>
                          removeInputField(
                            usersEmailsFields,
                            i,
                            "users",
                            setUsersEmailsFields
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="d-flex justify-content-center">
                    <Button
                      className="mx-1 my-3"
                      variant="primary"
                      size="sm"
                      color="blue"
                      onClick={() =>
                        addNewInputField(usersEmailsFields, setUsersEmailsFields)
                      }
                    >
                      Add new user email
                    </Button>
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    disabled={!validForm}
                    style={{ marginTop: "1rem" }}
                    onClick={(e) => handleSubmit(e)}
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
                <Form.Text
                  className="d-flex justify-content-center text-center"
                  style={{
                    fontSize: "16px",
                    color: "white",
                    marginTop: "1rem",
                  }}
                >
                  {successMessage.includes("Success") ? (
                    <Alert key="succes" variant="success">
                      {successMessage} Click{" "}
                      <Alert.Link href="/order">here</Alert.Link> to place an order
                    </Alert>
                  ) : successMessage.includes("wrong") ? (
                    <Alert key="danger" variant="danger">
                      {successMessage}
                    </Alert>
                  ) : (
                    ""
                  )}
                </Form.Text>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNew;

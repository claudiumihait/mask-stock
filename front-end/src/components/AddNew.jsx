import React, { useState, useRef, usesetFields, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import baseLogo from "../../src/images/register_logo.png";
import succesfulLogo from "../../src/images/succesful.gif";

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
    setFormData(newFormData);
  };

  const handleEmails = (whoseFields, e, i, property, setFields) => {
    const newFormData = { ...formData };
    property === "emails"
      ? (newFormData[property][i] = e.target.value)
      : (newFormData[property][i] = { email: e.target.value, admin: false });
    setFormData(newFormData);
    const newEmailFields = [...whoseFields];
    newEmailFields[i].value = e.target.value;
    setFields(newEmailFields);
  };

  const handleUserRights = (i) => {
    const newFormData = { ...formData };
    newFormData.users[i] = { ...newFormData.users[i], admin: true };
    setFormData(newFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9000/api/hospitals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((message) => setSuccessMessage(message))
      .catch((e) => console.log(e));
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
  }, [formData]);

  return (
    <Col
      style={{ padding: "0" }}
      lg={{ span: 4, offset: 4 }}
      md={{ span: 6, offset: 3 }}
      xs={{ span: 8, offset: 2 }}
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
          src={baseLogo}
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
                placeholder="Enter hospital name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Form.Text>Hospital name</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicContact">
              <Form.Label>Contact details</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter country code"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: {
                      ...formData.address,
                      country_code: e.target.value.toUpperCase(),
                    },
                  })
                }
              />
              <Form.Text>Country Code</Form.Text>
              <Form.Control
                required
                type="text"
                placeholder="Enter postal code"
                onChange={(e) =>
                  setFormData({
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
                onChange={(e) =>
                  setFormData({
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
                placeholder="Enter address"
                onChange={(e) =>
                  setFormData({
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
                placeholder="Enter phone number"
                onChange={(e) =>
                  setFormData({
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
                placeholder="Enter tax code"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    taxcode: e.target.value,
                  })
                }
              />
              <Form.Text>Tax Code</Form.Text>
              <Form.Control
                required
                type="text"
                placeholder="Enter IBAN"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    iban: e.target.value,
                  })
                }
              />
              <Form.Text>IBAN</Form.Text>
              <Form.Control
                required
                type="text"
                placeholder="Enter SWIFT Code"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    swift: e.target.value,
                  })
                }
              />
              <Form.Text>SWIFT</Form.Text>
              <Form.Control
                required
                type="text"
                placeholder="Enter account number"
                onChange={(e) =>
                  setFormData({
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
                    type="text"
                    //value={formData.users[i].email || ""}
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
              {successMessage ? successMessage : ""}
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AddNew;

import React, { useState, useRef, useCallback, useEffect } from "react";
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
  const [emailFields, setEmailFields] = useState([{ value: "" }]);
  const [successMessage, setSuccessMessage] = useState("test");
  const [successCondition, setSuccessCondition] = useState(false);

  const addFormField = () => {
    setEmailFields([...emailFields, { value: "" }]);
  };

  const handleRemoveField = (i) => {
    setEmailFields(emailFields.filter((_, index) => index !== i));
    const newFormData = { ...formData };
    newFormData.emails.splice(i, 1);
    setFormData(newFormData);
  };

  const handleInputChange = (e, i) => {
    const newFormData = { ...formData };
    newFormData.emails[i] = e.target.value;
    setFormData(newFormData);
    const newEmailFields = [...emailFields];
    newEmailFields[i].value = e.target.value;
    setEmailFields(newEmailFields);
  };

  const handleSubmit = () => {
    //TODO
    };
    
  //   useEffect(() => {
  //     console.log("form data in useeffect", formData.emails);
  //   }, [formData]);

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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Emails</Form.Label>
              {emailFields.map((_, i) => (
                <div className="d-flex" key={i}>
                  {console.log("ss")}
                  <Form.Control
                    className="mx-1 my-1"
                    required
                    type="text"
                    value={formData.emails[i]}
                    placeholder="Enter email"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <Button
                    className="mx-1 my-1"
                    variant="primary"
                    size="sm"
                    color="blue"
                    data-index={i}
                    onClick={() => handleRemoveField(i)}
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
                  onClick={() => addFormField()}
                >
                  Add new email
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
              <Form.Control type="text" placeholder="Enter SWIFT Code" />
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
            <div className="d-flex justify-content-center">
              <Button
                disabled={successCondition}
                style={{ marginTop: "1rem" }}
                onClick={(e) => handleSubmit(e)}
                variant="primary"
                type="submit"
              >
                Add new
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
              {successMessage}
            </Form.Text>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AddNew;

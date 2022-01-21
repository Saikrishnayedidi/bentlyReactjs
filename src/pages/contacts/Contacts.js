import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../Shared/Button/Button";
import Error from "../../Shared/errors/Error";
import Header from "../../Shared/Header/Header";

const Contacts = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    firstName1: "",
    lastName1: "",
    email1: "",
    phoneNumber1: "",
    firstName2: "",
    lastName2: "",
    email2: "",
    phoneNumber2: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    firstName1: "",
    lastName1: "",
    email1: "",
    phoneNumber1: "",
    firstName2: "",
    lastName2: "",
    email2: "",
    phoneNumber2: "",
  });
  useEffect(() => {
    axios.get("/contacts.json").then((res) => {
      for (let item in res.data) {
        let array = [];
        array.push(res.data[item]);

        array.forEach((res) => {
          const { contacts } = res;

          setContacts({
            firstName: contacts.firstName,
            lastName: contacts.lastName,
            email: contacts.email,
            phoneNumber: contacts.phoneNumber,
            firstName1: contacts.firstName,
            lastName1: contacts.lastName,
            email1: contacts.email,
            phoneNumber1: contacts.phoneNumber,
            firstName2: contacts.firstName2,
            lastName2: contacts.lastName2,
            email2: contacts.email2,
            phoneNumber2: contacts.phoneNumber2,
          });
        });
      }
    });
  }, []);
  const accountsHandler = (e) => {
    var { name, value, dataset } = e.target;
    if (dataset.valid === "firstName" || dataset.valid === "lastName") {
      setContacts({ ...contacts, [name]: value });
      if (contacts[name].length < 0) {
        setErrors({ ...errors, [name]: "field should not b empty" });
      } else if (contacts[name].length < 5) {
        setErrors({
          ...errors,
          [name]: `${name} should b more then 5 characters`,
        });
      } else {
        setErrors({
          ...errors,
          [name]: "",
        });
      }
    }

    if (dataset.valid === "email") {
      setContacts({ ...contacts, [name]: value });
      let pattren = /[a-z]+@gmail\.com/;
      let email = e.target.value;

      if (pattren.test(email)) {
        setErrors({
          ...errors,
          [name]: "",
        });
      } else {
        setErrors({
          ...errors,
          [name]: `invalid ${name} `,
        });
      }
    }
    if (dataset.valid === "phoneNumber") {
      const formattedPhoneNumber = formatPhoneNumber(e.target.value);
      setContacts({ ...contacts, [name]: value });

      setContacts({ ...contacts, [name]: formattedPhoneNumber });
    }
  };
  function formatPhoneNumber(value) {
    if (!value) return value;

    let phoneNumber = value.replace(/[^\d]/g, "");

    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;

    if (phoneNumberLength < 7) {
      return (phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3
      )}`);
    }

    return (phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`);
  }
  const contactFormHandler = () => {
    setLoading(true);
    setError(null);
    setTimeout(async () => {
      try {
        const responce = await axios.post("/contacts.json", { contacts });
        console.log(responce);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }, 3000);

    setContacts({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      firstName1: "",
      lastName1: "",
      email1: "",
      phoneNumber1: "",
      firstName2: "",
      lastName2: "",
      email2: "",
      phoneNumber2: "",
    });
  };
  return (
    <>
      <div className="container">
        {error && <Error>{error}</Error>}
        {!loading ? (
          <form onSubmit={contactFormHandler}>
            <Header
              title="Contacts"
              progress="completed"
              borderWidth="border-2"
              borderColor="border-success"
            ></Header>
            <p>
              We frequently need dealership guidance on Inventory Feeds, Vehicle
              Pricing and Digital Strategy and Performance. Please provide
              accurate contact information for an expert on each of these topics
              at your dealership.
            </p>

            <Header
              className="mt-3"
              title="Inventory Feed Contact"
              borderWidth="border-1"
              borderColor="border-dark"
            ></Header>
            <div>
              <div className="row">
                <div className="col-3 me-5">
                  <span>First Name</span>
                  <input
                    type="text"
                    name="firstName"
                    data-valid="firstName"
                    value={contacts.firstName}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                  {contacts.firstName && (
                    <span className="text-danger">{errors.firstName}</span>
                  )}
                </div>
                <div className="col-3">
                  <span>Last Name</span>
                  <input
                    type="text"
                    name="lastName"
                    data-valid="lastName"
                    value={contacts.lastName}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                  {contacts.lastName && (
                    <span className="text-danger">{errors.lastName}</span>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3 me-5">
                  <span>Email</span>
                  <input
                    type="text"
                    name="email"
                    data-valid="email"
                    value={contacts.email}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                  {contacts.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="col-3">
                  <span>PhoneNumber</span>
                  <input
                    type="text"
                    name="phoneNumber"
                    data-valid="phoneNumber"
                    value={contacts.phoneNumber}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                </div>
              </div>
            </div>
            <Header
              className="mt-3"
              title="Vehicle Pricing Contact"
              borderWidth="border-1"
              borderColor="border-dark"
            ></Header>
            <div>
              <div className="row">
                <div className="col-3 me-5">
                  <span>First Name</span>
                  <input
                    type="text"
                    name="firstName1"
                    data-valid="firstName"
                    value={contacts.firstName1}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                  {contacts.firstName1 && (
                    <span className="text-danger">{errors.firstName1}</span>
                  )}
                </div>
                <div className="col-3">
                  <span>Last Name</span>
                  <input
                    type="text"
                    name="lastName1"
                    data-valid="lastName"
                    value={contacts.lastName1}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                  {contacts.lastName1 && (
                    <span className="text-danger">{errors.lastName1}</span>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3 me-5">
                  <span>Email</span>
                  <input
                    type="text"
                    name="email1"
                    data-valid="email"
                    value={contacts.email1}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                  {contacts.email1 && (
                    <span className="text-danger">{errors.email1}</span>
                  )}
                </div>
                <div className="col-3">
                  <span>PhoneNumber</span>
                  <input
                    type="text"
                    name="phoneNumber1"
                    data-valid="phoneNumber"
                    value={contacts.phoneNumber1}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                </div>
              </div>
            </div>

            <Header
              className="mt-3"
              title="Digital Strategy & Performance Contact"
              borderWidth="border-1"
              borderColor="border-dark"
            ></Header>
            <div>
              <div className="row">
                <div className="col-3 me-5">
                  <span>First Name</span>
                  <input
                    type="text"
                    name="firstName2"
                    data-valid="firstName"
                    value={contacts.firstName2}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                  {contacts.firstName1 && (
                    <span className="text-danger">{errors.firstName2}</span>
                  )}
                </div>
                <div className="col-3">
                  <span>Last Name</span>
                  <input
                    type="text"
                    name="lastName2"
                    data-valid="lastName"
                    value={contacts.lastName2}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                  {contacts.lastName1 && (
                    <span className="text-danger">{errors.lastName2}</span>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3 me-5">
                  <span>Email</span>
                  <input
                    type="text"
                    name="email2"
                    data-valid="email"
                    value={contacts.email2}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                  {contacts.email1 && (
                    <span className="text-danger">{errors.email2}</span>
                  )}
                </div>
                <div className="col-3">
                  <span>PhoneNumber</span>
                  <input
                    type="text"
                    name="phoneNumber2"
                    data-valid="phoneNumber"
                    value={contacts.phoneNumber2}
                    onChange={(e) => {
                      accountsHandler(e);
                    }}
                    className="form-control  border border-dark py-3 mb-3"
                  />
                </div>
              </div>
            </div>
            <div className="container">
              <Button
                className="mt-5 me-5"
                text="save"
                disabled={false}
                color="rgb(13, 0, 87)"
              ></Button>
            </div>
          </form>
        ) : (
          <h1 className="display-1 ofset-col-4">loading</h1>
        )}
      </div>
    </>
  );
};

export default Contacts;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../Shared/Button/Button";
import Header from "../../Shared/Header/Header";

const Accounts = () => {
  const [submitButton, setSubmitButton] = useState(false);
  const [submitText, setSubmitText] = useState("save");
  const [accounts, setAccounts] = useState({
    webSiteUrls: "",
    websiteProvider: "",
    facebookUrl: "",
    twitterUrl: "",
  });

  const [phoneNumbers, setPhoneNUmbers] = useState({
    callRoutingLineSales: "",
    callRoutingLineService: "",
  });

  const [errors, setErrors] = useState({
    webSiteUrls: false,
    websiteProvider: false,
    facebookUrl: false,
    twitterUrl: false,
  });

  const [errorMessage, seterrorMessage] = useState({
    webSiteUrls: "",
    websiteProvider: "",
    facebookUrl: "",
    twitterUrl: "",
  });

  const [isFormValid, setIsFormValid] = useState({
    webSiteUrls: false,
  });

  const phoneHandler = (e) => {
    console.log(e.target.value);

    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    if (e.target.name === "callRoutingLineSales") {
      setPhoneNUmbers({
        ...phoneNumbers,
        callRoutingLineSales: formattedPhoneNumber,
      });
    }
    if (e.target.name === "callRoutingLineService") {
      setPhoneNUmbers({
        ...phoneNumbers,
        callRoutingLineService: formattedPhoneNumber,
      });
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

  const accountsHandler = (e) => {
    const { name, value } = e.target;
    setAccounts({ ...accounts, [name]: value });

    let url = value;
    let pattren = /^[w]{3}\.[a-z0-9]+\.com$/;

    if (url) {
      if (pattren.test(url)) {
        setErrors({ ...errors, [name]: false });
        setIsFormValid({ ...isFormValid, [name]: true });
      } else if (url.length < 6) {
        setErrors({ ...errors, [name]: true });
        seterrorMessage({
          ...errorMessage,
          [name]: [`${name} url is  wrong`],
        });
      } else {
        setErrors({ ...errors, [name]: false });
      }
    } else {
      setErrors({ ...errors, [name]: true });
    }
  };
  const accountSubmitHandler = (e) => {
    e.preventDefault();
    setSubmitText("loading");
    if (!isFormValid.webSiteUrls) {
      alert("from is not submited");
      return;
    }
    setSubmitButton(true);
    setTimeout(() => {
      axios
        .post("/accounts.json", {
          accounts: accounts,
          phoneNumbers: phoneNumbers,
        })
        .then((res) => {
          if (!res.status === 200) {
            console.log("error");
            setSubmitText("not submited");
          }
          setSubmitButton(false);
          setSubmitText("submited");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, 3000);
    setTimeout(() => {
      setAccounts({
        webSiteUrls: "",
        websiteProvider: "",
        facebookUrl: "",
        twitterUrl: "",
      });
      setPhoneNUmbers({
        callRoutingLineSales: "",
        callRoutingLineService: "",
      });
      setSubmitText("save");
    }, 5000);
  };

  useEffect(() => {
    setTimeout(() => {
      axios.get("/accounts.json").then((res) => {
        if (!res.status === 200) {
          alert("data is not recived");
          return;
        }
        console.log(res);
        for (let item in res.data) {
          let array = [];
          array.push({ ...res.data[item] });
          array.forEach((res) => {
            let accounts = res.accounts;
            let phoneNumber = res.phoneNumbers;
            console.log(res.phoneNumbers);
            setPhoneNUmbers({
              callRoutingLineSales: phoneNumber.callRoutingLineSales,
              callRoutingLineService: phoneNumber.callRoutingLineService,
            });
            setAccounts({
              webSiteUrls: accounts.webSiteUrls,
              websiteProvider: accounts.websiteProvider,
              facebookUrl: accounts.facebookUrl,
              twitterUrl: accounts.twitterUrl,
            });
          });
        }
      });
    }, 1000);
  }, []);

  return (
    <>
      <Header
        title="Accounts"
        progress="Completed"
        borderWidth="border-2"
        borderColor="border-success"
      ></Header>
      <div className="mt-3 container">
        <Header
          title="Dealership Name & Address"
          borderWidth="border-1"
          borderColor="border-dark"
        ></Header>
        <form onSubmit={accountSubmitHandler}>
          <div>
            <div className="row">
              <div className="col-2 fs-5">
                <p>Dealership Name</p>
              </div>
              <div className="col-2 fs-5">
                <p>Test Bentley</p>
              </div>
            </div>
            <div className="row">
              <div className="col-2 fs-5">
                <p>Dealership Address</p>
              </div>
              <div className="col fs-5">
                <p>1297 Parkside Dr Walnut Creek CA,94596-3693</p>
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <select
                  className="form-select border border-dark py-3 mb-3"
                  aria-label="Default select example"
                >
                  <option value="">yes</option>
                  <option value="">no</option>
                  <option value="">3</option>
                </select>
              </div>
              <div className="col-8">
                I confirm this is the correct name and address for use in the
                dealership ad copy and location extensions. If address changes
                are needed, please contact support@teamvelocitymarketing.com
              </div>
            </div>
          </div>

          <Header
            title="Digital Properties"
            borderWidth="border-1"
            borderColor="border-dark"
          ></Header>
          {/* urls */}
          <div className="mt-4 ">
            <div>
              <span>Website URLS</span>
              <div className="col-3 mt-2">
                <input
                  type="text"
                  name="webSiteUrls"
                  value={accounts.webSiteUrls}
                  onChange={(e) => {
                    accountsHandler(e);
                  }}
                  className="form-control  border border-dark py-3 mb-3"
                />
                {errors.webSiteUrls && (
                  <span className="text-danger">
                    {accounts.webSiteUrls} {errorMessage.webSiteUrls}{" "}
                  </span>
                )}
              </div>
            </div>
            <div>
              <span>Website Provider</span>
              <div className="col-3 mt-2">
                <input
                  type="text"
                  name="websiteProvider"
                  value={accounts.websiteProvider}
                  onChange={(e) => {
                    accountsHandler(e);
                  }}
                  className="form-control  border border-dark py-3 mb-3"
                />
                {errors.websiteProvider && (
                  <span className="text-danger">
                    {accounts.websiteProvider} {errorMessage.websiteProvider}{" "}
                  </span>
                )}
              </div>
            </div>
            <div>
              <span>Facebook URL</span>
              <div className="col-3 mt-2">
                <input
                  type="text"
                  name="facebookUrl"
                  value={accounts.facebookUrl}
                  onChange={(e) => {
                    accountsHandler(e);
                  }}
                  className="form-control  border border-dark py-3 mb-3"
                />
                {errors.facebookUrl && (
                  <span className="text-danger">
                    {accounts.facebookUrl} {errorMessage.facebookUrl}{" "}
                  </span>
                )}
              </div>
            </div>
            <div>
              <span>Twitter URL</span>
              <div className="col-3 mt-2">
                <input
                  type="text"
                  name="twitterUrl"
                  value={accounts.twitterUrl}
                  onChange={(e) => {
                    accountsHandler(e);
                  }}
                  className="form-control  border border-dark py-3 mb-3"
                />
                {errors.twitterUrl && (
                  <span className="text-danger">
                    {accounts.twitterUrl} {errorMessage.twitterUrl}{" "}
                  </span>
                )}
              </div>
            </div>
            <Header
              title="Phone Numbers"
              borderWidth="border-1"
              borderColor="border-dark"
            ></Header>
            <p>
              Please enter the phone numbers call tracking numbers should direct
              to. Call tracking numbers will direct to the phone numbers you
              provide below.
            </p>
            <span>Call Routing Line-Sales</span>
            <div className="col-3 mt-2">
              <input
                type="text"
                name="callRoutingLineSales"
                value={phoneNumbers.callRoutingLineSales}
                onChange={(e) => {
                  phoneHandler(e);
                }}
                className="form-control  border border-dark py-3 mb-3"
              />
            </div>
            <span>Call Routing Line-Service</span>
            <div className="col-3 mt-2">
              <input
                type="text"
                name="callRoutingLineService"
                value={phoneNumbers.callRoutingLineService}
                onChange={(e) => {
                  phoneHandler(e);
                }}
                className="form-control  border border-dark py-3 mb-3"
              />
            </div>
          </div>
          <Button
            color="rgb(13, 0, 87)"
            disabled={submitButton}
            text={submitText}
          ></Button>
        </form>
      </div>
    </>
  );
};

export default Accounts;

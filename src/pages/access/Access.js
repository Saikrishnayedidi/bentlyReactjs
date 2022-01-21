import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../Shared/Button/Button";
import Error from "../../Shared/errors/Error";
import Header from "../../Shared/Header/Header";
import styles from "./Access.module.scss";

const Access = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const check1 = useRef();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/access.json");

        const { data } = response;
        for (let item in data) {
          let array = data[item];
          const { isChecked, phoneNum, radio } = array;
          // console.log(isChecked.checked1);
          // if (isChecked.checked1) {
          //   check1.current.checked = true;
          // } else {
          //   check1.current.checked = false;
          // }
          setPhoneNum(phoneNum);
          setRadio(radio);
          setIsChecked({
            checked1: isChecked.checked1,
            checked2: isChecked.checked2,
            checked3: isChecked.checked3,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const [isChecked, setIsChecked] = useState({
    checked1: "",
    checked2: "",
    checked3: "",
  });

  const [radio, setRadio] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [isDisabled, setIsDisabled] = useState();
  const handelChange = (e) => {
    if (e.target.checked) {
      setRadio(e.target.value);
    }
    if (e.target.dataset.name === "check1") {
      if (e.target.checked) {
        setIsDisabled(false);
      }
    }
    if (e.target.dataset.name === "check2") {
      if (e.target.checked) {
        setIsDisabled(true);
      }
    }
  };
  const accessHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTimeout(async () => {
      try {
        const responce = await axios.post("/access.json", {
          isChecked,
          radio,
          phoneNum,
        });
        const states = responce.status;
        if (!states === 200) {
          console.log("error");
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
    }, 3000);

    setTimeout(() => {
      setIsChecked({
        checked1: "",
        checked2: "",
        checked3: "",
      });
      setRadio(null);
      setPhoneNum("");
    }, 5000);
  };
  const checkMethod = (e) => {
    if (e.target.checked) {
      setIsChecked({ ...isChecked, [e.target.dataset.name]: e.target.value });
    } else {
      setIsChecked({
        ...isChecked,
        [e.target.dataset.name]: "",
      });
    }

    console.log(isChecked);
  };
  return (
    <>
      <Header
        title="Access"
        borderColor="border-danger"
        borderWidth="border-2"
        progress="Not completed"
      ></Header>
      <div className="container">
        <Header
          title="Grant Access"
          borderColor="border-dark"
          borderWidth="border-1"
        ></Header>

        <div className="mt-3">
          {error && <Error>{error}</Error>}
          {!loading ? (
            <form onSubmit={accessHandler}>
              <div className="container m-2">
                <input
                  className={`form-check-input ${styles.readio}`}
                  type="checkBox"
                  ref={check1}
                  value="checked1"
                  name="checked1"
                  data-name="checked1"
                  checked={isChecked.checked1}
                  onChange={checkMethod}
                  //  checked={isChecked===1}
                  //  onChange={(e) => {
                  //    setIsChecked((prev) => {
                  //      return [...prev, e.target.value];
                  //    });
                  //  }}
                  id="flexRadioDefault1"
                />
                <label
                  className="form-check-label ms-4 text-muted"
                  htmlFor="flexRadioDefault1"
                >
                  Facebook - Page Admin Access
                </label>
                <p className="ms-5">
                  Required to run Facebook Ads. Team Velocity will send a
                  request from Data Driven Holdings. Access must be granted by
                  your Facebook Business Manager.
                </p>
              </div>

              <div className="container m-2">
                <input
                  className={`form-check-input ${styles.readio} check`}
                  type="checkBox"
                  value="2"
                  data-name="checked2"
                  checked={isChecked.checked2}
                  onChange={checkMethod}
                  id="flexRadioDefault2"
                  name="checked1"
                />
                <label
                  className="form-check-label ms-4 text-muted"
                  htmlFor="flexRadioDefault2"
                >
                  Google My Business - Manager Access (Site Manager Access is
                  not sufficient)
                </label>
                <p className="ms-5">
                  Required to enable Location Extensions and more. Foundation
                  will send a request for you to accept from
                  digitallocationstier10@gmail.com
                </p>
              </div>
              <div className="container m-2">
                <input
                  className={`form-check-input ${styles.readio}`}
                  type="checkBox"
                  value="3"
                  data-name="checked3"
                  checked={isChecked.checked3}
                  onChange={checkMethod}
                  id="flexRadioDefault3"
                  name="checked1"
                />
                <label
                  className="form-check-label ms-4 text-muted"
                  htmlFor="flexRadioDefault3"
                >
                  Google Analytics - Edit Access
                </label>
                <p className="ms-5">
                  Strongly recommended for measurement and optimization. You
                  will need to initiate. Please grant Edit Access at the
                  Property Level to
                </p>
                <p className="p ms-5">
                  TeamVDealerAnalytics6@gmail.com. See Google's Instructions For
                  Adding Users.
                </p>
              </div>
              {/* <!-- radio --> */}
              <div className="container m-2">
                <p>Google Ads Account Preferences (select one)</p>
                <div className={`ms-4 ${styles.radio1}`}>
                  <input
                    className={`form-check-input ${styles.readio}`}
                    type="radio"
                    checked={radio === "textArea"}
                    data-name="check1"
                    value="textArea"
                    onChange={handelChange}
                    name="radio"
                  />

                  <label
                    className="form-check-label ms-4"
                    htmlFor="flexRadioDefault1"
                  >
                    Use My existing Google Ads accounts. The 10-digit customer
                    ID is:
                  </label>
                  <div className={`col-3 ${styles.radioText}`}>
                    <input
                      type="text"
                      disabled={isDisabled}
                      value={phoneNum}
                      onChange={(e) => {
                        setPhoneNum(e.target.value);
                      }}
                      className="form-control border border-dark py-3 mb-3"
                    />
                  </div>
                  <p className="ms-5 mt-3">
                    You must have Admin Access to approve Team Velocity’s
                    request to link your existing account to the Team Velocity
                    MCC. You will not be able to manage non-Team Velocity
                    campaigns in the account alongside our dynamic campaigns.
                  </p>
                </div>

                <div className="ms-4">
                  <input
                    className={`form-check-input ${styles.readio}`}
                    type="radio"
                    checked={radio === "Create a new Google Ads account for me"}
                    onChange={handelChange}
                    name="radio"
                    data-name="check2"
                    value="Create a new Google Ads account for me"
                  />

                  <label
                    className="form-check-label ms-4"
                    htmlFor="flexRadioDefault1"
                  >
                    Create a new Google Ads account for me
                  </label>
                </div>
              </div>
              <Button
                text="save"
                color="rgb(13, 0, 87)"
                disabled={false}
              ></Button>
            </form>
          ) : (
            <h1>loading</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Access;

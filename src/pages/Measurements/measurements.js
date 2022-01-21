import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../Shared/Button/Button";
import Error from "../../Shared/errors/Error";
import Header from "../../Shared/Header/Header";
import styles from "./Measurements.module.scss";

const Measurements = () => {
  const [check, setCheck] = useState();
  const [textArea, setTextArea] = useState();

  const [isDisabled, setIsDisabled] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("/measurements.json").then((res) => {
      for (let item in res.data) {
        let array = [];
        console.log(res.data);
        array.push({ ...res.data[item] });

        array.forEach((res) => {
          const { check, textArea } = res;
          if (check === "check1") {
            setIsDisabled(true);
          } else {
            setIsDisabled(false);
          }
          setCheck(check);
          setTextArea(textArea);
        });
      }
    });
  }, []);

  const measurementsHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTimeout(async () => {
      try {
        const responce = await axios.post("/measurements.json", {
          check,
          textArea,
        });
        console.log(responce);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }, 3000);

    setCheck("");
    setTextArea("");
    setIsDisabled(false);
  };

  const handelChange = (e) => {
    if (e.target.checked) {
      setCheck(e.target.value);
    }
    if (e.target.dataset.name === "check1") {
      if (e.target.checked) {
        setIsDisabled(true);
      }
    }
    if (e.target.dataset.name === "check2") {
      if (e.target.checked) {
        setIsDisabled(false);
      }
    }
  };
  return (
    <>
      <Header
        title="Measurements"
        progress="completed"
        borderWidth="border-2"
        borderColor="border-danger"
      ></Header>
      {error && <Error>{error}</Error>}

      {!loading ? (
        <form onSubmit={measurementsHandler}>
          <div className="container">
            <p>
              By default, once you grant us Edit Access to your Google Analytics
              account, Foundation will create a new Google Analytics View to
              measure Foundation-Recommended goals based on the functionality
              available on your website. This will be linked to your Google Ads
              account and used to measure success and inform optimization
              strategies. This added measurement service is complementary.
            </p>
            <div className="container m-2">
              <input
                className={`form-check-input ${styles.readio}`}
                type="radio"
                data-name="check1"
                name="flexRadioDefault"
                value="check1"
                checked={check === "check1"}
                onChange={(e) => {
                  handelChange(e);
                }}
              />

              <label
                className="form-check-label ms-4"
                htmlFor="flexRadioDefault1"
              >
                Recommended-Create a Foundation Google Analytics View and Goals
                for me
              </label>
            </div>
            <p className={`${styles.or} fs-5`}>OR</p>

            <div className="container m-2">
              <input
                className={`form-check-input ${styles.readio}`}
                type="radio"
                data-name="check2"
                name="flexRadioDefault"
                value="check2"
                checked={check === "check2"}
                onChange={(e) => {
                  handelChange(e);
                }}
              />
              <label
                className="form-check-label ms-4"
                htmlFor="flexRadioDefault1"
              >
                OPT OUT-Do not Create a Foundation Google Analytics View or
                Goals for me
              </label>
            </div>

            <p>
              If Opting Out, please explain why and whether you have an existing
              Google Analytics View you would like Foundation to reference for
              measurement & optimization guidance.
            </p>
            <div className="input-group">
              <div>
                <textarea
                  disabled={isDisabled}
                  className="form-control border border-dark"
                  value={textArea}
                  cols="100"
                  rows="7"
                  onChange={(e) => {
                    setTextArea(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <Button
              text="save"
              disabled={false}
              color="rgb(13, 0, 87)"
            ></Button>
          </div>
        </form>
      ) : (
        <h1>loading</h1>
      )}
    </>
  );
};

export default Measurements;

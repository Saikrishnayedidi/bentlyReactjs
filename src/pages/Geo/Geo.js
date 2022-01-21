import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Error from "../../Shared/errors/Error";
import Header from "../../Shared/Header/Header";

const Geo = () => {
  const [profitCenterNew, setProfitCenterNew] = useState({
    include: "",
    exclude: "",
  });
  const [profitCenterUsed, setProfitCenterNewUsed] = useState({
    check: "",
    include: "",
    exclude: "",
  });
  const [profitCenterService, setProfitCenterNewService] = useState({
    check: "",
    include: "",
    exclude: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const check1 = useRef();
  const checkServie = useRef();
  const [isValidUsed, setIsValidUsed] = useState(false);
  const [isValidService, setIsValidService] = useState(false);
  useEffect(() => {
    axios.get("/geo.json").then((res) => {
      for (let item in res.data) {
        let array = [];
        array.push({ ...res.data[item] });
        array.forEach((res) => {
          const { profitCenterService, profitCenterUsed, profitCenterNew } =
            res;
          setProfitCenterNew({
            include: profitCenterNew.include,
            exclude: profitCenterNew.exclude,
          });
          setProfitCenterNewUsed({
            include: profitCenterUsed.include,
            exclude: profitCenterUsed.exclude,
          });
          setProfitCenterNewService({
            include: profitCenterService.include,
            exclude: profitCenterService.exclude,
          });

          if (profitCenterUsed.check) {
            check1.current.checked = true;
            setIsValidUsed(true);
          } else {
            check1.current.checked = false;
            setIsValidUsed(false);
          }
          if (profitCenterService.check) {
            checkServie.current.checked = true;
            setIsValidService(true);
          } else {
            checkServie.current.checked = false;
            setIsValidService(false);
          }
        });
      }
    });
  }, []);
  const geoFormHandler = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    console.log(profitCenterUsed, profitCenterNew, profitCenterService);
    setTimeout(async () => {
      try {
        const responce = await axios.post("/geo.json", {
          profitCenterUsed,
          profitCenterService,
          profitCenterNew,
        });
        console.log(responce);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }, 3000);

    setProfitCenterNew({
      include: "",
      exclude: "",
    });
    setProfitCenterNewUsed({
      check: "",
      include: "",
      exclude: "",
    });
    setProfitCenterNewService({
      check: "",
      include: "",
      exclude: "",
    });
    setIsValidUsed(false);
    setIsValidService(false);
  };

  const checkHandler = (e) => {
    const { name, checked } = e.target;
    debugger;
    if (name === "check1") {
      if (checked) {
        setIsValidUsed(true);
      } else setIsValidUsed(false);
    }
    if (name === "check2") {
      if (checked) {
        setIsValidService(true);
      } else setIsValidService(false);
    }
  };
  return (
    <>
      <Header
        title="Geo"
        borderWidth="border-2"
        borderColor="border-danger"
        progress="Not Completed"
      ></Header>
      <div className="container">
        <p>
          Provide direction on where to show your ads -- by setting a radius or
          providing a list of zip codes.
        </p>
        <p>
          Let us know if New, Used, or Service campaigns require their own
          unique Geo Targeting strategies. Feel free to upload any Pump In, Pump
          Out, or Cross Sell reports for a more analytical approach. If geos are
          not provided before launch, a 15 mile radius will be set around the
          dealership.
        </p>
        <Header
          className="mt-2"
          title="Primary Marketing Area / Area of Responsibility"
          borderWidth="border-1"
          borderColor="border-dark"
        ></Header>
        {error && <Error>{error}</Error>}
        {!loading ? (
          <div>
            <form onSubmit={geoFormHandler}>
              <div className="">
                <div className="row">
                  <div className="col">
                    <span className="fs-4">PROFIT CENTER: NEW</span>
                    <div className="row mt-5">
                      <div className="col">
                        <span className="fs-5 text-decoration-underline">
                          Include
                        </span>
                        <p className="mt-3">Enter one or more postal codes:</p>
                        <div className="input-group">
                          <div>
                            <textarea
                              className="form-control border border-dark"
                              cols="19"
                              rows="8"
                              value={profitCenterNew.include}
                              onChange={(e) => {
                                setProfitCenterNew((prev) => {
                                  return {
                                    ...prev,
                                    include: e.target.value,
                                  };
                                });
                              }}
                              aria-label="With textarea"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <span className="fs-5 text-decoration-underline">
                          Exclude
                        </span>
                        <p className="mt-3">Enter one or more postal codes:</p>
                        <div className="input-group">
                          <div>
                            <textarea
                              className="form-control border border-dark"
                              cols="19"
                              rows="8"
                              value={profitCenterNew.exclude}
                              onChange={(e) => {
                                setProfitCenterNew((prev) => {
                                  return {
                                    ...prev,
                                    exclude: e.target.value,
                                  };
                                });
                              }}
                              aria-label="With textarea"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <p className="fs-4">PROFIT CENTER: USED</p>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="check1"
                      ref={check1}
                      value={profitCenterUsed.check}
                      onClick={checkHandler}
                      onChange={(e) => {
                        setProfitCenterNewUsed((prev) => {
                          return {
                            ...prev,
                            check: e.target.checked,
                          };
                        });
                      }}
                    />
                    <span className="ms-3">
                      Use Profit Central Postal codes
                    </span>
                    <div className="row mt-2">
                      <div className="col">
                        <span className="fs-5 text-decoration-underline">
                          Include
                        </span>
                        <p className="mt-3">Enter one or more postal codes:</p>
                        <div className="input-group">
                          <div>
                            <textarea
                              disabled={isValidUsed}
                              className="form-control border border-dark"
                              cols="19"
                              rows="8"
                              value={profitCenterUsed.include}
                              onChange={(e) => {
                                setProfitCenterNewUsed((prev) => {
                                  return {
                                    ...prev,
                                    include: e.target.value,
                                  };
                                });
                              }}
                              name="used"
                              aria-label="With textarea"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <span className="fs-5 text-decoration-underline">
                          Exclude
                        </span>
                        <p className="mt-3">Enter one or more postal codes:</p>
                        <div className="input-group">
                          <div>
                            <textarea
                              className="form-control border border-dark"
                              disabled={isValidUsed}
                              cols="19"
                              rows="8"
                              name="used"
                              value={profitCenterUsed.exclude}
                              onChange={(e) => {
                                setProfitCenterNewUsed((prev) => {
                                  return {
                                    ...prev,
                                    exclude: e.target.value,
                                  };
                                });
                              }}
                              aria-label="With textarea"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p className="fs-4">PROFIT CENTER: SERVICE</p>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="check2"
                      value={profitCenterService.check}
                      onClick={checkHandler}
                      onChange={(e) => {
                        setProfitCenterNewService((prev) => {
                          return {
                            ...prev,
                            check: e.target.checked,
                          };
                        });
                      }}
                      ref={checkServie}
                    />
                    <span className="ms-3">
                      Use Profit Central Postal codes
                    </span>
                    <div className="row mt-2">
                      <div className="col">
                        <span className="fs-5 text-decoration-underline">
                          Include
                        </span>
                        <p className="mt-3">Enter one or more postal codes:</p>
                        <div className="input-group">
                          <div>
                            <textarea
                              disabled={isValidService}
                              className="form-control border border-dark"
                              cols="19"
                              rows="8"
                              name="service"
                              value={profitCenterService.include}
                              onChange={(e) => {
                                setProfitCenterNewService((prev) => {
                                  return {
                                    ...prev,
                                    include: e.target.value,
                                  };
                                });
                              }}
                              aria-label="With textarea"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <span className="fs-5 text-decoration-underline">
                          Exclude
                        </span>
                        <p className="mt-3">Enter one or more postal codes:</p>
                        <div className="input-group">
                          <div>
                            <textarea
                              disabled={isValidService}
                              className="form-control border border-dark"
                              cols="19"
                              rows="8"
                              value={profitCenterService.exclude}
                              onChange={(e) => {
                                setProfitCenterNewService((prev) => {
                                  return {
                                    ...prev,
                                    exclude: e.target.value,
                                  };
                                });
                              }}
                              name="service"
                              aria-label="With textarea"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col"></div>
                </div>

                <div className="text-end mt-3">
                  <button
                    className="btn rounded-pill bg-primary px-5 text-white"
                    type="submit"
                  >
                    save
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <h1>loading</h1>
        )}
      </div>
    </>
  );
};

export default Geo;

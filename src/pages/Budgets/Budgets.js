import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../Shared/Button/Button";
import Header from "../../Shared/Header/Header";

const Budject = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("save");
  const [budgets, setBudgets] = useState({
    searchNew: "",
    youTube: "",
    searchPreOwned: "",
    ott: "",
    searchSales: "",
    salesMail: "",
    socialService: "",
    other: "",
    displayNew: "",
    displayPreOwned: "",
  });
  const removeDoller = (e) => {
    const { name, value } = e.target;
    let b = value.substring(1);
    let a = b.slice(0, -3);
    setBudgets((prev) => {
      return {
        ...prev,
        [name]: a,
      };
    });
  };
  const addDoller = (e) => {
    const { name, value } = e.target;
    if (value.includes("$")) {
      setBudgets((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } else if (value.length > 1) {
      setBudgets((prev) => {
        return {
          ...prev,
          [name]: `$${value}.00`,
        };
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      axios.get("/budgets.json").then((res) => {
        for (let item in res.data) {
          let array = [];
          array.push({ ...res.data[item] });
          array.forEach((res) => {
            const { budgets } = res;
            setBudgets({
              searchNew: budgets.searchNew,
              youTube: budgets.youTube,
              searchPreOwned: budgets.searchPreOwned,
              ott: budgets.ott,
              searchSales: budgets.searchSales,
              salesMail: budgets.salesMail,
              socialService: budgets.socialService,
              other: budgets.other,
              displayNew: budgets.displayNew,
              displayPreOwned: budgets.displayPreOwned,
            });
          });
        }
      });
    }, 3000);
  }, []);
  const budgetFormHandler = (e) => {
    e.preventDefault();
    setLoading("loading");
    setTimeout(() => {
      axios
        .post("/budgets.json", { budgets })
        .then((res) => {
          if (!res.status === 200) {
            console.log("error");
            return;
          }
          setLoading("submited");
        })
        .catch((err) => {
          setLoading("error");
          setError(err.message);
        });
    }, 3000);

    setTimeout(() => {
      setBudgets({
        searchNew: "",
        youTube: "",
        searchPreOwned: "",
        ott: "",
        searchSales: "",
        salesMail: "",
        socialService: "",
        other: "",
        displayNew: "",
        displayPreOwned: "",
      });
      setLoading("save");
    }, 5000);
  };
  return (
    <>
      <div className="mt-3">
        <Header
          title="Historical Budgets"
          progress="Not Complete"
          borderWidth="border-2"
          borderColor="border-danger"
        ></Header>
        <p>
          Please provide your historical budget spent with your previous
          provider. If not applicable, please leave blank.
        </p>
        <div className="container">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={budgetFormHandler}>
            <div className="row">
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Search-New</span>
                  <div className="col-7">
                    <input
                      type="text"
                      name="searchNew"
                      value={budgets.searchNew}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            searchNew: e.target.value,
                          };
                        });
                      }}
                      className="form-control  border border-dark py-3 mb-3"
                    />
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">YouTube</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="youTube"
                      value={budgets.youTube}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            youTube: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <></> */}
            <div className="row">
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Search-Pre-Owned</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="searchPreOwned"
                      value={budgets.searchPreOwned}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            searchPreOwned: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">OTT</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="ott"
                      value={budgets.ott}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            ott: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <></> */}
            <div className="row">
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Search-Service</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="searchService"
                      value={budgets.searchService}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            searchService: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Sales Mail</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="salesMail"
                      value={budgets.salesMail}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            salesMail: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <></> */}
            <div className="row">
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Social-Sales</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="socialSales"
                      value={budgets.socialSales}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            socialSales: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Service Mail</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="serviceMail"
                      value={budgets.serviceMail}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            serviceMail: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <></> */}
            <div className="row">
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Social-Service</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="socialService"
                      value={budgets.socialService}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            socialService: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Other</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="other"
                      value={budgets.other}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            other: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <></> */}
            <div className="row">
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Display-New</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="displayNew"
                      value={budgets.displayNew}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            displayNew: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-5"></div>
            </div>
            {/* <></> */}
            <div className="row">
              <div className="col-5">
                <div className="row">
                  <span className="col-4 fs-5">Display-Pre-Owned</span>
                  <div className="col-7">
                    <input
                      type="text"
                      className="form-control  border border-dark py-3 mb-3"
                      name="displayPreOwned"
                      value={budgets.displayPreOwned}
                      onBlur={addDoller}
                      onFocus={removeDoller}
                      onChange={(e) => {
                        setBudgets((preve) => {
                          return {
                            ...preve,
                            displayPreOwned: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-5"></div>
            </div>
            {/* <></> */}
            <Button
              text={loading}
              color="rgb(13, 0, 87)"
              disabled={false}
            ></Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Budject;

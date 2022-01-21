import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../Shared/Button/Button";
import Header from "../../Shared/Header/Header";

const Inventor = () => {
  const [text, setText] = useState("save");
  const [isDisable, setDisable] = useState(false);
  const [vehicle1, setVechicle1] = useState({
    stockNumber: "",
    year: "",
    make: "",
    msrp: "",
    sellingPrice: "",
    invoice: "",
    stockNumber1: "",
    year1: "",
    make1: "",
    msrp1: "",
    sellingPrice1: "",
    invoice1: "",
    stockNumber2: "",
    year2: "",
    make2: "",
    msrp2: "",
    sellingPrice2: "",
    invoice2: "",
  });

  const Handler = (e, data) => {
    const { name, value } = e.target;
    setVechicle1({ ...vehicle1, [name]: value });
  };
  const addDoller = (e) => {
    const { name, value } = e.target;
    if (e.target.value.includes("$")) {
      setVechicle1((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } else {
      setVechicle1((prev) => {
        return {
          ...prev,
          [name]: "$" + value + ".00",
        };
      });
    }
  };

  const removeDoller = (e) => {
    const { name } = e.target;
    let data = e.target.value;
    let b = data.substring(1);
    let a = b.slice(0, -3);
    setVechicle1((prev) => {
      return {
        ...prev,
        [name]: a,
      };
    });
  };
  useEffect(() => {
    axios.get("/inventor.json").then((res) => {
      for (let item in res.data) {
        let arry = [];
        arry.push({ ...res.data[item] });
        arry.forEach((res) => {
          let inventor = res.inventor;

          setVechicle1({
            stockNumber: inventor.stockNumber,
            year: inventor.year,
            make: inventor.make,
            msrp: inventor.msrp,
            sellingPrice: inventor.sellingPrice,
            invoice: inventor.invoice,
            stockNumber1: inventor.stockNumber1,
            year1: inventor.year1,
            make1: inventor.make1,
            msrp1: inventor.msrp1,
            sellingPrice1: inventor.sellingPrice1,
            invoice1: inventor.invoice1,
            stockNumber2: inventor.stockNumber2,
            year2: inventor.year2,
            make2: inventor.make2,
            msrp2: inventor.msrp2,
            sellingPrice2: inventor.sellingPrice2,
            invoice2: inventor.invoice2,
          });
        });
      }
    });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    setText("loading");
    setDisable(true);
    setTimeout(() => {
      debugger;
      axios
        .post("/inventor.json", { inventor: vehicle1 })
        .then((res) => {
          setText("submited");
          setDisable(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }, 3000);
  };

  return (
    <>
      <Header
        title="Inventor"
        borderColor="border-danger"
        borderWidth="border-2"
        progress="Not started"
      ></Header>
      <p className="fs-5">Inventory Examples</p>
      <Header
        title="Inventor"
        borderColor="border-dark"
        borderWidth="border-1"
      ></Header>
      <p>
        *MOST TIME SENSITIVE* Please provide three in-stock Inventory Examples
        below with accurate Invoice, MSRP and Selling Price (before incentives
        and rebates). This data will be used to order your inventory and
        validate the pricing sent over from your Inventory Provider, ensuring we
        can calculate accurate payments in your ads.
      </p>
      <form onSubmit={submitHandler}>
        <div className="row ">
          <div className="col">
            <div className="row">
              <span className="col"></span>
              <div className="col fs-3 text-start ">New Vehicle 1</div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  Stock Number
                </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="stockNumber"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  value={vehicle1.stockNumber}
                  onChange={(e) => {
                    Handler(e);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label htmlFor="sel1">Year:</label>
              </div>
              <div className="col-8">
                <select
                  className="form-select border border-dark py-3 mb-3"
                  aria-label="Default select example"
                  name="year"
                  value={vehicle1.year}
                  onChange={(e) => {
                    Handler(e);
                  }}
                >
                  <option value="1999">1999</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label htmlFor="sel1">Make:</label>
              </div>
              <div className="col-8">
                <select
                  className="form-select border border-dark py-3 mb-3"
                  aria-label="Default select example"
                  name="make"
                  value={vehicle1.make}
                  onChange={(e) => {
                    Handler(e);
                  }}
                >
                  <option value="bently">bently</option>
                  <option value="honda">honda</option>
                </select>
              </div>
            </div>
            <div className="row ">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  MSRP
                </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="msrp"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  placeholder="$0.00"
                  onChange={Handler}
                  onBlur={addDoller}
                  onFocus={removeDoller}
                  value={vehicle1.msrp}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  Selling Price(before incentives and rebates)*
                </label>
              </div>
              <div className="col-8 mt-3">
                <input
                  type="text"
                  name="sellingPrice"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  placeholder="$0.00"
                  onChange={Handler}
                  onBlur={addDoller}
                  onFocus={removeDoller}
                  value={vehicle1.sellingPrice}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  Invoice Price
                </label>
              </div>
              <div className="col-8 ">
                <input
                  type="text"
                  name="invoice"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  placeholder="$0.00"
                  onChange={Handler}
                  onBlur={addDoller}
                  onFocus={removeDoller}
                  value={vehicle1.invoice}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <span className="col"></span>
              <div className="col fs-3">New Vehicle 2</div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  Stock Number
                </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="stockNumber1"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  value={vehicle1.stockNumber1}
                  onChange={(e) => {
                    Handler(e);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label htmlFor="sel1">Year:</label>
              </div>
              <div className="col-8">
                <select
                  className="form-select border border-dark py-3 mb-3"
                  aria-label="Default select example"
                  name="year1"
                  value={vehicle1.year1}
                  onChange={(e) => {
                    Handler(e);
                  }}
                >
                  <option value="1999">1999</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label htmlFor="sel1">Make:</label>
              </div>
              <div className="col-8">
                <select
                  className="form-select border border-dark py-3 mb-3"
                  aria-label="Default select example"
                  name="make1"
                  value={vehicle1.make1}
                  onChange={(e) => {
                    Handler(e);
                  }}
                >
                  <option value="bently">bently</option>
                  <option value="honda">honda</option>
                </select>
              </div>
            </div>
            <div className="row ">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  MSRP
                </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="msrp1"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  placeholder="$0.00"
                  onChange={Handler}
                  onBlur={addDoller}
                  onFocus={removeDoller}
                  value={vehicle1.msrp1}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  Selling Price(before incentives and rebates)*
                </label>
              </div>
              <div className="col-8 mt-3">
                <input
                  type="text"
                  name="sellingPrice1"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  placeholder="$0.00"
                  onChange={Handler}
                  onBlur={addDoller}
                  onFocus={removeDoller}
                  value={vehicle1.sellingPrice1}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  Invoice Price
                </label>
              </div>
              <div className="col-8 ">
                <input
                  type="text"
                  name="invoice1"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  placeholder="$0.00"
                  onChange={Handler}
                  onBlur={addDoller}
                  onFocus={removeDoller}
                  value={vehicle1.invoice1}
                />
              </div>
            </div>
          </div>
          <div className="col me-5">
            <div className="row">
              <span className="col"></span>
              <div className="col fs-3">New Vehicle 3</div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  Stock Number
                </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="stockNumber2"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  value={vehicle1.stockNumber2}
                  onChange={(e) => {
                    Handler(e);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <label htmlFor="sel1">Year:</label>
              </div>
              <div className="col-8">
                <select
                  className="form-select border border-dark py-3 mb-3"
                  aria-label="Default select example"
                  name="year2"
                  value={vehicle1.year2}
                  onChange={(e) => {
                    Handler(e);
                  }}
                >
                  <option value="1999">1999</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <label htmlFor="sel1">Make:</label>
              </div>
              <div className="col-8">
                <select
                  className="form-select border border-dark py-3 mb-3"
                  aria-label="Default select example"
                  name="make2"
                  value={vehicle1.make2}
                  onChange={(e) => {
                    Handler(e);
                  }}
                >
                  <option value="bently">bently</option>
                  <option value="honda">honda</option>
                </select>
              </div>
            </div>
            <div className="row ">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  MSRP
                </label>
              </div>
              <div className="col-8">
                <input
                  type="text"
                  name="msrp2"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  placeholder="$0.00"
                  onChange={Handler}
                  onBlur={addDoller}
                  onFocus={removeDoller}
                  value={vehicle1.msrp2}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  Selling Price(before incentives and rebates)*
                </label>
              </div>
              <div className="col-8 mt-3">
                <input
                  type="text"
                  name="sellingPrice2"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  placeholder="$0.00"
                  onChange={Handler}
                  onBlur={addDoller}
                  onFocus={removeDoller}
                  value={vehicle1.sellingPrice2}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col-4">
                <label HtmlFor="inputPassword6" className="col-form-label t">
                  Invoice Price
                </label>
              </div>
              <div className="col-8 ">
                <input
                  type="text"
                  name="invoice2"
                  id="inputPassword6"
                  className="form-control border border-dark py-3 mb-3"
                  placeholder="$0.00"
                  onChange={Handler}
                  onBlur={addDoller}
                  onFocus={removeDoller}
                  value={vehicle1.invoice2}
                />
              </div>
            </div>
          </div>
        </div>

        <Button text={text} color="rgb(13, 0, 87)" disabled={isDisable}>
          <span className="text-danger mb-2">
            * If advertising New Vehicles, please complete MSRP, Selling Price
            and Invoice Price before saving.
          </span>
        </Button>
      </form>
    </>
  );
};

export default Inventor;

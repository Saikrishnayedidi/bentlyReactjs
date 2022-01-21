import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Access from "./pages/access/Access";
import Accounts from "./pages/Accounts/Accounts";
import Budject from "./pages/Budgets/Budgets";
import Contacts from "./pages/contacts/Contacts";
import Geo from "./pages/Geo/Geo";
import Home from "./pages/home/Home";
import Inventor from "./pages/Inventor/Inventor";
import Measurements from "./pages/Measurements/measurements";
import Sidenav from "./pages/sideNav/Sidenav";

function App() {
  return (
    <>
      <Navbar className="mb-5"></Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sideNav" element={<Sidenav />}>
          <Route path="inventor" element={<Inventor />}></Route>
          <Route path="accounts" element={<Accounts />}></Route>
          <Route path="contacts" element={<Contacts />}></Route>
          <Route path="budject" element={<Budject />}></Route>
          <Route path="measurements" element={<Measurements />}></Route>
          <Route path="access" element={<Access />}></Route>
          <Route path="geo" element={<Geo />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

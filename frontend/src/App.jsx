import { useState } from "react";
import AddField from "./pages/Addfeild";
import AddCrop from "./pages/AddCrop";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./pages/Navbar";
import Sidebar from "./pages/SideBar";
import Layout from "./pages/Layout";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import Homepage from "./pages/Homepage";
import FieldList from "./components/FeildList";
import FieldCard from "./pages/FeildCard";
import FieldDetails from "./pages/FeildDetails";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Layout />}>
            <Route path="/homepage/feilds" element={<FieldList />} />
            <Route path="/homepage/feild/:id" element={<FieldDetails />} />
            <Route path="/homepage/:id" element={<FieldCard />} />
            <Route path="/homepage/add-field" element={<AddField />} />
            <Route path="/homepage/add-crop" element={<AddCrop />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
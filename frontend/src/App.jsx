import { useState } from "react";
import AddField from "./pages/Addfield";
import AddCrop from "./pages/AddCrop";
import "./App.css";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./pages/NavBar";
import Sidebar from "./pages/SideBar";
import Layout from "./pages/Layout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Homepage from "./pages/Homepage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepage" element={<Layout />}>
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

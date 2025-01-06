import { useState } from "react";
import AddField from "./pages/Addfeild";
import AddCrop from "./pages/AddCrop";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./pages/Layout";
import ForgotPasswordPage from "./pages/ForgetPasswordPage";
import Homepage from "./pages/Homepage";
import FieldList from "./components/FeildList";
import FieldCard from "./pages/FeildCard";
import FieldDetails from "./pages/FeildDetails";
import ContactUs from "./components/Contact";
import AboutPageFarmer from "./pages/AboutFarmer";
import ServicesPage from "./pages/ServicesPageFarmer";
import { UploadCropImageForm } from "./pages/UpdateCropImage";
import Stock from "./pages/Stock";
import { useAuthStore } from "./store/authStore";
import LayoutVendor from "./pages/LayoutVendor";
import EditField from "./pages/EditField";
import CropDetails from "./components/CropDetailsCard";
import UpdateCropForm from "./pages/UpdateCrop";
import ProfilePage from "./pages/Profile";
function App() {
  const [count, setCount] = useState(0);

  const {userAuth} = useAuthStore()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepageVendor" element= {<LayoutVendor />}>

          </Route>
          <Route path="/homepage" element={<Layout /> }>
            <Route path="/homepage/feilds" element={<FieldList />} />
            <Route path="/homepage/about" element={<AboutPageFarmer />} />
            <Route path="/homepage/crop-details/:id" element={<CropDetails />} />
            <Route path="/homepage/update-details/:id" element={<UpdateCropForm />} />
            <Route path="/homepage/edit-field/:id" element={<EditField />} />
            <Route path="/homepage/update-status" element={<UploadCropImageForm />} />
            <Route path="/homepage/present-stock" element={<Stock />} />
            <Route path="/homepage/settings" element={<ProfilePage />} />
            <Route path="/homepage/services" element={<ServicesPage />} />
            <Route path="/homepage/contact" element={<ContactUs />} />
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
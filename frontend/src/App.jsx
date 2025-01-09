import { useEffect, useState } from "react";
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
import LayoutTransport from "./pages/LayoutTransport";
import AddTransportForm from "./pages/AddTransport";
import TransportList from "./components/TransportList";
import AboutPageTransport from "./pages/AboutTransport";
import AddVehicleForm from "./pages/AddVechile";
import VehiclesList from "./components/VechileList";
import UploadVehicleForm from "./pages/UplodVechileImage";
import VechileList from "./components/GetallVehicleList";
import ServicesPageLogistics from "./pages/ServicesTransport";
import EditVechileForm from "./pages/UpdateVehicle";
import HomeChat from "./pages/HomeChat";
import OrderPage from "./pages/OrderPage";
import { Toaster } from 'react-hot-toast'


function App() {
  const [count, setCount] = useState(0);

  const {userAuth, checkAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
    document.querySelector('html').setAttribute('data-theme', 'light')
  }, [checkAuth])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/homepageVendor" element= {<LayoutVendor />}>
          <Route path="/homepageVendor/order" element= {<OrderPage />}></Route>
          </Route>
          <Route path="/homepageTransport" element= {<LayoutTransport />}>
          <Route path="/homepageTransport/add-transport" element={<AddTransportForm />}/>
          <Route path="/homepageTransport/transports" element= {<TransportList />}></Route>
          <Route path="/homepageTransport/about" element= {< AboutPageTransport />}></Route>
          <Route path="/homepageTransport/add-vechile/:id" element= {< AddVehicleForm />}></Route>
          <Route path="/homepageTransport/get-vechile/:id" element= {< VehiclesList />}></Route>
          <Route path="/homepageTransport/upload-image" element= {< UploadVehicleForm />}></Route>
          <Route path="/homepageTransport/present-vechiles-avaible" element= {< VechileList />}></Route>
          <Route path="/homepageTransport/settings" element= {< ProfilePage />}></Route>
          <Route path="/homepageTransport/services" element= {< ServicesPageLogistics />}></Route>
          <Route path="/homepageTransport/contact" element= {< ContactUs />}></Route>
          <Route path="/homepageTransport/update-vehicle/:id" element= {< EditVechileForm />}></Route>
          <Route path="/homepageTransport/chat-application" element= {< HomeChat />}></Route>
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
            <Route path="/homepage/chat-application" element={<HomeChat />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
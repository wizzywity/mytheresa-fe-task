import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import AppProvider from "./context/AppProvider";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () =>{
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="details/:detailsId" element={<Details />} />
            </Route>
        </Routes>
    )
}

const AppWithContext = () => {
    return (
        <AppProvider>
            <ScrollToTop />
            <App />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </AppProvider>
    )
}
export default AppWithContext

import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const Home = lazy(() => import("../pages/Home"));
const Cart = lazy(() => import("../pages/Cart"));
const Login = lazy(() => import("../authPages/Login"));
const Products = lazy(() => import("../pages/Products"));
const SignUp = lazy(() => import("../authPages/SignUp"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Product = lazy(() => import("../components/ecommerce/product/Product"));
const Checkout = lazy(()=> import("../pages/Checkout"))
const Orders = lazy(()=> import("../pages/Orders"))
const LayoutUser = lazy(()=> import("../layouts/LayoutUser"))
const ProtectedRoute = lazy(()=> import("../protectedRoute/ProtectedRoute"))
const VerifyResetCode = lazy(()=> import("../authPages/VerifyResetCode"))
const ForgotPassword = lazy(()=> import("../authPages/ForgotPassword"))
const ResetPassword = lazy(()=> import("../authPages/ResetPassword"))
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Toaster } from "react-hot-toast";
import LottieComponent from "../components/common/lottie/LottieComponent";
import Error from "../pages/Error";
const Search = lazy(() => import("../pages/Search"));
const AppRouter = () => {
  return (
    <Provider store={store}>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<LottieComponent type="loadingAnimation" />}>
          <Routes>
            <Route path="/" element={<ProtectedRoute><LayoutUser/></ProtectedRoute>} >
            <Route index element={<Home />}  />
            <Route path="/products" element={<Products />} />
            <Route path="/search/:searchText" element={<Search />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/allorders" element={<Orders />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/verifyResetCode" element={<VerifyResetCode />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="*" element={<Error/>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
};
export default AppRouter;



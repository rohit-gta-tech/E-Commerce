import "./App.css";
import { useEffect, useState, useCallback} from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from './component/Cart/ConfirmOrder'
import axios from "axios";
import Payment from './component/Cart/Payment'
import OrderSuccess from './component/Cart/OrderSuccess'
import MyOrders from './component/Order/MyOrders'
import OrderDetails from './component/Order/OrderDetails'
import Dashboard from './component/Admin/Dashboard'
import ProductList from './component/Admin/ProductList'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import NewProduct from "./component/Admin/NewProduct"
import UpdateProduct from "./component/Admin/UpdateProduct"
import OrderList from './component/Admin/OrderList'
import ProcessOrder from './component/Admin/ProcessOrder'
import UsersList from './component/Admin/UsersList'
import UpdateUser from './component/Admin/UpdateUser'
import ProductReviews from './component/Admin/ProductReviews'
import NotFound from './component/layout/NotFound/NotFound'
import Contact from './component/layout/Contact/Contact'
import About from './component/layout/About/About'

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('')

  const getStripeApiKey = useCallback(async function() {
    const { data } = await axios.get('api/v1/stripeapikey')
    setStripeApiKey(data.stripeApiKey)
  },[])

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey()
  }, [getStripeApiKey]);

  window.addEventListener("contextmenu", (e) => e.preventDefault())


  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes >

        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />

        <Route exact path="/search" element={<Search />} />

        <Route exact path="/account" element={<ProtectedRoute/>}>
          <Route exact path='/account' element={<Profile/>}/>
        </Route>

        <Route exact path="/account" element={<ProtectedRoute/>}>
          <Route exact path='/account' element={<Profile />}/>
        </Route>

        <Route exact path="/me/update" element={<ProtectedRoute/>}>
          <Route exact path='/me/update' element={<UpdateProfile />}/>
        </Route>

        <Route exact path="/password/update" element={<ProtectedRoute/>}>
          <Route exact path='/password/update' element={<UpdatePassword />}/>
        </Route>

        <Route exact path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/login" element={<LoginSignUp />} ></Route>

        <Route exact path="/cart" element={<Cart />} />

        <Route exact path="/shipping" element={<ProtectedRoute/>}>
          <Route exact path='/shipping' element={<Shipping />}/>
        </Route>

        <Route exact path="/order/confirm" element={<ProtectedRoute/>}>
          <Route exact path='/order/confirm' element={<ConfirmOrder />}/>
        </Route>

        {stripeApiKey && 
        <Route exact path="/process/payment" element={<ProtectedRoute/>}>
          <Route exact path='/process/payment' element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>}/>
        </Route>
        }

        <Route exact path="/success" element={<ProtectedRoute/>}>
          <Route exact path='/success' element={<OrderSuccess />}/>
        </Route>  

        <Route exact path="/orders" element={<ProtectedRoute />}>
          <Route exact path="/orders" element={<MyOrders />}/>
        </Route>

        <Route path="/order/:id" element={<ProtectedRoute/>}>
          <Route path="/order/:id" element={<OrderDetails />}/>
        </Route>

        <Route exact path="/admin/dashboard" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/dashboard" element={<Dashboard />}/>
        </Route>

        <Route exact path="/admin/products" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/products" element={<ProductList />}/>
        </Route>

        <Route exact path="/admin/product" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/product" element={<NewProduct />}/>
        </Route>

        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true}/>}>
          <Route path="/admin/product/:id" element={<UpdateProduct />}/>
        </Route>

        <Route exact path="/admin/orders" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/orders" element={<OrderList />}/>
        </Route>

        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true}/>}>
          <Route path="/admin/order/:id" element={<ProcessOrder />}/>
        </Route>

        <Route exact path="/admin/users" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/users" element={<UsersList />}/>
        </Route>

        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true}/>}>
          <Route path="/admin/user/:id" element={<UpdateUser />}/>
        </Route>

        <Route exact path="/admin/reviews" element={<ProtectedRoute isAdmin={true}/>}>
          <Route exact path="/admin/reviews" element={<ProductReviews />}/>
        </Route>

        <Route path='/*' element={<NotFound />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
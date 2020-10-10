import React from "react";
import { Switch, Route } from "react-router-dom";
//import { Switch, }
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/Productlist";
import Cart from "./Components/Cart";
import Details from "./Components/Details";
import Default from "./Components/Default";
//React Fragment removes the need of <section />
//BrowserRouter is wrapped in Index.js
function App() {
	return (
		<React.Fragment>
			<Navbar />
			<Switch>
				<Route path="/" exact component={ProductList} />
				<Route path="/details" component={Details} />
				<Route path="/store" component={Cart} />
				<Route component={Default} />
			</Switch>
		</React.Fragment>
	);
}

export default App;

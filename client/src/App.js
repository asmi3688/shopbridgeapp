import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Product from "./components/Product";
import ProductList from "./components/ProductList"



function App() {
  return (
    <div  className="App">
      <Router id="router">
        <Routes>
          <Route path="/" exact element={<ProductList />} />
          <Route path="/product" exact element={<Product />} />
          <Route path="/product/:id" exact element={<Product />} />
          <Route path="/products" exact element={<ProductList />} />
          <Route path="/404" exact element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

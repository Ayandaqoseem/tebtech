import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { FaShoppingCart } from "react-icons/fa";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/feactures/product/filterSlice";

import { selectCartTotalQuantity } from "../../../redux/feactures/product/cartSlice";
import Cart from "../../../pages/cart/Cart";
import LatestProductItem from "../productItem/LatestProductItem";

const LatestProductList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [showCart, setShowCart] = useState(false);
  const filteredProducts = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);



  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const cart = (
    <button
      onClick={() => setShowCart(true)}
      className={`--btn ${styles["cart-btn"]}`}
    >
      <span className={styles.cart}>
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </span>
    </button>
  );

  return (
    <>
      <div className={styles["product-list"]} id="product">
        <div className={styles.top}>
         
          {/* Search Icon */}
          <div>{cart}</div>
          <div className={styles["top-search"]}>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Sort Products */}
          <div className={styles.sort}>
            <label>Sort by:</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>
        </div>

        <div className={grid ? `${styles.grid}` : `${styles.list}`}>
          {products.length === 0 ? (
            <p>No product found.</p>
          ) : (
            <>
              {filteredProducts.map((product) => {
                return (
                  <div key={product._id}>
                    <LatestProductItem {...product} grid={grid} product={product} />
                  </div>
                );
              })}
            </>
          )}
        </div>
     
      </div>
      {showCart && <Cart setShowCart={setShowCart} showCart={showCart} />}
    </>
  );
};

export default LatestProductList;

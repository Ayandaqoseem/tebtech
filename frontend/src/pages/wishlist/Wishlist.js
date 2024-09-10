import "./Wishlist.scss";
import styles from "../../components/product/productList/ProductList.module.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/product/productItem/ProductItem";
import {
  getWishlist,
  removeFromWishlist,
} from "../../redux/feactures/auth/authSlice";
import { SpinnerGIF } from "../../components/loader/Loader";

export default function Wishlist() {
  const dispatch = useDispatch();
  const [grid, setGrid] = useState(true);
  const { wishlist, isLoading } = useSelector((state) => state.auth);

  const removeWishlist = async (product) => {
    const productId = product._id;

    await dispatch(removeFromWishlist(productId));
    await dispatch(getWishlist());
  };
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return (
    <section>
      <div className={wishlist.length === 0 ? "wishlist-no-prod" :"wishlist-container"}>
        <PageMenu />
        <h2 className="--my wishlist-h2">My Wishlist</h2>
        <div className="--underline"></div>
        <div className={grid ? `${styles.grid}` : `${styles.list}`}>
          {isLoading ? (
            <div className="--flex-div">
              <SpinnerGIF />
            </div>
          ) : (
            <>
              {wishlist.length === 0 ? (
                <p>No product found in your wishlist...</p>
              ) : (
                <>
                  {wishlist.map((product) => {
                    return (
                      <div key={product._id}>
                        <ProductItem
                          {...product}
                          grid={grid}
                          product={product}
                        />
                        <button
                          className="--btn --btn-primary --btn-block"
                          onClick={() => removeWishlist(product)}
                        >
                          Romove From Wishlist
                        </button>
                      </div>
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

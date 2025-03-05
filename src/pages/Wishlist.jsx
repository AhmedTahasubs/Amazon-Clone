import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getWishlist,
  removeProductFromWishlist,
} from "../slices/wishlist.slice";
import { addProductToCart } from "../slices/cart.slice";
import LottieComponent from "../components/common/lottie/LottieComponent";

export default function Wishlist() {
  const dispatch = useDispatch();
  const isLoadingWishList = useSelector((store) => store.wishlistReducer.isLoadingWishList);
  const wishlistInfo = useSelector(
    (store) => store.wishlistReducer.wishlistInfo
  );  
  const isLoadingUpdateCart =useSelector(store=>store.cartReducer.isLoadingUpdateCart)
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(getWishlist());
    window.scrollTo(0, 0);
  }, []);
  if (isLoadingWishList) {
    return <LottieComponent type="loadingAnimation"/>
  }
  return (
    <>
      <section className="my-10 font-Encode">
        {wishlistInfo?.count === 0 ? (
          <div className="text-center">
            <img
              src="/empty_wishlist.svg"
              className="mx-auto w-1/3"
              alt="empty wishlist"
            />
            <p className="text-center text-3xl font-extrabold my-4 ">
              Your Wishlist Is Empty
            </p>
            <Link
              to="/products"
              className="bg-[#131921] text-white font-bold px-4 py-3 rounded-lg hover:text-white border border-[#131921] active:scale-95"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center flex items-center  justify-center gap-2 relative before:absolute before:bottom-0 before:left-[50%] before:w-24 before:rounded-lg before:h-1 before:top-full before:-translate-x-1/2 before:bg-[#131921]">
              <i className="fa-solid fa-heart text-2xl text-[#131921]"></i>
              <h2 className="font-bold text-2xl">Your Wishlist</h2>
            </div>
            <div className="rounded-lg overflow-hidden w-full md:w-8/12  border-[1px] mt-4 border-b-[0px] border-[#131921] mx-auto">
              <table className="w-full text-center font-bold table-fixed">
                <thead className="items-center  bg-[#131921] text-white">
                  <tr>
                    <th></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="">
                  {wishlistInfo?.data?.map((product) => (
                    <tr key={product.id} className="border-b border-[#131921]">
                      <td
                        onClick={() => {
                          // hn3ml navigate le el product details
                          navigate(`/product/${product.id}`)
                        }}
                        className="cursor-pointer"
                      >
                        <img
                          className="w-16 md:ml-10 p-1 rounded-lg"
                          src={product.imageCover}
                          alt=""
                        />
                      </td>
                      <td
                        onClick={() => {
                          // hn3ml navigate le el product details
                          navigate(`/product/${product.id}`)
                        }}
                        className="cursor-pointer"
                      >
                        {product?.title?.split(" ").slice(0, 5).join(" ")}
                      </td>
                      <td>EGP {product.price}</td>
                      <td className="flex gap-2 flex-col items-center md:flex-row md:justify-center md:mt-5">
                        <button
                        disabled={isLoadingUpdateCart}
                          className="w-10 h-10 rounded-full bg-[#131921] text-lg text-white flex justify-center items-center  hover:scale-110 transition-transform duration-300 hover:rotate-12"
                          onClick={(e) => {
                            dispatch(addProductToCart({productId: product.id}));
                          }}
                        >
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                        <button
                          className="w-10 h-10 rounded-full bg-red-600 text-lg text-white flex justify-center items-center  hover:scale-110 transition-transform duration-300 hover:rotate-12"
                          onClick={(e) => {
                            dispatch(removeProductFromWishlist(product.id));
                            setTimeout(() => {
                              dispatch(getWishlist());
                            }, 1200);
                          }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </>
  );
}

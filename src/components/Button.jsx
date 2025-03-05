import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../slices/cart.slice";

const Button = ({ productId }) => {
  const dispatch = useDispatch();
  const isLoadingUpdateCart = useSelector(store=>store.cartReducer.isLoadingUpdateCart) 
  return (
    <button
    disabled={isLoadingUpdateCart}
      onClick={() => {
        dispatch(addProductToCart({productId}));
      }}
      className="button bg-[#FFCC00] py-[7px] px-[18px] text-center rounded-[20px] w-fit h-fit text-sm font-light transition-all duration-300 hover:scale-110 active:scale-90 "
    >
      Add to cart
    </button>
  );
};

export default Button;

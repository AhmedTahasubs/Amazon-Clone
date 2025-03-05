import axios from "axios";
import { useEffect, useState } from "react";
import { MapPinned} from "lucide-react";
import RatingStars from "../../RatingStars";
import Toast from "../../Toast";
import {addProductToWishlist} from "../../../slices/wishlist.slice";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, BuyNow} from "../../../slices/cart.slice";

function Product () {
    const { id } = useParams();
    const isLoadingWishList = useSelector(store=>store.wishlistReducer.isLoadingWishList)
    const isLoadingUpdateCart =useSelector(store=>store.cartReducer.isLoadingUpdateCart)
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [productInfo, setProductInfo] = useState(null);
    const [choosenImg, setChoosenImg] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const dummyStars= [0,6,0,71,0];
    const dummyComments= [{img:"/image.png", userName:"Brooke",  stars:4,
            title:"Favorite dress", location:"the United States", date:"6 August 2024", 
            size:"40", color:"Black", Verified:true, desc:"I initially purchased this dress on sale. It turned out to be my favorite dress of this summer. It is extremely versatile and unexpectedly flattering. When I accidentally tore it, I was really upset. My husband told me to buy it again, which I typically wouldn't do. It wasn't on sale and I am so frugal. The dress washes very well and I always get compliments when I wear it." },
        {img:"/image (1).png", userName:"Elva S. D.",  stars:4, 
            title:"Lindo!!", location:"Mexico", date:"11 August 2023", 
             Verified:true, desc:"Bien hecho, bonita tela y bonita caída, fresco y casual.La marca lo dice!!"},
        {img:"/image.png", userName:"Jenny",  stars:2, 
            title:"La mejor ropa para este fin de semana", location:"Colombia", date:"15 August 2022", 
             Verified:false, desc:"Esta ropa es muy buena y muy recomendada para este fin de semana. La marca lo dice!!"},
        {img:"/image.png", userName:"Jenny",  stars:4, 
            title:"La mejor ropa para este fin de semana", location:"Colombia", date:"15 August 2022", 
            size:"33", color:"Black" , Verified:true, desc:"Esta ropa es muy buena y muy recomendada para este fin de semana. La marca lo dice!!"}];

    const getProduct =async() =>{
        const productdata = (await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)).data.data;
        setProductInfo(productdata);
    }
    useEffect(() => {
      getProduct();
    }, [])
    if (!productInfo) return (<div className="flex items-center justify-center min-h-screen">
                                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                             </div>);
    return(
        <div className=" min-h-screen w-full p-5">
            <div className="sm:grid lg:grid-cols-10 xl:grid-cols-12 font-sans flex flex-col  md:grid-cols-6 w-full">
                {/* images array */}
                <div className="sm:overflow-y-scroll   sm:col-span-1 flex  sm:!flex-col scroll-smooth h-fit  w-[80px]">
                    {productInfo.images.map((image,i) => (
                        <img key={i} src={image} alt="product image"  className={` h-20 w-auto p-1 rounded-lg ${i==choosenImg ? "border border-blue-600" : "border-0"}`} onClick={()=>{setChoosenImg(i);}}/>
                    ))}
                </div>
                {/* main product image */}
                <img src={productInfo.images[choosenImg]} alt="product main image" className="sm:h-[500px]  m-5 rounded-lg sm:col-span-5 col-span-4 h-[300px]" />
                {/* product details */}
                <div className="col-span-4 xl:col-span-4 mr-1/2 flex flex-col justify-around h-3/4 mb-5 w-[90%] md:w-full md:col-span-6 ">
                    <p className="text-[#1F8394] font-inika">Brand: {productInfo.brand.name}</p>
                    <p className=" text-[#5C5C5C]">{productInfo.title}</p>
                    <hr className="w-3/4"/>
                    {/* product price */}
                    <p><span className="text-xs align-top ">SAR</span><span className="text-[31.32px]">{productInfo.price}</span><span className="text-xs align-top ">14</span></p>                <p>All price include VAT.</p>
                    <div>
                    <span className="text-[#5C5C5C] mr-1">Sign in to redeem.</span>
                    <span className="bg-[#71ED58]">Extra 20%</span>
                    <span>off with meem credit cards.</span>
                    <p>Enter code MEEM20 at checkout. Discount by Amazon.</p>
                    </div>
                    <img src="/PayAdv.png" alt="payment advantages" className="m-2 sm:w-1/2 w-3/4 xl:w-[300px]"/>
                    {/* product description */}
                    <p className="font-bold">About this item</p>
                    <p className="ml-2">{productInfo.description}</p>
                    </div>
                {/* payment box */}
                <div className="border border-black rounded p-4 flex flex-col justify-between h-[80%] col-span-2 xl:col-span-2 sm:w-60 ml-auto w-80 md:w-[80%] md:mx-[10%] md:col-span-6 md:h-[550px] xl:w-[245px]"> 
                    <p><span className="text-xs align-top ">SAR</span><span className="text-[31.32px]">{productInfo.price}</span><span className="text-xs align-top ">14</span></p>
                    <p>SAR96 delivery <b>6-9 October</b>.</p>
                    <p className="text-[#1F8394]">Details</p>
                    <div className="flex ">
                    <MapPinned />
                    <span className="text-[#1F8394] ml-2">Delivery to Riyadh - Update Location</span>
                    </div>
                    <p className="text-[#B12704]">Usually ships within 4 to 5 days</p>
                    <p className="text-xl text-center flex gap-2">
                        <button onClick={()=>{
                                if(quantity > 1) setQuantity(quantity - 1);
                            }} className="bg-[#1F8394] rounded-full w-8 text-white  hover:brightness-125">-</button>
                        Quantity: {quantity} 
                        <button onClick={()=>{
                            setQuantity(quantity + 1);
                            }} className="bg-[#1F8394] rounded-full w-8 text-white  hover:brightness-125">+</button>
                    </p>
                    <button className="rounded-full bg-[#FFD814] w-full h-[26.900775909423828px] my-2 hover:brightness-125" disabled={isLoadingUpdateCart} onClick={()=>{dispatch(addProductToCart({ productId: id, count: quantity }))}}>Add to Cart</button>
                    <button className="rounded-full bg-[#FFA41C] w-full h-[31.79073715209961px] my-1 hover:brightness-150"  disabled={isLoadingUpdateCart} onClick={()=>{
                        dispatch(BuyNow(id))
                        }}>Buy Now</button>
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                        <span className="font-medium">Ships from</span>
                        <span>Monatik LLC</span>
                        <span className="font-medium">Sold by</span>
                        <span className="text-[#1F8394]">Monatik LLC</span>
                        <span className="font-medium">Payment</span>
                        <span className="text-[#1F8394]">Secure transaction</span>
                    </div>
                    <hr className="my-2"/>
                        <button disabled={isLoadingWishList}  onClick={()=>{dispatch(addProductToWishlist(id))}}
                            className="p-2 border rounded-xl w-full hover:bg-slate-400 hover:text-white">Add to List</button>
                </div>
            </div>
            {/* product reviews */}
            <div className="lg:flex lg:gap-5  w-full">
                <div className="w-[25%]">
                    <h2 className="text-xl font-medium m-1">Customer Reviews</h2>
                    <div className="flex gap-2">
                        <RatingStars number={4}/>
                        <span>4.1 out of 5</span>
                    </div> 
                    {/* stars rating */}
                    {dummyStars.map((star, i) => 
                        <div key={i} className="flex gap-2 min-w-max ">
                            <p>{i+1} Star</p>
                            <div className=" bg-gray-200 rounded h-4 dark:bg-gray-700 w-40 mt-2">
                            <div className="bg-[#DE7921] h-4 rounded" style={{ width: `${star}%` }} ></div>
                            </div>
                            <p className="mt-1 ">{star}%</p>
                        </div>
                    )}
                    
                </div>
                {/* review cards */}
                <div className="lg:w-[60%] mt-2">
                {dummyComments.map((comment, i) =>
                    <div key={i} className="mb-2">
                        <div className="flex">
                            <img src={comment.img} className="w-10 h-10" />
                            <span className="mt-2 ml-2">{comment.userName}</span> {/*user name */}
                        </div>
                        <div className="flex">
                            <RatingStars number={comment.stars}/> 
                            <span className="ml-2 font-bold text-[22.14px]">{comment.title}</span> {/* comment title */}
                        </div>
                        <p className="text-gray-500">Reviewed in <span className="text-black">{comment.location}</span> on <span className="text-black">{comment.date}</span></p>
                        <p className="text-gray-500">{comment.size&&<>Size: <span className="text-black">{comment.size}</span> </>}{comment.color&&<>| Color: <span className="text-black">{comment.color} </span></>}{comment.Verified&&<>| <span className="text-[#DE7921] font-bold">Verified Purchase</span></>}</p>
                        <p>{comment.desc}</p>
                        <button onClick={()=>setShowToast(true)}
                            className="text-gray-500 hover:underline">Report</button>
                    </div>
                )}
                </div>
            </div>
            {showToast && <Toast message="Comment has been reported" onClose={() => setShowToast(false)} />}
        </div>
    )
}

export default Product;
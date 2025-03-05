import { Fragment } from "react";
import CardItem from "../cards/Card";
import CardBody from "../cards/CardBody";
import * as img from "./index";


function ProductsCards () {

    const productCard1 = 
        <>
            <div className=" flex items-center justify-center flex-col">
                <CardBody src={img.cactus} text=""/>
                <p className="text-[12px] font-bold">Storio Reachargeable Toys talking Cactus Baby Toys for Kids Dancing Kids Cactus Toys...</p>
            </div>
            <div>
                <p className="font-bold py-3 text-[22px]">₹319</p>
                <div className="flex justify-center items-center gap-2">
                    <CardBody src={img.cactus} text=""/>
                    <CardBody src={img.car} text=""/>
                    <CardBody src={img.uno} text=""/>
                    <CardBody src={img.ipad} text=""/>
                </div>
            </div>
       
        </>;
    const productCard2 = 
        <>
            <CardBody src={img.face} text="" />
            <CardBody src={img.bell} text="" />
            <CardBody src={img.jars} text="" />
            <CardBody src={img.toaster} text="" />
        </>;
    const productCard3 = 
        <>
            <CardBody src={img.cream} text="" />
            <CardBody src={img.ceta} text="" />
            <CardBody src={img.gel} text="" />
            <CardBody src={img.soap} text="" />
            
        </>
    const productCard4 = 
        <div className="flex justify-center items-center flex-wrap gap-[7px] max-w-[78%]">
            <CardBody src={img.dress} text="Dresses" />
            <CardBody src={img.top} text="Tops" />
            <CardBody src={img.kurta} text="Kurta & sets" />
            <CardBody src={img.sare} text="Sarees" />
        </div>



    return(
        <div className="p-[30px] flex justify-center items-center gap-5 flex-wrap">
            <CardItem 
                title="Best Sellers in Toys and Games"
                body={productCard1}
            />
            <CardItem 
                title="Customers' Most-Loved Products"
                body={productCard2} linkText="Explore more"
            />
            <CardItem 
                title="Best Sellers in Beauty"
                body={productCard3}
            />
            <CardItem 
                title="Latest Styles | Dresses , Kurta & more | 50% - ...." 
                body={productCard4} linkText="See more"
            />
       </div>
    )
}

export default ProductsCards;

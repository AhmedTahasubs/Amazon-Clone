import ProductsCarousel from "./ProductsCarousel";
import * as img from "./index";

function ClothesCarousel () {
    return(
        <ProductsCarousel 
            img1={<img src={img.cc21}/>}
            img2={<img src={img.cc6}/>}
            img3={<img src={img.cc19}/>}
            img4={<img src={img.cc8}/>}
            img5={<img src={img.cc9}/>}
            img6={<img src={img.cc10}/>}
            img7={<img src={img.cc5}/>}
            img8={<img src={img.cc12}/>}
            img9={<img src={img.cc7}/>}
            img10={<img src={img.cc14}/>}
            img11={<img src={img.cc15}/>}
            img12={<img src={img.cc17}/>}

        />        
    )
}

export default ClothesCarousel;

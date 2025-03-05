import ProductsCarousel from "./ProductsCarousel";
import * as img from "./index";

function ItemsCarousel () {
    return (
        <>
        <ProductsCarousel 
            img1={<img src={img.bottles} className="max-w-[90%]"/>}
            img2={<img src={img.rack} className="max-w-[90%]"/>}
            img3={<img src={img.jars} className="max-w-[90%]"/>}
            img4={<img src={img.kettle} className="max-w-[90%]"/>}
            img5={<img src={img.chopper1} className="max-w-[90%]"/>}
            img6={<img src={img.airfryer} className="max-w-[90%]"/>}
            img7={<img src={img.blender} className="max-w-[90%]"/>}
            img8={<img src={img.machine} className="max-w-[90%]"/>}
            img9={<img src={img.mixer} className="max-w-[90%]"/>}
            img10={<img src={img.chopper} className="max-w-[90%]"/>}
            img11={<img src={img.processor} className="max-w-[90%]"/>}
            img12={<img src={img.org} className="max-w-[90%]"/>}
        />
    </>
    )
}

export default ItemsCarousel;

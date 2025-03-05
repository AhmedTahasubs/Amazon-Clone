import CardItem from "./Card";
import CardBody from "./CardBody";
import * as img from "./index";

function CardsSection () {
    const body1 = 
        <>
            <CardBody src={img.img11} text="Women perfumes and more"/>
            <CardBody src={img.img12} text="Women cosmotics and more"/>
            <CardBody src={img.img13} text="Home decor and essentials"/>
            <CardBody src={img.img14} text="surprises and gifts"/>
        </>;
    const body2 = 
            <>
                <CardBody src={img.img21} text="refrigerators" />
                <CardBody src={img.img22} text="Air conditioners"/>
                <CardBody src={img.img23} text="Microwaves"/>
                <CardBody src={img.img24} text="Washing machines"/>
            </>;
            const body3 = 
            <>
                <CardBody src={img.img331} text="Starting 249$ | Boat" />
                <CardBody src={img.img332} text="Starting 349$ | Bolut"/>
                <CardBody src={img.img333} text="Starting 649$ | Noise"/>
                <CardBody src={img.img334} text="Starting 149$ | Zebronic"/>
            </>;
            const body4 = 
            <>
                <CardBody src={img.img41} text="Up to 70% off | shoes" />
                <CardBody src={img.img42} text="Up to 60% off"/>
                <CardBody src={img.img43} text="Starting 249$ | toys & games"/>
                <CardBody src={img.img44} text="Starting 249$ | Home"/>
            </>;
            const body5 = 
            <>
                <CardBody src={img.img51} text="Modern decoration" />
                <CardBody src={img.img52} text="Up to 60% off "/>
                <CardBody src={img.img53} text="Starting 49$ | walldecor"/>
                <CardBody src={img.img54} text="flash sale | wooden decors"/>
            </>; 
            const body6 = 
            <>
                <CardBody src={img.img61} text="Modern sofa & comfortable" />
                <CardBody src={img.img62} text="Up to 20% off modern salon"/>
                <CardBody src={img.img63} text="Wide variety of couches"/>
                <CardBody src={img.img64} text="Order now & get 30% off"/>
            </>;    
            const body7 = 
            <>
                <CardBody src={img.img71} text="starting 199$ | Bedsheets" />
                <CardBody src={img.img72} text="Up to 20% off | classic bedwears"/>
                <CardBody src={img.img73} text="Wide variety of Blankets"/>
                <CardBody src={img.img74} text="Order now | free delivery"/>
            </>; 
             const body8 = 
             <>
                 <CardBody src={img.img81} text="starting 199$ |Leather products" />
                 <CardBody src={img.img82} text="Up to 20% off | shoes and bag"/>
                 <CardBody src={img.img83} text="All what you dream | only needs click"/>
                 <CardBody src={img.img84} text="Free delivery for 3 days"/>
             </>; 

    return (
        <div className="flex  flex-wrap gap-5 justify-center sm:mt-[30px] md:mt-[15%]">
            <CardItem 
                title="Revamp your home in style"
                linkText="Explore all"
                body= {body1}
            />
            <CardItem 
                title="Appliances for your home | upto 55% off"
                linkText="See more" 
                body= {body2}
            />
            <CardItem 
                title="Starting 149$ | headphones"
                linkText="See all offers" 
                body= {body3}
            />
            <CardItem 
                title="Starting 99$ | Amazon brands & more"
                linkText="Shop now" 
                body={body4}
            />
            <CardItem 
                title="Automotive essentials | upto 60% off"
                linkText="See more" 
                body={body5}
            />
            <CardItem 
                title="Up to 60% off | styles for women"
                linkText="End of season sale" 
                body={body6}
            />
            <CardItem 
                title="Starting 199$ | Amazon brands & more"
                linkText="See more" 
                body={body7}
            />
            <CardItem 
                title="starting 99$ | Home improvement essentials"
                linkText="Explore more" 
                body={body8}
            />

        </div>
    )
}

export default CardsSection;

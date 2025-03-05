import { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LottieComponent from "../components/common/lottie/LottieComponent";
import { useParams } from "react-router-dom";


function Search(){
    const { searchText } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState(null);
    const filter = useRef(null)

    
    useEffect(() => {
        let isMount = true;
        const fetchData = async () => {
        try {
                const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?limit=20&page=${currentPage}`)
                let data = response.data.data.filter((i) => {
                    const brandName = i?.brand?.name?.toLowerCase() || "";
                    const description = i?.description?.toLowerCase() || "";
                    const search = searchText.toLowerCase();
            
                    return brandName.includes(search) || description.includes(search);
                });
                if (data.length === 0) data = null;
                setProducts(data);
            }
            catch (error) {
                console.log(error)
            }

        }
        fetchData() 
        return () => {
        isMount = false;
        }    
    }, [currentPage])
    
    function handleFilter () {
        filter.current.classList.toggle('hidden')
    }
    
    return (
        <>
        {products?<div className="category-page md:gap-3 flex flex-col md:flex-row p-6 ">
                <FontAwesomeIcon onClick={handleFilter} icon={faBars} className="text-3xl cursor-pointer md:hidden mb-3"/>
                <section className="grid grid-cols-1 gap-5 overflow-auto
                sm:grid-cols-2 lg:grid-cols-4">
                    {
                        products?.map((product, i) => (
                            <Card
                            key= {i}
                            description={product.description} 
                            image={product.images[0]}
                            sold={product.sold}
                            price={product.price}
                            rating={product.ratingsAverage}
                            ratingNum ={product.ratingsQuantity}
                            id={product.id}
                            />
                        ))
                    }
                <div className="flex col-span-full justify-center mt-5 "> 
                    <button onClick={()=>{
                    setProducts(null)
                    if(currentPage<=1)
                    {
                        setCurrentPage(products.metadata.numberOfPages)
                    }
                    else
                    {
                        setCurrentPage(currentPage-1)
                    }
                    }} href="#" className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-white bg-footerbg border border-gray-300 rounded-lg hover:bg-gray-500 hover:text-white active:scale-90 transition-all duration-300">
                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5H1m0 0 4 4M1 5l4-4" />
                    </svg>
                    </button>
                    <button onClick={()=>{
                    setProducts(null)
                    if(currentPage>=products.metadata.numberOfPages)
                    {
                        setCurrentPage(1)
                    }
                    else
                    {
                        setCurrentPage(currentPage+1)
                    }
                    }}
                    href="#" className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-footerbg border border-gray-300 rounded-lg hover:bg-gray-500 hover:text-white active:scale-90 transition-all duration-300">
                    <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                    </button>
                </div>
                </section>
            </div>:<div className="text-center text-gray-500 p-4">
                    <p className="text-lg font-semibold">No results found for "{searchText}"</p>
                    <p>Try searching for something else.</p>
                </div>}
            
        </>
    )
}

export default Search;
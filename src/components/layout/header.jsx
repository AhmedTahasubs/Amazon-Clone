import { Link } from "react-router-dom";
import amazonlogo from "../../assets/images/Amazon.png";
import indiaFlag from "../../assets/images/India.png";
import cartIcon from "../../assets/images/cartIcon.png";
import { MapPin ,Search } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef , useState} from "react";
import { getCartProducts } from "../../slices/cart.slice";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from "../../slices/user.slice";


const Header =() => {

  const menuRef = useRef(null)
  const dispatch = useDispatch();
  const cartInfo = useSelector(store=>store.cartReducer.cartInfo)
  const [searchText, setSearchText] = useState("");

  useEffect(()=>{
    dispatch(getCartProducts())
  },[])

  function handleMenu(e) {
    e.preventDefault()
    menuRef.current.classList.toggle('hidden')
  }




    return(
      <Navbar expand="lg" className="bg-body-tertiary bg-[#131921]">
      <Container>
        <Navbar.Brand href="/"><img src={amazonlogo} alt="logo" className=""/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto text-amber-50 flex items-center w-full
          justify-evenly">
            <Nav.Link href="/">
                <div className="location relative text-sm font-bold pl-6
               hover:border-amber-50 border-2 border-[#131921] 
               py-1 pr-1 cursor-pointer text-amber-50">
                  <p className="text-[#C0CCCC] font-normal text-xs">Delivering to Surat 394210</p>
                  <h3>Update location</h3>
                  <MapPin className="absolute bottom-1 left-0 h-[20px]" /> 
                </div>
            </Nav.Link>
            <form className="flex items-center justify-center h-[40px]">
              <button 
              onClick={handleMenu}
                className="h-full px-2 bg-[#D9D9D9] text-[#676565]
                rounded-l-md flex items-center gap-2"
              >
                All
                <FontAwesomeIcon icon={faCaretDown} className="text-inherit" />
              </button>
              <div ref={menuRef} className="menu bg-[#232F3E] text-amber-50 
              absolute top-full px-3 py-2 left-0 w-screen z-20 hidden 
              max-w-full">
                <ul className="list-none flex justify-evenly  text-sm max-sm:flex-col
                max-sm:gap-2">
                  <li><Link href="#">Amazon mini TV</Link></li>
                  <li><Link href="#">Sell</Link></li>
                  <li><Link href="#">Best Sellers</Link></li>
                  <li><Link href="#">Today’s Deals</Link></li>
                  <li><Link href="#">Mobiles</Link></li>
                  <li><Link href="#">Customer Service</Link></li>
                  <li><Link href="#">Prime</Link></li>
                  <li><Link href="#">Electronics</Link></li>
                  <li><Link href="#">Fashion</Link></li>
                  <li><Link href="#">New Releases</Link></li>
                  <li><Link href="#">Home & Kitchen</Link></li>
                  <li><Link href="#">Amazon Pay</Link></li>
                </ul>
              </div>
              <input 
                type="text" 
                placeholder="Search Amazon.in"
                className="h-full px-2 border-none outline-none text-[#131921] "
                value={searchText}
                onChange={(e)=> setSearchText(e.target.value)}
              />
              <Link to={`/search/${searchText}`} className=" h-full">
                <button   className="bg-[#FFCC00] text-[#212121] h-full px-2
                rounded-r-md">
                  <Search className="" />
                </button>
              </Link>
            </form>
            <Link to='/allorders' className="orders hover:text-amber-50 
            hover:border-amber-50 border-2 border-[#131921] p-1">
            <p>
              Returns & Orders
            </p>
            </Link>
            <Link to="/cart" className="flex flex-col items-center hover:border-amber-50 border-2 border-[#131921] p-1 hover:text-amber-50">
              <span>{cartInfo?cartInfo.numOfCartItems:<i className="fa-solid fa-spinner fa-spin"></i>}</span>
              <FontAwesomeIcon icon={faCartShopping}
              className="text-2xl" />          

            </Link>
            <Link to="/wishlist" className=" hover:border-amber-50 border-2 border-[#131921] p-1 hover:text-amber-50">
                  WishList
            </Link>
            <button onClick={()=>{
              dispatch(logout())
            }} className="text-red-600 cursor-pointer hover:text-amber-50">
            Logout
            </button>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}
export default Header;
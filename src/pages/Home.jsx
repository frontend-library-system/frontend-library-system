import { NavLink } from "react-router-dom";
import "./Home.css";
import { About } from "./About";
import { MdSearch } from "react-icons/md";
export const Home =() =>{
    return ( 
        <>
  <div className="home-container">   
      <div className="content-container">
        <div className="content-header">
            <h1>Pustak Prabandha</h1>
        </div>
        <p className="content-description">
              Your gateway to endless knowledge and discovery. Manage your library efficiently with our modern digital solution.
        </p>
    <div className="button-container1">
      <NavLink to="/book1" className="navlink0">
      <button className="google-style-button">
        <MdSearch className="search-icon1"/>
        Search by Name, Id, Author....
      </button>
      </NavLink>
    </div>
        
  </div>
</div>

    <About/>


      
    
    </>
       
    );
}

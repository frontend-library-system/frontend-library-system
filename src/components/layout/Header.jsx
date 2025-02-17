import { NavLink } from "react-router-dom";
import Sidebar from "../../pages/Sidebar";

export const Header =() => {
    return ( 
        <>
        <header className="section-navbar">
            {/* first one */}
        
        <section className="top_txt">
            <div className="head container">

            
        <div className="head_txt">
                {/* trythree where you have called Sidebar ok*/}
                <Sidebar/>
                    <p>Discover,Learn,Thrive:Dive into our Library!</p>
                </div>
                    <div className="sing_in_up">
                        <NavLink to="/signin">LOGIN IN </NavLink >
                        <NavLink to="/signup">SIGN UP </NavLink >
                    </div>
                </div>
        </section>

            {/* second one */}
            <div className="container">
                <div className="navbar-brand">
                <NavLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img 
                    src="logoofTU.jpeg" 
                    alt="Logo" 
                    style={{ 
                        width: '40px', 
                        height: '40px', 
                        marginRight: '8px', 
                        mixBlendMode: 'multiply'
                    }} 
                />
                <p style={{ margin: 0 }}>Pustak Prabhanda</p>
                </NavLink>

                {/* <NavLink to="index">
                    <p>Pustak Prabhanda</p>
                </NavLink> */}
                </div>

            <nav className="navbar">
                <ul>
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/about" className="nav-link">
                            About
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/book" className="nav-link">
                            Book
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/book1" className="nav-link">
                            Book1
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/contact" className="nav-link">
                            Contact
                        </NavLink>
                    </li>
                </ul>
            </nav>
            </div>
        </header>
        
        </>
    );

}
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Sidebar from "../../pages/Sidebar";

const AppLayout =() =>{
    return ( 
    <> 
        <Header/>
        <div className="layout11">
            <Sidebar/>
            <div className="main11">
                <Outlet/> {/*nested route content will appear here*/}
            </div>

        </div>
        <Footer/>
    
    
    
    
    </>
    );
}

export default AppLayout;
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { About } from './pages/About';
// import { Book } from './pages/Book';
import { Contact } from './pages/Contact';
import { Home } from './pages/Home'
import AppLayout from './components/layout/AppLayout';
import {  RegistrationForm } from './pages/Registration';
import { Login } from './pages/Login';
import { Book1 } from './pages/Book1';
import { BookDetails } from './components/UI/BookDetails';
import { Profile } from './sidebarpage/profile';
import { MyLibrary } from './sidebarpage/Mylibrary';

// Import the BookProvider
import { BookProvider } from './context/BookContext';
import MyFavourites from './sidebarpage/MyFavourites';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/UI/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import AddBook from './components/Dashboard/AddBook';
import AddMember from './components/Dashboard/AddMember';
import NewBooks from './components/Dashboard/NewBooks';
import Members from './components/Dashboard/Members';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IssueBook from './components/Dashboard/IssueBook';


const App =() => { 
  const router =createBrowserRouter([ 
    { 
      path: "/",
      element: <AppLayout/>,
      children:[ 
        
          { 
            path: "/",
            element: <Home/>,
          },
          { 
            path: "/about",
            element: <About/>,
          },
          // { 
          //   path: "/book",
          //   element: <Book/>,
          // },
          { 
            path: "/book1",
            element: <Book1/>,
          },
          { 
            path: "/book1/:bookISBN",
            // path: "/book1/:bookid",
            element: <BookDetails/>,
          },
          { 
             path: "/contact",
             element: <Contact/>,
          }, 
          { 
            path: "/signup",
            element:<RegistrationForm/>
          },
          { 
            path: "/signin",
            element:<Login/>
          },
          {
            path: "/profile", 
            element: <Profile />
          },
          {
            path: "/mylibrary",
            element: <MyLibrary />
          },
          {
            path: "/myfavourites",
            element: <MyFavourites/>
          },
          
        ]
    },

    //special route for the dashboard that doesn't use header/footer
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<Dashboard/>}/>, //only render dadhboard component, no applayou       
      children: [
        { path: "/dashboard/addbook", element: <AddBook /> },
        { path: "/dashboard/newbooks", element: <NewBooks/> },
        { path: "/dashboard/addmember", element: <AddMember /> },
        { path: "/dashboard/newmembers", element: <Members/> },
        { path: "/dashboard/issuebooks", element: <IssueBook/> },
      ],

        
    },


  ]);


  //wrap the Router provider with Book provider
  return (
    // Wrap the RouterProvider with BookProvider
    //well wrap the both authprovider adn bookprovider also 
    <AuthProvider>   
    <BookProvider>
      {/* ToastContainer should be placed here */}
      <RouterProvider router={router} />
      <ToastContainer/>
    </BookProvider>
    </AuthProvider>
  );
}

export default App;



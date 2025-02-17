// here we are gonna use styled components and remember backtick
//npm install styled-components
// import styled from 'styled-components';

// const Title = styled.h1`
//   color: blue;
//   font-size: 3rem;
//   text-align: center;
// `;

// export const Footer = () => {
//   return (
//     <footer>
//       <Title>Pustak Prabandha</Title>
//       {/* Other content */}
//     </footer>
//   );
// };

import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
color: white;
font-size: 4rem;
`;



export const Footer = () => {
  return (
    <footer className="section-footer">
      <div className="footer-container container">
        <div className="content_1">
          {/* <h1>Pustak Prabandha</h1> */}
          <Title>Pustak Prabandha</Title>
          <p>
            Welcome to Pustak Prabandha, <br/> your ultimate library management system!
          </p>
          {/* look here  */}
          {/* <img src="https://i.postimg.cc/Nj9dgJ98/cards.png" alt="cards" /> */}
          <img src="esewalogo.png" alt='imageesewa'/>
          {/* <img src="khaltilogo.jpeg" alt='imagekhalit'/> */}


        </div>
        <div className="content_2">
          <h4>LIBRARY SECTIONS <br/>SEARCH RELATED BOOKS</h4>
          <NavLink to="/book1" state={{ searchTerm: 'Fiction'}}>Fiction</NavLink>
          <NavLink to="/book1" state={{ searchTerm: 'Non-Fiction'}}>Non-Fiction</NavLink>
          <NavLink to="/book1" state={{ searchTerm: 'Science & Technology'}}>Science & Technology</NavLink>
          <NavLink to="/book1" state={{ searchTerm: 'Childrens Books'}}>Children's Books</NavLink>
        </div>
        <div className="content_3">
          <h4>HELP</h4>
          <NavLink to="/Contact">Contact Us</NavLink>
          <a href="#" target="_blank">
            Borrowing Guidelines
          </a>
          <a href="#" target="_blank">
            Return & Renewals
          </a>
          <a href="#" target="_blank">
            Book Recommendations
          </a>
        </div>
        <div className="content_4">
          <h4>NEWSLETTER</h4>
          <p>
            Be the first to know about new book arrivals, events, and promotions!
          </p>
          <div className="f-mail">
            <input type="email" placeholder="Your Email" />
            <i className="bx bx-envelope"></i>
          </div>
          <hr />
        </div>
      </div>
      <div className="f-design">
        <div className="f-design-txt">
          <p>Design and Code by Akash Tolange</p>
        </div>
      </div>
    </footer>
  );
};

// src/components/Book1.jsx
import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/BookApi';
import './Book1.css';
import { NavLink, useLocation } from 'react-router-dom';
//import gara hae css


export const Book1 = () => {
    
    //for searchTerm
    const location = useLocation();


    const [data, setData] = useState([]);

    const initialSearchTerm =location.state?.searchTerm || 'React' ; // use passed state or default to 'React
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [loading, setLoading] = useState(false);

 
    

    const getBookData = async () => {
        setLoading(true);
        try {
            const res = await getBooks(searchTerm);
            //json format data to see
            //if you want to see the json format of this api then use this ok
            // console.log("api resooponse", res.data);
            const books = res.data.docs.slice(0, 20).map((book) => ({
                id: book.key,
                title: book.title,
                author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
                cover_id: book.cover_i,
                num_pages: book.number_of_pages_median || 'N/A',
                isbn: book.isbn ? book.isbn[0] : 'No ISBN Available', // Get the first ISBN if available
                //added
                // publisher: book.publisher ? book.publisher.join(', '): 'Not Available',
                publisher: book.publisher && book.publisher.length > 0 ? book.publisher[0] : 'Not Available',
                published_date: book.publish_date ? book.publish_date[0]: 'Not Available',
                edition: book.edition_key ? book.edition_key[0] : 'Not Available',
                availability: 'check Availability',
                description: 'No Description Available' // Description might not be in the search api ok bro,

            }));
            setData(books);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBookData();
        // console.log(getBookData());
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const input = form.elements['searchInput'];
        setSearchTerm(input.value);
    };

    return (
        <>

            
            {loading ? (
                <p>Loading...</p>
            ) : ( 
                
                <div className="products-scrollable">
                    <div className="search-container1">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        name="searchInput"
                        className="search-input1"
                        placeholder="Search here..."
                        defaultValue={searchTerm}
                    />
                    <button type="submit" className="search-button">
                        Search
                    </button>
                </form>
                </div>
                    <div className="products-container">
                        {data.map((product) => (
                            <div key={product.id} className="product-card">
                                {product.cover_id ? (
                                    <img
                                        src={`https://covers.openlibrary.org/b/id/${product.cover_id}-M.jpg`}
                                        alt={product.title}
                                        loading="lazy"
                                        className="product-image"
                                    />
                                ) : (
                                    <div className="no-image">No Image Available</div>
                                )}
                                <h5 className="product-title">{product.title}</h5>
                                <p className="product-author">{product.author}</p>
                                {/* <p className="product-publisher">Publisher: {product.publisher}</p>
                                <p className="product-published-date">Published: {product.published_date}</p>
                                <p className="product-edition">Edition: {product.edition}</p> */}
                                <p className="product-isbn">ISBN: {product.isbn}</p> {/* Display ISBN */}
                                <p className="product-pages">Pages: {product.num_pages}</p>
                                {/* To go to BookDetails.jsx component  and you need to pass this ok */}
                                <NavLink to={`/book1/${product.isbn}`} state={product}>
                                <button className="add-to-cart-button">Get Details</button>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

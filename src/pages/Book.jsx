

// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import "./ProductsInfiniteP.css";

//  export const Book = () => {
//     const [products, setProducts] = useState([]);
//     const [page, setPage] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [totalProducts, setTotalProducts] = useState(0);
//     const observerRef = useRef();

//     // Function to fetch products
//     const fetchProducts = async (currentPage = 0) => {
//         setLoading(true);
//         const res = await axios.get(
//             `https://dummyjson.com/products?limit=20&skip=${currentPage * 20}`
//         );
//         const data = await res.data;
//         setProducts((prev) =>
//             currentPage === 0 ? data.products : [...prev, ...data.products]
//         ); // Append for infinite scroll; reset on manual page change
//         setTotalProducts(data.total); // Total products count from API
//         setLoading(false);
//     };

//     useEffect(() => {
//         fetchProducts(page); // Fetch initial products or based on page
//     }, [page]);

//     // Infinite Scroll: Intersection Observer
//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 if (entries[0].isIntersecting && !loading) {
//                     if ((page + 1) * 20 < totalProducts) {
//                         setPage((prevPage) => prevPage + 1); // Load next page if within total limits
//                     }
//                 }
//             },
//             { threshold: 1.0 }
//         );

//         if (observerRef.current) {
//             observer.observe(observerRef.current);
//         }

//         return () => {
//             if (observerRef.current) {
//                 observer.unobserve(observerRef.current);
//             }
//         };
//     }, [loading, totalProducts]);

//     // Manual Pagination Handlers
//     const handlePrevPage = () => {
//         if (page > 0) {
//             setPage(page - 1);
//             setProducts([]); // Reset products for clean pagination
//         }
//     };

//     const handleNextPage = () => {
//         if ((page + 1) * 20 < totalProducts) {
//             setPage(page + 1);
//             setProducts([]); // Reset products for clean pagination
//         }
//     };

//     return (
//         <>

//         <div className="bigone">

//         <div className="sidebar">
//         <h1>hello there sidbar</h1>
//         </div>

        
//         <main className="main-container">
//             <h1 className="main-title">Product Showcase</h1>
//             <div className="search-container">
//             <input type="text" className="search-input" placeholder="Search here..." />
//                 <button className="search-button">Search</button>
//             </div>
            {/* <div className="pagination-container">
                <button
                className="pagination-button"
                onClick={handlePrevPage}
                disabled={page === 0}
                >
                Prev
                </button>
                <p className="page-info">
                Page {page + 1} of {Math.ceil(totalProducts / 20)}
                </p>
                <button
                className="pagination-button"
                onClick={handleNextPage}
                disabled={(page + 1) * 20 >= totalProducts}
                >
                Next
                </button>
                </div> */}

            {/* <div className="products-scrollable">
                <div className="products-container">
                    {products?.map((product, index) => (
                        <div key={index} className="product-card">
                            <img
                                src={product.thumbnail}
                                alt={product.thumbnail}
                                className="product-image"
                                />
                            <h5 className="product-title">{product.title}</h5>
                            <p className="product-price">
                                {"Rs " + product.price}
                            </p>
                            <button className="add-to-cart-button">
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
                <div ref={observerRef} className="loading-trigger">
                    {loading && <p className="loading-text">Loading more...</p>}
                </div>
            </div> */}

            {/* //pagination here */}
            {/* <div className="pagination-container">
                <button
                    className="pagination-button"
                    onClick={handlePrevPage}
                    disabled={page === 0}
                    >
                    Prev
                </button>
                <p className="page-info">
                    Page {page + 1} of {Math.ceil(totalProducts / 20)}
                </p>
                <button
                    className="pagination-button"
                    onClick={handleNextPage}
                    disabled={(page + 1) * 20 >= totalProducts}
                    >
                    Next
                </button>
            </div>
        </main>
    </div>
    </>
    );
}; */}

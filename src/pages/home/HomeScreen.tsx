import { useEffect, useState } from "react";
import { viewProduct } from "../../api/storeAPI";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { addProductToCart, addProductToStore } from "../../global/storeSlice";
// import Header from "../../static/Header";
// import { MdArrowLeft } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.products || []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await viewProduct();
        if (Array.isArray(response)) {
          dispatch(addProductToStore(response));
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = Array.isArray(data)
    ? data.slice(startIndex, endIndex)
    : [];
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  return (
    <div className="flex flex-col">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Product Page</title>
        <link rel="canonical" href="http://localhost:5274" />
        <meta name="description" content="This is the best application ever" />
      </Helmet>

      <div className="mx-10">
        <p>Products</p>

        <div className="w-full gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedData.map((el: any) => (
            <div key={el?.id} className="m-2">
              <img
                src={el?.productImage || "/placeholder.png"} // Use placeholder image if productImage is missing
                alt={el?.productName || "Product"}
                className="w-full h-[340px] rounded-t-md object-cover"
              />
              <p className="font-semibold mt-2">
                {el?.productName || "Unknown Product"}
              </p>
              <div className="mt-3 w-full flex justify-between items-center">
                <p>₦{el?.productPrice || "N/A"}</p>
                <div>
                  <Link
                    to={`/product/${el?.id}`}
                    className="bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-2 px-4 text-[12px] rounded-md"
                  >
                    View Product
                  </Link>
                  <button
                    className="bg-neutral-950 hover:bg-neytral-900 transition-all duration-300 text-white py-2 px-4 text-[12px] rounded-md"
                    onClick={() => {
                      dispatch(addProductToCart(el));
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center w-full h-[100px] justify-center text-white gap-3">
          <button
            className="p-5 rounded-md bg-gray-900 h-[2vh] flex justify-center items-center"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            <FaArrowLeft className="text-white" />
          </button>
          <span className="font-semibold text-black">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="p-5 rounded-md bg-gray-900 h-[2vh] flex justify-center items-center"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <FaArrowRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

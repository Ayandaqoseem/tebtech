import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "./Category.scss"
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteCategory,
  getCategories,
} from "../../../redux/feactures/categoryAndBrand/categoryAndBrandSlice";
import ReactPaginate from "react-paginate";



const CategoryList = () => {
  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();


  

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Category",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCat(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const delCat = async (slug) => {
    await dispatch(deleteCategory(slug));
    await dispatch(getCategories());
  };

    // Begin Pagination
    const itemsPerPage = 15;
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = categories.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(categories.length / itemsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % categories.length;
      setItemOffset(newOffset);
    };
    // End Pagination

  return (
    <div className="--mb2 ">
      <h3>All Categories</h3>

      <div className={"table"}>
        {categories.length === 0 ? (
          <p>No category found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((cat, index) => {
                const { _id, name, slug } = cat;
                return (
                  <tr key={_id}>
                    <td>{itemOffset + index + 1}</td>
                    <td>{name}</td>

                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          onClick={() => confirmDelete(slug)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
    </div>
  );
};

export default CategoryList;

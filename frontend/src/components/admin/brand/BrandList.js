import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteBrand, getBrands } from "../../../redux/feactures/categoryAndBrand/categoryAndBrandSlice";
import ReactPaginate from "react-paginate";




const BrandList = ({ brands }) => {
  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure you want to delete this brand?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delBrand(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const delBrand = async (slug) => {
    await dispatch(deleteBrand(slug));
    await dispatch(getBrands());
  };

   // Begin Pagination
   const itemsPerPage = 15;
   const [itemOffset, setItemOffset] = useState(0);
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = brands.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(brands.length / itemsPerPage);
 
   const handlePageClick = (event) => {
     const newOffset = (event.selected * itemsPerPage) % brands.length;
     setItemOffset(newOffset);
   };
   // End Pagination

  return (
    <div className="--mb2 ">
      <h3>All Brands</h3>
      {/* <pre>{JSON.stringify(brands, null, 2)}</pre> */}

      <div className={"table"}>
        {brands.length === 0 ? (
          <p>No brand found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((brand, index) => {
                const { _id, name, slug, category } = brand;
                return (
                  <tr key={_id}>
                    <td>{itemOffset + index + 1}</td>
                    <td>{name}</td>
                    <td>{category}</td>

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

export default BrandList;

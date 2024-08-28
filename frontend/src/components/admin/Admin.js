import { Route, Routes } from "react-router-dom"
import CreateBlog from "./blog/createBlog/CreateBlog"
import AdminProfile from "./adminProfile/AdminProfile"
import styles from "./Admin.module.scss"
import AdminNavbar from "./adminNavbar/AdminNavbar"
import { PiSidebarDuotone } from "react-icons/pi";
import { useState } from "react"
import GetBlogs from "./blog/getBlogs/GetBlogs"
import UpdateBlog from "./blog/updateBlog/UpdateBlog"
import Category from "./category/Category"
import Brand from "./brand/Brand"
import AddProduct from "./addProduct/AddProduct"
import ViewProducts from "./viewProducts/ViewProducts"
import EditProduct from "./editProduct/EditProduct"
import Coupon from "./coupon/Coupon"
import Orders from "./orders/Orders"
import OrderDetails from "./orderDetails/OrderDetails"



export default function Admin() {
    const [showBar, setShowBar] = useState(false);

    const toggleBar = () => {
        setShowBar(!showBar)
    }
    return(
        <div className={styles.admin}>
            <aside className={
                showBar ? `${styles.show} ${styles.navbar}` : `${styles.navbar}`
            }>
                <AdminNavbar />
            {/* <div className={styles.navbar}>
            </div> */}
            </aside>
            <div className={styles.content}>
                <div className={styles.icon} onClick={toggleBar}>
                <PiSidebarDuotone  size={35} color="#ffa047" />
                </div>
                <Routes>
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="all-products" element={<ViewProducts />} />
                    <Route path="edit-product/:id" element={<EditProduct />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="order-details/:id" element={<OrderDetails />} /> 
                    <Route path="create-blog" element={<CreateBlog />} />
                    <Route path="get-blogs" element={<GetBlogs /> } />
                    <Route path="edit-blog/:id" element={<UpdateBlog /> } />
                    <Route path="category" element={<Category />} />
                    <Route path="brand" element={<Brand />} />
                    <Route path="coupon" element={<Coupon />} />
                </Routes>
            </div>
        </div>
    )
}
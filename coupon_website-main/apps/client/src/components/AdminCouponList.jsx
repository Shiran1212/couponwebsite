import React, { useState, useEffect } from "react";
import CouponFormPopup from "./CouponFormPopup";
import CouponEdit from "./CouponEdit";
import axios from "axios";

function AdminCouponList() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/coupon/getCoupon"
        );
        setCoupons(response.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };
    fetchCoupons();
  }, []);

  const deleteCoupon = async (name) => {
    try {
      await axios.delete("http://localhost:5000/api/deleteCoupon", {
        data: { name },
      }); // Send the name of the coupon to be deleted in the request body
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon.name !== name)
      );
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const openEditPopup = (coupon) => {
    setSelectedCoupon(coupon);
    setShowEditPopup(true);
  };

  const openAddPopup = () => {
    setSelectedCoupon(null);
    setShowAddPopup(true);
  };

  const onSubmit = async (values) => {
    try {
      if (selectedCoupon) {
        // Update existing coupon
        const response = await axios.put("http://localhost:5000/api/updateCoupon", values);
        const updatedCoupon = response.data;
        const updatedCoupons = coupons.map((coupon) =>
          coupon.id === updatedCoupon.id ? updatedCoupon : coupon
        );
        setCoupons(updatedCoupons);
        setShowEditPopup(false);
      } else {
        // Add new coupon
        const response = await axios.post("http://localhost:5000/api/addCoupon", values);
        const newCoupon = response.data;
        setCoupons([...coupons, newCoupon]);
        setShowAddPopup(false);
      }
      
    } catch (error) {
      console.error("Error submitting coupon:", error);
    } finally {
      // אין צורך לקבוע את setSubmitting בכל המקרים כאן, כיוון שזה אינו נמצא באובייקט הארגומנטים
    }
};


  return (
    <div className="admin-coupon-list">
      <h2>Coupon List</h2>
      <button onClick={openAddPopup}>Add New Coupon</button>
      <br />
      <br />
      <ul className="coupon-list">
        {coupons.map((coupon) => (
          <li key={coupon.id} className="coupon-item">
            <strong> Coupon Name:</strong> {coupon.name}
            <br />
            <strong>Description:</strong> {coupon.description}
            <br />
            <strong>Expiry Date:</strong> {coupon.expired}
            <br />
            <strong>Category:</strong> {coupon.category}
            <br />
            {coupon.imageSrc && (
              <img
                src={coupon.imageSrc}
                alt={coupon.nameSrc}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
            <br />
            <button onClick={() => deleteCoupon(coupon.name)}>Delete</button>
            <button onClick={() => openEditPopup(coupon)}>Edit</button>
          </li>
        ))}
      </ul>

      {showAddPopup && (
        <CouponFormPopup
          initialValues={{
            name: "",
            description: "",
            expired: "",
            category: "fashion",
            image: null,
          }}
          onSubmit={onSubmit}
          onCancel={() => setShowAddPopup(false)}
        />
      )}

      {showEditPopup && selectedCoupon && (
        <CouponEdit
          initialValues={selectedCoupon}
          onSubmit={onSubmit}
          onCancel={() => setShowEditPopup(false)}
        />
      )}
    </div>
  );
}

export default AdminCouponList;

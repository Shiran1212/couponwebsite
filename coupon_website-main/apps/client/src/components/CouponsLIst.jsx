import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from './Popup';

export const CouponsList = ({ coupons, userId }) => {
  const [selectedCoupons, setSelectedCoupons] = useState([]);
  const [popupCoupon, setPopupCoupon] = useState(null);

  useEffect(() => {
    const fetchUserWishList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/getUser", { params: { userId } });
        const user = response.data;
        setSelectedCoupons(user.wishList);
      } catch (error) {
        console.error("Error fetching user wish list:", error);
      }
    };

    fetchUserWishList();
  }, [userId]);

  const toggleCouponSelection = async (couponId) => {
    if (selectedCoupons.includes(couponId)) {
      setSelectedCoupons(selectedCoupons.filter(id => id !== couponId));
      await axios.post("http://localhost:5000/user/removeCouponFromWishList", { couponId });
    } else {
      setSelectedCoupons([...selectedCoupons, couponId]);
      await axios.post("http://localhost:5000/user/addCouponToWishList", { couponId });
    }
  };

  const openPopup = (coupon) => {
    setPopupCoupon(coupon);
  };

  const closePopup = () => {
    setPopupCoupon(null);
  };

  return (
    <>
    <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative"
            }}
            onClick={() => openPopup(coupon)}
          >
            <h2>{coupon.name}</h2>
            <div
              style={{
                width: "100%",
                paddingBottom: "75%",
                position: "relative",
              }}
            >
              <img
                src={coupon.imageSrc}
                alt={coupon.name}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "270px",
                  height: "200px",
                }}
              />
            </div>
            <p><strong>Description:</strong> {coupon.description}</p>
            <p><strong>Discount Percentage:</strong> {coupon.discount}%</p>
            <p><strong>Expiry Date:</strong> {coupon.expired}</p>
            
            
          </div>
        ))}
      </div>
      <Popup coupon={popupCoupon} onClose={closePopup} userId={userId} />
    </>
  );
};

export default CouponsList;

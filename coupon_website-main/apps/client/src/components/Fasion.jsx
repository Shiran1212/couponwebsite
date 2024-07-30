import React, { useEffect, useState } from "react";
import axios from "axios";
import { CouponsList } from "./CouponsList";

export const Fashion = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const getCoupons = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/coupon/getCoupon"
      );
      const fashionCoupons = data.filter(
        (coupon) => coupon.category === "fashion"
      );
      setCoupons(fashionCoupons);
    };
    getCoupons();
  }, []);

  return <CouponsList coupons={coupons} />;
};

export default Fashion;

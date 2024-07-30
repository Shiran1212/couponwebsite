
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CouponsList } from './CouponsList';

export const Home = () => {
    const [coupons, setCoupons] = useState([]);
  
    useEffect(() => {
      const getCoupons = async () => {
        const { data } = await axios.get("http://localhost:5000/coupon/getCoupon");
        // Filter coupons based on category
        const homeCoupons = data.filter(coupon => coupon.category === 'home');
        setCoupons(homeCoupons);
      };
      getCoupons();
    }, []);

    return <CouponsList coupons={coupons} />;
  };

export default Home;

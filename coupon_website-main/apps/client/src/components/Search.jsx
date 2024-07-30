import React, { useEffect, useState } from "react";
import axios from "axios";
import { CouponsList } from "./CouponsList";



export const Search = ( )=>{


    const [coupons, setCoupons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchCoupons = async () => {
        try {
          if (!searchQuery) {
            setCoupons([]);
            return;
          }
  
          const { data } = await axios.get("http://localhost:5000/api/search?q=" + searchQuery);
          setCoupons(data);
        } catch (error) {
          console.error("Error fetching coupons:", error);
        }
      };
  
      fetchCoupons();
    }, [searchQuery]);
  
    const handleSearchInputChange = (event) => {
      setSearchQuery(event.target.value);
    };

    return (

        
    
    <div>
          <input
          className="searchInput"
            type="text"
            placeholder="Search for coupons..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {searchQuery && coupons.length > 0 ? (
            <CouponsList coupons={coupons} />
          ) : (
            <p> </p>
          )}
        </div>

)}
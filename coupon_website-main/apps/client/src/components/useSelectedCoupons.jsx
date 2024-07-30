import React, { createContext, useState, useContext } from 'react';

// יצירת מקור נתונים גלובלי עבור רשימת הקופונים שנבחרו
const SelectedCouponsContext = createContext();

// קומפוננטת ספק שמספקת את רשימת הקופונים שנבחרו לרכיבים הנמצאים בתוך ה-Provider
export const SelectedCouponsProvider = ({ children }) => {
  const [selectedCoupons, setSelectedCoupons] = useState([]);

  // פונקציה להוספת קופון לרשימת הקופונים שנבחרו
  const addSelectedCoupon = (couponId) => {
    setSelectedCoupons([...selectedCoupons, couponId]);
  };

  // פונקציה להסרת קופון מרשימת הקופונים שנבחרו
  const removeSelectedCoupon = (couponId) => {
    setSelectedCoupons(selectedCoupons.filter(id => id !== couponId));
  };

  // יצירת אובייקט עם הנתונים והפונקציות שישמשו כערכי context
  const value = {
    selectedCoupons,
    addSelectedCoupon,
    removeSelectedCoupon,
  };

  return (
    <SelectedCouponsContext.Provider value={value}>
      {children}
    </SelectedCouponsContext.Provider>
  );
};

// קומפוננטת קונסומר שמשתמשת ברשימת הקופונים שנבחרו מה-Context
export const useSelectedCoupons = () => {
  return useContext(SelectedCouponsContext);
};

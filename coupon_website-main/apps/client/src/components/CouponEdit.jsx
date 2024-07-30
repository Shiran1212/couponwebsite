import React, { useState } from "react";
import axios from "axios";

function CouponEdit({ initialValues, onCancel }) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update the coupon
      await axios.put("http://localhost:5000/api/updateCoupon", formData);
      // After successful update, close the edit form
      onCancel();
      alert("Coupon is updated");
      window.location.reload();
    } catch (error) {
      console.error("Error updating coupon:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <form className="popup-form" onSubmit={handleSubmit}>
          <h2>Edit Coupon</h2>
          <label>
            Coupon Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="text"
              name="expired"
              value={formData.expired}
              onChange={handleChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </label>
          <label>
            Discount Percentage:
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </label>
          <label>
            Code:
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="imageSrc"
              value={formData.imageSrc}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CouponEdit;

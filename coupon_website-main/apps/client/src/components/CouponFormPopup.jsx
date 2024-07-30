import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

function CouponFormPopup({ initialValues, onSubmit, onCancel }) {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send POST request to create a new coupon
      const response = await axios.post(
        "http://localhost:5000/api/createCoupon",
        {
          ...values,
          imageSrc: values.image, // Assuming the image URL is provided in the "image" field
        }
      );

      // Handle successful response
      if (response.status === 200) {
        console.log("Coupon created successfully:", response.data);
        onSubmit(response.data); // Pass the new coupon data to the parent component
        alert("Coupon is added");
      window.location.reload();
      } else {
        console.error("Failed to create coupon:", response.data);
      }
    } catch (error) {
      console.error("Error creating coupon:", error);
    } finally {
      setSubmitting(false); // Enable the submit button again
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="popup" encType="multipart/form-data">
          <div className="popup-inner">
            <h2>{initialValues= "Add New Coupon"}</h2>
            <label>
              Coupon Name:
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </label>
            <label>
              Description:
              <Field type="text" name="description" />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
            </label>
            <label>
              Expiry Date:
              <Field type="text" name="expired" />
              <ErrorMessage
                name="expired"
                component="div"
                className="error"
              />
            </label>
            <label>
              Category:
              <Field type="text" name="category" />
              <ErrorMessage name="category" component="div" className="error" />
            </label>
            <label>
              Discount Percentage:
              <Field type="text" name="discount" />
              <ErrorMessage name="discount" component="div" className="error" />
            </label>
            <label>
              Code:
              <Field type="text" name="code" />
              <ErrorMessage name="code" component="div" className="error" />
            </label>
            <label>
              Image URL:
              <Field type="text" name="image" />
              <ErrorMessage name="image" component="div" className="error" />
            </label>
            <br />
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default CouponFormPopup;

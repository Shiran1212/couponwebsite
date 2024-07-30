import React, { useState } from 'react';

const Popup = ({ coupon, onClose }) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [closing, setClosing] = useState(false); 
  const handleViewCode = () => {
    setCodeVisible(true);
  };

  const handleClose = () => {
    setClosing(true); 
    setTimeout(() => {
      onClose();
      setCodeVisible(false);
      setClosing(false); 
    }, 500); 
  };

  if (!coupon) return null;

  return (
    <div style={styles.popupWrapper}>
      <div style={styles.popup}>
        <button style={styles.closeButton} onClick={handleClose}>X</button>
        <h2>{coupon.name}</h2>
        <img src={coupon.imageSrc} alt={coupon.name} style={styles.image} />
        <p><strong>Description:</strong> {coupon.description}</p>
        <p><strong>Discount Percentage:</strong> {coupon.discount}%</p>
        <p><strong>Expiry Date:</strong> {coupon.expired}</p>
        {codeVisible ? (
          <p><strong>Code:</strong> <span style={styles.code}>{coupon.code}</span></p>
        ) : (
          <button onClick={handleViewCode} style={styles.viewCodeButton}>View Coupon Code</button>
        )}
      </div>
      {closing && <div style={styles.background} />} {/* רקע כהה שמאחורי הפופאפ רק כאשר מתבצעת פעולת הסגירה */}
    </div>
  );
};

const styles = {
  popupWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  code: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'red',
  },
  viewCodeButton: {
    backgroundColor: '#EFA593',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
};

export default Popup;

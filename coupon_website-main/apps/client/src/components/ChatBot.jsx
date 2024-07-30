import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CouponsList from './CouponsList';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello, how are you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [category, setCategory] = useState('');
  const [isCouponListVisible, setIsCouponListVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [couponScrollPosition, setCouponScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // משתנה המציין האם המשתמש מחובר

  useEffect(() => {
    if (step === 3) {
      fetchCoupons();
    }
  }, [step, category]);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('http://localhost:5000/coupon/getCoupon');
      const filteredCoupons = response.data.filter(coupon => coupon.category === category);
      setCoupons(filteredCoupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const newMessage = {
      text: input,
      sender: 'user'
    };

    setMessages([...messages, newMessage]);
    setInput('');

    setTimeout(() => {
      let botMessage = '';

      if (step === 0) {
        botMessage = 'What is your name?';
        setStep(1);
      } else if (step === 1) {
        botMessage = `Nice to meet you, ${input}! What category of coupons are you looking for? (food, home, fashion, beauty)`;
        setUserName(input);
        setStep(2);
      } else if (step === 2) {
        const chosenCategory = input.toLowerCase();

        if (['food', 'home', 'fashion', 'beauty'].includes(chosenCategory)) {
          botMessage = `Here are some ${input} coupons for you:`;
          setCategory(chosenCategory);
          setStep(3);
        } else {
          botMessage = 'Please choose a valid category: food, home, fashion, or beauty.';
        }
      }

      setMessages(prevMessages => [
        ...prevMessages,
        { text: botMessage, sender: 'bot' }
      ]);
    }, 1000);
  };

  const toggleCouponListVisibility = () => {
    setIsCouponListVisible(!isCouponListVisible);
  };

  const toggleChatVisibility = () => {
    setIsChatOpen(!isChatOpen);
  };

  const scrollCouponList = direction => {
    if (direction === 'up') {
      setCouponScrollPosition(prevPosition => prevPosition - 50);
    } else if (direction === 'down') {
      setCouponScrollPosition(prevPosition => prevPosition + 50);
    }
  };

  // בדיקה האם המשתמש מחובר
  useEffect(() => {
    // אם יש טוקן של משתמש באזכור בזיכרון המקומי
    const userToken = localStorage.getItem('user');
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      // אם המשתמש לא מחובר, נוסיף הודעה לקבלת קופונים נדרש התחברות
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'Please login to get coupons.', sender: 'bot' }
      ]);
    }
  }, []);

  return (
    <>
      {isChatOpen && isLoggedIn && (
        <div style={styles.chatBot}>
          <div style={styles.chatWindow}>
            <button onClick={toggleChatVisibility} style={{ position: 'absolute', top: '5px', right: '5px' }}>
              Close Chat
            </button>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.chatMessage,
                  ...(msg.sender === 'bot' ? styles.chatMessageBot : styles.chatMessageUser)
                }}
              >
                {msg.text}
              </div>
            ))}
            {step === 3 && (
              <div style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                {coupons.length > 0 && <CouponsList coupons={coupons} />}
              </div>
            )}
          </div>
          <div style={styles.chatInput}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') handleSend();
              }}
              style={styles.chatInputText}
            />
            <button onClick={handleSend} style={styles.chatInputButton}>
              Send
            </button>
          </div>
          {isCouponListVisible && (
            <div style={{ position: 'fixed', bottom: '90px', right: '20px' }}>
              <button onClick={() => scrollCouponList('up')}>Scroll Up</button>
              <button onClick={() => scrollCouponList('down')}>Scroll Down</button>
            </div>
          )}
        </div>
      )}
      {!isChatOpen && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <button className='chatBot' onClick={toggleChatVisibility}>Show Chat</button>
        </div>
      )}
    </>
  );
};

const styles = {
  chatBot: {
    border: '1px solid #ccc',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: '#FAF2E9',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  chatWindow: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    position: 'relative'
  },
  chatMessageUser: {
    background: '#EFA593',
    color: 'black',
    alignSelf: 'flex-end'
  },
  chatInputText: {
    flex: 1,
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '10px'
  },
  chatInputButton: {
    padding: '8px 12px',
    background: '#EFA593',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default ChatBot;

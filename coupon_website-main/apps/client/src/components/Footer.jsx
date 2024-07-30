import { FaSquareInstagram, FaWhatsapp, FaEnvelope, FaFacebookF } from "react-icons/fa6";


const Footer = () => {
  return (
    <>
      <br /><br />
      <footer className="footer">
        <div className="footer-contact">
          <h4>Contact us</h4>
          <p><strong>Phone:</strong> 03-963-4000</p>
        </div>
        <div className="footer-socials">
         
          <div className="icons">
            <a href="https://wa.me/039628930" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp style={{ fontSize: '25px' }} />
            </a>
            <a href="mailto:Maitala@college.org.il" target="_blank" rel="noopener noreferrer">
              <FaEnvelope style={{ fontSize: '25px' }} />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF style={{ fontSize: '25px' }} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaSquareInstagram style={{ fontSize: '25px' }} />
            </a>
          </div>
        </div>
        <div >
          <p><a href="/privacy-policy">Privacy Policy</a></p>
          <p><a href="/terms-of-use">Terms of Use</a></p>


        </div>
      </footer>
      <div className="copyright">
        <p>&copy; 2024, Coupony</p>
      </div>
    </>
  );
};

export default Footer;

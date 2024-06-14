import { useState } from "react";
import "./Footer.scss";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import LogoImg from "../../assets/Logo.svg"

const encodeMessage = (message) => {
  return encodeURIComponent(message)
}

export default function Footer() {
  const [showIcon, setShowIcon] = useState(false);
  
  
  const handleWhatsappClick = () => {
    const teamNum = process.env.REACT_APP_WHATSAPP_NUM;
    const message = process.env.REACT_APP_WHATSAPP_PREFIL_MESSAGE
    const whatsappBaseUrl = process.env.REACT_APP_WHATSAPP_LINK
    const encodedMessage = encodeMessage(message);

    console.log("message =>", message)
    window.open(`${whatsappBaseUrl}/${teamNum}?text=${encodedMessage}`, "_blank")
  }
  

  const toggleShowIcon = () => {
    setShowIcon(!showIcon);
  };

  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <div className="footer">
        <div className="whatsapp-icon-container">
          <div className="whatsapp-icon">
            <button className="whatsapp-btn" onClick={toggleShowIcon}>
              {showIcon ? (
                <MdOutlineClose size={30} className="icon" />
              ) : (
                <AiOutlineWhatsApp size={30} className="icon" />
              )}
            </button>
          </div>
          {showIcon && (
            <div className="chat-head-container">
              <div className="chat-head">
                <AiOutlineWhatsApp size={60} className="chat-head-icon" />
                <div className="chat-head-text">
                  <p className="start-text-1 ">Start conversation</p>
                  <p className="start-text-2">
                    Hi! Click on one of our member below to chat on whatsapp
                  </p>
                </div>
              </div>
              <p className="info-text-1">The team typically replies in a few minutes.</p>
             <div className="wa-me" onClick={handleWhatsappClick}>
              <div className="wa-me-1">
                <img className="wa-me-img" src={LogoImg} alt="profile"/>
                <p>Tebtechnologyltd</p>
                </div>
              </div>
              <p className="dev-info">POWERED BY KAYTEAM</p>
            </div>
          )}
          {!showIcon && (
            <span className="help-text">Need Help? Chat with us</span>
          )}
        </div>

        <p>All Rights Resevered &copy; {year} Tebtechnology Ltd || terms</p>
      </div>
    </>
  );
}

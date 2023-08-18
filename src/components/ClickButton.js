import React, { useState } from "react";
import Modal from "react-modal";
import "./ClickButton.scss"; // Import your custom styles


const ClickButton = (props) => {
  
	const [modalIsOpen, setModalIsOpen] = useState(false);
  	const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

   return (
    <div>
      <button onClick={openModal}>Open User Info Modal</button>
      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User Info Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>User Information</h2>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={closeModal}>Close</button>
        </form>
      </Modal>
    </div>
  );
}


export default ClickButton;

import React, { useState } from 'react'
import axios from 'axios';

export const App = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);


  const sendMessage = async (e) => {
    e.preventDefault();

    setMessages(prev => {
      return [...prev, { sender: "user", text }];
    })
    const { data } = await axios.post("http://localhost:4000/dialogflow", { text });
    setMessages(prev => {
      return [...prev, { sender: "bot", text: data }];
    })

    e.target.reset();
    setText("");
  }

  return (
    <div className='container'>
      <div className="content__body">
        <div className="chat__items">


          {messages?.map((msg, index) => (
            <div key={`${index}-message`}
              className={`chat__item ${msg.sender === "bot" ? "" : "other"}`}
              style={{
                animationDelay: `0.8s`,
              }}>
              <div className="chat__item__content">
                <div className="chat__msg">{msg.text}</div>
                <div className="chat__meta">
                  <span>16 mins ago</span>
                  <span>Seen 1.03PM</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>




      <div className="sendNewMessage">
        <form onSubmit={sendMessage}>

          <input className="inputFeild"
            type="text"
            placeholder="Type a message here"
            value={text}
            onChange={(e) => { setText(e.target.value) }}
          />
          <button className="btnSendMsg" id="sendMsgBtn">
            <i className="fa fa-paper-plane"></i>
          </button>
        </form>
      </div>



    </div>
  )
}

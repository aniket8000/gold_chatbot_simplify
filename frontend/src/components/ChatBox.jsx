import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const GOLD_RATE = 6000; // 1 gram gold price in ₹

function ChatBox() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I am Kuber.ai. Ask me anything about gold!" },
  ]);
  const [input, setInput] = useState("");
  const [modalStep, setModalStep] = useState(0); // 0=closed, 1=quantity, 2=confirm, 3=success
  const [quantity, setQuantity] = useState("");
  const [qtyError, setQtyError] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, modalStep, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/ask", {
        question: input,
      });

      if (res.data.suggestion) {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: res.data.answer },
          { sender: "ai", text: res.data.suggestion, isSuggestion: true },
        ]);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: res.data.answer }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Something went wrong. Please try again." },
      ]);
    }

    setInput("");
  };

  const openBuyFlow = () => {
    setQtyError("");
    setQuantity("");
    setModalStep(1);
  };

  const handleNoThanks = () => {
    setMessages((prev) => [
      ...prev,
      { sender: "ai", text: "👍 No worries! Let me know if you change your mind." },
    ]);
  };

  const handleNextFromQuantity = () => {
    const q = Number(quantity);
    if (!quantity || isNaN(q) || q <= 0) {
      setQtyError("Please enter a valid quantity (>0).");
      return;
    }
    setQtyError("");
    setModalStep(2);
  };

  const handleConfirmPurchase = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/gold/buy", {
        user: "demo-user",
        amount: Number(quantity),
      });

      const totalCost = Number(quantity) * GOLD_RATE;

      const successText = res?.data?.message ?? "Your gold purchase successful!";
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: `${successText} You bought ${quantity}g for ₹${totalCost}` },
      ]);

      setModalStep(3);
      setTimeout(() => {
        setModalStep(0);
        setQuantity("");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "⚠️ Purchase failed. Please try again later." },
      ]);
      setModalStep(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-header">💬 Kuber.ai</div>

        <div className="chat-window">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.sender === "user" ? "user" : "ai"}`}>
              <p>{msg.text}</p>

              {msg.isSuggestion && (
                <div className="options">
                  <button onClick={openBuyFlow} className="btn-yes">✅ Yes, Buy Gold</button>
                  <button onClick={handleNoThanks} className="btn-no">❌ No Thanks</button>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>

      {/* Modal */}
      {modalStep > 0 && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-box">
            {modalStep === 1 && (
              <>
                <h3>Enter quantity (grams)</h3>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 5"
                />
                <p>1g gold = ₹{GOLD_RATE}</p>
                {quantity && !isNaN(Number(quantity)) && Number(quantity) > 0 && (
                  <p>Total cost: <b>₹{Number(quantity) * GOLD_RATE}</b></p>
                )}
                {qtyError && <div className="qty-error">{qtyError}</div>}
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setModalStep(0)}>Cancel</button>
                  <button className="btn-next" onClick={handleNextFromQuantity}>Next</button>
                </div>
              </>
            )}

            {modalStep === 2 && (
              <>
                <h3>Confirm purchase</h3>
                <p>Are you sure you want to buy <b>{quantity}g</b> of gold?</p>
                <p>Total: <b>₹{Number(quantity) * GOLD_RATE}</b></p>
                <div className="modal-actions">
                  <button className="btn-cancel" onClick={() => setModalStep(1)}>Back</button>
                  <button className="btn-confirm" onClick={handleConfirmPurchase} disabled={loading}>
                    {loading ? "Processing..." : "Yes, Confirm"}
                  </button>
                </div>
              </>
            )}

            {modalStep === 3 && (
              <div className="success-box">
                <h3>🎉 Purchase successful</h3>
                <p>Your gold purchase was recorded.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBox;

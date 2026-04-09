import { useState } from "react";
import API from "../api/api";

export default function SendMoney() {

  const [receiver_id, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {

    try {

      await API.post("/account/transfer", {
        receiver_id,
        amount
      });

      alert("Transfer successful");

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div>

      <h2>Send Money</h2>

      <input
        placeholder="Receiver ID"
        onChange={(e) => setReceiver(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
      />

      <br/><br/>

      <button onClick={handleSend}>
        Send
      </button>

    </div>

  );
}
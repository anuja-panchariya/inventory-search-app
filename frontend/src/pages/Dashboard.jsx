import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Dashboard() {

  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  const getBalance = async () => {
    try {

      const res = await API.get("/account/balance");

      setBalance(res.data.balance);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (

    <div>

      <h2>Dashboard</h2>

      <h3>Balance : ₹{balance}</h3>

      <br/>

      <button onClick={() => navigate("/send")}>
        Send Money
      </button>

      <br/><br/>

      <button onClick={() => navigate("/statement")}>
        View Statement
      </button>

    </div>

  );
}
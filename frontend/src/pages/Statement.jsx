import { useEffect, useState } from "react";
import API from "../api/api";

export default function Statement() {

  const [transactions, setTransactions] = useState([]);

  const fetchStatement = async () => {
    try {

      const res = await API.get("/account/statement");

      setTransactions(res.data);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    fetchStatement();
  }, []);

  return (

    <div>

      <h2>Transaction Statement</h2>

      {transactions.map((t) => (
        <div key={t.id}>
          <p>{t.transaction_type} - ₹{t.amount}</p>
        </div>
      ))}

    </div>

  );
}
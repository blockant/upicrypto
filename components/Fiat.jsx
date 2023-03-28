import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Col, Row } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Fiat() {
  const [histories, setHistories] = useState([
    {
      token: "0x34x",
      values: 20,
      ref: "Txn ref",
    },
    {
      token: "0x34x",
      values: 20,
      ref: "Txn ref",
    },
    {
      token: "0x34x",
      values: 20,
      ref: "Txn ref",
    },
  ]);

  async function handleDeligatePayment() {
    const transaction = {
      user_id: "1",
      fiat_wallet_id: "23",
      fiat_wallet_balance: 56,
      fiat_wallet_currency: "USD",
      crypto_wallet_id: "XYZ",
      crypto_wallet_balance: ["87 usd", "23ETH"],
      crypto_wallet_currency: "USD",
      email: "XYZ@gmail.com",
      txn_client_name: "ALPHA",
      txn_client_id: "112",
      crypto_txn_fee: 234,
      crypto_txn_currency: "ETH",
      fiat_txn_fee: 32,
      fiat_txn_currency: "INR",
      txn_type: "SELF",
      txn_mode: "MERCHANTPAYMENT",
      timestamp: 231344,
      currency_type: "ERC20",
    };
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3002/add",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: transaction,
      });
      console.log("RETURNED DATA", res.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Row>
      <Col md={12}>
        <Button onClick={handleDeligatePayment}>Deligate Payment</Button>
        <div
          className="d-flex flex-columnn"
          style={{ flexDirection: "column" }}
        >
          {/* <Button onClick={handleDeligatePayment}>Deligate Payment</Button> */}
          {histories.map((item) => {
            return (
              <div className="d-flex">
                <div>{item.token}</div>
                <div>{item.values}</div>
                <div>{item.ref}</div>
              </div>
            );
          })}
        </div>
      </Col>
    </Row>
    // <div>
    //   <div>
    //     <button onClick={() => signOut()}>Logout</button>
    //     <h2>Balance</h2>
    //     <h2>Recharge</h2>
    //     <div>
    //       <h2>History</h2>
    //       <div className="history">
    //         {histories.map((item) => {
    //           return (
    //             <div>
    //               <div>{item.token}</div>
    //               <div>{item.values}</div>
    //               <div>{item.ref}</div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Col, Row } from "react-bootstrap";

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
  return (
    <Row>
      <Col md={12}>
        <div
          className="d-flex flex-columnn"
          style={{ flexDirection: "column" }}
        >
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

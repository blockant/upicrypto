import { useState } from "react";

export default function Crypto() {
  const [currencies, setCurrencies] = useState([
    {
      token: "BTC",
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

  const [transactions, setTranscations] = useState([
    {
      user: "0x34x",
      values: 20,
      link: "Txn ref",
    },
    {
      user: "0x34x",
      values: 20,
      link: "Txn ref",
    },
    {
      user: "0x34x",
      values: 20,
      link: "Txn ref",
    },
  ]);

  return (
    <div>
      <div>
        <div className="d-flex flex-column px-2 ">
          <div className="h-100 w-100 bg-secondary text-white p-4">
            <h2>Portfolio</h2>
          </div>
          <br />
          <div className="portfolio d-flex flex-column px-2 flex-grow-1 text-white ">
            {currencies.map((item, i) => {
              return (
                <div className="d-flex justify-content-center w-100 flex-grow-1 my-2 ">
                  <div className="pe-4 py-2 bg-secondary mx-2">
                    <span className="px-1"> {i + 1}</span>.{item.token}
                  </div>
                  <div className="px-4 py-2 bg-secondary mx-2 ">
                    {item.values}
                  </div>
                  <div className="px-4 py-2 bg-secondary mx-2">
                    <span>{item.ref}</span>
                    <span className="mx-2">Icon</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="d-flex px-2">
        <h2>Txn History</h2>
        <div className="portfolio d-flex px-2">
          {transactions.map((item) => {
            return (
              <div className="d-flex">
                <div>{item.user}</div>
                <div>{item.values}</div>
                <div>{item.link}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

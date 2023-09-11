import React, { Dispatch, SetStateAction, useState } from "react";
import { QrReader } from "react-qr-reader";
import { PaymentFormProps } from "../payment/Payment";
import "./QRScannerComponent.css";

interface QRScannerComponentProps {
  setPaymentFormProps: Dispatch<SetStateAction<PaymentFormProps>>;
  setShowPayment: Dispatch<SetStateAction<boolean>>;
}

const QRScannerComponent = (props: QRScannerComponentProps) => {
  return (
    <div className="qr-container">
      <QrReader
        onResult={(result, error) => {
          if (!!error) {
            console.info(error);
            return;
          }
          if (!result) {
            return;
          }
          let qrData: string[] = result.getText().split("|");
          console.log(qrData);
          props.setPaymentFormProps({
            payee: qrData[0],
            amount: parseFloat(qrData[2]),
            currency: qrData[3],
            transactionAmount: parseFloat(qrData[4]),
            transactionCurrency: qrData[5],
            isEditable: false,
          });
          props.setShowPayment(true);
        }}
        constraints={{ facingMode: "user" }}
      />
    </div>
  );
};

export default QRScannerComponent;

import React from 'react';
import './Payment.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Lottie from 'react-lottie';
import successAnimationData from '../lotties/success-confetti.json';
import failedAnimationData from '../lotties/payment-failed.json';

export interface PaymentStatusProps {
    status: string
}

const PaymentStatus = (props: PaymentStatusProps) => {
    const defaultSuccessOptions = {
        loop: false,
        autoplay: true,
        animationData: successAnimationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const defaultFailedOptions = {
        loop: false,
        autoplay: true,
        animationData: failedAnimationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const renderPaymentStatus = () => {
        switch(props.status) {
            case 'PAYMENT_SUCCESS': return <>
                <Lottie 
                    options={defaultSuccessOptions}
                    height={300}
                    width={300}
                />
            </>;

            case 'PAYMENT_FAILED': return <>
                <Lottie 
                    options={defaultFailedOptions}
                    height={300}
                    width={300}
                />
            </>

            default: return <></>
        }
    }

    return <div className='payment-center-content-container'>
            {
                renderPaymentStatus()
            }
        </div>
}

export default PaymentStatus;
import { CircularProgress } from '@mui/material';
import './Payment.css';

const PaymentLoading = () => {

    return <div className='payment-center-content-container'>
            <CircularProgress />
            <p>Processing Payment...</p>
        </div>
}

export default PaymentLoading;
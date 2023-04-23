import { Box, Button, Container, Divider, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { createWalletAPI } from '../api/api';

const walletStyle = {
    color: 'whitesmoke',
    width: '70vw',
    height: '50vh',
    backgroundColor: '#292121',
    marginTop: '20vh',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '.2em',
    boxSizing: 'border-box',
    padding: '5vh 0 5vh 0',
    display: 'flex',
    flexDirection: 'column'
}

interface WalletProps {
    setShowPayment: (show: boolean, action: string) => void,
    profile: any
}

const Wallet = (props: WalletProps) => {
    const [wallet, setWallet] = useState();

    useEffect(() => {
        createWalletAPI(props.profile.email).then((response) => {
            if(!response.ok) {
                alert("Wallet creation failed.");
                return Promise.reject();
            } else {
                return response.json();
            }
        }).then((response) => {
            setWallet(response);
        })
    }, []);

    return <Box sx={walletStyle}>
        <Grid container rowSpacing={1}>
            <Grid item xs={12}>
                <Box sx={{textAlign: 'center', fontSize: '2rem'}}>WALLET_NAME</Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Button color='inherit' size='small' endIcon={<ContentCopyIcon />}>ADDRESS</Button>
                </Box>
            </Grid>
            <Grid item xs={12}>

            </Grid>
        </Grid>
        <Divider />
        <Box sx={{marginTop: 'auto', display: 'flex', width: '100%', paddingRight: '2rem', boxSizing: 'border-box'}}>
            <Button variant='contained' color='primary' sx={{margin: '0 1em 0 auto'}} onClick={() => props.setShowPayment(true, 'PAY')}>Pay Now</Button>
            <Button variant='contained' color='primary' onClick={() => props.setShowPayment(true, 'SCAN_AND_PAY')}>Scan & Pay</Button>
        </Box>
    </Box>
}

export default Wallet;
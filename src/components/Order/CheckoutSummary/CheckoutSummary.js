import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button buttonType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
            <Button buttonType="Success" clicked={props.checkoutContinued}>Continue</Button>{/* Click event mogu da hendlujem u parentu preko PROPS-a*/}
        </div>
    );
};

export default CheckoutSummary;
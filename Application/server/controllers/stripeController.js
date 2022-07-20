require('dotenv').load;

const stripe = require('stripe');
const stripeSecret = process.env.STRIPE_API_KEY;

const express = require('express');
const app = express();

console.log(stripeSecret);

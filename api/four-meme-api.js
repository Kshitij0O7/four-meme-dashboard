const axios = require('axios');
require('dotenv').config();
const {tradesData} = require("@/query/trades");
const {traderData} = require("@/query/traders");
const {tokenData} = require("@/query/tokens");

let config = {
   method: 'post',
   maxBodyLength: Infinity,
   url: 'https://streaming.bitquery.io/graphql',
   headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
   },
   data : ""
};


const getLatestTrades = async () => {
    config.data = tradesData;
    const response = await axios.request(config);
    const latestTrades = response.data.data.EVM.Events;
    return latestTrades;
}

const getUserTrades = async () => {
  config.data = traderData;
  const response = await axios.request(config);
  const latestUserTrades = response.data.data.EVM;
  return latestUserTrades;
}

const getTokenTrades = async () => {
  config.data = tokenData;
  const response = await axios.request(config);
  const latestTokenTrades = response.data.data.EVM.Events;
  return latestTokenTrades;
}

// getLatestTrades(config)

module.exports = {getLatestTrades, getUserTrades, getTokenTrades};
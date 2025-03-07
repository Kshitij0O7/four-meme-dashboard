# 🦄 Four Meme DEX Dashboard

A **Next.js**-powered dashboard that displays the latest trades on the **Four Meme DEX** on BSC. Users can explore trades **by trader** or **by currency**, with links to [Bitquery Explorer](http://explorer.bitquery.io) for transaction details. You can  customize this dashboard and choose to show different data related to four meme. You can checkout the [Four Meme Queries](https://docs.bitquery.io/docs/examples/BSC/four-meme-api/) on Bitquery documentation.

## 🚀 Features
✅ **Live Trades Feed** - Displays the latest trades from the Four Meme DEX  

✅ **Trader Trades Page** - Shows all trades by a specific trader on Four Meme DEX

✅ **Currency Trades Page** - Displays all trades for a specific token on Four Meme DEX 

✅ **Toggle Buy/Sell Trades** - Easily switch between buys and sells for trades by a trader

✅ **Clickable Trader, Currency & Tx Hash** - Easy to navigate dashboard design & transaction hash linked to [Bitquery Explorer](http://explorer.bitquery.io)  

---

## 🛠️ Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/four-meme-dex-dashboard.git
cd four-meme-dex-dashboard
```

### 2️⃣ Install Dependencies
```sh
npm install
# or
yarn install
```

### 3️⃣ Run the Development Server
```sh
npm run dev
# or
yarn dev
```

## 📂 Project Structure
```bash
/api
 ├── latest-trades          → Bitquery API Logic for Fetching Trades
/app
 ├── /trades/trader/[id]    → Trader Trades Page
 ├── /trades/tokens/[id]    → Currency Trades Page
 ├── layout.js              → Root Layout
 ├── page.js                → Home Page
/public                     → Static Assets
/query                      → GraphQL Queries to send to Bitquery API
```

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getUserTrades } from "@/api/four-meme-api";

export default function TraderTrades() {
  const params = useParams();
  const trader = params.id;
  const [buys, setBuys] = useState([]);
  const [sells, setSells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBuys, setShowBuys] = useState(true); // Toggle state

  useEffect(() => {
    if (!trader) return;

    async function fetchTrades() {
      try {
        const data = await getUserTrades(trader);
        // const data = await response.json();

        // Separate Buys and Sells
        const buysList = data.buys;
        const sellsList = data.sells;

        setBuys(buysList);
        setSells(sellsList);
        // console.log(buys.length, sells.length)
      } catch (error) {
        console.error("Error fetching trades:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrades();
  }, [trader]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative">
      {/* Back Button */}
      <Link href="/">
        <button className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Home
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-4">Trades by {trader}</h1>

      {/* Toggle Button */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={() => setShowBuys(!showBuys)}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
        >
          Toggle Buys/Sells
        </button>
        <span className="text-lg">{showBuys ? "Viewing: Buys" : "Viewing: Sells"}</span>
      </div>

      {/* Trades Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-4">
        {loading ? (
          <p className="text-center">Loading trades...</p>
        ) : (showBuys ? buys : sells).length === 0 ? (
          <p className="text-center">No {showBuys ? "buy" : "sell"} trades found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left">Currency Address</th>
                <th className="p-3 text-left">Symbol</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {(showBuys ? buys : sells).map((trade, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-3">
                    <Link href={`../../trades/tokens/${trade.Transfer.Currency.SmartContract}`}>
                      {trade.Transfer.Currency.SmartContract}
                    </Link>
                  </td>
                  <td className="p-3">{trade.Transfer.Currency.Symbol}</td>
                  <td className="p-3">{parseFloat(trade.Transfer.Amount).toFixed(4)}</td>
                  <td className="p-3">{trade.Block.Time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

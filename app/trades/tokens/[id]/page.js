"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTokenTrades } from "@/api/four-meme-api";

export default function CurrencyTrades() {
  const params = useParams();
  const currencyAddress = params.id;
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currencyAddress) return;

    async function fetchTrades() {
      try {
        const data = await getTokenTrades(currencyAddress);

        setTrades(data);
      } catch (error) {
        console.error("Error fetching trades:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrades();
  }, [currencyAddress]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative">
      {/* Back Button */}
      <Link href="/">
        <button className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
          Home
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-4">Trades for Currency: {currencyAddress}</h1>

      {/* Trades Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-4">
        {loading ? (
          <p className="text-center">Loading trades...</p>
        ) : trades.length === 0 ? (
          <p className="text-center">No trades found for this currency.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left">Trader</th>
                <th className="p-3 text-left">Cost</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Transaction Hash</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-3">
                    <Link href={`/trades/trader/${trade.Arguments[1].Value.address}`} className="text-blue-400 hover:underline">
                      {trade.Arguments[1].Value.address}
                    </Link>
                  </td>
                  <td className="p-3">${(parseFloat(trade.Arguments[2].Value.bigInteger)/10e18).toFixed(12)}</td>
                  <td className="p-3">{(parseFloat(trade.Arguments[3].Value.bigInteger)/10e18).toFixed(2)}</td>
                  <td className="p-3">
                    <a
                      href={`https://explorer.bitquery.io/bsc/tx/${trade.Transaction.Hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {trade.Transaction.Hash.slice(0, 10)}...
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

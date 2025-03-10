"use client";

import { useEffect, useState } from "react";
import { getLatestTrades} from "../api/four-meme-api";
import Link from "next/link"

export default function MemeDexDashboard() {
  const [trades, setTrades] = useState([]); // trades field defined
  const [loading, setLoading] = useState(true); // parameter for conditional rendering

  /* For every 10 second this useEffect hits the Bitquery API and modifies trades state variable
   in case of no error and set loading parameter as false */
  useEffect(() => {
    async function fetchTrades() {
      try {
        const data = await getLatestTrades();
        setTrades(data);
      } catch (error) {
        console.error("Error fetching trades:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrades();
    const interval = setInterval(fetchTrades, 10000); // Refresh every 10 sec
    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Four Meme DEX Dashboard</h1>
      <div className="bg-gray-800 rounded-lg shadow-lg p-4">
        {/* 
          Conditional rendering based on loading variable. 
          If true -> First one is rendered else second one is
        */}

        {loading ? (
          <p className="text-center">Loading trades...</p>
        ) : (
          <>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left">Currency Address</th>
                <th className="p-3 text-left">Trader Address</th>
                <th className="p-3 text-left">Cost</th>
                <th className="p-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="p-3"><Link href={`./trades/tokens/${trade.Arguments[0].Value.address}`}>{trade.Arguments[0].Value.address}</Link></td> {/* Currency Address and User Address are made hyper Link using <Link> tag*/}
                  <td className="p-3"><Link href={`./trades/trader/${trade.Arguments[1].Value.address}`}>{trade.Arguments[1].Value.address}</Link></td>
                  <td className="p-3">{(parseFloat(trade.Arguments[2].Value.bigInteger)/10e18).toFixed(12)} BNB</td> {/* Conversion from BigNumber to Decimals */}
                  <td className="p-3">{(parseFloat(trade.Arguments[3].Value.bigInteger)/10e18).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
        )}
      </div>
    </div>
  );
}

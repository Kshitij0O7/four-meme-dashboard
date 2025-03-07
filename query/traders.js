const traderData = JSON.stringify({
    query: `{
        EVM(dataset: combined, network: bsc) {
            buys: Transfers(
            orderBy: { descending: Block_Time }
            where: {
                Transaction: {
                To: { is: "0x5c952063c7fc8610ffdb798152d69f0b9550762b" }
                }
                Transfer: {
                Receiver: { is: "0xf0C66cc94c7568F63d421be93eBdb1Ce7d163c74" }
                }
            }
            ) {
            Transfer {
                Amount
                AmountInUSD
                Currency {
                Name
                Symbol
                SmartContract
                Decimals
                }
                Id
                Index
                Success
                Type
                URI
                Sender
                Receiver
            }
            TransactionStatus {
                Success
            }
            Transaction {
                Hash
                From
                To
            }
            Block {
                Time
                Number
            }
            }
            sells: Transfers(
            orderBy: { descending: Block_Time }
            where: {
                Transaction: {
                To: { is: "0x5c952063c7fc8610ffdb798152d69f0b9550762b" }
                }
                Transfer: {
                Sender: { is: "0xf0C66cc94c7568F63d421be93eBdb1Ce7d163c74" }
                }
            }
            ) {
            Transfer {
                Amount
                AmountInUSD
                Currency {
                Name
                Symbol
                SmartContract
                Decimals
                }
                Id
                Index
                Success
                Type
                URI
                Sender
                Receiver
            }
            TransactionStatus {
                Success
            }
            Transaction {
                Hash
                From
                To
            }
            Block {
                Time
                Number
            }
            }
        }
    }`,
    variables: "{}"
  });

module.exports = {traderData}
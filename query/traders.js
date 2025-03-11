const traderData = (trader) => JSON.stringify({
    query: `{
        EVM(dataset: combined, network: bsc) {
            buys: Transfers(
            orderBy: { descending: Block_Time }
            where: {
                Transaction: {
                To: { is: "0x5c952063c7fc8610ffdb798152d69f0b9550762b" }
                }
                Transfer: {
                Receiver: { is: "${trader}" }
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
                Sender: { is: "${trader}" }
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
const tradesData = JSON.stringify({
    query: `{
       EVM(network: bsc) {
         Events(
           where: {
             Log: { Signature: { Name: { is: "TokenSale" } } }, 
             Transaction: { To: { is: "0x5c952063c7fc8610ffdb798152d69f0b9550762b" } }
           }
           orderBy: { descending: Block_Time }
         ) {
           Log {
             Signature {
               Name
             }
           }
           Transaction {
             From
             To
             Value
             Type
             Hash
           }
           Arguments {
             Type
             Value {
               ... on EVM_ABI_Boolean_Value_Arg {
                 bool
               }
               ... on EVM_ABI_Bytes_Value_Arg {
                 hex
               }
               ... on EVM_ABI_BigInt_Value_Arg {
                 bigInteger
               }
               ... on EVM_ABI_String_Value_Arg {
                 string
               }
               ... on EVM_ABI_Integer_Value_Arg {
                 integer
               }
               ... on EVM_ABI_Address_Value_Arg {
                 address
               }
             }
             Name
           }
         }
       }
    }`,
    variables: "{}"
  });

module.exports = {tradesData}
const tokenData = JSON.stringify({
    query: `{
        EVM(dataset: combined, network: bsc) {
            Events(
            where: {Log: {Signature: {Name: {is: "TokenSale"}}}, Arguments: {includes: {Value: {Address: {is: "0xfe6edde870ff03c039cafc4dba96533acc34a19f"}}}}}
            orderBy: {descending: Block_Time}
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

module.exports = {tokenData}
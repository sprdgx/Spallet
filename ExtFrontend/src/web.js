import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SimpleSmartContract from "./contracts/SimpleSmartContract.json";

const App = () => {
  const [value, setValue] = useState(0);
  const [newValue, setNewValue] = useState(0);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Initialize ethers provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Initialize contract instance
      const networkId = await provider.getNetwork().then((network) => network.chainId);
      const contractAddress = SimpleSmartContract.networks[networkId].address;
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, '[
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_receiver",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "sendEther",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "setValue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [],
        "name": "getValue",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "value",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
', signer);
      setContract(contractInstance);

      // Get owner address
      const contractOwner = await contractInstance.owner();
      setOwner(contractOwner);
    };

    init();
  }, []);

  const getValue = async () => {
    const currentValue = await contract.getValue();
    setValue(currentValue.toNumber());
  };

  const setValueOnContract = async () => {
    setLoading(true);
    await contract.setValue(newValue);
    setLoading(false);
    await getValue();
  };

  return (
    <div>
      <h1>Simple Smart Contract Frontend</h1>
      <p>Contract Owner: {owner}</p>
      <p>Current Value: {value}</p>
      <input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
      <button onClick={setValueOnContract} disabled={loading}>Set Value</button>
      <button onClick={getValue}>Get Value</button>
    </div>
  );
};

export default App;

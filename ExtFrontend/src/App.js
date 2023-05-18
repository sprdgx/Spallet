import "./App.css";
import { useState } from "react";
import { Select } from "antd";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import RecoverAccount from "./components/RecoverAccount";
import WalletView from "./components/WalletView";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";


function App() {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");


  

  return (
    <div className="App">
        <Helmet>
          <title>SPALLET</title>
          <meta name="description" content="WEB EXT 3 WALLET" />
        </Helmet>
      <header>
        
        <img onClick={() => navigate('/')} src='https://raw.githubusercontent.com/sprdgx/SprD/main/LOGOs/LOGOFAVCOLOR.png' className="headerLogo" alt="logo" />
        
        <Select
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1",
            },
            {
              label: "Mumbai Testnet",
              value: "0x13881",
            },
            {
              label: "Polygon",
              value: "0x89",
            },
            {
              label: "Avalanche",
              value: "0xa86a",
            },
          ]}
          className="dropdown"
        ></Select>
      </header>
      {wallet && seedPhrase ? (
        <Routes>
          <Route path="/createwallet" element={
              <WalletView wallet={wallet} setWallet={setWallet} seedPhrase={seedPhrase} setSeedPhrase={setSeedPhrase} selectedChain={selectedChain}/>
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recoverwallet" element={
              <RecoverAccount setSeedPhrase={setSeedPhrase} setWallet={setWallet} />
            }
          />
          <Route path="/createwallet" element={
              <CreateAccount setSeedPhrase={setSeedPhrase} setWallet={setWallet} />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;

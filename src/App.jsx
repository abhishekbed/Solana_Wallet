import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { Buffer } from 'buffer';
import {useState} from 'react';

function App() {

  const [publicKey, setPublicKey] = useState('');
  const [secretKey, setSecretKey] = useState('');

  window.Buffer = Buffer;
  const createWallet = async () => {

    const mnemonic = bip39.generateMnemonic();
    console.log(mnemonic);
    
    const seed = bip39.mnemonicToSeedSync(mnemonic, "");
    
    const keypair = Keypair.fromSeed(seed.slice(0, 32));

    setPublicKey(keypair.publicKey.toBase58());

    const privateKeyHex = Buffer.from(keypair.secretKey).toString('hex');
    setSecretKey(privateKeyHex);

  }

  return (
    <>
      <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Solana Wallet</h1>
      <button onClick={createWallet} style={{ marginBottom: '10px' }}>
        Create Wallet
      </button>

        <div>
          <h3>Public Key: {publicKey}</h3>
          <h3>Secret Key: {secretKey}</h3>
        </div>

    </div>
    </>
  )
}

export default App

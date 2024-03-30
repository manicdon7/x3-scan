import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Abi from "../abi/nftabi.json";
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { Wallet, EthereumWalletConnector } from 'rainbow-sdk';


const Mint = () => {
    const { transactionId } = useParams();
    const [address, setAddress] = useState(null);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        async function initialize() {
            if (typeof window.ethereum !== "undefined") {
                try {
                    // Initialize Rainbow Wallet
                    const walletConnector = new EthereumWalletConnector();
                    await Wallet.connect(walletConnector);
    
                    // Get the signer from Rainbow Wallet
                    const provider = Wallet.provider;
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    setAddress(address);
    
                    // Initialize contract instance
                    const myContractAddress = "0xb7389dbAE585a413120ADfD8974908A7eCB67d72";
                    const contract = new ethers.Contract(
                        myContractAddress,
                        Abi,
                        signer
                    );
                    setContract(contract);
                    console.log(contract);
                } catch (error) {
                    console.error("Error initializing contract:", error);
                }
            } else {
                console.error("Metamask not detected");
            }
        }
        initialize();
    }, []);

    const mintNFT = async () => {
        try {
            // Ensure all necessary data is available
            if (!address || !contract || !transactionId) {
                alert("Fill all the required details");
                return;
            }

            // Mint NFT using Ethereum contract
            const tokenURI = `ipfs://${transactionId}`;
            const mintTransaction = await contract.mintNFT(address, tokenURI);
            console.log("NFT minted successfully. Transaction ID:", mintTransaction.hash);
        } catch (error) {
            console.error("Error minting NFT:", error);
        }
    };

    return (
        <main className="bg-gray-900 h-screen">
            <Navbar />
            <div className="container mx-auto">
                <div className="text-center py-16">
                    <p className="text-md text-gray-400 lg:text-xl">
                        My Address: {address?.slice(0, 10)}...{address?.slice(-10)}
                    </p>
                    <div className="mt-8 text-white">
                        <p className="text-lg font-bold">Transaction Details:</p>
                        <p>ID: {transactionId}</p>
                        <button onClick={mintNFT} className="bg-purple-500 text-white px-4 py-2 mt-4 rounded-md">Mint NFT</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Mint;

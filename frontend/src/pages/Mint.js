import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Abi from "../abi/nftabi.json";
import { RainbowKitProvider, RainbowKitAuthenticationProvider } from '@rainbow-me/rainbowkit';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mint = () => {
    const { transactionId } = useParams();
    const [address, setAddress] = useState(null);
    const [balance, setBalance] = useState(0);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        async function initialize() {
          if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider);
            const signer = provider.getSigner();
            console.log(signer);
            const address = await signer.getAddress();
            console.log(address)
            const balance = await provider.getBalance(address);
            setAddress(address);
            //setBalance(ethers?.utils?.parseEther(balance));
            const myContractAddress = "0xb7389dbAE585a413120ADfD8974908A7eCB67d72";
            const contract = new ethers.Contract(
              myContractAddress,
              Abi,
              signer
            );
            console.log(contract);
            setContract(contract);
          }
        }
        initialize();
      }, []);
    
    const mintNFT = async () => {
        try {
            if (!transactionId || !contract) {
                toast.warning("Fill all the required details");
                return;
            }
    
            // const signer = ethers.getDefaultProvider.call();
            // const address = await signer.getAddress();
    
            // Estimate gas required for minting
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            console.log(provider);
            const signer = provider.getSigner();
            console.log(signer);
            const address = await signer.getAddress();
            const token = `https://ipfs.io/ipfs/QmT1EZTTeR9Z9oXx7WQjfHDnUMRKYV3JVcoq2EoKupZzu5`;
            console.log(address)
            const gasEstimate = await contract.proof(address,token)
            await gasEstimate.wait()
    
            // Request user's approval to pay gas fees
            // const tx = await signer.sendTransaction({
            //     to: contract.address,
            //     data: contract.interface.encodeFunctionData('mintNFT', [address, `ipfs://${transactionId}`]),
            //     gasLimit: gasEstimate,
            //     value: ethers.utils.parseEther('0.1'),
            // });
            // await tx.wait();
    
            console.log("NFT minted successfully. Transaction ID:", gasEstimate.hash);
            const metadata = {
                name: "X3 pow",
                description: "proof of work for the X3 project",
                image: `ipfs://${transactionId}`,
            };
    
            const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4Y2RmMDUxNi0xNzIwLTQxOTktYjUzNi1hMTlmYWY5ZWRjMDEiLCJlbWFpbCI6Im1hbmljZG9uN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDNjMTYxZWFkOGFmOTQxNWQ5NWMiLCJzY29wZWRLZXlTZWNyZXQiOiI2NWU2OWY4NWQwMWYzYjVhNjhkNzMyZTdlZTg2MzAzN2Y2YzExNjlkNGRkMDkzZjcwOTIxZGExOWViZTFhMTAyIiwiaWF0IjoxNzExODA4NTk5fQ.--XMjZfsoFco5zW_VXuD_zNgqeHVS8_rBpa81xdQ_ws"; // Replace with your Pinata JWT
    
            const res = await axios.post(
                "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                metadata,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${jwt}`,
                    },
                }
            );
            toast.warning("NFT metadata pinned to IPFS");
            console.log("NFT metadata pinned to IPFS:", res.data.IpfsHash);
            const ipfshash = res.data.IpfsHash;
            try {
              const jsondic = {
                image: `ipfs/${ipfshash}`,
              };
              const resjson = await axios.post(
                "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                jsondic,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + jwt,
                  },
                }
              );
              const jasonHash = resjson.data.IpfsHash;
              const tokenURI = `https://ipfs.io/ipfs/${jasonHash}`;
              const conc = contract?.mintNFT(address, tokenURI);
              console.log("My own token ID:", conc);
            } catch (error) {
              console.error(error);
            }
          } catch (error) {
            toast.error("Error uploading NFT to Pinata!");
            console.error(error);
          }
      
    };
    
    
    return (
        <main className="bg-gray-900 h-screen">
            <Navbar />
            <div className='flex justify-center'>
            <div className="container px-40 m-10 w-8/12 overflow-hidden bg-gray-700  rounded-3xl">
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
            </div>
            <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    theme="colored" />
        </main>
    );
};

export default Mint;

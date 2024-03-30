import { ethers } from "ethers";
import { Network, Alchemy } from 'alchemy-sdk';
import ABI from "../abi/abi.json";

const ContractIntegration = {
    async connectToContract() {
        try {
            const settings = {
                apiKey: "-dXrc1CFLJyyeRRfKQIkJlI6ItOg0bBN",
                network: 'maticmum',
            };
            
            const alchemy = new Alchemy(settings);
            const CONTRACT_ADDRESS = "0xA35725FfEfebF41B667167D0fd124cd43b59CC09";
            
            const isBrowser = () => typeof window !== "undefined";
            const ethereum = isBrowser() ? window.ethereum : null;
            
            if (!ethereum) {
                throw new Error("Ethereum provider not available.");
            }
            
            // Create an ethers provider using Alchemy
            const provider = new ethers.EtherscanProvider(alchemy);
            const signer = provider.getSigner();
            
            // Instantiate the contract with the provider and signer
            const ticketContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            
            return ticketContract;
        } catch (error) {
            console.error("Error connecting to contract:", error);
            throw error;
        }
    },
    

    // Function to get block details by user ID
    async getBlockDetailsByUserId(userId) {
        try {
            const contract = await this.connectToContract();
            const blockDetails = await contract.getBlockDetailsByUserId(userId);
            return blockDetails;
        } catch (error) {
            console.error("Error fetching block details by user ID:", error);
            throw error;
        }
    },

    // Function to get block details by transaction hash
    async getBlockDetailsByTransactionHash(transactionHash) {
        try {
            const contract = await this.connectToContract();
            const blockDetails = await contract.getBlockDetailsByTransactionHash(transactionHash);
            return blockDetails;
        } catch (error) {
            console.error("Error fetching block details by transaction hash:", error.message);
            throw error;
        }
    }
};

export default ContractIntegration;

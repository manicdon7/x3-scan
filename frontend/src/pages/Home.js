import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import search from '../assets/searchButton.png';
import block from '../assets/block.png';
import Connect from '../components/Connect'; // Import the Connect component
import ContractIntegration from '../Contract/ContractIntegration'; 

const Home = () => {
    const [latestBlock, setLatestBlock] = useState({});
    const [latestTransaction, setLatestTransaction] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [currentUserAddress, setCurrentUserAddress] = useState('');

    useEffect(() => {
        // Fetch the current user's wallet address
        const fetchCurrentUserAddress = async () => {
            try {
                // Your logic to fetch the current user's address using the Rainbow Wallet SDK
                // For example, if the Connect component returns the address:
                // setCurrentUserAddress(account.address);
            } catch (error) {
                console.error("Error fetching current user address:", error);
            }
        };

        fetchCurrentUserAddress();
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch latest block details
                const blockDetailsByUserId = await ContractIntegration.getBlockDetailsByUserId(currentUserAddress);
                setLatestBlock(blockDetailsByUserId);
            } catch (error) {
                console.error("Error fetching block details:", error);
            }
        }

        // Fetch block details only if the current user's address is available
        if (currentUserAddress) {
            fetchData();
        }
    }, [currentUserAddress]);

    // Function to handle search button click event
    const handleSearch = async () => {
        try {
            // Fetch transaction details based on the entered contract hash
            const blockDetailsByTxHash = await ContractIntegration.getBlockDetailsByTransactionHash(searchInput);
            setLatestTransaction(blockDetailsByTxHash);
        } catch (error) {
            console.error("Error fetching transaction details:", error);
        }
    };

    return (
        <div className='bg-gray-900 h-screen'>
            <Navbar />
            <div className='pt-10 pb-20' style={{backgroundImage: `url('https://preview.redd.it/0bb6dqsiab451.gif?s=b0c65596a54a30708da26669da6e79abf3be1680')`, backgroundSize:'cover', backgroundPositionY:'73%', boxShadow:'1px 7px 17px 0px #383838'}}>
                <div className='pt-10'>
                    <p className='text-center text-4xl text-white font-semibold font-sans'>X3scan Chain Explorer</p>
                </div>
                <div className=' flex justify-center py-4'>
                    <div className='flex bg-white w-5/12 justify-center rounded-2xl'>
                        <div className='p-3 flex gap-4'>
                            <p className='text-black text-lg'>All Filters</p>
                            <input 
                                className='rounded-2xl px-2 py-1 w-96 focus:outline-none' 
                                placeholder='  Search by Address / Txn Hash / Block / Token / Domain Name' 
                                value={searchInput} 
                                onChange={(e) => setSearchInput(e.target.value)} 
                            />
                        </div>
                        <button onClick={handleSearch}><img src={search} alt="Search" /></button>
                    </div>
                </div>
            </div>
            <div className='top-0 absolute mt-60 pt-5 mx-40 space-x-10'>
                <div className='grid grid-cols-2 grid-rows-1 px-20 gap-10 mx-10'>
                    <div>
                        <div className='my-10 py-3 bg-purple-300 rounded-xl'>
                            <p className='text-2xl px-5 py-4'>Latest Block</p>
                            <div className='bg-white w-96 mx-4 py-2 rounded-xl'>
                                {/* Display latest block details */}
                                <div className='flex'>
                                    <img src={block} className='mx-2' alt='block' />
                                    <p className='text-blue-500 text-lg'>{latestBlock.blockNumber}</p>
                                </div>
                                {/* Additional block details can be displayed similarly */}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='my-10 py-3 bg-purple-300 rounded-xl'>
                            <p className='text-2xl px-5 py-4'>Latest Transactions</p>
                            <div className='bg-white w-96 mx-4 py-2 rounded-xl'>
                                {/* Display latest transaction details */}
                                <div className='flex'>
                                    <img src={block} className='mx-2' alt='block' />
                                    <p className='text-blue-500 text-lg'>{latestTransaction.transactionHash}</p>
                                </div>
                                {/* Additional transaction details can be displayed similarly */}
                            </div>
                        </div>
                    </div>
                    <div className='bg-purple-500 mx-10 my-3 rounded-xl p-3 text-center'>
                        <button className='text-xl text-white'>View all blocks</button>
                    </div>
                    <div className='bg-purple-500 mx-10 my-3 rounded-xl p-3 text-center'>
                        <button className='text-xl text-white'>View all Transactions</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

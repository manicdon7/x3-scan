import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import search from '../assets/searchButton.png';
import Graph from '../components/Graph';

const Home = () => {
    const [latestBlock, setLatestBlock] = useState({});
    const [latestTransaction, setLatestTransaction] = useState({});
    const [searchInput, setSearchInput] = useState('');
    const [searchTransactionHash, setSearchTransactionHash] = useState('');
    const [graphData, setGraphData] = useState([]);

    const handleSearchClick = () => {
        setSearchTransactionHash(searchInput);
    };

    const handleGraphDataReceived = (data) => {
        setGraphData(data);
    };

    // Filter graphData based on the entered transaction hash
    const filteredData = searchTransactionHash
        ? graphData.filter(data => data.id.toLowerCase().includes(searchTransactionHash.toLowerCase()))
        : graphData;

    return (
        <div className='bg-gray-900 h-full'>
            <Navbar />
            <div className='py-10 px-4 md:px-12 bg-center' style={{backgroundImage: "url('https://preview.redd.it/0bb6dqsiab451.gif?s=b0c65596a54a30708da26669da6e79abf3be1680')", backgroundSize: 'cover', backgroundPositionY: '73%', height: '250px', boxShadow: '1px 7px 17px 0px #383838'}}>
                <div className='text-center'>
                    <p className='text-4xl md:text-5xl font-semibold text-white mb-4'>X3scan Explorer</p>
                </div>
                <div className='flex justify-center mt-8'>
                    <div className='flex w-full md:w-3/4 bg-white rounded-xl overflow-hidden'>
                        <input
                            className='w-full px-4 py-3 focus:outline-none'
                            type='text'
                            placeholder='Search by Transaction Hash'
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button className='flex-shrink-0 px-4 py-3' onClick={handleSearchClick}>
                            <img src={search} alt="Search" className='w-6 h-6' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='container mx-auto mt-10'>
                <div className='flex justify-center'>
                    <div className='bg-white rounded-xl p-6 w-10/12' style={{position: 'absolute',top: '36%'}}>
                        <p className='text-xl font-semibold mb-4'>Latest Blocks</p>
                        <div className='border-t border-gray-200 pt-4'>
                            {filteredData.map((data) => (
                                <div className='flex justify-between mb-4 border border-gray-400 p-4 rounded-xl'>
                                <div key={data.id} className=''>
                                    <p className='text-lg font-semibold text-blue-500'>Block Number: {data.blockNumber}</p>
                                    <p className='text-black  font-semibold'>ID: <span className='font-semilight text-gray-600'>{data.id}</span></p>
                                    <p className='text-black font-semibold'>Data Storage ID: <span className='font-semilight text-gray-600'>{data.DataStorage_id}</span></p>
                                    <p className='text-black font-semibold'>User Address: <span className='font-semilight text-gray-600'>{data.userAddress}</span></p>
                                </div>
                                <div className='mt-5'>
                                    <button className='bg-purple-500 px-3 py-1 text-xl rounded-xl hover:text-white hover:shadow-2xl'>Explore</button>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className='bg-white rounded-xl p-6'>
                        <p className='text-xl font-semibold mb-4'>Latest Transactions</p>
                        <div className='border-t border-gray-200 pt-4'>
                            <div className='flex items-center'>
                                <img src={block} alt='block' className='w-8 h-8 mr-2' />
                                <p className='text-blue-500 text-lg'>{latestTransaction.transactionHash}</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <Graph onDataReceived={handleGraphDataReceived} />
        </div >
    );
};

export default Home;

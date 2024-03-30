import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import search from '../assets/searchButton.png';
import { Link } from 'react-router-dom';
import Graph from '../components/Graph';

const Home = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchTransactionHash, setSearchTransactionHash] = useState('');
    const [graphData, setGraphData] = useState([]);
    const [selectedNetwork, setSelectedNetwork] = useState('mumbai');

    useEffect(() => {
        const intervalId = setInterval(fetchData, 60000);

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []);

    const fetchData = () => {
        if (selectedNetwork === 'mumbai') {
            fetchGraphData();
        } else if (selectedNetwork === 'polygon') {
            fetchMongoData(selectedNetwork); // Fetch data only for the 'polygon' network
        }
    };

    const fetchMongoData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/pos/polygon");
            if (!response.ok) {
                throw new Error('Failed to fetch network data');
            }
            const data = await response.json();
            setGraphData(data);
        } catch (error) {
            console.error('Error fetching network data:', error);
        }
    };

    const fetchGraphData = () => {
        // Simulate fetching graph data for Mumbai
        const data = [
            { blockNumber: 1001, id: 'abc123', /* other graph data */ },
            { blockNumber: 1002, id: 'def456', /* other graph data */ },
            // Add more data as needed
        ];
        setGraphData(data);
    };

    const handleSearchClick = () => {
        setSearchTransactionHash(searchInput);
    };

    const handleExploreClick = (data) => {
        window.location.href=`/mint/transactionId=${data}`;
        console.log("Clicked Explore:", data);
    };

    const filteredData = searchTransactionHash
        ? graphData.filter(data => data.id?.toLowerCase().includes(searchTransactionHash.toLowerCase()))
        : graphData;

    return (
        <div className='bg-gray-900 min-h-screen'>
            <Navbar />
            <div className='py-10 px-4 md:px-12 bg-center' style={{ backgroundImage: "url('https://preview.redd.it/0bb6dqsiab451.gif?s=b0c65596a54a30708da26669da6e79abf3be1680')", backgroundSize: 'cover', backgroundPositionY: '73%', height: '250px', boxShadow: '1px 7px 17px 0px #383838' }}>
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
                        <select
                            className='px-4 py-3 bg-white text-gray-800 border border-gray-300 focus:outline-none rounded-r-xl'
                            value={selectedNetwork}
                            onChange={(e) => setSelectedNetwork(e.target.value)}
                        >
                            <option value='mumbai'>Mumbai</option>
                            <option value='polygon'>Polygon</option>
                            <option value='core'>Core</option>
                        </select>
                        <button className='flex-shrink-0 px-4 py-3' onClick={handleSearchClick}>
                            <img src={search} alt="Search" className='w-6 h-6' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='container mx-auto mt-10'>
                <div className='flex justify-center'>
                    <div className='bg-white rounded-xl p-6 w-10/12'>
                        <p className='text-xl font-semibold mb-4'>Latest Blocks</p>
                        <div className='border-t border-gray-200 pt-4'>
                            <Graph onDataReceived={setGraphData} />
                            {/* Render detailed data only for Mumbai */}
                            {selectedNetwork === 'mumbai' && (
                                filteredData.map((data) => (
                                    <div className='flex justify-between items-center mb-4 border border-gray-400 p-4 rounded-xl' key={data.id}>
                                        <div>
                                            <p className='text-lg font-semibold text-blue-500'>Block Number: {data.blockNumber}</p>
                                            <p className='text-gray-800'>Transaction ID: {data.id}</p>
                                        </div>
                                        <div className='mt-5'>
                                            <button onClick={() => handleExploreClick(data.id)} className='bg-purple-500 px-3 py-1 text-xl rounded-xl hover:text-white hover:shadow-2xl'>Explore</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

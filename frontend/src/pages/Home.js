import React from 'react'
import Navbar from '../components/Navbar'
import search from '../assets/searchButton.png';
import block from '../assets/block.png';
import anime from '../assets/night.gif';

			

const bg = {
    backgroundImage: `url(${anime})`,
    backgroundSize: "cover",
  };

const Home = () => (
    <div className='bg-gray-900 h-screen'>
        <Navbar />
        <div className='pt-10 pb-20' style={{backgroundImage: `url('https://preview.redd.it/0bb6dqsiab451.gif?s=b0c65596a54a30708da26669da6e79abf3be1680')`, backgroundSize:'cover', backgroundPositionY:'73%', boxShadow:'1px 7px 17px 0px #383838'}}>

            <div className='pt-10'>
                <p className='text-center text-4    xl text-white font-semibold font-sans'>X3scan Chain Explorer</p>
            </div>
            <div className=' flex justify-center py-4'>
                <div className='flex bg-white w-5/12 justify-center rounded-2xl'>
                    <div className='p-3 flex gap-4'>
                        <p className='text-black text-lg'>All Filters</p>
                        <input className='rounded-2xl px-2 py-1 w-96 focus:outline-none' placeholder='  Search by Address / Txn Hash / Block / Token / Domain Name' />
                    </div>
                    <button><img src={search} alt="Search" /></button>
                </div>
            </div>
        </div>
    <div className='top-0 absolute mt-60 pt-5 mx-40 space-x-10'>
        <div className='grid grid-cols-2 grid-rows-1 px-20 gap-10 mx-10'>
            <div>
                <div className='my-10 py-3 bg-purple-300 rounded-xl'>
                    <p className='text-2xl px-5 py-4'>Latest Block</p>
                    <div className='bg-white w-96 mx-4 py-2 rounded-xl'>
                        <div className='flex'>
                            <img src={block} className='mx-2' alt='block' />
                            <p className='text-blue-500 text-lg'>45434543</p>
                        </div>
                        <div className='flex gap-10'>
                            <div className=''>
                                <p className='mx-2 my-1'>Validated By 0x9ec7D5D1</p>
                            </div>
                        </div>
                        <div>
                            <p className='font-semibold text-xl px-4'>0.47139 MATIC</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='my-10 py-3 bg-purple-300 rounded-xl'>
                    <p className='text-2xl px-5 py-4'>Latest Transactions</p>
                    <div className='bg-white w-96 mx-4 py-2 rounded-xl'>
                        <div className='flex'>
                            <img src={block} className='mx-2' alt='block' />
                            <p className='text-blue-500 text-lg'>45434543</p>
                        </div>
                        <div className='flex gap-10'>
                            <div className=''>
                                <p className='mx-2 my-1'>From <span className='text-blue-500'> 0x9ec7D5D1</span></p>
                                <p className='mx-2 my-1'>To By <span className='text-blue-500'> 0x9ec7D5D1</span></p>
                            </div>
                            <div>
                                <p className='font-semibold text-xl'>0.47139 MATIC</p>
                            </div>
                        </div>
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
)

export default Home
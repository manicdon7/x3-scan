import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Abi from "../abi/abi.json";
const axios = require("axios");
const FormData = require("form-data");

const Mint = ({ JWT }) => {
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function initialize() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);

        const myContractAddress = "0xECcF626e4bD9f685e2F7763121CE75619D0675bb";
        const contract = new ethers.Contract(
          myContractAddress,
          Abi,
          signer
        );
        setContract(contract);
      }
    }
    initialize();
  }, []);

  function onChangeValue(e) {
    const file = e.target.files[0];
    setImage(file);
    console.log(file);
  }
  
  async function onSubmit(event) {
    if (!name || !description || !image) {
      alert("Fill all the required details");
      return;
    }
    const JWT =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4Y2RmMDUxNi0xNzIwLTQxOTktYjUzNi1hMTlmYWY5ZWRjMDEiLCJlbWFpbCI6Im1hbmljZG9uN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZDNjMTYxZWFkOGFmOTQxNWQ5NWMiLCJzY29wZWRLZXlTZWNyZXQiOiI2NWU2OWY4NWQwMWYzYjVhNjhkNzMyZTdlZTg2MzAzN2Y2YzExNjlkNGRkMDkzZjcwOTIxZGExOWViZTFhMTAyIiwiaWF0IjoxNzExODA4NTk5fQ.--XMjZfsoFco5zW_VXuD_zNgqeHVS8_rBpa81xdQ_ws";

    event.preventDefault();

    const formData = new FormData();
    formData.append("file", image);

    const pinataMetadata = JSON.stringify({
      name: "File name",
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: "Bearer " + JWT,
          },
        }
      );

      const ipfsHash = res.data.IpfsHash;
      try {
        const jsondic = {
          name,
          description,
          image: `ipfs/${ipfsHash}`,
        };
        const resjson = await axios.post(
          "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          jsondic,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + JWT,
            },
          }
        );
        const jsonHash = resjson.data.IpfsHash;
        const tokenURI = `https://ipfs.io/ipfs/${jsonHash}`;
        const conc = contract?.mintNFT(address, tokenURI);
        console.log("My own token ID:", conc);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="bg-orange-200">
      <div> 
        <div className="text-center py-16">
          <p className="text-md text-blue-400 lg:text-3xl">
            {address?.slice(0, 10)}...{address?.slice(-10)}
          </p>
          <div className="flex flex-col space-y-2 mt-10 mx-auto bg-blue-200 px-10 pt-5 pb-5">
            <button
              className="bg-blue-400 px-4 py-2 rounded-lg"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Mint;

import { createClient } from "urql";
import { useEffect, useState } from 'react';

function Graph({ onDataReceived }) {
    const [dataAddeds, setDataAddeds] = useState([]); // Changed variable name to match GraphQL response
    const QueryURL = "https://api.studio.thegraph.com/query/69474/raj/version/latest";
    const query = `
 {
    dataAddeds(first: 5) {
      id
      DataStorage_id
      userAddress
      blockNumber
    }
  }
`;
    const client = createClient({
        url: QueryURL
    });

    useEffect(() => {
        const getDataAddeds = async () => {
            const { data } = await client.query(query).toPromise();
            console.log(data);
            setDataAddeds(data.dataAddeds); // Fixed the case of dataAddeds
            onDataReceived(data.dataAddeds); // Call the function to pass fetched data to the parent component
        }
        getDataAddeds();
    }, [onDataReceived]);

    return null; // Since this component doesn't render anything, return null
}

export default Graph;

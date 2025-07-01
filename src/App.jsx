
import { useState } from 'react';
import useFetch from './hooks/UseFetch'
import MapView from './components/MapView';



const API_KEY = import.meta.env.VITE_IP_TRACKER_API;


function App() {
  
  const [search, setSearch] = useState('');
const [query, setQuery] = useState('');


    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}${query ? `&ipAddress=${query}` : ''}`;
  const { data, loading, error } = useFetch(url);
  

  
const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  // useEffect({



  // },[])

  
  
if (error) return <p>console.error(.message );</p>

  const result =data?.ip[0]

if(loading || !result ) return <h2 className="text-5xl animate-bounce">loading...</h2>

  console.log(data)

  const lat = data.location?.lat;
  const lng = data.location?.lng;

  return (
    <>
      <div>
           <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter IP or domain"
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="w-50 px-4 py-2 bg-blue-600 text-white rounded">
          Search
        </button>
      </form>
    {lat && lng && <MapView lat={lat} lng={lng} />}

        <h1>{data.location?.city}</h1>
        <p>{data.location?.region}</p>
        <p>{data.location?.time}</p>
       <p>{data.ip}</p> 
        
      </div>
    </>
  )
}

export default App

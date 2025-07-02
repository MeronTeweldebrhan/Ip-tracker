import { useState } from 'react';
import useFetch from './hooks/UseFetch';
import MapView from './components/MapView';
import bgImage from '../src/assets/bgImage.png';


const API_KEY = import.meta.env.VITE_IP_TRACKER_API;

function App() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${API_KEY}${query ? `&ipAddress=${query}` : ''}`;
  const { data, loading, error } = useFetch(url);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const lat = data?.location?.lat;
  const lng = data?.location?.lng;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header with background image */}
      <div className="w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="w-full max-w-3xl mx-auto py-10 px-4 text-center text-white">
          <h1 className="text-3xl font-bold mb-4">IP Address Tracker</h1>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter IP or domain"
              className="bg-amber-50 flex-1 p-3 rounded-md text-black focus:outline-none"
            />
            <button
  type="submit"
  className="mr-5 w-20 h-12 bg-no-repeat bg-center bg-black rounded-md "
  aria-label="Search"> 🔍 search </button>

          </form>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mt-6 w-full max-w-xl text-center">
          <p className="font-semibold">Error: {error.message}</p>
          <p className="text-sm mt-1">This app may only fetch data in production. API requests might fail during development or if CORS is not configured.</p>
        </div>
      )}

      {/* Loading State */}
      {loading && <h2 className="text-2xl animate-bounce text-gray-700 mt-6">Loading...</h2>}

      {/* Results */}
      {data && (
        <>
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-800">
            <p>
              <span className="font-semibold text-gray-900">IP Address:</span><br />
              {data.ip}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Location:</span><br />
              {data.location?.city}, {data.location?.region}<br />
              {data.location?.postalCode}
            </p>
            <p>
              <span className="font-semibold text-gray-900">TimeZone:</span><br />
              UTC {data.location?.timezone}
            </p>
            <p>
              <span className="font-semibold text-gray-900">ISP:</span><br />
              {data.isp}
            </p>
          </div>

          {lat && lng && <MapView lat={lat} lng={lng} />}
        </>
      )}
    </div>
  );
}

export default App;

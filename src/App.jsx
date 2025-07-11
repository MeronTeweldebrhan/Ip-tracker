import { useState } from "react";
import useFetch from "./hooks/UseFetch";
import MapView from "./components/MapView";
import bgImage from "../src/assets/bgImage.png";
import { FaSearch } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_IP_TRACKER_API;

function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const url = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${API_KEY}${
    query ? `&ipAddress=${query}` : ""
  }`;
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
  <div
    className="w-full h-60 bg-cover bg-center relative"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className="w-full max-w-3xl mx-auto py-10 px-4 text-center text-white">
      <h1 className="text-3xl font-bold mb-4">IP Address Tracker</h1>
     <form
  onSubmit={handleSubmit}
  className="flex w-full max-w-xl mx-auto shadow-lg rounded-full overflow-hidden bg-white"
>
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search for any IP address or domain"
    className="flex-grow p-4 text-gray-700 placeholder-gray-400 focus:outline-none"
  />
  <button
    type="submit"
    className="w-14 bg-black flex items-center justify-center hover:bg-gray-800"
    aria-label="Search"
  >
    <FaSearch className="text-white text-lg" />
  </button>
</form>

        </div>
      </div>

      {/* Error Message */}
      {error && (
  <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mt-6 w-full max-w-xl text-center">
    <p className="font-semibold">Error: {error.message}</p>

    {error.status === 422 || error.message.includes('IP') ? (
      <p className="text-sm mt-2">The IP address or domain you entered is invalid or not found. Please try again.</p>
    ) : (
      <>
        <p className="text-sm mt-1">
          This app may only fetch data in development, but it fails after
          deployment. This is likely due to:
        </p>
        <ul className="text-sm text-left list-disc list-inside mt-2 space-y-1">
          <li>CORS restrictions on the API provider (e.g. geo.ipify.org).</li>
          <li>Missing or misconfigured billing/API key settings for production.</li>
          <li>Allowed domains not configured for deployed site in API dashboard.</li>
        </ul>
      </>
    )}
  </div>
)}


      {/* Loading State */}
      {loading && (
        <h2 className="text-2xl animate-bounce text-gray-700 mt-6">
          Loading...
        </h2>
      )}

      {/* Results */}
      {data && (
        <>
          <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left -mt-14 z-10 relative">
            <p>
              <span className="font-semibold text-gray-900">IP Address:</span>
              <br />
              {data.ip}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Location:</span>
              <br />
              {data.location?.city}, {data.location?.region}
              <br />
              {data.location?.postalCode}
            </p>
            <p>
              <span className="font-semibold text-gray-900">TimeZone:</span>
              <br />
              UTC {data.location?.timezone}
            </p>
            <p>
              <span className="font-semibold text-gray-900">ISP:</span>
              <br />
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

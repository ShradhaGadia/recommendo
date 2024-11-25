import React, { useState } from "react";
import axios from "axios";

const SongsPage = () => {
  const [query, setQuery] = useState("");
  const [song, setSong] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSong = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:5000/search_song?query=${query}`);
      setSong(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error searching for the song:", error);
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/recommendations", {
        seed_tracks: [song.id],
      });
      setRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-8 bg-[#000300] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00df9a]">Song Recommendations</h2>

      {/* Search Section */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Enter song name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-3 w-full sm:w-1/2 bg-gray-800 text-white rounded-lg"
        />
        <button
          onClick={searchSong}
          className="mt-2 sm:mt-0 sm:ml-4 bg-[#00df9a] text-black font-bold py-2 px-6 rounded-lg hover:bg-[#00df9a]/90"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}

      {/* Selected Song Section */}
      {song && (
        <div className="mb-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Selected Song:</h3>
          <p>
            <strong>{song.track_name}</strong> by {song.artist}
          </p>
          <img
            src={song.album_image}
            alt={song.track_name}
            className="my-4 w-64 h-64 object-cover mx-auto"
          />
          <button
            onClick={fetchRecommendations}
            className="mt-4 bg-[#00df9a] text-black font-bold py-2 px-6 rounded-lg hover:bg-[#00df9a]/90"
          >
            Get Recommendations
          </button>
        </div>
      )}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-center mb-6">Recommendations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 text-center shadow-lg">
                <h4 className="text-xl font-semibold mb-2">{rec.track_name}</h4>
                <p className="text-gray-300">Artist: {rec.artist}</p>
                <p className="text-gray-400">Album: {rec.album}</p>
                <img
                  src={rec.album_image}
                  alt={rec.track_name}
                  className="my-4 w-64 h-64 object-cover mx-auto"
                />
                <a
                  href={rec.song_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00df9a] underline hover:text-[#00df9a]/80 mt-2 block"
                >
                  Listen on Spotify
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongsPage;

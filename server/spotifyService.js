import axios from 'axios';

const clientId = '3b0d289e21b44137b448bb7f2207db16';
const clientSecret = '329ae7dd501f4d77a01a80e5e97d780b';
const redirectUri = 'http://localhost:3000/callback'; // Ensure this matches the Spotify Developer Dashboard
const authUrl = 'https://accounts.spotify.com/authorize';
const tokenUrl = 'https://accounts.spotify.com/api/token';
const apiUrl = 'https://api.spotify.com/v1';

let accessToken = '';

if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('spotify_access_token') || '';
}

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getAuthorizationUrl = () => {
  const state = generateRandomString(16);
  const scopes = 'user-read-private user-read-email playlist-read-private user-read-currently-playing user-top-read';
  const url = `${authUrl}?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
  console.log('Authorization URL:', url); // Log the authorization URL
  return url;
};

const getAccessToken = async (code) => {
  try {
    const response = await axios.post(tokenUrl, null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    accessToken = response.data.access_token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('spotify_access_token', accessToken); // Save access token in local storage
    }
    console.log('Access Token:', accessToken); // Log the access token
  } catch (error) {
    console.error('Error getting access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const fetchUserData = async () => {
    if (!accessToken) {
      throw new Error('Access token is not available');
    }
    try {
      const response = await axios.get(`${apiUrl}/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const userData = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('spotify_user_data', JSON.stringify(userData)); // Save user data in local storage
      }
      console.log('User Data:', userData); // Log the user data
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

const fetchFeatured = async () => {
  if (!accessToken) {
    throw new Error('Access token is not available');
  }
  try {
    const response = await axios.get(`${apiUrl}/browse/featured-playlists`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log('Fetched Featured Playlists:', response.data.playlists.items); // Log the response
    return response.data.playlists.items || [];
  } catch (error) {
    console.error('Error fetching featured playlists:', error.response ? error.response.data : error.message);
    return [];
  }
};

const fetchPlaylists = async () => {
  if (!accessToken) {
    throw new Error('Access token is not available');
  }
  try {
    const response = await axios.get(`${apiUrl}/me/playlists`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log('Fetched Playlists:', response.data.items); // Log the response
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching playlists:', error.response ? error.response.data : error.message);
    return [];
  }
};

const fetchPlaylist = async (playlistId) => {
  if (!accessToken) {
    throw new Error('Access token is not available');
  }
  try {
    const response = await axios.get(`${apiUrl}/playlists/${playlistId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log('Fetched Playlist:', response.data); // Log the response
    return response.data || {};
  } catch (error) {
    console.error('Error fetching playlist:', error.response ? error.response.data : error.message);
    return {};
  }
}

const fetchCurrentPlayback = async () => {
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await axios.get(`${apiUrl}/me/player/currently-playing`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status === 204 || response.data === '') {
    return null; // No track is currently playing
  }

  return response.data;
};

const fetchTopTracks = async (limit, term) => {
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await axios.get(`${apiUrl}/me/top/tracks?limit=${limit}&time_range=${term}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data.items;
}

const seekPlayback = async (positionMs) => {
  const token = localStorage.getItem('spotify_access_token');
  if (!token) {
    throw new Error('No access token available');
  }

  await axios.put(
    `${SPOTIFY_API_BASE_URL}/me/player/seek?position_ms=${positionMs}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

const fetchOtherUserData = async (userId) => {
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await axios.get(`${apiUrl}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}

const fetchArtist = async (artistId) => {
  if (!accessToken) {
    throw new Error('No access token available');
  }

  const response = await axios.get(`${apiUrl}/artists/${artistId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}


export { getAuthorizationUrl, getAccessToken, fetchUserData, fetchPlaylists, fetchFeatured, fetchPlaylist, fetchCurrentPlayback, fetchTopTracks, seekPlayback, fetchOtherUserData, fetchArtist };
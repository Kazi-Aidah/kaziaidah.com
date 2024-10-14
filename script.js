const API_KEY = 'AIzaSyBuZUuMwaRvHP7uFx5lQgI1zMmGL2QwGHs'; // Your actual YouTube API key
const PLAYLIST_ID = 'PLJYnzg7Cheugz3JzxOIkcKNwVmVvwoObd'; // Correct playlist ID

const videoGrid = document.getElementById('video-grid');
const MAX_VIDEOS = 500;

async function fetchVideosFromPlaylist(pageToken = '') {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`);
    const data = await response.json();

    displayVideos(data.items);

    if (data.nextPageToken && videoGrid.children.length < MAX_VIDEOS) {
        fetchVideosFromPlaylist(data.nextPageToken);
    }
}

function displayVideos(videos) {
    videos.forEach(item => {
        const videoId = item.snippet.resourceId.videoId;
        const videoTitle = item.snippet.title;
        const videoThumbnail = item.snippet.thumbnails.high.url; // Get the thumbnail URL

        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                <img src="${videoThumbnail}" alt="${videoTitle}" style="width: 100%; height: auto; border-radius: 6px;">
            </a>
            <p>${videoTitle}</p>
        `;
        videoGrid.appendChild(videoElement);
    });
}

fetchVideosFromPlaylist();

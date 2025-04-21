// Load existing videos on page load
window.onload = () => {
  displayVideos();
};

function addVideo() {
  const input = document.getElementById('videoInput');
  let url = input.value.trim();

  if (!url || !url.includes("youtube.com") && !url.includes("youtu.be")) {
    alert("Please enter a valid YouTube link.");
    return;
  }

  let videos = JSON.parse(localStorage.getItem('videoLinks')) || [];
  videos.push(url);
  localStorage.setItem('videoLinks', JSON.stringify(videos));

  input.value = '';
  displayVideos();
}

function displayVideos() {
  const container = document.getElementById('videoContainer');
  container.innerHTML = '';

  let videos = JSON.parse(localStorage.getItem('videoLinks')) || [];

  videos.forEach(link => {
    const embedLink = convertToEmbed(link);
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.innerHTML = `<iframe src="${embedLink}" frameborder="0" allowfullscreen></iframe>`;
    container.appendChild(videoCard);
  });
}

function convertToEmbed(url) {
  if (url.includes("youtube.com/watch?v=")) {
    return url.replace("watch?v=", "embed/");
  } else if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchVersionAndRelease();
    loadNews();
});


async function fetchVersionAndRelease() {
    try {

        const githubResponse = await fetch('https://api.github.com/repos/publicrust/rust-launcher/releases/latest', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'RustLauncher'
            }
        });

        if (githubResponse.ok) {
            const data = await githubResponse.json();

            
            const exeAsset = data.assets.find(asset =>
                asset.name.toLowerCase().includes('launcher') &&
                asset.name.toLowerCase().endsWith('.exe')
            );

            if (exeAsset) {

                const sizeElement = document.getElementById('size');
                const versionElement = document.getElementById('version');
                const downloadButton = document.getElementById('downloadButton');

                if (sizeElement) {
                    const sizeInMB = (exeAsset.size / (1024 * 1024)).toFixed(1);
                    sizeElement.textContent = `Size: ${sizeInMB} MB`;
                }

                if (versionElement) {
                    versionElement.textContent = `Version: ${data.tag_name}`;
                }

                if (downloadButton) {
                    downloadButton.href = exeAsset.browser_download_url;
                }
            }
        }
    } catch (error) {
        console.error('Error getting information:', error);

        const sizeElement = document.getElementById('size');
        const versionElement = document.getElementById('version');
        const downloadButton = document.getElementById('downloadButton');

        if (sizeElement) sizeElement.textContent = 'Size: 64.3 MB';
        if (versionElement) versionElement.textContent = 'Version: 1.0.0';
        if (downloadButton) downloadButton.href = 'https://github.com/publicrust/rust-launcher/releases/latest';
    }
}


async function loadNews() {
    try {
        const response = await fetch('https://api.github.com/repos/publicrust/rust-launcher/releases', {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'RustLauncher'
            }
        });

        if (!response.ok) throw new Error('Failed to fetch news');

        const releases = await response.json();
        const newsContainer = document.getElementById('news-container');

        if (newsContainer) {

            newsContainer.innerHTML = '';


            releases.slice(0, 2).forEach(release => {
                const newsCard = document.createElement('div');
                newsCard.className = 'news-card';


                const date = new Date(release.published_at);
                const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                newsCard.innerHTML = `
                    <div class="news-image">
                        <img src="images/update.jpg" alt="News">
                    </div>
                    <div class="news-content">
                        <span class="news-date">${formattedDate}</span>
                        <h3>${release.name || release.tag_name}</h3>
                        <p>${release.body ? release.body.split('\n')[0] : 'No description'}</p>
                        <a href="${release.html_url}" class="read-more" target="_blank">Read more</a>
                    </div>
                `;

                newsContainer.appendChild(newsCard);
            });
        }
    } catch (error) {
        console.error('Error loading news:', error);
        const newsContainer = document.getElementById('news-container');
        if (newsContainer) {
            newsContainer.innerHTML = '<div class="news-error">Failed to load news</div>';
        }
    }
}

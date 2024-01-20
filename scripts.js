async function fetchRepositories() {
    const username = document.getElementById('username').value;
    const repositoriesContainer = document.getElementById('repositories');
    const loader = document.getElementById('loader');
    

    loader.style.display = 'block';
    repositoriesContainer.innerHTML = '';

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await response.json();

        repositories.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.classList.add('animated-card');
    
            repoElement.innerHTML = `
                <div class="card mb-3">
                    <div class="card-body">
                        <h2 class="card-title">${repo.name}</h2>
                        <p class="card-text">${repo.description || 'No description available.'}</p>
                        <p class="card-text"><strong>Languages:</strong> <span  class="card-text-lang">${repo.language || 'Not specified'}</span></p>
                    </div>
                    <div class="card-footer">
                        <a href="${repo.html_url}" target="_blank"> Open on GitHub</a>
                    </div>
                </div>
            `;
            repositoriesContainer.appendChild(repoElement);
        });
    } catch (error) {
        console.error('Error fetching repositories:', error);
    } finally {
        loader.style.display = 'none';
    }
}

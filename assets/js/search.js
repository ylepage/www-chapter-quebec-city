// search.js
document.addEventListener('DOMContentLoaded', (event) => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        fetch('/search.json')
            .then(response => response.json())
            .then(data => {
                const results = data.filter(item => 
                    item.title.toLowerCase().includes(searchTerm) || 
                    item.content.toLowerCase().includes(searchTerm)
                );

                searchResults.innerHTML = results.map(item => `
                    <li>
                        <a href="${item.url}">${item.title}</a>
                        <p>${item.content.substring(0, 150)}...</p>
                    </li>
                `).join('');
            });
    });
});

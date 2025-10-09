// Search functionality using Lunr.js
(function() {
    // Check if we're on a page with search
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) {
        return;
    }

    let searchIndex;
    let searchData;

    // Build search index
    function buildSearchIndex() {
        // This will be populated by Jekyll during build
        // For now, we'll create a placeholder
        searchData = [];
        
        // Collect all snippets from the page
        const snippetLinks = document.querySelectorAll('a[href*="/snippets/"]');
        snippetLinks.forEach((link, index) => {
            const card = link.closest('.snippet-card, .snippet-item, .category-card');
            if (card) {
                const title = link.textContent.trim();
                const description = card.querySelector('p') ? card.querySelector('p').textContent.trim() : '';
                const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.trim());
                
                searchData.push({
                    id: index,
                    title: title,
                    description: description,
                    tags: tags.join(' '),
                    url: link.getAttribute('href')
                });
            }
        });

        // Build Lunr index
        if (typeof lunr !== 'undefined' && searchData.length > 0) {
            searchIndex = lunr(function() {
                this.ref('id');
                this.field('title', { boost: 10 });
                this.field('description', { boost: 5 });
                this.field('tags');

                searchData.forEach(function(doc) {
                    this.add(doc);
                }, this);
            });
        }
    }

    // Perform search
    function performSearch(query) {
        if (!query || query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        if (!searchIndex) {
            buildSearchIndex();
        }

        if (!searchIndex) {
            searchResults.innerHTML = '<p>Search index not ready. Please try again.</p>';
            return;
        }

        try {
            const results = searchIndex.search(query);
            displayResults(results);
        } catch (e) {
            console.error('Search error:', e);
            searchResults.innerHTML = '<p>Search error. Please try a different query.</p>';
        }
    }

    // Display search results
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found.</p>';
            return;
        }

        let html = '<div class="search-results-list">';
        results.slice(0, 10).forEach(result => {
            const item = searchData[result.ref];
            html += `
                <div class="search-result-item">
                    <h4><a href="${item.url}">${item.title}</a></h4>
                    <p>${item.description}</p>
                </div>
            `;
        });
        html += '</div>';

        searchResults.innerHTML = html;
    }

    // Event listener for search input
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });

    // Build index on page load
    if (typeof lunr !== 'undefined') {
        buildSearchIndex();
    }

    // Add styles for search results
    const style = document.createElement('style');
    style.textContent = `
        .search-results-list {
            margin-top: 15px;
        }
        .search-result-item {
            padding: 15px;
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            margin-bottom: 10px;
            background-color: white;
        }
        .search-result-item h4 {
            margin: 0 0 8px 0;
        }
        .search-result-item h4 a {
            color: #2c3e50;
            text-decoration: none;
        }
        .search-result-item h4 a:hover {
            color: #3498db;
        }
        .search-result-item p {
            margin: 0;
            color: #666;
            font-size: 0.95rem;
        }
    `;
    document.head.appendChild(style);
})();

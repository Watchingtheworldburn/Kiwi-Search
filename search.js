const mockSuggestions = [
  'kiwi fruit benefits',
  'kiwi bird facts',
  'kiwi recipes',
  'kiwi growing guide',
  'kiwi nutrition facts',
  'kiwi species',
  'kiwi new zealand',
  'kiwi season',
  'kiwi shoe polish',
  'kiwi fruit smoothie',
  'kiwi bird habitat',
  'kiwi fruit allergy',
  'kiwi dollar exchange rate',
  'kiwi airways',
  'kiwi fruit skin edible',
  'kiwi browser',
  'kiwi fruit vitamin c',
  'kiwi bird endangered',
  'kiwi fruit during pregnancy',
  'kiwi travel booking'
];

const searchProviders = {
  default: (query) => {
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  },
  
  images: (query) => {
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&ia=images&iax=images`;
  },

  videos: (query) => {
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&ia=videos&iax=videos`;
  },

  news: (query) => {
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&ia=news&iar=news`;
  },

  maps: (query) => {
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&ia=maps&iax=maps`;
  },

  shopping: (query) => {
    window.location.href = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&ia=products`;
  }
};

function detectSearchType(query) {
  const lowerQuery = query.toLowerCase();
  const typeMap = {
    'images ': 'images',
    'image ': 'images',
    'videos ': 'videos',
    'video ': 'videos',
    'news ': 'news',
    'maps ': 'maps',
    'map ': 'maps',
    'shopping ': 'shopping',
    'shop ': 'shopping',
    'buy ': 'shopping'
  };

  for (const [prefix, type] of Object.entries(typeMap)) {
    if (lowerQuery.startsWith(prefix)) {
      return type;
    }
  }
  return 'default';
}

async function performSearch(query) {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return;

  // Show the loading overlay
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay active';
  overlay.innerHTML = `
    <div style="text-align: center">
      <div class="search-loader">
        <svg class="searching-kiwi" viewBox="0 0 200 200">
          <g transform="translate(100 100)">
            <path class="kiwi-body" d="M-50,-20 A70,70 0 1,1 -50,20 L-30,0 Z" fill="#94b288"/>
            <circle class="kiwi-eye" cx="-20" cy="-10" r="8" fill="black"/>
            <path class="kiwi-beak" d="M-60,-5 L-80,0 L-60,5 Z" fill="#d4aa00"/>
            <g class="kiwi-feet">
              <path d="M0,50 L10,70 L20,50 L30,70 L40,50" fill="none" stroke="#d4aa00" stroke-width="4"/>
              <path d="M-40,50 L-30,70 L-20,50 L-10,70 L0,50" fill="none" stroke="#d4aa00" stroke-width="4"/>
            </g>
            <g class="magnifying-glass" transform="translate(30, -30) scale(0.7)">
              <circle cx="0" cy="0" r="20" fill="none" stroke="#4285f4" stroke-width="6"/>
              <line x1="15" y1="15" x2="30" y2="30" stroke="#4285f4" stroke-width="6"/>
            </g>
          </g>
        </svg>
      </div>
      <div class="search-text">Searching for "${trimmedQuery}"...</div>
    </div>
  `;
  document.body.appendChild(overlay);

  try {
    const searchType = detectSearchType(trimmedQuery);
    const cleanQuery = trimmedQuery.replace(/^(images?|videos?|news|maps?|shop(?:ping)?|buy)\s+/i, '');
    
    // Small delay to show the animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    searchProviders[searchType](cleanQuery);
  } finally {
    // Remove loading overlay
    overlay.remove();
  }
}

function generateResultsPage(results, searchType) {
  const resultItems = results.map(result => {
    switch(searchType) {
      case 'images':
        return `
          <div class="image-result">
            <img src="${result.thumbnail}" alt="${result.title}" loading="lazy">
            <div class="image-title">${result.title}</div>
          </div>
        `;
      case 'videos':
        return `
          <div class="video-result">
            <div class="video-thumbnail">
              <img src="${result.thumbnail}" alt="${result.title}" loading="lazy">
              <span class="duration">${result.duration}</span>
            </div>
            <div class="video-info">
              <h3>${result.title}</h3>
              <p>${result.description}</p>
            </div>
          </div>
        `;
      case 'news':
        return `
          <div class="news-result">
            <h3><a href="${result.link}">${result.title}</a></h3>
            <p class="news-source">${result.source} - ${result.date}</p>
            <p>${result.snippet}</p>
          </div>
        `;
      default:
        return `
          <div class="search-result">
            <h3><a href="${result.link}">${result.title}</a></h3>
            <div class="result-url">${result.displayUrl}</div>
            <p>${result.snippet}</p>
          </div>
        `;
    }
  }).join('');

  return `
    <div class="results-page">
      <header class="results-header">
        <a href="/" class="back-to-search">
          <svg class="mini-kiwi" width="40" height="40" viewBox="0 0 200 200">
            <g transform="translate(100 100)">
              <path d="M-50,-20 A70,70 0 1,1 -50,20 L-30,0 Z" fill="#94b288"/>
              <circle cx="-20" cy="-10" r="8" fill="black"/>
              <path d="M-60,-5 L-80,0 L-60,5 Z" fill="#d4aa00"/>
            </g>
          </svg>
        </a>
        <div class="results-search-box">
          <input type="text" id="results-search-input" value="${document.getElementById('search-input').value}">
          <button id="results-search-button">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>
        <div class="search-type-tabs">
          <a href="#" class="tab ${searchType === 'default' ? 'active' : ''}" data-type="default">All</a>
          <a href="#" class="tab ${searchType === 'images' ? 'active' : ''}" data-type="images">Images</a>
          <a href="#" class="tab ${searchType === 'videos' ? 'active' : ''}" data-type="videos">Videos</a>
          <a href="#" class="tab ${searchType === 'news' ? 'active' : ''}" data-type="news">News</a>
          <a href="#" class="tab ${searchType === 'maps' ? 'active' : ''}" data-type="maps">Maps</a>
          <a href="#" class="tab ${searchType === 'shopping' ? 'active' : ''}" data-type="shopping">Shopping</a>
        </div>
      </header>
      <main class="results-container ${searchType}-results">
        ${resultItems}
      </main>
    </div>
  `;
}

async function getAISearchSuggestions(query) {
  try {
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        prompt: `Given the search query "${query}", suggest 5 relevant search queries that might help the user find what they're looking for. Consider different aspects and interpretations of the query.

        interface Response {
          suggestions: string[];
        }

        {
          "suggestions": [
            "best kiwi recipes for desserts",
            "how to tell if kiwi is ripe",
            "kiwi health benefits research",
            "kiwi fruit storage tips",
            "can you eat kiwi skin"
          ]
        }`,
        data: query
      }),
    });
    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    return [];
  }
}

async function showSuggestions(query) {
  if (!query) {
    const suggestionsContainer = document.getElementById('suggestions');
    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = '';
    }
    return;
  }

  const trimmedQuery = query.trim().toLowerCase();
  let filteredSuggestions = mockSuggestions
    .filter(suggestion => {
      if (suggestion.toLowerCase().startsWith(trimmedQuery)) return true;
      return suggestion.toLowerCase().includes(trimmedQuery);
    })
    .slice(0, 4);

  // Add AI suggestions if query is long enough
  if (trimmedQuery.length > 2) {
    const aiSuggestions = await getAISearchSuggestions(trimmedQuery);
    filteredSuggestions = [...aiSuggestions, ...filteredSuggestions].slice(0, 8);
    
    ['images', 'videos', 'news', 'maps', 'shopping'].forEach(type => {
      filteredSuggestions.unshift(`${type} ${trimmedQuery}`);
    });
  }

  const suggestionsContainer = document.getElementById('suggestions');
  if (suggestionsContainer) {
    suggestionsContainer.innerHTML = filteredSuggestions
      .map((suggestion, index) => `
        <div class="suggestion-item ${index < 5 ? 'ai-suggestion' : ''}" data-suggestion="${suggestion}">
          <svg class="suggestion-icon" viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="${index < 5 ? 
              'M13.5,11c1.4,0,2.5-1.1,2.5-2.5S14.9,6,13.5,6S11,7.1,11,8.5S12.1,11,13.5,11z M13.5,7c0.8,0,1.5,0.7,1.5,1.5S14.3,10,13.5,10S12,9.3,12,8.5S12.7,7,13.5,7z M16,12H11c-1.7,0-3,1.3-3,3v4h2v-4c0-0.6,0.4-1,1-1h5c0.6,0,1,0.4,1,1v4h2v-4C19,13.3,17.7,12,16,12z' : 
              'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'
            }"/>
          </svg>
          ${highlightMatch(suggestion, trimmedQuery)}
        </div>
      `)
      .join('');
  }
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<strong>$1</strong>');
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const suggestionsContainer = document.getElementById('suggestions');

  if (!searchInput || !searchButton || !suggestionsContainer) {
    console.error('Required elements not found');
    return;
  }

  // Initialize focus on search input
  searchInput.focus();

  // Event Listeners
  searchInput.addEventListener('input', async (e) => {
    await showSuggestions(e.target.value);
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      performSearch(searchInput.value);
    }
  });

  searchButton.addEventListener('click', () => {
    if (searchInput.value.trim()) {
      performSearch(searchInput.value);
    }
  });

  // Handle keyboard navigation for suggestions
  searchInput.addEventListener('keydown', (e) => {
    const suggestions = document.querySelectorAll('.suggestion-item');
    const currentIndex = Array.from(suggestions).findIndex(el => el.classList.contains('selected'));

    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (currentIndex < suggestions.length - 1) {
          suggestions[currentIndex]?.classList.remove('selected');
          suggestions[currentIndex + 1].classList.add('selected');
          searchInput.value = suggestions[currentIndex + 1].dataset.suggestion;
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (currentIndex > 0) {
          suggestions[currentIndex]?.classList.remove('selected');
          suggestions[currentIndex - 1].classList.add('selected');
          searchInput.value = suggestions[currentIndex - 1].dataset.suggestion;
        }
        break;
    }
  });

  suggestionsContainer.addEventListener('click', (e) => {
    const suggestionItem = e.target.closest('.suggestion-item');
    if (suggestionItem) {
      const suggestion = suggestionItem.dataset.suggestion;
      searchInput.value = suggestion;
      performSearch(suggestion);
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box') && !e.target.closest('.suggestions')) {
      suggestionsContainer.innerHTML = '';
    }
  });

  // Add logo click animation
  const logo = document.querySelector('.logo');
  const searchBox = document.querySelector('.search-box');
  
  let isAnimating = false;

  logo.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    logo.classList.add('eating');
    searchBox.classList.add('being-eaten');

    // Remove classes after animation completes
    setTimeout(() => {
      logo.classList.remove('eating');
      searchBox.classList.remove('being-eaten');
      isAnimating = false;
    }, 1500);
  });
});
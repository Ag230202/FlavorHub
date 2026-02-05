// Mock recipe data (same as API)
const MOCK_RECIPES = [
    {
        id: 1,
        title: "Mediterranean Grilled Chicken Salad",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500",
        readyInMinutes: 30,
        servings: 4,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        summary: "A fresh and healthy Mediterranean salad with grilled chicken, olives, and feta cheese.",
        cuisines: ["Mediterranean"],
        diets: ["gluten free"]
    },
    {
        id: 2,
        title: "Creamy Tuscan Garlic Pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500",
        readyInMinutes: 25,
        servings: 6,
        vegetarian: true,
        vegan: false,
        glutenFree: false,
        dairyFree: false,
        summary: "Rich and creamy pasta with sun-dried tomatoes, spinach, and garlic parmesan sauce.",
        cuisines: ["Italian"],
        diets: ["vegetarian"]
    },
    {
        id: 3,
        title: "Thai Basil Stir-Fry",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",
        readyInMinutes: 20,
        servings: 4,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        summary: "Aromatic Thai stir-fry with fresh basil, chili, and your choice of protein.",
        cuisines: ["Thai", "Asian"],
        diets: ["gluten free", "dairy free"]
    },
    {
        id: 4,
        title: "Vegan Buddha Bowl",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
        readyInMinutes: 35,
        servings: 2,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        dairyFree: true,
        summary: "Nutritious bowl packed with quinoa, roasted vegetables, avocado, and tahini dressing.",
        cuisines: ["American"],
        diets: ["vegan", "gluten free"]
    },
    {
        id: 5,
        title: "Classic Beef Tacos",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500",
        readyInMinutes: 30,
        servings: 6,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        summary: "Authentic Mexican street tacos with seasoned beef, fresh salsa, and lime.",
        cuisines: ["Mexican", "Latin American"],
        diets: ["gluten free"]
    },
    {
        id: 6,
        title: "Honey Glazed Salmon",
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
        readyInMinutes: 25,
        servings: 4,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        summary: "Pan-seared salmon with a sweet honey glaze and roasted asparagus.",
        cuisines: ["American"],
        diets: ["gluten free", "dairy free", "pescatarian"]
    },
    {
        id: 7,
        title: "Vegetable Pad Thai",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500",
        readyInMinutes: 30,
        servings: 4,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        dairyFree: true,
        summary: "Classic Thai noodles with tofu, bean sprouts, peanuts, and tangy tamarind sauce.",
        cuisines: ["Thai", "Asian"],
        diets: ["vegan", "gluten free"]
    },
    {
        id: 8,
        title: "Mushroom Risotto",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500",
        readyInMinutes: 45,
        servings: 4,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        summary: "Creamy Italian risotto with mixed wild mushrooms and parmesan cheese.",
        cuisines: ["Italian"],
        diets: ["vegetarian", "gluten free"]
    },
    {
        id: 9,
        title: "Grilled Lemon Herb Chicken",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=500",
        readyInMinutes: 40,
        servings: 4,
        vegetarian: false,
        vegan: false,
        glutenFree: true,
        dairyFree: true,
        summary: "Juicy grilled chicken marinated in lemon, garlic, and fresh herbs.",
        cuisines: ["Mediterranean", "Greek"],
        diets: ["gluten free", "dairy free", "paleo"]
    },
    {
        id: 10,
        title: "Spicy Black Bean Soup",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500",
        readyInMinutes: 35,
        servings: 6,
        vegetarian: true,
        vegan: true,
        glutenFree: true,
        dairyFree: true,
        summary: "Hearty and warming black bean soup with cumin, lime, and fresh cilantro.",
        cuisines: ["Mexican", "Latin American"],
        diets: ["vegan", "gluten free"]
    },
    {
        id: 11,
        title: "Japanese Teriyaki Bowl",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
        readyInMinutes: 30,
        servings: 4,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        dairyFree: true,
        summary: "Sweet and savory teriyaki chicken served over steamed rice with vegetables.",
        cuisines: ["Japanese", "Asian"],
        diets: ["dairy free"]
    },
    {
        id: 12,
        title: "Fresh Caprese Salad",
        image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500",
        readyInMinutes: 10,
        servings: 4,
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        summary: "Simple Italian salad with fresh mozzarella, tomatoes, basil, and balsamic glaze.",
        cuisines: ["Italian"],
        diets: ["vegetarian", "gluten free"]
    }
];

class RecipeManager {
    constructor() {
        this.allRecipes = MOCK_RECIPES;
        this.filteredRecipes = [...this.allRecipes];
        this.displayedRecipes = [];
        this.offset = 0;
        this.limit = 12;
        this.filters = {
            query: '',
            diet: 'all',
            cuisine: 'all',
            maxTime: 'any'
        };
        
        this.init();
    }

    init() {
        // Check URL parameters
        this.loadURLParams();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initial load
        this.applyFilters();
        this.loadRecipes();
    }

    loadURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const diet = urlParams.get('diet');
        if (diet) {
            this.filters.diet = diet;
            const dietFilter = document.getElementById('dietFilter');
            if (dietFilter) {
                dietFilter.value = diet;
            }
        }
    }

    setupEventListeners() {
        // Search button
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.handleSearch());
        }

        // Enter key in search
        const searchInput = document.getElementById('searchQuery');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch();
                }
            });
        }

        // Load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMore());
        }
    }

    handleSearch() {
        // Get filter values
        this.filters.query = document.getElementById('searchQuery')?.value || '';
        this.filters.diet = document.getElementById('dietFilter')?.value || 'all';
        this.filters.cuisine = document.getElementById('cuisineFilter')?.value || 'all';
        this.filters.maxTime = document.getElementById('timeFilter')?.value || 'any';

        // Reset offset and apply filters
        this.offset = 0;
        this.displayedRecipes = [];
        this.applyFilters();
        this.loadRecipes();
    }

    applyFilters() {
        this.filteredRecipes = this.allRecipes.filter(recipe => {
            // Query filter
            if (this.filters.query) {
                const query = this.filters.query.toLowerCase();
                const matchesTitle = recipe.title.toLowerCase().includes(query);
                const matchesSummary = recipe.summary.toLowerCase().includes(query);
                if (!matchesTitle && !matchesSummary) return false;
            }

            // Diet filter
            if (this.filters.diet && this.filters.diet !== 'all') {
                const hasDiet = recipe.diets.some(d => 
                    d.toLowerCase().includes(this.filters.diet.toLowerCase())
                );
                if (!hasDiet) return false;
            }

            // Cuisine filter
            if (this.filters.cuisine && this.filters.cuisine !== 'all') {
                const hasCuisine = recipe.cuisines.some(c => 
                    c.toLowerCase().includes(this.filters.cuisine.toLowerCase())
                );
                if (!hasCuisine) return false;
            }

            // Time filter
            if (this.filters.maxTime && this.filters.maxTime !== 'any') {
                const maxTime = parseInt(this.filters.maxTime);
                if (recipe.readyInMinutes > maxTime) return false;
            }

            return true;
        });
    }

    loadRecipes() {
        // Show loading state
        this.showLoadingState();

        // Simulate API delay
        setTimeout(() => {
            const recipesToShow = this.filteredRecipes.slice(
                this.offset,
                this.offset + this.limit
            );
            
            this.displayedRecipes.push(...recipesToShow);
            this.renderRecipes();
            this.updateResultsCount();
            this.updateLoadMoreButton();
        }, 300);
    }

    loadMore() {
        this.offset += this.limit;
        this.loadRecipes();
    }

    showLoadingState() {
        const loadingState = document.getElementById('loadingState');
        const recipeGrid = document.getElementById('recipeGrid');
        const emptyState = document.getElementById('emptyState');

        if (loadingState) loadingState.style.display = 'grid';
        if (recipeGrid) recipeGrid.style.display = 'none';
        if (emptyState) emptyState.style.display = 'none';
    }

    renderRecipes() {
        const loadingState = document.getElementById('loadingState');
        const recipeGrid = document.getElementById('recipeGrid');
        const emptyState = document.getElementById('emptyState');

        if (loadingState) loadingState.style.display = 'none';

        if (this.displayedRecipes.length === 0) {
            if (recipeGrid) recipeGrid.style.display = 'none';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';
        if (recipeGrid) {
            recipeGrid.style.display = 'grid';
            recipeGrid.innerHTML = this.displayedRecipes.map(recipe => 
                this.createRecipeCard(recipe)
            ).join('');
        }
    }

    createRecipeCard(recipe) {
        const tags = [];
        if (recipe.vegetarian) tags.push('Vegetarian');
        if (recipe.vegan) tags.push('Vegan');
        if (recipe.glutenFree) tags.push('Gluten-Free');

        return `
            <a href="recipe-detail.html?id=${recipe.id}" class="recipe-card">
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-card-image">
                <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${recipe.title}</h3>
                    <div class="recipe-card-meta">
                        <span style="display: flex; align-items: center; gap: 0.25rem;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            ${recipe.readyInMinutes} min
                        </span>
                        <span style="display: flex; align-items: center; gap: 0.25rem;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            ${recipe.servings} servings
                        </span>
                    </div>
                    <div class="recipe-card-tags">
                        ${tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </a>
        `;
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `Found ${this.filteredRecipes.length.toLocaleString()} recipes`;
        }
    }

    updateLoadMoreButton() {
        const loadMoreContainer = document.getElementById('loadMoreContainer');
        const hasMore = this.offset + this.limit < this.filteredRecipes.length;

        if (loadMoreContainer) {
            loadMoreContainer.style.display = hasMore ? 'block' : 'none';
        }
    }
}

// Initialize recipe manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RecipeManager();
});

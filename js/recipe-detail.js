// Recipe detail page JavaScript
const MOCK_RECIPES_DETAIL = {
    1: {
        id: 1,
        title: "Mediterranean Grilled Chicken Salad",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
        readyInMinutes: 30,
        servings: 4,
        summary: "A fresh and healthy Mediterranean salad with grilled chicken, olives, and feta cheese. This dish combines the vibrant flavors of the Mediterranean with perfectly grilled chicken for a nutritious and delicious meal.",
        diets: ["gluten free"],
        ingredients: [
            "2 chicken breasts",
            "4 cups mixed salad greens",
            "1 cup cherry tomatoes, halved",
            "1/2 cup Kalamata olives",
            "1/2 cup feta cheese, crumbled",
            "1/4 red onion, thinly sliced",
            "2 tablespoons olive oil",
            "1 lemon, juiced",
            "2 cloves garlic, minced",
            "1 teaspoon dried oregano",
            "Salt and pepper to taste"
        ],
        instructions: [
            "Marinate chicken breasts in olive oil, lemon juice, garlic, oregano, salt, and pepper for at least 15 minutes.",
            "Preheat grill to medium-high heat. Grill chicken for 6-7 minutes per side until cooked through.",
            "While chicken is grilling, prepare the salad by combining mixed greens, cherry tomatoes, olives, feta cheese, and red onion in a large bowl.",
            "Let the chicken rest for 5 minutes, then slice into strips.",
            "Top the salad with sliced chicken and drizzle with extra olive oil and lemon juice if desired.",
            "Serve immediately and enjoy your Mediterranean feast!"
        ]
    },
    2: {
        id: 2,
        title: "Creamy Tuscan Garlic Pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
        readyInMinutes: 25,
        servings: 6,
        summary: "Rich and creamy pasta with sun-dried tomatoes, spinach, and garlic parmesan sauce. This Italian-inspired dish is comfort food at its finest.",
        diets: ["vegetarian"],
        ingredients: [
            "1 lb penne pasta",
            "2 tablespoons butter",
            "4 cloves garlic, minced",
            "1 cup heavy cream",
            "1/2 cup chicken or vegetable broth",
            "1/2 cup sun-dried tomatoes, chopped",
            "2 cups fresh spinach",
            "1 cup Parmesan cheese, grated",
            "1 teaspoon Italian seasoning",
            "Salt and pepper to taste",
            "Fresh basil for garnish"
        ],
        instructions: [
            "Cook pasta according to package directions until al dente. Reserve 1 cup of pasta water before draining.",
            "In a large skillet, melt butter over medium heat. Add minced garlic and cook for 1-2 minutes until fragrant.",
            "Pour in heavy cream and broth. Bring to a simmer and cook for 3-4 minutes.",
            "Add sun-dried tomatoes and spinach. Cook until spinach wilts, about 2 minutes.",
            "Stir in Parmesan cheese and Italian seasoning. Season with salt and pepper.",
            "Add cooked pasta to the sauce, tossing to coat. Add reserved pasta water if needed for desired consistency.",
            "Serve hot, garnished with fresh basil and extra Parmesan cheese."
        ]
    }
    // Add more detailed recipes as needed
};

class RecipeDetailManager {
    constructor() {
        this.recipeId = null;
        this.recipe = null;
        this.selectedRating = 0;
        this.init();
    }

    init() {
        // Get recipe ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        this.recipeId = parseInt(urlParams.get('id'));

        if (!this.recipeId) {
            this.showError('Recipe not found');
            return;
        }

        // Load recipe
        this.loadRecipe();
        
        // Setup event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Star rating
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', (e) => {
                this.selectedRating = parseInt(e.target.dataset.rating);
                this.updateStarDisplay();
            });

            star.addEventListener('mouseenter', (e) => {
                const rating = parseInt(e.target.dataset.rating);
                this.highlightStars(rating);
            });
        });

        const starRating = document.getElementById('starRating');
        if (starRating) {
            starRating.addEventListener('mouseleave', () => {
                this.highlightStars(this.selectedRating);
            });
        }

        // Review form
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => this.handleReviewSubmit(e));
        }
    }

    async loadRecipe() {
        // Show loading state
        document.getElementById('loadingDetail').style.display = 'block';
        document.getElementById('recipeContent').style.display = 'none';

        // Simulate API call
        setTimeout(() => {
            // Try to get detailed recipe
            this.recipe = MOCK_RECIPES_DETAIL[this.recipeId];
            
            // If no detailed recipe, try to find in basic list
            if (!this.recipe) {
                // Import from recipes.js mock data
                const basicRecipe = MOCK_RECIPES.find(r => r.id === this.recipeId);
                if (basicRecipe) {
                    this.recipe = {
                        ...basicRecipe,
                        ingredients: this.generateMockIngredients(),
                        instructions: this.generateMockInstructions()
                    };
                }
            }

            if (this.recipe) {
                this.renderRecipe();
                this.loadReviews();
            } else {
                this.showError('Recipe not found');
            }
        }, 500);
    }

    generateMockIngredients() {
        return [
            "Main protein or base ingredient",
            "Fresh vegetables",
            "Herbs and spices",
            "Cooking oil or butter",
            "Salt and pepper to taste"
        ];
    }

    generateMockInstructions() {
        return [
            "Prepare and wash all ingredients.",
            "Heat oil in a pan over medium heat.",
            "Cook main ingredients according to recipe requirements.",
            "Season with herbs and spices.",
            "Serve hot and enjoy!"
        ];
    }

    renderRecipe() {
        document.getElementById('loadingDetail').style.display = 'none';
        document.getElementById('recipeContent').style.display = 'block';

        // Set basic info
        document.getElementById('recipeImage').src = this.recipe.image;
        document.getElementById('recipeImage').alt = this.recipe.title;
        document.getElementById('recipeTitle').textContent = this.recipe.title;
        document.getElementById('recipeTime').textContent = `${this.recipe.readyInMinutes} minutes`;
        document.getElementById('recipeServings').textContent = `${this.recipe.servings} servings`;

        // Set tags
        const tags = [];
        if (this.recipe.vegetarian || this.recipe.diets?.includes('vegetarian')) tags.push('Vegetarian');
        if (this.recipe.vegan || this.recipe.diets?.includes('vegan')) tags.push('Vegan');
        if (this.recipe.glutenFree || this.recipe.diets?.includes('gluten free')) tags.push('Gluten-Free');

        const tagsContainer = document.getElementById('recipeTags');
        tagsContainer.innerHTML = tags.map(tag => 
            `<span class="recipe-tag">${tag}</span>`
        ).join('');

        // Set summary
        const summaryEl = document.getElementById('recipeSummary');
        // Remove HTML tags from summary
        const cleanSummary = this.recipe.summary.replace(/<[^>]*>/g, '');
        summaryEl.textContent = cleanSummary;

        // Set ingredients
        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = this.recipe.ingredients.map(ingredient => 
            `<li>${ingredient}</li>`
        ).join('');

        // Set instructions
        const instructionsList = document.getElementById('instructionsList');
        instructionsList.innerHTML = this.recipe.instructions.map(instruction => 
            `<div class="instruction-step">${instruction}</div>`
        ).join('');
    }

    loadReviews() {
        // Load reviews from localStorage
        const reviews = this.getReviews();
        this.renderReviews(reviews);
    }

    getReviews() {
        const allReviews = JSON.parse(localStorage.getItem('recipeReviews') || '{}');
        return allReviews[this.recipeId] || [];
    }

    saveReview(review) {
        const allReviews = JSON.parse(localStorage.getItem('recipeReviews') || '{}');
        if (!allReviews[this.recipeId]) {
            allReviews[this.recipeId] = [];
        }
        allReviews[this.recipeId].push(review);
        localStorage.setItem('recipeReviews', JSON.stringify(allReviews));
    }

    renderReviews(reviews) {
        const reviewsList = document.getElementById('reviewsList');
        
        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p style="color: var(--muted-foreground); text-align: center; padding: 2rem;">No reviews yet. Be the first to review this recipe!</p>';
            return;
        }

        reviewsList.innerHTML = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">${review.username}</span>
                    <span class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                </div>
                <p class="review-text">${review.text}</p>
                <p class="review-date">${new Date(review.date).toLocaleDateString()}</p>
            </div>
        `).join('');
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    updateStarDisplay() {
        this.highlightStars(this.selectedRating);
    }

    handleReviewSubmit(e) {
        e.preventDefault();

        // Check if user is logged in
        if (!window.auth || !window.auth.isLoggedIn()) {
            alert('Please sign in to leave a review');
            window.auth.openAuthModal('login');
            return;
        }

        if (this.selectedRating === 0) {
            alert('Please select a rating');
            return;
        }

        const reviewText = document.getElementById('reviewText').value.trim();
        if (!reviewText) {
            alert('Please enter a review');
            return;
        }

        const review = {
            username: window.auth.getCurrentUser().username,
            rating: this.selectedRating,
            text: reviewText,
            date: new Date().toISOString()
        };

        // Save review
        this.saveReview(review);

        // Reset form
        document.getElementById('reviewText').value = '';
        this.selectedRating = 0;
        this.updateStarDisplay();

        // Reload reviews
        this.loadReviews();

        alert('Review submitted successfully!');
    }

    showError(message) {
        document.getElementById('loadingDetail').style.display = 'none';
        document.getElementById('recipeContent').innerHTML = `
            <div class="empty-state" style="padding: 4rem 1rem;">
                <h2 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">
                    ${message}
                </h2>
                <p style="color: var(--muted-foreground); margin-bottom: 2rem;">
                    The recipe you're looking for could not be found.
                </p>
                <a href="recipes.html" class="btn btn-primary">
                    Back to Recipes
                </a>
            </div>
        `;
        document.getElementById('recipeContent').style.display = 'block';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new RecipeDetailManager();
});

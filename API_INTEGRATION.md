# API Integration Guide

This guide explains how to integrate the vanilla HTML/CSS/JS frontend with a backend API.

## Backend API Requirements

Your backend should provide the following endpoints:

### 1. Authentication Endpoints

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "username": "johndoe"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe"
  },
  "token": "jwt-token-here"
}
```

#### POST /api/auth/login
Login an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe"
  },
  "token": "jwt-token-here"
}
```

#### POST /api/auth/logout
Logout current user.

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### GET /api/auth/session
Get current user session.

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe"
  }
}
```

### 2. Recipe Endpoints

#### GET /api/recipes
Search and filter recipes.

**Query Parameters:**
- `query` (string, optional): Search term
- `diet` (string, optional): Diet type (vegetarian, vegan, etc.)
- `cuisine` (string, optional): Cuisine type
- `maxReadyTime` (number, optional): Maximum cooking time in minutes
- `offset` (number, optional): Pagination offset
- `number` (number, optional): Number of results per page

**Example:**
```
GET /api/recipes?query=chicken&diet=gluten-free&offset=0&number=12
```

**Response:**
```json
{
  "recipes": [
    {
      "id": 1,
      "title": "Mediterranean Grilled Chicken Salad",
      "image": "https://example.com/image.jpg",
      "readyInMinutes": 30,
      "servings": 4,
      "vegetarian": false,
      "vegan": false,
      "glutenFree": true,
      "dairyFree": true,
      "summary": "A fresh and healthy salad...",
      "cuisines": ["Mediterranean"],
      "diets": ["gluten free"]
    }
  ],
  "totalResults": 24,
  "offset": 0,
  "number": 12
}
```

#### GET /api/recipes/:id
Get detailed information about a specific recipe.

**Response:**
```json
{
  "id": 1,
  "title": "Mediterranean Grilled Chicken Salad",
  "image": "https://example.com/image.jpg",
  "readyInMinutes": 30,
  "servings": 4,
  "summary": "A fresh and healthy salad...",
  "diets": ["gluten free"],
  "cuisines": ["Mediterranean"],
  "ingredients": [
    "2 chicken breasts",
    "4 cups mixed salad greens",
    "..."
  ],
  "instructions": [
    "Marinate chicken breasts...",
    "Preheat grill...",
    "..."
  ],
  "nutrition": {
    "calories": 350,
    "protein": 35,
    "carbs": 20,
    "fat": 15
  }
}
```

### 3. Review Endpoints

#### GET /api/recipes/:id/reviews
Get all reviews for a recipe.

**Response:**
```json
{
  "reviews": [
    {
      "id": 1,
      "userId": 1,
      "username": "johndoe",
      "rating": 5,
      "text": "Absolutely delicious!",
      "createdAt": "2024-02-04T10:30:00Z"
    }
  ]
}
```

#### POST /api/recipes/:id/reviews
Submit a review for a recipe.

**Headers:**
```
Authorization: Bearer jwt-token-here
Content-Type: application/json
```

**Request Body:**
```json
{
  "rating": 5,
  "text": "This recipe was amazing!"
}
```

**Response:**
```json
{
  "success": true,
  "review": {
    "id": 1,
    "userId": 1,
    "recipeId": 1,
    "rating": 5,
    "text": "This recipe was amazing!",
    "createdAt": "2024-02-04T10:30:00Z"
  }
}
```

### 4. User Preferences Endpoints

#### GET /api/user/preferences
Get user's dietary preferences.

**Headers:**
```
Authorization: Bearer jwt-token-here
```

**Response:**
```json
{
  "preferences": {
    "dietaryPreferences": ["vegetarian", "gluten-free"],
    "allergies": ["peanuts", "shellfish"],
    "avoidedIngredients": ["cilantro"],
    "favoriteIngredients": ["garlic", "basil"],
    "cookingSkillLevel": "intermediate"
  }
}
```

#### PUT /api/user/preferences
Update user's dietary preferences.

**Headers:**
```
Authorization: Bearer jwt-token-here
Content-Type: application/json
```

**Request Body:**
```json
{
  "dietaryPreferences": ["vegetarian", "gluten-free"],
  "allergies": ["peanuts"],
  "avoidedIngredients": ["cilantro"],
  "favoriteIngredients": ["garlic", "basil"],
  "cookingSkillLevel": "intermediate"
}
```

**Response:**
```json
{
  "success": true,
  "preferences": {
    "dietaryPreferences": ["vegetarian", "gluten-free"],
    "allergies": ["peanuts"],
    "avoidedIngredients": ["cilantro"],
    "favoriteIngredients": ["garlic", "basil"],
    "cookingSkillLevel": "intermediate"
  }
}
```

## Frontend Integration Examples

### Authentication Integration

Update `js/auth.js`:

```javascript
async login(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        
        // Store token
        localStorage.setItem('authToken', data.token);
        
        // Store user
        this.currentUser = data.user;
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        this.updateUI();
        this.closeAuthModal();
        alert('Logged in successfully!');
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
    }
}

async register(email, password, username) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, username })
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        
        // Store token
        localStorage.setItem('authToken', data.token);
        
        // Store user
        this.currentUser = data.user;
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        this.updateUI();
        this.closeAuthModal();
        alert('Account created successfully!');
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
}
```

### Recipe Loading Integration

Update `js/recipes.js`:

```javascript
async loadRecipes() {
    this.showLoadingState();

    try {
        const params = new URLSearchParams({
            offset: this.offset.toString(),
            number: this.limit.toString()
        });

        if (this.filters.query) params.append('query', this.filters.query);
        if (this.filters.diet && this.filters.diet !== 'all') {
            params.append('diet', this.filters.diet);
        }
        if (this.filters.cuisine && this.filters.cuisine !== 'all') {
            params.append('cuisine', this.filters.cuisine);
        }
        if (this.filters.maxTime && this.filters.maxTime !== 'any') {
            params.append('maxReadyTime', this.filters.maxTime);
        }

        const response = await fetch(`/api/recipes?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }

        const data = await response.json();
        
        this.filteredRecipes = data.recipes;
        this.totalResults = data.totalResults;
        
        const recipesToShow = data.recipes;
        this.displayedRecipes.push(...recipesToShow);
        
        this.renderRecipes();
        this.updateResultsCount();
        this.updateLoadMoreButton();
    } catch (error) {
        console.error('Failed to load recipes:', error);
        this.showError('Failed to load recipes. Please try again.');
    }
}
```

### Review Submission Integration

Update `js/recipe-detail.js`:

```javascript
async handleReviewSubmit(e) {
    e.preventDefault();

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

    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`/api/recipes/${this.recipeId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                rating: this.selectedRating,
                text: reviewText
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit review');
        }

        // Reset form
        document.getElementById('reviewText').value = '';
        this.selectedRating = 0;
        this.updateStarDisplay();

        // Reload reviews
        await this.loadReviews();

        alert('Review submitted successfully!');
    } catch (error) {
        console.error('Failed to submit review:', error);
        alert('Failed to submit review. Please try again.');
    }
}

async loadReviews() {
    try {
        const response = await fetch(`/api/recipes/${this.recipeId}/reviews`);
        
        if (!response.ok) {
            throw new Error('Failed to load reviews');
        }

        const data = await response.json();
        this.renderReviews(data.reviews);
    } catch (error) {
        console.error('Failed to load reviews:', error);
        this.renderReviews([]);
    }
}
```

## Security Considerations

1. **CORS Configuration**
   - Configure your backend to allow requests from your frontend domain
   - Use appropriate CORS headers

2. **Authentication**
   - Store JWT tokens securely
   - Implement token refresh mechanism
   - Use httpOnly cookies for sensitive tokens (requires backend support)

3. **API Security**
   - Implement rate limiting
   - Validate all inputs on the backend
   - Use HTTPS in production
   - Implement CSRF protection

4. **Environment Variables**
   - Never expose API keys in frontend code
   - Use environment variables for configuration
   - Keep sensitive data on the backend

## Testing API Integration

Use tools like:
- **Postman**: Test API endpoints
- **curl**: Command-line testing
- **Browser DevTools**: Network tab to debug requests

Example curl test:
```bash
# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test getting recipes
curl http://localhost:3000/api/recipes?query=chicken&diet=gluten-free
```

## Error Handling

Implement proper error handling in your frontend:

```javascript
async function makeAPICall(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        // Show user-friendly error message
        alert('Something went wrong. Please try again.');
        throw error;
    }
}
```

## Next Steps

1. Set up your backend using Node.js, Python, Ruby, or any preferred language
2. Implement the required API endpoints
3. Update the frontend JavaScript files to use real API calls
4. Test thoroughly
5. Deploy both frontend and backend
6. Monitor and optimize performance

For more details on database setup, see `database.sql`.

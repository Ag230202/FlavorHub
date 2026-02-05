# FlavorHub 

This is a HTML, CSS, and JavaScript  FlavorHub application.

## Original Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React hooks, SWR
- **Backend**: Next.js API Routes
- **Database**: SQL (Neon)
- **Authentication**: Custom JWT-based auth

## Converted Stack
- **Frontend**: Pure HTML5, CSS3,  JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables
- **State Management**: JavaScript classes and localStorage
- **Backend**: Mock data in JavaScript (can be replaced with actual API calls)
- **Database**: SQL schema provided (database.sql)
- **Authentication**: localStorage-based (demo purposes)

## File Structure

```
-FlavorHub/
├── index.html              # Homepage
├── recipes.html            # Recipe listing page
├── recipe-detail.html      # Individual recipe detail page
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── auth.js             # Authentication module
│   ├── main.js             # Homepage scripts
│   ├── recipes.js          # Recipe listing functionality
│   └── recipe-detail.js    # Recipe detail functionality
├── assets/                 # Images and icons
├── database.sql            # SQL database schema
└── README.md               # This file
```

## Features Implemented

### ✅ Converted Features
1. **Homepage**
   - Hero section with call-to-action
   - Feature cards grid
   - Diet options browse section
   - CTA section

2. **Recipe Listing**
   - Search functionality
   - Multiple filters (diet, cuisine, cooking time)
   - Recipe cards grid with responsive layout
   - Load more pagination
   - Empty and loading states

3. **Recipe Detail**
   - Recipe information display
   - Ingredients list
   - Step-by-step instructions
   - Review and rating system
   - User reviews display

4. **Authentication**
   - Sign in / Sign up modal
   - User session management
   - localStorage-based auth (demo)

5. **Responsive Design**
   - Mobile-first approach
   - Tablet and desktop layouts
   - Touch-friendly interactions

### 🔄 Simplified Features
- **API Calls**: Replaced with mock data stored in JavaScript
- **Authentication**: Simplified to localStorage (in production, use proper backend)
- **Database**: Schema provided but not connected (requires backend integration)
- **State Management**: Simplified with vanilla JS classes

## How to Use

### Development
1. Simply open `index.html` in a modern web browser
2. No build process or dependencies required
3. All functionality works locally

### Production Deployment
1. Upload all files to any static web hosting (Netlify, Vercel, GitHub Pages, etc.)
2. No server-side rendering required
3. For backend functionality:
   - Set up a SQL database using `database.sql`
   - Create API endpoints to replace mock data
   - Implement proper authentication (JWT, OAuth, etc.)

## Database Setup

If you want to connect to a real database:

1. Install SQL or use a cloud provider (Neon, Supabase, etc.)
2. Run the SQL schema:
   ```bash
   psql -U your_username -d your_database -f database.sql
   ```
3. Create backend API endpoints to handle:
   - Recipe searches and filtering
   - User authentication
   - Review submissions
   - User preferences

## Connecting to a Backend

To connect this frontend to a real backend API:

1. **In js/recipes.js**:
   - Replace `MOCK_RECIPES` with actual API calls
   - Update `loadRecipes()` method to fetch from your API

2. **In js/auth.js**:
   - Replace localStorage authentication with API calls
   - Implement proper JWT token handling
   - Add token refresh logic

3. **In js/recipe-detail.js**:
   - Fetch recipe details from API
   - Submit reviews to backend
   - Load reviews from database

### Example API Integration

```javascript
// In js/recipes.js
async loadRecipes() {
    try {
        const response = await fetch(`/api/recipes?${this.buildQueryString()}`);
        const data = await response.json();
        this.filteredRecipes = data.recipes;
        this.renderRecipes();
    } catch (error) {
        console.error('Failed to load recipes:', error);
    }
}

// In js/auth.js
async login(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        localStorage.setItem('token', data.token);
        this.currentUser = data.user;
        this.updateUI();
    } catch (error) {
        console.error('Login failed:', error);
    }
}
```

## Browser Compatibility

This application works on all modern browsers:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

## Key Differences from Original

| Feature | Original (Next.js/React) | Converted (Vanilla) |
|---------|-------------------------|---------------------|
| Routing | Next.js App Router | Multi-page HTML |
| Components | React Components | HTML templates |
| Styling | Tailwind + shadcn/ui | Custom CSS |
| State | React Hooks | JavaScript Classes |
| Data Fetching | SWR | Fetch API |
| Auth | JWT + API | localStorage (demo) |
| Build | Next.js build | No build needed |

## Future Enhancements

To make this production-ready:

1. **Backend Integration**
   - Create REST or GraphQL API
   - Implement proper authentication
   - Connect to SQL database

2. **Security**
   - Add HTTPS
   - Implement CSRF protection
   - Secure API endpoints
   - Use httpOnly cookies for sessions

3. **Performance**
   - Add service workers for offline support
   - Implement lazy loading for images
   - Add caching strategies
   - Optimize CSS delivery

4. **Features**
   - User profiles
   - Favorite recipes
   - Recipe collections
   - Social sharing
   - Print recipe functionality

## License

This is a converted version of the original FlavorHub application. Please refer to the original project for licensing information.

## Credits

- Original design: shadcn/ui components
- Images: Unsplash
- Icons: Lucide Icons (converted to inline SVG)
- Fonts: System fonts stack

## Support

For issues or questions:
1. Check the browser console for errors
2. Ensure all files are in the correct directories
3. Verify modern browser is being used
4. Check network tab for failed requests (if using APIs)

---

**Note**: This is a demonstration conversion. For production use, implement proper backend services, security measures, and testing.

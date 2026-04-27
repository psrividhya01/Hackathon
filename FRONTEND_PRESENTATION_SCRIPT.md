# Retailing Order System - Frontend Architecture Presentation Script

---

## 📌 SLIDE 1: INTRODUCTION (1 minute)

**Speaker Notes:**

"Hello everyone! This presentation covers the **frontend** of the Retailing Order System. The frontend is built with **Angular 21** using standalone components, reactive signals, and a service-driven architecture.

We’ll walk through:
- the app structure
- user and admin flows
- how routing and guards work
- how state is managed
- how the frontend communicates with the backend

Let's jump in."

---

## 📌 SLIDE 2: FRONTEND ARCHITECTURE OVERVIEW (2 minutes)

**Speaker Notes:**

"The frontend is structured around three main layers:

1. **Routing** — decides which page to show based on URL and user state.
2. **Components & Pages** — render UI and handle user interaction.
3. **Services** — manage application state and communicate with the backend API.

Angular standalone components are used throughout, which simplifies the app by removing the need for large NgModules. The top-level `App` component simply contains a `<router-outlet>`.

This architecture keeps UI logic separate from application logic and data access."

**Visual Reference:**
```
Angular App
├── Routing (app.routes.ts)
├── Pages & Components
│   ├── Login / Register
│   ├── Home / Menu / Cart / Order pages
│   ├── Admin pages
│   └── Shared components (Navbar, etc.)
└── Services
    ├── AuthService
    ├── ProductService
    ├── CartService
    ├── OrderService
    └── InventoryService
```

---

## 📌 SLIDE 3: ROUTING & GUARDS (2 minutes)

**Speaker Notes:**

"Routing is defined in `src/app/app.routes.ts`.

Key routes include:
- `/login`, `/register`
- `/home`, `/menu`, `/products`, `/cart`, `/order` for users
- `/admin/...` for admin pages

Route guards protect pages:
- `authGuard` redirects logged-in users away from login/register screens
- `userGuard` blocks unauthenticated users from user pages
- `roleGuard` blocks non-admin users from admin pages

The guards use `AuthService` to check login state and user role, then navigate accordingly.

This ensures only the right users can access the right pages."

---

## 📌 SLIDE 4: AUTHENTICATION FLOW (2 minutes)

**Speaker Notes:**

"AuthService is the central auth layer.

It stores:
- current user object
- JWT token
- computed signals for `isLoggedIn`, `isAdmin`, and `isUser`

On startup, it loads session data from localStorage.

Login flow:
1. User enters email/password in `LoginComponent`
2. `AuthService.login()` sends POST `/api/auth/login`
3. Backend returns a token and user data
4. `AuthService.setSession()` stores token/user in localStorage
5. The app navigates to `/admin` for admins or `/home` for users

Logout clears localStorage and redirects to `/login`.

This gives us a simple persistent login state across page refreshes."

---

## 📌 SLIDE 5: APPLICATION STATE WITH SIGNALS (2 minutes)

**Speaker Notes:**

"The app uses Angular signals for state management.

Examples:
- `AuthService` uses `signal<User | null>(null)` for the current user
- `CartService` uses `signal<Cart | null>(null)` for cart state
- `ProductService` uses `signal<Product[]>([])` for product list

Computed signals provide derived values,
for example:
- `cartCount`
- `cartTotal`
- `isLoggedIn`

Signals keep the UI reactive and allow components to update automatically when data changes."

---

## 📌 SLIDE 6: PAGE FLOW — LOGIN & REGISTER (2 minutes)

**Speaker Notes:**

"Login and register pages are the entry points.

**Login Page**:
- collects email/password
- calls `AuthService.login()`
- on success, sets session and redirects based on role
- on failure, displays error message

**Register Page**:
- collects name, email, password, optional role
- calls `AuthService.register()`
- likely redirects to login or home after success

These pages also use guards so authenticated users cannot revisit login/register unnecessarily."

---

## 📌 SLIDE 7: USER EXPERIENCE — MENU & PRODUCT BROWSing (2.5 minutes)

**Speaker Notes:**

"The main shopping experience happens in pages like `MenuComponent` and `ProductsComponent`.

For example, `MenuComponent`:
- loads products, categories, brands, cart state, and wishlist state on init
- filters products using search text, category, and brand
- adds items to cart with `CartService.addToCart()`
- refreshes cart state after mutation

It uses shared services to keep UI and data synchronized across the app.

This is the primary shopping flow where the user discovers products and chooses what to buy."

---

## 📌 SLIDE 8: SHOPPING CART & ORDER FLOW (2.5 minutes)

**Speaker Notes:**

"Cart and order pages tie everything together.

`CartService` manages:
- fetching cart data from GET `/api/cart`
- adding items via POST `/api/cart`
- updating quantities via PUT `/api/cart/{id}`
- removing items via DELETE `/api/cart/{id}`

It also computes cart totals using signals.

`OrderService` manages:
- placing orders via POST `/api/orders`
- loading user orders via GET `/api/orders/my`
- viewing order details via GET `/api/orders/{id}`

This creates a smooth checkout flow from cart review to order placement and order history."

---

## 📌 SLIDE 9: ADMIN WORKFLOW (2 minutes)

**Speaker Notes:**

"Admin pages are grouped under `/admin` and protected by `roleGuard`.

Admin routes include:
- categories
- brands
- products
- variants
- inventory
- orders

Admin services like `ProductService`, `BrandService`, `CategorieService`, `VarientService`, and `InventoryService` provide CRUD operations to the backend.

This allows administrators to manage catalog data and inventory directly from the UI."

---

## 📌 SLIDE 10: SERVICES AS APPLICATION BACKBONE (2 minutes)

**Speaker Notes:**

"Services are the backend connectors.

Each service is `@Injectable({ providedIn: 'root' })`, meaning it is a singleton for the entire app.

Examples:
- `ProductService` loads and filters products
- `BrandService` loads brands
- `CategorieService` loads categories
- `WishlistService` manages wishlist items locally
- `InventoryService` loads inventory state

The services keep component classes thin and reusable, moving business logic away from templates."

---

## 📌 SLIDE 11: API COMMUNICATION PATTERN (2 minutes)

**Speaker Notes:**

"The frontend communicates with the backend via HttpClient.

Base API URLs are configured inside each service, for example:
- `AuthService` → `http://localhost:5064/api/auth`
- `ProductService` → `http://localhost:5064/api/products`
- `CartService` → `http://localhost:5064/api/cart`
- `OrderService` → `http://localhost:5064/api/orders`

The app uses standard REST-style endpoints and HTTP verbs:
- GET for reading data
- POST for creating records
- PUT for updates
- DELETE for deletion

This maps cleanly to the backend controller design."

---

## 📌 SLIDE 12: DATA MODELS IN THE FRONTEND (1.5 minutes)

**Speaker Notes:**

"Frontend models define the data contract between UI and backend.

Key models include:
- `User` / `LoginRequest` / `RegisterRequest`
- `AuthResponse` with `token` and `user`
- `Product`, `ProductVariant`, `Brand`, `Category`
- `Cart`, `CartItem`, `AddToCartRequest`, `UpdateCartRequest`
- `Order`, `PlaceOrderRequest`, `UpdateOrderStatusRequest`

These TypeScript interfaces ensure the app only works with expected data shapes and help catch bugs early."

---

## 📌 SLIDE 13: ROUTE GUARDS & NAVIGATION RULES (1.5 minutes)

**Speaker Notes:**

"The route guard logic defines navigation rules.

`authGuard`:
- if user is logged in, redirect to `/home` or `/admin`
- otherwise allow access to login/register

`userGuard`:
- require authentication for user-specific pages
- otherwise redirect to `/login`

`roleGuard`:
- require admin role for admin pages
- unauthenticated users go to `/login`
- non-admin users go to `/home`

These guards ensure users only access pages appropriate for their role."

---

## 📌 SLIDE 14: USER INTERACTION EXAMPLE (2 minutes)

**Speaker Notes:**

"Let's follow a user action from start to finish:

1. User logs in on `/login`
2. AuthService saves token and user role
3. User navigates to `/menu`
4. `MenuComponent` loads products, categories, brands, cart, wishlist
5. User filters products, selects a variant, clicks add to cart
6. CartService sends POST `/api/cart`
7. Component refreshes the cart state
8. User goes to `/cart`, reviews totals, and clicks checkout
9. OrderService sends POST `/api/orders`
10. Order history becomes available via `/order-history`

That demonstrates the app’s reactive data flow and how page interactions rely on shared services."

---

## 📌 SLIDE 15: FRONTEND BUILD & DEVELOPMENT SETUP (1 minute)

**Speaker Notes:**

"The frontend is an Angular CLI app configured in `package.json`.

Important commands:
- `npm install` — install dependencies
- `npm start` — run the app locally with `ng serve`
- `npm run build` — compile production assets

Dependencies are minimal and focus on Angular core, forms, and routing.

The frontend is designed for local development against a backend on `http://localhost:5064`."

---

## 📌 SLIDE 16: SUMMARY & KEY TAKEAWAYS (1.5 minutes)

**Speaker Notes:**

"To summarize:

- The frontend is built with **Angular 21** and standalone components
- It uses **route guards** to enforce authentication and roles
- **AuthService** manages session state and stores JWT/user data
- **Signals** keep UI state reactive and simple
- **Services** communicate with backend REST APIs and keep components clean
- User flow includes login, browsing menu, adding to cart, and placing orders
- Admin flow includes managing products, categories, brands, variants, inventory, and orders

This structure gives us a scalable frontend that matches the backend cleanly and supports both regular users and administrators.

Any questions?"

---

## 📌 BONUS: KEY FRONTEND ROUTES & ENDPOINTS

**User routes:**
- `/login`
- `/register`
- `/home`
- `/menu`
- `/products`
- `/products/:id`
- `/cart`
- `/wishlist`
- `/order`
- `/order-success`
- `/order-history`
- `/order-tracking/:id`
- `/profile`

**Admin routes:**
- `/admin/categories`
- `/admin/brands`
- `/admin/products`
- `/admin/variants`
- `/admin/inventory`
- `/admin/orders`

**API base URL:**
- `http://localhost:5064/api`

**Total Presentation Time: ~18-22 minutes**

# VehicleHub – Online Car and Bike Information System

> **"Find. Compare. Choose."**  
> A simple, clean, and responsive web application designed for academic evaluation (MCA project demonstration) and real-world deployment on **GitHub Pages**.

---

## 1. Project Description

**VehicleHub** is a lightweight, responsive vehicle information portal built using modern web standards (HTML5, CSS3, and Vanilla JavaScript) with **Supabase** cloud backend services. 

The application enables prospective buyers and automobile enthusiasts to:
1. Register and securely log in.
2. Search and filter cars and bikes available in the Indian automotive market.
3. Fetch and inspect comprehensive vehicle specifications (engine cc, fuel type, mileage, power, torque, transmission, seating, and pricing).
4. Save favorite vehicles to a cloud database protected by Row Level Security (RLS).
5. Compare two vehicles side by side to make an informed decision.

The project is intentionally architected to be **simple, modular, and easy to explain during academic reviews/vivas**, avoiding over-engineered frameworks while demonstrating best practices in client-side architecture and cloud database security.

---

## 2. Key Features

- **Supabase Authentication**: User registration, login, session persistence, and logout using standard Supabase Auth SDK.
- **Car Exploration & Search**: Filter cars by brand, model, and fuel type (Petrol, Diesel).
- **Bike Exploration & Search**: Filter motorcycles and scooters by brand, displacement, and category (Sports, Cruiser, Naked, Scooter, Commuter).
- **Detailed Specification Sheet**: Comprehensive technical breakdown including engine displacement, transmission, power, torque, mileage, fuel tank capacity, and ground clearance.
- **Clean Vehicle API Layer with Fallback**: An extensible service layer that queries vehicle endpoints, with built-in realistic fallback datasets for offline reliability and demo evaluation.
- **Side-by-Side Comparison System**: Interactive comparison table contrasting two selected vehicles across all technical and economic specifications.
- **Cloud Favorites with Row Level Security (RLS)**: Save and delete vehicle shortlists stored securely in Supabase PostgreSQL tables where users can only access their own records.
- **Academic Demo / Fast-Fill Mode**: Allows instant test login even before configuring live Supabase API keys.
- **Fully Responsive UI**: Optimized for desktops, tablets, and smartphones using vanilla CSS Flexbox and Grid.
- **Static Hosting Ready**: No Node.js server or backend required; deployable directly to **GitHub Pages**.

---

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure for all pages and forms |
| **CSS3** | Responsive layouts (Grid & Flexbox), CSS custom variables, and animations |
| **Vanilla JavaScript (ES6+)** | Dynamic DOM rendering, state management, search filters, and API requests |
| **Supabase** | Cloud PostgreSQL database, user authentication, and Row Level Security (RLS) |
| **Vehicle API Service Layer** | RESTful vehicle data fetching with graceful fallback dataset |
| **GitHub Pages** | Free global static website hosting |

---

## 4. Project Structure

```text
VehicleHub/
│
├── index.html              # Landing page with introduction and quick links
├── login.html              # User login page with demo auto-fill
├── register.html           # User account registration page
├── dashboard.html          # Main authenticated dashboard (Cars, Bikes, Popular)
├── cars.html               # Cars search, filter, and catalogue page
├── bikes.html              # Bikes search, filter, and catalogue page
├── vehicle.html            # Detailed vehicle technical specifications page
├── favorites.html          # User's saved favorites list (Supabase DB)
├── compare.html            # Side-by-side vehicle comparison tool
├── supabase-schema.sql     # SQL script to create Supabase tables and RLS policies
├── README.md               # Complete project documentation
│
├── css/
│   └── style.css           # Clean, responsive styles with CSS variables
│
├── js/
│   ├── supabase.js         # Supabase client setup & configuration keys
│   ├── auth.js             # Authentication logic (register, login, session, logout)
│   ├── vehicles.js         # Curated vehicle dataset and API service layer
│   ├── favorites.js        # Supabase database CRUD operations for favorites
│   └── compare.js          # Comparison matrix logic and table renderer
│
└── assets/
    └── images/             # Brand SVG icons and logos
```

---

## 5. Main Website Flow

```text
Login / Register
       ↓
Dashboard (Overview & Popular Models)
       ↓
Choose Category (Cars 🚗 or Bikes 🏍️)
       ↓
Search & Filter by Brand / Model / Fuel
       ↓
Fetch Vehicle Specifications (Live API / Curated Dataset)
       ↓
Display Detailed Vehicle Specs (vehicle.html)
       ↓
Save to Cloud Favorites (❤️) OR Compare Side-by-Side (⚖️)
```

---

## 6. Step-by-Step Installation & Setup

### Step 1: Download or Clone the Project
Download the `VehicleHub` project folder or clone it to your local machine:
```bash
git clone https://github.com/your-username/VehicleHub.git
cd VehicleHub
```

### Step 2: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New Project** and name it `VehicleHub`.
3. Set a strong database password and choose your nearest region.

### Step 3: Run the SQL Schema & Enable RLS
1. In your Supabase dashboard, click on the **SQL Editor** tab in the left sidebar.
2. Open the file `supabase-schema.sql` included in this repository.
3. Paste the contents into the SQL Editor and click **RUN**.
4. This will automatically create:
   - `public.profiles` table
   - `public.favorites` table
   - Enable **Row Level Security (RLS)**
   - Create security policies ensuring each user only accesses their own favorites and profile.

### Step 4: Configure Your Supabase Credentials
1. In Supabase, go to **Project Settings** (gear icon) -> **API**.
2. Find:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **anon public key** (Project API Keys -> `anon` / `public`)
3. Open `js/supabase.js` in any text editor and replace the placeholders:
   ```javascript
   const SUPABASE_URL = "https://your-project-id.supabase.co";
   const SUPABASE_ANON_KEY = "your-anon-public-key-here";
   ```
4. Save the file.

> **Note for Viva / Demonstration**: Even without inserting Supabase keys immediately, VehicleHub will seamlessly run in **Academic Demo Mode** so you can demonstrate the user flow instantly.

### Step 5: Test Locally
Simply double-click `index.html` or run a lightweight local server:
```bash
# Python 3
python -m http.server 8000

# Or open directly in any web browser:
# double click index.html
```

---

## 7. Deploying to GitHub Pages

Because VehicleHub uses purely static HTML, CSS, and Vanilla JavaScript:
1. Initialize a Git repository in the `VehicleHub` directory:
   ```bash
   git init
   git add .
   git commit -m "Initial VehicleHub release"
   ```
2. Create a new repository on [GitHub](https://github.com) named `VehicleHub`.
3. Link your remote repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/your-username/VehicleHub.git
   git push -u origin main
   ```
4. In your GitHub repository:
   - Go to **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Source**, select `Deploy from a branch`.
   - Branch: `main`, folder: `/ (root)`.
   - Click **Save**.
5. Your website will be live in 1–2 minutes at:  
   `https://your-username.github.io/VehicleHub/`

---

## 8. Database Architecture

### `profiles` Table
Stores basic profile information linked to Supabase Auth:
- `id` (UUID, Primary Key, references `auth.users.id`)
- `full_name` (Text)
- `email` (Text)
- `created_at` (Timestamp with time zone)

### `favorites` Table
Stores user-saved vehicles:
- `id` (Bigint, Primary Key)
- `user_id` (UUID, references `auth.users.id`)
- `vehicle_id` (Text, e.g. `'car-1'`, `'bike-2'`)
- `vehicle_type` (Text, `'car'` or `'bike'`)
- `brand` (Text)
- `model` (Text)
- `price` (Text)
- `image_url` (Text)
- `created_at` (Timestamp with time zone)

### Row Level Security (RLS)
Supabase RLS is strictly enforced using `auth.uid() = user_id`. This prevents any user from viewing, modifying, or deleting other users' favorites or personal profiles.

---

## 9. Academic Project Review Guide (Viva Q&A)

| Question | Answer |
|---|---|
| **Why Vanilla JS instead of React?** | Vanilla JS ensures zero bundle build steps, ultra-fast loading, compatibility with static hosting like GitHub Pages, and easy transparency for code evaluation. |
| **How is authentication secured?** | Passwords are never stored in our custom code. Authentication tokens and password hashing are handled securely via Supabase Auth using industry-standard bcrypt and JWTs. |
| **What happens if the vehicle API is down?** | The application incorporates a decoupled `VehicleService` with a resilient fallback mechanism. If an external API is unreachable or rate-limited, VehicleHub automatically falls back to curated verified specifications without crashing. |
| **How does RLS protect user data?** | Row Level Security policies operate directly in PostgreSQL. Even if a user crafts a custom client query, the database server rejects requests where `user_id` does not match the authenticated session's `auth.uid()`. |

---

## 10. License & Credits

Developed for academic demonstration and learning purposes.
- Photography: Automobile imagery curated from Unsplash under the Unsplash open license.
- Backend & Auth: Powered by Supabase.

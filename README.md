# 🛒 বাজার দর (BazarDor)

**বাজার দর (BazarDor)** is a modern, fully responsive web application built to monitor and track daily commodity market prices. It provides an intuitive interface for users to check daily price updates, view market fluctuations (risers and fallers), check specific bazaar-based price comparisons, and filter items efficiently—all localized beautifully with Bengali support.

---

## 🚀 Live Links
* **Live Deployment:** [Insert your Vercel/Netlify Live Link Here]
* **GitHub Repository:** [Insert your GitHub Repository Link Here]

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **Next.js (App Router)** | Core Framework, Server-Side Rendering & Client Routing |
| **Tailwind CSS** | Utility-first styling framework |
| **DaisyUI / Hero UI** | Modern UI Component Library for elegant layouts |
| **TypeScript / JavaScript** | Robust codebase management |
| **BetterAuth** | Secure Authentication (Email/Password + Google + GitHub) |
| **React Hot Toast** | Real-time elegant toast notifications |

---

## ✨ Key Features

1. **Infinite Price Ticker (Marquee):** An infinitely scrolling real-time strip beneath the navbar displaying daily product updates, current prices in Bengali digits, and quick indicators (▲/▼ %) for rapid market overviews.
2. **Automated Market Trend Analysis:** Specialized landing sections tracking daily market shifts, segregating products into **"আজ দাম বেড়েছে ▲"** (Top 6 Risers) and **"আজ দাম কমেছে ▼"** (Top 6 Fallers).
3. **Robust Category-Based Advanced Sorting (Challenge C1):** Multi-criteria product filtration system ("সাজান: ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম") built to process and sort Bengali numeric structures based on absolute value rather than standard string sequences.
4. **Protected Product Details Architecture:** A secured routing layer `/product/[slug]` providing authenticated users with localized market summaries, descriptive tags, and deep bazaar-by-bazaar comparison matrices (Minimum, Maximum, and Average prices).
5. **Dynamic Authentication Layer with Live Profiles (Challenge C3):** Streamlined sign-in/sign-up flows backed by **BetterAuth** (Email, Google, GitHub integrations), absolute path protection redirections via toasts, and a reactive Profile Engine utilizing the official user-accounts API to modify metadata smoothly on separate routes.

---

## 📦 Core & Architectural Requirements Fulfilled

* **100% Adaptive Viewports:** Flawlessly responsive design scaling gracefully across mobile, tablet, and widescreen desktop monitors using max-containers, dynamic grids, and cascading text metrics.
* **Persistent Hydration States:** Preconfigured handling routines for dynamic dynamic routes (`[slug]`) preventing deployment refresh breakdown crashes (No hard 404 on refresh on platforms like Vercel).
* **Skeleton Loaders:** Integrated layout skeletons appearing automatically during initial high-latency dataset fetches to enhance Perceived Web Performance.
* **Smart Fallbacks:** Custom 404-routing configuration triggering safe visual error screens with intuitive CTA pathways back to the primary path (`/`).
* **Clean Commits:** Maintained development history containing over 8+ structural git commits written with standard, readable context markers.

---

## 🛠️ Local Installation & Development

To run this application locally on your computer, follow these simple steps:

1. **Clone the repository:**
   ```bash
   git clone [Your-GitHub-Repository-URL]
   cd bazardor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in your root folder and supply your **BetterAuth** and social provider keys:
   ```env
   BETTER_AUTH_SECRET=your_secret_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   # Add your Google / GitHub Client IDs & Secrets here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) inside your web browser to view the application.

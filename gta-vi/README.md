🎮 GTA VI Website Clone

A high-fidelity frontend recreation of the official Rockstar Games GTA VI announcement page. This project focuses on cinematic UI/UX, high-performance animations, and asset optimization.


🚀 The Challenge

After 2 months of learning to code, I wanted to move beyond basic layouts. Recreating a "Triple-A" gaming site required solving several engineering hurdles:

Cinematic Motion: Using GSAP to orchestrate smooth, scroll-triggered reveals and transitions.

Asset Management: Serving high-resolution backgrounds and custom typography (Pricedown.otf) efficiently via the public directory for production.

Responsiveness: Ensuring the "Vice City" aesthetic remains intact across mobile, tablet, and ultra-wide desktop screens.


🛠️ Tech Stack

Frontend Framework: React.js (Vite)

Animation Library: GSAP (GreenSock Animation Platform)

Styling: Tailwind CSS

Deployment: Vercel

Icons: Lucide React


✨ Key Features

🎯 Pixel-Perfect UI: Meticulously matched the official Rockstar Games layout and spacing.

🎭 Smooth Animations: GSAP-powered transitions for an immersive user experience.

⚡ Optimized Assets: Implemented lazy-loading and handled custom font injection for fast "First Contentful Paint."

📱 Fully Responsive: Fluid layouts designed for all device breakpoints.



🛠️ Installation & Setup
To run this project locally:

Clone the repo:


git clone https://github.com/sujwal19/ReactProjects.git

Navigate to the project directory:

cd gta-vi

Install dependencies:

npm install

Run the development server:

npm run dev


📈 What I Learned

The "Production Gap": Debugging font-pathing and case-sensitivity issues during Vercel deployment.

Animation Logic: How to use GSAP timelines to sync multiple UI elements.

Vite Architecture: Understanding how the /public directory serves assets in a production build compared to the /src folder.


🤝 Connect with Me
LinkedIn: Sujwal Dhungana

GitHub: @sujwal19

Disclaimer: This is a fan-made project for educational purposes. All assets and branding belong to Rockstar Games.

# Portfolio Website + JavaScript Puzzle Project

## Project Description
This project is a small personal portfolio showcasing interactive web projects.  
It includes a home page and a projects page. THe projects page has small interactive projects like the Sliding Puzzle Game.

---

## Tools Used

### **HTML**
- Semantic elements.
- Header structure (`<h1>`, `<h2>`, `<h3>`).
- "Alt" text for accessibility.

### **CSS**
- Multiple external CSS that each control their own dedicated parts (Layout, Navbar, Root/Reset and Current Page).
- Layout built with both **CSS Grid** and **Flexbox**.
  - Grid used for the puzzle game layout.
  - Flexbox used for the victory screen and the skills showcase.
- Responsive design implemented with **media queries** for:
  - Desktop
  - Tablet (≤ 500px)
  - Mobile (≤ 280px)
- Uses CSS variables for a consistent design system that is easy to modify.

### **JavaScript**
- Written in modern **ES6+** syntax using let, const, and arrow functions
- Uses **DOM selection** (querySelector, innerHTML, classList)
- Adds **interactivity** through addEventListener (Victory buttons for Sliding Puzzle Game)
- Includes **conditional logic**, **loops**, and a **higher-order function** (forEach)

---

## Interactive Features

### **Sliding Puzzle Game**
- The puzzle is loaded dynamically with shuffled image tiles.
- The user can click adjacent tiles to move them into the empty space.
- When all tiles are in the correct order, a **victory message** appears.
- Players can restart or close the victory window using buttons.

### **Dynamic Navigation Bar**
- The navigation bar is loaded from an external HTML file using `fetch()`
- Automatically highlights the current page using JavaScript if the current site has its own navbar button.

---

## Challenges & Solutions

### **1. Dynamic Navbar Loading**
**Challenge:** Implementing navigation bar across multiple pages, that can be edited from one file (navbar.html)  
**Solution:** Used fetch() to load navbar.html into each page dynamically and highlight the active link using window.location.pathname.

### **2. Puzzle Shuffle Logic**
**Challenge:** Randomizing puzzle tiles.  
**Solution:** Used a Fisher–Yates shuffle algorithm to make sure the tiles got a random placement (empty tile is not random).

### **3. Responsiveness Across Devices**
**Challenge:** Making sure the puzzle and project cards display correctly on mobile and desktop.  
**Solution:** Combined CSS Grid and Flexbox with media queries to adapt layouts to three screen sizes and in between.

---

## How to Run the Project

1. **Download or clone** the repository.
2. Open the project folder in your editor.
3. Run the project by opening **index.html** in your web browser.
4. Try out the navbar.
5. Go to **Projects** via the navbar and click on the title **Sliding Image Puzzle**

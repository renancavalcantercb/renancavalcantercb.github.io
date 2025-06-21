# Terminal Portfolio on GitHub Pages

An interactive terminal-style portfolio designed to showcase skills, projects, and contact information in a unique and engaging way. Perfect for developers who want to stand out with a creative and functional portfolio!

## Overview

The interface simulates a real terminal where visitors can type commands to explore information such as skills, recent projects, contact info, and even change the terminal theme. This project uses the GitHub API to dynamically fetch the latest repositories and includes modern features like command history, tab completion, and smooth animations.

## Features

- **Interactive Terminal Experience**:
  - Command history navigation (up/down arrows)
  - Tab completion for commands
  - Smooth animations and transitions
  - Authentic terminal cursor and styling

- **Theme Support**:
  - Light and dark themes with Dracula color scheme
  - Smooth theme transitions
  - Persistent theme preference

- **Dynamic Content**:
  - Real-time GitHub projects fetching
  - Cached API responses with 1-hour expiration
  - Detailed project information display

- **Modern Development**:
  - PWA support with service worker for offline functionality
  - Lazy loading with response caching
  - Accessibility features (ARIA labels, semantic HTML)
  - SEO optimization with Open Graph and Twitter meta tags
  - Performance optimizations and loading indicators

## Live Demo

Explore the portfolio live at: [https://renancavalcantercb.github.io/](https://renancavalcantercb.github.io/)

## Available Commands

- `help`: Displays all available commands with descriptions
- `ls`: Lists the main sections of the portfolio
- `about`: Shows a brief biography and current focus
- `skills`: Lists technical skills organized by categories
- `projects`: Dynamically lists recent GitHub projects with descriptions
- `contact`: Displays contact information
- `socials`: Shows links to social networks
- `theme [light/dark]`: Switches between light and dark themes
- `clear`: Clears the terminal
- `resume`: Provides link to download resume
- `blog`: Links to blog posts (coming soon)
- `search`: Search functionality (coming soon)

## Technical Details

- **Frontend**:
  - Vanilla JavaScript (no build process required)
  - Modern CSS with smooth animations and Dracula theme
  - Responsive design with mobile breakpoints
  - Fira Code font from Google Fonts for terminal aesthetic

- **API Integration**:
  - GitHub API for dynamic project fetching
  - Local storage caching with 1-hour expiration
  - Graceful error handling and offline fallbacks

- **PWA Features**:
  - Service worker for offline functionality
  - App manifest for mobile installation
  - Cached static assets and API responses

- **Testing**:
  - Automated test suite in `test.html`
  - Manual testing through interactive terminal commands

## Development

### Local Setup

Since this is a static site with no build process:

1. Clone the repository
2. Serve files using any HTTP server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Or using Node.js
   npx serve .
   ```
3. Open `http://localhost:8000` in your browser

### Testing

- **Automated Tests**: Open `test.html` in browser to run the test suite
- **Manual Testing**: Use the terminal commands interactively in `index.html`

### Deployment

- Automatic deployment to GitHub Pages on push to main branch
- No build process required - just static file hosting

## Contributing

Feel free to fork this project and customize it for your own portfolio! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is open source and available under the MIT License.

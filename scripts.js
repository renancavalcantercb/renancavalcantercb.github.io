const input = document.getElementById("input");
const output = document.getElementById("output");
let commandHistory = [];
let historyIndex = -1;
const commands = ['help', 'ls', 'cd', 'cat', 'tree', 'pwd', 'about', 'skills', 'projects', 'contact', 'socials', 'theme', 'clear', 'resume', 'blog', 'search'];

// Lazy loading cache for command responses
const commandCache = new Map();
const loadedSections = new Set();

// Virtual file system
let currentPath = '/';
const fileSystem = {
    '/': {
        type: 'directory',
        children: ['about.txt', 'skills.md', 'projects/', 'experience/', 'contact.txt', 'resume.pdf']
    },
    '/about.txt': {
        type: 'file',
        content: `I'm a tech enthusiast with a background in physics, passionate about Linux, Neovim, and exploring DevOps, data science, and process automation (RPA) with Python.

🔭 Currently working as a Python Developer and DevOps Analyst at Looqbox.
🌱 Focused on studying kernel development.
🤝 Open to collaborating on DevOps projects, Linux-related initiatives, or developing bots for MMO games — always up for new challenges!`
    },
    '/skills.md': {
        type: 'file',
        content: `# Technical Skills

## Front-end
- React, Javascript, Tailwind, Insomnia

## Back-end
- Python, Django, Flask, MongoDB, MySQL, BigQuery

## DevOps
- Docker, Kubernetes, Go, Terraform, Jenkins, GCP, AWS, Git, Linux

## Data Science & RPA
- Pandas, OpenCV, PyAutoGUI, BotCity`
    },
    '/contact.txt': {
        type: 'file',
        content: `Social & Contact Information:

LinkedIn: https://www.linkedin.com/in/renancavalcantercb/
Website: https://renancavalcantercb.github.io/
Email: renancavalcantercb@protonmail.com
GitHub: https://github.com/renancavalcantercb`
    },
    '/resume.pdf': {
        type: 'file',
        content: `PDF Document - Resume
Download: https://renancavalcantercb.github.io/resume.pdf`
    },
    '/projects/': {
        type: 'directory',
        children: ['README.md', 'terminal-portfolio/', 'healthcheck-cli/', 'terraform-gcp-bucket/', 'mongodb-backup/']
    },
    '/projects/README.md': {
        type: 'file',
        content: `# My Projects

This directory contains information about my recent projects.
Use 'ls' to see available projects, 'cd' to enter a project folder, and 'cat' to read files.`
    },
    '/projects/terminal-portfolio/': {
        type: 'directory',
        children: ['info.txt', 'tech-stack.md']
    },
    '/projects/terminal-portfolio/info.txt': {
        type: 'file',
        content: `Terminal Portfolio
=================

An interactive terminal-style portfolio website built with vanilla JavaScript.

Features:
- Command-line interface simulation
- PWA support with offline functionality
- Lazy loading and performance optimizations
- Automated testing suite
- Responsive design with multiple themes

Repository: https://github.com/renancavalcantercb/renancavalcantercb.github.io`
    },
    '/projects/terminal-portfolio/tech-stack.md': {
        type: 'file',
        content: `# Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Fonts**: Fira Code (Google Fonts)
- **PWA**: Service Worker, Web App Manifest
- **Testing**: Custom test framework
- **Hosting**: GitHub Pages
- **Performance**: Lazy loading, caching strategies`
    },
    '/projects/healthcheck-cli/': {
        type: 'directory',
        children: ['info.txt']
    },
    '/projects/healthcheck-cli/info.txt': {
        type: 'file',
        content: `Healthcheck CLI
===============

A command-line tool for monitoring system health and services.

Repository: https://github.com/renancavalcantercb/healthcheck-cli`
    },
    '/projects/terraform-gcp-bucket/': {
        type: 'directory',
        children: ['info.txt']
    },
    '/projects/terraform-gcp-bucket/info.txt': {
        type: 'file',
        content: `Terraform GCP Bucket
===================

Infrastructure as Code for Google Cloud Platform storage buckets using Terraform.

Repository: https://github.com/renancavalcantercb/terraform-gcp-bucket`
    },
    '/projects/mongodb-backup/': {
        type: 'directory',
        children: ['info.txt']
    },
    '/projects/mongodb-backup/info.txt': {
        type: 'file',
        content: `MongoDB Backup Service
=====================

Automated backup service for MongoDB databases with scheduling and cloud storage integration.

Repository: https://github.com/renancavalcantercb/mongodb_backup_service`
    },
    '/experience/': {
        type: 'directory',
        children: ['current.txt', 'timeline.md']
    },
    '/experience/current.txt': {
        type: 'file',
        content: `Current Position: Python Developer and DevOps Analyst
Company: Looqbox
Focus: Process automation, infrastructure management, and kernel development studies`
    },
    '/experience/timeline.md': {
        type: 'file',
        content: `# Professional Timeline

## Looqbox - Python Developer & DevOps Analyst
- Process automation with Python
- Infrastructure management and deployment
- DevOps practices implementation

## Background
- Physics background
- Linux and Neovim enthusiast
- Focus on kernel development studies`
    }
};

// Lazy load functions for heavy sections
function loadSkillsSection() {
    if (loadedSections.has('skills')) {
        return commandCache.get('skills');
    }
    
    const skillsData = `
Techs & Skills:
- Front-end: React, Javascript, Tailwind, Insomnia
- Back-end: Python, Django, Flask, MongoDB, MySQL, BigQuery
- DevOps: Docker, Kubernetes, Go, Terraform, Jenkins, GCP, AWS, Git, Linux
- Data Science & RPA: Pandas, OpenCV, PyAutoGUI, BotCity
`;
    
    loadedSections.add('skills');
    commandCache.set('skills', skillsData);
    return skillsData;
}

function loadAboutSection() {
    if (loadedSections.has('about')) {
        return commandCache.get('about');
    }
    
    const aboutData = `
I'm a tech enthusiast with a background in physics, passionate about Linux, Neovim, and exploring DevOps, data science, and process automation (RPA) with Python.

- 🔭 Currently working as a Python Developer and DevOps Analyst at Looqbox.
- 🌱 Focused on studying kernel development.
- 🤝 Open to collaborating on DevOps projects, Linux-related initiatives, or developing bots for MMO games — always up for new challenges!
`;
    
    loadedSections.add('about');
    commandCache.set('about', aboutData);
    return aboutData;
}

function loadContactSection() {
    if (loadedSections.has('contact')) {
        return commandCache.get('contact');
    }
    
    const contactData = `
Social & Contact:
- LinkedIn: https://www.linkedin.com/in/renancavalcantercb/
- Website: https://renancavalcantercb.github.io/
- Email: renancavalcantercb@protonmail.com
`;
    
    loadedSections.add('contact');
    commandCache.set('contact', contactData);
    return contactData;
}

// File system utilities
function normalizePath(path) {
    if (path.startsWith('/')) {
        return path;
    }
    
    // Handle relative paths
    let newPath = currentPath;
    if (currentPath !== '/' && !currentPath.endsWith('/')) {
        newPath += '/';
    }
    
    const parts = path.split('/').filter(part => part && part !== '.');
    
    for (const part of parts) {
        if (part === '..') {
            // Go up one directory
            if (newPath !== '/') {
                newPath = newPath.slice(0, -1); // Remove trailing slash
                const lastSlash = newPath.lastIndexOf('/');
                newPath = lastSlash === 0 ? '/' : newPath.slice(0, lastSlash);
            }
        } else {
            if (newPath !== '/') {
                newPath += '/';
            }
            newPath += part;
        }
    }
    
    return newPath;
}

function updatePrompt() {
    const prompts = document.querySelectorAll('.prompt');
    const newPromptText = `user@portfolio:${currentPath}$`;
    
    // Update current prompt
    prompts.forEach(prompt => {
        if (prompt.textContent.includes('user@portfolio')) {
            prompt.textContent = newPromptText;
        }
    });
    
    // Update the main prompt
    const mainPrompt = document.querySelector('.input-line .prompt');
    if (mainPrompt) {
        mainPrompt.textContent = newPromptText;
    }
}

function listDirectory(path) {
    const dir = fileSystem[path];
    if (!dir || dir.type !== 'directory') {
        return 'ls: cannot access \'' + path + '\': No such file or directory';
    }
    
    let output = '';
    dir.children.forEach(child => {
        const childPath = path === '/' ? '/' + child : path + '/' + child;
        const childItem = fileSystem[childPath];
        
        if (childItem && childItem.type === 'directory') {
            output += `${child}\n`;
        } else {
            output += `${child}\n`;
        }
    });
    
    return output.trim();
}

function changeDirectory(path) {
    const targetPath = normalizePath(path);
    
    if (!fileSystem[targetPath]) {
        return `cd: ${path}: No such file or directory`;
    }
    
    if (fileSystem[targetPath].type !== 'directory') {
        return `cd: ${path}: Not a directory`;
    }
    
    currentPath = targetPath;
    updatePrompt();
    return '';
}

function catFile(path) {
    const targetPath = normalizePath(path);
    
    if (!fileSystem[targetPath]) {
        return `cat: ${path}: No such file or directory`;
    }
    
    if (fileSystem[targetPath].type === 'directory') {
        return `cat: ${path}: Is a directory`;
    }
    
    return fileSystem[targetPath].content;
}

function showTree(path = currentPath, prefix = '', isLast = true) {
    const dir = fileSystem[path];
    if (!dir || dir.type !== 'directory') {
        return 'tree: not a directory';
    }
    
    let output = '';
    const children = dir.children || [];
    
    children.forEach((child, index) => {
        const isLastChild = index === children.length - 1;
        const childPath = path === '/' ? '/' + child : path + '/' + child;
        const connector = isLastChild ? '└── ' : '├── ';
        
        output += prefix + connector + child + '\n';
        
        const childItem = fileSystem[childPath];
        if (childItem && childItem.type === 'directory') {
            const nextPrefix = prefix + (isLastChild ? '    ' : '│   ');
            output += showTree(childPath, nextPrefix, isLastChild);
        }
    });
    
    return output;
}

function pwd() {
    return currentPath;
}

function showWelcomeMessage() {
    const welcomeMessage = `
Welcome to Renan's Portfolio Terminal!
🗂️  Now with file system navigation!
Type 'help' to see available commands or try: cd projects
`;
    typeWriter(welcomeMessage, 'welcome-message');
}

function typeWriter(text, className) {
    let i = 0;
    const div = document.createElement('div');
    div.className = className;
    output.appendChild(div);
    
    function type() {
        if (i < text.length) {
            div.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 30);
        }
    }
    type();
}

document.addEventListener("DOMContentLoaded", function() {
    showWelcomeMessage();
    input.focus();
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
});

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = input.value.trim();
        if (command) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }
        addOutput(command);
        executeCommand(command);
        input.value = "";
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = "";
        }
    } else if (event.key === "Tab") {
        event.preventDefault();
        const currentInput = input.value.trim();
        const matches = commands.filter(cmd => cmd.startsWith(currentInput));
        
        if (matches.length === 1) {
            input.value = matches[0];
        } else if (matches.length > 1) {
            addOutput(`Possible commands: ${matches.join(', ')}`);
        }
    }
});

function addOutput(command) {
    const div = document.createElement('div');
    const currentPrompt = `user@portfolio:${currentPath}$`;
    div.innerHTML = `<span class="prompt">${currentPrompt}</span> <span>${command}</span>`;
    div.style.opacity = '0';
    output.appendChild(div);
    
    // Animate entry
    setTimeout(() => {
        div.style.transition = 'opacity 0.3s ease-in';
        div.style.opacity = '1';
    }, 10);
}

function showLoadingIndicator() {
    const div = document.createElement('div');
    div.className = 'loading-indicator';
    div.innerHTML = 'Loading<span class="dots">...</span>';
    div.style.opacity = '0';
    output.appendChild(div);
    
    setTimeout(() => {
        div.style.transition = 'opacity 0.3s ease-in';
        div.style.opacity = '1';
    }, 10);
    
    return div;
}

function removeLoadingIndicator(indicator) {
    if (indicator && indicator.parentNode) {
        indicator.remove();
    }
}

function executeCommand(command) {
    let response;
    switch (command) {
        case "help":
            response = `Available commands:

File System:
- ls [path]: List directory contents
- cd <path>: Change directory
- cat <file>: Display file contents
- tree: Show directory tree structure
- pwd: Show current directory path

Portfolio:
- about: Information about me
- skills: My technical skills
- projects: My recent projects
- contact: Contact information
- socials: Links to my social media

System:
- theme [light/dark]: Toggle between themes
- clear: Clear the terminal
- resume: Link to my resume
- blog: Link to my blog
- search: Search in portfolio (coming soon)

Try: cd projects && ls && cat README.md`;
            break;
        case "ls":
            // Handle ls with optional path argument
            const lsArgs = command.split(' ').slice(1);
            const lsPath = lsArgs.length > 0 ? lsArgs[0] : currentPath;
            response = listDirectory(normalizePath(lsPath));
            break;
        case "pwd":
            response = pwd();
            break;
        case "tree":
            response = `${currentPath}\n${showTree()}`;
            break;
        case "about":
            response = loadAboutSection();
            break;
        case "skills":
            response = loadSkillsSection();
            break;
        case "projects":
            fetchLatestProjects();
            return;
        case "contact":
            response = loadContactSection();
            break;
        case "socials":
            response = `
Social Links:
- LinkedIn: https://www.linkedin.com/in/renancavalcantercb/
- GitHub: https://github.com/renancavalcantercb
- Personal Website: https://renancavalcantercb.github.io/
`;
            break;
        case "theme":
            response = `Usage: theme [light/dark]
Example: theme light - Switch to light theme
         theme dark - Switch to dark theme`;
            break;
        case "theme light":
            document.body.classList.add("light-mode");
            document.getElementById("terminal").classList.add("light-mode");
            input.classList.add("light-mode");
            response = "Switched to light theme.";
            break;
        case "theme dark":
            document.body.classList.remove("light-mode");
            document.getElementById("terminal").classList.remove("light-mode");
            input.classList.remove("light-mode");
            response = "Switched to dark theme.";
            break;
        case "clear":
            output.innerHTML = "";
            return;
        case "resume":
            response = `
Download my resume:
- PDF Version: [Download Resume](https://renancavalcantercb.github.io/resume.pdf)
`;
            break;
        case "blog":
            response = `
Check out my latest blog posts:
- [My Blog](https://renancavalcantercb.github.io/blog)
`;
            break;
        case "search":
            response = `
Search functionality coming soon!
`;
            break;
        case "cd":
            // cd without arguments goes to home directory
            response = changeDirectory('/');
            if (!response) return;
            break;
        default:
            // Check if it's a cd command with arguments
            if (command.startsWith('cd ')) {
                const cdArgs = command.split(' ').slice(1);
                const cdPath = cdArgs.length > 0 ? cdArgs.join(' ') : '/';
                response = changeDirectory(cdPath);
                if (!response) return; // cd successful, no output needed
                break;
            }
            
            // Check if it's a cat command with arguments
            if (command.startsWith('cat ')) {
                const catArgs = command.split(' ').slice(1);
                if (catArgs.length > 0) {
                    response = catFile(catArgs[0]);
                    break;
                } else {
                    response = 'cat: missing file operand';
                    break;
                }
            }
            response = `Command '${command}' not found. Try 'help' for a list of commands.`;
    }
    
    if (response) {
        const div = document.createElement('div');
        div.innerHTML = response;
        div.style.opacity = '0';
        output.appendChild(div);
        
        // Animate entry
        setTimeout(() => {
            div.style.transition = 'opacity 0.3s ease-in';
            div.style.opacity = '1';
        }, 10);
    }
}

function fetchLatestProjects() {
    const githubUsername = "renancavalcantercb";
    const url = `https://api.github.com/users/${githubUsername}/repos?sort=created&per_page=5`;
    
    // Check cache
    const cachedData = localStorage.getItem('github_projects');
    const cacheTime = localStorage.getItem('github_projects_time');
    const now = new Date().getTime();
    
    if (cachedData && cacheTime && (now - cacheTime < 3600000)) { // Cache valid for 1 hour
        displayProjects(JSON.parse(cachedData));
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Request error');
            }
            return response.json();
        })
        .then(data => {
            // Save to cache
            localStorage.setItem('github_projects', JSON.stringify(data));
            localStorage.setItem('github_projects_time', now.toString());
            displayProjects(data);
        })
        .catch(error => {
            if (cachedData) {
                // If there's an error but we have cache, use it even if expired
                displayProjects(JSON.parse(cachedData));
            } else {
                // Display error without prompt
                const div = document.createElement('div');
                div.innerHTML = 'Error fetching projects. Please try again later.';
                div.style.opacity = '0';
                output.appendChild(div);
                
                setTimeout(() => {
                    div.style.transition = 'opacity 0.3s ease-in';
                    div.style.opacity = '1';
                }, 10);
            }
        });
}

function displayProjects(data) {
    let projectsList = "Recent Projects:\n";
    data.forEach(repo => {
        projectsList += `- ${repo.name}: ${repo.html_url}\n`;
        if (repo.description) {
            projectsList += `  ${repo.description}\n`;
        }
    });
    
    // Display response without prompt
    const div = document.createElement('div');
    div.innerHTML = projectsList;
    div.style.opacity = '0';
    output.appendChild(div);
    
    // Animate entry
    setTimeout(() => {
        div.style.transition = 'opacity 0.3s ease-in';
        div.style.opacity = '1';
    }, 10);
}
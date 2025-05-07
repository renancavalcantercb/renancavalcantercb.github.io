const input = document.getElementById("input");
const output = document.getElementById("output");
let commandHistory = [];
let historyIndex = -1;
const commands = ['help', 'ls', 'about', 'skills', 'projects', 'contact', 'socials', 'theme', 'clear', 'resume', 'blog', 'search'];

function showWelcomeMessage() {
    const welcomeMessage = `
Welcome to Renan's Portfolio Terminal!
Type 'help' to see available commands.
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
    div.innerHTML = `<span class="prompt">user@portfolio:~$</span> <span>${command}</span>`;
    div.style.opacity = '0';
    output.appendChild(div);
    
    // Animate entry
    setTimeout(() => {
        div.style.transition = 'opacity 0.3s ease-in';
        div.style.opacity = '1';
    }, 10);
}

function executeCommand(command) {
    let response;
    switch (command) {
        case "help":
            response = `Available commands:
- ls: List available sections
- about: Information about me
- skills: My technical skills
- projects: My recent projects
- contact: Contact information
- socials: Links to my social media
- theme [light/dark]: Toggle between light and dark themes
- clear: Clear the terminal
- resume: Link to my resume
- blog: Link to my blog
- search: Search in portfolio (coming soon)`;
            break;
        case "ls":
            response = "Sections: projects, skills, contact";
            break;
        case "about":
            response = `
I'm a tech enthusiast with a background in physics, passionate about Linux, Neovim, and exploring DevOps, data science, and process automation (RPA) with Python.

- 🔭 Currently working as a Python Developer and DevOps Analyst at Looqbox.
- 🌱 Focused on studying kernel development.
- 🤝 Open to collaborating on DevOps projects, Linux-related initiatives, or developing bots for MMO games — always up for new challenges!
`;
            break;
        case "skills":
            response = `
Techs & Skills:
- Front-end: React, Javascript, Tailwind, Insomnia
- Back-end: Python, Django, Flask, MongoDB, MySQL, BigQuery
- DevOps: Docker, Kubernetes, Go, Terraform, Jenkins, GCP, AWS, Git, Linux
- Data Science & RPA: Pandas, OpenCV, PyAutoGUI, BotCity
`;
            break;
        case "projects":
            fetchLatestProjects();
            return;
        case "contact":
            response = `
Social & Contact:
- LinkedIn: https://www.linkedin.com/in/renancavalcantercb/
- Website: https://renancavalcantercb.github.io/
- Email: renancavalcantercb@protonmail.com
`;
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
        default:
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
                addOutput('Error fetching projects. Please try again later.');
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
    addOutput(projectsList);
}
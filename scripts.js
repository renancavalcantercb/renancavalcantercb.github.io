const input = document.getElementById("input");
const output = document.getElementById("output");

function showWelcomeMessage() {
    const welcomeMessage = `
Welcome to Renan's Portfolio Terminal!
Type 'help' to see available commands.
`;
    output.innerHTML += `<div class="welcome-message">${welcomeMessage}</div>`;
}

document.addEventListener("DOMContentLoaded", function() {
    showWelcomeMessage();
    input.focus(); 
});

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = input.value.trim();
        addOutput(command);
        executeCommand(command);
        input.value = "";
  }
});

function addOutput(command) {
    output.innerHTML += `<div><span class="prompt">user@portfolio:~$</span> <span>${command}</span></div>`;
}

function executeCommand(command) {
    let response;
    switch (command) {
        case "help":
            response = "Commands available: ls, about, skills, projects, contact, socials, theme, clear";
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
        default:
            response = `Command '${command}' not found. Try 'help' for a list of commands.`;
    }
    output.innerHTML += `<div>${response}</div>`;
}

function fetchLatestProjects() {
    const githubUsername = "renancavalcantercb";
    const url = `https://api.github.com/users/${githubUsername}/repos?sort=created&per_page=5`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let projectsList = "Latest Projects:\n";
            data.forEach(repo => {
                projectsList += `- ${repo.name}: ${repo.html_url}\n`;
            });
            output.innerHTML += `<div>${projectsList}</div>`;
        })
        .catch(error => {
            output.innerHTML += `<div>Error fetching projects. Please try again later.</div>`;
        });
}


# My Portfolio

This is my personal portfolio website built using HTML, CSS, and JavaScript with a modern, config-based architecture for managing projects and clients.

## Overview

My portfolio showcases my skills, projects, and experience in web development. It includes sections such as:
- **About Me**: A brief introduction to who I am and my background.
- **Projects**: A dynamic portfolio of projects with modal details, image galleries, and technology stacks.
- **Resume**: My education journey, professional experience, and technical skills.
- **Clients**: Organizations and companies I've worked with.
- **Contact**: How to get in touch with me.

## Key Features

- **Responsive Design**: The website is optimized for mobile, tablet, and desktop devices.
- **Dynamic Project Management**: Projects are managed via JSON config file - no HTML modifications needed.
- **Dynamic Client Management**: Client logos are managed via JSON config file.
- **Interactive Project Modal**: Click on any project to view:
  - Detailed project description
  - Image gallery with thumbnail navigation
  - Technologies used
  - Link to live project or repository
- **Project Filtering**: Filter projects by category (Web development, Applications, etc.)
- **Smooth Animations**: JavaScript-powered transitions and interactive elements.
- **Modern Styling**: Custom CSS with gradient effects and professional design.

## Configuration-Based Architecture

This portfolio uses JSON configuration files for easy maintenance and scalability:

### Projects Configuration (`assets/data/projects.json`)
Manage all project data in a single file:
```json
{
  "id": 1,
  "name": "Project Name",
  "category": "Web development",
  "thumbnail": "./assets/images/thumbnail.png",
  "details": "Project description...",
  "gallery": ["./assets/images/img1.png", "./assets/images/img2.png"],
  "link": "https://project-url.com",
  "technologies": ["React", "Node.js"]
}
```

### Clients Configuration (`assets/data/clients.json`)
Manage client logos in a single file:
```json
{
  "id": 1,
  "name": "Client Name",
  "logo": "./assets/images/logo.png",
  "website": "#"
}
```

### Resume Configuration (`assets/data/resume.json`)
Manage education and experience in a single file:
```json
{
  "education": [
    {
      "id": 1,
      "school": "School/University Name",
      "duration": "2022 — 2023",
      "description": "Description of your studies..."
    }
  ],
  "experience": [
    {
      "id": 1,
      "title": "Job Title",
      "duration": "2021 — Present",
      "description": "Description of your role and responsibilities..."
    }
  ]
}
```

### Skills Configuration (`assets/data/skills.json`)
Manage your skills with proficiency levels:
```json
[
  {
    "id": 1,
    "name": "Skill Name",
    "value": 85
  }
]
```

**See [PROJECT_SETUP.md](PROJECT_SETUP.md) for detailed configuration guide.**

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Dynamic content loading and interactivity
- **JSON**: Configuration-based data management

## File Structure

```
myportfolio/
├── assets/
│   ├── data/
│   │   ├── projects.json          # Project configuration
│   │   ├── clients.json           # Client configuration
│   │   ├── resume.json            # Resume/Experience configuration
│   │   └── skills.json            # Skills configuration
│   ├── images/                    # Project and client images
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── index.html
├── PROJECT_SETUP.md               # Configuration guide
└── README.md
```

## How to Run

To run the portfolio locally:

1. Clone this repository:
```bash
git clone https://github.com/yacineLaribi/myportfolio
```

2. Navigate to the directory:
```bash
cd myportfolio
```

3. Open `index.html` in your web browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using Live Server in VS Code
```

4. Visit `http://localhost:8000` in your browser

## Adding New Projects

1. Add your project images to `assets/images/`
2. Open `assets/data/projects.json`
3. Add a new project object (see [PROJECT_SETUP.md](PROJECT_SETUP.md) for details)
4. The project automatically appears on your portfolio!

## Adding New Clients

1. Add client logo to `assets/images/`
2. Open `assets/data/clients.json`
3. Add a new client object:
```json
{
  "id": 5,
  "name": "New Client",
  "logo": "./assets/images/client-logo.png",
  "website": "https://client-website.com"
}
```
4. The client logo automatically appears in the clients section!

## Adding New Resume Items

### Adding Education:
1. Open `assets/data/resume.json`
2. Add a new education object to the `education` array:
```json
{
  "id": 3,
  "school": "School/University Name",
  "duration": "2024 — Present",
  "description": "Brief description of your studies..."
}
```

### Adding Experience:
1. Open `assets/data/resume.json`
2. Add a new experience object to the `experience` array:
```json
{
  "id": 4,
  "title": "Job Title",
  "duration": "2024 — Present",
  "description": "Description of your role and responsibilities..."
}
```

## Adding New Skills

1. Open `assets/data/skills.json`
2. Add a new skill object:
```json
{
  "id": 6,
  "name": "New Skill",
  "value": 75
}
```
3. The skill automatically appears in the skills section with its progress bar!

## Contributing

If you find any issues or have suggestions for improvement, feel free to:
- Open an issue
- Submit a pull request
- Suggest enhancements

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Yacine Laribi](https://yacinelaribi.site)

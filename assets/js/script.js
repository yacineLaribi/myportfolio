'use strict';

// ============================================
// GLOBAL VARIABLES
// ============================================

let allProjects = [];

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }


// ============================================
// SIDEBAR FUNCTIONALITY
// ============================================

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

const introVideoBtn = document.querySelector("[data-intro-video-btn]");
const introVideoModalContainer = document.querySelector("[data-intro-video-modal-container]");
const introVideoOverlay = document.querySelector("[data-intro-video-overlay]");
const introVideoCloseBtn = document.querySelector("[data-intro-video-close-btn]");
const introVideoPlayer = document.querySelector("[data-intro-video-player]");

const openIntroVideoModal = function () {
  introVideoModalContainer.classList.add("active");
  introVideoOverlay.classList.add("active");
}

const closeIntroVideoModal = function () {
  introVideoModalContainer.classList.remove("active");
  introVideoOverlay.classList.remove("active");

  introVideoPlayer.pause();
  introVideoPlayer.currentTime = 0;
}

if (introVideoBtn && introVideoModalContainer && introVideoOverlay && introVideoCloseBtn && introVideoPlayer) {
  introVideoBtn.addEventListener("click", openIntroVideoModal);
  introVideoCloseBtn.addEventListener("click", closeIntroVideoModal);
  introVideoOverlay.addEventListener("click", closeIntroVideoModal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && introVideoModalContainer.classList.contains("active")) {
      closeIntroVideoModal();
    }
  });
}


// ============================================
// TESTIMONIALS MODAL FUNCTIONALITY (moved to renderTestimonials function)
// ============================================


// ============================================
// PROJECT MODAL FUNCTIONALITY
// ============================================

const projectModalContainer = document.querySelector("[data-project-modal-container]");
const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalMainImg = document.querySelector("[data-project-modal-main-img]");
const projectLinkBtn = document.querySelector("[data-project-link-btn]");
const galleryThumbnails = document.getElementById("galleryThumbnails");
const techTags = document.getElementById("techTags");

let currentProjectGallery = [];

const openProjectModal = function () {
  projectModalContainer.classList.add("active");
  projectOverlay.classList.add("active");
}

const closeProjectModal = function () {
  projectModalContainer.classList.remove("active");
  projectOverlay.classList.remove("active");
}

projectModalCloseBtn.addEventListener("click", closeProjectModal);
projectOverlay.addEventListener("click", closeProjectModal);

// Gallery thumbnail click handler
const setupGalleryThumbnails = function () {
  const thumbnails = document.querySelectorAll(".gallery-thumbnail");
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", function () {
      // Update main image
      projectModalMainImg.src = currentProjectGallery[index];
      projectModalMainImg.alt = "Project gallery image";

      // Update active thumbnail
      thumbnails.forEach(thumb => thumb.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Add fullscreen click handler to main image
  setupFullscreenImageModal();
}

// Setup fullscreen image modal
const setupFullscreenImageModal = function () {
  const fullscreenModal = document.querySelector("[data-fullscreen-image-modal]");
  const fullscreenOverlay = document.querySelector("[data-fullscreen-overlay]");
  const fullscreenCloseBtn = document.querySelector("[data-fullscreen-close-btn]");
  const fullscreenImage = document.querySelector("[data-fullscreen-image]");

  // Open fullscreen on main image click
  projectModalMainImg.addEventListener("click", function () {
    fullscreenImage.src = this.src;
    fullscreenImage.alt = this.alt;
    fullscreenModal.classList.add("active");
  });

  // Close fullscreen on close button click
  fullscreenCloseBtn.addEventListener("click", function () {
    fullscreenModal.classList.remove("active");
  });

  // Close fullscreen on overlay click
  fullscreenOverlay.addEventListener("click", function () {
    fullscreenModal.classList.remove("active");
  });

  // Close fullscreen on ESC key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      fullscreenModal.classList.remove("active");
    }
  });
}


// ============================================
// FILTER & SELECT FUNCTIONALITY
// ============================================

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterProjectFunc(selectedValue);

  });
}

// Filter function for projects
const filterProjectFunc = function (selectedValue) {
  const projectItems = document.querySelectorAll("[data-filter-item]");

  for (let i = 0; i < projectItems.length; i++) {

    if (selectedValue === "all") {
      projectItems[i].classList.add("active");
    } else if (selectedValue === projectItems[i].dataset.category) {
      projectItems[i].classList.add("active");
    } else {
      projectItems[i].classList.remove("active");
    }

  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterProjectFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// ============================================
// PROJECT LOADING & RENDERING
// ============================================

// Load projects from config file
const loadProjects = async function () {
  try {
    const response = await fetch('./assets/data/projects.json');
    if (!response.ok) throw new Error('Failed to load projects');
    allProjects = await response.json();
    renderProjects();
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Render projects dynamically
const renderProjects = function () {
  const projectList = document.getElementById("projectList");
  projectList.innerHTML = "";

  allProjects.forEach(project => {
    const categoryLower = project.category.toLowerCase();
    const projectItem = document.createElement("li");
    projectItem.className = "project-item active";
    projectItem.setAttribute("data-filter-item", "");
    projectItem.setAttribute("data-category", categoryLower);

    projectItem.innerHTML = `
      <a href="#" class="project-card-link" data-project-id="${project.id}">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <img src="${project.thumbnail}" alt="${project.name}" loading="lazy" />
        </figure>
        <h3 class="project-title">${project.name}</h3>
        <p class="project-category">${project.category}</p>
      </a>
    `;

    projectList.appendChild(projectItem);

    // Add click event to project card
    const projectLink = projectItem.querySelector(".project-card-link");
    projectLink.addEventListener("click", function (e) {
      e.preventDefault();
      showProjectModal(project);
    });
  });
}

// Show project modal with details
const showProjectModal = function (project) {
  projectModalTitle.innerHTML = project.name;
  projectModalCategory.innerHTML = project.category;
  projectModalDescription.innerHTML = project.details;
  projectLinkBtn.href = project.link;

  // Setup gallery
  currentProjectGallery = project.gallery;
  projectModalMainImg.src = project.gallery[0];
  projectModalMainImg.alt = project.name;

  // Render gallery thumbnails
  galleryThumbnails.innerHTML = "";
  project.gallery.forEach((image, index) => {
    const thumbnail = document.createElement("div");
    thumbnail.className = `gallery-thumbnail ${index === 0 ? "active" : ""}`;
    thumbnail.innerHTML = `<img src="${image}" alt="Gallery thumbnail ${index + 1}" />`;
    galleryThumbnails.appendChild(thumbnail);
  });

  // Setup tech tags
  techTags.innerHTML = "";
  project.technologies.forEach(tech => {
    const tag = document.createElement("span");
    tag.className = "tech-tag";
    tag.innerHTML = tech;
    techTags.appendChild(tag);
  });

  // Setup gallery thumbnail click handlers
  setupGalleryThumbnails();

  // Open modal
  openProjectModal();
}


// ============================================
// CLIENTS LOADING & RENDERING
// ============================================

// Load clients from config file
const loadClients = async function () {
  try {
    const response = await fetch('./assets/data/clients.json');
    if (!response.ok) throw new Error('Failed to load clients');
    const clients = await response.json();
    renderClients(clients);
  } catch (error) {
    console.error('Error loading clients:', error);
  }
}

// Render clients dynamically
const renderClients = function (clients) {
  const clientsList = document.getElementById("clientsList");
  clientsList.innerHTML = "";

  clients.forEach(client => {
    const clientItem = document.createElement("li");
    clientItem.className = "clients-item";

    clientItem.innerHTML = `
      <a href="${client.website}">
        <img src="${client.logo}" alt="${client.name}" />
      </a>
    `;

    clientsList.appendChild(clientItem);
  });
}


// ============================================
// RESUME LOADING & RENDERING
// ============================================

// Load resume data from config file
const loadResume = async function () {
  try {
    const response = await fetch('./assets/data/resume.json');
    if (!response.ok) throw new Error('Failed to load resume');
    const resumeData = await response.json();
    renderEducation(resumeData.education);
    renderExperience(resumeData.experience);
  } catch (error) {
    console.error('Error loading resume:', error);
  }
}

// Render education dynamically
const renderEducation = function (education) {
  const educationList = document.getElementById("educationList");
  educationList.innerHTML = "";

  education.forEach(item => {
    const eduItem = document.createElement("li");
    eduItem.className = "timeline-item";

    eduItem.innerHTML = `
      <h4 class="h4 timeline-item-title">${item.school}</h4>
      <span>${item.duration}</span>
      <p class="timeline-text">${item.description}</p>
    `;

    educationList.appendChild(eduItem);
  });
}

// Render experience dynamically
const renderExperience = function (experience) {
  const experienceList = document.getElementById("experienceList");
  experienceList.innerHTML = "";

  experience.forEach(item => {
    const expItem = document.createElement("li");
    expItem.className = "timeline-item";

    expItem.innerHTML = `
      <h4 class="h4 timeline-item-title">${item.title}</h4>
      <span>${item.duration}</span>
      <p class="timeline-text">${item.description}</p>
    `;

    experienceList.appendChild(expItem);
  });
}


// ============================================
// SKILLS LOADING & RENDERING
// ============================================

// Load skills from config file
const loadSkills = async function () {
  try {
    const response = await fetch('./assets/data/skills.json');
    if (!response.ok) throw new Error('Failed to load skills');
    const skills = await response.json();
    renderSkills(skills);
  } catch (error) {
    console.error('Error loading skills:', error);
  }
}

// Render skills dynamically
const renderSkills = function (skills) {
  const skillsList = document.getElementById("skillsList");
  skillsList.innerHTML = "";

  skills.forEach(skill => {
    const skillItem = document.createElement("li");
    skillItem.className = "skills-item";

    skillItem.innerHTML = `
      <div class="title-wrapper">
        <h5 class="h5">${skill.name}</h5>
        <data value="${skill.value}">${skill.value}%</data>
      </div>
      <div class="skill-progress-bg">
        <div class="skill-progress-fill" style="width: ${skill.value}%"></div>
      </div>
    `;

    skillsList.appendChild(skillItem);
  });
}


// ============================================
// TESTIMONIALS LOADING & RENDERING
// ============================================

// Load testimonials from config file
const loadTestimonials = async function () {
  try {
    const response = await fetch('./assets/data/testimonials.json');
    if (!response.ok) throw new Error('Failed to load testimonials');
    const testimonials = await response.json();
    renderTestimonials(testimonials);
  } catch (error) {
    console.error('Error loading testimonials:', error);
  }
}

// Render testimonials dynamically
const renderTestimonials = function (testimonials) {
  const testimonialsList = document.getElementById("testimonialsList");
  testimonialsList.innerHTML = "";

  testimonials.forEach(testimonial => {
    const testimonialItem = document.createElement("li");
    testimonialItem.className = "testimonials-item";

    testimonialItem.innerHTML = `
      <div class="content-card" data-testimonials-item>
        <figure class="testimonials-avatar-box">
          <img
            src="./assets/images/avatar-1.png"
            alt="${testimonial.name}"
            width="60"
            data-testimonials-avatar
          />
        </figure>

        <h4 class="h4 testimonials-item-title" data-testimonials-title>
          ${testimonial.name}
        </h4>

        <p style="font-size: 0.875rem; color: #808080; margin-bottom: 0.5rem;">
          <strong>${testimonial.business}</strong>
        </p>

        <div class="testimonials-text" data-testimonials-text>
          <p>${testimonial.description}</p>
        </div>
      </div>
    `;

    testimonialsList.appendChild(testimonialItem);
  });

  // Setup modal click handlers after testimonials are rendered
  setupTestimonialsModalHandlers();
}

// Setup click handlers for testimonials modal
const setupTestimonialsModalHandlers = function () {
  const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all testimonials items
  testimonialsItems.forEach((item) => {
    item.addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      
      testimonialsModalFunc();
    });
  });

  // add click event to modal close button
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}


// ============================================
// PAGE NAVIGATION
// ============================================

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// ============================================
// CONTACT FORM
// ============================================

const form = document.getElementById("form");
const sub = document.querySelector(".form-btn");
let formSubmitted = false;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!formSubmitted) {
    emailjs.sendForm("service_p8lfbij", "template_chkgosw", this).then(
      function (response) {
        console.log("Email sent successfully:", response);
        sub.innerHTML =
          '<ion-icon name="paper-plane"></ion-icon> <span>Message Sent successfully !</span>';
        formSubmitted = true;
      },
      function (error) {
        console.error("Error sending email:", error);
        sub.innerHTML =
          '<ion-icon name="paper-plane"></ion-icon> <span>Error occured sending the message .</span>';
      }
    );
  } else {
    sub.innerHTML =
      '<ion-icon name="paper-plane"></ion-icon> <span>Message Already Sent!</span>';
  }
});


// ============================================
// INITIALIZATION
// ============================================

// Load projects and clients when page loads
document.addEventListener("DOMContentLoaded", function () {
  loadProjects();
  loadClients();
  loadResume();
  loadSkills();
  loadTestimonials();
});
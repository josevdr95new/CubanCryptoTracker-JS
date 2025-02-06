// projects.js

window.projectsData = null;

window.loadProjects = async () => {
  const projectsContainer = document.getElementById('projectsContainer');
  projectsContainer.innerHTML = '<p>Cargando proyectos...</p>';
  try {
    const url = 'https://josevdr95new.github.io/CubanCryptoTracker-JS/proyectos.json?nocache=' + new Date().getTime();
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);
    window.projectsData = await response.json();
    projectsContainer.innerHTML = '';
    filterProjects();
  } catch (error) {
    console.error('Error cargando proyectos:', error);
    projectsContainer.innerHTML = '<p>Error al cargar los proyectos.</p>';
  }
};

const createProjectCard = (project, container) => {
  const projectCard = document.createElement('div');
  projectCard.className = 'project-card';
  projectCard.innerHTML = `
    <div class="project-image"><img src="${project.imagen}" alt="${project.nombre}"></div>
    <div class="project-content">
      <h4>${project.nombre}</h4>
      <p style="white-space: pre-line">${project.descripcion.replace(/\\n/g, '\n')}</p>
      <p><strong>Estado:</strong> ${project.estado}</p>
      <p><strong>Pago:</strong> ${project.pago}</p>
      <p><strong>Gratis:</strong> ${project.gratis}</p>
      <p><strong>Fecha de publicación:</strong> ${project.fechaPublicacion}</p>
      <a href="#" onclick="handleProjectLinkClick('${project.enlace}')" class="project-link">Visitar proyecto</a>
    </div>
  `;
  container.appendChild(projectCard);
};

// Resto del código sin cambios
const filterProjects = () => {
  if (!window.projectsData) {
    console.error("Los datos de los proyectos no están disponibles.");
    return;
  }

  const categoryFilter = document.getElementById('categoryFilter').value;
  const sortOrder = document.getElementById('sortOrder').value;
  const projectsContainer = document.getElementById('projectsContainer');
  projectsContainer.innerHTML = '';

  let filteredProjects = [];
  if (categoryFilter === 'all') {
    for (const category in window.projectsData) {
      if (Array.isArray(window.projectsData[category]) && window.projectsData[category].length > 0) {
        filteredProjects = filteredProjects.concat(window.projectsData[category]);
      }
    }
  } else {
    if (Array.isArray(window.projectsData[categoryFilter]) && window.projectsData[categoryFilter].length > 0) {
      filteredProjects = window.projectsData[categoryFilter];
    } else {
      projectsContainer.innerHTML = '<p>No hay proyectos en esta categoría.</p>';
      return;
    }
  }

  sortProjects(filteredProjects, sortOrder);

  if (filteredProjects.length > 0) {
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = categoryFilter === 'all' ? 'Todos los proyectos' : categoryFilter.toUpperCase();
    categoryTitle.style.color = 'var(--accent)';
    projectsContainer.appendChild(categoryTitle);
    filteredProjects.forEach(project => createProjectCard(project, projectsContainer));
  } else {
    projectsContainer.innerHTML = '<p>No hay proyectos disponibles.</p>';
  }
};

const sortProjects = (projects, order) => {
  if (order === 'recent') {
    projects.sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion));
  } else if (order === 'oldest') {
    projects.sort((a, b) => new Date(a.fechaPublicacion) - new Date(b.fechaPublicacion));
  }
};

const acceptProjectsDisclaimer = () => {
  closeModal('projectsDisclaimerModal');
  document.getElementById('projectsContent').style.display = 'block';
};

const rejectProjectsDisclaimer = () => {
  closeModal('projectsDisclaimerModal');
  showSection('main');
};

document.addEventListener('DOMContentLoaded', () => {
  window.loadProjects();
});
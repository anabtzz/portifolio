// Animação de Entrada (Loader e Letras do Título)
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('intro-active');

    const titleEl = document.querySelector('.title');
    const text = titleEl.textContent;
    titleEl.innerHTML = text.split('').map((ch, i) =>
        `<span class="char" style="animation-delay:${0.9 + i * 0.045}s">${ch === ' ' ? '&nbsp;' : ch}</span>`
    ).join('');

    const loader = document.getElementById('intro-loader');
    const folderIcon = document.querySelector('.loader-folder');
    const header = document.querySelector('.header-container');
    const signature = document.querySelector('.signature-img');

    setTimeout(() => folderIcon.classList.add('folder-open'), 1300);

    setTimeout(() => {
        loader.classList.add('loader-exit');
        document.body.classList.remove('intro-active');
        header.classList.add('reveal');
        signature.classList.add('reveal');
    }, 1700);

    setTimeout(() => loader.remove(), 2400);
});

// Banco de Dados de Projetos (Adicione ou edite os links em "docUrl")
const projectsData = {
    etec: {
        title: "Projetos ETEC",
        items: [
            { 
                name: "EVENTURA", 
                description: "Plataforma desenvolvida para gestão e organização de eventos, focada em facilitar a navegação, cronogramas e cadastro de participantes.",
                specs: ["Dart", "Flutter", "Prototipagem UI/UX", "Figma", "Canva"],
                docUrl: "https://github.com/anabtzz/AppFlutter_IE" // Cole o link da doc aqui
            },
            { 
                name: "PetShop", 
                description: "Sistema web de gerenciamento para pet shops, incluindo agendamento de serviços, catálogo de produtos e cadastro de clientes e pets.",
                specs: ["Desgin", "Canva"],
                docUrl: "" // Se deixar vazio, o botão não aparece
            },
            { 
                name: "Trabalho de Conclusão de Curso ", 
                description: "Atuação como líder de design (prototipagem de site, identidade visual e marketing) e Front-End com integração direta de banco de dados. Responsável pelo design e desenvolvimento dos projetos SkyCloud e DevReads.",
                specs: ["Figma", "Desenvolvimento Front-End","UI/UX Design","JavaScript", "HTML5 / CSS3", "Design Web e App", "Identidade Visual"],
                docUrl: "https://github.com/anabtzz/AppFlutter_IE"
            }
        ]
    },
    pessoais: {
        title: "Projetos Pessoais",
        items: [
            { 
                name: "Patitas", 
                description: "Projeto de interface e branding para serviço de armazenamento em nuvem, com foco em experiência de usuário minimalista e acessível.",
                specs: ["UI/UX Design", "Figma", "Branding / Logo Design"],
                docUrl: ""
            },
            { 
                name: "Joy Co.", 
                description: "Plataforma voltada para a comunidade de desenvolvedores organizarem, avaliarem e recomendarem leituras técnicas e documentações.",
                specs: ["JavaScript", "HTML5 / CSS3", "Design de Aplicação"],
                docUrl: "https://www.behance.net/gallery/251281519/Joy-Co-Kiddos-branding-clothing"
            },
            { 
                name: "Teolaegi", 
                description: "Produção técnica completa de conteúdos em vídeo e podcast, englobando captação, escolha de equipamentos, edição de áudio/vídeo e identidade visual.",
                specs: ["Adobe Illustrator", "Web Design"],
                docUrl: "https://www.behance.net/gallery/254139055/_"
            },
            { 
                name: "Edições de Vídeo", 
                description: "Produção técnica completa de conteúdos em vídeo e podcast, englobando captação, escolha de equipamentos, edição de áudio/vídeo e identidade visual.",
                specs: ["Adobe Illustrator", "Web Design"],
                docUrl: ""
            }
        ]
    }
};

// Elementos do DOM
const mainFolders = document.getElementById('main-folders');
const subProjectsContainer = document.getElementById('sub-projects-container');
const subFoldersGrid = document.getElementById('sub-folders');
const categoryTitle = document.getElementById('category-title');
const btnBackCategories = document.getElementById('btn-back-categories');
const projectsSubtitle = document.getElementById('projects-subtitle');

// Elementos de Detalhes do Projeto
const projectDetailsContainer = document.getElementById('project-details-container');
const projectTitle = document.getElementById('project-title');
const projectInfo = document.getElementById('project-info');
const projectSpecs = document.getElementById('project-specs');
const projectActions = document.getElementById('project-actions');

// NÍVEL 1 -> NÍVEL 2: Abre a pasta de categoria
function openCategory(categoryKey) {
    const data = projectsData[categoryKey];
    
    mainFolders.style.display = 'none';
    projectsSubtitle.style.display = 'none';
    subProjectsContainer.style.display = 'block';
    subFoldersGrid.style.display = 'grid';
    projectDetailsContainer.style.display = 'none';
    btnBackCategories.style.display = 'inline-block';
    categoryTitle.style.display = 'block';
    
    categoryTitle.innerText = data.title;
    subFoldersGrid.innerHTML = '';

    data.items.forEach(item => {
        const folderDiv = document.createElement('div');
        folderDiv.className = 'folder';
        folderDiv.onclick = () => openProject(item);
        
        folderDiv.innerHTML = `
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
            </svg>
            <span>${item.name}</span>
        `;
        subFoldersGrid.appendChild(folderDiv);
    });
}

// NÍVEL 2 -> NÍVEL 3: Abre os detalhes e botão do projeto
function openProject(project) {
    subFoldersGrid.style.display = 'none';
    btnBackCategories.style.display = 'none';
    categoryTitle.style.display = 'none';
    
    projectDetailsContainer.style.display = 'block';
    
    projectTitle.innerText = project.name;
    projectInfo.innerText = project.description;
    
    projectSpecs.innerHTML = '<strong style="display:block; margin-bottom: 0.8rem;">Especificações e Tecnologias:</strong>';
    project.specs.forEach(spec => {
        projectSpecs.innerHTML += `<span class="spec-tag">${spec}</span>`;
    });

    // Renderiza o botão apenas se "docUrl" estiver preenchido
    if (project.docUrl && project.docUrl.trim() !== "") {
        projectActions.innerHTML = `
            <a href="${project.docUrl}" target="_blank" rel="noopener noreferrer" class="doc-btn">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
                Ver Documentação
            </a>
        `;
        projectActions.style.display = 'block';
    } else {
        projectActions.style.display = 'none';
    }
}

// NÍVEL 3 -> NÍVEL 2: Volta para as pastas
function closeProject() {
    projectDetailsContainer.style.display = 'none';
    subFoldersGrid.style.display = 'grid';
    btnBackCategories.style.display = 'inline-block';
    categoryTitle.style.display = 'block';
}

// NÍVEL 2 -> NÍVEL 1: Volta para categorias principais
function closeCategory() {
    subProjectsContainer.style.display = 'none';
    mainFolders.style.display = 'grid';
    projectsSubtitle.style.display = 'block';
}

// Revelação ao rolar a página
document.addEventListener('DOMContentLoaded', () => {
    const revealSelector = [
        '#experiencias h2', '#experiencias .experience-card',
        '#skills h2', '#skills .skill-box',
        '#ferramentas h2', '#ferramentas .tool-item',
        '#projetos h2', '#projetos .folder',
        '.bio-text'
    ].join(', ');

    const revealTargets = document.querySelectorAll(revealSelector);

    revealTargets.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 6) * 0.06}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => observer.observe(el));
});
const graphData = {
    nodes: [
        // категория
        { id: "core_web_dev", label: "Core Web Development", group: "category" },

        // подкатегория Languages
        { id: "languages", label: "Languages", group: "sub-category" },
        { id: "js_es6", label: "JavaScript (ES6+)", group: "element" },
        { id: "ts", label: "TypeScript", group: "element" },
        { id: "html_css", label: "HTML5/CSS3", group: "element" },

        // Frameworks & Libraries
        { id: "frameworks", label: "Frameworks & Libraries", group: "sub-category" },
        { id: "react", label: "React", group: "element" },
        { id: "preact", label: "Preact", group: "element" },
        { id: "handlebars", label: "Handlebars", group: "element" },

        // State Management
        { id: "state_mgmt", label: "State Management", group: "sub-category" },
        { id: "redux_toolkit", label: "Redux Toolkit", group: "element" },
        { id: "context_api", label: "Context API", group: "element" },
        { id: "redux_saga", label: "Redux-Saga", group: "element" },
        { id: "signals", label: "Signals", group: "element" },

        // UI & Styling
        { id: "ui_styling", label: "UI & Styling", group: "sub-category" },
        { id: "tailwind", label: "Tailwind CSS", group: "element" },
        { id: "scss", label: "SCSS/SASS", group: "element" },
        { id: "responsive_design", label: "Responsive & Adaptive Design", group: "element" },
        { id: "bootstrap", label: "Bootstrap", group: "element" },
        { id: "material_ui", label: "Material UI", group: "element" },
        { id: "ecosystem_infra", label: "Ecosystem & Infrastructure", group: "category" },

        // подкатегория API & Data Fetching
        { id: "api_fetching", label: "API & Data Fetching", group: "sub-category" },
        { id: "graphql", label: "GraphQL", group: "element" },
        { id: "postman", label: "Postman", group: "element" },
        { id: "axios", label: "Axios", group: "element" },

        // подкатегория Analytics & Optimization
        { id: "analytics", label: "Analytics & Optimization", group: "sub-category" },
        { id: "google_analytics", label: "Google Analytics", group: "element" },
        { id: "gtm", label: "Google Tag Manager", group: "element" },
        { id: "ab_testing", label: "A/B Testing", group: "element" },
        { id: "lighthouse", label: "Lighthouse", group: "element" },
        { id: "amp", label: "AMP", group: "element" },

        // подкатегория PWA & Offline Capabilities
        { id: "pwa_offline", label: "PWA & Offline Capabilities", group: "sub-category" },
        { id: "pwa", label: "Progressive Web Apps (PWA)", group: "element" },
        { id: "service_worker", label: "Service Worker", group: "element" },
        { id: "manifest", label: "Web App Manifest", group: "element" },
        { id: "indexeddb", label: "IndexedDB", group: "element" },

        // подкатегория Cloud & Infrastructure
        { id: "cloud_infra", label: "Cloud & Infrastructure", group: "sub-category" },
        { id: "aws", label: "AWS (EC2, S3)", group: "element" },
        { id: "docker", label: "Docker", group: "element" },
        // категория
        { id: "tooling_testing", label: "Tooling & Testing", group: "category" },

        // Build & Tooling
        { id: "build_tooling", label: "Build & Tooling", group: "sub-category" },
        { id: "webpack", label: "Webpack", group: "element" },
        { id: "vite", label: "Vite", group: "element" },
        { id: "postcss", label: "PostCSS", group: "element" },
        { id: "eslint", label: "ESLint", group: "element" },
        { id: "prettier", label: "Prettier", group: "element" },

        // Testing
        { id: "testing", label: "Testing", group: "sub-category" },
        { id: "jest", label: "Jest", group: "element" },
        { id: "playwright", label: "Playwright", group: "element" },
        { id: "enzyme", label: "Enzyme", group: "element" },

        // IDE & Tools
        { id: "ide_tools", label: "IDE & Tools", group: "sub-category" },
        { id: "phpstorm", label: "PhpStorm", group: "element" },
        { id: "sublime_text", label: "Sublime Text", group: "element" },
        { id: "terminal", label: "Terminal", group: "element" },

        // UI/UX & Graphics
        { id: "ui_ux_graphics", label: "UI/UX & Graphics", group: "sub-category" },
        { id: "figma", label: "Figma", group: "element" },
        { id: "photoshop", label: "Photoshop", group: "element" },
        // категория
        { id: "workflow_collaboration", label: "Workflow & Collaboration", group: "category" },

        // Version Control
        { id: "version_control", label: "Version Control", group: "sub-category" },
        { id: "git", label: "Git", group: "element" },
        { id: "github", label: "GitHub", group: "element" },
        { id: "gitlab", label: "GitLab", group: "element" },

        // Collaboration Tools
        { id: "collaboration_tools", label: "Collaboration Tools", group: "sub-category" },
        { id: "jira", label: "Jira", group: "element" },
        { id: "confluence", label: "Confluence", group: "element" },

        // Project Management
        { id: "project_management", label: "Project Management", group: "sub-category" },
        { id: "agile", label: "Agile", group: "element" },
        { id: "scrum", label: "Scrum", group: "element" },
        { id: "kanban", label: "Kanban", group: "element" },
        // Центральный узел
        { id: "web_dev", label: "My Tech Stack", group: "root" },

    ],
    links: [
        // связи Core → подкатегории
        { source: "core_web_dev", target: "languages" },
        { source: "core_web_dev", target: "frameworks" },
        { source: "core_web_dev", target: "state_mgmt" },
        { source: "core_web_dev", target: "ui_styling" },

        // Languages → элементы
        { source: "languages", target: "js_es6" },
        { source: "languages", target: "ts" },
        { source: "languages", target: "html_css" },

        // Frameworks → элементы
        { source: "frameworks", target: "react" },
        { source: "frameworks", target: "preact" },
        { source: "frameworks", target: "handlebars" },

        // State Management → элементы
        { source: "state_mgmt", target: "redux_toolkit" },
        { source: "state_mgmt", target: "context_api" },
        { source: "state_mgmt", target: "redux_saga" },
        { source: "state_mgmt", target: "signals" },

        // UI & Styling → элементы
        { source: "ui_styling", target: "tailwind" },
        { source: "ui_styling", target: "scss" },
        { source: "ui_styling", target: "responsive_design" },
        { source: "ui_styling", target: "bootstrap" },
        { source: "ui_styling", target: "material_ui" },
        { source: "ecosystem_infra", target: "api_fetching" },
        { source: "ecosystem_infra", target: "analytics" },
        { source: "ecosystem_infra", target: "pwa_offline" },
        { source: "ecosystem_infra", target: "cloud_infra" },

        // API & Data Fetching → elements
        { source: "api_fetching", target: "graphql" },
        { source: "api_fetching", target: "postman" },
        { source: "api_fetching", target: "axios" },

        // Analytics → elements
        { source: "analytics", target: "google_analytics" },
        { source: "analytics", target: "gtm" },
        { source: "analytics", target: "ab_testing" },
        { source: "analytics", target: "lighthouse" },
        { source: "analytics", target: "amp" },

        // PWA & Offline → elements
        { source: "pwa_offline", target: "pwa" },
        { source: "pwa_offline", target: "service_worker" },
        { source: "pwa_offline", target: "manifest" },
        { source: "pwa_offline", target: "indexeddb" },

        // Cloud & Infrastructure → elements
        { source: "cloud_infra", target: "aws" },
        { source: "cloud_infra", target: "docker" },
        // связи Category → Sub-categories
        { source: "tooling_testing", target: "build_tooling" },
        { source: "tooling_testing", target: "testing" },
        { source: "tooling_testing", target: "ide_tools" },
        { source: "tooling_testing", target: "ui_ux_graphics" },

        // Build & Tooling → elements
        { source: "build_tooling", target: "webpack" },
        { source: "build_tooling", target: "vite" },
        { source: "build_tooling", target: "postcss" },
        { source: "build_tooling", target: "eslint" },
        { source: "build_tooling", target: "prettier" },

        // Testing → elements
        { source: "testing", target: "jest" },
        { source: "testing", target: "playwright" },
        { source: "testing", target: "enzyme" },

        // IDE & Tools → elements
        { source: "ide_tools", target: "phpstorm" },
        { source: "ide_tools", target: "sublime_text" },
        { source: "ide_tools", target: "terminal" },

        // UI/UX & Graphics → elements
        { source: "ui_ux_graphics", target: "figma" },
        { source: "ui_ux_graphics", target: "photoshop" },
        // Category → Sub-categories
        { source: "workflow_collaboration", target: "version_control" },
        { source: "workflow_collaboration", target: "collaboration_tools" },
        { source: "workflow_collaboration", target: "project_management" },

        // Version Control → elements
        { source: "version_control", target: "git" },
        { source: "version_control", target: "github" },
        { source: "version_control", target: "gitlab" },

        // Collaboration Tools → elements
        { source: "collaboration_tools", target: "jira" },
        { source: "collaboration_tools", target: "confluence" },

        // Project Management → elements
        { source: "project_management", target: "agile" },
        { source: "project_management", target: "scrum" },
        { source: "project_management", target: "kanban" },

        { source: "web_dev", target: "core_web_dev" },
        { source: "web_dev", target: "ecosystem_infra" },
        { source: "web_dev", target: "tooling_testing" },
        { source: "web_dev", target: "workflow_collaboration" }


    ]
};

export default graphData;
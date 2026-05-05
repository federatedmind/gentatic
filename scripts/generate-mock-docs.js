const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');

// Helper to generate lorem ipsum
function generateLoremIpsum() {
  return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

\`\`\`javascript
// Example mock code block
function helloWorld() {
  console.log("Hello, world!");
}
\`\`\`

### Features
- Feature A
- Feature B
- Feature C
`;
}

// Mock structure
const mockStructure = {
  '01-getting-started': {
    title: 'Getting Started',
    files: [
      { name: '1-installation.md', title: 'Installation' },
      { name: '2-quickstart.md', title: 'Quickstart Guide' },
      { name: '3-configuration.md', title: 'Configuration' }
    ]
  },
  '02-core-concepts': {
    title: 'Core Concepts',
    files: [
      { name: '1-routing.md', title: 'Routing' },
      { name: '2-components.md', title: 'Components' },
      { name: '3-state-management.md', title: 'State Management' }
    ]
  },
  '03-advanced-guides': {
    title: 'Advanced Guides',
    files: [
      { name: '1-performance.md', title: 'Performance Optimization' },
      { name: '2-security.md', title: 'Security Best Practices' },
      { name: '3-deployment.md', title: 'Deployment' }
    ]
  },
  '04-api-reference': {
    title: 'API Reference',
    files: [
      { name: '1-cli.md', title: 'CLI Commands' },
      { name: '2-config-options.md', title: 'Config Options' }
    ]
  }
};

// Clean up existing content directory
if (fs.existsSync(CONTENT_DIR)) {
  fs.rmSync(CONTENT_DIR, { recursive: true, force: true });
}

// Recreate content directory
fs.mkdirSync(CONTENT_DIR, { recursive: true });

// Create an index file for the root
fs.writeFileSync(
  path.join(CONTENT_DIR, 'index.md'),
  `---\ntitle: Documentation Home\n---\n\n# Welcome to the Documentation\n\n${generateLoremIpsum()}`
);

// Generate folders and files
for (const [folderName, folderData] of Object.entries(mockStructure)) {
  const folderPath = path.join(CONTENT_DIR, folderName);
  fs.mkdirSync(folderPath, { recursive: true });

  // Create an index.md for the category
  fs.writeFileSync(
    path.join(folderPath, 'index.md'),
    `---\ntitle: ${folderData.title}\n---\n\n# ${folderData.title}\n\n${generateLoremIpsum()}`
  );

  // Create individual files
  for (const file of folderData.files) {
    const filePath = path.join(folderPath, file.name);
    const content = `---\ntitle: ${file.title}\n---\n\n# ${file.title}\n\n${generateLoremIpsum()}`;
    fs.writeFileSync(filePath, content);
  }
}

console.log('Successfully generated mock documentation in the /content directory.');

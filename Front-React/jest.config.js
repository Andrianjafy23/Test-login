module.exports = {
    // Permet de gérer les imports de modules ES
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  
    // Si vous avez des problèmes avec des modules comme react-router-dom, utilisez moduleNameMapper
    moduleNameMapper: {
      '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
    },
  
    // Autres configurations de Jest ici si nécessaire
    testEnvironment: 'jsdom',
  };
  
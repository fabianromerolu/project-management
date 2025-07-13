// jest.config.js
/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest", // Usa ts-jest para transformar TypeScript
  testEnvironment: "node", // Entorno para pruebas en Node.js
  transform: {
    "^.+\\.ts$": "ts-jest", // Asegura transformación de archivos .ts
  },
  testMatch: [
    "**/__tests__/**/*.test.ts", // Tests en carpeta __tests__ con sufijo .test.ts
    "**/?(*.)+(spec|test).ts",   // También soporta archivos sueltos *.spec.ts o *.test.ts
  ],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  verbose: true, // Muestra información detallada en consola
};

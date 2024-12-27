const fs = require('fs');
const path = require('path');

// Read the current version from package.json
const packageJsonPath = path.resolve(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const newVersion = packageJson.version;

// Update the version constant in the example
const versionFilePath = path.resolve(__dirname, '../examples/src/utils/getPackageVersion.ts');
const versionFileContent = `// This file is auto-generated. Do not edit manually.
const PACKAGE_VERSION = '${newVersion}';

export const getPackageVersion = (): string => {
  return PACKAGE_VERSION;
};
`;

fs.writeFileSync(versionFilePath, versionFileContent, 'utf-8');
console.log(`Updated version to ${newVersion} in examples/src/utils/getPackageVersion.ts`);

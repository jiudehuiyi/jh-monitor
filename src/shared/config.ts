/* eslint-disable @typescript-eslint/no-var-requires */
const packageJson = require('/package.json');
export const SDK_NAME = packageJson.name || 'jh-monitor';
export const SDK_VERSION = packageJson.version;

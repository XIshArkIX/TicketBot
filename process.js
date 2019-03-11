const enmap = require("enmap");
const EnmapLevel = require('enmap-level');
const settingsProvider = new EnmapLevel({ name: 'settings', dataDir: './data', });
const settings = new enmap({ provider: settingsProvider });

module.exports = { settings };

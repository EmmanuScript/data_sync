/**
 * ConfigLoader - Load and parse configuration files
 *
 * Supports JSON and YAML formats
 * Merges defaults with user config
 */

const fs = require("fs");
const path = require("path");

class ConfigLoader {
  static async load(configPath) {
    // Default configuration
    const defaults = {
      mode: "incremental",
      timeout: 30000,
      retries: 3,
      logLevel: "info",
      // TODO: Add database connection pooling settings
      // TODO: Add webhook notification settings
    };

    if (!configPath) {
      return defaults;
    }

    try {
      const fullPath = path.resolve(configPath);
      const content = fs.readFileSync(fullPath, "utf-8");

      // Only supports JSON currently
      // TODO: Add YAML support using yaml package
      const userConfig = JSON.parse(content);

      return {
        ...defaults,
        ...userConfig,
      };
    } catch (error) {
      throw new Error(`Failed to load config: ${error.message}`);
    }
  }

  /**
   * Validate config against schema
   * TODO: Implement JSON schema validation
   */
  static validate(config) {
    // Placeholder for validation logic
    return true;
  }
}

module.exports = ConfigLoader;

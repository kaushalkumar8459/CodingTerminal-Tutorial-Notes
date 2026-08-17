---
title: Configuration Management Patterns and Strategies
slug: day-110_2-configuration-management-patterns-strategies
dayLabel: Day 110_2
level: Expert
estimatedMinutes: 45
order: 110
track: java
---
# Day 110 [Expert]: Configuration Management Patterns and Strategies

## Index

- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Explanation](#explanation)
- [Topic by Topic](#topic-by-topic)
- [Key Concepts](#key-concepts)
- [Hands-on Coding](#hands-on-coding)
- [Mini Exercise](#mini-exercise)
- [Assessment Quiz](#assessment-quiz)
- [Task](#task)
- [Day 110 Outcome](#day-110-outcome)

## Goal

Design and implement flexible configuration systems that work across development, testing, and production environments without code changes.

## Prerequisites

- Day 100: Java Security Hardening OWASP and Secret Handling
- Day 109: Code Quality Static Analysis and Refactoring at Scale
- Day 50: Build Tools Maven Fundamentals
- Day 51: Build Tools Gradle Fundamentals

## Explanation

Configuration management separates code from environment-specific settings:
- Database URLs, credentials, connection pools
- Feature flags for A/B testing or gradual rollouts
- Logging levels and output destinations
- Third-party API keys and secrets
- Performance tuning parameters
- Business logic thresholds (timeouts, retry counts, rate limits)

Good configuration:
- Changes without recompilation
- Works across dev/test/staging/production
- Keeps secrets secure
- Provides sensible defaults
- Allows runtime updates where needed
- Is validated at startup

## Topic by Topic

### Topic 1: Configuration Sources and Hierarchies

Theory:
Configuration can come from multiple sources with a precedence hierarchy:

1. **Defaults**: in code or config file (lowest priority)
2. **Config files**: properties, YAML, JSON
3. **Environment variables**: set by deployment
4. **Command-line arguments**: highest priority

This hierarchy allows flexibility: development uses defaults/config files, production overrides via environment variables.

Practical:
Implement configuration with proper precedence.

```java
public class Configuration {
    // Defaults (lowest precedence)
    private static final String DEFAULT_DB_URL = "jdbc:mysql://localhost:3306/app";
    private static final String DEFAULT_DB_POOL_SIZE = "10";
    private static final String DEFAULT_LOG_LEVEL = "INFO";
    
    public static class ConfigBuilder {
        private Properties props = new Properties();
        
        public ConfigBuilder loadDefaults() {
            props.setProperty("db.url", DEFAULT_DB_URL);
            props.setProperty("db.poolSize", DEFAULT_DB_POOL_SIZE);
            props.setProperty("log.level", DEFAULT_LOG_LEVEL);
            return this;
        }
        
        public ConfigBuilder loadFromFile(String filepath) throws IOException {
            try (FileInputStream fis = new FileInputStream(filepath)) {
                Properties fileProps = new Properties();
                fileProps.load(fis);
                props.putAll(fileProps);
            }
            return this;
        }
        
        public ConfigBuilder loadFromEnvironment() {
            // Environment variables override config file
            String dbUrl = System.getenv("DB_URL");
            if (dbUrl != null) props.setProperty("db.url", dbUrl);
            
            String dbPoolSize = System.getenv("DB_POOL_SIZE");
            if (dbPoolSize != null) props.setProperty("db.poolSize", dbPoolSize);
            
            String logLevel = System.getenv("LOG_LEVEL");
            if (logLevel != null) props.setProperty("log.level", logLevel);
            
            return this;
        }
        
        public ConfigBuilder loadFromCommandLine(String[] args) {
            // Command-line arguments have highest precedence
            for (String arg : args) {
                if (arg.startsWith("--")) {
                    String[] pair = arg.substring(2).split("=");
                    if (pair.length == 2) {
                        props.setProperty(pair[0], pair[1]);
                    }
                }
            }
            return this;
        }
        
        public Config build() {
            return new Config(props);
        }
    }
}
```

### Topic 2: Environment-Specific Configuration Files

Theory:
Different environments need different configurations. Use profile-based files:
- `application.properties` (defaults)
- `application-dev.properties` (development)
- `application-test.properties` (testing)
- `application-prod.properties` (production)

Load the appropriate file based on active profile.

Practical:
Organize configuration for multiple environments.

```properties
# application.properties (defaults)
db.url=jdbc:mysql://localhost:3306/app
db.pool-size=10
log.level=INFO
api.timeout=30000
cache.ttl=3600

# application-dev.properties (development)
db.url=jdbc:mysql://localhost:3306/app_dev
db.pool-size=5
log.level=DEBUG
logging.sql=true
cache.ttl=60

# application-prod.properties (production)
db.url=jdbc:mysql://prod-db-server:3306/app
db.pool-size=50
log.level=WARN
cache.ttl=86400
api.timeout=10000
rate.limit=1000
```

```yaml
# application.yml (YAML format, more readable)
server:
  port: 8080
  servlet:
    context-path: /api

database:
  url: jdbc:mysql://localhost:3306/app
  username: ${DB_USER}
  password: ${DB_PASSWORD}
  pool-size: 10

logging:
  level:
    root: INFO
    com.mycompany: DEBUG

---
# application-prod.yml (production override)
spring:
  profiles: prod

database:
  pool-size: 50

logging:
  level:
    root: WARN
```

### Topic 3: Secrets Management and Security

Theory:
Never commit secrets (passwords, API keys) to version control.

Strategies:
- **Environment variables**: secure for production
- **Vault services**: HashiCorp Vault, AWS Secrets Manager, Google Secret Manager
- **Encrypted config files**: encrypt sensitive values
- **.env files**: local development only, add to .gitignore

Practical:
Secure secrets handling.

```java
public class SecureConfiguration {
    
    // Read secret from environment variable (never from code)
    public String getDatabasePassword() {
        String password = System.getenv("DB_PASSWORD");
        if (password == null || password.isEmpty()) {
            throw new IllegalStateException("DB_PASSWORD not set");
        }
        return password;
    }
    
    // Read secret from vault
    public String getApiKey(String keyName) {
        // Use vault client to retrieve secret
        VaultClient vault = VaultClient.getInstance();
        return vault.readSecret("secret/data/api-keys/" + keyName);
    }
    
    // Encrypted config file (uses encrypted properties)
    public void loadEncryptedConfig(String filepath, String encryptionKey) 
            throws Exception {
        Properties props = new Properties();
        try (FileInputStream fis = new FileInputStream(filepath)) {
            props.load(fis);
        }
        
        // Decrypt sensitive properties
        String encryptedPassword = props.getProperty("db.password.encrypted");
        String decrypted = decrypt(encryptedPassword, encryptionKey);
        // Use decrypted value
    }
    
    private String decrypt(String encrypted, String key) {
        // Use javax.crypto for decryption
        // Implementation depends on encryption algorithm
        return encrypted;  // Placeholder
    }
}

// .env file for local development
// DB_URL=jdbc:mysql://localhost/app
// DB_USER=appuser
// DB_PASSWORD=localpassword
// API_KEY=dev-api-key-only
// (Add .env to .gitignore)

public class DotEnvLoader {
    public static void load() throws IOException {
        Path envPath = Paths.get(".env");
        if (!Files.exists(envPath)) return;
        
        Files.lines(envPath)
            .filter(line -> !line.startsWith("#") && !line.isEmpty())
            .forEach(line -> {
                String[] parts = line.split("=", 2);
                if (parts.length == 2) {
                    System.setProperty(parts[0], parts[1]);
                }
            });
    }
}
```

### Topic 4: Feature Flags and Dynamic Configuration

Theory:
Feature flags allow enabling/disabling features without redeployment. Useful for:
- A/B testing
- Gradual feature rollout
- Killing misbehaving features
- Beta features for specific users

Dynamic configuration allows changing values at runtime without restarts.

Practical:
Implement feature flags.

```java
public class FeatureFlags {
    
    public interface FlagProvider {
        boolean isEnabled(String flagName);
        boolean isEnabledForUser(String flagName, String userId);
    }
    
    // Simple in-memory implementation
    public static class SimpleFeatureFlags implements FlagProvider {
        private Map<String, Boolean> flags = new ConcurrentHashMap<>();
        
        public SimpleFeatureFlags() {
            // Load defaults
            flags.put("new-ui-enabled", false);
            flags.put("advanced-search-enabled", false);
            flags.put("beta-payment-enabled", false);
        }
        
        @Override
        public boolean isEnabled(String flagName) {
            return flags.getOrDefault(flagName, false);
        }
        
        @Override
        public boolean isEnabledForUser(String flagName, String userId) {
            // Canary deployment: enable for specific user
            if ("new-ui-enabled".equals(flagName)) {
                return userId.equals("admin@company.com");
            }
            return isEnabled(flagName);
        }
        
        public void setFlag(String name, boolean enabled) {
            flags.put(name, enabled);
        }
    }
    
    // Usage in application
    public static class UserService {
        private FlagProvider flags;
        
        public UserService(FlagProvider flags) {
            this.flags = flags;
        }
        
        public void processUser(User user) {
            // Feature flag controls behavior
            if (flags.isEnabledForUser("new-ui-enabled", user.getId())) {
                useNewUserInterfaceLogic(user);
            } else {
                useLegacyUserInterfaceLogic(user);
            }
            
            if (flags.isEnabled("advanced-search-enabled")) {
                enableAdvancedSearchOptions(user);
            }
        }
    }
}
```

### Topic 5: Configuration Validation and Hot Reload

Theory:
Validate configuration at startup to catch errors early. Some configurations can be reloaded at runtime without restart.

Practical:
Validate and reload configuration.

```java
public class ConfigurationValidator {
    
    public static class Config {
        public String dbUrl;
        public int poolSize;
        public int apiTimeout;
        public String logLevel;
        
        public void validate() throws ConfigurationException {
            if (dbUrl == null || dbUrl.isEmpty()) {
                throw new ConfigurationException("dbUrl is required");
            }
            
            if (!dbUrl.startsWith("jdbc:")) {
                throw new ConfigurationException("Invalid database URL format");
            }
            
            if (poolSize < 1 || poolSize > 100) {
                throw new ConfigurationException("poolSize must be between 1 and 100");
            }
            
            if (apiTimeout < 1000 || apiTimeout > 120000) {
                throw new ConfigurationException("apiTimeout must be between 1s and 2min");
            }
            
            List<String> validLevels = Arrays.asList("DEBUG", "INFO", "WARN", "ERROR");
            if (!validLevels.contains(logLevel)) {
                throw new ConfigurationException("Invalid log level: " + logLevel);
            }
        }
    }
}

// Hot reload - some properties can update without restart
public class HotReloadableConfig {
    private volatile int logLevel;
    private volatile long cacheTtl;
    private volatile int rateLimit;
    
    public synchronized void reloadFromFile(String filepath) throws IOException {
        Properties props = new Properties();
        try (FileInputStream fis = new FileInputStream(filepath)) {
            props.load(fis);
        }
        
        // Update volatile fields (thread-safe)
        this.logLevel = Integer.parseInt(props.getProperty("log.level", "2"));
        this.cacheTtl = Long.parseLong(props.getProperty("cache.ttl", "3600"));
        this.rateLimit = Integer.parseInt(props.getProperty("rate.limit", "1000"));
    }
    
    public int getLogLevel() {
        return logLevel;
    }
    
    public long getCacheTtl() {
        return cacheTtl;
    }
}
```

## Key Concepts

- Configuration hierarchy (defaults, files, env vars, CLI)
- Profile-based configuration (dev, test, prod)
- Secrets management and security best practices
- Environment variables vs. config files
- Feature flags and gradual rollout
- Dynamic/hot-reloadable configuration
- Configuration validation at startup
- .env files for local development
- Vault services for secrets
- Immutable configuration objects
- Configuration documentation

## Hands-on Coding

Complete configuration framework:

```java
public class ApplicationConfig {
    private final Properties properties;
    private final String activeProfile;
    
    public ApplicationConfig(String activeProfile) throws IOException {
        this.activeProfile = activeProfile;
        this.properties = loadConfiguration();
    }
    
    private Properties loadConfiguration() throws IOException {
        Properties props = new Properties();
        
        // 1. Load defaults
        try (InputStream is = getClass().getResourceAsStream("/application.properties")) {
            if (is != null) props.load(is);
        }
        
        // 2. Load profile-specific
        String profileFile = "/application-" + activeProfile + ".properties";
        try (InputStream is = getClass().getResourceAsStream(profileFile)) {
            if (is != null) props.load(is);
        }
        
        // 3. Load from environment (overrides file)
        loadFromEnvironment(props);
        
        // 4. Validate
        validate(props);
        
        return props;
    }
    
    private void loadFromEnvironment(Properties props) {
        System.getenv().forEach((key, value) -> {
            if (key.startsWith("APP_")) {
                String propKey = key.substring(4).toLowerCase().replace("_", ".");
                props.setProperty(propKey, value);
            }
        });
    }
    
    private void validate(Properties props) throws IllegalStateException {
        // Validate required properties
        String[] required = {"db.url", "db.user", "db.password"};
        for (String key : required) {
            if (!props.containsKey(key) || props.getProperty(key).isEmpty()) {
                throw new IllegalStateException("Required config missing: " + key);
            }
        }
    }
    
    public String getString(String key, String defaultValue) {
        return properties.getProperty(key, defaultValue);
    }
    
    public int getInt(String key, int defaultValue) {
        String value = properties.getProperty(key);
        return value != null ? Integer.parseInt(value) : defaultValue;
    }
    
    public boolean getBoolean(String key, boolean defaultValue) {
        String value = properties.getProperty(key);
        return value != null ? Boolean.parseBoolean(value) : defaultValue;
    }
}
```

## Mini Exercise

1. Create a configuration system with profiles (dev, test, prod)
2. Implement feature flags for gradual feature rollout
3. Add secrets management using environment variables
4. Validate configuration at startup
5. Support hot-reload for non-sensitive properties

## Assessment Quiz

1. Why should configuration be separated from code?
2. What's the precedence order for configuration sources?
3. Where should you store database passwords?
4. What are feature flags used for?

Answers:

1. Allows changing behavior without recompilation; different values per environment
2. Defaults < Config files < Environment variables < Command-line (highest priority)
3. Never in code or version control; use environment variables or vault services
4. A/B testing, gradual rollout, killing features, beta features for specific users

## Task

1. Design configuration system for a multi-environment application
2. Implement profile-based configuration with validation
3. Add secrets management using environment variables
4. Create feature flag system for gradual feature rollout
5. Document configuration options

## Day 110 Outcome

You can design flexible configuration systems that work across development and production, securely handle secrets, implement feature flags for gradual rollouts, and validate configuration at startup.

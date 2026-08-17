---
title: Dependency Management — BOM Strategy and Reproducible Builds
slug: day-099-dependency-management-bom-strategy-and-reproducible-builds
dayLabel: Day 99
level: Expert
estimatedMinutes: 55
order: 99
track: java
---
# Day 99 [Expert]: Dependency Management — BOM Strategy and Reproducible Builds

## Goal

Design a robust dependency governance strategy using BOMs, lock files, and supply chain security practices.

## Prerequisites

- Day 98 complete

## Explanation

Dependency management at scale is risk management. Transitive dependency conflicts, security vulnerabilities in old versions, and non-reproducible builds are all dependency governance failures.

## Topic by Topic

### Topic 1: Bill of Materials (BOM) in Maven

Theory:
A POM of type `pom` that only manages versions — import with `<scope>import`; consumers get consistent versions.

Practical:
Import `spring-boot-dependencies` BOM; observe all Spring versions resolved consistently.

### Topic 2: Gradle platform and BOM enforcement

Theory:
`platform(...)` dependency in Gradle imports BOM; `enforcedPlatform(...)` forces versions even if transitive deps request higher.

Practical:
Create a custom platform module; import in app; verify Jackson version consistency.

### Topic 3: Dependency lock files

Theory:
`./gradlew dependencies --write-locks`; locks file pins exact resolved versions. CI fails on unexpected version changes.

Practical:
Generate lock files; commit to Git; simulate transitive version bump; observe CI failure.

### Topic 4: Vulnerability scanning

Theory:
`OWASP dependency-check` scans for CVEs in `NVD`. `mvn dependency-check:check` fails build above CVSS threshold.

Practical:
Run OWASP check on Day 60 project; review report; fix or suppress one finding.

### Topic 5: Supply chain hardening

Theory:

- Pin dependency hashes (Gradle verification metadata)
- Use SBOM (CycloneDX Maven plugin)
- Prefer well-maintained libraries with no CVE history

Practical:
Generate CycloneDX SBOM; inspect BOM for transitive dependency tree.

## Key Concepts

- BOM as version governance contract
- `enforcedPlatform` for hard version pinning
- Lock files for reproducibility
- CVE scanning in CI pipeline
- SBOM for software supply chain transparency

## Hands-on Coding

```xml
<!-- Importing a BOM in Maven -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.fasterxml.jackson</groupId>
            <artifactId>jackson-bom</artifactId>
            <version>2.17.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- Now add without version — BOM provides it -->
<dependencies>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
    </dependency>
</dependencies>
```

```kotlin
// Gradle platform import
dependencies {
    implementation(platform("com.fasterxml.jackson:jackson-bom:2.17.0"))
    implementation("com.fasterxml.jackson.core:jackson-databind")
}
```

```bash
# OWASP dependency check
mvn org.owasp:dependency-check-maven:check \
    -DfailBuildOnCVSS=7 \
    -Dformat=HTML

# Gradle lock files
./gradlew dependencies --write-locks
```

## Mini Exercise

Import `jackson-bom` into your multi-module project; verify all Jackson modules share the same version.

## Assessment Quiz

1. Difference between BOM import and `<dependencyManagement>` entry?
2. What does `enforcedPlatform` do that `platform` does not?
3. What is an SBOM?

Answers:

1. BOM import pulls in a whole set of managed versions; individual entry manages one artifact.
2. Downgrade transitive deps to the specified version if they request higher.
3. Software Bill of Materials — a machine-readable inventory of all dependencies in a software product.

## Task

- Add OWASP dependency check to Day 50 Maven project; fix or suppress findings; achieve zero HIGH severity.

## Day 99 Outcome

You can govern dependencies for security, consistency, and reproducibility across large multi-module projects.

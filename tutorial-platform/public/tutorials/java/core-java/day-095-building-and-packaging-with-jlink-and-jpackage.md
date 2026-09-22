---
title: Building and Packaging with jlink and jpackage
slug: day-095-building-and-packaging-with-jlink-and-jpackage
dayLabel: Day 95
level: Expert
estimatedMinutes: 55
order: 95
track: java
---
# Day 95 [Expert]: Building and Packaging with jlink and jpackage

## Goal

Use `jlink` to create minimal custom JRE images and `jpackage` to produce self-contained native installers.

## Prerequisites

- Day 94 complete
- Day 61 (JPMS modules) complete

## Explanation

`jlink` removes the JRE installation requirement from production deployments. Combined with `jpackage`, you can deliver a single executable or installer that bundles the JVM — reducing attack surface and startup complexity.

## Topic by Topic

### Topic 1: Why custom runtime images

Theory:
Full JDK is 300MB+; `jlink` builds images as small as 30MB by including only needed modules. Reduces Docker image size and attack surface.

Practical:
Find which modules your app needs with `jdeps --print-module-deps`.

### Topic 2: `jlink` usage

Theory:
`--module-path`, `--add-modules`, `--output`, `--compress`, `--strip-debug`, `--no-header-files`.

Practical:
Build minimal runtime for a `java.base + java.net.http` app.

### Topic 3: Launcher script in custom image

Theory:
`--launcher name=module/mainClass` generates a launch script in `bin/`.

Practical:
Add launcher to Day 74 HTTP client app; run without system Java.

### Topic 4: `jpackage` for native packages

Theory:
Creates OS-native installer (`.msi`, `.dmg`, `.deb`, `.rpm`) that includes the custom JRE.

Practical:
Package Day 30 student app as a `.msi` / `.deb`.

### Topic 5: Multi-platform strategy

Theory:
`jpackage` must run on target OS; use CI matrix (Windows, macOS, Linux runners) for cross-platform packaging.

Practical:
Write a CI pipeline step that produces all three platform packages from the same source.

## Key Concepts

- `jdeps` for module dependency analysis
- `jlink` module inclusion
- Runtime image structure (`bin/`, `lib/`, `conf/`)
- `jpackage` app-image vs installer
- Size reduction measurement

## Hands-on Coding

```bash
# Step 1: find required modules
jdeps --print-module-deps --ignore-missing-deps \
      -cp 'target/deps/*' target/myapp.jar

# Step 2: create runtime image
jlink \
  --module-path $JAVA_HOME/jmods \
  --add-modules java.base,java.net.http,java.logging \
  --output myapp-runtime \
  --compress=2 \
  --strip-debug \
  --no-header-files \
  --no-man-pages \
  --launcher myapp=com.example/com.example.Main

# Step 3: run via image launcher
./myapp-runtime/bin/myapp

# Step 4: package as installer
jpackage \
  --name MyApp \
  --app-version 1.0.0 \
  --input target/ \
  --main-jar myapp.jar \
  --main-class com.example.Main \
  --runtime-image myapp-runtime \
  --dest packages/

du -sh myapp-runtime/
```

## Mini Exercise

Create a `jlink` image for `java.base + java.sql`; measure image size vs full JDK.

## Assessment Quiz

1. What does `--strip-debug` remove?
2. Why must `jpackage` run on target OS?
3. `jlink` requires module-path — what does that mean for classpath apps?

Answers:

1. Debug symbols — reduces image size, removes class names from stack traces.
2. It calls native OS packaging tools (`WiX`, `pkgbuild`, `dpkg-deb`).
3. App must be modularised or use `--add-modules ALL-MODULE-PATH` workaround.

## Task

- Package Day 30 project as a self-contained runtime image; verify it runs without system Java installed.

## Day 95 Outcome

You can build minimal Java runtime images and native installers for production deployment.

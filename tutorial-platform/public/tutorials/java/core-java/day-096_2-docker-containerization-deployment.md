---
title: Docker Containerization and Deployment
slug: day-096_2-docker-containerization-deployment
dayLabel: Day 96_2
level: Expert
estimatedMinutes: 55
order: 96
track: java
---
# Day 96 [Expert]: Docker Containerization and Deployment

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
- [Day 96 Outcome](#day-96-outcome)

## Goal

Learn to containerize Java applications with Docker for consistent deployment across development, testing, and production environments.

## Prerequisites

- Day 95: Building and Packaging with jlink and jpackage
- Day 50: Build Tools Maven Fundamentals
- Day 51: Build Tools Gradle Fundamentals

## Explanation

Docker is a containerization platform that packages applications with all dependencies into a container image. Containers are:
- **Lightweight**: smaller than VMs
- **Portable**: run identically on any machine with Docker
- **Isolated**: separate filesystem, processes, network
- **Reproducible**: same code = same behavior across environments

Key concepts:
- **Image**: blueprint for containers (like a class)
- **Container**: running instance of an image (like an object)
- **Dockerfile**: script to build images
- **Registry**: storage for images (Docker Hub, ECR, private registries)

For Java apps, Docker eliminates "works on my machine" problems and simplifies deployment.

## Topic by Topic

### Topic 1: Dockerfile Basics

Theory:
A Dockerfile contains instructions to build an image. Each instruction creates a layer.

Key instructions:
- `FROM`: base image
- `WORKDIR`: working directory in container
- `COPY`: copy files from host to container
- `RUN`: execute commands during build
- `ENV`: set environment variables
- `EXPOSE`: declare listening ports
- `ENTRYPOINT`: command to run when container starts

Practical:
Create a simple Dockerfile for a Java app.

```dockerfile
# Use official Java base image
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy JAR file
COPY target/myapp-1.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Set environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Run application
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Topic 2: Multi-Stage Builds for Optimization

Theory:
Multi-stage builds reduce final image size by separating build and runtime stages. Build stage compiles code; runtime stage only includes compiled artifacts.

This significantly reduces image size (100+ MB → 20+ MB) and improves security.

Practical:
Optimize image size with multi-stage builds.

```dockerfile
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Runtime (only includes JRE and compiled app)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /build/target/myapp-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Topic 3: Building and Running Containers

Theory:
Build images with `docker build` and run them with `docker run`.

Key flags:
- `-t name:tag`: tag the image
- `-f Dockerfile`: specify Dockerfile path
- `--build-arg KEY=value`: pass build arguments
- `-p host_port:container_port`: port mapping
- `-e KEY=value`: environment variables
- `-v host_path:container_path`: volume mounts

Practical:
Build and run a Java application in Docker.

```bash
# Build image
docker build -t myapp:1.0.0 -f Dockerfile .

# Run container
docker run -d \
  -p 8080:8080 \
  -e JAVA_OPTS="-Xmx1024m" \
  --name myapp-prod \
  myapp:1.0.0

# View logs
docker logs -f myapp-prod

# Execute command in running container
docker exec myapp-prod jcmd 1 Thread.print

# Stop and remove container
docker stop myapp-prod
docker rm myapp-prod
```

### Topic 4: Docker Compose for Multi-Container Applications

Theory:
Real applications need multiple services: app, database, cache, message queue.

Docker Compose orchestrates multiple containers using a single YAML file. Define services, networks, volumes once, then start everything with one command.

Practical:
Define a complete application stack.

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_NAME: myapp
      REDIS_HOST: redis
      REDIS_PORT: 6379
    depends_on:
      - postgres
      - redis
    networks:
      - app-network

  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:7-alpine
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

Start everything:
```bash
docker-compose up -d
docker-compose ps
docker-compose logs -f app
docker-compose down  # Stop and remove
```

### Topic 5: Security, Health Checks, and Best Practices

Theory:
Secure containers by:
- Using minimal base images (alpine, distroless)
- Running as non-root user
- Adding health checks
- Scanning images for vulnerabilities
- Not storing secrets in images

Practical:
Secure and robust Dockerfile.

```dockerfile
FROM eclipse-temurin:21-jre-alpine

# Create non-root user
RUN addgroup -g 1001 appuser && \
    adduser -D -u 1001 -G appuser appuser

WORKDIR /app

# Copy and change ownership
COPY --chown=appuser:appuser target/app.jar .

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD java -jar app.jar --health-check || exit 1

USER appuser
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

## Key Concepts

- Dockerfile instructions and layers
- Image vs. Container
- Multi-stage builds for optimization
- docker build, run, exec, logs commands
- Port mapping and volume mounts
- Docker Compose for multi-container apps
- Container networks
- Health checks and restart policies
- Security best practices
- Image scanning and vulnerabilities
- Image registries and push/pull

## Hands-on Coding

Complete Docker setup for a Spring Boot-like app:

```dockerfile
# Multi-stage optimized Dockerfile
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /build
COPY pom.xml .
# Cache dependencies layer
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage - minimal and secure
FROM eclipse-temurin:21-jre-alpine

RUN apk add --no-cache dumb-init && \
    addgroup -g 1001 appuser && \
    adduser -D -u 1001 -G appuser appuser

WORKDIR /app
COPY --from=builder --chown=appuser:appuser /build/target/app.jar .

USER appuser
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

ENTRYPOINT ["dumb-init", "java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
```

## Mini Exercise

1. Create a Dockerfile for a Java application with Maven build
2. Add a multi-stage build to optimize image size
3. Create a docker-compose.yml with app + PostgreSQL + Redis
4. Test that all services communicate correctly

## Assessment Quiz

1. What is the advantage of multi-stage Docker builds?
2. How do you expose a port from a container?
3. What's the purpose of Docker Compose?
4. What user should a Java application run as in production?

Answers:

1. Reduces final image size by separating build and runtime stages
2. Use EXPOSE instruction in Dockerfile and -p flag in docker run
3. Orchestrate multiple containers (app, database, cache) as a single stack
4. Non-root user (never root) for security

## Task

1. Containerize a multi-module Maven/Gradle project
2. Create Docker Compose setup for a Java app with PostgreSQL and Redis
3. Implement health checks and logging
4. Scan image for vulnerabilities using trivy or similar tool

## Day 96 Outcome

You can containerize Java applications with optimized Dockerfiles, compose multi-container stacks, and deploy consistently across environments. You understand security best practices and image optimization.

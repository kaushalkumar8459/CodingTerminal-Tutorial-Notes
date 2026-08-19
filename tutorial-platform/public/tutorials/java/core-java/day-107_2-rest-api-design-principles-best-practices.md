---
title: REST API Design Principles and Best Practices
slug: day-107_2-rest-api-design-principles-best-practices
dayLabel: Day 107_2
level: Expert
estimatedMinutes: 50
order: 107
track: java
---
# Day 107 [Expert]: REST API Design Principles and Best Practices

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
- [Day 107 Outcome](#day-107-outcome)

## Goal

Design robust, maintainable REST APIs that scale and provide excellent developer experience for API consumers.

## Prerequisites

- Day 106: API Design Principles for Java Libraries and SDKs
- Day 74: HTTP Client API and Resilient Client Patterns
- Day 100: Java Security Hardening OWASP and Secret Handling

## Explanation

REST (Representational State Transfer) APIs are the backbone of modern systems. Good API design determines:
- Ease of use
- Scalability
- Backward compatibility
- Security and reliability
- Developer adoption

REST principles are stateless, use HTTP methods correctly, and treat resources as the primary concept.

A well-designed API requires thinking about:
1. **Resource modeling**: what are the entities?
2. **HTTP methods**: GET, POST, PUT, PATCH, DELETE semantics
3. **Status codes**: communicate success/failure clearly
4. **Versioning**: maintain backward compatibility
5. **Error handling**: consistent error responses
6. **Security**: authentication, authorization, rate limiting
7. **Documentation**: OpenAPI/Swagger for clarity

## Topic by Topic

### Topic 1: Resource-Oriented Design and HTTP Methods

Theory:
REST is resource-oriented. Resources are nouns (users, orders, products), not verbs.

HTTP methods have specific semantics:
- `GET`: retrieve resource (safe, idempotent)
- `POST`: create resource (non-idempotent)
- `PUT`: replace entire resource (idempotent)
- `PATCH`: partial update (not always idempotent)
- `DELETE`: remove resource (idempotent)

Practical:
Design endpoints correctly.

```java
// GOOD: Resource-oriented
GET    /api/v1/users          // List users
GET    /api/v1/users/{id}     // Get user
POST   /api/v1/users          // Create user
PUT    /api/v1/users/{id}     // Replace user
PATCH  /api/v1/users/{id}     // Partial update
DELETE /api/v1/users/{id}     // Delete user

// BAD: Action-oriented
GET    /api/getUsers
GET    /api/getUserById?id=123
POST   /api/createUser
POST   /api/updateUser
POST   /api/deleteUser?id=123
```

Implement with proper Java controller:

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    
    @GetMapping
    public ResponseEntity<Page<UserDTO>> listUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(userService.listUsers(page, size));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody UserCreateRequest req) {
        UserDTO created = userService.createUser(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> replaceUser(
        @PathVariable Long id, @RequestBody UserUpdateRequest req) {
        UserDTO updated = userService.replaceUser(id, req);
        return ResponseEntity.ok(updated);
    }
    
    @PatchMapping("/{id}")
    public ResponseEntity<UserDTO> partialUpdate(
        @PathVariable Long id, @RequestBody Map<String, Object> updates) {
        UserDTO updated = userService.partialUpdate(id, updates);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
```

### Topic 2: HTTP Status Codes and Error Responses

Theory:
Status codes communicate operation success/failure. Use correct codes:

- `2xx`: Success (200 OK, 201 Created, 204 No Content)
- `3xx`: Redirection (301 Moved Permanently)
- `4xx`: Client error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
- `5xx`: Server error (500 Internal Server Error, 503 Service Unavailable)

Error responses should be consistent:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Invalid email format",
  "status": 400,
  "timestamp": "2024-01-15T10:30:00Z",
  "details": {
    "field": "email",
    "value": "invalid-email"
  }
}
```

Practical:
Implement consistent error handling.

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(
        UserNotFoundException e, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
            "USER_NOT_FOUND",
            e.getMessage(),
            HttpStatus.NOT_FOUND.value(),
            request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationError(
        MethodArgumentNotValidException e, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors()
            .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
        
        ErrorResponse response = new ErrorResponse(
            "VALIDATION_ERROR",
            "Validation failed",
            HttpStatus.BAD_REQUEST.value(),
            request.getRequestURI()
        );
        response.setDetails(errors);
        return ResponseEntity.badRequest().body(response);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericError(
        Exception e, HttpServletRequest request) {
        ErrorResponse error = new ErrorResponse(
            "INTERNAL_SERVER_ERROR",
            "An unexpected error occurred",
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            request.getRequestURI()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
```

### Topic 3: Versioning and Backward Compatibility

Theory:
APIs evolve. Versioning ensures existing clients don't break when you change endpoints.

Strategies:
- **URL path**: `/api/v1/users`, `/api/v2/users` (cleanest)
- **Query parameter**: `/api/users?version=1`
- **Header**: `Accept: application/vnd.company.v1+json`

Keep old versions alive long enough for clients to migrate (typically 1-2 years).

Practical:
Implement versioning.

```java
// Version 1: basic endpoint
@RestController
@RequestMapping("/api/v1/users")
public class UserControllerV1 {
    @GetMapping("/{id}")
    public ResponseEntity<UserDTOV1> getUser(@PathVariable Long id) {
        // V1 returns minimal fields
        return ResponseEntity.ok(userService.getUserV1(id));
    }
}

// Version 2: enhanced with more fields, deprecate V1
@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {
    @GetMapping("/{id}")
    public ResponseEntity<UserDTOV2> getUser(@PathVariable Long id) {
        // V2 returns additional fields, better structure
        return ResponseEntity.ok(userService.getUserV2(id));
    }
}

// Support both versions, with migration path
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping(path = "/{id}", headers = "X-API-Version=1")
    public ResponseEntity<UserDTOV1> getUserV1(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserV1(id))
            .header("Deprecated", "true")
            .header("Sunset", "Sun, 31 Dec 2025 23:59:59 GMT");
    }
    
    @GetMapping(path = "/{id}", headers = "X-API-Version=2")
    public ResponseEntity<UserDTOV2> getUserV2(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserV2(id));
    }
}
```

### Topic 4: Pagination, Filtering, and Sorting

Theory:
APIs with large datasets need pagination to avoid transferring millions of records.

Standard pagination:
```
GET /api/v1/users?page=0&size=20&sort=name,asc&filter=status:active
```

Filtering and sorting make APIs more flexible.

Practical:
Implement efficient pagination.

```java
@GetMapping
public ResponseEntity<Page<UserDTO>> listUsers(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "id,desc") String sort,
    @RequestParam(required = false) String search,
    @RequestParam(required = false) String status) {
    
    // Parse sort parameter
    String[] sortParts = sort.split(",");
    Sort.Direction direction = sortParts.length > 1 && sortParts[1].equalsIgnoreCase("asc") 
        ? Sort.Direction.ASC : Sort.Direction.DESC;
    Sort sortOrder = Sort.by(direction, sortParts[0]);
    
    // Create pageable
    Pageable pageable = PageRequest.of(page, size, sortOrder);
    
    // Validate page size
    if (size > 100) size = 100;  // Prevent abuse
    
    // Fetch and return
    Page<UserDTO> result = userService.search(search, status, pageable);
    return ResponseEntity.ok(result);
}
```

### Topic 5: OpenAPI Documentation and Security

Theory:
Document your API with OpenAPI/Swagger so consumers know how to use it.

Security considerations:
- Require authentication (API key, OAuth2, JWT)
- Implement rate limiting per client
- Validate input strictly
- Use HTTPS only
- Return minimal error information in production

Practical:
Document and secure your API.

```java
@Configuration
@EnableOpenApi
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("User API")
                .version("2.0.0")
                .description("User management API")
                .contact(new Contact()
                    .name("API Support")
                    .url("https://api.example.com/support")))
            .addServersItem(new Server()
                .url("https://api.example.com")
                .description("Production"));
    }
}

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    
    @Operation(summary = "Get user by ID", 
               description = "Returns user details for the given ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "User found"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        // Implementation
    }
}

// Security with rate limiting
@Component
public class RateLimitingFilter implements OncePerRequestFilter {
    private final RateLimiter limiter = RateLimiter.create(100.0);  // 100 req/sec
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                   HttpServletResponse response, 
                                   FilterChain chain) throws ServletException, IOException {
        if (!limiter.tryAcquire()) {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write("{\"error\": \"Rate limit exceeded\"}");
            return;
        }
        chain.doFilter(request, response);
    }
}
```

## Key Concepts

- Resource-oriented vs action-oriented design
- HTTP methods semantics (GET, POST, PUT, PATCH, DELETE)
- Status codes and consistent error responses
- API versioning strategies
- Pagination, filtering, sorting
- OpenAPI/Swagger documentation
- Authentication and authorization
- Rate limiting and throttling
- Input validation
- HTTPS/TLS enforcement
- Backward compatibility planning

## Hands-on Coding

Complete REST API with best practices:

```java
@RestController
@RequestMapping("/api/v2/users")
@Validated
public class UserController {
    
    @GetMapping
    public ResponseEntity<Page<UserDTO>> listUsers(
        Pageable pageable,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String status) {
        
        Page<UserDTO> users = userService.search(search, status, pageable);
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable @Positive Long id) {
        return userService.getUserById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<UserDTO> createUser(
        @Valid @RequestBody UserCreateRequest request) {
        UserDTO created = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(
        @PathVariable @Positive Long id,
        @Valid @RequestBody UserUpdateRequest request) {
        UserDTO updated = userService.updateUser(id, request);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable @Positive Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
```

## Mini Exercise

Design a complete REST API for a Blog system:
- List posts (paginated, filterable by author, status)
- Get post by ID
- Create post (requires authentication)
- Update post (only by author)
- Delete post (only by author)
- Add comments to posts
- Define error responses

## Assessment Quiz

1. What HTTP method should you use to partially update a resource?
2. Why is API versioning important?
3. What should a consistent error response include?
4. How do you prevent API abuse?

Answers:

1. PATCH for partial updates
2. To maintain backward compatibility when API changes
3. Error code, message, status, timestamp, details
4. Rate limiting, input validation, authentication, authorization

## Task

1. Design REST API for an e-commerce system with proper versioning
2. Implement pagination, filtering, sorting
3. Add OpenAPI documentation
4. Implement rate limiting and error handling
5. Add authentication and authorization

## Day 107 Outcome

You can design professional REST APIs with correct HTTP semantics, versioning, error handling, and documentation. You understand API security, scalability patterns, and developer experience best practices.

---
title: Mocking with Mockito Basics
slug: day-054-mocking-with-mockito-basics
dayLabel: Day 54
level: Intermediate
estimatedMinutes: 50
order: 54
track: java
---
# Day 54 [Intermediate]: Mocking with Mockito Basics

## Goal

Isolate units under test by replacing their dependencies with mocks using Mockito.

## Prerequisites

- Day 53 complete

## Explanation

Real dependencies (databases, HTTP clients) make tests slow and fragile. Mocks replace them with controlled stand-ins so you test only the logic you care about.

## Topic by Topic

### Topic 1: What is a mock

Theory:
A fake object that records interactions and returns configured responses.

Practical:
Mock `UserRepository` to avoid real DB in `UserService` tests.

### Topic 2: `@Mock` and `@InjectMocks`

Theory:
`@Mock` creates the fake; `@InjectMocks` creates the class under test and injects mocks automatically.

Practical:
Annotate and call `MockitoAnnotations.openMocks(this)`.

### Topic 3: Stubbing with `when...thenReturn`

Theory:
Configure what the mock returns for specific arguments.

Practical:
Stub `findById` to return a user or throw an exception.

### Topic 4: Verifying interactions

Theory:
`verify(mock).method(args)` asserts a method was called with expected arguments.

Practical:
Verify `save` was called exactly once after registration.

### Topic 5: Argument matchers

Theory:
`any()`, `anyString()`, `eq(value)`, `argThat(predicate)`.

Practical:
Stub with `anyInt()` and verify with `eq("specific")`.

## Key Concepts

- Mock vs stub vs spy
- Injection via annotation
- Stubbing return values and exceptions
- Interaction verification
- Argument matchers

## Hands-on Coding

```java
import org.junit.jupiter.api.*;
import org.mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

interface UserRepository {
    User findById(int id);
    void save(User user);
}

record User(int id, String name) {}

class UserService {
    private final UserRepository repo;
    UserService(UserRepository repo) { this.repo = repo; }

    String getUsername(int id) {
        User u = repo.findById(id);
        return u != null ? u.name() : "Unknown";
    }

    void register(User u) { repo.save(u); }
}

class UserServiceTest {
    @Mock UserRepository mockRepo;
    @InjectMocks UserService service;

    @BeforeEach
    void init() { MockitoAnnotations.openMocks(this); }

    @Test
    void returnsUsernameWhenFound() {
        when(mockRepo.findById(1)).thenReturn(new User(1, "Asha"));
        assertEquals("Asha", service.getUsername(1));
    }

    @Test
    void returnsUnknownWhenNotFound() {
        when(mockRepo.findById(99)).thenReturn(null);
        assertEquals("Unknown", service.getUsername(99));
    }

    @Test
    void savesUserOnRegister() {
        User u = new User(2, "Bob");
        service.register(u);
        verify(mockRepo, times(1)).save(u);
    }
}
```

## Mini Exercise

Test `OrderService.placeOrder` — mock `InventoryRepository` and `PaymentGateway`; verify both called.

## Assessment Quiz

1. Difference between mock and spy?
2. What happens if stubbed method is never called?
3. When use `doThrow` instead of `thenThrow`?

Answers:

1. Mock is fully fake; spy wraps real object and delegates unstubbed calls.
2. Nothing — unused stubs don't fail unless you use `verifyNoMoreInteractions`.
3. For void methods that can't use `when(...).thenThrow`.

## Task

- Write Mockito tests for `ProductService` that depends on `ProductRepository`.

## Day 54 Outcome

You can isolate and test any class by mocking its dependencies with Mockito.

---
title: Regular Expressions and Pattern Matching
slug: day-016_2-regular-expressions-pattern-matching
dayLabel: Day 16_2
level: Beginner
estimatedMinutes: 45
order: 16
track: java
---
# Day 16 [Beginner]: Regular Expressions and Pattern Matching

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
- [Day 16 Outcome](#day-16-outcome)

## Goal

Learn to use regular expressions in Java to match, search, validate, and manipulate text patterns in strings.

## Prerequisites

- Day 14: Strings Fundamentals and Immutability
- Day 15: StringBuilder StringBuffer and Common String Problems

## Explanation

A regular expression (regex or regexp) is a pattern used to match and find text within strings.

Java provides the `java.util.regex` package with two main classes:
- `Pattern`: represents a compiled regex pattern
- `Matcher`: performs match operations using a compiled pattern

Regular expressions are extremely useful for:
- Validating email addresses, phone numbers, or postal codes
- Finding specific text in large documents
- Replacing text based on patterns
- Splitting strings intelligently

For example, the pattern `\d+` matches one or more digits. The pattern `[a-z]+` matches one or more lowercase letters.

## Topic by Topic

### Topic 1: Basic Pattern Matching with Matcher

Theory:
The `Pattern` class compiles a regex string. The `Matcher` class uses that pattern to search text.

Pattern is immutable and can be reused for multiple matches. Matcher is stateful and used for individual match operations.

Practical:
Create a pattern, compile it, and use a matcher to find all occurrences.

```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexBasics {
    public static void main(String[] args) {
        String text = "Call me at 555-123-4567 or 555-987-6543";
        String phonePattern = "\\d{3}-\\d{3}-\\d{4}";
        
        Pattern pattern = Pattern.compile(phonePattern);
        Matcher matcher = pattern.matcher(text);
        
        while (matcher.find()) {
            System.out.println("Found: " + matcher.group());
        }
    }
}
```

Output:
```
Found: 555-123-4567
Found: 555-987-6543
```

### Topic 2: Common Regex Metacharacters

Theory:
Metacharacters are special symbols that represent patterns, not literal characters.

Common ones:
- `.` matches any character except newline
- `*` matches zero or more of the preceding element
- `+` matches one or more of the preceding element
- `?` matches zero or one of the preceding element
- `^` matches start of string
- `$` matches end of string
- `[abc]` matches any of a, b, or c
- `[^abc]` matches any character except a, b, or c
- `\d` matches any digit
- `\w` matches word character (letter, digit, underscore)
- `\s` matches whitespace

Practical:
Test different patterns to understand their behavior.

```java
public class RegexPatterns {
    public static void main(String[] args) {
        // Validate email-like pattern
        String email = "user@example.com";
        String emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        System.out.println(email + " matches: " + email.matches(emailPattern));
        
        // Find all words
        String text = "Hello World 2024";
        Pattern wordPattern = Pattern.compile("\\w+");
        Matcher matcher = wordPattern.matcher(text);
        System.out.println("Words found:");
        while (matcher.find()) {
            System.out.println("  " + matcher.group());
        }
    }
}
```

### Topic 3: String Validation with Regex

Theory:
The `matches()` method checks if an entire string matches a pattern. This is useful for validation.

Practical:
Validate common formats like emails, phone numbers, ZIP codes, or credit card numbers.

```java
public class Validation {
    public static void main(String[] args) {
        // ZIP code: 5 digits
        String zipPattern = "^\\d{5}$";
        System.out.println("12345 is valid ZIP: " + "12345".matches(zipPattern));
        System.out.println("1234 is valid ZIP: " + "1234".matches(zipPattern));
        
        // Simple password: at least 8 chars, 1 uppercase, 1 digit
        String passwordPattern = "^(?=.*[A-Z])(?=.*\\d).{8,}$";
        System.out.println("Pass123 is valid: " + "Pass123".matches(passwordPattern));
        System.out.println("pass123 is valid: " + "pass123".matches(passwordPattern));
    }
}
```

### Topic 4: Finding and Replacing with Regex

Theory:
The `replaceAll()` and `replaceFirst()` methods use regex patterns to replace text.

Use `Matcher.replaceAll()` or `String.replaceAll()` for replacement.

Practical:
Replace patterns in text using regex.

```java
public class RegexReplacement {
    public static void main(String[] args) {
        String text = "I have 2 apples, 5 oranges and 10 bananas";
        
        // Replace all numbers with [NUM]
        String result = text.replaceAll("\\d+", "[NUM]");
        System.out.println(result);
        // Output: I have [NUM] apples, [NUM] oranges and [NUM] bananas
        
        // Remove extra whitespace
        String messy = "Hello    World   Java";
        String clean = messy.replaceAll(" +", " ");
        System.out.println(clean);
        // Output: Hello World Java
    }
}
```

### Topic 5: String Splitting with Regex

Theory:
The `split()` method uses regex to split strings. By default, `split(" ")` only splits on single spaces, but with regex you can split on patterns.

Practical:
Split strings intelligently using regex patterns.

```java
public class RegexSplit {
    public static void main(String[] args) {
        // Split on one or more spaces
        String text = "apple    banana   cherry  date";
        String[] parts = text.split("\\s+");
        System.out.println("Parts:");
        for (String part : parts) {
            System.out.println("  " + part);
        }
        
        // Split on commas and spaces
        String csv = "apple, banana , cherry , date";
        String[] items = csv.split("\\s*,\\s*");
        System.out.println("CSV items:");
        for (String item : items) {
            System.out.println("  " + item);
        }
    }
}
```

## Key Concepts

- Pattern and Matcher classes
- Metacharacters and escape sequences
- Character classes and quantifiers
- Anchors (^ and $)
- Group capturing
- String validation
- Pattern reuse and performance
- Greedy vs. non-greedy matching
- Common use cases: email, phone, ZIP code validation

## Hands-on Coding

Complete regex validation utility:

```java
import java.util.regex.Pattern;

public class RegexValidator {
    
    private static final Pattern EMAIL = Pattern.compile(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    
    private static final Pattern PHONE = Pattern.compile(
        "^\\d{3}-\\d{3}-\\d{4}$"
    );
    
    private static final Pattern ZIP = Pattern.compile(
        "^\\d{5}(-\\d{4})?$"
    );
    
    public static boolean isValidEmail(String email) {
        return EMAIL.matcher(email).matches();
    }
    
    public static boolean isValidPhone(String phone) {
        return PHONE.matcher(phone).matches();
    }
    
    public static boolean isValidZip(String zip) {
        return ZIP.matcher(zip).matches();
    }
    
    public static void main(String[] args) {
        System.out.println("Email valid: " + isValidEmail("user@example.com"));
        System.out.println("Phone valid: " + isValidPhone("555-123-4567"));
        System.out.println("ZIP valid: " + isValidZip("12345-6789"));
    }
}
```

## Mini Exercise

Create a regex pattern that matches:
- Usernames: 3-20 characters, letters and numbers only, start with letter
- Test it on: "john_doe" (invalid), "john123" (valid), "1john" (invalid), "ab" (invalid)

```java
public class UsernameValidator {
    public static void main(String[] args) {
        String pattern = "^[a-zA-Z][a-zA-Z0-9]{2,19}$";
        
        String[] testCases = {"john_doe", "john123", "1john", "ab", "validUser123"};
        for (String test : testCases) {
            System.out.println(test + ": " + test.matches(pattern));
        }
    }
}
```

## Assessment Quiz

1. What is the difference between `.` and `.*` in regex?
2. How do you validate an entire string versus just finding a pattern within it?
3. What does `\d+` match?
4. How would you replace all consecutive spaces with a single space?

Answers:

1. `.` matches exactly one character, `.*` matches zero or more of any character
2. Use `.matches()` for entire string, `.find()` for pattern within string
3. One or more digits
4. `text.replaceAll(" +", " ")`

## Task

1. Create a regex validator that checks if a string is a valid Java identifier (starts with letter or underscore, contains letters, digits, underscore)
2. Write a program that extracts all URLs from text using regex pattern `https?://[^\s]+`
3. Create a CSV parser that splits rows correctly, handling quoted fields

## Day 16 Outcome

You can use regex patterns to validate, search, find, and replace text in strings. You understand Pattern and Matcher classes and common metacharacters for practical text processing.

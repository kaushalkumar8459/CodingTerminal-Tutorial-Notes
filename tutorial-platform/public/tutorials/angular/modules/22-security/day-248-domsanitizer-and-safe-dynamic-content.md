# Day 248 — DomSanitizer and Safe Dynamic Content

## Goal

Use DomSanitizer correctly and understand why bypass APIs are security-sensitive.

## Concept

DomSanitizer can sanitize values for appropriate contexts. Angular also provides bypassSecurityTrust... APIs, but these explicitly tell Angular to trust a value and can introduce XSS if attacker-controlled data reaches them. citeturn0search1

## Rule

Do not use bypassSecurityTrustHtml or related APIs simply to “make an error go away.”

First ask:

- Can the feature use normal template binding?
- Can the input be constrained to an allowlist?
- Can the content be generated safely?
- Can direct DOM manipulation be removed?

## Example

For a YouTube embed, construct the URL from a validated video identifier rather than trusting an arbitrary user-supplied resource URL.

## Exercise

Build a safe video preview component and document exactly where the trusted value is created and why its source is constrained.

## Common Mistakes

- Passing raw user input to a bypass API.
- Calling bypass APIs throughout templates.
- Using sanitizer as a general-purpose HTML parser.
- Trusting a value without documenting its source.

## Interview Questions

1. What does DomSanitizer do?
2. Why are bypassSecurityTrust methods dangerous?
3. When might a trusted Resource URL be legitimate?
4. Why should trust decisions happen close to the source?

## Outcome

You can distinguish sanitization from explicitly trusting a value.

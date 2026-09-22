---
title: Secure Coding with Java Cryptography Architecture Basics
slug: day-075-secure-coding-with-java-cryptography-architecture-basics
dayLabel: Day 75
level: Advanced
estimatedMinutes: 55
order: 75
track: java
---
# Day 75 [Advanced]: Secure Coding with Java Cryptography Architecture Basics

## Goal

Use Java Cryptography Architecture (JCA) to hash, encrypt, and sign data securely in plain Java.

## Prerequisites

- Day 74 complete

## Explanation

JCA provides provider-based, algorithm-agnostic APIs for cryptographic operations. Knowing the API prevents rolling custom crypto (a common vulnerability) and helps you integrate with security standards.

## Topic by Topic

### Topic 1: Hashing with `MessageDigest`

Theory:
One-way hash; SHA-256, SHA-512 for data integrity. Never use MD5 or SHA-1 for security.

Practical:
Hash a password + salt; format as hex string.

### Topic 2: Password hashing best practices

Theory:
Use `PBKDF2WithHmacSHA256` or `bcrypt` (via library) — not plain SHA. Adds iteration count.

Practical:
Hash and verify a password using `SecretKeyFactory` + `PBEKeySpec`.

### Topic 3: Symmetric encryption with AES

Theory:
`Cipher` with `AES/GCM/NoPadding` — authenticated encryption; generates random IV per operation.

Practical:
Encrypt and decrypt a string with AES-GCM.

### Topic 4: Key generation

Theory:
`KeyGenerator` for symmetric; `KeyPairGenerator` for asymmetric (RSA, EC).

Practical:
Generate AES-256 key; generate RSA-2048 key pair.

### Topic 5: Digital signatures

Theory:
Sign with private key; verify with public key. Use `Signature` class.

Practical:
Sign a message and verify using RSA.

## Key Concepts

- `MessageDigest` for integrity
- `PBKDF2` for password hashing
- AES-GCM for authenticated symmetric encryption
- Random IV per encryption
- Digital signatures with asymmetric keys

## Hands-on Coding

```java
import javax.crypto.*;
import javax.crypto.spec.*;
import java.security.*;
import java.util.Base64;

public class CryptoDemo {
    // AES-GCM encrypt
    static byte[] encrypt(byte[] data, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        byte[] iv = new byte[12];
        new SecureRandom().nextBytes(iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, new GCMParameterSpec(128, iv));
        byte[] encrypted = cipher.doFinal(data);
        // prepend IV to ciphertext
        byte[] result = new byte[iv.length + encrypted.length];
        System.arraycopy(iv, 0, result, 0, iv.length);
        System.arraycopy(encrypted, 0, result, iv.length, encrypted.length);
        return result;
    }

    public static void main(String[] args) throws Exception {
        KeyGenerator kg = KeyGenerator.getInstance("AES");
        kg.init(256);
        SecretKey key = kg.generateKey();

        byte[] plaintext = "Sensitive data".getBytes();
        byte[] ciphertext = encrypt(plaintext, key);
        System.out.println("Encrypted (b64): " +
            Base64.getEncoder().encodeToString(ciphertext));
    }
}
```

## Mini Exercise

Implement `hashPassword(String password, byte[] salt)` using `PBKDF2WithHmacSHA256` with 310,000 iterations.

## Assessment Quiz

1. Why use `SecureRandom` for IV generation?
2. What is authenticated encryption?
3. Why not use AES-ECB mode?

Answers:

1. `Math.random()` is predictable; `SecureRandom` is cryptographically strong.
2. Encryption that also authenticates (prevents tampering) — GCM provides both.
3. ECB encrypts identical blocks identically — reveals patterns in plaintext.

## Task

- Build a `VaultService` that encrypts/decrypts string values using AES-GCM with a stored key.

## Day 75 Outcome

You can perform common cryptographic operations correctly using Java's standard JCA API.

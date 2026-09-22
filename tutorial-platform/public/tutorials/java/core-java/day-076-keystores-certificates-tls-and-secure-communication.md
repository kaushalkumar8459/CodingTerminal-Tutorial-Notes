---
title: Keystores, Certificates, TLS and Secure Communication
slug: day-076-keystores-certificates-tls-and-secure-communication
dayLabel: Day 76
level: Advanced
estimatedMinutes: 55
order: 76
track: java
---
# Day 76 [Advanced]: Keystores, Certificates, TLS and Secure Communication

## Goal

Configure TLS for Java applications, manage keystores and truststores, and establish secure connections.

## Prerequisites

- Day 75 complete

## Explanation

TLS is how Java secures network communication. Knowing keystore management, `SSLContext` setup, and certificate validation is essential for any production Java service.

## Topic by Topic

### Topic 1: PKI and certificate basics

Theory:
CA signs certificate; certificate contains public key + identity. Client trusts CA.

Practical:
Generate self-signed cert with `keytool`; inspect it.

### Topic 2: Keystore and truststore

Theory:
Keystore holds private key + cert (server identity); truststore holds trusted CA certs (client validates against).

Practical:
Create PKCS12 keystore with `keytool`; list entries.

### Topic 3: `SSLContext` configuration

Theory:
Load keystore into `KeyManagerFactory`; load truststore into `TrustManagerFactory`; init `SSLContext`.

Practical:
Create `SSLContext` programmatically for mutual TLS.

### Topic 4: TLS with `HttpsURLConnection` and `HttpClient`

Theory:
`HttpClient` uses system default `SSLContext`; override with custom via builder.

Practical:
Configure `HttpClient` with custom truststore for self-signed server cert.

### Topic 5: Certificate pinning basics

Theory:
Pin the server's expected certificate fingerprint; reject others even if CA-valid.

Practical:
Implement a custom `X509TrustManager` that checks pinned SHA-256 fingerprint.

## Key Concepts

- X.509 certificate structure
- Keystore vs truststore roles
- `SSLContext` → `SSLSocketFactory`
- Mutual TLS configuration
- Certificate pinning for extra security

## Hands-on Coding

```bash
# Generate self-signed cert keystore
keytool -genkeypair -alias myapp -keyalg RSA -keysize 2048 \
  -validity 365 -keystore myapp.p12 -storetype PKCS12 \
  -storepass changeit -dname "CN=localhost"

# Export cert for truststore
keytool -exportcert -alias myapp -keystore myapp.p12 \
  -storepass changeit -file myapp.cer

# Import into truststore
keytool -importcert -alias myapp -file myapp.cer \
  -keystore truststore.p12 -storetype PKCS12 -storepass changeit -noprompt
```

```java
import javax.net.ssl.*;
import java.security.*;
import java.io.*;

public class SslContextFactory {
    public static SSLContext create(String ksPath, String ksPass,
                                   String tsPath, String tsPass) throws Exception {
        KeyStore ks = KeyStore.getInstance("PKCS12");
        ks.load(new FileInputStream(ksPath), ksPass.toCharArray());
        KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
        kmf.init(ks, ksPass.toCharArray());

        KeyStore ts = KeyStore.getInstance("PKCS12");
        ts.load(new FileInputStream(tsPath), tsPass.toCharArray());
        TrustManagerFactory tmf = TrustManagerFactory.getInstance("SunX509");
        tmf.init(ts);

        SSLContext ctx = SSLContext.getInstance("TLS");
        ctx.init(kmf.getKeyManagers(), tmf.getTrustManagers(), null);
        return ctx;
    }
}
```

## Mini Exercise

Build an HTTPS client that trusts only your self-signed cert and rejects all others.

## Assessment Quiz

1. Difference between keystore and truststore?
2. What is mutual TLS?
3. Why use certificate pinning?

Answers:

1. Keystore: your identity (private key + cert); truststore: certs you trust.
2. Both server and client present certificates to each other.
3. Prevents MITM even with a compromised but valid CA.

## Task

- Configure a simple HTTPS server using `HttpServer` + `SSLContext` and verify with curl.

## Day 76 Outcome

You can configure TLS for Java services and clients with proper keystore and certificate management.

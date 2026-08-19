---
title: Internationalization, Unicode, and Locale-Aware Design
slug: day-111-internationalization-unicode-and-locale-aware-design
dayLabel: Day 111
level: Expert
estimatedMinutes: 55
order: 111
track: java
---
# Day 111 [Expert]: Internationalization, Unicode, and Locale-Aware Design

## Goal

Build Java applications that handle multiple languages, scripts, and locales correctly.

## Prerequisites

- Day 110 complete

## Explanation

Internationalisation failures — wrong sort order, broken date formats, garbled text — appear only in production with real multi-locale users. Building for it from day one costs far less than retrofitting.

## Topic by Topic

### Topic 1: Unicode and `char` vs `codePoint`

Theory:
`char` is a 16-bit UTF-16 code unit. Supplementary characters (emoji, rare scripts) require two `char`s (a surrogate pair). Always use `codePointAt` for correct iteration.

Practical:
Count characters in `"Hello 🌍"` with `length()` vs `codePointCount`.

### Topic 2: `Locale` and locale-sensitive operations

Theory:
`String.toUpperCase(Locale.ROOT)` for technical strings; `Locale.forLanguageTag("tr")` for Turkish; `Collator` for locale-correct sorting.

Practical:
Sort names in Turkish correctly using `Collator`; compare with `String.compareTo`.

### Topic 3: `ResourceBundle` for translations

Theory:
`messages_en.properties`, `messages_fr.properties`; loaded via `ResourceBundle.getBundle("messages", locale)`.

Practical:
Create a two-locale bundle; switch at runtime.

### Topic 4: `NumberFormat` and `DateTimeFormatter` per locale

Theory:
`NumberFormat.getCurrencyInstance(locale)` formats `1234.56` as `$1,234.56` or `1.234,56 €` correctly.

Practical:
Format the same price in en-US, de-DE, and ja-JP.

### Topic 5: Character encoding in I/O

Theory:
Always specify charset explicitly in `InputStreamReader`, `Files.readString`, `PrintWriter`. Default charset changed in Java 18 to UTF-8 — old code may break.

Practical:
Read a UTF-8 and ISO-8859-1 file with explicit charset; compare with implicit default.

## Key Concepts

- Code point vs code unit
- Locale-sensitive string operations
- `ResourceBundle` for i18n strings
- Locale-aware formatting
- Explicit charset in all I/O

## Hands-on Coding

```java
import java.text.*;
import java.util.*;
import java.nio.charset.StandardCharsets;

public class I18nDemo {
    public static void main(String[] args) {
        // Code points vs chars
        String text = "Hello 🌍";
        System.out.println("chars: " + text.length());
        System.out.println("code points: " + text.codePointCount(0, text.length()));

        // Locale-sensitive uppercase
        String tag = "title";
        System.out.println(tag.toUpperCase(Locale.ROOT));       // TITLE
        System.out.println("istanbul".toUpperCase(Locale.forLanguageTag("tr"))); // İSTANBUL

        // Currency formatting
        double price = 1234.56;
        for (String lang : new String[]{"en-US", "de-DE", "ja-JP"}) {
            Locale loc = Locale.forLanguageTag(lang);
            System.out.printf("%s: %s%n", lang,
                NumberFormat.getCurrencyInstance(loc).format(price));
        }

        // ResourceBundle
        ResourceBundle rb = ResourceBundle.getBundle("messages", Locale.FRENCH);
        System.out.println(rb.getString("greeting"));
    }
}
```

## Mini Exercise

Build a locale-aware invoice formatter that prints amounts and dates correctly for en-US and de-DE.

## Assessment Quiz

1. Why is `String.length()` wrong for emoji counting?
2. Why use `Locale.ROOT` for technical strings?
3. What changed about default charset in Java 18?

Answers:

1. Emoji use 2 `char`s (surrogate pair); `length()` counts code units, not characters.
2. `ROOT` is neutral — avoids locale-specific transforms (e.g., Turkish dotless i).
3. Default charset changed from platform-dependent to UTF-8.

## Task

- Add full i18n support (en/fr) to Day 30 student management app; localise all output.

## Day 111 Outcome

You can build Java applications that handle Unicode and multiple locales correctly from day one.

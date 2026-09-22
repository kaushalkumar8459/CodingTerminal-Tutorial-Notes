---
title: Attribute Class and Style Binding
slug: day-011-attribute-class-style-binding
dayLabel: Day 11
level: Beginner
estimatedMinutes: 60
order: 11
track: angular
youtubeVideos: []
---

# Day 11 [Beginner]: Attribute, Class and Style Binding

## Goal

Dynamically control HTML attributes, CSS classes, and style values.

## Attribute Binding

```html
<button [attr.aria-label]="buttonLabel">Save</button>
```

Attribute binding is useful when the requirement is specifically an HTML attribute, including accessibility attributes.

## Class Binding

```ts
isHighlighted = true;
```

```html
<article [class.highlighted]="isHighlighted">
  Profile
</article>
```

## Style Binding

```ts
fontSize = 18;
```

```html
<p [style.font-size.px]="fontSize">Profile</p>
```

Prefer reusable CSS classes for normal visual states. Use style binding when a value genuinely needs to be dynamic.

## Accessibility Example

```html
<button [attr.aria-label]="isSaving ? 'Saving profile' : 'Save profile'">
  Save
</button>
```

## Exercise

Add a highlighted state, dynamic font size, meaningful ARIA label, disabled state, and status class to the Profile UI.

## Interview Questions

**What is attribute binding?** Dynamic assignment of an HTML attribute.

**When use class binding?** When a CSS class depends on component state.

**When use style binding?** When a specific style value must be dynamic.

## Assignment

Create a status badge whose CSS class and ARIA label change according to component state.

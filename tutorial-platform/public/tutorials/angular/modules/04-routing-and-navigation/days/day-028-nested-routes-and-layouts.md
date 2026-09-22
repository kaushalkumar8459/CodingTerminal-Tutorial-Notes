---
id: "r4n07"
title: Nested Routes and Layouts
slug: day-028-nested-routes-and-layouts
dayLabel: Day 28
level: Intermediate
estimatedMinutes: 90
order: 28
track: angular
youtubeVideos: []
---

# Day 28 — Nested Routes and Layouts

## Goal

Build route hierarchies where a parent layout remains visible while child pages change.

## The problem

An admin area may contain Dashboard, Users, Reports, and Settings while sharing a sidebar and header.

Nested routes let the parent provide the layout and a child outlet render the selected page.

## Route configuration

    {
      path: 'admin',
      component: AdminLayoutComponent,
      children: [
        { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'users', component: UsersComponent },
        { path: 'reports', component: ReportsComponent }
      ]
    }

The parent layout contains:

    <aside>Admin navigation</aside>
    <main>
      <router-outlet />
    </main>

## Mental model

    /admin/users
    admin → AdminLayout → users

## Practical exercise

Create an Admin Layout with sidebar, header, child outlet, Dashboard, Users, and Reports.

Keep the layout visible while switching child pages.

## Common mistakes

- Forgetting the child RouterOutlet
- Using unnecessary leading slashes in child paths
- Duplicating shared layout markup in every page

## Interview questions

1. What are child routes?
2. Why use a route layout?
3. Where does a child component render?
4. Can a parent route have a component and children?

## Assignment

Create a dashboard shell with four child pages.

## Outcome

You can structure multi-screen applications with reusable route layouts.

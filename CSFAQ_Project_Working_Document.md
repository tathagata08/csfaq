# CSFAQ Project -- Team Working Document

> **Purpose:** This document is the single source of truth for our team.
> It will be updated throughout development as ideas evolve, tasks are
> assigned, and features are finalized.

------------------------------------------------------------------------

# Project Overview

## Objective

Build an enhanced **CSFAQ** platform for Samagama that helps users
quickly find answers, submit new queries, and assists administrators in
managing and expanding the FAQ using AI-assisted features.

------------------------------------------------------------------------

# Current Vision

Our product will consist of three core modules:

## 1. FAQ Page (Mandatory)

### Features

-   Search FAQs
-   Browse by category
-   Expand/Collapse answers
-   Display similar FAQs while searching
-   Responsive UI

------------------------------------------------------------------------

## 2. Query / Discussion Page

### Features

-   Submit a new query
-   View similar existing FAQs before posting
-   Browse previous discussions
-   Mark issue as resolved (future enhancement)

------------------------------------------------------------------------

## 3. Admin Dashboard

### Features

-   View submitted queries
-   Read AI-generated summary
-   View original query
-   Respond / Resolve
-   Escalate if required
-   Convert resolved queries into FAQs (stretch goal)

------------------------------------------------------------------------

# AI Features

## Primary Feature

### AI Query Summarization

Incoming user queries are summarized into concise points to reduce the
amount of text admins need to read.

------------------------------------------------------------------------

## Supporting Features

-   Similar FAQ Retrieval
-   Automatic Category Suggestion
-   FAQ Draft Generation (Stretch Goal)

------------------------------------------------------------------------

# User Workflow

``` text
User visits FAQ
        │
        ▼
Searches for answer
        │
        ▼
Found?
├── Yes → Problem solved
└── No
        │
        ▼
Submit Query
        │
        ▼
System suggests similar FAQs
        │
        ▼
Query reaches Admin
        │
        ▼
AI Summary generated
        │
        ▼
Admin reviews and responds
        │
        ▼
(Optional) Convert to FAQ
```

------------------------------------------------------------------------

# Tech Stack (Tentative)

  Layer             Choice
  ----------------- --------------
  Frontend          TBD
  Backend           TBD
  Database          TBD
  AI Model/API      MiniMax M2.7
  Version Control   Git + GitHub

------------------------------------------------------------------------

# Team Members

  Name   Role        Status
  ------ ----------- --------
         Team Lead   
         Frontend    
         Backend     
         AI/ML       
         Database    
         Testing     

------------------------------------------------------------------------

# Task Board

## To Do

-   [ ] Finalize project scope
-   [ ] Decide tech stack
-   [ ] Create wireframes
-   [ ] Set up repository
-   [ ] Define database schema

## In Progress

-   None

## Completed

-   Initial brainstorming

------------------------------------------------------------------------

# Open Questions

-   Is discussion forum required or optional?
-   How should escalation be handled?
-   Which AI features are feasible within the timeline?
-   What authentication mechanism should be used?

------------------------------------------------------------------------

# Meeting Notes

## YYYY-MM-DD

### Attendees

-   

### Discussion

-   

### Decisions

-   

### Action Items

-   

------------------------------------------------------------------------

# Change Log

  Date      Member      Change
  --------- ----------- --------------------------
  Initial   Team Lead   Created working document

------------------------------------------------------------------------

# Future Enhancements

-   User authentication
-   Admin analytics
-   FAQ popularity metrics
-   Semantic search
-   Notification system
-   AI-generated FAQ drafts

# Wiktoria Lewandowska — Portfolio Website Blueprint

## Overview
Build a **high-end minimalist single-page portfolio website** using React (Vite).

The site must feel:
- Elegant
- Calm
- Highly responsive
- Premium (luxury minimalism)

This is NOT a generic portfolio. Every spacing, animation, and layout decision must feel intentional.

---

## Tech Stack

- React (Vite)
- Framer Motion (animations)
- Tailwind CSS (preferred for speed + consistency)

---

## Core UX Behavior

- Single page layout
- Fullscreen sections
- **CSS scroll snapping**
- Smooth scroll transitions
- Subtle animation on section entry
- Sticky navigation indicator (dot-based or minimal sidebar)

---

## Design System

### Colors

| Usage | Color |
|------|------|
| Primary Background | #F4F8E3 |
| Gradient Accent | #B2CFC0 |
| Secondary Background | #FFFFF7 |
| Text | #251D39 |

#### Background Behavior
- Use a **subtle animated gradient**
- Blend: `#F4F8E3 → #B2CFC0`
- Very slow movement (15–25s loop)
- Low opacity variation (keep it soft)

---

### Typography

Font: **Poppins (Google Fonts)**

#### Scale

| Type | Size | Weight |
|------|------|--------|
| Hero Title | 56–72px | 600 |
| Section Title | 32–40px | 500 |
| Body | 16–18px | 400 |
| Meta | 12–14px | 300 |

#### Rules
- Max width: 600–700px
- Line height: 1.5
- Letter spacing: slightly tightened for headings
- Avoid long paragraphs

---

### Spacing System (STRICT)

Use consistent spacing scale:

8px
16px
24px
32px
48px
80px
120px

#### Rules:
- Sections: 100–120px vertical padding
- Large whitespace between blocks
- Never compress layout

---

## Animation System

Use **Framer Motion**

### Entry Animations
- Fade in + slight upward movement (y: 20px → 0)
- Duration: 0.4–0.6s
- Easing: easeOut

### Staggering
- Children stagger: 0.05–0.1s

### Hover Effects
- Scale: 1.02
- Subtle background shift or opacity change

### DO NOT:
- Use bounce
- Use aggressive motion
- Use long delays

---

## Layout Structure

### Global Container
- Max width: 1100px
- Centered
- Horizontal padding: 24px

---

## Sections

---

### 1. HERO

#### Layout:
- Fullscreen height
- Centered vertically and horizontally

#### Content:
- Name: “Wiktoria Lewandowska”
- Subtitle: “Marketing & Media Specialist” (placeholder)
- Minimal CTA:
  - Scroll indicator OR “View Work”

#### Features:
- Animated gradient background
- Large typography
- Clean, uncluttered

---

### 2. ABOUT

#### Layout:
- Centered text block

#### Content:
- Short paragraph (placeholder)

#### Style:
- Typography-driven
- No visual clutter

---

### 3. EDUCATION

#### Layout Options:
Option A: Vertical timeline  
Option B: Minimal stacked cards (preferred)

#### Content:
- BA Media and Communication  
  First Class (Distinction)  
  De Montfort University, Leicester  

- Master in Marketing  
  First Class (Distinction)  
  De Montfort University, Leicester  

#### Style:
- Subtle card background (#FFFFF7)
- Soft shadow (very light)

---

### 4. FEATURED MEDIA PROJECTS

#### Layout:
- Grid (2 columns desktop, 1 mobile)

#### Card Structure:
- Title
- Description
- Category
- Skills (tags)

#### Style:
- Clean card design
- Minimal borders or soft shadows

---

### 5. FEATURED CONSULTANCY PROJECTS

Same structure as Media Projects

---

### 6. CV

#### Layout:
- Centered

#### Content:
- Button: “Download CV”

#### Style:
- Minimal button
- Slight hover animation

---

### 7. CONTACT

#### Layout:
- Centered

#### Content:
- Email (placeholder)
- LinkedIn (placeholder)

#### Style:
- Clean text links
- Subtle hover effect

---

## Navigation

### Type:
- Fixed side navigation OR floating dots

### Behavior:
- Highlights active section
- Click scrolls smoothly to section

---

## Scroll Behavior

Implement:

scroll-snap-type: y mandatory;
scroll-snap-align: start;

Each section:

min-height: 100vh;

---

## Responsiveness

### Mobile Rules:
- Stack all grids into single column
- Reduce hero font size (40–48px)
- Maintain spacing hierarchy
- Keep padding consistent

---

## File Structure

/src
/components
Hero.jsx
About.jsx
Education.jsx
Projects.jsx
CV.jsx
Contact.jsx
Navigation.jsx
/styles
App.jsx
main.jsx

---

## Component Guidelines

- Each section = separate component
- Reusable ProjectCard component
- Keep logic minimal
- Focus on layout + design

---

## Placeholder Data

Use placeholder content for:
- About text
- Projects
- Email
- LinkedIn
- CV link

---

## Design Principles (NON-NEGOTIABLE)

- Whitespace > content
- Simplicity > decoration
- Typography carries design
- Every element must feel intentional
- No clutter

---

## Things to Avoid

- Bright or harsh colors
- Heavy shadows
- Over-animation
- Complex UI components
- Inconsistent spacing

---

## Final Goal

The final product should feel like:
- A premium personal brand site
- Smooth and responsive
- Visually calm and elegant

It should NOT feel like:
- A template
- A startup landing page
- A generic portfolio

---

## Optional Enhancements (if time allows)

- Cursor-follow subtle effect (very faint)
- Section transition blur
- Lazy-loaded animations
- Dark mode (optional)

---

## Deliverable

A fully functional, responsive React site that:
- Matches the design system
- Has smooth scroll snapping
- Uses clean, minimal components
- Feels polished and production-ready


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## Project Architecture

This is a **Next.js coffee subscription e-commerce platform** called "Bean Bliss" built with React 19, TypeScript, and Tailwind CSS. The app provides personalized coffee subscription services with Korean/English internationalization.

### Core Technologies
- **Framework**: Next.js 15.2.4 with App Router
- **UI**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom amber color scheme
- **State Management**: React Context (Cart, Language, Theme)
- **Testing**: Jest with Testing Library
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

### Key Architecture Patterns

#### Multi-language Support
- Uses custom translation system with `lib/translations.ts`
- Translation keys stored in `messages/ko.json` and `messages/en.json`
- `useLanguage` hook manages language state and localStorage persistence
- Components use `t(key, language)` function for translations

#### Context-based State Management
- **CartProvider**: Manages shopping cart with localStorage persistence
- **LanguageProvider**: Handles i18n state
- **ThemeProvider**: Dark/light mode theming

#### Component Structure
- `components/ui/` - Reusable shadcn/ui components
- `components/layout/` - Header, Footer layout components
- `components/home/` - Home page specific components
- `components/common/` - Shared components like theme toggle

#### Data Layer
- `data/coffee-products.ts` - Static coffee product data with filtering utilities
- `data/subscription-data.ts` - Subscription-related data
- `lib/types/index.ts` - TypeScript type definitions
- Product data uses translation keys for internationalization

### Page Structure (App Router)
- `/` - Home page with hero, features, and product showcase
- `/catalog` - Product catalog with filtering
- `/product/[id]` - Individual product pages
- `/taste-profile` - Coffee preference questionnaire
- `/subscriptions` - Subscription management
- `/my-subscriptions` - User's active subscriptions
- `/cart` - Shopping cart
- `/login`, `/register` - Authentication pages
- `/my-account` - User profile management

### Key Features
- **Personalized Recommendations**: Based on taste preferences (acidity, body, caffeine)
- **Subscription Management**: Flexible delivery schedules and product changes
- **Shopping Cart**: Persistent cart with localStorage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Built on Radix UI primitives for keyboard navigation and screen readers

### Configuration Notes
- Next.js config ignores TypeScript/ESLint errors during builds (development-focused)
- Images are unoptimized for static deployment
- Jest configured for component testing with jsdom environment
- Tailwind configured with custom amber brand colors and shadcn/ui integration

### Translation Keys Convention
- Nested object structure: `"hero.title"`, `"features.personalizedSelection.title"`
- Product names/descriptions use keys: `"products.ethiopianYirgacheffe.name"`
- Always use `t(key, language)` function in components with `useLanguage` hook

### Cart System
- Items persist in localStorage
- Supports quantity updates, additions, and removals
- Calculates totals for items and pricing
- Uses coffee product IDs for cart item identification
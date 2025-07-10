# TradeX Design System Documentation

**Version:** 1.0  
**Last Updated:** July 2025  
**Platform:** React Native (iOS, Android, Web)

---

## 📋 Overview

This document outlines the complete design system for TradeX mobile application, including color palette, typography, spacing, and component specifications. This system ensures visual consistency across all platforms.

---

## 🎨 Color Palette

### Primary Colors (Purple Theme)

| Color             | Hex Code  | Usage                                            | Preview                                                     |
| ----------------- | --------- | ------------------------------------------------ | ----------------------------------------------------------- |
| **Primary**       | `#8B5CF6` | Main brand color, primary buttons, active states | ![#8B5CF6](https://via.placeholder.com/40x20/8B5CF6/8B5CF6) |
| **Primary Dark**  | `#5B2C87` | Darker variant, hover states, depth              | ![#5B2C87](https://via.placeholder.com/40x20/5B2C87/5B2C87) |
| **Primary Light** | `#F3E8FF` | Light backgrounds, subtle highlights             | ![#F3E8FF](https://via.placeholder.com/40x20/F3E8FF/F3E8FF) |

### Secondary Colors (Green Theme)

| Color               | Hex Code  | Usage                                    | Preview                                                     |
| ------------------- | --------- | ---------------------------------------- | ----------------------------------------------------------- |
| **Secondary**       | `#90EE90` | Success states, positive indicators      | ![#90EE90](https://via.placeholder.com/40x20/90EE90/90EE90) |
| **Secondary Dark**  | `#4F8A10` | Success buttons, confirmed states        | ![#4F8A10](https://via.placeholder.com/40x20/4F8A10/4F8A10) |
| **Secondary Light** | `#F0FDF4` | Success backgrounds, positive highlights | ![#F0FDF4](https://via.placeholder.com/40x20/F0FDF4/F0FDF4) |

### Grey Scale & Neutrals

| Color          | Hex Code  | Usage                                 | Preview                                                     |
| -------------- | --------- | ------------------------------------- | ----------------------------------------------------------- |
| **Black**      | `#000000` | Primary text, high emphasis content   | ![#000000](https://via.placeholder.com/40x20/000000/000000) |
| **Dark Grey**  | `#696969` | Secondary text, medium emphasis       | ![#696969](https://via.placeholder.com/40x20/696969/696969) |
| **Grey**       | `#B0B0B0` | Placeholder text, inactive elements   | ![#B0B0B0](https://via.placeholder.com/40x20/B0B0B0/B0B0B0) |
| **Light Grey** | `#F5F5F5` | Borders, dividers, subtle backgrounds | ![#F5F5F5](https://via.placeholder.com/40x20/F5F5F5/F5F5F5) |
| **White**      | `#FFFFFF` | Primary background, cards, surfaces   | ![#FFFFFF](https://via.placeholder.com/40x20/FFFFFF/FFFFFF) |

### Status Colors

| Color       | Hex Code  | Usage                               | Preview                                                     |
| ----------- | --------- | ----------------------------------- | ----------------------------------------------------------- |
| **Success** | `#4F8A10` | Success messages, positive feedback | ![#4F8A10](https://via.placeholder.com/40x20/4F8A10/4F8A10) |
| **Error**   | `#DC2626` | Error states, destructive actions   | ![#DC2626](https://via.placeholder.com/40x20/DC2626/DC2626) |
| **Warning** | `#F59E0B` | Warning messages, caution states    | ![#F59E0B](https://via.placeholder.com/40x20/F59E0B/F59E0B) |
| **Info**    | `#3B82F6` | Information, neutral alerts         | ![#3B82F6](https://via.placeholder.com/40x20/3B82F6/3B82F6) |

### Gradient Definitions

#### Purple Gradient

- **Start:** `#F3E8FF` (Light Purple)
- **Middle:** `#8B5CF6` (Primary Purple)
- **End:** `#5B2C87` (Dark Purple)
- **Usage:** Hero sections, feature highlights, premium content

#### Green Gradient

- **Start:** `#F0FDF4` (Light Green)
- **Middle:** `#90EE90` (Secondary Green)
- **End:** `#4F8A10` (Dark Green)
- **Usage:** Success flows, positive actions, profit indicators

#### Orange Gradient

- **Start:** `#FED7AA` (Light Orange)
- **Middle:** `#FB923C` (Orange)
- **End:** `#EA580C` (Dark Orange)
- **Usage:** Warnings, attention-grabbing elements, CTAs

---

## 🔤 Typography System

### Font Family

**Primary:** Inter (Regular, Medium, SemiBold, Bold)  
**Fallback:** System UI, San Francisco (iOS), Roboto (Android)

### Typography Scale

| Style            | Font  | Weight         | Size | Line Height | Usage                               |
| ---------------- | ----- | -------------- | ---- | ----------- | ----------------------------------- |
| **H1**           | Inter | Bold (700)     | 32px | 40px        | Page titles, main headings          |
| **H2**           | Inter | SemiBold (600) | 24px | 32px        | Section headers, card titles        |
| **H3**           | Inter | SemiBold (600) | 20px | 28px        | Subsection headers                  |
| **Heading**      | Inter | SemiBold (600) | 18px | 24px        | Component headings                  |
| **Sub-Heading**  | Inter | Medium (500)   | 14px | 20px        | Secondary headings, labels          |
| **Body 1**       | Inter | Regular (400)  | 14px | 20px        | Primary body text, descriptions     |
| **Body 2**       | Inter | Regular (400)  | 12px | 16px        | Secondary body text, metadata       |
| **Caption**      | Inter | Regular (400)  | 10px | 14px        | Small text, timestamps, disclaimers |
| **Button**       | Inter | Medium (500)   | 16px | 24px        | Button labels, CTAs                 |
| **Button Small** | Inter | Medium (500)   | 14px | 20px        | Secondary buttons, chips            |

### Typography Examples

```
H1 - Page Title (Inter Bold, 32px)
H2 - Section Header (Inter SemiBold, 24px)
H3 - Subsection (Inter SemiBold, 20px)
Heading - Component Title (Inter SemiBold, 18px)
Sub-Heading - Secondary Title (Inter Medium, 14px)
Body 1 - This is primary body text for main content (Inter Regular, 14px)
Body 2 - Secondary body text for supporting content (Inter Regular, 12px)
Caption - Small supporting text and disclaimers (Inter Regular, 10px)
Button - Action Label (Inter Medium, 16px)
```

---

## 📏 Spacing System

### Spacing Scale

| Token    | Value | Usage                              |
| -------- | ----- | ---------------------------------- |
| **xs**   | 4px   | Tight spacing, small gaps          |
| **sm**   | 8px   | Close elements, internal padding   |
| **md**   | 16px  | Standard spacing, comfortable gaps |
| **lg**   | 24px  | Section spacing, card padding      |
| **xl**   | 32px  | Large gaps, page margins           |
| **xxl**  | 48px  | Major section breaks               |
| **xxxl** | 64px  | Page-level spacing, hero sections  |

### Spacing Examples

```
xs (4px)   ████
sm (8px)   ████████
md (16px)  ████████████████
lg (24px)  ████████████████████████
xl (32px)  ████████████████████████████████
```

---

## 🔘 Border Radius System

| Token    | Value  | Usage                           |
| -------- | ------ | ------------------------------- |
| **xs**   | 4px    | Small elements, chips, badges   |
| **sm**   | 8px    | Buttons, form fields            |
| **md**   | 12px   | Cards, containers               |
| **lg**   | 16px   | Large cards, modals             |
| **xl**   | 20px   | Hero elements, major containers |
| **full** | 9999px | Circular elements, pills        |

---

## 🌓 Dark Mode Adaptations

### Color Adjustments for Dark Theme

| Element             | Light Mode | Dark Mode             |
| ------------------- | ---------- | --------------------- |
| **Background**      | `#FFFFFF`  | `#111827`             |
| **Surface**         | `#F9FAFB`  | `#1F2937`             |
| **Text Primary**    | `#000000`  | `#F9FAFB`             |
| **Text Secondary**  | `#696969`  | `#D1D5DB`             |
| **Border**          | `#E5E7EB`  | `#374151`             |
| **Primary**         | `#8B5CF6`  | `#8B5CF6` (unchanged) |
| **Card Background** | `#FFFFFF`  | `#1F2937`             |

---

## 🎯 Component Specifications

### Buttons

#### Primary Button

- **Background:** Primary (`#8B5CF6`)
- **Text:** White (`#FFFFFF`)
- **Font:** Inter Medium, 16px
- **Padding:** 16px vertical, 24px horizontal
- **Border Radius:** 12px
- **Shadow:** Medium elevation

#### Secondary Button

- **Background:** Transparent
- **Border:** 1px solid Primary (`#8B5CF6`)
- **Text:** Primary (`#8B5CF6`)
- **Font:** Inter Medium, 16px
- **Padding:** 16px vertical, 24px horizontal
- **Border Radius:** 12px

### Cards

- **Background:** Card Background (Light: `#FFFFFF`, Dark: `#1F2937`)
- **Border Radius:** 12px
- **Padding:** 24px
- **Shadow:** Medium elevation
- **Border:** 1px solid Border color

### Form Fields

- **Background:** Surface color
- **Border:** 1px solid Border color
- **Border Radius:** 8px
- **Padding:** 12px horizontal, 16px vertical
- **Font:** Inter Regular, 14px
- **Focus State:** Primary border color

---

## 📱 Platform Considerations

### iOS Specific

- Uses SF Symbols for system icons
- Native blur effects for overlays
- Platform-appropriate shadows and elevations

### Android Specific

- Material Design elevation system
- Ripple effects for touch feedback
- Android-specific shadow implementation

### Web Specific

- CSS fallback fonts for Inter
- Hover states for interactive elements
- Keyboard navigation support

---

## 🔄 Implementation Guidelines

### For Designers

1. **Color Usage:**

   - Always use semantic color names (primary, secondary, success, etc.)
   - Maintain color contrast ratios (WCAG AA compliance)
   - Test designs in both light and dark modes

2. **Typography:**

   - Use designated font weights and sizes from the scale
   - Maintain consistent line heights
   - Consider text hierarchy and readability

3. **Spacing:**

   - Use multiples of the base spacing scale (4px)
   - Maintain consistent spacing patterns
   - Consider touch target sizes (minimum 44px)

4. **Components:**
   - Follow established component patterns
   - Maintain consistency across screens
   - Consider interactive states (hover, pressed, disabled)

### Design Token Changes

To request changes to this design system:

1. **Color Changes:** Specify hex codes, usage context, and accessibility requirements
2. **Typography Changes:** Include font size, weight, line height, and use cases
3. **Spacing Changes:** Provide pixel values and usage examples
4. **Component Changes:** Include visual mockups and interaction specifications

### Review Process

1. Submit change requests with rationale and examples
2. Review for consistency with brand guidelines
3. Validate accessibility compliance
4. Test across all platforms
5. Update documentation and implementation

---

## 📞 Contact & Feedback

For design system changes or questions:

- **Design Lead:** [Your Name]
- **Developer:** [Developer Name]
- **Review Process:** Submit requests via [Platform/Tool]

---

**Note:** This design system is a living document. All changes should be reviewed and approved before implementation to maintain consistency across the TradeX application.

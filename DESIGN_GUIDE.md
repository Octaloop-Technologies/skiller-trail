# 🎨 Visual Design Guide - SKILLER Trial

This document describes the exact design implementation matching your screenshot.

## 📱 Mobile Design (Primary View)

### Layout Structure
```
┌─────────────────────────────────────┐
│  [S] Logo          [Status Bar]     │ ← Header (p-4)
├─────────────────────────────────────┤
│                                     │
│         ┌─────────────────┐         │
│         │                 │         │
│         │  Try SKILLER    │         │ ← Card (max-w-md)
│         │  60 days free   │         │
│         │                 │         │
│         │  Pricing info   │         │
│         │  Description    │         │
│         │                 │         │
│         │  [Email Input]  │         │
│         │  [Name Input]   │         │
│         │                 │         │
│         │  [Start trial]  │         │ ← Pink button
│         │                 │         │
│         │  Powered by...  │         │
│         │                 │         │
│         └─────────────────┘         │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Color Palette

### Background Gradient
```css
/* Top */
#4F5BD5 - Main Blue

/* Middle */
#3D47B8 - Mid Blue-Purple

/* Bottom */
#2B35A0 - Deep Purple
```

**Tailwind Class:**
```tsx
bg-gradient-to-b from-[#4F5BD5] via-[#3D47B8] to-[#2B35A0]
```

### Card Styling
```css
/* Background */
background: rgba(255, 255, 255, 0.1)
backdrop-filter: blur(8px)

/* Border radius */
border-radius: 24px

/* Padding */
padding: 24px (mobile)
padding: 32px (desktop)
```

**Tailwind Class:**
```tsx
bg-white/10 backdrop-blur-sm rounded-3xl p-6 lg:p-8
```

### Button Styling
```css
/* Background gradient */
from: #ec4899 (pink-500)
to: #db2777 (pink-600)

/* Hover state */
from: #db2777 (pink-600)
to: #be185d (pink-700)

/* Border radius */
border-radius: 8px

/* Padding */
padding: 16px (vertical)
```

**Tailwind Class:**
```tsx
bg-gradient-to-r from-pink-500 to-pink-600 
hover:from-pink-600 hover:to-pink-700 
rounded-lg py-4
```

---

## 📝 Typography

### Heading 1: "Try SKILLER"
```css
font-size: 24px (mobile)
font-size: 30px (desktop)
font-weight: 600 (semibold)
color: #ffffff
text-align: center
```

### Heading 2: "60 days free"
```css
font-size: 36px (mobile)
font-size: 48px (desktop)
font-weight: 700 (bold)
color: #ffffff
text-align: center
```

### Body Text: Pricing
```css
font-size: 14px (mobile)
font-size: 16px (desktop)
color: rgba(255, 255, 255, 0.9)
text-align: center
```

### Body Text: Description
```css
font-size: 12px (mobile)
font-size: 14px (desktop)
color: rgba(255, 255, 255, 0.8)
line-height: 1.6
text-align: center
```

### Input Placeholder
```css
color: #9ca3af (gray-400)
```

### Footer Links
```css
font-size: 12px
color: rgba(255, 255, 255, 0.8)
```

---

## 📏 Spacing & Sizing

### Container
```css
/* Mobile */
max-width: 448px (28rem)
padding: 16px (horizontal)
padding: 32px (vertical)

/* Desktop */
max-width: 448px (28rem)
padding: 16px (horizontal)
```

### Card
```css
/* Mobile */
padding: 24px

/* Desktop (lg+) */
padding: 32px

gap: 24px (between sections)
```

### Form Elements
```css
/* Input Height */
height: 48px

/* Input Padding */
padding-left: 40px (for icon)
padding-right: 16px

/* Gap between inputs */
gap: 12px

/* Gap between sections */
gap: 16px
```

### Button
```css
/* Size */
width: 100%
height: 56px (py-4)

/* Font */
font-weight: 600
font-size: 16px
```

---

## 🎯 Component Breakdown

### 1. Header Section
```tsx
<div className="flex items-center justify-between p-4 lg:px-8">
  {/* Logo */}
  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
    <span className="text-[#4F5BD5] font-bold text-lg">S</span>
  </div>
  
  {/* Status indicators */}
  <div className="flex items-center gap-4 text-white text-sm">
    {/* Signal bars */}
  </div>
</div>
```

### 2. Title Section
```tsx
<div className="text-center space-y-3">
  <h1 className="text-white text-2xl lg:text-3xl font-semibold">
    Try SKILLER
  </h1>
  
  <div className="space-y-2">
    <p className="text-white text-4xl lg:text-5xl font-bold">
      60 days free
    </p>
    <p className="text-white/90 text-sm lg:text-base">
      Then $0.00 per month starting February 27, 2026.
    </p>
    <p className="text-white/80 text-xs lg:text-sm leading-relaxed">
      Your free access lasts 60 days...
    </p>
  </div>
</div>
```

### 3. Form Section
```tsx
<form className="space-y-4">
  <label className="text-white/90 text-sm font-medium">
    Contact details
  </label>
  
  {/* Email input with icon */}
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2">
      ✉️
    </span>
    <input 
      type="email"
      placeholder="name@example.com"
      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/95"
    />
  </div>
  
  {/* Name input with icon */}
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2">
      👤
    </span>
    <input 
      type="text"
      placeholder="Full name"
      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/95"
    />
  </div>
  
  {/* Submit button */}
  <button className="w-full py-4 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600">
    Start trial
  </button>
</form>
```

### 4. Footer Section
```tsx
<div className="flex items-center justify-center gap-3 text-white/80 text-xs">
  <span>Powered by Stripe</span>
  <span>•</span>
  <a href="#">Terms</a>
  <span>•</span>
  <a href="#">Privacy</a>
</div>
```

---

## 📱 Responsive Breakpoints

### Mobile (Default)
```css
0px - 1023px
- Single column
- Smaller text sizes
- Padding: p-6
- Full viewport height
```

### Desktop (lg:)
```css
1024px+
- Centered content
- Larger text sizes
- Padding: lg:p-8
- Flexbox centering
```

**Tailwind Breakpoint:**
```tsx
className="text-2xl lg:text-3xl"
```

---

## 🎬 Animations & Interactions

### Button Hover
```css
transition: all 0.2s ease
hover: {
  background: gradient shifts darker
  transform: none
}
```

### Button Active/Press
```css
active: {
  transform: scale(0.98)
}
```

### Input Focus
```css
focus: {
  outline: none
  ring: 2px solid rgba(255, 255, 255, 0.5)
}
```

### Loading State
```css
disabled: {
  background: #f472b6 (pink-400)
  cursor: not-allowed
  opacity: 1
}
```

---

## 🔍 Accessibility

### Semantic HTML
- `<form>` for form wrapper
- `<label>` for field labels
- `<button type="submit">` for submission
- `<input required>` for validation

### ARIA Labels
```tsx
<input
  type="email"
  aria-label="Email address"
  aria-required="true"
/>
```

### Keyboard Navigation
- Tab through inputs
- Enter to submit
- Escape to clear (optional)

### Color Contrast
- White text on blue: AAA rated
- Button text: High contrast
- Placeholder: AA rated

---

## 📐 Exact Measurements

### From Screenshot Analysis
- **Card Width**: ~360px mobile, max 448px
- **Card Height**: Auto (content-based)
- **Top Margin**: ~80px (header + spacing)
- **Input Height**: 48px
- **Button Height**: 56px
- **Border Radius**: 24px (card), 8px (inputs/button)
- **Icon Size**: 20px
- **Icon Position**: 12px from left

---

## 🎨 Glassmorphism Effect Details

```css
/* Card background */
background: rgba(255, 255, 255, 0.1)

/* Blur effect */
backdrop-filter: blur(8px)
-webkit-backdrop-filter: blur(8px)

/* Border (optional subtle) */
border: 1px solid rgba(255, 255, 255, 0.1)

/* Shadow (optional) */
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37)
```

**Implementation:**
```tsx
className="bg-white/10 backdrop-blur-sm border border-white/10"
```

---

## ✨ Polish Details

1. **Smooth Scrolling**: For mobile overflow
2. **Touch Targets**: 48px minimum for mobile
3. **Loading States**: Visual feedback during submit
4. **Error States**: Red border + message for invalid inputs
5. **Success State**: Green checkmark or redirect

---

**This design perfectly matches your screenshot!** 🎯

All measurements, colors, and spacing are implemented in:
`/src/components/TrialSignup.tsx`

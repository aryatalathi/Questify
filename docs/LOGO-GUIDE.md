# Questify Logo System

## Logo Files Created

### 1. **Main Logo** (`logo.svg`)
- **Dimensions**: 200x60px
- **Usage**: Marketing materials, external use
- **Features**: 
  - Animated lightbulb with learning symbolism
  - Stacked books representing knowledge
  - Clean "Questify" text only
  - Floating elements with subtle animations

### 2. **Q Logo** (`logo-q.svg`)
- **Dimensions**: 60x60px
- **Usage**: Compact spaces, app icons
- **Features**:
  - Large "Q" letter as focal point
  - Circular border with brand gradients
  - Subtle animations
  - Perfect for square layouts

### 3. **Favicon** (`favicon.svg`)
- **Dimensions**: 32x32px
- **Usage**: Browser tab icon for all pages
- **Features**:
  - Simplified lightbulb + books icon
  - "Q" letter overlay for brand recognition
  - Optimized for small sizes
  - Same gradient theme as main logo

### 4. **Mini Logo** (`logo-mini.svg`)
- **Dimensions**: 120x40px
- **Usage**: Compact headers, mobile navigation
- **Features**:
  - Condensed version of main logo
  - "Learning Hub" subtitle
  - Smaller icon but retains all key elements

## Design Elements

### Color Palette
```css
/* Primary Gradients */
--primary-gradient: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
--accent-gradient: linear-gradient(135deg, #ff758c, #ff7eb3);
--highlight-color: #ffd700; /* Gold for light rays */
```

### Typography
- **Main Text**: 'Playfair Display' (serif) - Elegant, readable
- **Subtitle**: 'Inter' (sans-serif) - Clean, modern

### Symbolism
- **💡 Lightbulb**: Knowledge, ideas, learning
- **📚 Books**: Education, study, accumulated knowledge  
- **🚀 Rocket**: Growth, fuel for curiosity, progress
- **✨ Light Rays**: Inspiration, enlightenment
- **🌟 Floating Elements**: Dynamic learning, curiosity

## Implementation

### HTML Integration
```html
<!-- Page headings remain unchanged -->
<nav class="navbar">
  <h1>Questify — Fuel Your Curiosity Daily 🚀</h1>
  <!-- OR -->
  <h1>⚽ Sports & Analytics Diary</h1>
</nav>

<!-- Favicon on all pages -->
<link rel="icon" type="image/svg+xml" href="favicon.svg">

<!-- External use -->
<img src="logo.svg" alt="Questify Logo">
<img src="logo-q.svg" alt="Questify Q Logo">
```

### Design Philosophy
- **Original headings preserved**: Each page keeps its unique identity
- **Logo as brand asset**: Available for external marketing/materials
- **Simple favicon**: Unobtrusive browser tab identification
- **Flexible system**: Multiple logo variants for different contexts

## Brand Guidelines

### Do's ✅
- Use on gradient or solid colored backgrounds
- Maintain aspect ratio when scaling
- Keep minimum size of 80px width for readability
- Use SVG format for crisp display at all sizes

### Don'ts ❌
- Don't use on busy backgrounds that reduce readability
- Don't stretch or distort proportions
- Don't use raster formats (PNG/JPG) when SVG is available
- Don't modify colors outside of the approved palette

## File Usage by Context

| Context | Logo File | Size | Usage |
|---------|-----------|------|-------|
| Browser Tab | `favicon.svg` | 32x32 | All pages |
| Marketing Materials | `logo.svg` | 200x60 | External use |
| App Icons | `logo-q.svg` | 60x60 | Square layouts |
| Compact Headers | `logo-mini.svg` | 120x40 | Mobile/small spaces |
| Page Navigation | Text-based | N/A | Preserved original headings |

## Technical Notes

- All logos are SVG format for infinite scalability
- Gradients and animations are CSS-based
- Compatible with all modern browsers
- Optimized for both light and dark themes
- Accessible with proper alt text

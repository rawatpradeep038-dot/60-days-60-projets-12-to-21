# Day 15 - 3D Card Hover Effects Gallery

A stunning gallery showcasing projects with immersive 3D tilt effects on hover. Built with React and pure CSS 3D transforms for a mesmerizing user experience.

## 🚀 Live Demo
**[View Live Demo](https://day-15-3d-card-gallery.vercel.app/)**

## ✨ Features

- **🎨 3D Tilt Effect**: Cards rotate in 3D space following mouse movement
- **💫 Smooth Animations**: Seamless transitions and transform effects
- **✨ Shine Effect**: Animated light reflection on hover
- **🌈 Gradient Overlays**: Beautiful color transitions
- **🎯 Glassmorphism**: Modern frosted glass design
- **📱 Fully Responsive**: Works perfectly on all devices
- **⚡ Performance**: Optimized with CSS transforms and GPU acceleration
- **🎭 Floating Background**: Animated gradient orbs

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3 3D Transforms** - For perspective and rotation effects
- **Lucide React** - Icon library
- **Pure CSS Animations** - No animation libraries needed

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Create the project:
```bash
npm create vite@latest day-15-3d-card-gallery -- --template react
cd day-15-3d-card-gallery
```

2. Install dependencies:
```bash
npm install
npm install lucide-react
```

3. Copy all files from the structure above into your project

4. Start development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

### Building for Production
```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎨 Design Features

### 3D Transform Effects
- **Perspective**: 1000px depth for realistic 3D space
- **Rotation**: Cards tilt based on mouse position (±15°)
- **Scale**: Subtle zoom on hover (1.02x)
- **Smooth Transitions**: 0.1s ease-out for fluid movement

### Visual Effects
- **Glassmorphism**: Backdrop blur with semi-transparent backgrounds
- **Gradient Glow**: Animated border glow on hover
- **Shine Animation**: Light sweep across cards
- **Image Zoom**: Background images scale on hover
- **Floating Orbs**: Animated gradient spheres in background

### Interaction States
- **Hover**: 3D tilt, overlay reveal, button animation
- **Focus**: Accessible keyboard navigation
- **Active**: Responsive click feedback
## 🎯 How 3D Effect Works

### 1. **Perspective Setup**
```css
.card-3d-container {
  perspective: 1000px;  /* Creates 3D space */
}
```

### 2. **Mouse Position Tracking**
```javascript
// Calculate mouse position relative to card center
const rotateX = ((y - centerY) / centerY) * -15;
const rotateY = ((x - centerX) / centerX) * 15;
```

### 3. **Apply Transform**
```javascript
transform: `perspective(1000px) 
           rotateX(${rotateX}deg) 
           rotateY(${rotateY}deg) 
           scale3d(1.02, 1.02, 1.02)`
```

### 4. **Reset on Mouse Leave**
```javascript
transform: 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
```

## 🎨 Customization

### Change Card Colors
Edit the gradient in `App.css`:
```css
.card-category {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adjust 3D Intensity
In `Card3D.jsx`, modify the rotation multipliers:
```javascript
const rotateX = ((y - centerY) / centerY) * -15;  // Change 15
const rotateY = ((x - centerX) / centerX) * 15;   // Change 15
```

### Add More Projects
Edit `src/data/projects.js`:
```javascript
{
  id: 7,
  title: 'Your Project',
  category: 'Category',
  description: 'Description',
  image: 'URL',
  technologies: ['Tech1', 'Tech2'],
  link: '#'
}
```

## 🌟 Key Features Explained

### 3D Card Component
- Uses `useRef` to track DOM element
- Calculates mouse position relative to card center
- Applies real-time transform based on mouse coordinates
- Resets smoothly when mouse leaves

### Shine Effect
- Animated gradient overlay
- Moves diagonally across card on hover
- Created with CSS keyframe animation
- Adds depth and premium feel

### Glassmorphism Design
- Semi-transparent backgrounds
- Backdrop blur filter
- Layered shadows
- Modern, clean aesthetic

## 📱 Responsive Behavior

- **Desktop**: Full 3D effects with mouse tracking
- **Tablet**: Grid adapts to 2 columns
- **Mobile**: Single column, simplified effects

## 🔮 Advanced Features

### GPU Acceleration
All transforms use `translate3d` and `scale3d` for hardware acceleration:
```css
transform: perspective(1000px) rotateX() rotateY() scale3d();
```

### Performance Optimization
- CSS transforms instead of position changes
- `will-change` hints for browser optimization
- Debounced mouse tracking
- Efficient re-renders with React

## 📚 Learning Outcomes

- CSS 3D transforms and perspective
- Mouse event handling in React
- Real-time DOM calculations
- Component composition patterns
- Modern CSS effects (glassmorphism, gradients)
- Performance optimization techniques
- Responsive design principles

## 🎓 CSS Concepts Covered

1. **perspective** - Creates 3D rendering context
2. **transform-style: preserve-3d** - Maintains 3D space for children
3. **rotateX/rotateY** - 3D rotation transforms
4. **scale3d** - 3D scaling
5. **backdrop-filter** - Glassmorphism effect
6. **CSS gradients** - Linear and radial gradients
7. **CSS animations** - Keyframe animations
8. **Flexbox/Grid** - Modern layout systems

## 🔮 Future Enhancements

- [ ] Add card flip animation for back content
- [ ] Implement parallax scrolling
- [ ] Add category filtering
- [ ] Include project modal with more details
- [ ] Add dark/
# Day 14 - Productivity Browser Extension UI

A beautiful and modern productivity browser extension built with React and Vite. Features focus timer, task management, goals tracking, and customizable settings.

## 🚀 Live Demo
**[View Live Demo](https://day-14-browser-extension.vercel.app/)**

## ✨ Features

- **🎯 Focus Timer**: Pomodoro-style timer with customizable durations (15m, 25m, 45m, 60m)
- **✅ Task Management**: Create, complete, and delete tasks with an intuitive interface
- **📊 Goals Tracking**: Monitor daily progress and streaks with visual progress bars
- **⚙️ Settings**: Customize notifications, sounds, and preferences
- **🎨 Beautiful Animations**: Smooth transitions, hover effects, and glassmorphism design
- **📱 Responsive**: Works perfectly on all screen sizes

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Lucide React** - Beautiful icon library
- **CSS3** - Modern animations and transitions

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone or create the project:
```bash
npm create vite@latest day-14-browser-extension -- --template react
cd day-14-browser-extension
```

2. Install dependencies:
```bash
npm install
npm install lucide-react
```

3. Start development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Building for Production
```bash
npm run build
```

The built files will be in the `dist` folder.

## 🎨 Design Features

- **Glassmorphism**: Modern frosted glass effect with backdrop blur
- **Gradient Accents**: Beautiful purple gradient throughout
- **Smooth Animations**: Scale transforms, fade effects, and shimmer animations
- **Hover Effects**: Interactive elements with smooth transitions
- **Progress Indicators**: Animated progress bars with shimmer effects
- **Light Theme**: Clean and modern light color scheme

## Project Structure

```text
day-14-browser-extension/
├── public/
│   └── manifest.json          # Chrome extension manifest
├── src/
│   ├── components/
│   │   ├── FocusTimer.jsx     # Pomodoro timer component
│   │   ├── TaskList.jsx       # Task management component
│   │   ├── Goals.jsx          # Goals tracking component
│   │   └── Settings.jsx       # Settings panel component
│   ├── App.jsx                # Main app component
│   ├── App.css                # Component styles
│   ├── index.css              # Global styles
│   └── main.jsx               # App entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md

---




## 🎯 Usage

### Focus Timer
1. Select a duration (15m, 25m, 45m, or 60m)
2. Click "Start" to begin the focus session
3. Use "Pause" to take breaks
4. Click "Reset" to restart the timer

### Tasks
1. Type your task in the input field
2. Press Enter or click the + button to add
3. Check the box to mark as complete
4. Click the trash icon to delete

### Goals
- View your daily progress across different categories
- Track completion rates and streaks
- Monitor focus time and task counts

### Settings
- Toggle notifications for timer completion
- Enable/disable sound alerts
- Configure auto-start for breaks
- Switch between light and dark modes (coming soon)

## 🌟 Key Features Explained

### Animation System
- **Hover Scale**: Elements smoothly scale up on hover
- **Fade Transitions**: Smooth opacity changes
- **Transform Effects**: Translate and rotate animations
- **Shimmer Effect**: Animated gradient overlay on progress bars

### State Management
- React hooks (useState, useEffect) for local state
- Timer logic with intervals
- Task CRUD operations
- Settings persistence ready

### Chrome Extension Ready
- Includes manifest.json for Chrome extension packaging
- Notification permissions configured
- Storage API ready for data persistence

## 📱 Browser Extension Installation (Optional)

To use as a real Chrome extension:

1. Build the project: `npm run build`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist` folder

## 🎓 Learning Outcomes

- Component-based architecture with React
- State management with hooks
- Timer implementation with useEffect
- Modern CSS animations and transitions
- Glassmorphism and modern UI design
- Chrome extension structure

## 🔮 Future Enhancements

- [ ] Dark mode implementation
- [ ] Data persistence with localStorage
- [ ] Statistics and analytics dashboard
- [ ] Custom goal creation
- [ ] Export/import settings
- [ ] Keyboard shortcuts
- [ ] Multiple timer presets
- [ ] Task categories and tags

## 📄 License

MIT License - feel free to use for learning and projects!

## 👨‍💻 Author

Pradeep Singh Rawat

Created as part of the 60 Days of React Projects challenge.

---

**Day 14 of 30** - Building modern web applications one day at a time! 🚀
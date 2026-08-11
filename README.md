# The Velvet Bridle - Gothic Luxury Equine Planner

A premium, gothic-styled equine management planner designed for discerning horse owners who demand beauty and precision in every detail.

![The Velvet Bridle](https://img.shields.io/badge/style-gothic%20luxury-4a0e1a) ![React](https://img.shields.io/badge/React-19.2.8-61dafb) ![Vite](https://img.shields.io/badge/Vite-8.2.0-646cff)

## ✨ Features

- **🐴 Comprehensive Horse Profiles** - Track breed, age, medical history, feeding schedules, and training notes
- **📅 Elegant Task Scheduler** - Interactive calendar with recurring tasks (daily, weekly, monthly)
- **🏥 Health Tracking** - Vaccination records, injury logs, weight tracking, and supplement management
- **🔔 Smart Notifications** - Real-time alerts for upcoming and overdue tasks
- **📊 Professional Reports** - Export care logs and schedules in PDF/CSV formats
- **🌙 Gothic Luxury Design** - Dark mode with antique gold accents and ornate styling
- **📱 Fully Responsive** - Beautiful on desktop, tablet, and mobile devices
- **💾 Offline Capability** - Local storage for offline access with cloud sync ready

## 🎨 Design Philosophy

The Velvet Bridle combines equestrian care management with a sophisticated gothic aesthetic:

- **Color Palette**: Deep black, rich burgundy, antique gold, muted ivory
- **Typography**: Elegant serif fonts with subtle flourishes
- **UI Elements**: Ornate borders, gold-accented buttons, smooth animations
- **Experience**: Premium feel with intuitive functionality

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/velvet-bridle.git
cd velvet-bridle
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

The app will automatically load with sample data for demonstration.

## 📁 Project Structure

```
velvet-bridle/
├── src/
│   ├── components/          # React components
│   │   ├── Navbar.jsx
│   │   ├── Dashboard.jsx
│   │   ├── HorseProfiles.jsx
│   │   ├── TaskScheduler.jsx
│   │   ├── HealthTracking.jsx
│   │   ├── Reports.jsx
│   │   └── NotificationSystem.jsx
│   ├── styles/             # CSS styling
│   │   └── gothic-theme.css
│   ├── utils/              # Utility functions
│   │   └── sampleData.js
│   ├── App.jsx             # Main app component
│   ├── App.css             # App-specific styles
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Component Development

Each component is self-contained with:
- React functional components with hooks
- Gothic-themed styling via CSS classes
- Local state management where appropriate
- Props for data passing and callbacks

### Styling Guidelines

- Use CSS custom properties defined in `gothic-theme.css`
- Follow the BEM-like naming convention
- Ensure responsive design with mobile-first approach
- Test gothic aesthetic across all components

### Adding New Features

1. Create component in `src/components/`
2. Add styling to `src/styles/gothic-theme.css`
3. Import and use in `App.jsx`
4. Add route if needed
5. Test with sample data

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

#### GitHub Pages
```bash
# Build
npm run build

# Deploy to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

#### Traditional Hosting
Upload the contents of `dist/` to your web server.

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=your_api_url
VITE_APP_TITLE=The Velvet Bridle
```

## 📊 Data Management

### Local Storage

The app uses localStorage for data persistence:
- `velvet-bridle-horses` - Horse profiles
- `velvet-bridle-tasks` - Task schedules
- `velvet-bridle-health` - Health records

### Sample Data

Sample data is automatically loaded on first visit. To reset:
```javascript
// In browser console
localStorage.clear()
location.reload()
```

### Cloud Sync (Future)

The architecture supports future cloud integration:
- Data structure is cloud-ready
- Offline-first design
- Sync conflict resolution planned

## 🎯 Key Features Explained

### Horse Profiles
- Complete horse information management
- Photo support via URL
- Expandable detail views
- Quick edit and delete actions

### Task Scheduler
- Monthly calendar view
- Recurring task generation
- Category-based color coding
- Horse-specific assignments
- Quick add via calendar click

### Health Tracking
- Multiple record types (vaccination, injury, illness, etc.)
- Urgent case highlighting
- Upcoming due date reminders
- Veterinary and cost tracking
- Weight and temperature monitoring

### Reports & Exports
- PDF generation with formatting
- CSV export for spreadsheets
- Date range filtering
- Horse-specific reports
- Real-time data preview

### Notification System
- Browser notification support
- Overdue task alerts
- Today's task reminders
- Health due date notifications
- Customizable notification preferences

## 🧪 Testing

### Manual Testing Checklist

- [ ] All horse profile CRUD operations
- [ ] Task creation and recurring tasks
- [ ] Calendar navigation and filtering
- [ ] Health record management
- [ ] PDF/CSV export functionality
- [ ] Notification system
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Local storage persistence
- [ ] Sample data loading

### Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Use different port
npm run dev -- --port 3000
```

**Styles not loading**
- Clear browser cache
- Restart dev server
- Check CSS imports

**Local storage not persisting**
- Check browser localStorage settings
- Ensure browser isn't in private mode
- Try different browser

**Build errors**
- Delete `node_modules` and reinstall
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check Node.js version compatibility

## 📝 Customization

### Branding
Edit `index.html` to change:
- Page title
- Meta description
- Favicon

### Colors
Modify CSS custom properties in `gothic-theme.css`:
```css
:root {
  --color-deep-black: #0a0a0a;
  --color-rich-burgundy: #4a0e1a;
  --color-antique-gold: #c9a227;
  /* ... */
}
```

### Fonts
Change fonts in `gothic-theme.css` and `index.html`:
```css
--font-serif: 'Your Font', serif;
--font-body: 'Your Font', serif;
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software intended for commercial distribution.

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core horse management
- ✅ Task scheduling
- ✅ Health tracking
- ✅ Reports and exports
- ✅ Gothic UI theme

### Phase 2 (Planned)
- Cloud sync integration
- User authentication
- Multi-stable support
- Advanced reporting with charts
- Mobile app (React Native)

### Phase 3 (Future)
- Veterinary portal integration
- Breeding records
- Expense tracking
- Calendar integration
- AI-powered insights

## 📞 Support

For support, feature requests, or bug reports:
- Email: support@velvetbridle.com
- Documentation: [Full Documentation](WIREFRAMES.md)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the lightning-fast build tool
- Lucide React for beautiful icons
- The equestrian community for inspiration

---

**The Velvet Bridle** - Where equestrian care meets gothic elegance.

*Built with ❤️ for discerning horse owners everywhere.*
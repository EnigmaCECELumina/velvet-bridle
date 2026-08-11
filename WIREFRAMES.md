# The Velvet Bridle - Wireframe Documentation

## Gothic Luxury Equine Planner

### Project Overview
The Velvet Bridle is a premium, gothic-styled equine management planner designed for discerning horse owners. The application combines comprehensive horse care management with an elegant, dark-themed aesthetic featuring gold accents and ornate design elements.

---

## Design System

### Color Palette
- **Deep Black** (`#0a0a0a`) - Primary background
- **Rich Burgundy** (`#4a0e1a`) - Secondary accents, alerts
- **Antique Gold** (`#c9a227`) - Primary accent, borders, buttons
- **Muted Ivory** (`#f5f0e8`) - Text, content areas
- **Dark Gray** (`#1a1a1a`) - Card backgrounds, secondary elements

### Typography
- **Headings**: Playfair Display, Cinzel (elegant serif fonts)
- **Body**: Lato (clean, readable serif)
- **Accents**: Letter-spacing and flourishes for gothic feel

### UI Elements
- **Borders**: Ornate gold borders with subtle shadows
- **Buttons**: Gradient backgrounds with gold accents, hover effects
- **Cards**: Dark gradients with gold borders and subtle animations
- **Icons**: Gothic-inspired equestrian motifs

### Animations
- Smooth fades (0.6s cubic-bezier)
- Subtle parallax effects
- Slow hover reveals
- Shimmer effects on gold elements
- Floating animations for decorative elements

---

## Component Architecture

### 1. App Component (`App.jsx`)
**Purpose**: Main application container and state management

**Responsibilities**:
- Route management with React Router
- Global state management for horses, tasks, and health records
- Local storage synchronization
- Data persistence and retrieval

**State**:
- `horses`: Array of horse profile objects
- `tasks`: Array of task/schedule objects
- `healthRecords`: Array of health record objects

**Child Components**:
- Navbar
- Dashboard
- HorseProfiles
- TaskScheduler
- HealthTracking
- Reports

---

### 2. Navbar Component (`Navbar.jsx`)
**Purpose**: Navigation and notification system

**Features**:
- Gothic-styled navigation links
- Active state indicators
- Notification bell with badge counter
- Responsive mobile menu

**UI Elements**:
- Brand logo with horse emoji
- Navigation items with icons
- Notification system integration
- Gold accent borders and hover effects

---

### 3. Dashboard Component (`Dashboard.jsx`)
**Purpose**: Overview and quick access to key information

**Layout**:
- Stats grid (4 cards)
- Two-column layout for tasks and health alerts
- Overdue tasks alert section
- Recent activity feed

**Features**:
- Real-time statistics
- Upcoming tasks preview
- Health alerts and reminders
- Quick navigation to detailed views

**Data Displayed**:
- Total horses count
- Active tasks count
- Health records count
- Overdue tasks count
- Upcoming tasks (next 5)
- Urgent health concerns
- Recent health records

---

### 4. Horse Profiles Component (`HorseProfiles.jsx`)
**Purpose**: Comprehensive horse profile management

**Features**:
- CRUD operations for horse profiles
- Expandable detail views
- Photo upload support
- Quick actions (edit, delete)

**Data Fields**:
- Name, Breed, Age, Color, Gender
- Medical History
- Feeding Schedule
- Training Notes
- Special Requirements
- Emergency Contact
- Photo URL

**UI Components**:
- Horse cards with avatar
- Expandable detail sections
- Modal form for add/edit
- Category-based organization

---

### 5. Task Scheduler Component (`TaskScheduler.jsx`)
**Purpose**: Calendar-based task management with recurring tasks

**Features**:
- Interactive calendar view
- Drag-and-drop task management
- Recurring task support (daily, weekly, monthly)
- Category filtering
- Horse-specific task assignment
- Quick add functionality

**Calendar Features**:
- Monthly grid view
- Navigation between months
- Today highlighting
- Task indicators on calendar days
- Color-coded task categories

**Task Categories**:
- Feeding (gold)
- Grooming (light gold)
- Training (burgundy)
- Medical (dark red)
- Farrier (gold)
- Other (ivory)

**Recurring Options**:
- Daily, weekly, monthly intervals
- Custom repeat intervals (1-12)
- Automatic task generation

---

### 6. Health Tracking Component (`HealthTracking.jsx`)
**Purpose**: Comprehensive health record management

**Features**:
- Health record CRUD operations
- Type-based categorization
- Urgent case highlighting
- Upcoming due date reminders
- Veterinary tracking
- Weight and temperature monitoring

**Record Types**:
- Vaccination
- Injury
- Illness
- Checkup
- Supplement
- Weight tracking
- Other

**Data Fields**:
- Type, Date, Description
- Horse assignment
- Veterinarian
- Cost
- Weight, Temperature
- Next due date
- Notes

**Visual Indicators**:
- Urgent cases (red accent)
- Upcoming due dates (burgundy accent)
- Type-specific icons and colors

---

### 7. Reports Component (`Reports.jsx`)
**Purpose**: Data export and reporting functionality

**Features**:
- PDF export with formatting
- CSV export for spreadsheets
- Date range filtering
- Horse-specific filtering
- Report type selection
- Data preview

**Report Types**:
- Task Schedule Report
- Health Records Report
- Horse Profiles Report

**Export Options**:
- PDF: Formatted document with headers and styling
- CSV: Spreadsheet-compatible data file

**Filtering**:
- Date range selection
- Horse-specific filtering
- Report type selection

---

### 8. Notification System Component (`NotificationSystem.jsx`)
**Purpose**: Real-time alerts and reminders

**Features**:
- Browser notification support
- Overdue task alerts
- Today's task reminders
- Upcoming task notifications
- Health due date reminders
- Permission management

**Notification Types**:
- Overdue tasks (red alert)
- Today's tasks (gold highlight)
- Upcoming tasks (burgundy)
- Health reminders (green)

**UI Elements**:
- Notification bell with badge
- Slide-down notification panel
- Dismiss individual/all notifications
- Enable browser notifications button

---

## Page Layouts

### Dashboard Layout
```
┌─────────────────────────────────────────┐
│           Navbar (sticky)                │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ Stat │ │ Stat │ │ Stat │ │ Stat │  │
│  └──────┘ └──────┘ └──────┘ └──────┘  │
│                                         │
│  ┌──────────────┐ ┌──────────────┐    │
│  │ Upcoming     │ │ Health       │    │
│  │ Tasks        │ │ Alerts       │    │
│  └──────────────┘ └──────────────┘    │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Overdue Tasks Alert             │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Recent Activity                  │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Horse Profiles Layout
```
┌─────────────────────────────────────────┐
│           Navbar (sticky)                │
├─────────────────────────────────────────┤
│  Horse Profiles          [+ Add Horse]  │
│                                         │
│  ┌────────────┐ ┌────────────┐         │
│  │ Horse Card │ │ Horse Card │         │
│  │            │ │            │         │
│  │ [Avatar]   │ │ [Avatar]   │         │
│  │ Name       │ │ Name       │         │
│  │ Breed      │ │ Breed      │         │
│  │ [Details]  │ │ [Details]  │         │
│  └────────────┘ └────────────┘         │
│                                         │
│  ┌────────────┐ ┌────────────┐         │
│  │ Horse Card │ │ Horse Card │         │
│  └────────────┘ └────────────┘         │
└─────────────────────────────────────────┘
```

### Task Scheduler Layout
```
┌─────────────────────────────────────────┐
│           Navbar (sticky)                │
├─────────────────────────────────────────┤
│  Task Scheduler    [Filter] [+ Quick]   │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  [<] Month Year [>]               │ │
│  ├───────────────────────────────────┤ │
│  │ Sun Mon Tue Wed Thu Fri Sat      │ │
│  ├───────────────────────────────────┤ │
│  │  1   2   3   4   5   6   7      │ │
│  │  8   9  10  11  12  13  14      │ │
│  │ 15  16  17  18  19  20  21      │ │
│  │ 22  23  24  25  26  27  28      │ │
│  │ 29  30  31                      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  All Tasks                             │
│  ┌───────────────────────────────────┐ │
│  │ Task Card                         │ │
│  │ [■] Title | Date | Category      │ │
│  │ [✓] [✎] [🗑]                    │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Health Tracking Layout
```
┌─────────────────────────────────────────┐
│           Navbar (sticky)                │
├─────────────────────────────────────────┤
│  Health Tracking    [Filter] [+ Add]    │
│                                         │
│  ┌──────┐ ┌──────┐ ┌──────┐           │
│  │ Total│ │Urgent│ │Due   │           │
│  └──────┘ └──────┘ └──────┘           │
│                                         │
│  ┌────────────┐ ┌────────────┐         │
│  │ Health     │ │ Health     │         │
│  │ Record     │ │ Record     │         │
│  │ [Icon]     │ │ [Icon]     │         │
│  │ Type: Vac  │ │ Type: Inj  │         │
│  │ Date       │ │ Date       │         │
│  │ Details    │ │ Details    │         │
│  └────────────┘ └────────────┘         │
└─────────────────────────────────────────┘
```

### Reports Layout
```
┌─────────────────────────────────────────┐
│           Navbar (sticky)                │
├─────────────────────────────────────────┤
│  Reports & Exports                       │
│                                         │
│  ┌──────────────┐ ┌──────────────┐     │
│  │ Report       │ │ Report       │     │
│  │ Settings     │ │ Preview      │     │
│  │              │ │              │     │
│  │ Type: Tasks  │ │ Summary      │     │
│  │ Horse: All   │ │ [Export PDF] │     │
│  │ Date Range   │ │ [Export CSV] │     │
│  │              │ │              │     │
│  └──────────────┘ └──────────────┘     │
│                                         │
│  Data Preview                           │
│  ┌───────────────────────────────────┐ │
│  │ Sample Data Rows                  │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Responsive Design

### Desktop (>1024px)
- Full navigation with labels
- Multi-column layouts
- Large calendar grid
- Side-by-side panels

### Tablet (768px - 1024px)
- Condensed navigation
- 2-column grids
- Medium calendar grid
- Stacked panels

### Mobile (<768px)
- Icon-only navigation
- Single-column layouts
- Compact calendar
- Full-width modals
- Touch-optimized buttons

---

## Data Structures

### Horse Object
```javascript
{
  id: number,
  name: string,
  breed: string,
  age: number,
  color: string,
  gender: string,
  medicalHistory: string,
  feedingSchedule: string,
  trainingNotes: string,
  specialRequirements: string,
  emergencyContact: string,
  photo: string
}
```

### Task Object
```javascript
{
  id: number,
  title: string,
  category: 'feeding' | 'grooming' | 'training' | 'medical' | 'farrier' | 'other',
  horseId: number | null,
  date: string (YYYY-MM-DD),
  time: string,
  duration: string,
  recurring: boolean,
  recurringType: 'daily' | 'weekly' | 'monthly',
  recurringInterval: number,
  notes: string,
  completed: boolean
}
```

### Health Record Object
```javascript
{
  id: number,
  type: 'vaccination' | 'injury' | 'illness' | 'checkup' | 'supplement' | 'weight' | 'other',
  horseId: number | null,
  date: string (YYYY-MM-DD),
  description: string,
  veterinarian: string,
  cost: string,
  weight: string,
  temperature: string,
  nextDueDate: string,
  notes: string
}
```

---

## Technical Implementation

### State Management
- React useState hooks for component state
- LocalStorage for data persistence
- Context API for global state (future enhancement)

### Routing
- React Router for navigation
- Client-side routing
- Protected routes (future enhancement)

### Data Persistence
- LocalStorage for offline capability
- Automatic sync on state changes
- Sample data loading on first visit

### Export Functionality
- jsPDF for PDF generation
- PapaParse for CSV export
- Client-side file generation

### Styling
- CSS custom properties for theming
- Modular CSS architecture
- Responsive design with media queries
- CSS animations and transitions

---

## Future Enhancements

### Planned Features
- Cloud sync with backend integration
- User authentication
- Multi-stable support
- Advanced reporting with charts
- Mobile app (React Native)
- Photo upload with cloud storage
- Calendar integration (Google, Apple)
- Veterinary portal integration
- Expense tracking
- Breeding records

### Technical Improvements
- Redux for advanced state management
- WebSocket for real-time updates
- PWA capabilities
- Offline-first architecture
- Advanced caching strategies
- Performance optimization
- Accessibility improvements (WCAG compliance)

---

## Deployment Considerations

### Build Process
- Vite for development and production builds
- Optimized bundle size
- Code splitting
- Tree shaking

### Hosting Options
- Vercel (recommended)
- Netlify
- GitHub Pages
- Custom VPS

### Environment Variables
- API endpoints (future)
- Authentication keys (future)
- Cloud storage credentials (future)

---

## Marketing Materials

### Product Branding
- **Name**: The Velvet Bridle
- **Tagline**: Gothic Luxury Equine Planner
- **Aesthetic**: Dark, elegant, premium

### Target Audience
- Discerning horse owners
- Professional equestrians
- Stable managers
- Horse breeders

### Key Selling Points
- Elegant gothic aesthetic
- Comprehensive horse management
- Offline capability
- Professional reporting
- Premium user experience

---

*This wireframe documentation serves as the foundation for The Velvet Bridle application development and design implementation.*
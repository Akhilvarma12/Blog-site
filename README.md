# Redux-Saga Blog Application

A modern, responsive blog application built with Next.js, Redux, and Redux-Saga, demonstrating clean architecture and best practices.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, Redux, Redux-Saga, TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS and shadcn/ui
- **State Management**: Redux with Redux-Saga for handling side effects
- **API Integration**: JSONPlaceholder API for posts and user data
- **Clean Architecture**: Modular components, separation of concerns, DRY principle
- **Error Handling**: Comprehensive error states and retry functionality
- **Loading States**: Smooth loading indicators throughout the app
- **Type Safety**: Full TypeScript implementation

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (posts list)
│   └── post/[id]/page.tsx # Post detail page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── ErrorDisplay.tsx  # Error display component
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── PostCard.tsx      # Individual post card
│   ├── PostsGrid.tsx     # Posts grid layout
│   └── ReduxProvider.tsx # Redux provider wrapper
├── store/                # Redux store configuration
│   ├── actions.ts        # Action creators and types
│   ├── reducer.ts        # Redux reducer
│   ├── sagas.ts         # Redux-Saga effects
│   └── index.ts         # Store configuration
├── types/               # TypeScript type definitions
│   └── index.ts
├── services/           # API service layer
│   └── api.ts
├── lib/               # Utility functions
│   └── utils.ts
└── Configuration files
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── package.json
\`\`\`

## 🛠️ Installation & Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd redux-saga-blog
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture & Design Patterns

### Redux-Saga Implementation
- **Actions**: Type-safe action creators with proper TypeScript interfaces
- **Reducers**: Pure functions handling state updates
- **Sagas**: Generator functions for handling async operations and side effects

### Component Architecture
- **Separation of Concerns**: Clear separation between UI, state management, and business logic
- **Reusable Components**: Modular components following single responsibility principle
- **DRY Principle**: Shared utilities and components to avoid code duplication

### API Layer
- **Service Pattern**: Centralized API service with error handling
- **Type Safety**: Full TypeScript coverage for API responses
- **Error Handling**: Comprehensive error states and user feedback

## 🎯 Key Features Implemented

### Home Page (Posts List)
- Displays all blog posts in a responsive grid
- Loading states during data fetching
- Error handling with retry functionality
- Responsive design for mobile and desktop

### Post Detail Page
- Detailed view of individual posts
- Author information display
- Navigation back to posts list
- Loading and error states

### State Management
- Redux store with proper action/reducer patterns
- Redux-Saga for async API calls
- Type-safe state management throughout

### UI/UX
- Modern, clean design with shadcn/ui components
- Responsive layout for all screen sizes
- Loading indicators and error messages
- Smooth transitions and hover effects

## 🔧 Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **State Management**: Redux, Redux-Saga
- **Styling**: Tailwind CSS, shadcn/ui
- **API**: JSONPlaceholder (posts, users)
- **Icons**: Lucide React
- **Build Tools**: Next.js built-in tooling

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel or Netlify:

\`\`\`bash
npm run build
npm start
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

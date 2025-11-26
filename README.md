# Math Learning Platform

An interactive, AI-powered math learning platform designed for students in underserved countries. Features step-by-step learning with videos, quizzes, and flashcards.

## Features

- 🎥 **Video Learning**: Khan Academy-style video integration
- 🤖 **AI-Powered Quizzes**: Interactive quizzes with AI explanations
- 📚 **Flashcards**: AI-generated flashcards for concept reinforcement
- 🌍 **Multi-Language Support**: Available in English, Spanish, French, Swahili, and Arabic
- 🎮 **Gamification**: Points and leveling system to motivate students
- 📊 **Progress Tracking**: Track completed lessons and progress
- 🎯 **Grade-Based Learning**: Content tailored to student grade levels
- 🔐 **User Authentication**: Secure signup/login with name, password, and grade selection

## Learning Flow

The platform follows an alternating pattern:
1. **Watch Video** → Learn concepts through Khan Academy videos
2. **Take Quiz** → Test understanding with AI-powered questions
3. **Practice Flashcards** → Reinforce learning with interactive flashcards
4. **Earn Points** → Get rewarded for completing lessons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
offklassui/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── learn/            # Learning flow pages
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home/auth page
├── components/            # React components
│   ├── AuthPage.tsx      # Authentication UI
│   ├── Dashboard.tsx     # Main dashboard
│   ├── LearningFlow.tsx # Learning flow controller
│   ├── VideoPlayer.tsx   # Video player component
│   ├── QuizInterface.tsx # Quiz component
│   └── FlashcardInterface.tsx # Flashcard component
├── lib/                   # Utilities and services
│   ├── store.ts          # Zustand state management
│   ├── translations.ts   # Multi-language support
│   ├── ai-service.ts     # AI service (quizzes/flashcards)
│   └── lessons.ts        # Lesson data
└── package.json          # Dependencies
```

## Technologies Used

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Zustand**: State management
- **Framer Motion**: Animations
- **React Player**: Video playback
- **Lucide React**: Icons

## Customization

### Adding New Languages

Edit `lib/translations.ts` to add new language support.

### Adding Lessons

Add lessons to `lib/lessons.ts` with video URLs and grade levels.

### AI Integration

The platform uses OpenAI API (GPT-4o-mini) for generating:
- **Quizzes**: Dynamic quiz questions based on lesson content
- **Flashcards**: Concept flashcards with explanations
- **Explanations**: Detailed concept explanations

The AI service is configured via API routes in `app/api/`:
- `/api/quiz` - Generates quiz questions
- `/api/flashcards` - Generates flashcards
- `/api/explain` - Generates concept explanations

All AI responses are tailored to the student's grade level and selected language.

## Features for Underserved Countries

- **Low Bandwidth Optimized**: Efficient loading and caching
- **Offline Capable**: Can be extended with service workers
- **Multi-Language**: Supports languages common in underserved regions
- **Simple UI**: Intuitive design that works on various devices
- **No Complex Setup**: Easy to deploy and use

## License

MIT


import { createRoot } from 'react-dom/client';
import App from './App';
import QuizApp from './quiz/QuizApp';
import './index.css';

// ?app=quiz -> the spoken-quiz archetype (its own flow); every other app is a slot-filling DomainConfig.
const isQuiz = /[?&]app=quiz(&|$)/.test(location.search) || import.meta.env.VITE_APP === 'quiz';
createRoot(document.getElementById('root')!).render(isQuiz ? <QuizApp /> : <App />);

// Offline shell: cache app, strings and extraction rules.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* offline caching is a bonus, never block the app */
    });
  });
}

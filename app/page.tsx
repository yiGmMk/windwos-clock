import { BackgroundManager } from './components/BackgroundManager';
import { Clock } from './components/Clock';

export default function Home() {
  return (
    <BackgroundManager>
      <Clock width={300} height={300} />
    </BackgroundManager>
  );
}


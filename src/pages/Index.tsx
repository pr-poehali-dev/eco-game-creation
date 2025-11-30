import { useState } from 'react';
import GameStart from '@/components/game/GameStart';
import GamePlay from '@/components/game/GamePlay';
import GameResults from '@/components/game/GameResults';
import { scenarios, initialAchievements, Achievement } from '@/components/game/types';

export default function Index() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [leaderboard] = useState([
    { rank: 1, name: 'Анна К.', score: 750, solutions: 'Полный запрет пластика + возобновляемая энергия' },
    { rank: 2, name: 'Дмитрий В.', score: 720, solutions: 'Устойчивое лесопользование + очистные сооружения' },
    { rank: 3, name: 'Елена М.', score: 690, solutions: 'Национальные парки + органическое земледелие' },
    { rank: 4, name: 'Игорь С.', score: 650, solutions: 'Энергосбережение + защита опылителей' },
    { rank: 5, name: 'Мария П.', score: 620, solutions: 'Очистка океана + общественный контроль' }
  ]);

  const handleOptionSelect = (optionIndex: number) => {
    const option = scenarios[currentScenario].options[optionIndex];
    const newScore = score + option.points;
    setScore(newScore);
    setFeedback(option.impact);
    setSelectedOptions([...selectedOptions, optionIndex]);
    
    const newSolvedCount = solvedCount + 1;
    setSolvedCount(newSolvedCount);

    const updatedAchievements = achievements.map(ach => {
      if (ach.id === 'first' && newSolvedCount >= 1) return { ...ach, unlocked: true };
      if (ach.id === 'expert' && newSolvedCount >= 5) return { ...ach, unlocked: true };
      if (ach.id === 'master' && newScore >= 600) return { ...ach, unlocked: true };
      if (ach.id === 'perfect' && newScore >= 750) return { ...ach, unlocked: true };
      return ach;
    });
    setAchievements(updatedAchievements);

    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(currentScenario + 1);
        setFeedback('');
      } else {
        setGameFinished(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentScenario(0);
    setScore(0);
    setSolvedCount(0);
    setSelectedOptions([]);
    setFeedback('');
    setGameStarted(false);
    setGameFinished(false);
    setAchievements(initialAchievements);
  };

  if (!gameStarted) {
    return (
      <GameStart 
        achievements={achievements}
        onStartGame={() => setGameStarted(true)}
      />
    );
  }

  if (gameFinished) {
    return (
      <GameResults
        score={score}
        achievements={achievements}
        selectedOptions={selectedOptions}
        scenarios={scenarios}
        leaderboard={leaderboard}
        onRestart={resetGame}
        onBackToHome={() => setGameStarted(false)}
      />
    );
  }

  return (
    <GamePlay
      scenario={scenarios[currentScenario]}
      currentScenario={currentScenario}
      totalScenarios={scenarios.length}
      score={score}
      feedback={feedback}
      achievements={achievements}
      onOptionSelect={handleOptionSelect}
      onReset={resetGame}
    />
  );
}

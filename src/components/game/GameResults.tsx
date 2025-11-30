import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Achievement, Scenario } from './types';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  solutions: string;
}

interface GameResultsProps {
  score: number;
  achievements: Achievement[];
  selectedOptions: number[];
  scenarios: Scenario[];
  leaderboard: LeaderboardEntry[];
  onRestart: () => void;
  onBackToHome: () => void;
}

export default function GameResults({
  score,
  achievements,
  selectedOptions,
  scenarios,
  leaderboard,
  onRestart,
  onBackToHome
}: GameResultsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green/10 via-background to-eco-blue/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-xl animate-scale-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-eco-green rounded-full mb-6 animate-pulse-glow">
                <Icon name="Trophy" size={48} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Игра завершена!</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Вы набрали <span className="text-eco-green font-bold text-3xl">{score}</span> из 750 баллов
              </p>
              <div className="flex justify-center gap-4 mb-8">
                {achievements.filter(a => a.unlocked).map(ach => (
                  <div key={ach.id} className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 bg-eco-green rounded-full flex items-center justify-center">
                      <Icon name={ach.icon} size={28} className="text-white" />
                    </div>
                    <span className="text-xs font-medium">{ach.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="BarChart3" size={28} className="text-eco-blue" />
                Глобальный рейтинг
              </h2>
              <div className="space-y-3">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`p-4 rounded-lg border-2 ${
                      entry.rank <= 3
                        ? 'border-eco-yellow bg-eco-yellow/5'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        entry.rank === 1 ? 'bg-eco-yellow text-white' :
                        entry.rank === 2 ? 'bg-gray-400 text-white' :
                        entry.rank === 3 ? 'bg-orange-600 text-white' :
                        'bg-muted text-foreground'
                      }`}>
                        {entry.rank}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold">{entry.name}</span>
                          <Badge variant="secondary" className="font-bold">{entry.score} баллов</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{entry.solutions}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-4 rounded-lg border-2 border-eco-green bg-eco-green/10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-eco-green text-white">
                      {score >= 690 ? '3' : score >= 620 ? '5' : '6'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">Вы (Новый игрок)</span>
                        <Badge className="bg-eco-green font-bold">{score} баллов</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedOptions.map((opt, idx) => scenarios[idx].options[opt].points).join(', ')} баллов по сценариям
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={onRestart}>
                <Icon name="RotateCcw" size={20} className="mr-2" />
                Играть снова
              </Button>
              <Button size="lg" variant="outline" className="flex-1" onClick={onBackToHome}>
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

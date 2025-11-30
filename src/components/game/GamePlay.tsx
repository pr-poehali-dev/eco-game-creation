import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Scenario, Achievement } from './types';

interface GamePlayProps {
  scenario: Scenario;
  currentScenario: number;
  totalScenarios: number;
  score: number;
  feedback: string;
  achievements: Achievement[];
  onOptionSelect: (index: number) => void;
  onReset: () => void;
}

export default function GamePlay({
  scenario,
  currentScenario,
  totalScenarios,
  score,
  feedback,
  achievements,
  onOptionSelect,
  onReset
}: GamePlayProps) {
  const progress = ((currentScenario + 1) / totalScenarios) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green/10 via-background to-eco-blue/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Сценарий {currentScenario + 1} из {totalScenarios}
                </div>
                <Badge variant="secondary" className="text-sm font-bold">
                  <Icon name="Coins" size={16} className="mr-1" />
                  {score} баллов
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={onReset}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          <Card className="p-8 shadow-xl mb-6 animate-scale-in">
            <div className="flex items-start gap-6 mb-6">
              <div className={`w-20 h-20 bg-${scenario.color}/20 rounded-full flex items-center justify-center flex-shrink-0`}>
                <Icon name={scenario.icon} size={40} className={`text-${scenario.color}`} />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-3">{scenario.title}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {scenario.description}
                </p>
              </div>
            </div>

            {feedback && (
              <div className="mb-6 p-4 bg-eco-green/10 border-2 border-eco-green rounded-lg animate-fade-in">
                <div className="flex items-start gap-3">
                  <Icon name="Lightbulb" size={24} className="text-eco-green flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{feedback}</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {scenario.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full h-auto p-4 text-left justify-start hover:border-eco-green hover:bg-eco-green/5 transition-all disabled:opacity-50"
                  onClick={() => onOptionSelect(index)}
                  disabled={!!feedback}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-semibold">
                      {index + 1}
                    </div>
                    <span className="flex-1 text-base">{option.text}</span>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6 shadow-lg">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="Award" size={20} className="text-eco-green" />
              Прогресс достижений
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    ach.unlocked
                      ? 'border-eco-green bg-eco-green/5'
                      : 'border-border bg-muted/30 opacity-40'
                  }`}
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    ach.unlocked ? 'bg-eco-green' : 'bg-muted'
                  }`}>
                    <Icon name={ach.icon} size={20} className="text-white" />
                  </div>
                  <p className="text-xs font-medium">{ach.title}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

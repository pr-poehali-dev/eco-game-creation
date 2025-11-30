import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Achievement } from './types';

interface GameStartProps {
  achievements: Achievement[];
  onStartGame: () => void;
}

export default function GameStart({ achievements, onStartGame }: GameStartProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green/10 via-background to-eco-blue/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-eco-green rounded-full mb-6 animate-pulse-glow">
              <Icon name="Leaf" size={40} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-eco-green to-eco-blue bg-clip-text text-transparent">
              Эко-Герои
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Спасите планету принимая верные экологические решения
            </p>
          </div>

          <Tabs defaultValue="game" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="game">🎮 Игра</TabsTrigger>
              <TabsTrigger value="about">📖 О проекте</TabsTrigger>
              <TabsTrigger value="achievements">🏆 Достижения</TabsTrigger>
            </TabsList>

            <TabsContent value="game" className="animate-fade-in">
              <Card className="p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-eco-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name="Gamepad2" size={32} className="text-eco-green" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">Правила игры</h2>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={20} className="text-eco-green mt-0.5 flex-shrink-0" />
                          <span>Вам предстоит решить 5 реальных экологических проблем</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={20} className="text-eco-green mt-0.5 flex-shrink-0" />
                          <span>Каждое решение оценивается баллами (0-150)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={20} className="text-eco-green mt-0.5 flex-shrink-0" />
                          <span>Максимально можно набрать 750 баллов</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="CheckCircle2" size={20} className="text-eco-green mt-0.5 flex-shrink-0" />
                          <span>Открывайте достижения и попадайте в рейтинг</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full text-lg h-14"
                    onClick={onStartGame}
                  >
                    <Icon name="Play" size={24} className="mr-2" />
                    Начать игру
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="about" className="animate-fade-in">
              <Card className="p-8 shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-eco-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Info" size={32} className="text-eco-blue" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">О проекте Эко-Герои</h2>
                    <p className="text-muted-foreground">
                      Образовательная игра для развития экологического мышления
                    </p>
                  </div>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Эко-Герои</strong> — это интерактивная игра, которая помогает 
                    понять сложность экологических проблем и научиться принимать взвешенные решения.
                  </p>
                  <p>
                    В игре представлены реальные экологические сценарии: загрязнение океана, вырубка лесов, 
                    энергетический кризис, промышленные выбросы и исчезновение опылителей. Каждая ситуация 
                    требует баланса между экономическими интересами и защитой природы.
                  </p>
                  <p>
                    <strong className="text-foreground">Цель проекта:</strong> показать, что экологические проблемы 
                    решаемы, если подходить к ним системно и ответственно. Лучшие решения игроков попадают в 
                    глобальный рейтинг и могут вдохновить других на реальные действия.
                  </p>
                  <div className="flex gap-2 flex-wrap pt-4">
                    <Badge variant="secondary" className="text-sm">Образование</Badge>
                    <Badge variant="secondary" className="text-sm">Экология</Badge>
                    <Badge variant="secondary" className="text-sm">Устойчивое развитие</Badge>
                    <Badge variant="secondary" className="text-sm">Геймификация</Badge>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="animate-fade-in">
              <Card className="p-8 shadow-xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-eco-yellow/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Trophy" size={32} className="text-eco-yellow" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Достижения</h2>
                    <p className="text-muted-foreground">
                      Открывайте награды за экологические успехи
                    </p>
                  </div>
                </div>
                <div className="grid gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        achievement.unlocked
                          ? 'border-eco-green bg-eco-green/5'
                          : 'border-border bg-muted/30 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.unlocked ? 'bg-eco-green' : 'bg-muted'
                        }`}>
                          <Icon name={achievement.icon} size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="bg-eco-green text-white">Открыто</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

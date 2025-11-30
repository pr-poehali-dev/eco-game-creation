import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Scenario {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  options: {
    text: string;
    points: number;
    impact: string;
  }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: number;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: 'Пластиковое загрязнение океана',
    description: 'В океане образовалось огромное скопление пластикового мусора. Морские животные страдают от загрязнения. Что предпринять?',
    icon: 'Waves',
    color: 'eco-blue',
    options: [
      { text: 'Организовать масштабную очистку океана с помощью специальных судов', points: 100, impact: 'Отличное решение! Механическая очистка поможет быстро убрать мусор' },
      { text: 'Запретить одноразовый пластик и внедрить переработку', points: 150, impact: 'Превосходно! Профилактика важнее лечения - вы решаете проблему у источника' },
      { text: 'Запустить образовательную кампанию об опасности пластика', points: 80, impact: 'Хорошее начало! Просвещение важно, но нужны и практические меры' },
      { text: 'Ничего не делать, природа сама справится', points: 0, impact: 'К сожалению, пластик разлагается сотни лет. Нужны активные действия!' }
    ]
  },
  {
    id: 2,
    title: 'Вырубка тропических лесов',
    description: 'Крупная корпорация планирует вырубить участок тропического леса для плантаций. Как сохранить экосистему?',
    icon: 'Trees',
    color: 'eco-green',
    options: [
      { text: 'Создать национальный парк и запретить вырубку', points: 120, impact: 'Отличная стратегия! Защищенные территории сохраняют биоразнообразие' },
      { text: 'Предложить компенсацию и альтернативные земли', points: 90, impact: 'Разумный компромисс, но нужен контроль за соблюдением условий' },
      { text: 'Разработать устойчивое лесопользование с контролем', points: 140, impact: 'Превосходно! Баланс между экономикой и экологией - лучший подход' },
      { text: 'Разрешить вырубку за налоги', points: 20, impact: 'Плохое решение. Тропические леса невосстановимы за короткий срок' }
    ]
  },
  {
    id: 3,
    title: 'Энергетический кризис города',
    description: 'Город испытывает дефицит электроэнергии. Старые электростанции загрязняют воздух. Какое решение выбрать?',
    icon: 'Zap',
    color: 'eco-orange',
    options: [
      { text: 'Построить новую угольную электростанцию', points: 30, impact: 'Неэкологичное решение. Углекислый газ усиливает климатические изменения' },
      { text: 'Инвестировать в солнечные и ветровые станции', points: 150, impact: 'Превосходно! Возобновляемая энергия - будущее чистой энергетики' },
      { text: 'Модернизировать старые станции с фильтрами', points: 80, impact: 'Хорошее временное решение, но не решает проблему выбросов' },
      { text: 'Запустить программу энергосбережения для населения', points: 110, impact: 'Отлично! Снижение потребления - самый эффективный путь' }
    ]
  },
  {
    id: 4,
    title: 'Загрязнение реки промышленными отходами',
    description: 'Завод сбрасывает химические отходы в реку. Местные жители и животные отравлены. Срочные меры?',
    icon: 'Droplet',
    color: 'eco-blue',
    options: [
      { text: 'Закрыть завод и провести очистку реки', points: 130, impact: 'Радикально, но эффективно! Здоровье людей важнее прибыли' },
      { text: 'Штрафовать завод и требовать установки очистных сооружений', points: 150, impact: 'Идеально! Вы даете шанс бизнесу измениться и защищаете природу' },
      { text: 'Перенести водозабор выше по течению', points: 40, impact: 'Это не решает проблему, а лишь перекладывает ее на других' },
      { text: 'Организовать общественный контроль и мониторинг', points: 90, impact: 'Хороший шаг! Прозрачность заставит завод действовать' }
    ]
  },
  {
    id: 5,
    title: 'Исчезновение пчел и опылителей',
    description: 'В регионе массово гибнут пчелы из-за пестицидов. Урожай под угрозой. Как спасти опылителей?',
    icon: 'Bug',
    color: 'eco-yellow',
    options: [
      { text: 'Запретить опасные пестициды и перейти на органическое земледелие', points: 150, impact: 'Превосходно! Вы спасаете не только пчел, но и здоровье людей' },
      { text: 'Создать заповедные зоны с медоносными растениями', points: 100, impact: 'Отличная идея! Пчелам нужны безопасные места для жизни' },
      { text: 'Разводить пчел искусственно на пасеках', points: 70, impact: 'Неплохо, но не решает главную проблему - отравление химикатами' },
      { text: 'Использовать роботов-опылителей', points: 50, impact: 'Дорого и неэффективно. Лучше сохранить живых опылителей' }
    ]
  }
];

const initialAchievements: Achievement[] = [
  { id: 'first', title: 'Первые шаги', description: 'Решите первую экологическую проблему', icon: 'Target', unlocked: false, requirement: 1 },
  { id: 'expert', title: 'Эко-эксперт', description: 'Решите все 5 проблем', icon: 'Award', unlocked: false, requirement: 5 },
  { id: 'master', title: 'Мастер экологии', description: 'Наберите более 600 баллов', icon: 'Trophy', unlocked: false, requirement: 600 },
  { id: 'perfect', title: 'Идеальный результат', description: 'Выберите все лучшие решения (750 баллов)', icon: 'Star', unlocked: false, requirement: 750 }
];

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
                      onClick={() => setGameStarted(true)}
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

  if (gameFinished) {
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
                <Button size="lg" className="flex-1" onClick={resetGame}>
                  <Icon name="RotateCcw" size={20} className="mr-2" />
                  Играть снова
                </Button>
                <Button size="lg" variant="outline" className="flex-1" onClick={() => setGameStarted(false)}>
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

  const scenario = scenarios[currentScenario];
  const progress = ((currentScenario + 1) / scenarios.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green/10 via-background to-eco-blue/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Сценарий {currentScenario + 1} из {scenarios.length}
                </div>
                <Badge variant="secondary" className="text-sm font-bold">
                  <Icon name="Coins" size={16} className="mr-1" />
                  {score} баллов
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={resetGame}>
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
                  onClick={() => handleOptionSelect(index)}
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

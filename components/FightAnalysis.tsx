"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

type FighterInfo = {
  height: string;
  weight: string;
  age: string;
  gender: "Male" | "Female";
  athletic: "Yes" | "No";
  fightExperience: "None" | "One" | "2 to 4" | "5+ Fights";
  personality: "Laid back/Chill" | "Pacifist/Non-confrontational" | "Aggressive/Outspoken";
  fightingDisciplines?: ("Boxing" | "Wrestling" | "MMA")[];
};

type FighterStats = {
  strength: number;
  speed: number;
  technique: number;
  experience: number;
  endurance: number;
  agility: number;
  power: number;
  mentalToughness: number;
  bmi: number;
};

type FightAnalysisProps = {
  userInfo: FighterInfo;
  opponentInfo: FighterInfo;
};

function calculateBMI(height: string, weight: string): number {
  const [feet, inches] = height.split("'").map(Number);
  const totalInches = feet * 12 + (inches || 0);
  const heightInMeters = totalInches * 0.0254;
  const weightInKg = Number(weight) * 0.453592;
  return weightInKg / (heightInMeters * heightInMeters);
}

function calculateBreakdown(info: FighterInfo): FighterStats {
  const bmi = calculateBMI(info.height, info.weight);
  let strength = Math.min(100, parseInt(info.weight) * 0.4);
  let speed = Math.max(0, 100 - (parseInt(info.age) - 20) * 1.5);

  // Apply BMI penalties
  if (bmi > 25) {
    const overweightPenalty = (bmi - 25) * 2;
    strength = Math.max(0, strength - overweightPenalty);
    speed = Math.max(0, speed - overweightPenalty * 1.5);
  }

  let technique = info.fightExperience === "None" ? 10 : info.fightExperience === "One" ? 30 : info.fightExperience === "2 to 4" ? 60 : 90;
  let experience = info.fightExperience === "None" ? 10 : info.fightExperience === "One" ? 30 : info.fightExperience === "2 to 4" ? 60 : 90;
  
  let endurance = Math.max(0, 100 - (parseInt(info.age) - 20));
  let agility = (speed + technique) / 2;
  let power = (strength + speed) / 2;
  
  let mentalToughness = info.personality === "Aggressive/Outspoken" ? 80 : info.personality === "Laid back/Chill" ? 60 : 40;
  mentalToughness += experience * 0.2;

  // Factor in fighting disciplines
  if (info.fightingDisciplines) {
    if (info.fightingDisciplines.includes("Boxing")) {
      technique += 10;
      power += 5;
    }
    if (info.fightingDisciplines.includes("Wrestling")) {
      strength += 10;
      endurance += 5;
    }
    if (info.fightingDisciplines.includes("MMA")) {
      technique += 15;
      agility += 10;
    }
  }

  return {
    strength: Math.min(100, strength),
    speed: Math.min(100, speed),
    technique: Math.min(100, technique),
    experience: Math.min(100, experience),
    endurance: Math.min(100, endurance),
    agility: Math.min(100, agility),
    power: Math.min(100, power),
    mentalToughness: Math.min(100, mentalToughness),
    bmi: parseFloat(bmi.toFixed(2)),
  };
}

export default function FightAnalysis({ userInfo, opponentInfo }: FightAnalysisProps) {
  const [userStats, setUserStats] = useState<FighterStats | null>(null);
  const [opponentStats, setOpponentStats] = useState<FighterStats | null>(null);
  const [analysis, setAnalysis] = useState<string>("");

  useEffect(() => {
    const user = calculateBreakdown(userInfo);
    const opponent = calculateBreakdown(opponentInfo);
    setUserStats(user);
    setOpponentStats(opponent);

    // Calculate overall score
    const userScore = Object.values(user).reduce((a, b) => a + b, 0);
    const opponentScore = Object.values(opponent).reduce((a, b) => a + b, 0);
    const scoreDifference = userScore - opponentScore;

    // Generate analysis based on score difference
    if (scoreDifference > 100) {
      setAnalysis("Based on the information provided, You would win easily");
    } else if (scoreDifference > 50) {
      setAnalysis("Based on the info provided, You should win with some difficulty");
    } else if (scoreDifference > 0) {
      setAnalysis("Based on the info provided, You should win with high difficulty");
    } else if (scoreDifference > -50) {
      setAnalysis("Based on the info provided, It could go either way");
    } else if (scoreDifference > -100) {
      setAnalysis("Based on the info provided, You will lose but put up a fight");
    } else if (scoreDifference > -150) {
      setAnalysis("Based on the info provided, you will get beaten badly");
    } else {
      setAnalysis("Based on the info provided, You will get destroyed, do not fight them");
    }
  }, [userInfo, opponentInfo]);

  if (!userStats || !opponentStats) {
    return <div>Loading...</div>;
  }

  const comparisonData = [
    { name: 'Strength', user: userStats.strength, opponent: opponentStats.strength },
    { name: 'Speed', user: userStats.speed, opponent: opponentStats.speed },
    { name: 'Technique', user: userStats.technique, opponent: opponentStats.technique },
    { name: 'Experience', user: userStats.experience, opponent: opponentStats.experience },
    { name: 'Endurance', user: userStats.endurance, opponent: opponentStats.endurance },
    { name: 'Agility', user: userStats.agility, opponent: opponentStats.agility },
    { name: 'Power', user: userStats.power, opponent: opponentStats.power },
    { name: 'Mental Toughness', user: userStats.mentalToughness, opponent: opponentStats.mentalToughness },
  ];

  const radarData = [
    { subject: 'Strength', A: userStats.strength, B: opponentStats.strength, fullMark: 100 },
    { subject: 'Speed', A: userStats.speed, B: opponentStats.speed, fullMark: 100 },
    { subject: 'Technique', A: userStats.technique, B: opponentStats.technique, fullMark: 100 },
    { subject: 'Experience', A: userStats.experience, B: opponentStats.experience, fullMark: 100 },
    { subject: 'Endurance', A: userStats.endurance, B: opponentStats.endurance, fullMark: 100 },
    { subject: 'Agility', A: userStats.agility, B: opponentStats.agility, fullMark: 100 },
    { subject: 'Power', A: userStats.power, B: opponentStats.power, fullMark: 100 },
    { subject: 'Mental Toughness', A: userStats.mentalToughness, B: opponentStats.mentalToughness, fullMark: 100 },
  ];

  return (
    <div className="mt-8 space-y-8 animate-fade-in-down">
      <Card className="glass border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Fight Analysis</CardTitle>
          <CardDescription className="text-xl font-semibold">{analysis}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Your Stats</h3>
              {Object.entries(userStats).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className="text-sm font-medium">{value.toFixed(1)}</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Opponent Stats</h3>
              {Object.entries(opponentStats).map(([key, value]) => (
                <div key={key} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                    <span className="text-sm font-medium">{value.toFixed(1)}</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-primary/20">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Comparison Charts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="user" fill="#8884d8" name="You" />
                <Bar dataKey="opponent" fill="#82ca9d" name="Opponent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="You" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Opponent" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import Header from '@/components/Header';
import FightForm from '@/components/FightForm';
import FeatureCards from '@/components/FeatureCards';
import DynamicBackground from '@/components/DynamicBackground';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <DynamicBackground />
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 mb-4">
            Welcome to FightCord
          </h1>
          <p className="text-xl text-secondary-foreground max-w-2xl mx-auto">
            Unleash your inner warrior! Compare your fighting potential against others and get a detailed analysis of your combat prowess.
          </p>
        </div>
        <FeatureCards />
        <FightForm />
      </main>
    </div>
  );
}
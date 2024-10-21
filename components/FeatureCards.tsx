import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Scale, Users } from "lucide-react"

const features = [
  {
    title: "Detailed Analysis",
    description: "Get a comprehensive breakdown of your fighting potential.",
    icon: BarChart3,
  },
  {
    title: "Compare Metrics",
    description: "See how you stack up against your opponent in various categories.",
    icon: Scale,
  },
  {
    title: "Personalized Results",
    description: "Receive tailored insights based on your unique characteristics.",
    icon: Users,
  },
]

export default function FeatureCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
      {features.map((feature, index) => (
        <Card key={index} className="glass border-primary/20 hover:glow transition-all duration-300">
          <CardHeader>
            <feature.icon className="h-12 w-12 mb-4 text-primary" />
            <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
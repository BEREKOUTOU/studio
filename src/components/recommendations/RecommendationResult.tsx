import type { RecommendedVehicle } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Check } from 'lucide-react'; // Example icons

interface RecommendationResultProps {
  recommendations: RecommendedVehicle[];
}

export function RecommendationResult({ recommendations }: RecommendationResultProps) {
  if (recommendations.length === 0) {
    return <p className="text-center text-muted-foreground mt-6">No recommendations available at the moment.</p>;
  }

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-2xl font-semibold text-secondary-foreground">AI Powered Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden flex flex-col">
            <CardHeader className="bg-muted/50 p-4">
              <CardTitle className="text-xl font-headline text-primary">{rec.brand} {rec.model}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <div className="flex items-center mb-2">
                 <Star className="h-5 w-5 text-yellow-400 mr-2" /> 
                <p className="text-sm font-semibold">Recommendation Reason:</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{rec.reason}</p>
            </CardContent>
            <CardFooter className="p-4 border-t bg-muted/20">
                <Badge variant="default" className="bg-accent text-accent-foreground">
                    <Check className="mr-1.5 h-4 w-4"/> Popular Choice
                </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

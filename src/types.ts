export interface ProblemCard {
  id: string;
  title: string;
  description: string;
  impact: string;
}

export interface BenefitCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TimelineStep {
  step: number;
  title: string;
  shortDesc: string;
  detail: string;
  badge?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'tariffs' | 'logistics' | 'pilot';
}

export interface RoadmapStage {
  stage: number;
  title: string;
  badge: string;
  points: string[];
}

export interface EligibilityCategory {
  status: 'approved' | 'review' | 'rejected';
  title: string;
  badgeText: string;
  description: string;
  items: string[];
}

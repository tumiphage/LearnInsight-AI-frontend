'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Info, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import {
  FEATURE_LABELS, PREDICTION_STORAGE_KEY,
  isPredictionResponse, type StoredPrediction, type PredictionFeatures,
} from '@/lib/prediction-api';

// Independently measured in the user's OULAD BBB/2014B holdout notebook (n = 256),
// NOT generated dynamically for all students and NOT percentages.
const verifiedGlobalLowShap = [
  { feature: 'Active VLE Days', importance: 1.0945 },
  { feature: 'Recent Clicks', importance: 0.2830 },
  { feature: 'Forum Clicks', importance: 0.2021 },
  { feature: 'Total Clicks', importance: 0.1724 },
];

export default function ExplainablePage() {
  const [latest, setLatest] = useState<StoredPrediction | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(PREDICTION_STORAGE_KEY);
      if (!saved) return;
      const parsed: unknown = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && 'response' in parsed && 'inputs' in parsed) {
        const record = parsed as { response: unknown; inputs: unknown };
        if (isPredictionResponse(record.response) && record.inputs && typeof record.inputs === 'object') {
          setLatest(record as StoredPrediction);
        }
      }
    } catch { /* No local prediction session. */ }
  }, []);

  const values = latest?.response.explanation.contributions;
  const localContributions = values
    ? (Object.keys(FEATURE_LABELS) as (keyof PredictionFeatures)[])
        .map(k => ({ feature: FEATURE_LABELS[k].split(' (')[0], value: values[k] }))
        .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
    : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader title="Explainable AI" subtitle="Verified global SHAP findings and live student-level model explanations" />
      <Card className="mb-6 border-border shadow-sm">
        <CardContent className="p-4 sm:p-5 flex gap-3 items-start">
          <Info className="h-5 w-5 shrink-0 mt-0.5 text-primary"/>
          <div>
            <p className="text-sm font-semibold">What do these values mean?</p>
            <p className="text-sm text-muted-foreground mt-1">SHAP contributions explain changes in the Logistic Regression <strong>class score</strong>, not percentages of failure risk. Their sign is interpreted relative to the particular class being explained. The model predicts future activity (days 28–55) from earlier LMS interactions (days 0–27). Explanations do not establish causality.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex gap-2 items-center"><Brain className="w-5 h-5 text-primary"/> Global SHAP Importance — Low Engagement</CardTitle>
            <p className="text-xs text-muted-foreground">Verified offline experiment: mean absolute class-score contributions, 256 holdout students (OULAD BBB/2014B).</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={310}>
              <BarChart data={verifiedGlobalLowShap} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickLine={false} />
                <YAxis type="category" dataKey="feature" tickLine={false} width={116} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [v.toFixed(4), 'Mean |SHAP| (score units)']} />
                <Bar dataKey="importance" fill="hsl(var(--primary))" radius={[0,4,4,0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-muted-foreground">These fixed values are measured research findings from the notebook—not dynamically computed or fabricated user predictions.</p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader><CardTitle className="text-base flex gap-2 items-center"><Sparkles className="w-5 h-5 text-primary"/> Latest Student Explanation</CardTitle></CardHeader>
          <CardContent>
            {!latest ? (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground mb-4">No live explanation has been generated in this browser session.</p>
                <Link href="/prediction" className="text-sm font-medium text-primary underline">Run a model prediction first</Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm">Predicted: <strong>{latest.response.predicted_engagement} future engagement</strong> — explanation for the <strong>{latest.response.explanation.explained_class}</strong> class.</p>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={localContributions} layout="vertical" margin={{ left: 8, right: 16 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                    <XAxis type="number" tickLine={false}/>
                    <YAxis type="category" dataKey="feature" tickLine={false} width={125} tick={{ fontSize: 11 }}/>
                    <Tooltip formatter={(v: number) => [`${v >= 0 ? '+' : ''}${v.toFixed(4)} score units`, 'SHAP']}/>
                    <Bar dataKey="value" barSize={20}>
                      {localContributions.map((d, i) => <Cell key={i} fill={d.value >= 0 ? 'hsl(var(--primary))' : 'hsl(var(--warning))'}/>)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-xs text-muted-foreground">Raw inputs: {Object.entries(latest.inputs).map(([k,v]) => `${k}: ${v}`).join(' · ')}</p>
                <p className="text-sm">Baseline {latest.response.explanation.baseline.toFixed(4)} + SHAP contributions = score {latest.response.explanation.final_class_score.toFixed(4)}.</p>
                <Link href="/prediction" className="text-sm text-primary underline">Run another prediction</Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Card className="border-border shadow-sm">
        <CardHeader><CardTitle className="text-base">Model Validation Context</CardTitle></CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Selected by five-fold training cross-validation: Logistic Regression. Independent test set: 256 students.</p>
          <p>Holdout accuracy: 65.62%. Macro F1: 0.6422. Recall for Low engagement: 66.30% (61 of 92 Low cases detected).</p>
          <p>These figures describe the historical BBB/2014B experiment, not individual prediction confidence or guaranteed performance on a new institution.</p>
          <p>Academic intervention decisions require additional context and human review.</p>
        </CardContent>
      </Card>
    </div>
  );
}

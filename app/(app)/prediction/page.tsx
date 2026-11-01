'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Brain, Loader2, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import {
  CLASS_ORDER, FEATURE_LABELS, PREDICTION_STORAGE_KEY,
  isPredictionResponse, validatePredictionInput,
  type PredictionFeatures, type PredictionResponse,
} from '@/lib/prediction-api';

const keys = Object.keys(FEATURE_LABELS) as (keyof PredictionFeatures)[];
const example: PredictionFeatures = { total_clicks: 14, active_days: 4, clicks_last_7_days: 0, forum_clicks: 0 };

export default function PredictionPage() {
  const [inputs, setInputs] = useState<PredictionFeatures>({ ...example });
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePredict(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);
    const errorText = validatePredictionInput(inputs);
    if (errorText) { setError(errorText); return; }

    setLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
        cache: 'no-store',
      });
      const data: unknown = await response.json();
      if (!response.ok) {
        const detail = (data && typeof data === 'object' && 'detail' in data) ? (data as { detail: unknown }).detail : null;
        throw new Error(typeof detail === 'string' ? detail : `Prediction request failed (HTTP ${response.status}).`);
      }
      if (!isPredictionResponse(data)) throw new Error('Unexpected model response format.');
      setResult(data);
      try { sessionStorage.setItem(PREDICTION_STORAGE_KEY, JSON.stringify({ inputs, response: data })); } catch { /* Optional local page-to-page state. */ }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The prediction could not be completed.');
    } finally {
      setLoading(false);
    }
  }

  const contributionData = result
    ? keys.map(key => ({ feature: FEATURE_LABELS[key].split(' (')[0], value: result.explanation.contributions[key] }))
        .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
    : [];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
      <PageHeader title="Future Engagement Prediction" subtitle="Live inference using the OULAD BBB/2014B Logistic Regression model (days 0–27 → days 28–55)" />
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader><CardTitle className="text-base flex gap-2 items-center"><Brain className="h-5 w-5 text-primary"/> Early LMS Interaction Features</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-5">Enter four non-negative whole-number features from the first 28 days of the module. These inputs must be calculated using the same definitions used during model training.</p>
            <form onSubmit={handlePredict} className="space-y-5">
              {keys.map(key => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key}>{FEATURE_LABELS[key]}</Label>
                  <Input id={key} type="number" min={0} step={1} max={key === 'active_days' ? 28 : undefined} required value={Number.isNaN(inputs[key]) ? '' : inputs[key]}
                    onChange={(event) => setInputs(previous => ({ ...previous, [key]: event.target.value === '' ? NaN : Number(event.target.value) }))} />
                </div>
              ))}
              {error && <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>}
              <Button type="submit" disabled={loading} className="w-full gap-2" size="lg">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin"/> Calling trained model...</> : <><Sparkles className="h-4 w-4"/> Generate Real Prediction</>}
              </Button>
              <p className="text-xs text-muted-foreground">Sample input (14, 4, 0, 0) matches the research notebook test case. No output is simulated. If the API is offline, an error will appear.</p>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4 sm:space-y-6">
          {!result && (
            <Card className="border-border border-dashed min-h-[220px] flex items-center justify-center">
              <CardContent className="text-center py-10">
                <Brain className="h-8 w-8 mx-auto mb-3 text-primary"/>
                <p className="font-medium">{loading ? 'Requesting prediction...' : 'No prediction yet'}</p>
                <p className="text-sm text-muted-foreground mt-1">The model will return a future engagement category, estimated class probabilities and verified SHAP contributions.</p>
              </CardContent>
            </Card>
          )}
          {result && (
            <>
              <Card className="border-border shadow-sm">
                <CardHeader><CardTitle className="text-base">Model Prediction: {result.predicted_engagement} Future Engagement</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {CLASS_ORDER.map(cls => {
                    const pct = 100 * result.estimated_class_probabilities[cls];
                    return <div key={cls}>
                      <div className="flex justify-between text-sm mb-1"><span>{cls} engagement</span><strong>{pct.toFixed(2)}%</strong></div>
                      <div className="h-2.5 bg-secondary rounded-full overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100,Math.max(0,pct))}%` }}/></div>
                    </div>;
                  })}
                  <p className="text-xs text-muted-foreground">These are the model’s estimated probabilities of future LMS engagement classes, not academic failure risk or a separate model confidence score. Probability calibration has not yet been established.</p>
                  {result.predicted_engagement === 'Low' && (
                    <p className="rounded-lg bg-warning/10 p-3 text-sm"><AlertTriangle className="h-4 w-4 inline mr-2"/> Low expected LMS participation: consider a supportive check-in, not an automatic academic decision.</p>
                  )}
                </CardContent>
              </Card>
              <Card className="border-border shadow-sm">
                <CardHeader><CardTitle className="text-base">Genuine SHAP Contributions — {result.explanation.explained_class} Class</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <ResponsiveContainer width="100%" height={230}>
                    <BarChart data={contributionData} layout="vertical" margin={{ top: 10, right: 20, left: 15, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false}/>
                      <XAxis type="number" tickLine={false}/>
                      <YAxis type="category" dataKey="feature" tickLine={false} width={130} tick={{ fontSize: 11 }}/>
                      <Tooltip formatter={(value: number) => [`${value >= 0 ? '+' : ''}${value.toFixed(4)} class-score units`, 'SHAP contribution']}/>
                      <Bar dataKey="value" barSize={19}>
                        {contributionData.map((entry, i) => <Cell key={i} fill={entry.value >= 0 ? 'hsl(var(--primary))' : 'hsl(var(--warning))'} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <p className="text-sm">Baseline: <strong>{result.explanation.baseline.toFixed(4)}</strong> + contributions = final class score: <strong>{result.explanation.final_class_score.toFixed(4)}</strong></p>
                  <p className="text-xs text-muted-foreground">SHAP values are additive contributions to the class score (logit), not percentages. Positive values increase the explained class score relative to its baseline.</p>
                  <Link href="/explainable" className="text-sm text-primary underline">Explore the full explainability page</Link>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

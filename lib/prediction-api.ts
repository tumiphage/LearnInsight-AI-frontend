/** Contract for the user's independently trained FastAPI model. */
export const FEATURE_LABELS: Record<keyof PredictionFeatures, string> = {
  total_clicks: 'Total VLE Clicks (days 0–27)',
  active_days: 'Active VLE Days (days 0–27)',
  clicks_last_7_days: 'Recent VLE Clicks (days 21–27)',
  forum_clicks: 'Forum Resource Clicks (days 0–27)',
};

export type EngagementClass = 'Low' | 'Medium' | 'High';

export interface PredictionFeatures {
  total_clicks: number;
  active_days: number;
  clicks_last_7_days: number;
  forum_clicks: number;
}

export interface PredictionResponse {
  predicted_engagement: EngagementClass;
  estimated_class_probabilities: Record<EngagementClass, number>;
  explanation: {
    method: string;
    explained_class: EngagementClass;
    unit: string;
    baseline: number;
    contributions: Record<keyof PredictionFeatures, number>;
    final_class_score: number;
  };
}

export interface StoredPrediction {
  inputs: PredictionFeatures;
  response: PredictionResponse;
}

export const PREDICTION_STORAGE_KEY = 'learninsight-verified-prediction';

export const CLASS_ORDER: EngagementClass[] = ['Low', 'Medium', 'High'];

export function isPredictionResponse(value: unknown): value is PredictionResponse {
  if (!value || typeof value !== 'object') return false;
  const v = value as Partial<PredictionResponse>;
  if (!CLASS_ORDER.includes(v.predicted_engagement as EngagementClass)) return false;
  if (!v.estimated_class_probabilities || !v.explanation) return false;
  const probabilities = v.estimated_class_probabilities;
  const explanation = v.explanation;
  const expectedKeys = Object.keys(FEATURE_LABELS) as (keyof PredictionFeatures)[];
  return CLASS_ORDER.every(c => typeof probabilities[c] === 'number' && Number.isFinite(probabilities[c]) && probabilities[c] >= 0 && probabilities[c] <= 1) &&
    CLASS_ORDER.includes(explanation.explained_class) &&
    typeof explanation.baseline === 'number' && Number.isFinite(explanation.baseline) &&
    typeof explanation.final_class_score === 'number' && Number.isFinite(explanation.final_class_score) &&
    expectedKeys.every(k => typeof explanation.contributions?.[k] === 'number' && Number.isFinite(explanation.contributions[k]));
}

export function validatePredictionInput(input: PredictionFeatures): string | null {
  const values = Object.values(input);
  if (values.some(v => !Number.isSafeInteger(v) || v < 0)) return 'All feature values must be non-negative whole numbers.';
  if (input.active_days > 28) return 'Active days cannot exceed 28 in the observation window.';
  if (input.clicks_last_7_days > input.total_clicks) return 'Recent clicks cannot exceed total clicks.';
  if (input.forum_clicks > input.total_clicks) return 'Forum clicks cannot exceed total clicks.';
  if ((input.total_clicks === 0) !== (input.active_days === 0)) return 'Total clicks and active days must both be zero or both be positive.';
  return null;
}

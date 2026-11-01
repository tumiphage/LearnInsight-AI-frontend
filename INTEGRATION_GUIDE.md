# LearnInsight AI — actual model integration

This copy of the Bolt **Next.js 13** frontend replaces the `/prediction` page's simulated prediction with a real request via `app/api/predict/route.ts` to the separately hosted FastAPI model. The `/explainable` page displays the latest real student SHAP contributions (when the session has a prediction), and explicitly labels the fixed global SHAP measurements as historical research findings. Dashboard / student / interventions / reports are still generated synthetic demonstration data and are marked as such.

## What is and is not included

- Included: edited **frontend** source code, Next.js proxy route, typed API contract, input checks, disclosure of generated demonstration data.
- Not included: `engagement_pipeline.joblib`, `shap_background.csv`, Python training notebooks, or FastAPI `api/main.py`. Those files remain on the user's Windows computer and were **not** present in the uploaded Bolt ZIP.
- A working deployed website additionally needs a publicly accessible, protected, HTTPS FastAPI service. The ZIP does **not** deploy Python automatically and does not silently fall back to mock predictions.

## Local Windows test

1. Keep FastAPI running from the user's Python project: `..\\.venv\\Scripts\\python.exe -m uvicorn api.main:app --reload` (adjust relative folder as appropriate). Check `http://127.0.0.1:8000/docs` and `POST /predict` separately.
2. Extract this ZIP and open its `project` folder in VS Code. Run `npm ci` then `npm run dev`. (Node.js/npm required.)
3. Copy `.env.example` to `.env.local` and confirm it contains `MODEL_API_URL=http://127.0.0.1:8000`. Restart Next.js after changes to `.env.local`.
4. Open `http://localhost:3000/prediction`; the default example inputs (14, 4, 0, 0) should return **Low**, approximately 61.90% Low, 37.80% Medium, 0.29% High. Compare SHAP values with the original FastAPI Swagger response.
5. Navigate to `/explainable` to inspect the latest live SHAP contributions. Check that an unavailable FastAPI server produces a visible error rather than a fabricated prediction. Test invalid data (negative clicks, >28 days, recent > total, forum > total).
6. Run `npm run typecheck`, `npm run lint`, `npm run build` and inspect errors on your computer before reporting the frontend as tested.

## Deployment

The frontend calls its own Next.js **server** route `/api/predict`; that route forwards requests to `MODEL_API_URL`. Set `MODEL_API_URL` **on the deployment host**, pointing to a reachable **HTTPS** FastAPI backend (e.g., a managed Python hosting service). Localhost cannot work as the backend of a deployed frontend. Confirm that the Next.js hosting platform supports server-side route handlers. Do not place `joblib` model files into public frontend assets. Secure the prediction service before using real student data (authentication, access controls, rate limits and privacy review).

## Model scope and limits

Four nonnegative integer features: `total_clicks`, `active_days`, `clicks_last_7_days`, `forum_clicks`, observed on days 0–27 of OULAD BBB/2014B. Target: future active-day category on days 28–55 (Low = 0–3, Medium = 4–11, High = 12–28). Estimates are **not** dropout/failure probabilities. SHAP local contributions are **class-score units, not percentages**. The validation study achieved 65.62% accuracy and Macro F1 0.6422 on 256 holdout students; probability calibration and cross-institution validation remain open research limitations.

## Files changed

- `app/(app)/prediction/page.tsx` — real four-feature form; no simulation or confidence score.
- `app/(app)/explainable/page.tsx` — model-derived local SHAP, actual reported global SHAP results; no fabricated risks.
- `app/api/predict/route.ts` — Next.js proxy to FastAPI with error forwarding.
- `lib/prediction-api.ts` — typed request/response, validation, stored session prediction.
- `lib/mock-data.ts` — removes unused `simulatePrediction` function.
- `lib/types.ts` — removes obsolete mock-only prediction interfaces.
- `app/(app)/layout.tsx`, `app/page.tsx` — disclosures to distinguish demo data.
- `.env.example` — local/deployed backend configuration example.

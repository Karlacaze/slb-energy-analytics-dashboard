# SLB Energy Analytics

SLB Energy Analytics is a web app for analyzing fuel efficiency, identifying low-performance patterns, and supporting operational sustainability decisions.

It combines:
- a React + TypeScript frontend for exploration and monitoring,
- a Flask backend for model inference,
- and topological data analysis (TDA) artifacts for structural pattern discovery.

## What this project does

The app is organized into five functional sections:

- **Introduction**: project goals, data scope, and expected business impact.
- **Data Analysis**: distribution views, monthly performance trends, critical drivers, and problematic vehicles.
- **Topological Mapping (TDA)**: interactive mapper visualization loaded from a static HTML artifact.
- **Prediction**: model inference workflow based on operational inputs.
- **Executive Dashboard**: KPI snapshot, trend monitoring, and alert tracking.

The UI supports both **Spanish and English** through a global language selector.

## Tech stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Lucide icons

### Backend
- Flask
- Flask-CORS
- pandas / numpy
- scikit-learn
- joblib

## Repository structure

```text
PROYECT/
  src/
    components/
    pages/
    App.tsx
  public/
    mapper_output_bueno.html
  backend/
    appi.py
    requirements.txt
    modelo_rendimiento.pkl
    df_modelo.csv
  docs/
    Reto_Topologia_Final.pdf
```

## Local setup

### Prerequisites
- Node.js 18+ (20+ recommended)
- npm
- Python 3.10+
- pip

### 1) Run the frontend
From the project root:

```bash
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

### 2) Run the backend
In a second terminal:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python appi.py
```

Backend URL: `http://localhost:8000`

## API endpoints

Base URL: `http://localhost:8000`

### `GET /health`
Returns service status and whether model/data were loaded successfully.

### `GET /get_options`
Returns dropdown options used in the prediction form:
- drivers
- vehicles
- divisions
- BLs
- cargo types
- stations

### `POST /predict`
Runs model inference with the selected operational context.

Expected payload:

```json
{
  "conductor": "...",
  "vehiculo": "...",
  "division": "...",
  "bl": "...",
  "mercancia": "...",
  "estacion": "..."
}
```

Response includes:
- binary prediction (`EFICIENTE` / `INEFICIENTE` from backend output)
- confidence/probability (if available)
- feature-level scores (if available)

### `GET /model_info`
Returns metadata about the loaded model and input features.

## Model and data files

The backend expects these files inside `backend/`:
- `modelo_rendimiento.pkl`
- `df_modelo.csv`

If you move or rename them, update `load_model_and_data()` in `backend/appi.py`.

## PDF documentation

The challenge document is included in the repo:

- [Reto Topologia Final (PDF)](docs/Reto_Topologia_Final.pdf)

## Frontend scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run lint checks

## Notes

- Backend currently runs with `debug=True` for local development.
- `backend/.venv` and other generated folders should not be committed.
- For production use, move runtime configuration to environment variables and disable debug mode.

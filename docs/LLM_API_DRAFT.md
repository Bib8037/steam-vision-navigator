# LLM KPI Insights API

This document defines a draft spec for an LLM-powered API that provides **AI Insight** and **Recommended Action** for each KPI. It also includes a sample request/response and guidance on how to integrate into the front-end.

---

## 1. Endpoint

```
POST https://api.yourcompany.com/v1/llm/kpi-insights
```

## 2. Request Schema

Content-Type: `application/json`  
Authorization: `Bearer YOUR_API_TOKEN`

```json
{
  "kpis": [
    "Total Steam Loss",
    "Boiler Blowdown",
    "Trap & Valve Leakage",
    "Flash & Venting",
    "H/E Fouling & Insulation"
  ]
}
```

- `kpis`: array of KPI titles (strings) for which to generate insights.

## 3. Response Schema

```json
{
  "insights": [
    {
      "title": "Total Steam Loss",
      "aiInsight": "Trend analysis shows a 15% improvement over the last month. Predicting further 10% reduction if condensate piping is insulated.",
      "aiAction": "Insulate condensate return line - estimated $2,400/day savings."
    },
    {
      "title": "Boiler Blowdown",
      "aiInsight": "Current blowdown rate exceeds optimal TDS setpoint. AI correlates high blowdown with hard-water scaling.",
      "aiAction": "Adjust TDS setpoint from 3000 to 2800 ppm and schedule cleaning - potential $300/day savings."
    },
    {
      "title": "Trap & Valve Leakage",
      "aiInsight": "Leak detection shows three traps with >5% leakage rate. Predicted risk of 12% efficiency drop in two weeks.",
      "aiAction": "Replace traps T-45, T-62, T-89 immediately to avoid $1,600/day loss."
    },
    {
      "title": "Flash & Venting",
      "aiInsight": "High flash venting indicates poor flash tank performance. AI suggests optimizing flash tank pressure threshold.",
      "aiAction": "Lower flash tank pressure by 5 psi - recover additional 3.2 tons/day steam."
    },
    {
      "title": "H/E Fouling & Insulation",
      "aiInsight": "Heat exchanger fouling trending upward. AI recommends back-flush cycle schedule adjustment.",
      "aiAction": "Implement back-flush weekly instead of bi-weekly - maintain peak efficiency."
    }
  ]
}
```

- `insights`: array aligning one-to-one with incoming `kpis`.
  - `title`: KPI title.
  - `aiInsight`: text explanation from the LLM.
  - `aiAction`: concise recommended action.

## 4. Front-end Integration

We added a helper in `src/lib/ai.ts`:

```ts
import { fetchKpiInsights } from "@/lib/ai";

// Inside KPICards component
useEffect(() => {
  async function loadInsights() {
    const insights = await fetchKpiInsights(kpiData.map(k => ({ title: k.title })));
    setKpiData(prev =>
      prev.map(k => {
        const found = insights.find(i => i.title === k.title);
        return found ? { ...k, aiInsight: found.aiInsight, aiAction: found.aiAction } : k;
      })
    );
  }
  loadInsights();
}, []);
```

When the **Show AI Insights** toggle is enabled, each KPI card will display:

- **AI Insight**: contextual analysis text
- **Recommended Action**: prioritized next step

---

## 5. Mock Output in UI

With the sample response above, the KPI grid will render each card’s AI panel as follows:

| KPI Title              | AI Insight (excerpt)                                                  | Recommended Action                                                          |
|------------------------|------------------------------------------------------------------------|------------------------------------------------------------------------------|
| Total Steam Loss       | “Trend analysis shows a 15% improvement…”                              | “Insulate condensate return line - estimated $2,400/day savings.”             |
| Boiler Blowdown        | “Current blowdown rate exceeds optimal TDS setpoint...”                | “Adjust TDS setpoint from 3000 to 2800 ppm and schedule cleaning…”           |
| Trap & Valve Leakage   | “Leak detection shows three traps with >5% leakage rate…”              | “Replace traps T-45, T-62, T-89 immediately to avoid $1,600/day loss.”       |
| Flash & Venting        | “High flash venting indicates poor flash tank performance…”           | “Lower flash tank pressure by 5 psi - recover additional 3.2 tons/day steam.” |
| H/E Fouling & Insulation | “Heat exchanger fouling trending upward…”                           | “Implement back-flush weekly instead of bi-weekly - maintain peak efficiency.” |

---

This draft spec and mock output should help you wire up a real LLM API and verify the AI panels in your main dashboard.

export interface KpiInsight {
  title: string;
  aiInsight: string;
  aiAction: string;
}

/**
 * fetchKpiInsights
 * Calls an LLM API to retrieve AI insights and recommended actions for given KPIs.
 * If the fetch fails or the API is unreachable (e.g., placeholder URL during development),
 * returns mock insights per-plant for demonstration.
 */
export async function fetchKpiInsights(
  kpis: { title: string; plant: string }[]
): Promise<KpiInsight[]> {
  const LLM_API_URL = "https://api.yourcompany.com/v1/llm/kpi-insights";

  try {
    // Include plant context in payload (all items have same plant)
    const payload = { plant: kpis[0].plant, kpis: kpis.map((k) => k.title) };
    const response = await fetch(LLM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_TOKEN",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    // Expecting result.insights: KpiInsight[]
    return result.insights;
  } catch (error) {
    console.warn("fetchKpiInsights failed, using mock data:", error);
    // Define mock insights per plant
    const plantInsights: Record<string, KpiInsight[]> = {
      ROC: [
        { title: "Total Steam Loss", aiInsight: "ROC: Steam loss down 5% vs last week.", aiAction: "Inspect condensate lines at ROC plant." },
        { title: "Boiler Blowdown", aiInsight: "ROC: Blowdown rate 8% above optimal.", aiAction: "Adjust TDS setpoint by -200ppm at ROC." },
        { title: "Trap & Valve Leakage", aiInsight: "ROC: Found 4 valves leaking >3%.", aiAction: "Schedule valve maintenance in ROC sector 2." },
        { title: "Flash & Venting", aiInsight: "ROC: Flash venting high—recoverable steam at 1.2 tons/day.", aiAction: "Lower flash tank pressure by 4 psi in ROC." },
        { title: "H/E Fouling & Insulation", aiInsight: "ROC: Heat exchanger fouling increased by 7%.", aiAction: "Plan HE cleaning in ROC within 3 days." }
      ],
      MOC: [
        { title: "Total Steam Loss", aiInsight: "MOC: Steam loss trending upward 3%.", aiAction: "Re-insulate steam lines at MOC plant." },
        { title: "Boiler Blowdown", aiInsight: "MOC: Blowdown within 5% of target.", aiAction: "Maintain current TDS setpoint at MOC." },
        { title: "Trap & Valve Leakage", aiInsight: "MOC: Leakage reduced by 2% after recent repair.", aiAction: "Monitor traps in MOC weekly." },
        { title: "Flash & Venting", aiInsight: "MOC: Flash losses stable.", aiAction: "No action required for flash performance at MOC." },
        { title: "H/E Fouling & Insulation", aiInsight: "MOC: Insulation intact with minor wear.", aiAction: "Inspect insulation annually at MOC." }
      ],
      LSP: [
        { title: "Total Steam Loss", aiInsight: "LSP: Steam loss steady at target.", aiAction: "Verify condensate return at LSP." },
        { title: "Boiler Blowdown", aiInsight: "LSP: Blowdown spikes at shift change.", aiAction: "Train operators on blowdown control at LSP." },
        { title: "Trap & Valve Leakage", aiInsight: "LSP: Two traps identified for replacement.", aiAction: "Replace T-12 and T-34 at LSP." },
        { title: "Flash & Venting", aiInsight: "LSP: Flash venting rising 6%.", aiAction: "Optimize flash tank pressure by 3 psi at LSP." },
        { title: "H/E Fouling & Insulation", aiInsight: "LSP: Fouling uniform across exchangers.", aiAction: "Schedule full clean of all H/E at LSP." }
      ]
    };
    const plant = kpis[0].plant;
    const insights = plantInsights[plant] || [];
    // Map back in order
    return kpis.map((k) => {
      const found = insights.find((i) => i.title === k.title);
      return found || { title: k.title, aiInsight: "", aiAction: "" };
    });
  }
}

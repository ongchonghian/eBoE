import React, { useMemo, useState } from "react";

import {
  FitScene,
  FlowScene,
  GlossaryStrip,
  ProblemScene,
  StoryHeader,
  StoryRail,
} from "./components/WorkflowSections";
import { workflowSteps } from "./workflowData";
import { assertWorkflowData } from "./workflowValidation";

assertWorkflowData();

export default function TrustVCEBoEWorkflowApp() {
  const [chapter, setChapter] = useState("flow");
  const [activeIndex, setActiveIndex] = useState(1);
  const step = workflowSteps[activeIndex];

  const counts = useMemo(
    () =>
      workflowSteps.reduce(
        (acc, step) => ({
          total: acc.total + 1,
          uses: acc.uses + (step.trustvcUse === "Yes" ? 1 : 0),
          existing: acc.existing + (step.status === "existing" ? 1 : 0),
          needsWork: acc.needsWork + (["enhancement", "partial"].includes(step.status) ? 1 : 0),
        }),
        { total: 0, uses: 0, existing: 0, needsWork: 0 },
      ),
    [],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#eff6ff_0%,#f8fafc_45%,#f8fafc_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1540px] space-y-6">
        <StoryHeader counts={counts} />

        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
          <StoryRail chapter={chapter} setChapter={setChapter} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

          <div className="space-y-6">
            {chapter === "flow" && <FlowScene step={step} />}
            {chapter === "problems" && <ProblemScene activeIndex={activeIndex} />}
            {chapter === "fit" && <FitScene step={step} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />}

            <GlossaryStrip activeStepId={step.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

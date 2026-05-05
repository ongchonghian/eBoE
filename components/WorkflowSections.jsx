import React, { useMemo, useState } from "react";

import { businessDefinitions, stepTermMap, tone, workflowSteps } from "../workflowData";
import { technicalReferencesByStep, technicalReferenceStatuses } from "../technicalReferencesData";
import { buildTechnicalReferenceRoleView, technicalReferenceRoleViews } from "../technicalReferenceView";
import { Icon } from "./Icon";
import { Pill } from "./common";

export function StoryHeader({ counts }) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">TrustVC x eBoE</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-5xl">
            Understand the eBoE journey and where TrustVC adds value
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700">
            Explore the eBoE lifecycle in focused sections. Move through each stage to see the process, key risks, and where
            TrustVC fits.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Stat title="Steps" value={counts.total} />
          <Stat title="TrustVC Stages" value={counts.uses} />
          <Stat title="Existing" value={counts.existing} toneClass="text-emerald-800 border-emerald-200 bg-emerald-50" />
          <Stat title="Needs Work" value={counts.needsWork} toneClass="text-amber-800 border-amber-200 bg-amber-50" />
        </div>
      </div>
    </section>
  );
}

function Stat({ title, value, toneClass = "text-slate-900 border-slate-200 bg-white" }) {
  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-current/90">{title}</div>
    </div>
  );
}

export function StoryRail({ chapter, setChapter, activeIndex, setActiveIndex }) {
  const chapters = [
    ["flow", "Act 1", "eBoE flow", "lifecycle"],
    ["problems", "Act 2", "Core problems", "warn"],
    ["fit", "Act 3", "TrustVC fit", "shield"],
  ];

  return (
    <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
      <div className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">Chapters</div>
      <div className="space-y-2">
        {chapters.map(([id, act, label, icon]) => {
          const selected = chapter === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setChapter(id)}
              aria-pressed={selected}
              className={`w-full rounded-xl border px-3 py-2.5 text-left transition duration-200 ${
                selected ? "border-slate-900 bg-slate-950 text-white" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
              }`}
            >
              <div className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] ${selected ? "text-white" : "text-slate-700"}`}>
                <Icon name={icon} className="h-3.5 w-3.5" />
                {act}
              </div>
              <div className="mt-1 text-base font-semibold">{label}</div>
            </button>
          );
        })}
      </div>

      <div className="my-5 h-px bg-slate-200" />

      <div className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">Flow steps</div>
      <div className="space-y-1.5">
        {workflowSteps.map((step, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={selected}
              className={`w-full rounded-xl px-3 py-2 text-left transition duration-200 ${
                selected ? "bg-slate-950 text-white" : "bg-transparent text-slate-700 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`text-sm font-semibold tracking-[0.1em] ${selected ? "text-white" : "text-slate-700"}`}>{step.no}</div>
                <span className={`h-2 w-2 rounded-full ${selected ? "bg-white" : tone[step.status].dot}`} />
              </div>
              <div className="mt-1 text-sm font-semibold leading-6">{step.title}</div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export function FlowScene({ step }) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Pill className="bg-slate-900 text-white ring-slate-900">Step {step.no}</Pill>
          <Pill status={step.status}>{tone[step.status].label}</Pill>
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{step.title}</h2>
        <p className="mt-2 text-base text-slate-700">{step.subtitle}</p>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-3">
        <SceneCard title="What Happens" body={step.narration} />
        <SceneCard title="Primary Actor" body={step.actor} compact />
        <SceneCard title="TrustVC Involvement" body={step.trustvcUse === "Yes" ? "TrustVC is directly used in this stage." : "TrustVC is not used in this stage."} compact />
      </div>
    </section>
  );
}

export function ProblemScene({ activeIndex }) {
  const step = workflowSteps[activeIndex];
  const blockers = step.needs.slice(0, 4);
  const fallbackProblemFocus = {
    coreTension: "Cross-party workflows split responsibility and create verification ambiguity.",
    decisionAtRisk: "Teams struggle to make fast, auditable decisions when evidence is fragmented.",
    consequence: "Manual reconciliation increases delay and discrepancy risk.",
    failureModes: blockers,
  };
  const problemFocus = step.problemFocus || fallbackProblemFocus;

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-slate-200 bg-amber-50/70 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-amber-800">Problem focus · step {step.no}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{step.title}</h2>
        <p className="mt-2 text-base leading-7 text-slate-700">{step.implementation}</p>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-slate-700">Core tension</h3>
          <p className="mt-3 text-base leading-8 text-slate-700">{problemFocus.coreTension}</p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-slate-700">Decision at risk</h3>
          <p className="mt-3 text-base leading-8 text-slate-700">{problemFocus.decisionAtRisk}</p>
        </article>
      </div>

      <div className="grid gap-4 px-5 pb-5 xl:grid-cols-[1.4fr_0.6fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-slate-700">Failure modes to manage</h3>
          <ul className="mt-3 space-y-2 text-base leading-7 text-slate-700">
            {problemFocus.failureModes.map((item) => (
              <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-slate-700">Consequence if unresolved</h3>
          <p className="mt-3 text-base leading-8 text-slate-700">{problemFocus.consequence}</p>
        </article>
      </div>
    </section>
  );
}

export function FitScene({ step, activeIndex, setActiveIndex }) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-slate-200 bg-slate-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">TrustVC fit · step {step.no}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{step.title}</h2>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-3">
        <SceneCard title="Problem" body={step.implementation} />
        <SceneCard title="TrustVC Fit" body={step.trustvcRole} />
        <article className="rounded-2xl border border-slate-200 bg-white p-4">
          <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-slate-700">Remaining build</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {step.needs.map((item) => (
              <Pill key={item} status={step.status === "existing" ? "provider" : step.status}>
                {item}
              </Pill>
            ))}
          </div>
        </article>
      </div>

      <TechnicalReferencesPanel step={step} />

      <div className="flex items-center justify-between border-t border-slate-200 p-4">
        <button
          type="button"
          onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-base font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setActiveIndex(Math.min(workflowSteps.length - 1, activeIndex + 1))}
          disabled={activeIndex === workflowSteps.length - 1}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-base font-semibold text-white transition hover:bg-slate-800 disabled:opacity-40"
        >
          Next
          <Icon name="arrow" />
        </button>
      </div>
    </section>
  );
}

function TechnicalReferencesPanel({ step }) {
  const [roleView, setRoleView] = useState(technicalReferenceRoleViews[0] || "developer");
  const references = technicalReferencesByStep[step.id] || [];
  const grouped = useMemo(
    () =>
      buildTechnicalReferenceRoleView({
        stepId: step.id,
        roleView,
        referencesByStep: technicalReferencesByStep,
        statuses: technicalReferenceStatuses,
      }),
    [roleView, step.id]
  );
  const roleViewLabel = roleView === "business" ? "Business" : "Developer";

  return (
    <section className="border-t border-slate-200 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-slate-700">Technical references</h3>
          <p className="mt-1 text-sm text-slate-700">
            Step-specific implementation anchors from local TrustVC repositories.
          </p>
        </div>
        <Pill status={step.status}>{references.length} references</Pill>
      </div>

      <div className="mt-4 inline-flex rounded-xl border border-slate-200 bg-white p-1" role="group" aria-label="Technical reference role view">
        {technicalReferenceRoleViews.map((role) => {
          const selected = roleView === role;
          const label = role === "business" ? "Business" : "Developer";

          return (
            <button
              key={role}
              type="button"
              onClick={() => setRoleView(role)}
              aria-pressed={selected}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] transition ${
                selected ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {grouped.map(({ status, items }) => (
          <Pill key={status} status={status}>
            {tone[status].label}: {items.length}
          </Pill>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {grouped.map(({ status, items }) => (
          <details key={status} className="rounded-xl border border-slate-200 bg-slate-50 p-3" open={status === step.status}>
            <summary className="cursor-pointer list-none">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Pill status={status}>{tone[status].label}</Pill>
                </div>
                <span className="text-sm font-semibold text-slate-700">{items.length} capability pointers</span>
              </div>
            </summary>

            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {items.map((item) => (
                <article key={`${item.stepId}-${item.status}-${item.capability}`} className="rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">View: {roleViewLabel}</p>
                  <h4 className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-700">{item.capability}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.resolvedCopy}</p>
                  <ul className="mt-3 space-y-1">
                    {item.sourcePointers.map((pointer) => (
                      <li key={pointer} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                        {pointer}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function SceneCard({ title, body, compact = false }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-slate-700">{title}</h3>
      <p className={`mt-3 text-slate-700 ${compact ? "text-base leading-7" : "text-base leading-8"}`}>{body}</p>
    </article>
  );
}

export function GlossaryStrip({ activeStepId }) {
  const [query, setQuery] = useState("");
  const terms = stepTermMap[activeStepId] || [];

  const filtered = useMemo(() => {
    return businessDefinitions.filter((item) => {
      const withinStep = terms.includes(item.term);
      const searchable = `${item.term} ${item.definition} ${item.appMeaning}`.toLowerCase();
      return withinStep && searchable.includes(query.trim().toLowerCase());
    });
  }, [query, terms]);

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-slate-700">Step glossary</h3>
        <label htmlFor="step-glossary-search" className="sr-only">
          Search terms in this step
        </label>
        <input
          id="step-glossary-search"
          name="glossarySearch"
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search terms in this step"
          placeholder="Search terms in this step…"
          className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-base text-slate-800 placeholder:text-slate-500 transition focus:border-slate-600 focus:bg-white focus-visible:ring-2 focus-visible:ring-sky-600/40"
        />
      </div>

      <div className="mt-4 grid gap-3 xl:grid-cols-2">
        {filtered.slice(0, 6).map((item) => (
          <article key={item.term} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-base font-semibold text-slate-900">{item.term}</div>
            <p className="mt-1 text-sm leading-7 text-slate-700">{item.appMeaning}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

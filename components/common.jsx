import React from "react";

import { tone } from "../workflowData";
import { Icon } from "./Icon";

export function Pill({ children, status = "provider", className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ring-1 ring-inset ${tone[status].badge} ${className}`}>
      {children}
    </span>
  );
}

export function Metric({ label, value, color = "slate" }) {
  const colorClass =
    color === "emerald"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : color === "amber"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : "border-slate-200 bg-white text-slate-950";

  return (
    <div className={`rounded-[1.5rem] border p-4 shadow-sm ${colorClass}`}>
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] opacity-70">{label}</div>
    </div>
  );
}

export function PanelTitle({ icon, title, subtitle }) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="rounded-2xl bg-slate-900 p-2 text-white shadow-sm">
        <Icon name={icon} />
      </div>
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}

export function Decision({ label, value, small }) {
  return (
    <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-white/80">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className={`mt-1 font-semibold text-slate-950 ${small ? "text-sm" : "text-xl"}`}>{value}</div>
    </div>
  );
}

export function TagGroup({ title, icon, items, status = "provider" }) {
  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
        <Icon name={icon} />
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Pill key={item} status={status}>
            {item}
          </Pill>
        ))}
      </div>
    </div>
  );
}

export function GlossaryToggle({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-2 transition ${active ? "bg-slate-950 text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`}
    >
      {children}
    </button>
  );
}

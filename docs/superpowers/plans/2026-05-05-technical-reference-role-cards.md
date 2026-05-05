# Technical Reference Role Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add global `Developer`/`Business` role toggle in the Technical References panel and ensure every capability card has explicit dual-role copy.

**Architecture:** Keep the existing step/status grouping intact, extend technical reference data entries with `developerCopy` and `businessCopy`, and switch card body rendering from a single text field to role-aware text selected from a global toggle state in `TechnicalReferencesPanel`. Add lightweight Node tests for role-copy presence and role-copy selection behavior.

**Tech Stack:** React 18, Vite 5, plain JavaScript modules, Node built-in test runner (`node:test`)

---

## File Structure (Planned Changes)

- Modify: `technicalReferencesData.js`
  - Add `developerCopy` and `businessCopy` to each entry.
  - Keep `technicalReference` only if temporary compatibility is needed during migration.
- Modify: `workflowValidation.js`
  - Require `developerCopy` and `businessCopy` on each technical reference entry.
- Modify: `components/WorkflowSections.jsx`
  - Add global role toggle state in `TechnicalReferencesPanel`.
  - Render role-specific body content in each capability card.
- Create: `technicalReferenceView.js`
  - Centralize role-based copy selection and defensive fallback text.
- Create: `tests/technical-reference-role-copy.test.mjs`
  - Ensure every technical reference has both role fields populated.
- Create: `tests/technical-reference-view.test.mjs`
  - Validate role selection utility behavior and fallback behavior.
- Modify: `package.json`
  - Add test script for Node test runner.

### Task 1: Add Failing Tests For Dual-Role Requirements

**Files:**
- Create: `tests/technical-reference-role-copy.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing test for data shape**

```js
import test from "node:test";
import assert from "node:assert/strict";
import { technicalReferenceEntries } from "../technicalReferencesData.js";

test("every technical reference has non-empty developer and business copy", () => {
  technicalReferenceEntries.forEach((entry, index) => {
    assert.equal(typeof entry.developerCopy, "string", `Entry ${index} missing developerCopy`);
    assert.ok(entry.developerCopy.trim().length > 0, `Entry ${index} has empty developerCopy`);
    assert.equal(typeof entry.businessCopy, "string", `Entry ${index} missing businessCopy`);
    assert.ok(entry.businessCopy.trim().length > 0, `Entry ${index} has empty businessCopy`);
  });
});
```

- [ ] **Step 2: Add a dedicated test script**

```json
{
  "scripts": {
    "dev": "vite --port 3000",
    "build": "vite build",
    "preview": "vite preview",
    "test:data": "node --test tests/*.test.mjs"
  }
}
```

- [ ] **Step 3: Run tests to verify failure (red)**

Run: `npm run test:data`  
Expected: `FAIL` with messages like `missing developerCopy` / `missing businessCopy`.

- [ ] **Step 4: Commit test scaffolding**

```bash
git add package.json tests/technical-reference-role-copy.test.mjs
git commit -m "test: add failing dual-role technical reference copy checks"
```

### Task 2: Implement Dual-Role Copy Data + Validation

**Files:**
- Modify: `technicalReferencesData.js`
- Modify: `workflowValidation.js`
- Test: `tests/technical-reference-role-copy.test.mjs`

- [ ] **Step 1: Update technical references data entries**

Use this entry pattern for all capabilities:

```js
{
  stepId: "bank-forwarding",
  status: "enhancement",
  capability: "Forwarding Attestation Conformance Profile",
  developerCopy:
    "Define and publish a forwarding-attestation profile that standardizes payload fields, required signatures, and conformance checks across participating banks.",
  businessCopy:
    "A shared forwarding attestation profile gives banks a common proof format, reducing reconciliation disputes and speeding interbank acceptance.",
  sourcePointers: [
    "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
    "eBOE Workflow.md#C3 — Bank Forwarding Profile",
  ],
}
```

Apply the same structure to every object in `technicalReferenceEntries`.

- [ ] **Step 2: Enforce dual-role fields in validator**

Update the technical reference completeness check in `workflowValidation.js`:

```js
if (!entry.stepId || !entry.status || !entry.capability || !entry.developerCopy || !entry.businessCopy) {
  errors.push(`Technical reference ${index} incomplete`);
  return;
}
```

Add explicit type and trim checks:

```js
if (typeof entry.developerCopy !== "string" || entry.developerCopy.trim().length === 0) {
  errors.push(`Technical reference ${index} missing developerCopy`);
}

if (typeof entry.businessCopy !== "string" || entry.businessCopy.trim().length === 0) {
  errors.push(`Technical reference ${index} missing businessCopy`);
}
```

- [ ] **Step 3: Re-run tests to verify pass (green)**

Run: `npm run test:data`  
Expected: `PASS` for `technical-reference-role-copy.test.mjs`.

- [ ] **Step 4: Commit data + validation migration**

```bash
git add technicalReferencesData.js workflowValidation.js
git commit -m "feat: add dual-role technical reference copy fields and validation"
```

### Task 3: Add Global Role Toggle + Role-Aware Card Rendering

**Files:**
- Create: `technicalReferenceView.js`
- Create: `tests/technical-reference-view.test.mjs`
- Modify: `components/WorkflowSections.jsx`
- Test: `tests/technical-reference-view.test.mjs`

- [ ] **Step 1: Add utility for role-based copy selection**

Create `technicalReferenceView.js`:

```js
export const technicalReferenceRoleViews = ["developer", "business"];

export function getTechnicalReferenceCopy(item, roleView) {
  const preferred = roleView === "business" ? item.businessCopy : item.developerCopy;
  if (typeof preferred === "string" && preferred.trim().length > 0) return preferred;
  return "Role-specific copy pending for this capability.";
}
```

- [ ] **Step 2: Add utility tests**

Create `tests/technical-reference-view.test.mjs`:

```js
import test from "node:test";
import assert from "node:assert/strict";
import { getTechnicalReferenceCopy } from "../technicalReferenceView.js";

test("returns developer copy when role is developer", () => {
  const entry = { developerCopy: "Developer text", businessCopy: "Business text" };
  assert.equal(getTechnicalReferenceCopy(entry, "developer"), "Developer text");
});

test("returns business copy when role is business", () => {
  const entry = { developerCopy: "Developer text", businessCopy: "Business text" };
  assert.equal(getTechnicalReferenceCopy(entry, "business"), "Business text");
});

test("returns fallback when selected role copy is missing", () => {
  const entry = { developerCopy: "", businessCopy: "" };
  assert.equal(getTechnicalReferenceCopy(entry, "developer"), "Role-specific copy pending for this capability.");
});
```

- [ ] **Step 3: Run tests to verify utility behavior**

Run: `npm run test:data`  
Expected: all tests pass including `technical-reference-view.test.mjs`.

- [ ] **Step 4: Implement global role toggle and role-aware rendering**

In `components/WorkflowSections.jsx`, import utility:

```js
import { getTechnicalReferenceCopy } from "../technicalReferenceView";
```

In `TechnicalReferencesPanel`, add panel-scoped toggle state:

```js
const [roleView, setRoleView] = useState("developer");
```

Add header controls:

```jsx
<div className="inline-flex rounded-xl border border-slate-300 bg-white p-1">
  <button
    type="button"
    onClick={() => setRoleView("developer")}
    className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${roleView === "developer" ? "bg-slate-900 text-white" : "text-slate-700"}`}
  >
    Developer
  </button>
  <button
    type="button"
    onClick={() => setRoleView("business")}
    className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${roleView === "business" ? "bg-slate-900 text-white" : "text-slate-700"}`}
  >
    Business
  </button>
</div>
```

Replace card body rendering:

```jsx
<p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
  View: {roleView === "developer" ? "Developer" : "Business"}
</p>
<p className="mt-2 text-sm leading-7 text-slate-700">{getTechnicalReferenceCopy(item, roleView)}</p>
```

- [ ] **Step 5: Build and smoke-check**

Run: `npm run build`  
Expected: Vite build succeeds with no import/runtime errors.

- [ ] **Step 6: Commit UI role-toggle work**

```bash
git add components/WorkflowSections.jsx technicalReferenceView.js tests/technical-reference-view.test.mjs
git commit -m "feat: add global developer-business toggle for technical reference cards"
```

### Task 4: Final Verification + Manual QA Checklist

**Files:**
- Verify all files changed in Tasks 1-3

- [ ] **Step 1: Run full data tests**

Run: `npm run test:data`  
Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run: `npm run build`  
Expected: build output generated in `dist/` with no failures.

- [ ] **Step 3: Run local app and validate UX manually**

Run: `npm run dev`  
Manual checks in browser:
- Technical references panel shows `Developer`/`Business` global toggle.
- Changing toggle updates all capability cards in current step.
- Status groupings and capability counts remain unchanged.
- Source pointer chips still render for every card.

- [ ] **Step 4: Final commit if any cleanup is needed**

```bash
git add -A
git commit -m "chore: finalize role-specific technical reference card experience"
```

## Self-Review

- Spec coverage: All approved items are mapped to tasks (global toggle, one capability per card, explicit dual-role copy, validation, unchanged source pointers).
- Placeholder scan: No TBD/TODO/implement-later placeholders remain.
- Type consistency: Uses `developerCopy` and `businessCopy` consistently across data, validator, utility, tests, and UI.


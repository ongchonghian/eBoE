# Technical Reference Role Cards Design

Date: 2026-05-05
Project: TrustVC eBoE workflow app
Scope: Technical references panel in workflow step detail

## 1. Problem Statement

The technical references panel currently displays capability cards with one generic paragraph. This makes it harder for two key audiences:

- Developers need implementation-specific direction.
- Business users need operational meaning and ownership context.

Each technical capability chip (for example, "Forwarding Attestation schema", "Bank-to-bank routing integration", "AcceptedEBoE schema") must have card content that can be read through either a developer or business lens.

## 2. Goals

- Ensure every technical reference capability has one card with role-aware copy.
- Provide a global role toggle for the panel: `Developer` or `Business`.
- Keep existing status grouping (`Existing`, `Enhancement`, `Partial`, `Provider`).
- Make role switching instant and consistent across all cards in a step.

## 3. Non-Goals

- No changes to workflow step sequence.
- No changes to source pointer semantics.
- No automated AI generation of role text at runtime.
- No redesign of status pill taxonomy.

## 4. Audience and UX Decision

Approved by user:

- Card model: one capability = one card.
- Role presentation: globally toggled role view, not per-card toggles.
- Content strategy: explicit role copy in data (`developerCopy`, `businessCopy`), not generated templates.

## 5. Approaches Considered

### A. Explicit dual-role copy in data (Recommended, selected)

- Add `developerCopy` and `businessCopy` to each technical reference entry.
- UI renders one based on global toggle.

Pros:

- Predictable quality and tone control.
- Easy review by product and engineering stakeholders.
- Minimal runtime complexity.

Cons:

- More authoring effort.

### B. Rule-based templated generation from one base text

Pros:

- Lower authoring overhead.

Cons:

- Generic and repetitive output risk.
- Weaker business readability for nuanced capabilities.

### C. One text with minimal role labels

Pros:

- Fastest implementation.

Cons:

- Does not satisfy role-catered content requirement.

## 6. Data Model Design

File: `technicalReferencesData.js`

Current shape:

- `stepId`
- `status`
- `capability`
- `technicalReference`
- `sourcePointers`

Target shape:

- `stepId`
- `status`
- `capability`
- `developerCopy`
- `businessCopy`
- `sourcePointers`

Compatibility recommendation:

- Keep `technicalReference` only as a temporary fallback while migrating existing entries.
- Add validation checks that both role fields are present and non-empty.

## 7. Component Design

File: `components/WorkflowSections.jsx`

### 7.1 Global Role Toggle

In `TechnicalReferencesPanel`, add state:

- `roleView = "developer" | "business"`

Render a segmented toggle near panel header:

- Button A: `Developer`
- Button B: `Business`

Behavior:

- One active role at any time.
- Toggle applies to all cards in the panel.
- Toggle state persists while user moves within the same step view session.

### 7.2 Card Body Rendering

For each capability card:

- Title remains `capability`.
- Body becomes:
  - `item.developerCopy` when role is `developer`
  - `item.businessCopy` when role is `business`
- Source pointer chips remain unchanged.

### 7.3 Optional Context Label

Add small text indicator near cards:

- `View: Developer` or `View: Business`

Purpose:

- Improve scan clarity when users switch roles and expand/collapse status sections.

## 8. Copywriting Standards

### Developer Copy

- Explain what must be built, wired, validated, or deployed.
- Use precise terms: schema, profile, integration boundary, conformance, policy hooks.
- Avoid business-heavy language.

### Business Copy

- Explain why capability matters for operations, risk, compliance, interoperability, and accountability.
- Clarify ownership boundaries (framework vs provider vs bank responsibilities).
- Avoid code-level detail unless needed for decision context.

### Tone Rules

- Clear over clever.
- Specific over vague.
- Outcome-oriented for business copy, implementation-oriented for developer copy.

## 9. Validation and Error Handling

File: `workflowValidation.js`

Add checks:

- `developerCopy` exists and is non-empty string.
- `businessCopy` exists and is non-empty string.

If transitional fallback is retained:

- Warn when fallback `technicalReference` is used.
- Fail validation once migration is complete.

UI fallback behavior (defensive):

- If selected role field is missing unexpectedly, show a short placeholder:
  - `Role-specific copy pending for this capability.`
- Keep pointer list visible so the card remains useful.

## 10. Testing Strategy

### Data Validation

- Run workflow data assertions and confirm no missing role copy.

### UI Functional Checks

- Global toggle switches all cards in visible step.
- Status accordion behavior remains unchanged.
- Card counts and status pills unchanged.
- Pointer chips render unchanged for all cards.

### Content QA

- Spot-check sampled capabilities from each status category for:
  - technical correctness in developer mode
  - operational clarity in business mode

## 11. Success Criteria

- Every technical reference capability has role-specific content for both audiences.
- Global toggle updates all capability cards without page reload.
- Developers can infer implementation direction directly from cards.
- Business users can understand relevance and ownership without parsing engineering jargon.


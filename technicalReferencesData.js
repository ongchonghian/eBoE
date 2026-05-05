export const technicalReferenceStatuses = ["existing", "enhancement", "partial", "provider"];

export const technicalReferenceEntries = [
  {
    stepId: "commercial-context",
    status: "provider",
    capability: "LC Origination And Examination Workflow",
    developerCopy:
      "Implement LC issuance orchestration, discrepancy handling, and bank workflow state transitions; TrustVC supplies only trust primitives.",
    businessCopy:
      "Keeps ownership of LC operations and bank controls with implementers while using TrustVC for verifiable trust evidence.",
    sourcePointers: [
      "../trustvc/README.md#about",
      "../TrustVC-Documentation/docs/tutorial/transferability.md",
      "eBOE Workflow.md#8.3 Solution Provider Builds",
    ],
  },
  {
    stepId: "commercial-context",
    status: "provider",
    capability: "Operational Integrations (SWIFT/ISO20022/KYC)",
    developerCopy:
      "Integrate SWIFT/ISO20022 messaging, sanctions and KYC checks, and settlement connectors outside TrustVC core modules.",
    businessCopy:
      "Ensures regulated screening, messaging, and settlement operations stay aligned with existing bank compliance systems.",
    sourcePointers: [
      "../trustvc-functions/README.md#verify",
      "eBOE Workflow.md#14. Implementation Recommendation",
    ],
  },

  {
    stepId: "draft-eboe",
    status: "existing",
    capability: "W3C VC Signing And Verification",
    developerCopy:
      "Use existing TrustVC W3C signing and verification functions to issue and validate draft eBoE credentials.",
    businessCopy:
      "Reduces delivery risk by reusing proven cryptographic issuance and verification components.",
    sourcePointers: [
      "../trustvc/src/w3c/sign.ts",
      "../trustvc/src/w3c/verify.ts",
      "../trustvc/src/verify/verify.ts",
    ],
  },
  {
    stepId: "draft-eboe",
    status: "existing",
    capability: "DID Identity And Credential Status",
    developerCopy:
      "Reuse DID document resolution and credential status-list validation for issuer identity and credential status checks.",
    businessCopy:
      "Provides reliable issuer authenticity and revocation visibility for operational trust decisions.",
    sourcePointers: [
      "../did/README.md#didweb",
      "../trustvc/src/verify/fragments/document-status/w3cCredentialStatus.ts",
      "../trustvc-cli/src/commands/w3c/credentialStatus/create.ts",
    ],
  },
  {
    stepId: "draft-eboe",
    status: "enhancement",
    capability: "DraftEBoE Schema Profile",
    developerCopy:
      "Define and publish a DraftEBoE schema/profile with required claims and validation constraints.",
    businessCopy:
      "Creates consistent draft instrument semantics across providers and counterparties.",
    sourcePointers: [
      "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
      "eBOE Workflow.md#12. Recommended Repository Enhancements",
    ],
  },

  {
    stepId: "presentation-bundle",
    status: "existing",
    capability: "Per-Document Authenticity Verification",
    developerCopy:
      "Verify each credential in the presentation bundle independently using existing verification fragments and verifier builders.",
    businessCopy:
      "Lets operators isolate invalid documents without losing integrity checks for valid ones.",
    sourcePointers: [
      "../trustvc/src/verify/verify.ts",
      "../toolkit/src/views/verify.tsx",
      "../trustvc-functions/netlify/functions/verify/router.ts",
    ],
  },
  {
    stepId: "presentation-bundle",
    status: "enhancement",
    capability: "LC Presentation Manifest Profile",
    developerCopy:
      "Create a manifest profile that binds document hashes, ordering, and submission metadata deterministically.",
    businessCopy:
      "Enables auditable package integrity for cross-platform presentation and examination workflows.",
    sourcePointers: [
      "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
      "eBOE Workflow.md#12. Recommended Repository Enhancements",
    ],
  },
  {
    stepId: "presentation-bundle",
    status: "provider",
    capability: "Bundle Assembly And LC Compliance Logic",
    developerCopy:
      "Build provider-side bundle assembly UX, submission cut-off handling, discrepancy loops, and bank routing rules.",
    businessCopy:
      "Preserves operational control for timing, compliance, and routing accountability.",
    sourcePointers: [
      "../TrustVC-Documentation/docs/how-tos/verifydocument.md",
      "eBOE Workflow.md#8.3 Solution Provider Builds",
    ],
  },
  {
    stepId: "presentation-bundle",
    status: "partial",
    capability: "Hybrid Verification + Workflow Execution",
    developerCopy:
      "Compose TrustVC verification rails with provider workflow engines for examination decisions and process execution.",
    businessCopy:
      "Splits responsibilities cleanly between shared trust validation and institution-specific operations.",
    sourcePointers: [
      "../trustvc/README.md#functions",
      "eBOE Workflow.md#8. Capability Mapping",
    ],
  },

  {
    stepId: "bank-forwarding",
    status: "existing",
    capability: "Bank-Signed VC Event Pattern",
    developerCopy:
      "Issue forwarding-event credentials signed by bank DIDs using existing TrustVC signing primitives.",
    businessCopy:
      "Provides tamper-evident custody history that downstream banks can verify independently.",
    sourcePointers: [
      "../trustvc/src/w3c/sign.ts",
      "../TrustVC-Documentation/docs/how-tos/issuer/did-web.md",
    ],
  },
  {
    stepId: "bank-forwarding",
    status: "enhancement",
    capability: "Forwarding Attestation Conformance Profile",
    developerCopy:
      "Define a forwarding attestation profile with canonical claims and validation rules for interbank forwarding events.",
    businessCopy:
      "Standardizes forwarding evidence across banks and lowers reconciliation disputes.",
    sourcePointers: [
      "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
      "eBOE Workflow.md#C3 — Bank Forwarding Profile",
    ],
  },
  {
    stepId: "bank-forwarding",
    status: "provider",
    capability: "Interbank Routing Integration",
    developerCopy:
      "Implement operational interbank routing channels, participant onboarding controls, and message-channel integrations.",
    businessCopy:
      "Ensures secure delivery and governance across participating bank networks.",
    sourcePointers: [
      "../trustvc-functions/README.md",
      "eBOE Workflow.md#14. Implementation Recommendation",
    ],
  },

  {
    stepId: "acceptance",
    status: "existing",
    capability: "Transferable Record Minting And Ownership",
    developerCopy:
      "Use token registry and title escrow mint/ownership functions to issue accepted instruments and track holder and owner state.",
    businessCopy:
      "Establishes clear digital title ownership required for transfer and enforceability.",
    sourcePointers: [
      "../trustvc/src/token-registry-functions/mint.ts",
      "../trustvc/src/token-registry-functions/ownerOf.ts",
      "../trustvc-cli/src/commands/token-registry/mint.ts",
    ],
  },
  {
    stepId: "acceptance",
    status: "enhancement",
    capability: "AcceptedEBoE Schema And Acceptance Semantics",
    developerCopy:
      "Implement an AcceptedEBoE profile linking draft hash, manifest reference, and explicit acceptance outcome fields.",
    businessCopy:
      "Creates an auditable acceptance record for downstream transfer, financing, and oversight.",
    sourcePointers: [
      "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
      "eBOE Workflow.md#C4 — Accepted eBoE Transfer Profile",
    ],
  },
  {
    stepId: "acceptance",
    status: "provider",
    capability: "Bank Acceptance Policy Engine",
    developerCopy:
      "Build policy-engine rules for legal checks, credit limits, and acceptance decision workflows.",
    businessCopy:
      "Keeps institution-specific risk policy and approval accountability inside bank operations.",
    sourcePointers: [
      "eBOE Workflow.md#14. Implementation Recommendation",
      "eBOE Workflow.md#8.3 Solution Provider Builds",
    ],
  },
  {
    stepId: "acceptance",
    status: "partial",
    capability: "Framework And Policy Split",
    developerCopy:
      "Use TrustVC issuance mechanics for accepted records while delegating policy and routing to provider services.",
    businessCopy:
      "Separates shared infrastructure from proprietary policy logic for governance clarity.",
    sourcePointers: [
      "../trustvc/README.md#7-tradetrust-token-registry",
      "eBOE Workflow.md#8. Capability Mapping",
    ],
  },

  {
    stepId: "endorsement",
    status: "existing",
    capability: "Holder/Owner Transfer Mechanics",
    developerCopy:
      "Apply existing transfer APIs for endorsement flows across holder, beneficiary, and owner transitions.",
    businessCopy:
      "Enables controlled title negotiation and transfer between counterparties.",
    sourcePointers: [
      "../trustvc/src/token-registry-functions/transfer.ts",
      "../trustvc-cli/src/commands/title-escrow/endorse-transfer-owner.ts",
      "../TrustVC-Documentation/docs/how-tos/open-attestation/transferable-records/flow.mdx",
    ],
  },
  {
    stepId: "endorsement",
    status: "existing",
    capability: "Return/Reject Transfer Controls",
    developerCopy:
      "Use existing token-registry and title-escrow reject and return operations for safe transfer reversals.",
    businessCopy:
      "Provides operational safeguards to unwind or refuse transfers with traceable state changes.",
    sourcePointers: [
      "../trustvc/src/token-registry-functions/rejectTransfers.ts",
      "../trustvc/src/token-registry-functions/returnToken.ts",
      "../trustvc-cli/src/commands/title-escrow/reject-transfer-owner.ts",
    ],
  },
  {
    stepId: "endorsement",
    status: "provider",
    capability: "Financing And Negotiation Product Flow",
    developerCopy:
      "Implement discounting logic, financing terms, and negotiation UX on top of TrustVC transfer events.",
    businessCopy:
      "Supports product differentiation while keeping financing decisions within institutional policy boundaries.",
    sourcePointers: ["eBOE Workflow.md#8.3 Solution Provider Builds"],
  },

  {
    stepId: "maturity",
    status: "existing",
    capability: "Return/Burn/Restore Lifecycle Operations",
    developerCopy:
      "Reuse token return, restore, and burn primitives to close instruments at maturity or discharge.",
    businessCopy:
      "Maintains end-of-life record integrity for settlement closure and audit.",
    sourcePointers: [
      "../trustvc/src/token-registry-functions/returnToken.ts",
      "../trustvc-cli/src/commands/title-escrow/return-to-issuer.ts",
    ],
  },
  {
    stepId: "maturity",
    status: "enhancement",
    capability: "Lifecycle Vocabulary For Paid/Discharged/Dishonoured",
    developerCopy:
      "Define standardized lifecycle states and events for paid, discharged, and dishonoured closure outcomes.",
    businessCopy:
      "Improves cross-party reporting consistency for audit, risk, and regulatory interpretation.",
    sourcePointers: [
      "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
      "eBOE Workflow.md#9. Lifecycle State Machine",
      "eBOE Workflow.md#15. Open Questions for v0.2",
    ],
  },
  {
    stepId: "maturity",
    status: "provider",
    capability: "Payment, Recourse, And Legal Workflow",
    developerCopy:
      "Implement settlement orchestration, recourse handling, and legal enforcement workflows outside framework core.",
    businessCopy:
      "Keeps financial liability and legal process ownership with operating institutions.",
    sourcePointers: [
      "eBOE Workflow.md#8.3 Solution Provider Builds",
      "eBOE Workflow.md#14. Implementation Recommendation",
    ],
  },
];

export const technicalReferencesByStep = technicalReferenceEntries.reduce((acc, entry) => {
  if (!acc[entry.stepId]) acc[entry.stepId] = [];
  acc[entry.stepId].push(entry);
  return acc;
}, {});

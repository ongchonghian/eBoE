export const technicalReferenceStatuses = ["existing", "enhancement", "partial", "provider"];

export const technicalReferenceEntries = [
  {
    stepId: "commercial-context",
    status: "provider",
    capability: "LC Origination And Examination Workflow",
    technicalReference:
      "TrustVC provides trust rails, but LC issuance, discrepancy checks, and bank workflow orchestration remain provider and bank implementation scope.",
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
    technicalReference:
      "Operational rails such as sanctions screening, messaging integration, and settlement processing are outside TrustVC core modules.",
    sourcePointers: [
      "../trustvc-functions/README.md#verify",
      "eBOE Workflow.md#14. Implementation Recommendation",
    ],
  },

  {
    stepId: "draft-eboe",
    status: "existing",
    capability: "W3C VC Signing And Verification",
    technicalReference:
      "Draft eBoE issuance can reuse W3C VC signing and verification primitives already implemented in TrustVC core.",
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
    technicalReference:
      "Issuer identity and credential status verification can use existing DID and status-list based validation flows.",
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
    technicalReference:
      "eBoE-specific schema packaging is required so independent implementations can issue draft instruments with consistent semantics.",
    sourcePointers: [
      "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
      "eBOE Workflow.md#12. Recommended Repository Enhancements",
    ],
  },

  {
    stepId: "presentation-bundle",
    status: "existing",
    capability: "Per-Document Authenticity Verification",
    technicalReference:
      "Each document in the presentation bundle can be independently verified using existing verification fragments and verifier builders.",
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
    technicalReference:
      "A standard manifest profile is required for cross-platform package integrity and deterministic submission envelopes.",
    sourcePointers: [
      "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
      "eBOE Workflow.md#12. Recommended Repository Enhancements",
    ],
  },
  {
    stepId: "presentation-bundle",
    status: "provider",
    capability: "Bundle Assembly And LC Compliance Logic",
    technicalReference:
      "Bundling UX, submission cut-offs, discrepancy loops, and bank routing rules are provider-side workflow responsibilities.",
    sourcePointers: [
      "../TrustVC-Documentation/docs/how-tos/verifydocument.md",
      "eBOE Workflow.md#8.3 Solution Provider Builds",
    ],
  },
  {
    stepId: "presentation-bundle",
    status: "partial",
    capability: "Hybrid Verification + Workflow Execution",
    technicalReference:
      "This stage combines existing TrustVC verification rails with provider-owned LC process execution and examination logic.",
    sourcePointers: [
      "../trustvc/README.md#functions",
      "eBOE Workflow.md#8. Capability Mapping",
    ],
  },

  {
    stepId: "bank-forwarding",
    status: "existing",
    capability: "Bank-Signed VC Event Pattern",
    technicalReference:
      "Advising banks can already sign verifiable credentials that include custody-event metadata and bank DID identity.",
    sourcePointers: [
      "../trustvc/src/w3c/sign.ts",
      "../TrustVC-Documentation/docs/how-tos/issuer/did-web.md",
    ],
  },
  {
    stepId: "bank-forwarding",
    status: "enhancement",
    capability: "Forwarding Attestation Conformance Profile",
    technicalReference:
      "A framework-level forwarding profile is needed so forwarding events are produced and validated consistently across banks.",
    sourcePointers: [
      "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
      "eBOE Workflow.md#C3 — Bank Forwarding Profile",
    ],
  },
  {
    stepId: "bank-forwarding",
    status: "provider",
    capability: "Interbank Routing Integration",
    technicalReference:
      "Operational message routing, onboarding controls, and channel integration are implementation concerns for provider/bank platforms.",
    sourcePointers: [
      "../trustvc-functions/README.md",
      "eBOE Workflow.md#14. Implementation Recommendation",
    ],
  },

  {
    stepId: "acceptance",
    status: "existing",
    capability: "Transferable Record Minting And Ownership",
    technicalReference:
      "Accepted instrument issuance can reuse token registry and title escrow mechanics for holder/owner state and transferability.",
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
    technicalReference:
      "Accepted instrument semantics need an eBoE-specific profile linking draft hash, manifest reference, and acceptance state.",
    sourcePointers: [
      "eBOE Workflow.md#8.2 TrustVC Framework Enhancements",
      "eBOE Workflow.md#C4 — Accepted eBoE Transfer Profile",
    ],
  },
  {
    stepId: "acceptance",
    status: "provider",
    capability: "Bank Acceptance Policy Engine",
    technicalReference:
      "Acceptance decisioning rules, legal checks, and credit controls remain provider/bank policy implementation domains.",
    sourcePointers: [
      "eBOE Workflow.md#14. Implementation Recommendation",
      "eBOE Workflow.md#8.3 Solution Provider Builds",
    ],
  },
  {
    stepId: "acceptance",
    status: "partial",
    capability: "Framework And Policy Split",
    technicalReference:
      "Issuance mechanics are available in TrustVC rails, while acceptance policy and routing remain institution-specific implementations.",
    sourcePointers: [
      "../trustvc/README.md#7-tradetrust-token-registry",
      "eBOE Workflow.md#8. Capability Mapping",
    ],
  },

  {
    stepId: "endorsement",
    status: "existing",
    capability: "Holder/Owner Transfer Mechanics",
    technicalReference:
      "Endorsement and negotiation can use existing transfer APIs for holder, beneficiary, and owner transitions.",
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
    technicalReference:
      "Lifecycle-safe transfer controls for return and rejection are already available via token-registry and title-escrow operations.",
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
    technicalReference:
      "Discounting, financing terms, and negotiation workflow UX remain provider capabilities layered on trust rails.",
    sourcePointers: ["eBOE Workflow.md#8.3 Solution Provider Builds"],
  },

  {
    stepId: "maturity",
    status: "existing",
    capability: "Return/Burn/Restore Lifecycle Operations",
    technicalReference:
      "Token return, restore, and burn primitives already exist and can support discharge-oriented closing mechanics.",
    sourcePointers: [
      "../trustvc/src/token-registry-functions/returnToken.ts",
      "../trustvc-cli/src/commands/title-escrow/return-to-issuer.ts",
    ],
  },
  {
    stepId: "maturity",
    status: "enhancement",
    capability: "Lifecycle Vocabulary For Paid/Discharged/Dishonoured",
    technicalReference:
      "A standardized lifecycle event vocabulary is needed to represent closure outcomes consistently across implementations.",
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
    technicalReference:
      "Settlement, recourse handling, and legal enforcement remain bank/provider operating workflows outside framework scope.",
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

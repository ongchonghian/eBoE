export const tone = {
  existing: {
    label: "Works with existing TrustVC primitives",
    shortLabel: "Existing primitive",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-800 ring-emerald-300",
    panel: "bg-emerald-50 border-emerald-200",
    icon: "check",
  },
  enhancement: {
    label: "Needs a TrustVC interoperability profile",
    shortLabel: "Needs interop profile",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    panel: "bg-amber-50 border-amber-200",
    icon: "warn",
  },
  partial: {
    label: "Existing primitives + extra build",
    shortLabel: "Primitives + extra build",
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-900 ring-sky-200",
    panel: "bg-sky-50 border-sky-200",
    icon: "info",
  },
  provider: {
    label: "Built by solution providers",
    shortLabel: "Provider build",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-800 ring-slate-300",
    panel: "bg-slate-50 border-slate-200",
    icon: "info",
  },
};

export const legendItems = [
  ["existing", "Works with existing TrustVC primitives", "The capability already exists in TrustVC / TradeTrust today."],
  ["enhancement", "Needs a TrustVC interoperability profile", "Framework-level schema, verifier profile or lifecycle convention is still required."],
  ["provider", "Built by solution providers", "Belongs to banks, platforms or solution providers, not the framework."],
  ["partial", "Existing primitives + extra build", "Some TrustVC primitives apply, but profile or provider work is still needed."],
];

export const startHerePrimer = {
  title: "How a trade payment promise becomes a trusted digital instrument",
  subtitle:
    "Follow a seller, buyer, and their banks through a letter-of-credit transaction. See when the draft eBoE is created, when the bank accepts it, and how TrustVC helps different systems verify and transfer the accepted instrument.",
  cards: [
    {
      title: "What is a letter of credit?",
      body:
        "A letter of credit (LC) is a bank promise to pay the seller if the seller presents the required documents. It reduces reliance on direct trust between buyer and seller because payment depends on document compliance.",
    },
    {
      title: "What is an eBoE?",
      body:
        "An electronic bill of exchange (eBoE) is a digital payment instruction. It starts as a seller's draft and becomes transferable only after the buyer's bank accepts it.",
    },
    {
      title: "What is TrustVC?",
      body:
        "TrustVC is not the app that runs the whole workflow. It is the shared trust framework that solution providers use to issue, verify and transfer interoperable digital trade records.",
    },
    {
      title: "How to read this page",
      body:
        "Walk through steps 00 → 06. Each step shows who acts, which document moves, what TrustVC does, and what banks or solution providers still need to build.",
    },
  ],
};

export const roleMap = {
  intro:
    "The same organisation can have several names depending on the lens you use. The seller is also the LC beneficiary and usually the drawer of the bill. The issuing bank may also be the drawee, and after acceptance becomes the acceptor.",
  columns: ["Everyday term", "LC term", "Bill of exchange term", "TrustVC / digital term"],
  rows: [
    ["Seller", "Beneficiary", "Drawer / Payee", "VC issuer"],
    ["Buyer", "Applicant", "May be drawee", "Commercial counterparty"],
    ["Buyer's bank", "Issuing bank", "Drawee / Acceptor", "Accepted eBoE issuer"],
    ["Current holder", "Holder", "Holder / Endorsee", "Token holder"],
    ["Legal owner", "Owner", "Owner", "Token owner"],
  ],
};

export const newcomerPrimer = [
  {
    title: "What problem an LC solves",
    body:
      "A letter of credit (LC) reduces trade risk between unfamiliar parties. The seller gets a bank payment undertaking if required documents are compliant, while the buyer pays against documented performance instead of trust alone.",
  },
  {
    title: "What ePresentation means",
    body:
      "ePresentation is the digital submission of the required LC document set (for example draft eBoE, eBL, invoice, packing list, and insurance certificate) to the bank or platform for examination.",
  },
  {
    title: "How to read this page",
    body:
      "Follow steps 00 to 06 from setup to closure. Each step shows who acts, which documents move, what each artefact is for, and whether the capability is already in TrustVC or still needs framework/provider work.",
  },
];

export const documentIntentGuide = [
  [
    "Draft eBoE VC",
    "Initial digital bill terms from drawer to drawee. It captures payment intent but remains non-transferable before bank acceptance.",
  ],
  [
    "Electronic Bill of Lading (eBL)",
    "Evidence of shipment and transport terms. Depending on structure, it can also represent title/control over goods in transit.",
  ],
  [
    "Commercial Invoice",
    "The seller's commercial claim showing goods or services delivered, price, and amount requested from the buyer side of the transaction.",
  ],
  [
    "Packing List",
    "Item-level packing details used to cross-check quantity, packaging, and logistics handling against other documents.",
  ],
  [
    "Insurance Certificate",
    "Proof that cargo insurance coverage exists per LC requirements, including insured risks, amount, and policy references.",
  ],
  [
    "LC Presentation Manifest",
    "A structured index (with hashes/references) proving exactly which documents were submitted in one presentation package.",
  ],
  [
    "Forwarding Attestation VC",
    "Bank-signed chain-of-custody evidence that a specific presentation package was forwarded to the next bank.",
  ],
  [
    "Accepted eBoE Transferable Record",
    "The accepted instrument issued by the drawee/issuing bank. This is the negotiable form that can be transferred, financed, and eventually discharged.",
  ],
];

export const lifecycleStates = [
  ["Draft", "draft-eboe"],
  ["Presented", "presentation-bundle"],
  ["Forwarded", "bank-forwarding"],
  ["Accepted", "acceptance"],
  ["Negotiated", "endorsement"],
  ["Discharged / Dishonoured", "maturity"],
];

export const workflowSteps = [
  {
    id: "commercial-context",
    no: "00",
    phase: "Pre-flow",
    title: "The trade deal and letter of credit",
    subtitle:
      "Before any digital bill exists, the buyer, seller and banks agree how payment will be protected using a letter of credit.",
    layperson: {
      summary:
        "The buyer and seller agree the commercial deal. The buyer asks its bank to issue a letter of credit, which says what documents the seller must present before payment can happen.",
      actor: "Buyer, seller and their banks",
      document: "Commercial contract and the letter of credit itself",
      trustvcDoes: "Nothing yet. This step is about commercial terms, bank approval, and compliance checks.",
      outsideTrustvc:
        "LC drafting, bank credit decisions, KYC and sanctions checks, and customer onboarding all happen in bank workflow systems.",
    },
    actor: "Buyer / Seller / Banks",
    icon: "bank",
    trustvcUse: "No",
    status: "provider",
    implementation: "New application workflow outside TrustVC",
    trustvcRole:
      "TrustVC is not required at this stage. Commercial agreement, LC application, bank onboarding and credit approval remain bank/platform workflow responsibilities.",
    narration:
      "The process starts before any digital credential is issued. The buyer and seller agree commercial terms, and the buyer asks its bank to issue an LC. The LC clarifies what documents must be presented for payment. TrustVC does not replace LC issuance, bank credit decisions, or compliance checks.",
    roles: [
      ["Buyer / Applicant", "Requests the LC and is responsible for reimbursement arrangements."],
      ["Seller / Beneficiary", "Ships goods and prepares documents for presentation."],
      ["Issuing Bank", "Issues the LC on behalf of the buyer."],
      ["Advising Bank", "Advises the LC to the seller and may receive presentation."],
    ],
    artefacts: ["Commercial contract", "Letter of credit", "Bank customer records"],
    needs: ["LC workflow engine", "Bank approval workflow", "KYC / credit / sanctions checks"],
    problemFocus: {
      coreTension: "Risk pricing and compliance commitments are decided before any cryptographic artefact exists.",
      decisionAtRisk: "Banks can issue an LC on assumptions that are hard to trace later when disputes occur.",
      consequence: "Weak pre-trade controls push defects downstream into document examination and payment delay.",
      failureModes: [
        "Commercial contract terms and LC conditions drift apart.",
        "Credit, KYC or sanctions checks run in disconnected systems.",
        "Advising/issuing responsibilities are ambiguous during exception handling.",
      ],
    },
  },
  {
    id: "draft-eboe",
    no: "01",
    phase: "Draft",
    title: "Seller creates the draft eBoE",
    subtitle:
      "The seller creates a draft digital payment instruction that says who should pay, who should be paid, how much, and under which LC.",
    layperson: {
      summary:
        "The seller creates a draft electronic bill of exchange. This is a digital payment instruction that records who should pay, who should receive payment, how much is due, and under which LC.",
      actor: "Seller / exporter, acting as the drawer of the bill",
      document: "Draft eBoE as a non-transferable verifiable credential",
      trustvcDoes:
        "Lets the seller sign the draft, and lets banks check who created it, whether it changed, and whether it is still valid.",
      outsideTrustvc:
        "The seller's app, the bank's specific LC requirements, and the eBoE schema profile are still implementation work.",
    },
    actor: "Drawer / Exporter",
    icon: "file",
    trustvcUse: "Yes",
    status: "existing",
    implementation: "Uses existing VC issuance, DID signing and verification primitives",
    trustvcRole:
      "TrustVC can support this directly as a W3C Verifiable Credential signed by the drawer/exporter DID. It does not require token minting because the draft is not yet transferable.",
    narration:
      "The exporter, acting as drawer, creates the draft electronic bill of exchange. In the framework, this is a verifiable credential. It records the drawee, payee, amount, payment terms, LC reference and terms. Because it is only a draft, it is intentionally non-transferable.",
    roles: [
      ["Drawer", "The exporter who issues the draft bill."],
      ["Drawee", "The party expected to accept or pay."],
      ["Payee", "The party to whom payment is directed."],
      ["Verifier", "Any party checking authenticity, source and status."],
    ],
    artefacts: ["Draft eBoE VC", "Exporter DID signature", "Credential status", "TT file"],
    needs: ["eBoE VC schema", "Renderer template", "Exporter issuing UI or API"],
    problemFocus: {
      coreTension: "The draft must be rich enough for downstream acceptance but must remain non-transferable.",
      decisionAtRisk: "If draft semantics are inconsistent, banks cannot reliably map draft data to acceptance decisions.",
      consequence: "Parties duplicate checks manually and re-key instrument terms during acceptance.",
      failureModes: [
        "Draft payload omits fields needed by LC examination teams.",
        "Issuer identity and signing policies differ across exporters.",
        "Draft status updates are not synchronized with presentation events.",
      ],
    },
  },
  {
    id: "presentation-bundle",
    no: "02",
    phase: "Presentation",
    title: "Seller submits the LC document package",
    subtitle:
      "The seller submits the draft eBoE together with the other LC documents — the eBL, invoice, packing list and insurance certificate.",
    layperson: {
      summary:
        "The seller submits the draft eBoE alongside the supporting LC documents in one package, so the bank can examine them together.",
      actor: "Seller or the platform presenting on the seller's behalf",
      document: "An ePresentation package: draft eBoE, eBL, invoice, packing list and insurance certificate",
      trustvcDoes:
        "Verifies each digital document independently: who issued it, whether it changed, and whether it is still valid.",
      outsideTrustvc:
        "Bundle assembly UX, LC compliance checks, discrepancy handling, presentation cut-offs and bank routing belong to providers and banks.",
    },
    actor: "Exporter / Presenting Platform",
    icon: "bundle",
    trustvcUse: "Yes",
    status: "partial",
    implementation: "TrustVC verifies documents; solution provider builds bundling and LC checks",
    trustvcRole:
      "TrustVC can verify each verifiable or transferable document in the bundle. It does not define LC examination rules, discrepancy handling, presentation cut-offs or bank routing.",
    narration:
      "This is the ePresentation step. The exporter submits the draft eBoE plus supporting documents, where each document answers a different bank question: what was shipped (eBL), what is being claimed (invoice), what was packed (packing list), and whether risk is covered (insurance certificate). TrustVC helps each party verify authenticity and integrity, while LC compliance checks remain bank/provider responsibilities.",
    roles: [
      ["Presenter", "Usually exporter or exporter platform submitting the bundle."],
      ["Advising / Negotiating Bank", "Receives and examines the presentation before forwarding."],
      ["Verifier", "Validates each document independently."],
    ],
    artefacts: [
      "Presentation manifest",
      "Draft eBoE VC",
      "eBL transferable record",
      "Commercial invoice",
      "Packing list",
      "Insurance certificate",
    ],
    needs: ["Presentation manifest schema", "Document bundle builder", "LC document checklist", "Submission receipt"],
    problemFocus: {
      coreTension: "Every document can be valid cryptographically while the package still fails LC compliance.",
      decisionAtRisk: "Banks may reject or delay based on mismatched document context rather than tamper risk.",
      consequence: "Teams fall back to manual reconciliation loops and inconsistent discrepancy decisions.",
      failureModes: [
        "No canonical manifest linking all submitted hashes and document roles.",
        "Cross-document mismatches (amount, quantity, shipment dates) surface late.",
        "Cut-off and submission evidence are weak across platform boundaries.",
      ],
    },
  },
  {
    id: "bank-forwarding",
    no: "03",
    phase: "Forwarding",
    title: "Advising bank forwards the package",
    subtitle:
      "The advising bank receives the document package, checks it, and forwards it to the issuing bank with custody evidence.",
    layperson: {
      summary:
        "The advising bank receives the package, performs its checks, and forwards it to the issuing bank - usually the buyer's bank. It signs a forwarding attestation so the next bank can see who handed off what, and when.",
      actor: "Advising bank",
      document: "Forwarding attestation referencing the presentation manifest hash",
      trustvcDoes:
        "Lets the advising bank produce a signed forwarding event so the issuing bank can verify the handoff without relying only on email or manual records.",
      outsideTrustvc:
        "A common forwarding-attestation profile is still needed at the framework level, and bank-to-bank routing and audit conventions are provider work.",
    },
    actor: "Advising Bank",
    icon: "branch",
    trustvcUse: "Yes",
    status: "enhancement",
    implementation: "New framework-level attestation schema using existing VC primitives",
    trustvcRole:
      "TrustVC already supports signed VCs. What is new is a standard Forwarding Attestation profile so platforms can produce and verify the same custody event consistently.",
    narration:
      "The advising bank validates the submitted documents and forwards the package to the issuing bank. To make this interoperable, the bank signs a forwarding attestation referencing the presentation manifest hash, forwarding bank, receiving bank and timestamp.",
    roles: [
      ["Advising Bank", "Receives, verifies and forwards the package."],
      ["Issuing Bank", "Receives the forwarded LC document package."],
      ["Drawee", "In the bill flow, the issuing bank may also be the drawee."],
    ],
    artefacts: ["Forwarding Attestation VC", "Presentation manifest hash", "Bank DID signature"],
    needs: ["ForwardingAttestation schema", "Bank-to-bank routing integration", "Audit event conventions"],
    problemFocus: {
      coreTension: "Forwarding is operationally critical but usually leaves weak cross-platform custody evidence.",
      decisionAtRisk: "Receiving banks cannot distinguish a true forwarding event from a partial or altered package.",
      consequence: "Inter-bank disputes become process-heavy and slow incident resolution.",
      failureModes: [
        "Forwarded payload lacks immutable linkage to the original presentation manifest.",
        "Routing and timestamp evidence is not signed in a common profile.",
        "Audit teams cannot replay the exact handoff path end-to-end.",
      ],
    },
  },
  {
    id: "acceptance",
    no: "04",
    phase: "Acceptance",
    title: "Issuing bank accepts and creates the transferable eBoE",
    subtitle:
      "The issuing bank examines the documents. If it accepts the bill, it issues a new accepted eBoE — the transferable version that can move between parties.",
    layperson: {
      summary:
        "The buyer's bank examines the documents. If the presentation is acceptable, it accepts the bill and issues a new accepted eBoE record. This is the transferable version that can be financed or passed to another holder.",
      actor: "Issuing bank, becoming the acceptor of the bill",
      document: "Accepted eBoE as a transferable record, referencing the draft hash",
      trustvcDoes:
        "Helps create one authoritative transferable record and track who currently holds it and who owns it.",
      outsideTrustvc:
        "The eBoE-specific accepted profile, the bank's acceptance policy engine, and signing-authority rules still need to be built.",
    },
    actor: "Issuing Bank / Drawee",
    icon: "shield",
    trustvcUse: "Yes",
    status: "partial",
    implementation: "Uses existing token registry/title mechanics, needs eBoE schema and acceptance semantics",
    trustvcRole:
      "TradeTrust transferable-record primitives can support title, holder and owner tracking. The framework needs an eBoE-specific AcceptedEBoE profile that references the draft eBoE and presentation manifest.",
    narration:
      "The issuing bank examines the LC documents. If accepted, it does not simply mutate the draft. It issues a new accepted eBoE as a transferable record. This record references the draft hash, uses the bank DID, and is associated with the bank's token registry so title can move interoperably.",
    roles: [
      ["Issuing Bank", "Examines documents and accepts the bill."],
      ["Acceptor", "The drawee after acceptance."],
      ["Holder", "The party controlling the transferable record."],
      ["Owner", "The party with title to the transferable record."],
    ],
    artefacts: ["Accepted eBoE transferable record", "Token registry", "Title escrow", "Draft eBoE hash reference"],
    needs: ["AcceptedEBoE schema", "Acceptance event profile", "Token registry deployment policy", "Bank signing rules"],
    problemFocus: {
      coreTension: "Acceptance changes legal posture, so mutation of draft data is not enough; a new instrument state is required.",
      decisionAtRisk: "Without strict acceptance semantics, title transfer can proceed on an ambiguous obligation state.",
      consequence: "Financing and ownership transfers inherit legal and operational uncertainty.",
      failureModes: [
        "Accepted record does not cryptographically reference the exact draft reviewed by the bank.",
        "Registry policies vary, causing inconsistent holder/owner behavior across providers.",
        "Acceptance event timing and signer authority are not standardized.",
      ],
    },
  },
  {
    id: "endorsement",
    no: "05",
    phase: "Transfer",
    title: "Accepted eBoE is transferred or financed",
    subtitle:
      "Once accepted, the eBoE can be transferred to another holder — for example, a financing bank that discounts it.",
    layperson: {
      summary:
        "The accepted eBoE moves from the current holder to a new holder. For example, a financing bank may pay the seller early and later collect payment when the bill matures.",
      actor: "Current holder (endorser) and the new holder (endorsee)",
      document: "Transfer transaction updating holder and owner on the token registry",
      trustvcDoes:
        "Already supports a single authoritative record and controlled holder/owner transfer.",
      outsideTrustvc:
        "Wallet/custody integrations, mandate approvals and financing product logic are built by banks and platforms.",
    },
    actor: "Current Holder / Endorser",
    icon: "wallet",
    trustvcUse: "Yes",
    status: "existing",
    implementation: "Uses existing transferable-record title transfer mechanics",
    trustvcRole:
      "TrustVC/TradeTrust transferable records already support singularity and ownership/holder changes through token registry mechanics. Providers integrate this into their negotiation or financing workflows.",
    narration:
      "Once the accepted eBoE is transferable, it can be endorsed to another party. The token registry ensures there is a single authoritative current holder and owner. This is the part most similar to the existing ETR model.",
    roles: [
      ["Endorser", "Current holder transferring the instrument."],
      ["Endorsee", "New holder receiving the instrument."],
      ["Financing Bank", "May receive the eBoE for negotiation or discounting."],
    ],
    artefacts: ["Transfer transaction", "Updated holder", "Updated owner", "Optional transfer remark"],
    needs: ["Wallet / custody integration", "User approval workflow", "Financing workflow outside TrustVC"],
    problemFocus: {
      coreTension: "Transfer primitives exist, but negotiation workflows differ by bank and financing model.",
      decisionAtRisk: "A valid token movement may still fail business controls around mandate, approvals, or financing terms.",
      consequence: "Operational teams add manual approvals that reduce transfer speed and confidence.",
      failureModes: [
        "Holder and owner intent is not captured with clear approval evidence.",
        "Wallet/custody integrations do not align with bank operating controls.",
        "Financing-side checks are detached from transfer event context.",
      ],
    },
  },
  {
    id: "maturity",
    no: "06",
    phase: "Closure",
    title: "Payment, discharge or dishonour",
    subtitle:
      "At maturity, the holder presents the accepted eBoE for payment. If paid, it is discharged. If not, it is dishonoured and may trigger recourse.",
    layperson: {
      summary:
        "When the bill is due, the holder asks for payment. If payment is made, the bill is closed. If payment is refused, the bill is dishonoured and the holder may need to seek payment from other liable parties.",
      actor: "Holder, drawee/acceptor and the paying bank",
      document: "Discharge or dishonour event linked to the accepted eBoE",
      trustvcDoes:
        "Can help record that the instrument is closed, so it cannot keep circulating as active.",
      outsideTrustvc:
        "A standard vocabulary for paid, discharged, dishonoured, protested or cancelled outcomes is still needed; payment rails and legal recourse are provider work.",
    },
    actor: "Holder / Drawee / Paying Bank",
    icon: "lifecycle",
    trustvcUse: "Yes",
    status: "enhancement",
    implementation: "Framework needs lifecycle states; providers build payment and recourse workflows",
    trustvcRole:
      "TrustVC can represent status and events, but it needs a standard eBoE lifecycle vocabulary for paid, discharged, dishonoured, protested, cancelled and burned-token outcomes.",
    narration:
      "At maturity, the holder presents the eBoE for payment. If payment is made, the instrument is discharged and the token should be burned or marked inactive. If payment is refused, the bill is dishonoured and recourse events may be recorded.",
    roles: [
      ["Holder", "Presents the accepted eBoE for payment."],
      ["Drawee / Acceptor", "Expected to pay at maturity."],
      ["Paying Bank", "Executes or confirms payment."],
      ["Recourse Party", "May be liable after dishonour depending on legal structure."],
    ],
    artefacts: ["Discharge event", "Dishonour event", "Payment reference", "Token burn or inactive status"],
    needs: ["Lifecycle event schema", "Discharge/dishonour rules", "Payment integration", "Legal recourse workflow"],
    problemFocus: {
      coreTension: "Payment outcome is business-final, but lifecycle semantics are often implementation-specific.",
      decisionAtRisk: "Participants cannot consistently determine whether the instrument is paid, discharged, or in recourse.",
      consequence: "Post-maturity disputes and duplicate claims become harder to resolve quickly.",
      failureModes: [
        "No shared event vocabulary for paid, dishonoured, protested, or cancelled states.",
        "Token deactivation behavior differs by implementation.",
        "Payment references and legal recourse events are not linked to lifecycle state.",
      ],
    },
  },
];

const businessDefinitionsRaw = [
  ["Bill of Exchange (BoE)", "Instrument", "A written payment instrument where one party directs another party to pay a specified amount to a payee, either on demand or at a future date.", "The BoE starts as a draft eBoE VC and becomes a transferable accepted eBoE only after bank acceptance."],
  ["Electronic Bill of Exchange (eBoE)", "Instrument", "A digital representation of a bill of exchange, structured so that source, integrity, status and transfer history can be verified electronically.", "The eBoE is represented first as a non-transferable VC, then as a transferable record after acceptance."],
  ["Buyer", "Commercial party", "The party purchasing goods or services under the commercial contract.", "The buyer is usually the LC applicant and may reimburse the issuing bank."],
  ["Seller", "Commercial party", "The party selling or exporting goods or services under the commercial contract.", "The seller is usually the LC beneficiary and often the drawer of the draft eBoE."],
  ["Drawer", "Party", "The party that issues or draws the bill of exchange and orders the drawee to pay.", "Usually the exporter or seller. The drawer signs the draft eBoE using its DID."],
  ["Drawee", "Party", "The party directed by the drawer to pay the bill of exchange.", "In the LC flow, this is commonly the issuing bank or buyer. After acceptance, the drawee becomes the acceptor."],
  ["Acceptor", "Party", "The drawee after it accepts the bill and becomes obligated to pay according to the instrument terms.", "The issuing bank becomes the acceptor when it accepts the draft and issues the accepted transferable eBoE."],
  ["Payee", "Party", "The party to whom payment is directed under the bill of exchange.", "Often the exporter, seller, beneficiary, or a nominated bank depending on structure."],
  ["Holder", "Party / Control", "The party currently in possession or control of the instrument.", "For the accepted eBoE, holder is represented through the transferable-record holder state."],
  ["Owner", "Party / Title", "The party with title or beneficial ownership of the transferable instrument.", "TrustVC/TradeTrust separates holder and owner where supported."],
  ["Endorser", "Party", "The current holder or owner who transfers the bill to another party by endorsement.", "The endorser initiates token/title transfer for the accepted eBoE."],
  ["Endorsee", "Party", "The party receiving the bill through endorsement or negotiation.", "The endorsee becomes the new holder/owner after transfer completes."],
  ["Letter of Credit (LC)", "Trade finance", "A bank undertaking, typically issued at the buyer's request, to pay the beneficiary if compliant documents are presented.", "The LC drives document presentation. TrustVC verifies documents but does not replace LC processing."],
  ["Complying Presentation", "LC process", "A document presentation that satisfies LC terms and applicable examination rules.", "Banks decide if the submitted document set is compliant before honouring, negotiating, or refusing."],
  ["ePresentation", "LC process", "The act of submitting all required LC documents electronically within the allowed presentation window.", "In this workflow, the exporter or platform submits the package that banks examine and forward."],
  ["Applicant", "LC party", "The buyer that requests the issuing bank to issue the letter of credit.", "The applicant is usually outside the TrustVC credential flow."],
  ["Beneficiary", "LC party", "The seller/exporter entitled to receive payment if LC terms are satisfied.", "The beneficiary commonly acts as drawer and presenter."],
  ["Issuing Bank", "LC party", "The bank that issues the LC on behalf of the buyer/applicant.", "The issuing bank examines documents, accepts the bill, and issues the accepted transferable eBoE."],
  ["Advising Bank", "LC party", "The bank that advises the beneficiary of the LC and may receive documents for forwarding.", "The advising bank can issue a forwarding attestation VC."],
  ["Negotiating Bank", "LC party", "A bank that may purchase, discount or advance funds against compliant documents or a negotiable instrument.", "A financing bank may become an endorsee/holder of the accepted eBoE."],
  ["Acceptance", "Lifecycle event", "The drawee's act of accepting the bill and assuming the obligation to pay according to its terms.", "Acceptance is modelled as a new accepted transferable eBoE referencing the draft hash."],
  ["Accepted eBoE", "Instrument", "The bill after the drawee has accepted the obligation to pay.", "Issued as a new transferable TrustVC/TradeTrust record by the issuing bank."],
  ["Negotiation", "Lifecycle event", "The transfer of a negotiable instrument to another party, often by endorsement and delivery.", "Represented by transferring the transferable eBoE holder/owner state."],
  ["Maturity", "Lifecycle event", "The date or event when payment under the bill becomes due.", "At maturity, the holder presents the accepted eBoE for payment."],
  ["Discharge", "Lifecycle event", "The closing of the instrument after payment or other valid satisfaction of the obligation.", "Discharge should be represented by a lifecycle event and token burn or inactive status convention."],
  ["Dishonour", "Lifecycle event", "Failure or refusal to accept or pay the bill when required.", "Dishonour needs a standard event profile for non-payment and recourse events."],
  ["Electronic Bill of Lading (eBL)", "Trade document", "A digital transport document that records shipment details and, in transferable structures, can represent title/control.", "The eBL is commonly part of the LC document set presented with the draft eBoE."],
  ["Commercial Invoice", "Trade document", "A document issued by the seller describing goods/services supplied, unit values, totals, and payment claim.", "Used by banks to compare commercial claims against LC requirements and related transport documents."],
  ["Packing List", "Trade document", "A detailed list of shipped packages, quantities, and packing configuration.", "Used to reconcile shipment detail across presentation documents."],
  ["Insurance Certificate", "Trade document", "Evidence that cargo insurance was arranged with required coverage and policy details.", "Used to show insurance obligations under the LC were met."],
  ["Verifiable Credential (VC)", "TrustVC / technical", "A tamper-evident digital credential that can be cryptographically verified for issuer, integrity and status.", "The draft eBoE, forwarding attestation and lifecycle events can be VCs."],
  ["Decentralised Identifier (DID)", "TrustVC / technical", "A resolvable identifier used to associate a party with verification material such as public keys.", "Exporters and banks sign TrustVC artefacts using DIDs."],
  ["Token Registry", "TrustVC / technical", "A registry used to represent and verify title/transfer state for transferable records.", "The accepted eBoE uses the issuing bank's token registry."],
  ["Transferable Record", "TrustVC / technical", "A digital record designed so control/title can be transferred while preserving singularity.", "Only the accepted eBoE is treated as transferable. The draft remains non-transferable."],
  ["Presentation Manifest", "Interoperability artefact", "A structured reference list of the documents included in an LC presentation package.", "A proposed framework enhancement for consistent LC presentation verification."],
  ["Forwarding Attestation", "Interoperability artefact", "A signed statement that a bank received and forwarded a specific presentation package to another bank.", "A proposed VC profile for chain-of-custody evidence between banks."],
];

export const businessDefinitions = businessDefinitionsRaw.map(([term, category, definition, appMeaning]) => ({
  term,
  category,
  definition,
  appMeaning,
}));

export const stepTermMap = {
  "commercial-context": ["Buyer", "Applicant", "Seller", "Beneficiary", "Letter of Credit (LC)", "Issuing Bank", "Advising Bank"],
  "draft-eboe": ["Bill of Exchange (BoE)", "Electronic Bill of Exchange (eBoE)", "Drawer", "Drawee", "Payee", "Verifiable Credential (VC)", "Decentralised Identifier (DID)"],
  "presentation-bundle": [
    "Letter of Credit (LC)",
    "Complying Presentation",
    "ePresentation",
    "Beneficiary",
    "Presentation Manifest",
    "Electronic Bill of Lading (eBL)",
    "Commercial Invoice",
    "Packing List",
    "Insurance Certificate",
    "Verifiable Credential (VC)",
    "Transferable Record",
    "Advising Bank",
  ],
  "bank-forwarding": ["Advising Bank", "Issuing Bank", "Forwarding Attestation", "Drawee", "Decentralised Identifier (DID)"],
  acceptance: ["Acceptance", "Acceptor", "Issuing Bank", "Drawee", "Accepted eBoE", "Token Registry", "Transferable Record", "Holder", "Owner"],
  endorsement: ["Negotiation", "Endorser", "Endorsee", "Holder", "Owner", "Token Registry", "Negotiating Bank"],
  maturity: ["Maturity", "Holder", "Drawee", "Acceptor", "Discharge", "Dishonour", "Token Registry"],
};

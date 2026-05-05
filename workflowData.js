export const tone = {
  existing: {
    label: "Existing TrustVC",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    panel: "bg-emerald-50 border-emerald-200",
    icon: "check",
  },
  enhancement: {
    label: "TrustVC Enhancement",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    panel: "bg-amber-50 border-amber-200",
    icon: "warn",
  },
  partial: {
    label: "Mixed",
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-800 ring-sky-200",
    panel: "bg-sky-50 border-sky-200",
    icon: "info",
  },
  provider: {
    label: "Provider Build",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-700 ring-slate-200",
    panel: "bg-slate-50 border-slate-200",
    icon: "info",
  },
};

export const legendItems = [
  ["existing", "Existing TrustVC", "Can use current TrustVC / TradeTrust primitives."],
  ["enhancement", "TrustVC Enhancement", "Needs framework schema, verifier profile or lifecycle convention."],
  ["provider", "Provider Build", "Belongs to solution providers, banks or platforms."],
  ["partial", "Mixed", "Uses existing TrustVC plus enhancement or provider work."],
];

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
    title: "Commercial & LC Context",
    subtitle: "Buyer, seller and banks set trade terms and the LC risk-allocation model.",
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
  },
  {
    id: "draft-eboe",
    no: "01",
    phase: "Draft",
    title: "Draft eBoE Issuance",
    subtitle: "Exporter issues a non-transferable draft eBoE as a verifiable credential.",
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
  },
  {
    id: "presentation-bundle",
    no: "02",
    phase: "Presentation",
    title: "LC ePresentation Bundle",
    subtitle: "Exporter submits the LC document set for examination in a single digital package.",
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
  },
  {
    id: "bank-forwarding",
    no: "03",
    phase: "Forwarding",
    title: "Advising Bank Forwarding",
    subtitle: "Advising bank forwards the package to the issuing bank with custody evidence.",
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
  },
  {
    id: "acceptance",
    no: "04",
    phase: "Acceptance",
    title: "Acceptance & Transferable eBoE Issuance",
    subtitle: "Issuing bank accepts and creates the transferable eBoE.",
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
  },
  {
    id: "endorsement",
    no: "05",
    phase: "Transfer",
    title: "Endorsement / Negotiation",
    subtitle: "Accepted eBoE is transferred to a new holder or financing bank.",
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
  },
  {
    id: "maturity",
    no: "06",
    phase: "Closure",
    title: "Maturity, Payment & Discharge",
    subtitle: "Holder presents for payment; instrument is discharged or dishonoured.",
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

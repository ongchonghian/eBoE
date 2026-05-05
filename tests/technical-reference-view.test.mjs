import test from "node:test";
import assert from "node:assert/strict";
import {
  buildTechnicalReferenceRoleView,
  getTechnicalReferenceCopy,
  TECHNICAL_REFERENCE_FALLBACK_COPY,
} from "../technicalReferenceView.js";
import { technicalReferencesByStep, technicalReferenceStatuses } from "../technicalReferencesData.js";

test("developer role returns developerCopy", () => {
  const item = {
    developerCopy: "Developer implementation details",
    businessCopy: "Business outcome summary",
  };

  assert.equal(getTechnicalReferenceCopy(item, "developer"), "Developer implementation details");
});

test("business role returns businessCopy", () => {
  const item = {
    developerCopy: "Developer implementation details",
    businessCopy: "Business outcome summary",
  };

  assert.equal(getTechnicalReferenceCopy(item, "business"), "Business outcome summary");
});

test("fallback when selected role copy is missing or empty", () => {
  assert.equal(getTechnicalReferenceCopy({ businessCopy: "Business outcome summary" }, "developer"), TECHNICAL_REFERENCE_FALLBACK_COPY);
  assert.equal(
    getTechnicalReferenceCopy({ developerCopy: "Developer implementation details", businessCopy: "   " }, "business"),
    TECHNICAL_REFERENCE_FALLBACK_COPY
  );
});

test("buildTechnicalReferenceRoleView preserves status order and resolves developer copy", () => {
  const view = buildTechnicalReferenceRoleView({
    stepId: "presentation-bundle",
    roleView: "developer",
    referencesByStep: technicalReferencesByStep,
    statuses: technicalReferenceStatuses,
  });

  assert.deepEqual(
    view.map((group) => group.status),
    ["existing", "enhancement", "partial", "provider"]
  );

  view.forEach((group) => {
    group.items.forEach((item) => {
      assert.equal(item.resolvedCopy, item.developerCopy);
    });
  });
});

test("buildTechnicalReferenceRoleView switches grouped copy between developer and business views", () => {
  const developerView = buildTechnicalReferenceRoleView({
    stepId: "presentation-bundle",
    roleView: "developer",
    referencesByStep: technicalReferencesByStep,
    statuses: technicalReferenceStatuses,
  });
  const businessView = buildTechnicalReferenceRoleView({
    stepId: "presentation-bundle",
    roleView: "business",
    referencesByStep: technicalReferencesByStep,
    statuses: technicalReferenceStatuses,
  });

  const developerItems = developerView.flatMap((group) =>
    group.items.map((item) => [`${group.status}:${item.capability}`, item.resolvedCopy, item.developerCopy])
  );
  const businessItems = businessView.flatMap((group) =>
    group.items.map((item) => [`${group.status}:${item.capability}`, item.resolvedCopy, item.businessCopy])
  );

  assert.equal(developerItems.length, businessItems.length);

  developerItems.forEach(([key, resolved, expected]) => {
    assert.equal(resolved, expected, `developer copy mismatch for ${key}`);
  });
  businessItems.forEach(([key, resolved, expected]) => {
    assert.equal(resolved, expected, `business copy mismatch for ${key}`);
  });

  const pairedResolvedCopy = developerItems.map(([key, resolved], index) => [key, resolved, businessItems[index][1]]);
  assert.ok(pairedResolvedCopy.some(([, developerCopy, businessCopy]) => developerCopy !== businessCopy));
});

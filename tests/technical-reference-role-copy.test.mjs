import test from "node:test";
import assert from "node:assert/strict";
import { technicalReferenceEntries } from "../technicalReferencesData.js";

test("every technical reference has non-empty developer and business copy", () => {
  assert.ok(technicalReferenceEntries.length > 0, "technicalReferenceEntries must contain at least one entry");

  technicalReferenceEntries.forEach((entry, index) => {
    const context = `capability=${entry.capability ?? "unknown"}, stepId=${entry.stepId ?? index}`;

    assert.equal(typeof entry.developerCopy, "string", `${context}: missing developerCopy`);
    assert.ok(entry.developerCopy.trim().length > 0, `${context}: empty developerCopy`);
    assert.equal(typeof entry.businessCopy, "string", `${context}: missing businessCopy`);
    assert.ok(entry.businessCopy.trim().length > 0, `${context}: empty businessCopy`);
  });
});

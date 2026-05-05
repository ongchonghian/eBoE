import test from "node:test";
import assert from "node:assert/strict";
import { assertWorkflowData, validateWorkflowData } from "../workflowValidation.js";
import { technicalReferenceEntries } from "../technicalReferencesData.js";

test("validateWorkflowData returns no errors for current dataset", () => {
  const errors = validateWorkflowData();
  assert.deepEqual(errors, []);
});

test("assertWorkflowData does not throw for current dataset", () => {
  assert.doesNotThrow(() => {
    assertWorkflowData();
  });
});

test("validateWorkflowData reports missing developerCopy when dataset is invalid", () => {
  const originalDeveloperCopy = technicalReferenceEntries[0].developerCopy;

  try {
    technicalReferenceEntries[0].developerCopy = "";
    const errors = validateWorkflowData();
    assert.ok(errors.some((error) => error.includes("missing developerCopy")));
  } finally {
    technicalReferenceEntries[0].developerCopy = originalDeveloperCopy;
  }
});

test("assertWorkflowData throws when dataset is invalid", () => {
  const originalDeveloperCopy = technicalReferenceEntries[0].developerCopy;

  try {
    technicalReferenceEntries[0].developerCopy = "";
    assert.throws(() => {
      assertWorkflowData();
    }, /Workflow data should validate/);
  } finally {
    technicalReferenceEntries[0].developerCopy = originalDeveloperCopy;
  }
});

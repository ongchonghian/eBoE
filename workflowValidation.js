import { businessDefinitions, stepTermMap, tone, workflowSteps } from "./workflowData.js";
import { technicalReferenceEntries, technicalReferenceStatuses } from "./technicalReferencesData.js";

export function validateWorkflowData() {
  const errors = [];
  const ids = new Set();
  const validStepIds = new Set(workflowSteps.map((step) => step.id));
  const terms = new Set(businessDefinitions.map((definition) => definition.term));
  const validTechnicalStatuses = new Set(technicalReferenceStatuses);
  const technicalReferenceCounts = new Map();

  workflowSteps.forEach((step) => {
    if (ids.has(step.id)) errors.push(`Duplicate step id: ${step.id}`);
    ids.add(step.id);

    ["id", "no", "title", "actor", "trustvcUse", "status", "implementation", "trustvcRole", "narration"].forEach((field) => {
      if (!step[field]) errors.push(`Step ${step.id} missing ${field}`);
    });

    if (!tone[step.status]) errors.push(`Step ${step.id} has invalid status ${step.status}`);
    if (!Array.isArray(step.roles) || step.roles.length === 0) errors.push(`Step ${step.id} missing roles`);
    if (!Array.isArray(stepTermMap[step.id])) errors.push(`Step ${step.id} missing glossary mapping`);
    if (!step.layperson || typeof step.layperson !== "object") {
      errors.push(`Step ${step.id} missing layperson block`);
    } else {
      ["summary", "actor", "document", "trustvcDoes", "outsideTrustvc"].forEach((field) => {
        if (typeof step.layperson[field] !== "string" || step.layperson[field].trim().length === 0) {
          errors.push(`Step ${step.id} has invalid layperson.${field}`);
        }
      });
    }

    if (!step.problemFocus || typeof step.problemFocus !== "object") {
      errors.push(`Step ${step.id} missing problemFocus`);
    } else {
      ["coreTension", "decisionAtRisk", "consequence"].forEach((field) => {
        if (typeof step.problemFocus[field] !== "string" || step.problemFocus[field].trim().length === 0) {
          errors.push(`Step ${step.id} has invalid problemFocus.${field}`);
        }
      });

      if (!Array.isArray(step.problemFocus.failureModes) || step.problemFocus.failureModes.length === 0) {
        errors.push(`Step ${step.id} missing problemFocus.failureModes`);
      } else {
        step.problemFocus.failureModes.forEach((item, itemIndex) => {
          if (typeof item !== "string" || item.trim().length === 0) {
            errors.push(`Step ${step.id} has invalid problemFocus.failureModes[${itemIndex}]`);
          }
        });
      }
    }

    (stepTermMap[step.id] || []).forEach((term) => {
      if (!terms.has(term)) errors.push(`Missing glossary term: ${term}`);
    });
  });

  businessDefinitions.forEach((item, index) => {
    if (!item.term || !item.category || !item.definition || !item.appMeaning) {
      errors.push(`Definition ${index} incomplete`);
    }
  });

  technicalReferenceEntries.forEach((entry, index) => {
    if (!entry.stepId || !entry.status || !entry.capability) {
      errors.push(`Technical reference ${index} incomplete`);
      return;
    }

    if (typeof entry.developerCopy !== "string" || entry.developerCopy.trim().length === 0) {
      errors.push(`Technical reference ${index} missing developerCopy`);
    }

    if (typeof entry.businessCopy !== "string" || entry.businessCopy.trim().length === 0) {
      errors.push(`Technical reference ${index} missing businessCopy`);
    }

    if (!validStepIds.has(entry.stepId)) {
      errors.push(`Technical reference ${index} has invalid stepId ${entry.stepId}`);
    }

    if (!validTechnicalStatuses.has(entry.status)) {
      errors.push(`Technical reference ${index} has invalid status ${entry.status}`);
    }

    if (!Array.isArray(entry.sourcePointers) || entry.sourcePointers.length === 0) {
      errors.push(`Technical reference ${index} missing sourcePointers`);
    } else {
      entry.sourcePointers.forEach((pointer, pointerIndex) => {
        if (typeof pointer !== "string" || pointer.trim().length === 0) {
          errors.push(`Technical reference ${index} has invalid source pointer at index ${pointerIndex}`);
        }
      });
    }

    technicalReferenceCounts.set(entry.stepId, (technicalReferenceCounts.get(entry.stepId) || 0) + 1);
  });

  workflowSteps.forEach((step) => {
    if (!technicalReferenceCounts.get(step.id)) {
      errors.push(`Step ${step.id} missing technical references`);
    }
  });

  return errors;
}

export function assertWorkflowData() {
  const dataErrors = validateWorkflowData();
  if (dataErrors.length) {
    console.error("Workflow validation failed", dataErrors);
    throw new Error("Workflow data should validate");
  }
}

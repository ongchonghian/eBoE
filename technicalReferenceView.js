export const technicalReferenceRoleViews = ["developer", "business"];

export const TECHNICAL_REFERENCE_FALLBACK_COPY = "Role-specific copy pending for this capability.";

export function getTechnicalReferenceCopy(item, roleView) {
  const selectedCopy = roleView === "business" ? item?.businessCopy : item?.developerCopy;

  if (typeof selectedCopy === "string" && selectedCopy.trim().length > 0) {
    return selectedCopy;
  }

  return TECHNICAL_REFERENCE_FALLBACK_COPY;
}

export function buildTechnicalReferenceRoleView({ stepId, roleView, referencesByStep, statuses }) {
  const references = referencesByStep?.[stepId] || [];

  return statuses
    .map((status) => {
      const items = references
        .filter((item) => item.status === status)
        .map((item) => ({
          ...item,
          resolvedCopy: getTechnicalReferenceCopy(item, roleView),
        }));

      return {
        status,
        items,
      };
    })
    .filter((group) => group.items.length > 0);
}

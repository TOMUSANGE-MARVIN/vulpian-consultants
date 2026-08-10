// Static, non-CMS content for the secondary template sections (partners strip,
// focus areas, testimonials, engagement options, blog, FAQ, case studies).
// Kept out of MongoDB deliberately - these are template-structure sections,
// not core business content, so they're edited here directly.

// What actually happens at each stage of a Vulpian engagement, shown in the
// "How it works" card alongside "Our Approach". Keyed by the approach step
// title stored in the CMS - add a matching key here if a step is renamed.
export const howItWorksByStage: Record<string, string[]> = {
    Understand: [
        "An initial consultation to learn your objectives and constraints",
        "Review of your existing processes, documentation, and systems",
        "Stakeholder interviews across the relevant departments",
        "Gap analysis against the applicable standard",
        "A written findings report with prioritised recommendations",
    ],
    Deliver: [
        "A tailored scope of work, timeline, and set of deliverables",
        "Design of the management system framework and documentation",
        "Development of policies, procedures, and process maps",
        "Hands-on support as new controls are rolled out",
        "Review checkpoints to confirm the work fits how you operate",
    ],
    Build: [
        "Training tailored to each role and level in the organisation",
        "Internal auditor development and certification support",
        "Coaching for process owners and management representatives",
        "Practical tools, templates, and checklists your team keeps",
        "Knowledge transfer so the system runs without us",
    ],
    Improve: [
        "Internal audits against the standard and your own criteria",
        "Management review facilitation and follow-up",
        "Root cause analysis of nonconformities and recurring issues",
        "Corrective and preventive action tracking",
        "Readiness checks ahead of external certification audits",
    ],
    Impact: [
        "Agreement on the measures that matter to your organisation",
        "Baseline data captured before the changes take effect",
        "Monitoring of process performance and customer feedback",
        "Reporting that shows what changed and what it delivered",
        "Recommendations for the next cycle of improvement",
    ],
};

// Shown when a CMS approach step has no matching entry above.
export const howItWorksFallback = [
    "You reach out through our contact form, by phone, or by email",
    "We hold an initial consultation to understand your needs and context",
    "We assess your current systems and identify the gaps that matter",
    "We propose a tailored scope of work, timeline, and deliverables",
    "We deliver, and support your team through implementation",
];

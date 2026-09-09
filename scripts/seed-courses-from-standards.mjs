// One-off: create a course for each standard the firm works with, so the
// Courses page starts populated. Idempotent — a course whose title already
// exists is left untouched, so edits made in the admin survive a re-run.
import mongoose from "mongoose";
import fs from "node:fs";

const uri = process.env.MONGODB_URI || fs.readFileSync(".env.local", "utf8")
    .split("\n").find((l) => l.startsWith("MONGODB_URI="))?.slice("MONGODB_URI=".length).trim();

if (!uri) {
    console.error("No MONGODB_URI found.");
    process.exit(1);
}

// Durations and fees are deliberately left blank rather than invented — they
// are commercial decisions for Vulpian to fill in from the admin.
const COURSES = [
    {
        title: "ISO 9001:2015 Quality Management Systems",
        standard: "ISO 9001",
        summary: "Understand the requirements of ISO 9001:2015 and what it takes to build, run and improve a quality management system that holds up to certification.",
        delivery: "In-person or online",
        fee: "On request",
        outline: [
            "The structure and intent of ISO 9001:2015",
            "Process approach and risk-based thinking",
            "Documented information and record keeping",
            "Preparing for a certification audit",
        ],
    },
    {
        title: "ISO 31000:2018 Risk Management",
        standard: "ISO 31000",
        summary: "Apply the ISO 31000 framework to identify, assess and treat risk in a way that supports decision-making rather than sitting in a register nobody reads.",
        delivery: "In-person or online",
        fee: "On request",
        outline: [
            "Principles, framework and process",
            "Risk identification and assessment techniques",
            "Risk treatment and monitoring",
            "Embedding risk management in daily operations",
        ],
    },
    {
        title: "ISO 19011 Internal Auditing",
        standard: "ISO 19011",
        summary: "Plan, conduct and report management system audits using the ISO 19011 guidelines, and turn audit findings into improvements the business acts on.",
        delivery: "In-person or online",
        fee: "On request",
        outline: [
            "Audit principles and the audit programme",
            "Planning and preparing an audit",
            "Conducting interviews and gathering evidence",
            "Writing findings and following up corrective action",
        ],
    },
    {
        title: "PECB Certified Training",
        standard: "PECB",
        summary: "Accredited PECB training and certification pathways, including Foundation, Lead Implementer and Lead Auditor routes across the management system standards.",
        delivery: "In-person or online",
        fee: "On request",
        outline: [
            "Foundation, Lead Implementer and Lead Auditor pathways",
            "Exam preparation and certification requirements",
        ],
    },
    {
        title: "Project Management (PMP®) Preparation",
        standard: "PMP®",
        summary: "Prepare for the PMP® examination and strengthen day-to-day project delivery, covering the process groups, knowledge areas and the exam itself.",
        delivery: "In-person or online",
        fee: "On request",
        outline: [
            "Process groups and knowledge areas",
            "Scope, schedule, cost and quality management",
            "Stakeholder and risk management",
            "Exam strategy and practice questions",
        ],
    },
];

await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
const courses = mongoose.connection.collection("courses");

let order = 0;
for (const course of COURSES) {
    const existing = await courses.findOne({ title: course.title });
    if (existing) {
        console.log(`skipped  ${course.title} — already present`);
        order += 1;
        continue;
    }
    await courses.insertOne({
        ...course,
        duration: "",
        image: "",
        order: order++,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    console.log(`added    ${course.title}`);
}

console.log("total courses:", await courses.countDocuments());
await mongoose.disconnect();

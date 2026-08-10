// One-off migration: moves content that used to live in staticContent.ts and
// inside components into MongoDB, so every section becomes editable from the
// admin. Safe to re-run — it skips any collection that already has documents.

import fs from "node:fs";
import mongoose from "mongoose";

const env = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const uri = env.split("\n").find((l) => l.startsWith("MONGODB_URI=")).slice(12).trim();

const seedData = {
    focusareas: [
        { category: "Quality", title: "Quality Management Systems (QMS)", description: "Design, implementation, and continual improvement of QMS aligned with ISO 9001 - from readiness assessments to internal audits and documentation.", image: "/images/projects/focus-quality.jpg", link: "/services/quality-management-systems-consulting" },
        { category: "People", title: "Corporate Training & Capacity Building", description: "Customized training programmes in leadership, customer excellence, risk-based thinking, and change management for teams across the public and private sector.", image: "/images/projects/focus-training.jpg", link: "/services/corporate-training-and-capacity-building" },
        { category: "Process", title: "Business Process Improvement", description: "Reviewing, redesigning, and optimizing operations to lift efficiency, productivity, and service delivery across the business lifecycle.", image: "/images/projects/focus-process.jpg", link: "/services/business-process-improvement" },
        { category: "Governance", title: "Risk Management Consulting", description: "Embedding risk-based thinking into everyday operations to support compliance, resilience, and sound decision-making.", image: "/images/projects/focus-risk-v3.jpg", link: "/services/risk-management-consulting" },
    ],
    reasons: [
        { icon: "mdi:certificate-outline", title: "Certified Expertise", description: "Led by a PECB Certified Trainer and ISO 9001 Lead Auditor, with credentials spanning ISO 31000 risk management and PMP®." },
        { icon: "mdi:tools", title: "Practical, Not Paperwork", description: "We build systems your team actually uses day to day, not documentation that sits on a shelf until the auditor arrives." },
        { icon: "mdi:office-building-outline", title: "Public & Private Sector", description: "Experience across government agencies and private organizations since 2019, so recommendations fit how you really operate." },
        { icon: "mdi:school-outline", title: "Capability That Stays", description: "Training, internal auditor development, and knowledge transfer, so the system keeps running long after we leave." },
    ],
    standards: [
        { label: "ISO 9001:2015", sub: "Quality Management", src: "/images/standards/iso-9001.png", renderHeight: 58 },
        { label: "ISO 31000:2018", sub: "Risk Management", src: "/images/standards/iso-31000.png", renderHeight: 58 },
        { label: "ISO 19011", sub: "Auditing Guidelines", src: "/images/standards/iso-19011.png", renderHeight: 52 },
        { label: "PECB", sub: "Training & Certification", src: "/images/standards/pecb.png", renderHeight: 40 },
        { label: "PMP®", sub: "Project Management", src: "/images/standards/pmp.png", renderHeight: 60 },
    ],
    testimonials: [
        { text: "The QMS implementation support was practical from day one - our team could apply what we learned immediately instead of sitting on a shelf as documentation nobody reads.", position: "Quality Assurance Lead, Public Sector Agency" },
        { text: "What stood out was how the training was tailored to our actual processes rather than a generic ISO 9001 script. The internal audit findings from the mock audit alone were worth the engagement.", position: "Operations Manager, Financial Services" },
        { text: "Risk-based thinking sounds abstract until someone shows you how to embed it into your existing SOPs. That's exactly what this engagement delivered.", position: "Compliance Officer, NGO" },
    ],
    videos: [
        { videoUrl: "ml9z3lvt9os", title: "Beyond Compliance: Building a Quality Culture That Empowers Frontline Employee Decision Making" },
        { videoUrl: "OcYkd5g3dos", title: "ISO Audit Preparation - 7 Common Audit Failures and How Enterprise Teams Can Prevent Them" },
        { videoUrl: "xrmqXqq9fvM", title: "Foundations of an ISO 9001 System" },
        { videoUrl: "wso5YSdjCKk", title: "How to Conduct a Risk-Based Internal Audit Using Predictive Decision Trees" },
        { videoUrl: "aV2nxj-_4lg", title: "5 Leadership Traits Every Quality Manager Needs" },
        { videoUrl: "zpNQPm22oWE", title: "The Job Before the Job - A Powerful Message for Every Job Seeker" },
    ],
    faqs: [
        { question: "What does a Quality Management System actually involve?", answer: "A QMS is the set of processes, documentation, and controls that make quality consistent and repeatable. In practice that means mapping how work gets done, agreeing standards, defining responsibilities, and building in checks so problems get caught and fixed. ISO 9001 gives a framework for this, but the system itself is yours." },
        { question: "How long does ISO 9001 certification take?", answer: "It depends on the size of the organization and how much structure already exists. A small organization with reasonable documentation might be certification-ready in a few months; a larger or more complex one takes longer. We start with a readiness assessment so you get a realistic timeline rather than a guess." },
        { question: "Do you only work with organizations seeking certification?", answer: "No. Certification is one reason organizations come to us, but plenty want better processes, clearer accountability, or stronger risk management without pursuing a certificate. The work is the same either way - certification is just a milestone some choose to pursue." },
        { question: "What sectors do you work with?", answer: "We work with both public and private sector organizations. Our engagements span government agencies, financial services, NGOs, and private companies. The principles of quality management transfer across sectors; what changes is how they are applied." },
        { question: "How do we get started?", answer: "Get in touch through the contact form, by phone, or by email. We will arrange an initial consultation to understand your objectives and constraints, then propose a scope of work with a clear timeline and deliverables." },
    ],
    blogs: [
        {
            title: "Why ISO 9001 Matters Beyond Compliance", slug: "why-iso-9001-matters-beyond-compliance", category: "QMS",
            author: "Vulpian Consultants", date: "12 Mar", image: "/images/blog/blog-iso-9001-v2.jpg",
            description: "ISO 9001 is often treated as a certificate to chase. Organizations that get the most value treat it as an operating system instead.",
            body: [
                "Most organizations first encounter ISO 9001 because a client, regulator, or tender requires it. That is a legitimate reason to start, but it is a poor reason to stop. Treating the standard as a box to tick produces a manual nobody reads and an audit everyone dreads.",
                "The organizations that get real value treat ISO 9001 as a description of how the business actually runs. Processes get mapped because someone wants to know where work stalls. Nonconformities get logged because the team wants to stop repeat problems, not because a clause demands it.",
                "The difference shows up in the audit. When the system reflects reality, an audit is a conversation about improvement. When it does not, it becomes an exercise in producing evidence for a system that exists only on paper.",
            ],
            quoteText: "Quality is never an accident; it is always the result of intelligent effort.", quoteAttribution: "William A. Foster",
            takeaways: ["Start with how work actually happens, not with the clause list", "A system nobody uses is worse than no system at all", "Treat audits as feedback, not as an exam"],
        },
        {
            title: "Building a Culture of Continual Improvement", slug: "building-a-culture-of-continual-improvement", category: "Organizational Development",
            author: "Vulpian Consultants", date: "28 Apr", image: "/images/blog/blog-2.jpg",
            description: "Continual improvement fails when it is treated as a project. It works when it becomes a habit that belongs to the people doing the work.",
            body: [
                "Continual improvement is the clause most organizations struggle with, because it cannot be delegated to a quality manager and completed. It has to become a habit distributed across the people doing the work.",
                "That starts with making it safe to raise problems. If reporting a nonconformity results in blame, reports stop and problems go underground. If it results in a fix, reports increase and so does the quality of information you have to work with.",
                "The second ingredient is visible follow-through. Teams stop contributing when suggestions disappear. A simple, visible record of what was raised, what was decided, and what changed does more for improvement culture than any amount of training.",
            ],
            quoteText: "It is not enough to do your best; you must know what to do, and then do your best.", quoteAttribution: "W. Edwards Deming",
            takeaways: ["Make it safe to report problems", "Close the loop visibly on every suggestion", "Improvement is a habit, not a project"],
        },
        {
            title: "Risk-Based Thinking in Practice", slug: "risk-based-thinking-in-practice", category: "Risk Management",
            author: "Vulpian Consultants", date: "9 Jun", image: "/images/blog/blog-risk-v2.jpg",
            description: "Risk-based thinking sounds abstract until it is embedded in the procedures your team already follows every day.",
            body: [
                "Risk-based thinking is often reduced to a risk register that gets reviewed once a year and forgotten. That satisfies nobody, least of all the people whose work the risks actually concern.",
                "Embedded properly, risk-based thinking changes decisions at the point they are made. It shows up as an extra check in a procedure, a decision rule for when to escalate, or a supplier requirement that reflects what could realistically go wrong.",
                "The practical test is simple: if someone new joined tomorrow, would the procedures they follow already account for the risks you identified? If not, the risk work has not landed where it matters.",
            ],
            quoteText: "The biggest risk is not taking any risk.", quoteAttribution: "Mark Zuckerberg",
            takeaways: ["Push risks into procedures, not just registers", "Give people decision rules, not warnings", "Test whether a newcomer would inherit your risk controls"],
        },
    ],
};

const models = {};
const getModel = (name) => {
    if (!models[name]) {
        models[name] = mongoose.model(name, new mongoose.Schema({}, { strict: false, timestamps: true, collection: name }));
    }
    return models[name];
};

await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
console.log("connected\n");

for (const [name, docs] of Object.entries(seedData)) {
    const Model = getModel(name);
    const existing = await Model.countDocuments({});
    if (existing > 0) {
        console.log(`  ${name.padEnd(14)} skipped (${existing} already there)`);
        continue;
    }
    await Model.insertMany(docs.map((d, i) => ({ ...d, order: i })));
    console.log(`  ${name.padEnd(14)} seeded ${docs.length}`);
}

console.log("\ndone");
await mongoose.disconnect();

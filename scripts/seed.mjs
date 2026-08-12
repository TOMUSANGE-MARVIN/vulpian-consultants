import mongoose from "mongoose";
import fs from "fs";

const envLines = fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8").trim().split("\n");
const env = {};
for (const line of envLines) {
    const idx = line.indexOf("=");
    env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
}

const SiteContentSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const ServiceSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
const TeamMemberSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

const SiteContent = mongoose.model("SiteContent", SiteContentSchema);
const Service = mongoose.model("Service", ServiceSchema);
const TeamMember = mongoose.model("TeamMember", TeamMemberSchema);

const siteContent = {
    key: "site",
    companyName: "Vulpian Consultants",
    tagline: "Empowering Excellence",
    since: "2019",
    logoUrl: "/images/logo/vulpian-logo-color.png",
    hero: {
        title: "Empowering Excellence",
        ctaText: "Get Started",
        ctaHref: "/contact",
        quote:
            "Committed to helping organizations achieve operational excellence through effective Quality Management Systems, organizational transformation, and business performance improvement.",
    },
    whoWeAre: {
        paragraphs: [
            "Vulpian Consultants is a professional consulting firm committed to helping organizations achieve operational excellence through effective Quality Management Systems (QMS), organizational transformation, and business performance improvement.",
            "We partner with public and private sector organizations to design, implement, maintain, and continually improve management systems that enhance efficiency, ensure regulatory compliance, and deliver sustainable results. Our core expertise lies in Quality Management Systems (QMS), supported by complementary services in Information and Communication Technology (ICT), Finance Management, Business Process Improvement, Risk Management, Organizational Development, and Management Operations.",
            "Our team of experienced consultants combines technical expertise with practical industry knowledge to deliver tailored solutions that strengthen governance, optimize processes, empower people, and improve organizational performance across the entire business lifecycle.",
            "At Vulpian Consultants, we believe that quality is not just about compliance - it is about creating a culture of excellence, innovation, and continual improvement. We are committed to helping our clients build resilient organizations that deliver value to customers, stakeholders, and society.",
        ],
    },
    values: [
        { title: "Excellence", icon: "mdi:trophy-outline" },
        { title: "Structure", icon: "mdi:sitemap-outline" },
        { title: "Accountability", icon: "mdi:shield-check-outline" },
        { title: "Growth", icon: "mdi:trending-up" },
        { title: "Impact", icon: "mdi:target-arrow" },
    ],
    vision:
        "To be the trusted partner of choice in empowering organizations to achieve excellence, innovation, and sustainable growth.",
    mission:
        "To empower organizations through innovative consulting, quality management solutions, and business improvement services that strengthen systems, optimize performance, and create lasting value.",
    approach: [
        { title: "Understand", description: "Understanding your unique business needs" },
        { title: "Deliver", description: "Delivering practical and sustainable solutions" },
        { title: "Build", description: "Building internal organizational capacity" },
        { title: "Improve", description: "Promoting continual improvement" },
        { title: "Impact", description: "Creating measurable and lasting impact" },
    ],
    contact: {
        address: "Kampala, Uganda",
        phones: ["+256 772142260", "+256 783776246"],
        emails: ["info@vulpianco.com"],
        linkedin: "Vulpian Consultants",
        youtube: "Vulpian-Consultants",
    },
};

const services = [
    {
        order: 1,
        slug: "quality-management-systems-consulting",
        title: "Quality Management Systems (QMS) Consulting",
        icon: "mdi:certificate-outline",
        summary:
            "We help organizations establish, implement, maintain, and continually improve Quality Management Systems aligned with international standards such as ISO 9001.",
        items: [
            "QMS design and implementation",
            "ISO 9001 readiness assessments",
            "Internal quality audits",
            "Management review facilitation",
            "Process mapping and documentation",
            "Quality assurance and continual improvement",
            "Development of Quality Manuals, Standard Operating Procedures (SOPs), Work Instructions, and Service Level Agreements (SLAs)",
        ],
    },
    {
        order: 2,
        slug: "business-process-improvement",
        title: "Business Process Improvement",
        icon: "mdi:sitemap-outline",
        summary:
            "We help organizations streamline operations by reviewing, redesigning, and optimizing business processes to improve efficiency, productivity, and service delivery.",
        items: [
            "Business process mapping and re-engineering",
            "Workflow optimization",
            "Performance measurement frameworks",
            "Process standardization",
            "Organizational efficiency reviews",
        ],
    },
    {
        order: 3,
        slug: "corporate-training-and-capacity-building",
        title: "Corporate Training and Capacity Building",
        icon: "mdi:school-outline",
        summary:
            "We deliver customized training programmes that equip leaders and employees with practical knowledge and skills to improve organizational performance.",
        items: [
            "Quality Management Systems (ISO 9001)",
            "Customer Service Excellence",
            "Leadership and Management Development",
            "Team Building and High-Performance Teams",
            "Self-Leadership and Personal Effectiveness",
            "Risk-Based Thinking and Risk Management",
            "Business Process Improvement",
            "Change Management",
            "Governance and Compliance",
        ],
    },
    {
        order: 4,
        slug: "customer-excellence-training",
        title: "Customer Excellence Training",
        icon: "raphael:customer",
        summary:
            "Exceptional customer experiences create loyal customers and sustainable organizations. Our Customer Excellence programmes help organizations build a customer-centric culture where every employee understands their role in delivering outstanding service.",
        items: [],
    },
    {
        order: 5,
        slug: "leadership-development",
        title: "Leadership Development",
        icon: "mdi:account-tie-outline",
        summary:
            "We develop leaders who inspire performance, drive innovation, and create positive organizational cultures through programmes in:",
        items: [
            "Inspirational Leadership",
            "Executive Leadership",
            "Team Leadership",
            "Strategic Leadership",
            "Self-Leadership",
            "Supervisory Skills Development",
        ],
    },
    {
        order: 6,
        slug: "executive-coaching",
        title: "Executive Coaching",
        icon: "mdi:account-voice",
        summary:
            "We provide one-on-one and executive coaching designed to strengthen leadership capability, improve decision-making, enhance strategic thinking, and accelerate professional growth for executives and senior managers.",
        items: [],
    },
    {
        order: 7,
        slug: "team-development-and-organizational-effectiveness",
        title: "Team Development and Organizational Effectiveness",
        icon: "mdi:account-group-outline",
        summary:
            "High-performing organizations are built on cohesive teams. We help organizations strengthen collaboration, accountability, communication, and trust through:",
        items: [
            "High-Performance Team Development",
            "The Five Dysfunctions of a Team Workshops",
            "Team Coaching",
            "Organizational Culture Development",
            "Strategic Planning Facilitation",
        ],
    },
    {
        order: 8,
        slug: "organizational-development-consulting",
        title: "Organizational Development Consulting",
        icon: "mdi:office-building-cog-outline",
        summary:
            "We support organizations in strengthening governance structures, improving organizational effectiveness, and implementing sustainable change initiatives through:",
        items: [
            "Organizational assessments",
            "Change management",
            "Performance management systems",
            "Organizational restructuring",
            "Policy and procedure development",
        ],
    },
    {
        order: 9,
        slug: "risk-management-consulting",
        title: "Risk Management Consulting",
        icon: "carbon:risk",
        summary:
            "We assist organizations in embedding risk-based thinking into everyday operations by helping them identify, assess, manage, and monitor organizational risks while supporting compliance and business resilience.",
        items: [],
    },
    {
        order: 10,
        slug: "ict-advisory",
        title: "Information and Communication Technology (ICT) Advisory",
        icon: "mdi:server-network",
        summary: "We help organizations leverage technology to improve business performance through:",
        items: [
            "ICT strategy development",
            "Digital transformation support",
            "Information management",
            "Business systems improvement",
            "Technology governance",
        ],
    },
    {
        order: 11,
        slug: "finance-management-advisory",
        title: "Finance Management Advisory",
        icon: "mdi:finance",
        summary:
            "We provide practical finance management solutions that strengthen financial accountability and organizational sustainability through:",
        items: [
            "Financial management advisory",
            "Budgeting and financial planning",
            "Internal controls",
            "Financial process improvement",
            "Financial governance",
        ],
    },
    {
        order: 12,
        slug: "personal-finance-and-financial-wellness-training",
        title: "Personal Finance and Financial Wellness Training",
        icon: "mdi:cash-multiple",
        summary:
            "We empower employees with practical financial management skills that promote responsible spending, budgeting, saving, investing, and long-term financial wellbeing.",
        items: [],
    },
    {
        order: 13,
        slug: "research-monitoring-and-evaluation",
        title: "Research, Monitoring and Evaluation",
        icon: "mdi:chart-line",
        summary: "We support evidence-based decision-making through:",
        items: [
            "Organizational assessments",
            "Surveys and diagnostics",
            "Monitoring and evaluation frameworks",
            "Performance evaluations",
            "Data analysis and reporting",
        ],
    },
    {
        order: 14,
        slug: "management-advisory-services",
        title: "Management Advisory Services",
        icon: "mdi:briefcase-outline",
        summary:
            "Our experienced consultants provide strategic advisory services that help organizations improve governance, operational performance, compliance, and long-term sustainability.",
        items: [],
    },
];

const team = [
    {
        order: 1,
        name: "Ssenyimba Kizito",
        role: "Lead Consultant",
        isLead: true,
        photoUrl: "/images/team/ssenyimba-kizito.jpg",
        bio: [
            "With extensive experience in Quality Management Systems (QMS), organizational excellence, and business transformation, Ssenyimba Kizito is committed to helping organizations build resilient systems, improve performance, and achieve internationally recognized standards.",
            "As a PECB Certified Trainer for ISO 9001, he delivers world-class training and consultancy in Quality Management Systems, equipping organizations and professionals with the knowledge and practical skills required to implement, audit, and continually improve management systems.",
            "With a practical, results-driven approach, he has supported organizations across the public and private sectors in strengthening governance, improving business processes, enhancing customer satisfaction, managing organizational risks, and fostering a culture of continual improvement.",
            "His expertise spans Quality Management Systems (ISO 9001), Risk Management (ISO 31000), Internal Auditing, Process Improvement, Organizational Development, Strategic Planning, Leadership Development, and Project Management, making him a trusted advisor to organizations seeking sustainable growth and operational excellence.",
        ],
        credentials: [
            "PECB Certified Trainer – ISO 9001",
            "ISO 9001 Lead Auditor",
            "ISO 9001 Lead Implementer",
            "ISO 31000:2018 Risk Management Professional",
            "Project Management Professional (PMP®)",
            "Master of Arts in Monitoring and Evaluation (MAME)",
            "Bachelor of Records and Archives Management (BRAM)",
            "Diploma in Statistics",
            "Diploma in Integrated Management Systems (ISO IMS)",
        ],
    },
];

async function seed() {
    await mongoose.connect(env.MONGODB_URI);
    console.log("Connected to", mongoose.connection.name);

    await SiteContent.deleteMany({});
    await SiteContent.create(siteContent);
    console.log("Seeded site content");

    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log(`Seeded ${services.length} services`);

    await TeamMember.deleteMany({});
    await TeamMember.insertMany(team);
    console.log(`Seeded ${team.length} team member(s)`);

    await mongoose.disconnect();
    console.log("Done.");
}

seed().catch((e) => {
    console.error(e);
    process.exit(1);
});

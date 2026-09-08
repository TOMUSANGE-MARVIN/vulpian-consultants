// One-off: give the existing standards a link to the body that publishes them.
// Safe to re-run — it only fills a link that is empty, so anything edited in
// the admin afterwards is left alone.
import mongoose from "mongoose";
import fs from "node:fs";

const uri = process.env.MONGODB_URI || fs.readFileSync(".env.local", "utf8")
    .split("\n").find((l) => l.startsWith("MONGODB_URI="))?.slice("MONGODB_URI=".length).trim();

if (!uri) {
    console.error("No MONGODB_URI found.");
    process.exit(1);
}

// Matched on the label, lowercased, so "PMP®" and "pecb" both find their entry.
const LINKS = [
    [/iso\s*9001/i, "https://www.iso.org/"],
    [/iso\s*31000/i, "https://www.iso.org/"],
    [/iso\s*19011/i, "https://www.iso.org/"],
    [/pmp/i, "https://www.pmi.org/"],
    [/pecb/i, "https://pecb.com/en"],
];

await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
const standards = mongoose.connection.collection("standards");

for (const doc of await standards.find({}).toArray()) {
    if (doc.link) {
        console.log(`skipped  ${doc.label} — already has ${doc.link}`);
        continue;
    }
    const match = LINKS.find(([re]) => re.test(doc.label || ""));
    if (!match) {
        console.log(`skipped  ${doc.label} — no known website`);
        continue;
    }
    await standards.updateOne({ _id: doc._id }, { $set: { link: match[1], updatedAt: new Date() } });
    console.log(`linked   ${doc.label} -> ${match[1]}`);
}

await mongoose.disconnect();

"""Builds the Vulpian Consultants project handover document as a .docx."""

from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

NAVY = RGBColor(0x0F, 0x27, 0x48)
BLUE = RGBColor(0x38, 0x66, 0xB1)
INK = RGBColor(0x1B, 0x26, 0x36)
MUTED = RGBColor(0x5B, 0x6B, 0x80)
WARN = RGBColor(0x8A, 0x57, 0x00)

doc = Document()

# ---------------------------------------------------------------- base styles
normal = doc.styles["Normal"]
normal.font.name = "Calibri"
normal.font.size = Pt(11)
normal.font.color.rgb = INK
normal.paragraph_format.space_after = Pt(8)
normal.paragraph_format.line_spacing = 1.15

for name, size, color, before, after in [
    ("Heading 1", 20, NAVY, 0, 10),
    ("Heading 2", 15, NAVY, 18, 8),
    ("Heading 3", 12, BLUE, 12, 4),
]:
    st = doc.styles[name]
    st.font.name = "Calibri"
    st.font.size = Pt(size)
    st.font.bold = True
    st.font.color.rgb = color
    st.paragraph_format.space_before = Pt(before)
    st.paragraph_format.space_after = Pt(after)

for section in doc.sections:
    section.top_margin = Inches(0.9)
    section.bottom_margin = Inches(0.9)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)


def shade(cell, hex_color):
    el = OxmlElement("w:shd")
    el.set(qn("w:val"), "clear")
    el.set(qn("w:fill"), hex_color)
    cell._tc.get_or_add_tcPr().append(el)


def para(text="", size=11, bold=False, italic=False, color=INK,
         space_after=8, align=None, style=None):
    p = doc.add_paragraph(style=style)
    if align:
        p.alignment = align
    run = p.add_run(text)
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color
    p.paragraph_format.space_after = Pt(space_after)
    return p


def rich(parts, space_after=8, style=None):
    """parts: list of (text, bold, mono) tuples."""
    p = doc.add_paragraph(style=style)
    for text, bold, mono in parts:
        run = p.add_run(text)
        run.bold = bold
        run.font.size = Pt(11)
        if mono:
            run.font.name = "Consolas"
            run.font.size = Pt(10)
            run.font.color.rgb = RGBColor(0x27, 0x4E, 0x8C)
        else:
            run.font.color.rgb = INK
    p.paragraph_format.space_after = Pt(space_after)
    return p


def bullets(items):
    for item in items:
        if isinstance(item, list):
            rich(item, space_after=3, style="List Bullet")
        else:
            p = doc.add_paragraph(item, style="List Bullet")
            p.paragraph_format.space_after = Pt(3)


def numbered(items):
    for item in items:
        if isinstance(item, list):
            rich(item, space_after=4, style="List Number")
        else:
            p = doc.add_paragraph(item, style="List Number")
            p.paragraph_format.space_after = Pt(4)


def table(headers, rows, widths=None, mono_cols=()):
    t = doc.add_table(rows=1, cols=len(headers))
    t.style = "Table Grid"
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    # Word ignores column widths while autofit is on.
    t.autofit = False
    t.allow_autofit = False
    hdr = t.rows[0].cells
    for i, h in enumerate(headers):
        hdr[i].text = ""
        run = hdr[i].paragraphs[0].add_run(h)
        run.bold = True
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        shade(hdr[i], "0F2748")
    for row in rows:
        cells = t.add_row().cells
        for i, val in enumerate(row):
            cells[i].text = ""
            p = cells[i].paragraphs[0]
            run = p.add_run(str(val))
            run.font.size = Pt(9.5)
            if i in mono_cols:
                run.font.name = "Consolas"
                run.font.size = Pt(9)
            if i == 0:
                run.bold = True
            p.paragraph_format.space_after = Pt(2)
    if widths:
        for r in t.rows:
            for i, w in enumerate(widths):
                r.cells[i].width = Inches(w)
        for i, w in enumerate(widths):
            t.columns[i].width = Inches(w)
    doc.add_paragraph().paragraph_format.space_after = Pt(4)
    return t


def callout(label, body, warn=False):
    t = doc.add_table(rows=1, cols=1)
    t.style = "Table Grid"
    cell = t.rows[0].cells[0]
    shade(cell, "FDF5E6" if warn else "EAF0FA")
    cell.text = ""
    p = cell.paragraphs[0]
    r = p.add_run(label.upper())
    r.bold = True
    r.font.size = Pt(8.5)
    r.font.color.rgb = WARN if warn else BLUE
    p.paragraph_format.space_after = Pt(2)
    p2 = cell.add_paragraph()
    r2 = p2.add_run(body)
    r2.font.size = Pt(10)
    r2.font.color.rgb = INK
    p2.paragraph_format.space_after = Pt(2)
    doc.add_paragraph().paragraph_format.space_after = Pt(4)


# ===================================================================== cover
para("PROJECT HANDOVER", 9.5, bold=True, color=BLUE, space_after=2)
para("Vulpian Consultants Website", 26, bold=True, color=NAVY, space_after=2)
para("Website and Content Management System", 13, color=MUTED, space_after=14)

table(
    ["Reference", "Prepared for", "Issued", "Status"],
    [["VC-WEB-001", "Vulpian Consultants", "13 August 2026", "Live"]],
    widths=[1.6, 1.9, 1.5, 1.5],
)

table(
    ["Website", "Admin area"],
    [["www.vulpianco.com", "www.vulpianco.com/admin"]],
    widths=[3.25, 3.25],
    mono_cols=(0, 1),
)

para(
    "A marketing website paired with a self-service content management system, built so "
    "that every section of the public site can be edited by your team without a developer.",
    11, color=MUTED, space_after=16,
)

# ------------------------------------------------------------------ contents
doc.add_heading("Contents", level=2)
for i, name in enumerate([
    "What was built", "Technology stack", "Site structure", "Managing content",
    "Content model", "Images and uploads", "Access and security",
    "Search visibility", "Speed and reliability", "Outside services",
    "Deployment", "Running it locally", "Looking after it",
], 1):
    p = doc.add_paragraph()
    r = p.add_run(f"{i}.  {name}")
    r.font.size = Pt(10.5)
    p.paragraph_format.space_after = Pt(1)

doc.add_page_break()

# ======================================================================= 1
doc.add_heading("1.  What was built", level=1)
para(
    "A public website for Vulpian Consultants, paired with a private admin area where your "
    "team edits the site's content directly. Nothing on the public site is hard-coded into "
    "the design: services, articles, team profiles, testimonials, videos, FAQs and the "
    "standards you work with all come from the content management system."
)
para("The site covers:")
bullets([
    "A home page introducing the firm, its values, approach and focus areas",
    "A full services catalogue with a page per service",
    "About, Lead Consultant, FAQ and Contact pages",
    "A blog with individual article pages",
    "A Case Studies page presenting videos from your YouTube channel",
    "Privacy Policy and Terms of Service",
    "A password-protected admin area",
])
callout(
    "Design principle",
    "The website is built around real material — your own photography from training and "
    "speaking engagements, your professional credentials, and your published videos. Every "
    "claim on the site reflects work you have actually done.",
)

# ======================================================================= 2
doc.add_heading("2.  Technology stack", level=1)
para(
    "Mainstream, well-supported tools, chosen so that any competent web developer can pick "
    "the project up later without specialist knowledge."
)
table(
    ["Component", "Technology", "Version", "Why it is used"],
    [
        ["Framework", "Next.js", "15.5.23", "Industry-standard React framework; handles pages, routing and server rendering"],
        ["Interface", "React", "19.1.0", "The component library the interface is built from"],
        ["Language", "TypeScript", "5.x", "Catches whole classes of mistakes before code ever runs"],
        ["Styling", "Tailwind CSS", "4.x", "Brand colours and spacing defined once, applied consistently"],
        ["Database", "MongoDB Atlas", "—", "Hosted database holding all editable content"],
        ["Database access", "Mongoose", "9.9.1", "Defines the shape of each content type and validates it"],
        ["Hosting", "Vercel", "—", "Deploys automatically from GitHub; global content delivery"],
        ["Form delivery", "Formspree", "—", "Emails contact-form enquiries to you"],
        ["Carousels", "Swiper", "12.0.2", "Sliding sections on the home page"],
        ["Icons", "Iconify", "6.0.2", "Icon library used across the site and the admin picker"],
    ],
    widths=[1.3, 1.2, 0.8, 3.2],
    mono_cols=(2,),
)
rich([
    ("The codebase is ", False, False),
    ("96 source files", True, False),
    (", tracked in Git and hosted on GitHub. Every change is a separate commit with an "
     "explanation of what changed and why.", False, False),
])

# ======================================================================= 3
doc.add_heading("3.  Site structure", level=1)
para("Twenty-five pages, of which several are generated automatically — one per service and one per article.")
table(
    ["Address", "Page", "Content source"],
    [
        ["/", "Home", "CMS — multiple sections"],
        ["/about", "About Us", "CMS — Site Content"],
        ["/services", "Services list", "CMS — Services"],
        ["/services/[name]", "Individual service", "One page per service, automatic"],
        ["/team", "Lead Consultant", "CMS — Team"],
        ["/blog", "Blog listing", "CMS — Blog Posts"],
        ["/blog/[name]", "Article", "One page per article, automatic"],
        ["/case-studies", "Case Studies", "CMS — Videos"],
        ["/faq", "FAQ", "CMS — FAQs"],
        ["/contact", "Contact", "CMS plus contact form"],
        ["/privacy-policy", "Privacy Policy", "In the code"],
        ["/terms-of-service", "Terms of Service", "In the code"],
        ["/admin", "Admin area", "Password protected"],
    ],
    widths=[1.7, 1.9, 2.9],
    mono_cols=(0,),
)
callout(
    "Web addresses",
    "Addresses are lower case and readable, which both visitors and search engines prefer. "
    "Service and article addresses are generated from their titles, so they stay consistent "
    "without anyone having to think about them.",
)

# ======================================================================= 4
doc.add_heading("4.  Managing content", level=1)
rich([
    ("Sign in at ", False, False), ("/admin/login", False, True),
    (". The dashboard lists every editable section of the site; each screen states where its "
     "content appears, so there is no guesswork about what a change will affect.", False, False),
])

doc.add_heading("Everything you can edit", level=3)
bullets([
    [("Site Content", True, False), (" — headline, who we are, values, vision and mission, your approach, and contact details", False, False)],
    [("Services", True, False), (" — the full catalogue, each with its own page", False, False)],
    [("Team", True, False), (" — consultant profiles, biography and qualifications", False, False)],
    [("Focus Areas", True, False), (" — the home-page carousel", False, False)],
    [("Why Choose Us", True, False), (" — the four reasons beside the photo", False, False)],
    [("Standards", True, False), (" — the ISO, PECB and PMP badges", False, False)],
    [("Testimonials, FAQs, Videos and Blog Posts", True, False), ("", False, False)],
    [("Login details", True, False), (" — your own email address and password", False, False)],
])

doc.add_heading("Built so you never touch anything technical", level=3)
table(
    ["Instead of", "You do this"],
    [
        ["Typing an image file path", "Upload a picture and see it previewed"],
        ["Typing an icon code", "Click an icon from a visual picker"],
        ["Inventing a web address", "Nothing — it is created from the title"],
        ["Finding a YouTube video ID", "Paste the ordinary YouTube link"],
        ["Setting position numbers", "Press the up and down arrows"],
    ],
    widths=[2.6, 3.9],
)
para(
    "Deleting anything asks for confirmation first, saving shows a clear confirmation, and "
    "errors explain what to do rather than showing a code."
)
callout(
    "How quickly changes appear",
    "Saving publishes immediately — the page is refreshed behind the scenes the moment you "
    "press save. Visitors see the change on their next page load.",
)

# ======================================================================= 5
doc.add_heading("5.  Content model", level=1)
para("Content currently held in the database:")
table(
    ["Section", "Items", "Appears on"],
    [
        ["Site Content", "1", "Every page"],
        ["Services", "14", "Services, home, navigation menu"],
        ["Team", "1", "Lead Consultant, home, about"],
        ["Focus Areas", "4", "Home"],
        ["Why Choose Us", "4", "Home"],
        ["Standards", "5", "Home, about"],
        ["Testimonials", "3", "Home"],
        ["FAQs", "5", "FAQ page"],
        ["Videos", "6", "Case Studies"],
        ["Blog Posts", "3", "Blog, home"],
    ],
    widths=[2.0, 0.9, 3.6],
    mono_cols=(1,),
)
para(
    "All of these are defined in a single registry file in the code. Adding a new editable "
    "section later is one entry in that file rather than a week of development — the admin "
    "screens, the database structure and the save mechanism are all generated from it."
)

# ======================================================================= 6
doc.add_heading("6.  Images and uploads", level=1)
para(
    "Pictures uploaded through the admin are stored in the database rather than alongside the "
    "code. This matters: the hosting platform's file storage is read-only, so anything saved "
    "into the project folder would silently disappear the next time the site was deployed. "
    "Storing uploads in the database means they survive every deployment."
)
rich([
    ("Uploads accept JPG, PNG, WebP and GIF up to 4MB, and are served with long-life caching "
     "so they load quickly. Photographs supplied for the original build were resized and "
     "optimised before use — the image library is ", False, False),
    ("3.7MB", True, False),
    (" in total, after unused files were cleared out and every photograph was resized "
     "to the dimensions it is actually displayed at.", False, False),
])

# ======================================================================= 7
doc.add_heading("7.  Access and security", level=1)
bullets([
    "The admin area and every content-changing action require a signed-in account",
    "Passwords are stored scrambled (scrypt hashing with a unique salt), never as readable text",
    "Changing your email or password requires your current password, so a borrowed browser session is not enough to take over the account",
    "Sign-in failures give one message whether the email or the password was wrong, so the page cannot be used to discover which addresses exist",
    "Sessions last seven days and are stored in a cookie that browser scripts cannot read",
    "Search engines are instructed not to index the admin area",
])
callout(
    "Managing your own credentials",
    "Your sign-in email address and password are changed from the Login details screen in the "
    "admin, without needing a developer. Choosing a strong password and keeping it to the "
    "people who need it is the main protection on the content of the site.",
)

# ======================================================================= 8
doc.add_heading("8.  Search visibility", level=1)
para("Search engine optimisation is built in rather than bolted on:")
bullets([
    "Every page has its own title, description and canonical address",
    "Service and article pages generate theirs from the content you enter, so new content is optimised without a developer",
    [("Blog posts have their own ", False, False), ("SEO title, SEO description and keywords", True, False),
     (" fields, with guidance on length; leave them blank and the post title and summary are used", False, False)],
    "Link previews on WhatsApp, LinkedIn and X show a proper title, description and image",
    "Structured data tells Google what the business is, and marks up articles, services and the FAQ page — FAQ markup is one of the few types that still earns expanded search listings",
    "A sitemap is generated automatically from your content, so new services and articles are discovered without anyone maintaining a list",
    "A robots file allows the public site and blocks the admin area",
])

# ======================================================================= 9
doc.add_heading("9.  Speed and reliability", level=1)
para(
    "Public pages are pre-built and served from cache, so a visitor never waits for the "
    "database. When you save a change, the affected pages are rebuilt immediately."
)
para(
    "This matters more than it sounds. In an earlier version every page was assembled from "
    "scratch on each visit, which meant a fresh database connection — around five seconds "
    "— before anything appeared. That occasionally exceeded the hosting platform's time "
    "limit and produced the intermittent “site cannot be reached” errors seen during "
    "testing. Serving pre-built pages removes that failure entirely."
)
para("The site is also built to degrade rather than break:")
bullets([
    "If the database is briefly unreachable, pages still render with the content they can reach instead of showing an error",
    "The admin sign-in page works even during a database outage, so you are never locked out precisely when you need access",
    "A failed database connection is retried on the next request rather than being cached as broken",
    "Images are sized correctly for where they appear, so nothing is downloaded larger than needed",
])

# ====================================================================== 10
doc.add_heading("10.  Outside services", level=1)
table(
    ["Service", "Used for", "Account needed"],
    [
        ["Vercel", "Hosting and deployment", "Yes"],
        ["MongoDB Atlas", "Content database", "Yes"],
        ["GitHub", "Source code", "Yes"],
        ["Formspree", "Contact form delivery", "Yes"],
        ["YouTube", "Videos on Case Studies", "Existing channel"],
        ["Google Maps", "Map on the contact page", "No"],
    ],
    widths=[1.7, 3.0, 1.8],
)
para(
    "There is no analytics or advertising tracking on the site, and no cookie is set for "
    "ordinary visitors — the single cookie in use belongs to the admin sign-in. This is "
    "stated accurately in the Privacy Policy."
)

# ====================================================================== 11
doc.add_heading("11.  Deployment", level=1)
rich([
    ("The site deploys automatically: pushing a change to the ", False, False),
    ("master", False, True),
    (" branch on GitHub triggers a new build on Vercel. There is no manual upload step.", False, False),
])
doc.add_heading("Settings Vercel needs", level=3)
table(
    ["Setting", "Purpose", "Required"],
    [
        ["MONGODB_URI", "Database connection", "Yes"],
        ["ADMIN_EMAIL", "First sign-in address", "Yes"],
        ["ADMIN_PASSWORD", "First sign-in password", "Yes"],
        ["AUTH_SECRET", "Signs sign-in sessions", "Recommended"],
        ["NEXT_PUBLIC_SITE_URL", "Your live domain", "Yes, once live"],
    ],
    widths=[2.2, 2.6, 1.7],
    mono_cols=(0,),
)
callout(
    "Two settings worth understanding",
    "NEXT_PUBLIC_SITE_URL tells the site its own web address. Every canonical address, "
    "link-preview image and sitemap entry is built from it, so it must match the live domain "
    "exactly. The database is also set to accept connections from anywhere, because hosting "
    "platforms connect from changing addresses and a fixed list cannot work; the database "
    "password is what protects it.",
)

# ====================================================================== 12
doc.add_heading("12.  Running it locally", level=1)
para("For a developer picking this up:")
bullets([
    [("npm install", False, True), (" — install dependencies", False, False)],
    [("npm run dev", False, True), (" — start the development server", False, False)],
    [("npm run build", False, True), (" — produce a production build", False, False)],
    [("npm run lint", False, True), (" — check code quality", False, False)],
])
rich([
    ("A ", False, False), (".env.local", False, True),
    (" file holds the settings listed in section 11. It is deliberately excluded from Git so "
     "credentials are never committed to GitHub.", False, False),
])
rich([
    ("A seeding script, ", False, False), ("scripts/seed.mjs", False, True),
    (", can populate an empty database with the initial content. It overwrites what is there, "
     "so it is for setting up a fresh environment rather than for routine use.", False, False),
])

# ====================================================================== 13
doc.add_heading("13.  Looking after it", level=1)
doc.add_heading("Routine", level=3)
bullets([
    "Content changes are made in the admin and need no developer",
    "Publishing an article regularly is the single most effective thing you can do for search visibility",
    "Keep an eye on the Formspree monthly submission allowance if enquiries grow",
])
doc.add_heading("Periodic", level=3)
bullets([
    "Security updates to the underlying software should be applied a few times a year. The hosting platform blocks deployments running versions with known critical vulnerabilities, so keeping current is part of staying online.",
    "A developer can check for available updates in minutes and apply them without any change to the site's content or design",
    "Content, images and settings are all held in the database and the hosting platform, so updates to the software never put your content at risk",
])


# --------------------------------------------------------------------- footer
doc.add_paragraph()
para(
    "Vulpian Consultants website and content management system  ·  Document VC-WEB-001  "
    "·  Issued 13 August 2026",
    9, color=MUTED, align=WD_ALIGN_PARAGRAPH.CENTER,
)

out = "/home/marvin/vulpian/docs/Vulpian-Consultants-Project-Handover.docx"
import os
os.makedirs(os.path.dirname(out), exist_ok=True)
doc.save(out)
print("saved:", out)

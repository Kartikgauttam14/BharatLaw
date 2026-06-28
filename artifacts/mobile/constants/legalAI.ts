import { bareActs, judgments, type BareAct, type Judgment } from "./mockData";

export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  text: string;
  cases?: Judgment[];
  acts?: BareAct[];
  timestamp: Date;
}

interface TopicMatch {
  topic: string;
  score: number;
  keywords: string[];
}

const LEGAL_KEYWORDS: Record<string, string[]> = {
  "Fundamental Rights": [
    "fundamental right", "article 14", "article 19", "article 21", "equality",
    "right to life", "personal liberty", "freedom", "speech", "expression",
    "basic right", "constitutional right", "article 32", "writ",
  ],
  "Arrest & FIR": [
    "fir", "first information report", "arrest", "arrested", "police", "cognizable",
    "section 41", "section 154", "crpc", "custody", "detention", "bail bond",
    "anticipatory bail", "regular bail",
  ],
  "Bail": [
    "bail", "bailable", "non-bailable", "anticipatory", "surety", "bond",
    "default bail", "release", "remand", "judicial custody",
  ],
  "Sexual Harassment": [
    "sexual harassment", "workplace harassment", "vishaka", "posh", "internal committee",
    "icc", "hostile environment", "quid pro quo", "#metoo", "molestation",
  ],
  "Marriage & Divorce": [
    "divorce", "marriage", "matrimonial", "husband", "wife", "spouse",
    "mutual consent", "cruelty", "desertion", "alimony", "maintenance",
    "section 498a", "dowry", "hindu marriage", "muslim marriage", "christian marriage",
    "nikah", "talaq", "triple talaq", "mehr",
  ],
  "Property": [
    "property", "land", "sale deed", "registry", "transfer", "inheritance",
    "will", "succession", "ancestral", "partition", "possession", "encroachment",
    "easement", "lease", "rent", "tenancy", "eviction",
  ],
  "Privacy": [
    "privacy", "right to privacy", "aadhaar", "data protection", "surveillance",
    "personal data", "information", "puttaswamy",
  ],
  "Constitutional Law": [
    "constitution", "amendment", "basic structure", "parliament", "kesavananda",
    "fundamental duty", "directive principle", "dpsp", "preamble", "federal",
    "separation of powers", "judicial review",
  ],
  "Criminal Law": [
    "murder", "culpable homicide", "theft", "robbery", "cheating", "fraud",
    "section 302", "section 420", "ipc", "criminal", "offence", "cognizable",
    "non-cognizable", "fir", "chargesheet", "trial", "acquittal", "conviction",
    "sentence", "punishment", "imprisonment",
  ],
  "Consumer Rights": [
    "consumer", "deficiency", "service", "goods", "product", "complaint",
    "consumer forum", "ncdrc", "state commission", "district forum", "refund",
    "warranty", "guarantee",
  ],
  "Labour Law": [
    "employment", "employee", "employer", "labour", "termination", "retrenchment",
    "provident fund", "epf", "gratuity", "minimum wage", "workman",
    "industrial dispute", "strike", "lockout", "unfair labour practice",
  ],
  "RTI": [
    "rti", "right to information", "public information", "cpio", "transparency",
    "government documents", "information act",
  ],
  "Domestic Violence": [
    "domestic violence", "protection of women", "pwdva", "shared household",
    "protection order", "residence order", "abusive relationship",
  ],
  "Child Rights": [
    "child", "minor", "custody", "juvenile", "pocso", "child marriage",
    "adoption", "guardian", "welfare",
  ],
  "Company Law": [
    "company", "corporation", "director", "shareholder", "incorporation",
    "winding up", "insolvency", "ibc", "nclt", "memorandum", "articles",
  ],
  "Tax": [
    "income tax", "gst", "goods and services tax", "tax evasion", "assessment",
    "appeal", "itat", "high court", "tax liability", "deduction", "exemption",
  ],
  "Environment": [
    "environment", "pollution", "forest", "wildlife", "green tribunal", "ngt",
    "ecology", "conservation", "air pollution", "water pollution",
  ],
};

const TOPIC_RESPONSES: Record<string, string> = {
  "Fundamental Rights": `**Fundamental Rights under the Indian Constitution** (Part III, Articles 12–35):

As a citizen, you are guaranteed these core protections:

• **Article 14** — Right to Equality before law and equal protection of laws
• **Article 19** — Right to Freedom: speech, assembly, movement, profession
• **Article 21** — Right to Life and Personal Liberty (most expansive right)
• **Article 25** — Freedom of religion and conscience
• **Article 32** — Right to constitutional remedies (Dr. B.R. Ambedkar called this the "heart and soul" of the Constitution)

**Key principle from Maneka Gandhi v. Union of India (1978):** Any procedure that deprives you of life or liberty must be **fair, just, and reasonable** — not merely any procedure prescribed by law.

**Article 21 includes:** right to livelihood, right to privacy, right to education, right to health, right to clean environment, and right to speedy trial.

If any of your fundamental rights are violated, you can directly approach the **Supreme Court under Article 32** or a **High Court under Article 226** for a writ remedy.`,

  "Arrest & FIR": `**Your Rights on Arrest and FIR — Know the Law:**

**Filing an FIR (First Information Report):**
• Under **Section 154 CrPC**, registration of FIR is **mandatory** if the information discloses a cognizable offence — the police cannot refuse. *(Lalita Kumari v. Govt. of U.P., 2013)*
• If police refuse to register FIR, you can approach the **Superintendent of Police** or directly approach a **Magistrate under Section 156(3) CrPC**
• You can also file an e-FIR on most state police websites

**Rights on Arrest:**
• Right to know the **grounds of arrest** (Article 22)
• Right to be produced before a **Magistrate within 24 hours** (Article 22(2))
• Right to consult a **lawyer of your choice**
• For offences with imprisonment less than 7 years — arrest is NOT mandatory; police must record reasons in writing *(Arnesh Kumar v. State of Bihar, 2014)*
• Right against **self-incrimination** (Article 20(3))

**Section 498A IPC (Matrimonial Cruelty):** Arrests under this section cannot be made routinely without following Section 41 CrPC checklist *(Arnesh Kumar guidelines)*`,

  "Bail": `**Understanding Bail in Indian Law:**

**Types of Bail:**
1. **Regular Bail (Sections 436–437 CrPC)** — Applied after arrest in a Sessions Court or High Court
2. **Anticipatory Bail (Section 438 CrPC)** — Applied BEFORE arrest when you apprehend arrest
3. **Default/Statutory Bail (Section 167(2) CrPC)** — Right to bail if police don't file chargesheet within 60/90 days
4. **Interim Bail** — Temporary bail granted pending a full hearing

**Bailable vs Non-Bailable Offences:**
• **Bailable** (Schedule I, CrPC): Bail is a right, police/court must grant it
• **Non-Bailable**: Bail is a discretion of the court; factors include — nature of offence, criminal antecedents, flight risk, evidence tampering

**Key bail conditions courts consider:**
- Gravity and nature of the accusation
- Antecedents of the accused
- Possibility of fleeing from justice
- Safety of the community / victim

**Triple test for bail in serious cases:** no flight risk + no evidence tampering + no threat to witnesses/complainant

Approach your **district/sessions court** first, then **High Court**, then **Supreme Court** if denied.`,

  "Sexual Harassment": `**Sexual Harassment at Workplace — POSH Act, 2013:**

**Definition (Section 2(n) POSH Act):**
Any unwelcome act of a sexual nature — physical contact, demand for sexual favours, sexually coloured remarks, showing pornography, or any other unwelcome physical/verbal/non-verbal conduct.

**Your Rights as a Victim:**
• Every organisation with 10+ employees MUST have an **Internal Complaints Committee (ICC)**
• Smaller workplaces have a **Local Complaints Committee (LCC)** at district level
• File complaint within **3 months** of incident (extendable to 6 months)
• Right to **conciliation** (optional) or formal inquiry
• Protection from **victimisation/retaliation**
• During inquiry, you can request **transfer or leave**

**Vishaka Guidelines (1997):** The Supreme Court's landmark ruling made these protections mandatory even before the 2013 Act. Sexual harassment is a violation of Articles 14, 19, and 21.

**Penalties:** Employer can face fine up to ₹50,000; repeated violations may lead to cancellation of business licence.

**Also applies to:** domestic workers, students, patients — wherever a power relationship exists.`,

  "Marriage & Divorce": `**Marriage and Divorce Laws in India:**

**Hindu Marriage Act, 1955** (applies to Hindus, Buddhists, Jains, Sikhs):

*Grounds for Divorce (Section 13):*
• Cruelty (physical or mental)
• Adultery
• Desertion for 2+ years
• Conversion to another religion
• Mental disorder / unsoundness
• Communicable disease (leprosy, venereal disease)
• Renunciation of the world
• **Mutual Consent (Section 13B):** 1 year separation + 6-month cooling period (courts can waive cooling period per SC ruling)

**Section 498A IPC — Matrimonial Cruelty:**
• Punishable by up to 3 years imprisonment
• SC guidelines in **Arnesh Kumar (2014):** arrests must not be routine, police must follow Section 41 CrPC checklist

**Maintenance/Alimony:**
• Under **Section 125 CrPC** — wife, children, parents can claim maintenance
• Under **Hindu Adoption & Maintenance Act** — Hindu wives have specific rights
• Muslim women: Protection of Muslim Women Act, 2019 governs maintenance

**Triple Talaq:** Declared unconstitutional and criminalised (Triple Talaq Act, 2019)

For divorce, approach the **Family Court** in your city.`,

  "Property": `**Property Law in India — Key Rights & Procedures:**

**Transfer of Property Act, 1882:**
• Governs sale, mortgage, lease, gift, exchange of immovable property
• Sale deed must be registered under **Registration Act, 1908**
• Payment of **stamp duty** (varies by state, typically 4–7% of market value)

**Right to property:**
• Not a fundamental right (removed by 44th Amendment, 1978)
• But it is a **legal right** under Article 300A — cannot be deprived without authority of law

**Inheritance/Succession:**
• **Hindu Succession Act, 1956 (amended 2005):** Daughters have equal rights in ancestral property
• **Muslim Personal Law:** Governed by Sharia principles
• **Indian Succession Act, 1925:** Christians and Parsis

**Adverse Possession:** If you occupy someone else's land openly, continuously, and without permission for **12 years**, you may claim ownership (Section 65, Limitation Act)

**Encroachment:** File complaint with local municipal body or approach civil court for injunction

**Tenant/Landlord:** Each state has its own Rent Control Act. Generally notice period, grounds for eviction are regulated.

**RERA (2016):** Protects home buyers from builder fraud and delays.`,

  "Privacy": `**Right to Privacy in India:**

**K.S. Puttaswamy v. Union of India (2017)** — 9-judge bench unanimously declared **Right to Privacy is a Fundamental Right** under Article 21.

**What privacy protects:**
• **Decisional autonomy:** Right to make personal choices (sexuality, diet, relationships)
• **Informational privacy:** Control over your personal data
• **Bodily integrity:** Autonomy over your own body
• **Right to be forgotten**

**Aadhaar:** SC upheld the Aadhaar Act (2016) but struck down making it mandatory for private entities and for bank accounts/mobile SIMs (Justice Chandrachud dissented, calling it unconstitutional).

**Current Data Protection:** Digital Personal Data Protection Act, 2023 — India's comprehensive data protection law
• Right to information about personal data processing
• Right to correction and erasure
• Right to grievance redressal
• Significant fines for data breaches

**If your privacy is violated:**
• Approach police for criminal complaints (IT Act violations)
• Civil suit for damages
• File complaint with Data Protection Board (once constituted)
• Writ petition in High Court if fundamental right is violated`,

  "Constitutional Law": `**Indian Constitutional Law — Key Concepts:**

**Basic Structure Doctrine (Kesavananda Bharati, 1973):**
Parliament can amend the Constitution but CANNOT destroy its Basic Structure, which includes:
• Supremacy of the Constitution
• Republican and democratic form of government
• Secular character
• Separation of powers
• Federal character
• Judicial independence
• Rule of law
• Fundamental rights

**Amendment Process:**
• Simple majority: Ordinary legislation
• Special majority (2/3 of members present + majority of total strength): Most constitutional amendments
• Special majority + ratification by half of state legislatures: Federal provisions (Articles 54, 55, 73, 162, etc.)

**Fundamental Rights vs Directive Principles:**
• Fundamental Rights (Part III): Justiciable — courts enforce them
• Directive Principles (Part IV): Non-justiciable — but courts use them to interpret FRs

**Judicial Review:** Courts can strike down laws that violate constitutional provisions — this is a basic feature.

**Writ Jurisdiction:**
• Supreme Court (Article 32): Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo Warranto
• High Courts (Article 226): Same writs + wider jurisdiction`,

  "Criminal Law": `**Understanding Indian Criminal Law (IPC & CrPC):**

**Indian Penal Code, 1860 — Important Sections:**

| Section | Offence | Maximum Punishment |
|---------|---------|-------------------|
| 302 | Murder | Death / Life imprisonment |
| 304 | Culpable homicide | 10 years / Life |
| 307 | Attempt to murder | 10 years / Life |
| 375/376 | Rape | 7–20 years / Life |
| 420 | Cheating | 7 years |
| 498A | Matrimonial cruelty | 3 years |
| 354 | Assault on woman | 1–5 years |
| 380 | Theft | 3 years |

**Criminal Trial Process:**
1. FIR registered
2. Investigation by police
3. Chargesheet filed (60/90 days)
4. Cognizance by Magistrate
5. Framing of charges
6. Evidence & trial
7. Arguments
8. Judgment / Sentencing
9. Appeal

**Burden of Proof:** Prosecution must prove guilt **beyond reasonable doubt**

**Note:** IPC has been replaced by Bharatiya Nyaya Sanhita (BNS) 2023, effective July 2024. Most sections are retained with renumbering.`,

  "Consumer Rights": `**Consumer Rights in India — Consumer Protection Act, 2019:**

**Who is a Consumer?**
Any person who buys goods or hires services for personal use (not for commercial resale).

**Your Rights:**
• Right to **safety** — protection from hazardous goods/services
• Right to **information** — accurate product information, price, quality
• Right to **choose** — access to variety at competitive prices
• Right to be **heard** — consumer grievances must be addressed
• Right to **seek redressal** — compensation for defective goods/deficient services
• Right to **consumer education**

**Where to file complaint:**
• **District Consumer Commission:** Claims up to ₹1 crore
• **State Consumer Commission:** Claims ₹1 crore to ₹10 crore
• **National Consumer Commission (NCDRC):** Claims above ₹10 crore
• **Online:** edaakhil.nic.in (e-filing portal, free for individuals)

**Time limit:** File complaint within **2 years** from cause of action

**Common cases:** Faulty electronics, insurance claim rejection, bank charges, builder delays, medical negligence, airline/hotel deficiency

**Product liability (new in 2019 Act):** You can sue the manufacturer directly without proving negligence.`,

  "Labour Law": `**Labour & Employment Rights in India:**

**Key Labour Codes (2020 consolidation of 29 old laws):**
1. **Code on Wages** — Minimum wage, payment of wages, equal remuneration
2. **Industrial Relations Code** — Trade unions, strikes, disputes
3. **Code on Social Security** — PF, gratuity, ESI, maternity benefit
4. **Occupational Safety Code** — Workplace health and safety

**Key Employee Rights:**
• **Minimum Wages:** Varies by state and skill level; check state Labour Dept website
• **Provident Fund (EPF):** 12% employee + 12% employer contribution (establishments with 20+ employees)
• **Gratuity:** 15 days salary per year after 5 years continuous service
• **Maternity Leave:** 26 weeks paid leave (organizations with 10+ employees)
• **Termination notice:** 1 month notice or pay in lieu thereof

**If wrongfully terminated:**
• Approach **Labour Commissioner** for conciliation
• File before **Labour Court/Industrial Tribunal**
• Workers employed < 240 days: termination deemed retrenchment requiring notice + compensation

**Sexual harassment complaint:** File with Internal Committee (if 10+ employees) or Local Committee

**Working hours:** Max 9 hours/day, 48 hours/week; overtime at double rate`,

  "RTI": `**Right to Information Act, 2005 — How to Use It:**

**What you can get:**
• Copies of government documents, records, files
• Inspection of government works, documents
• Certified samples of material
• Information held by public authorities (Central, State, Local bodies)

**How to file an RTI:**
1. Write/type your application in English, Hindi, or state's official language
2. Pay ₹10 fee (BPL families exempt) — by postal order, DD, or cash
3. Submit to **Public Information Officer (PIO)** of the concerned department
4. Online: rtionline.gov.in (for Central Govt), state portals for state departments

**Time limits:**
• PIO must respond within **30 days** (48 hours if it concerns life/liberty)
• If no response or unsatisfied: **First Appeal** to Appellate Authority within 30 days
• Second Appeal to **Central/State Information Commissioner** within 90 days

**Exemptions (Section 8):** National security, cabinet notes, personal information, third-party commercial secrets, judiciary

**Penalty:** If PIO delays or refuses wrongly, IC can impose penalty of ₹250/day (max ₹25,000) and recommend disciplinary action`,

  "Domestic Violence": `**Protection Against Domestic Violence — PWDVA, 2005:**

**Definition — Domestic Violence includes:**
• Physical abuse (hitting, slapping, kicking)
• Sexual abuse (marital rape, sexual assault)
• Emotional/verbal abuse (humiliation, insults, threats)
• Economic abuse (depriving money, preventing employment, denying access to resources)

**Who is protected?** Any woman in a **domestic relationship** — wife, live-in partner, daughter, mother, sister, daughter-in-law

**Relief available:**
• **Protection Order** — stops abuser from contacting/approaching you
• **Residence Order** — right to stay in shared household (even if husband owns it)
• **Monetary Relief** — compensation for medical expenses, loss of income
• **Custody Order** — temporary child custody
• **Compensation Order** — for mental torture and emotional distress

**How to seek help:**
1. Contact **Protection Officer** (appointed in each district)
2. Approach any **Magistrate** court (no court fees)
3. Call **181 (Women Helpline)** or **112 (Police)**
4. NGOs like iCall, iWill, Majlis

**Also applicable:** Section 498A IPC (cruelty by husband/relatives) — criminal complaint to police`,

  "Child Rights": `**Child Rights and Protection Laws in India:**

**Definition of Child:** Any person below 18 years of age

**POCSO Act, 2012 — Protection of Children from Sexual Offences:**
• Covers penetrative sexual assault, sexual harassment, using children for pornography
• **Gender-neutral** — protects all children regardless of gender
• **Mandatory reporting:** Any person who suspects POCSO offence MUST report to police/SJPU
• Special Courts for speedy trial (must complete within 1 year)
• Child's identity must NOT be disclosed
• Strict punishment: 7 years to life imprisonment

**Child Custody:**
• Governed by **Guardians and Wards Act, 1890** and personal laws
• Primary consideration: **Welfare and best interest of child**
• No law mandates custody to mother/father by default
• Courts consider age, child's preference (if mature), parents' capacity

**Child Marriage Prohibition Act, 2006:**
• Legal marriage age: 18 for women, 21 for men
• Child marriage is voidable at option of child
• Marriages can be declared void in certain states

**Juvenile Justice Act, 2015:**
• Children below 18: JJ Act applies
• 16–18 for heinous offences: Juvenile Justice Board may try as adult

**For help:** Childline India — call 1098 (24/7, free)`,

  "Company Law": `**Company Law in India — Companies Act, 2013:**

**Types of Companies:**
• Private Limited (Pvt Ltd): 2–200 members, cannot invite public investment
• Public Limited: Can offer shares to public
• One Person Company (OPC): Single member, single director
• Limited Liability Partnership (LLP): Governed by LLP Act 2008

**Incorporation Process:**
1. Obtain **Digital Signature Certificate (DSC)**
2. Director Identification Number **(DIN)**
3. Name approval on **MCA portal**
4. File **SPICe+ form** (one-stop incorporation form)
5. Get **Certificate of Incorporation + PAN + TAN**

**Key compliance:**
• Annual return filing (MGT-7)
• Financial statements (AOC-4)
• Board meetings minimum 4/year
• Statutory audit mandatory

**Insolvency (IBC, 2016):**
• If company cannot pay debts: **Corporate Insolvency Resolution Process (CIRP)**
• Filed before **NCLT (National Company Law Tribunal)**
• Resolution Professional appointed
• 180 days (extendable to 330 days) to find resolution plan
• If no resolution: Liquidation`,

  "Tax": `**Income Tax in India — Key Points:**

**Who must file Income Tax Return (ITR)?**
• Income above basic exemption limit (₹2.5L old regime; ₹3L new regime)
• All companies, LLPs (regardless of income)
• If you have foreign assets, foreign income
• If TDS was deducted (to claim refund)

**Tax Regimes (AY 2024-25):**

| Income Slab | Old Regime | New Regime (Default) |
|-------------|-----------|---------------------|
| Up to ₹3L | Nil | Nil |
| ₹3L–₹7L | 5% | 5% |
| ₹7L–₹10L | 20% | 10% |
| ₹10L–₹12L | 30% | 15% |
| Above ₹12L | 30% | 30% |

**Important Deductions (Old Regime):**
• **80C:** ₹1.5L — PPF, ELSS, LIC, EPF, home loan principal
• **80D:** ₹25,000–₹75,000 — health insurance premium
• **HRA, LTA, standard deduction (₹50,000)**

**If you receive a tax notice:**
• Respond within the time given
• Consult a CA/tax advocate
• Appeal to **CIT(Appeals)** → **ITAT** → High Court → Supreme Court

**GST disputes:** Approach GST Appellate Authority, then High Court`,
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function scoreQuery(query: string): Array<{ topic: string; score: number }> {
  const tokens = tokenize(query);
  const scores: Record<string, number> = {};

  for (const [topic, keywords] of Object.entries(LEGAL_KEYWORDS)) {
    let score = 0;
    for (const keyword of keywords) {
      const kwTokens = keyword.split(" ");
      if (kwTokens.length === 1) {
        if (tokens.includes(kwTokens[0])) score += 2;
      } else {
        if (query.toLowerCase().includes(keyword)) score += 3;
      }
    }
    if (score > 0) scores[topic] = score;
  }

  return Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([topic, score]) => ({ topic, score }));
}

function searchJudgments(query: string, topics: string[]): Judgment[] {
  const tokens = tokenize(query);
  const scored = judgments.map((j) => {
    let score = 0;
    const allText = [j.title, j.headnote, j.aiSummary, ...j.topic, ...j.acts].join(" ").toLowerCase();
    for (const token of tokens) {
      if (allText.includes(token)) score += 1;
    }
    for (const topic of topics) {
      if (j.topic.some((t) => t.toLowerCase().includes(topic.toLowerCase()))) score += 3;
    }
    return { j, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.j);
}

function searchActs(query: string, topics: string[]): BareAct[] {
  const tokens = tokenize(query);
  const scored = bareActs.map((a) => {
    let score = 0;
    const allText = [a.title, a.description, a.category].join(" ").toLowerCase();
    for (const token of tokens) {
      if (allText.includes(token)) score += 1;
    }
    for (const topic of topics) {
      if (a.category.toLowerCase().includes(topic.toLowerCase())) score += 2;
    }
    return { a, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((s) => s.a);
}

function buildGreeting(query: string): string {
  const greetings = ["hello", "hi", "namaste", "namaskar", "hey", "good morning", "good evening"];
  const q = query.toLowerCase().trim();
  if (greetings.some((g) => q.startsWith(g) || q === g)) {
    return `**Namaste! 🙏 I am BharatLaw AI — your Indian Legal Assistant.**

I can help you understand:
• **Your fundamental rights** and constitutional protections
• **Criminal law** — FIR, bail, arrest rights, IPC sections
• **Family law** — marriage, divorce, maintenance, custody
• **Property** — sale, inheritance, registration
• **Consumer rights** and remedies
• **Labour law** — employment, termination, PF, gratuity
• **RTI** — how to file and follow up
• **Company law** and corporate matters
• **Tax** — income tax, GST, notices

Just ask me any legal question in plain language. I will give you accurate information based on Indian case law and statutes.

*Example: "What are my rights if police arrest me?" or "How do I file for divorce in India?"*`;
  }
  return "";
}

function buildFallback(query: string): string {
  return `I searched through my database for **"${query}"** but could not find a specific match in my legal knowledge base.

**Try asking about:**
• Bail and arrest rights
• FIR filing procedure
• Marriage and divorce law
• Property and inheritance
• Consumer protection
• RTI — Right to Information
• Sexual harassment at workplace
• Fundamental rights
• Labour and employment rights
• Income tax and GST

**For complex legal matters**, I always recommend consulting a registered advocate. You can find one through:
• **Bar Council of India** (barcouncilofindia.org)
• **District Bar Association** in your city
• **Legal Services Authority** for free legal aid (NALSA): 15100

*Is there a specific legal topic I can help you with?*`;
}

export function processQuery(query: string): {
  answer: string;
  cases: Judgment[];
  acts: BareAct[];
} {
  const greeting = buildGreeting(query);
  if (greeting) return { answer: greeting, cases: [], acts: [] };

  const topicMatches = scoreQuery(query);
  const topTopics = topicMatches.slice(0, 2).map((t) => t.topic);

  let answer = "";

  if (topicMatches.length > 0 && topicMatches[0].score >= 2) {
    const primaryTopic = topicMatches[0].topic;
    answer = TOPIC_RESPONSES[primaryTopic] ?? buildFallback(query);
  } else {
    answer = buildFallback(query);
  }

  const cases = searchJudgments(query, topTopics);
  const acts = searchActs(query, topTopics);

  return { answer, cases, acts };
}

export const SUGGESTED_QUESTIONS = [
  "What are my fundamental rights?",
  "How do I file an FIR if police refuse?",
  "How to get bail after arrest?",
  "What are my rights if arrested by police?",
  "How to file for divorce in India?",
  "What is the POSH Act for workplace harassment?",
  "How to file an RTI application?",
  "What is the Right to Privacy in India?",
  "How to protect myself from domestic violence?",
  "What are consumer rights in India?",
  "Labour rights if wrongfully terminated?",
  "What is the Basic Structure doctrine?",
];

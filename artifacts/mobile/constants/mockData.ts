export interface Judgment {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  year: number;
  bench: string;
  judges: string[];
  petitioner: string;
  respondent: string;
  topic: string[];
  acts: string[];
  headnote: string;
  aiSummary: string;
  fullText: string;
  pdfUrl?: string;
}

export interface BareAct {
  id: string;
  title: string;
  shortTitle: string;
  year: number;
  ministry: string;
  category: string;
  sections: number;
  description: string;
  lastAmended: string;
}

export interface CourtFilter {
  id: string;
  name: string;
  shortName: string;
  state?: string;
}

export const courts: CourtFilter[] = [
  { id: "sc", name: "Supreme Court of India", shortName: "SC" },
  { id: "hc-del", name: "Delhi High Court", shortName: "Delhi HC", state: "Delhi" },
  { id: "hc-bom", name: "Bombay High Court", shortName: "Bombay HC", state: "Maharashtra" },
  { id: "hc-mad", name: "Madras High Court", shortName: "Madras HC", state: "Tamil Nadu" },
  { id: "hc-cal", name: "Calcutta High Court", shortName: "Calcutta HC", state: "West Bengal" },
  { id: "hc-ker", name: "Kerala High Court", shortName: "Kerala HC", state: "Kerala" },
  { id: "hc-kar", name: "Karnataka High Court", shortName: "Karnataka HC", state: "Karnataka" },
  { id: "hc-all", name: "Allahabad High Court", shortName: "Allahabad HC", state: "Uttar Pradesh" },
];

export const topics = [
  "Constitutional Law", "Criminal Law", "Civil Law", "Family Law",
  "Property Law", "Contract Law", "Labour Law", "Tax Law",
  "Environmental Law", "Intellectual Property", "Company Law",
  "Banking & Finance", "Arbitration", "Human Rights",
];

export const judgments: Judgment[] = [
  {
    id: "j001",
    title: "Kesavananda Bharati v. State of Kerala",
    citation: "(1973) 4 SCC 225",
    court: "Supreme Court of India",
    date: "24 April 1973",
    year: 1973,
    bench: "13-Judge Constitutional Bench",
    judges: ["Justice Y.V. Chandrachud", "Justice K.S. Hegde", "Justice A.K. Mukherjea", "Justice J.M. Shelat"],
    petitioner: "His Holiness Kesavananda Bharati Sripadagalvaru",
    respondent: "State of Kerala",
    topic: ["Constitutional Law", "Human Rights"],
    acts: ["Constitution of India", "Kerala Land Reforms Act, 1963"],
    headnote: "Parliament's power to amend the Constitution does not extend to altering or destroying its basic structure.",
    aiSummary: "This landmark 13-judge bench ruling established the 'Basic Structure Doctrine' of the Indian Constitution. The court held that while Parliament has wide powers to amend the Constitution under Article 368, such amendments cannot destroy or abrogate the basic structure or framework of the Constitution. Key basic features include: supremacy of the Constitution, republican and democratic form of government, secular character, separation of powers, and federal character. This case overruled the earlier Golak Nath judgment and remains the cornerstone of Indian constitutional law.",
    fullText: "In this landmark judgment, a 13-judge bench of the Supreme Court, by a razor-thin majority of 7:6, held that the Parliament has the power to amend the Constitution but cannot alter or destroy its basic structure. The case arose from challenges to Kerala land reform legislation and constitutional amendments that sought to shield these laws from judicial review...",
    pdfUrl: "https://main.sci.gov.in/judgment/judis/9267.pdf",
  },
  {
    id: "j002",
    title: "Maneka Gandhi v. Union of India",
    citation: "(1978) 1 SCC 248",
    court: "Supreme Court of India",
    date: "25 January 1978",
    year: 1978,
    bench: "7-Judge Bench",
    judges: ["Justice P.N. Bhagwati", "Justice Y.V. Chandrachud", "Justice V.R. Krishna Iyer"],
    petitioner: "Maneka Gandhi",
    respondent: "Union of India",
    topic: ["Constitutional Law", "Human Rights"],
    acts: ["Constitution of India - Article 21", "Passports Act, 1967"],
    headnote: "Article 21 procedure must be fair, just, and reasonable. Right to life and liberty includes right to travel abroad.",
    aiSummary: "The Supreme Court expanded the scope of Article 21 significantly. It held that the 'procedure established by law' must be fair, just, and reasonable — not arbitrary, fanciful, or oppressive. The court ruled that the right to travel abroad is part of personal liberty under Article 21. This judgment established that Articles 14, 19, and 21 are not mutually exclusive and must be read together. The State cannot deprive a person of their fundamental rights without following a procedure that is just, fair, and reasonable.",
    fullText: "The petitioner's passport was impounded by the Government of India without giving her an opportunity to be heard. She challenged the Passports Act and the impoundment order...",
    pdfUrl: undefined,
  },
  {
    id: "j003",
    title: "Vishaka v. State of Rajasthan",
    citation: "(1997) 6 SCC 241",
    court: "Supreme Court of India",
    date: "13 August 1997",
    year: 1997,
    bench: "3-Judge Bench",
    judges: ["Justice J.S. Verma", "Justice Sujata Manohar", "Justice B.N. Kirpal"],
    petitioner: "Vishaka & Others",
    respondent: "State of Rajasthan",
    topic: ["Human Rights", "Labour Law", "Constitutional Law"],
    acts: ["Constitution of India - Articles 14, 19, 21", "Convention on Elimination of All Forms of Discrimination Against Women"],
    headnote: "Sexual harassment at workplace violates fundamental rights. Mandatory guidelines issued for prevention.",
    aiSummary: "This path-breaking judgment laid down the Vishaka Guidelines for prevention of sexual harassment of women at the workplace. Treating sexual harassment as a violation of fundamental rights under Articles 14, 19, and 21, the Supreme Court issued binding guidelines that remained in force until the Sexual Harassment of Women at Workplace Act, 2013 was enacted. The guidelines mandated employers to set up Internal Complaints Committees and take preventive steps. This case arose from the gang-rape of a social worker in Rajasthan.",
    fullText: "This public interest litigation was filed following the gang-rape of Bhanwari Devi, a social worker in Rajasthan who tried to prevent a child marriage. The case highlighted the absence of effective legislation against sexual harassment at the workplace...",
  },
  {
    id: "j004",
    title: "Navtej Singh Johar v. Union of India",
    citation: "(2018) 10 SCC 1",
    court: "Supreme Court of India",
    date: "6 September 2018",
    year: 2018,
    bench: "5-Judge Constitutional Bench",
    judges: ["Chief Justice Dipak Misra", "Justice R.F. Nariman", "Justice A.M. Khanwilkar", "Justice D.Y. Chandrachud", "Justice Indu Malhotra"],
    petitioner: "Navtej Singh Johar",
    respondent: "Union of India",
    topic: ["Constitutional Law", "Human Rights", "Criminal Law"],
    acts: ["Indian Penal Code - Section 377", "Constitution of India"],
    headnote: "Section 377 IPC unconstitutional to the extent it criminalises consensual sexual conduct between adults in private.",
    aiSummary: "The Supreme Court unanimously struck down Section 377 of the Indian Penal Code to the extent it criminalised consensual sexual conduct between adults. The bench held that the LGBTQ+ community is entitled to equal citizenship, dignity, and all fundamental rights guaranteed by the Constitution. The judgment overruled the 2013 Suresh Kumar Koushal decision and affirmed that sexual orientation is an essential attribute of privacy. All four judges wrote separate concurring opinions reinforcing the constitutional morality over social morality.",
    fullText: "A Constitution Bench of the Supreme Court delivered four separate but concurring opinions unanimously holding that consensual sexual conduct between adults in private cannot be criminalised...",
  },
  {
    id: "j005",
    title: "K.S. Puttaswamy v. Union of India",
    citation: "(2017) 10 SCC 1",
    court: "Supreme Court of India",
    date: "24 August 2017",
    year: 2017,
    bench: "9-Judge Constitutional Bench",
    judges: ["Chief Justice J.S. Khehar", "Justice D.Y. Chandrachud", "Justice J. Chelameswar", "Justice S.A. Bobde"],
    petitioner: "Justice K.S. Puttaswamy (Retd.)",
    respondent: "Union of India",
    topic: ["Constitutional Law", "Human Rights"],
    acts: ["Constitution of India - Article 21", "Aadhaar Act, 2016"],
    headnote: "Right to privacy is a fundamental right under Article 21 of the Constitution.",
    aiSummary: "In this historic unanimous judgment by a 9-judge bench, the Supreme Court declared that the right to privacy is a fundamental right protected under Article 21 of the Constitution. The judgment overruled earlier decisions in M.P. Sharma and Kharak Singh that had denied constitutional status to privacy. The court held that privacy encompasses personal autonomy, bodily integrity, informational self-determination, and the right to be left alone. This decision has far-reaching implications for data protection, surveillance, and individual freedoms.",
    fullText: "A nine-judge constitutional bench was constituted to decide whether the right to privacy is a fundamental right under the Constitution of India. The bench was formed in the context of challenges to the Aadhaar scheme...",
  },
  {
    id: "j006",
    title: "Arnesh Kumar v. State of Bihar",
    citation: "(2014) 8 SCC 273",
    court: "Supreme Court of India",
    date: "2 July 2014",
    year: 2014,
    bench: "2-Judge Bench",
    judges: ["Justice Chandramauli Kumar Prasad", "Justice Pinaki Chandra Ghose"],
    petitioner: "Arnesh Kumar",
    respondent: "State of Bihar & Another",
    topic: ["Criminal Law", "Human Rights"],
    acts: ["Indian Penal Code - Section 498A", "Code of Criminal Procedure - Section 41"],
    headnote: "Arrest not mandatory for offences punishable with imprisonment less than 7 years. Magistrate must apply mind before authorising detention.",
    aiSummary: "The Supreme Court issued detailed guidelines to curb indiscriminate arrests under Section 498A IPC (matrimonial cruelty). The court held that police must satisfy conditions under Section 41 CrPC before arresting any person and must record reasons in writing. Magistrates must apply their minds before authorising detention. The court noted that arrest is not mandatory in all cases and directed all states to comply. This judgment significantly curtailed misuse of Section 498A.",
    fullText: "The petitioner challenged his arrest under Section 498A IPC on a complaint by his wife. The Supreme Court took note of widespread misuse of Section 498A and laid down guidelines for arrest...",
  },
  {
    id: "j007",
    title: "Indian Young Lawyers Association v. State of Kerala",
    citation: "(2019) 11 SCC 1",
    court: "Supreme Court of India",
    date: "28 September 2018",
    year: 2018,
    bench: "5-Judge Constitutional Bench",
    judges: ["Chief Justice Dipak Misra", "Justice R.F. Nariman", "Justice A.M. Khanwilkar", "Justice D.Y. Chandrachud", "Justice Indu Malhotra"],
    petitioner: "Indian Young Lawyers Association",
    respondent: "State of Kerala",
    topic: ["Constitutional Law", "Human Rights"],
    acts: ["Constitution of India - Articles 14, 15, 17, 25, 26"],
    headnote: "Exclusion of women of menstruating age from Sabarimala temple is unconstitutional and violates Articles 14, 15, and 17.",
    aiSummary: "A 4:1 majority of the Supreme Court held that the practice of excluding women between 10-50 years of age from the Sabarimala temple in Kerala was unconstitutional. The majority held that constitutional morality must prevail over popular morality, and that the exclusion was based on a physiological feature unique to women and amounted to discrimination under Article 15. The court held it violated their right to worship under Article 25. Justice Indu Malhotra dissented, holding that courts should not interfere in matters of essential religious practices.",
    fullText: "A constitutional bench was constituted to examine the validity of the centuries-old practice of excluding women of menstruating age from the Sabarimala temple...",
  },
  {
    id: "j008",
    title: "Lalita Kumari v. Government of U.P.",
    citation: "(2014) 2 SCC 1",
    court: "Supreme Court of India",
    date: "12 November 2013",
    year: 2013,
    bench: "5-Judge Constitutional Bench",
    judges: ["Chief Justice P. Sathasivam", "Justice B.S. Chauhan", "Justice Ranjana Prakash Desai", "Justice Ranjan Gogoi", "Justice S.A. Bobde"],
    petitioner: "Lalita Kumari",
    respondent: "Government of Uttar Pradesh",
    topic: ["Criminal Law"],
    acts: ["Code of Criminal Procedure - Section 154", "Indian Penal Code"],
    headnote: "Registration of FIR is mandatory under Section 154 CrPC if disclosed information reveals cognizable offence.",
    aiSummary: "The Supreme Court settled the long-standing controversy over whether registration of FIR is mandatory under Section 154 CrPC. A five-judge bench held that registration of FIR is mandatory if information discloses commission of a cognizable offence. No preliminary inquiry is permissible at this stage. However, in cases where information does not disclose cognizable offence, preliminary inquiry may be held. The court provided guidelines on situations where preliminary inquiry can be conducted before FIR registration.",
    fullText: "A minor girl's father filed a petition when police refused to register an FIR for his daughter's abduction. The matter was referred to a larger bench to settle the legal position on mandatory FIR registration...",
  },
];

export const bareActs: BareAct[] = [
  {
    id: "a001",
    title: "The Constitution of India",
    shortTitle: "Constitution of India",
    year: 1949,
    ministry: "Ministry of Law and Justice",
    category: "Constitutional",
    sections: 395,
    description: "The supreme law of India, establishing the framework of the Indian government, fundamental rights, directive principles, and duties of citizens.",
    lastAmended: "2019",
  },
  {
    id: "a002",
    title: "The Indian Penal Code, 1860",
    shortTitle: "IPC, 1860",
    year: 1860,
    ministry: "Ministry of Home Affairs",
    category: "Criminal",
    sections: 511,
    description: "The main criminal code of India covering offences and punishments for crimes committed within the country.",
    lastAmended: "2013",
  },
  {
    id: "a003",
    title: "The Code of Criminal Procedure, 1973",
    shortTitle: "CrPC, 1973",
    year: 1973,
    ministry: "Ministry of Home Affairs",
    category: "Criminal",
    sections: 484,
    description: "Provides the procedure for administration of criminal law in India including investigation, trial, and appeal processes.",
    lastAmended: "2018",
  },
  {
    id: "a004",
    title: "The Code of Civil Procedure, 1908",
    shortTitle: "CPC, 1908",
    year: 1908,
    ministry: "Ministry of Law and Justice",
    category: "Civil",
    sections: 158,
    description: "Regulates the procedure for courts trying civil cases in India, including suits, appeals, and execution of decrees.",
    lastAmended: "2018",
  },
  {
    id: "a005",
    title: "The Indian Contract Act, 1872",
    shortTitle: "Contract Act, 1872",
    year: 1872,
    ministry: "Ministry of Law and Justice",
    category: "Civil",
    sections: 238,
    description: "Governs the law relating to contracts in India, covering formation, validity, breach, and remedies for breach of contracts.",
    lastAmended: "1997",
  },
  {
    id: "a006",
    title: "The Transfer of Property Act, 1882",
    shortTitle: "TP Act, 1882",
    year: 1882,
    ministry: "Ministry of Law and Justice",
    category: "Property",
    sections: 137,
    description: "Defines and amends certain parts of the law relating to transfer of property by act of parties in India.",
    lastAmended: "1929",
  },
  {
    id: "a007",
    title: "The Companies Act, 2013",
    shortTitle: "Companies Act, 2013",
    year: 2013,
    ministry: "Ministry of Corporate Affairs",
    category: "Company Law",
    sections: 470,
    description: "Governs incorporation, responsibilities, directors, and dissolution of companies in India.",
    lastAmended: "2020",
  },
  {
    id: "a008",
    title: "The Right to Information Act, 2005",
    shortTitle: "RTI Act, 2005",
    year: 2005,
    ministry: "Ministry of Personnel",
    category: "Constitutional",
    sections: 31,
    description: "Provides for setting out the practical regime of right to information for citizens to secure access to information under the control of public authorities.",
    lastAmended: "2019",
  },
  {
    id: "a009",
    title: "The Protection of Children from Sexual Offences Act, 2012",
    shortTitle: "POCSO Act, 2012",
    year: 2012,
    ministry: "Ministry of Women and Child Development",
    category: "Criminal",
    sections: 46,
    description: "Provides protection to children from offences of sexual assault, sexual harassment and pornography.",
    lastAmended: "2019",
  },
  {
    id: "a010",
    title: "The Insolvency and Bankruptcy Code, 2016",
    shortTitle: "IBC, 2016",
    year: 2016,
    ministry: "Ministry of Corporate Affairs",
    category: "Banking & Finance",
    sections: 255,
    description: "Consolidates and amends the laws relating to reorganisation and insolvency resolution of corporate persons, partnership firms and individuals.",
    lastAmended: "2021",
  },
  {
    id: "a011",
    title: "The Hindu Marriage Act, 1955",
    shortTitle: "Hindu Marriage Act",
    year: 1955,
    ministry: "Ministry of Law and Justice",
    category: "Family Law",
    sections: 29,
    description: "Governs marriage and divorce among Hindus, Buddhists, Jains, and Sikhs in India.",
    lastAmended: "2019",
  },
  {
    id: "a012",
    title: "The Income Tax Act, 1961",
    shortTitle: "Income Tax Act",
    year: 1961,
    ministry: "Ministry of Finance",
    category: "Tax Law",
    sections: 298,
    description: "The charging statute of income tax in India governing levy, administration, collection and recovery of income tax.",
    lastAmended: "2023",
  },
];

export const actCategories = [
  "Constitutional", "Criminal", "Civil", "Family Law",
  "Property", "Company Law", "Tax Law", "Labour Law",
  "Banking & Finance", "Environmental", "Intellectual Property",
];

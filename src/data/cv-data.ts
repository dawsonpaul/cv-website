export interface Company {
  name: string;
  description: string;
  logo?: string;
  website?: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  companyInfo: Company;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  description: string;
  responsibilities: string[];
}

export interface Skill {
  name: string;
  category:
    | "security"
    | "cloud"
    | "devops"
    | "programming"
    | "infrastructure"
    | "tools"
    | "professional"
    | "ai";
  level: number; // 1-5
}

export interface PersonalInfo {
  name: string;
  email: string;
  contact: string;
  nationality: string;
  availability: string;
  location: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  profileSummary: string;
  skills: Skill[];
  workExperience: WorkExperience[];
  interests: string[];
}

export const companies: Record<string, Company> = {
  HSBC: {
    name: "HSBC",
    description:
      "Hong Kong and Shanghai Banking Corporation, one of the world's largest banking and financial services organizations. Founded in 1865, HSBC has grown to serve customers worldwide, encompassing a range of services that include commercial banking, global banking and markets, retail banking and wealth management, and private banking.",
    logo: "/images/companies/hsbc.png",
    website: "https://www.hsbc.com/",
  },
  LSEG: {
    name: "London Stock Exchange Group",
    description:
      "London Stock Exchange Group plc (LSEG) is a United Kingdom-based stock exchange and financial information company headquartered in the City of London, England. It owns the London Stock Exchange (on which it is also listed), Refinitiv, LSEG Technology, FTSE Russell, and majority stakes in LCH and Tradeweb.",
    logo: "/images/companies/lseg.png",
    website: "https://www.lseg.com/",
  },
  "British Red Cross": {
    name: "British Red Cross",
    description:
      "The British Red Cross Society is the United Kingdom body of the worldwide neutral and impartial humanitarian network the International Red Cross and Red Crescent Movement. The society was formed in 1870, and is a registered charity with more than 32,500 volunteers and 3,500 staff.",
    logo: "/images/companies/british-red-cross.png",
    website: "https://www.redcross.org.uk/",
  },
  "Willis Towers Watson": {
    name: "Willis Towers Watson",
    description:
      "Willis Towers Watson (WTW) is a Global Risk Management, Insurance Brokerage and Financial Advisory company. WTW operates in over 120 countries, has a workforce of approximately 40,000 employees and revenues of $8.2 billion.",
    logo: "/images/companies/wtw.png",
    website: "https://www.wtwco.com/",
  },
  "Holtzbrink Publishing Group": {
    name: "Holtzbrink Publishing Group",
    description:
      "Holtzbrink Publishing Group is one of the largest publishing companies in the world with 15,000 staff in over 120 countries.",
    logo: "/images/companies/holtzbrink.png",
    website: "https://www.holtzbrinck.com/",
  },
  "Sainsbury's": {
    name: "Sainsbury's",
    description:
      "J Sainsbury plc is the third largest chain of supermarkets in the United Kingdom with a share of the UK supermarket sector of 16.5%. The group's head office is in the Sainsbury's Store Support Centre in Holborn Circus, City of London. The group also has interests in property and banking.",
    logo: "/images/companies/sainsburys.png",
    website: "https://www.sainsburys.co.uk/",
  },
  "Deutsche Bank": {
    name: "Deutsche Bank",
    description:
      "Deutsche Bank is a leading global investment bank with a substantial private client's franchise. Its businesses are mutually reinforcing. With more than 100,000 employees in over 70 countries Deutsche Bank offers financial services throughout the world.",
    logo: "/images/companies/deutsche-bank.png",
    website: "https://www.db.com/",
  },
  "UBS Investment Bank": {
    name: "UBS Investment Bank",
    description:
      "Employing more than 80,000 people, UBS is the leading global wealth manager, top tier investment banking and securities firm, and one of the largest global asset managers.",
    logo: "/images/companies/ubs.png",
    website: "https://www.ubs.com/",
  },
  "Nebulas Security": {
    name: "Nebulas Security (Securelink)",
    description:
      "Nebulas Security (Securelink) is a leading provider of Advanced IT Security, Mobility and Compliance solutions. Amongst other partnerships, they are Checkpoint/Crossbeam/F5 Gold Partners and provide consulting services to mostly FTSE 250 companies.",
    logo: "/images/companies/nebulas.png",
    website: "https://www.securelink.net/",
  },
  Easynet: {
    name: "Easynet",
    description:
      "Easynet are a Pan-European ISP whose core business is MPLS, Broadband and IP Services.",
    logo: "/images/companies/easynet.png",
    website: "https://www.easynet.com/",
  },
  Integralis: {
    name: "Integralis (Now NTT)",
    description:
      "Integralis are global Security & System Integrators. They are the parenting company of Allasso who are one of Europe's largest Checkpoint Partners. They also own Activis who fulfil their Managed Security Services business.",
    logo: "/images/companies/integralis.png",
    website: "https://www.global.ntt/",
  },
  Telkom: {
    name: "Telkom",
    description:
      "Telkom are the all incumbent Telco in South Africa and have a staff base of over 35,000.",
    logo: "/images/companies/telkom.png",
    website: "https://www.telkom.co.za/",
  },
  "Dimension Data": {
    name: "Dimension Data",
    description:
      "Dimension Data are a Global communications solutions provider. They owned a company called IS (Internet Solutions).",
    logo: "/images/companies/dimension-data.png",
    website: "https://www.dimensiondata.com/",
  },
  Chubb: {
    name: "Chubb",
    description:
      "Chubb is the world's largest publicly traded property and casualty insurance company.",
    logo: "/images/companies/chubb.png",
    website: "https://www.chubb.com/",
  },
};

export const cvData: CVData = {
  personalInfo: {
    name: "Paul Anthony Dawson",
    email: "dawsonpaul@gmail.com",
    contact: "",
    nationality: "British",
    availability: "4 Weeks",
    location: "Essex, United Kingdom",
  },
  profileSummary:
    "Technology leader with over two decades of professional experience, including 17 years as a contractor for major enterprises including HSBC, LSEG, Deutsche Bank, UBS Investment Bank, Sainsbury's, and Willis Towers Watson. Currently leading a team of DevOps Engineers at HSBC, specializing in cloud infrastructure, automation, and enterprise architecture. Recognized as a visionary problem-solver who creates innovative technical solutions through strategic automation. Proficient in multiple programming languages including Python, Bash, PowerShell, Terraform, JavaScript, Golang, and Jenkins Groovy. Experienced with both frontier and private LLM models. Committed to continuous learning and innovation in technology, with a passion for automating complex processes and delivering elegant solutions to challenging technical problems.",
  skills: [
    { name: "Web Application Firewall (WAF)", category: "security", level: 5 },
    { name: "Cloud Security", category: "security", level: 5 },
    { name: "DevSecOps", category: "devops", level: 5 },
    { name: "AWS", category: "cloud", level: 5 },
    { name: "Azure", category: "cloud", level: 5 },
    { name: "GCP", category: "cloud", level: 4 },
    { name: "Terraform", category: "infrastructure", level: 5 },
    { name: "Python", category: "programming", level: 4 },
    { name: "PowerShell", category: "programming", level: 4 },
    { name: "Bash", category: "programming", level: 5 },
    { name: "JavaScript", category: "programming", level: 3 },
    { name: "Golang", category: "programming", level: 3 },
    { name: "CI/CD Pipelines", category: "devops", level: 5 },
    { name: "GitHub", category: "tools", level: 5 },
    { name: "Jira", category: "tools", level: 5 },
    { name: "Ansible", category: "infrastructure", level: 4 },
    { name: "Power BI", category: "tools", level: 4 },
    { name: "F5 ASM", category: "security", level: 5 },
    { name: "Akamai", category: "security", level: 5 },
    { name: "Imperva", category: "security", level: 4 },
    { name: "Check Point", category: "security", level: 5 },
    { name: "Intrusion Prevention Systems", category: "security", level: 5 },
    { name: "SIEM", category: "security", level: 4 },
    { name: "Vulnerability Management", category: "security", level: 4 },
    { name: "Network Security", category: "security", level: 5 },
    { name: "Cisco", category: "infrastructure", level: 4 },
    { name: "Juniper", category: "infrastructure", level: 4 },
    { name: "Linux Administration", category: "infrastructure", level: 4 },
    { name: "Jenkins", category: "devops", level: 5 },
    { name: "GitLab", category: "devops", level: 5 },
    { name: "GitHub Actions", category: "devops", level: 5 },
    { name: "React", category: "programming", level: 4 },
    { name: "Node.js", category: "programming", level: 4 },
    { name: "Design & Architecture", category: "professional", level: 5 },
    { name: "Planning & Implementation", category: "professional", level: 5 },
    { name: "Technical Documentation", category: "professional", level: 5 },
    { name: "Problem Solving", category: "professional", level: 5 },
    { name: "Team Leadership", category: "professional", level: 5 },
    { name: "Technical Presentations", category: "professional", level: 5 },
    { name: "System Architecture", category: "professional", level: 5 },
    { name: "Diagramming", category: "professional", level: 4 },
    { name: "Continuous Learning", category: "professional", level: 5 },
    { name: "Strategic Vision", category: "professional", level: 5 },
    { name: "LLMs", category: "ai", level: 5 },
    { name: "Frontier Models", category: "ai", level: 4 },
    { name: "Hosted Models", category: "ai", level: 5 },
    { name: "Langchain", category: "ai", level: 5 },
    { name: "Hugging Face", category: "ai", level: 4 },
    { name: "Ollama", category: "ai", level: 4 },
    { name: "Prompt Engineering", category: "ai", level: 5 },
    { name: "Embedding", category: "ai", level: 4 },
    { name: "Vector DBs", category: "ai", level: 4 },
  ],
  workExperience: [
    {
      role: "Lead Security DevOps Automation Engineer",
      company: "HSBC",
      companyInfo: companies["HSBC"],
      startDate: "July 2023",
      endDate: "Present",
      isCurrentRole: true,
      description:
        "My role here has been to lead the DevOps/DevSecOps focused Solution Design and delivery from end to end, building an entirely Automated Multi-Vendor Global WAF solution.",
      responsibilities: [
        "Technical Leader in a team of 8 DevOps Engineers and Developers",
        "Web Application Firewall SME – Akamai, Azure WAF, AWS WAF, GCP Cloud Armor, F5 AWAF",
        "Designed and built Enterprise scale GitHub Org and Repo level CI/CD pipelines leveraging Project Recognizers, Marker Files and Script Paths, isolated Jenkinsfiles, tightly controlled branch building strategies and Groovy scripting, incorporating Blue Ocean for pipeline visualization and integration with GitHub for SCM.",
        "Engineered complex Jira Automation rules using Smart Values and advanced conditions to trigger customized workflows, issue transitions, and notifications, screen/issue/workflow scheme design. Integrating Jira with Jenkins and GitHub for automatically creating repositories, executing deployment events utilising APIs for status reporting and audit trails.",
        "Authored Terraform modules for multi-cloud infrastructure orchestration, employing Terraform Cloud state-file management and modular design principles to foster reusable code across AWS, GCP, and Azure and Akamai.",
        "Built Ansible playbooks to deploy hosts configuration within cloud infrastructure.",
        "Scripted robust, idempotent automation scripts in Python and PowerShell to develop custom reports.",
        "Developed Power Automate Cloud and Desktop Flows for cross application business process automation",
        "Develop queries to pull resource configuration data from AWS (python boto3), Azure (Az, Azure PowerShell) and GCP (gcloud), Akamai API (Python), F5 AS3 and iControl to create bespoke reports from output as input into PowerBI.",
        "Created data driven reports in Power BI, using DAX expressions and Power Query to transform raw data into rich measures and metrics, with interactive visualization layers for end user dashboards, identifying non-compliant resources and revealing insights where CSPM products fall short, with detailed WAF information such as OWASP versions, Attack Rule Groups and Rules.",
        "Administer Cloud Compute Linux servers, including Bash scripting for task automation, Cron jobs for scheduled tasks",
        "Designed and Applied GitOps principles for infrastructure management, using GitHub for automated testing, and applying Git pre-receive hooks for enforcing commit and branch naming standards – Pull Request / Merge Approvals etc.",
        "Develop baseline WAF policies adherence to OWASP top 10. Define exceptions, custom rules process with approvals and audit in WAF Lifecycle Process.",
        "Developing and reviewing code changes PRs, Merges",
        "Secure Code Warrior in Python, Golang, Bash, Powershell, JavaScript",
        "Built a Golang Gin API from scratch which converts GET to POST request for automated e-mail approvals",
      ],
    },
    {
      role: "Cloud Security Engineer",
      company: "LSEG",
      companyInfo: companies["LSEG"],
      startDate: "June 2021",
      endDate: "June 2023",
      isCurrentRole: false,
      description:
        "My role here has been Cloud WAF Security focused across the 3 main CSP's – AWS, Azure and GCP.",
      responsibilities: [
        "WAF SME within London Stock Exchange Group",
        "Translate company security policies into code. Test and Tune accordingly. Advise App teams on deployment approaches – DEV > QA > PROD – and risks which may be associated.",
        "Developed a script that builds the WAF policy automatically and integrates this into Terraform IAC code using dynamic blocks which can be switched on/off by setting module arguments. This allows application teams to easily control WAF policies within Terraform.",
        "Developed a python script (boto3 AWS) and a PowerShell script that iterates concurrently over hundreds of AWS and Azure accounts to obtain WAF resource configuration parameters. Transformed output into comprehensive PowerBI status dashboards with complex DAX logic, which was critical for the £10m 'Defence In Depth' project assurance.",
        "Developed the conditional logic which checks that parameters are set and conform to the company security standards, marking them as compliant where the CSPM tool (Check Point CloudGuard) falls short.",
        "Develop WAF blueprints for Security Infrastructure As Code deployments – Terraform, CloudFormation Stacks and cross-account Stacksets, Azure ARM and Bicep transpilation.",
        "IAC pipeline development using GitLab, Azure DevOps and Jenkins.",
        "Integrate AWS security products with DataDog logging and analytics infrastructure, building custom queries and useful Dashboards",
        "Automate processes where possible using CI/CD – Git, Docker, GitLab, Azure DevOps and Jenkins, Power Automate for windows based processes.",
        "Research, Develop, Test and Document new and emerging technologies.",
        "Report and track progress (Jira). Document and detail work (Confluence).",
        "Identify significant Cloud Cost Savings.",
        "Mentor and assist others within the organisation.",
        "Provide support to the applications teams where necessary.",
      ],
    },
    {
      role: "Cyber Security Engineer – Cloud | SIEM | WAF",
      company: "British Red Cross",
      companyInfo: companies["British Red Cross"],
      startDate: "October 2020",
      endDate: "May 2021",
      isCurrentRole: false,
      description:
        "My role here has be multifaceted development across Web Application Firewalls, Cloud Infrastructure and Security Incident and Event Monitoring systems.",
      responsibilities: [
        "Perform technology assessment and deployment of chosen Could Based WAF provider – Akamai and Imperva",
        "Technically review the AWS donations platform for security posture according to PCI compliance – Last Access, Functions usage, Key Vault usage, Access Keys etc.",
        "Discover Web Attack threat plane across the infrastructure, finding back doors / deprecated services.",
        "Bulk Deploy WAF config for 120+ domains to Imperva via API.",
        "Plan and deploy Tenable.io vulnerability scanner to Azure and AWS environments",
        "Deploy Advanced Bot protection against Carding / Spammer Bots – CAPTCHA & JavaScript injection",
        "Configure AWS for auto-remediation of public writable S3 buckets (AWS Config)",
        "Programmatically deploy Amazon Users within Assigned Groups to use MFA (Python Boto SDK)",
        "Assess Azure Virtual Networks and NSG configuration policies for weaknesses and improvements.",
        "Integrate Azure Cloud Workloads into ELK SIEM platform",
        "Configure Azure Application Functions with Event Hub for Azure Monitor to Syslog Conversion",
        "Document OneLogin MFA solution and plan migration to Azure AD Federated Access (SAML / OAuth)",
        "Review CRM Application CI/CD Pipeline (Azure Devops) for security vulnerabilities",
        "Document Operational and Deployment Guidelines for transition to service handover.",
        "Define policies and procedures and develop business process with regards to WAF & SIEM Services.",
      ],
    },
    {
      role: "InfoSec Contractor / Security Engineer",
      company: "Willis Towers Watson",
      companyInfo: companies["Willis Towers Watson"],
      startDate: "November 2015",
      endDate: "January 2020",
      isCurrentRole: false,
      description:
        "My primary role here so far has been to design and deploy Intrusion Prevention Systems, Web Application Firewall technology, develop a Cloud Security strategy and to lead from an WAF perspective 6 x Global Datacentre Migrations.",
      responsibilities: [
        "Primary Technical Specialist for deployment of Check Point Intrusion Prevention Systems (IPS), F5 Application Security Manager (on-prem) and Imperva Incapsula (cloud-based) Web Application Firewall technology (WAF) across global datacentres – GTM | LTM | APM.",
        "Develop a technical strategy for minimal downtime of business services using a phased approach to IPS and WAF.",
        "Assess Cloud Technologies including Azure, AWS and Google Cloud with regards to the Firewall, IPS and WAF capabilities.",
        "Provide advice to the heads of Engineering and Architecture.",
        "Identify the scope of technical projects and create documentation for change and progress tracking.",
        "Develop the IPS / WAF / Cloud DC Migration strategy and communicate with Project Managers, Service Owners and other technical staff.",
        "Resolve any Level 3 support issues and follow up with vendor technologies where necessary.",
        "Understanding the threat plane and develop IPS and WAF Security Policies to address OWASP threats",
        "Application Security Pen-testing with IBM Appscan",
        "Vulnerability management and remediation with Nexpose Security Scanner",
        "Lab testing and tuning IPS effectiveness with regards to protections such as SQL Injection, Command Injection, XSS, LDAP Injection – working with vendors to fix true negatives and improve IPS and WAF detection intelligence.",
        "Developing SIEM (QRADAR) to improve threat management and intel by writing custom event and query properties using regex.",
        "Create extensive supporting documentation – Deployment, Engineering & Operational Guidelines.",
      ],
    },
    {
      role: "Senior Network and Security Engineer",
      company: "Holtzbrink Publishing Group",
      companyInfo: companies["Holtzbrink Publishing Group"],
      startDate: "August 2013",
      endDate: "September 2015",
      isCurrentRole: false,
      description:
        "My role here was to assist with engineering a Data Centre solution and integrating it into cloud services, designing the DC Network and Security specification and assist with various other technical support requirements which the Global Infrastructure requires.",
      responsibilities: [
        "Primary Architect and Engineer of the new Data Centre, Campus Infrastructure and cloud services.",
        "Design a Check Point firewall Dynamic Routing VPN backup solution",
        "Architect/Design and integrate Check Point IPS into existing company infrastructure",
        "Design and Integrate Security Solutions into AWS",
        "Compile HW Kit Costing requirements for core infrastructure",
        "Script large scale cisco infrastructure changes in Linux with expect",
        "Resolve complex ongoing issues",
        "Evaluate Technology by research, vendor solutions investigation and Lab Testing",
        "Design the Campus to Data Centre Network Solution, triangulated and fully resilient over multiple 10-BASE-LR entry points and inter-campus Laser Links.",
        "Create a QoS solution for the Global MPLS IP Telephony and Video applications.",
        "Document a site template for a 'cookie cutter solution' to be used around the globe.",
        "Develop a solution to migrate the Global Verizon MPLS WAN static routing infrastructure to OSPF / BGP",
        "Interface with Global Teams and Executive management regarding solution progression",
        "Incident Response to virus outbreaks and malware code – detect, contain, eradicate, recover",
        "Scan the network for anomalies and investigate suspicious findings",
        "Document extensively/comprehensively for ongoing support and understanding requirements.",
        "Manage the upgrade of all routing and switching devices to crypto level and integrate into AAA",
      ],
    },
    {
      role: "Network and Security Specialist",
      company: "Sainsbury's",
      companyInfo: companies["Sainsbury's"],
      startDate: "March 2013",
      endDate: "July 2013",
      isCurrentRole: false,
      description:
        "My role here was to assist with the migration of Sainsburys Online shopping application to new and improved infrastructure with updated technology.",
      responsibilities: [
        "Architect / Engineer physical (port capacity, routers, switches, LANs etc.) and logical (VLANs, routed network etc.) enterprise solutions involving IPS / Firewalls / SIEM devices",
        "Understand Industry compliance and best practice – PCI, ISO27001",
        "Make suggestions for Security improvements for adherence to regulatory requirements",
        "Supporting and manage an enterprise DMZ infrastructure comprising of: Cisco Nexus switches and routers, F5 load balancers (LTM & GTM) and ASM, Checkpoint firewall and IPS software, 3rd Party VPN configuration and Migration, Mcafee IPS, SPLUNK SIEM Administration",
        "Modify and Audit security policies",
        "Resolve and investigate RCA of 3rd line technical faults through SPLUNK analysis",
        "Update DNS and DHCP on Infoblox",
        "QoS configuration and Volume/Performance monitoring",
        "SNMP and SIEM configuration and testing",
        "Work with project managers to strict deadlines",
        "Convey Technical requirements to Non-Technical personnel",
      ],
    },
    {
      role: "Network and Security Engineer",
      company: "Deutsche Bank",
      companyInfo: companies["Deutsche Bank"],
      startDate: "July 2008",
      endDate: "August 2012",
      isCurrentRole: false,
      description:
        "My role at DB was to engineer security solutions for the business, which were located around their trading infrastructure security.",
      responsibilities: [
        "Assess, learn and understand emerging technologies applicable for business systems enhancement",
        "Support critical market data exchange connectivity",
        "Develop and improve upon existing architecture by reviewing standards",
        "Document and refresh all standards - Deployment / Operational / Test Guidelines",
        "Engineer solutions which adhere to best practice security methodologies.",
        "Test new hardware functionality – throughput and capacity capabilities.",
        "Support the Operations and Deployments teams with any Severity 1 problems",
        "Liaise and escalate with vendors account managers to ensure speedy conclusion to issues arising.",
        "Plan and coordinate Firewall Management Systems Upgrades (Check Point and Juniper NSM).",
        "Introduction of a second firewall vendor (JUNOS SRX) into the bank.",
        "Introduction of the JUNOS management infrastructure using Juniper Network Security Manager in HA and Security Threat Response Manager",
        "Introduction of the new Check Point Appliance devices 2070 / 5070 / 9070 into the bank.",
        "Introduction of OSPF and BGP and Multicast routing on the Check Point devices in the Bank.",
        "Relocating and rebuilding the entire Engineering lab consisting of a full range of Cisco / Juniper / Check Point / ESX hardware.",
        "Running new technology and systems through the full Network Management Systems certification process – SNMP / Syslog / Backups / Management etc.",
        "Evaluate JUNOS Space for NSM replacement",
        "Technology exposure includes Cisco IOS & NX-OS, JUNOS, Check Point, F5 GTM & LTM, Unix/Solaris/Linux, and VMWare.",
      ],
    },
    {
      role: "Technical Expert – Security Engineer",
      company: "UBS Investment Bank",
      companyInfo: companies["UBS Investment Bank"],
      startDate: "June 2007",
      endDate: "June 2008",
      isCurrentRole: false,
      description:
        "My role at UBS in the Problem management team is an escalation point for issues arising which cannot be resolved by incident management, and a resolution point for any recurring issues.",
      responsibilities: [
        "Support EMEA Trading System Applications with the following product set: Cisco Routers & Switches, Blue Coat Proxies & Director, BIGIP V4 & V9 GTM & LTM, Juniper Firewalls, UNIX based Tools & Monitoring Systems",
        "Recognised as the lead contact in UBS Globally regarding the F5 product suite.",
        "Interface with Business Managers and Trade Application owners",
        "Reviewing Standards, Baselines, Polices and making suggestions for improvement.",
        "Managing and reporting on Critical Business Problems arising from outages",
        "Identifying causes of ongoing or recurring problems and developing solutions to remedy them.",
        "Working with Capacity Management to ensure systems can provide service during peak volumes.",
        "Liaising with Product Management, Engineering and Design on issues arising possible solutions",
        "Ensuring conformance with the Banks security practices and identifying areas of Risk",
        "Assess changes raised for strict adherence to change control policies.",
        "Manage large scale application changes and implementations relating to projects.",
        "Facilitating communication between separate responsibilities in projects (Unix, Wintel etc)",
        "Reporting achievements and successes on a weekly basis.",
      ],
    },
    {
      role: "Senior Security Consultant",
      company: "Nebulas Security",
      companyInfo: companies["Nebulas Security"],
      startDate: "June 2005",
      endDate: "June 2007",
      isCurrentRole: false,
      description:
        "My core duties at Nebulas Security were primarily Technical Consultancy, Pre-sales, Design, Implementation and when necessary 3rd line support.",
      responsibilities: [
        "Perimeter Security - Checkpoint V4.1 through to NGX on all platforms (crossbeam, nokia, splat, windows), Cisco Pix, Juniper Netscreen and VPN Concentrators.",
        "Penetration Testing – White Hat / Ethical Pen testing with industry tools such as Nesus, NMAPFE, Backtrack",
        "Secure Access Control technologies – (SSL / IPSec VPNs / Authentication) - F5 Firepass SSL VPN, Juniper Secure Access, CP-Connectra, CP-SecureClient & CiscoVPN.",
        "Active Directory - integration for authentication and authorisation on all products.",
        "Host Security - Centralised management of 'Desktop Firewalls' and application control using Checkpoint Integrity",
        "Content Security - Application Optimization, High Availability and Traffic Management – F5 Big-IP Local Traffic Manager (Hardware LB) and Global Traffic Manager (DNS LB).",
        "Application enhancement - Caching, Compression, SSL offload and HTTP header re-writing.",
        "Intrusion Prevention–Toplayer IPS attack mitigation (version 4), Juniper Netscreen ISG 1000/2000 IPS Blade, SNORT",
        "Security Configuration Management - Patch Management, Asset Discovery, Inventory Tracking and Vulnerability Management BigFix Enterprise Server",
        "Encryption - E-mail, Disk, IM and file sharing encryption using PGP Desktop, PGP Universal and PGP NetShare products.",
        "Risk Analysis - Applying a risk approach to working methods & mitigating risk as best possible through technical controls or recommendation of procedural controls.",
        "Network – Good experience in Cisco routing and switching environment. Good understanding of most industry standard TCP based protocols.",
        "Message and Web Filtering - Implementing IronPort as a consolidation device control for E-mail and Web reputation filtering for throttling e-mail, defeating SPAM, Viruses and Phishing.",
        "Web Application Security – Fundamental understanding of HTTP, HTML, XML, AJAX, SQL and the risks they entail such as Cross-site-Scripting, Input validation and SQL Injection.",
        "Data loss prevention - Implemented VONTU software for regulatory compliance.",
        "Concepts & Compliance – Aware of regulations such as SOX, HIPAA & PCI and concepts such as SOA and Web2.0",
      ],
    },
    {
      role: "IP Security Engineer",
      company: "Easynet",
      companyInfo: companies["Easynet"],
      startDate: "January 2004",
      endDate: "June 2005",
      isCurrentRole: false,
      description:
        "The core functions of my duties at Easynet consisted of mainly network design from a security perspective, consultancy and 3rd line support.",
      responsibilities: [],
    },
    {
      role: "Security Engineer",
      company: "Integralis",
      companyInfo: companies["Integralis"],
      startDate: "May 2003",
      endDate: "January 2004",
      isCurrentRole: false,
      description:
        "The core function of my duties here were consultancy and support.",
      responsibilities: [],
    },
    {
      role: "IT Security Specialist",
      company: "Telkom",
      companyInfo: companies["Telkom"],
      startDate: "February 2000",
      endDate: "April 2003",
      isCurrentRole: false,
      description:
        "My main function at Telkom was project design, RFP technical input, network implementation from a security perspective, support and consultancy.",
      responsibilities: [],
    },
    {
      role: "Support Consultant",
      company: "Dimension Data",
      companyInfo: companies["Dimension Data"],
      startDate: "March 1999",
      endDate: "February 2000",
      isCurrentRole: false,
      description:
        "I was on the Internet Solutions helpdesk supporting the different services that they offered.",
      responsibilities: [],
    },
    {
      role: "Junior Technician",
      company: "Chubb",
      companyInfo: companies["Chubb"],
      startDate: "August 1998",
      endDate: "March 1999",
      isCurrentRole: false,
      description:
        "They needed me mainly to test for Y2K compliance and upgrade their legacy LAN equipment.",
      responsibilities: [],
    },
  ],
  interests: ["Technology", "Scuba diving", "Arts", "Literature"],
};

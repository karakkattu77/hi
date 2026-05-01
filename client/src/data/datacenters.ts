export interface DatacenterAction {
  id: string;
  type: "email" | "call" | "petition" | "social" | "comment";
  title: string;
  description: string;
  target: string;
  url: string;
}

export interface DatacenterProject {
  id: string;
  name: string;
  company: string;
  location: string;
  state: string;
  lat: number;
  lng: number;
  status: "proposed" | "approved" | "under-construction" | "operational";
  power_mw: number;
  water_gallons_per_day: number;
  energy_source: string;
  description: string;
  concerns: string[];
  actions: DatacenterAction[];
}

export interface NationwideAction {
  id: string;
  category: "federal" | "banks" | "bigtech";
  type: DatacenterAction["type"];
  title: string;
  description: string;
  target: string;
  url: string;
}

export type NationwideCategory = "federal" | "banks" | "bigtech";

export const STATS = [
  { label: "of U.S. electricity now consumed by data centers", value: "3.5%" },
  { label: "year AI data centers could consume 10% of U.S. power", value: "2030" },
  { label: "gallons of water AI will consume daily by 2027", value: "6.6B" },
  { label: "in ratepayer-funded grid upgrades Big Tech isn't paying for", value: "$50B" },
  { label: "acres of farmland at risk of data center conversion", value: "1M+" },
  { label: "of AI data center power still comes from fossil fuels", value: "40%" },
];

export const NATIONWIDE_CATEGORIES: { id: NationwideCategory; label: string; description: string }[] = [
  { 
    id: "federal", 
    label: "Federal Oversight", 
    description: "The EPA and DOE must establish national energy and water standards for data centers. Currently, Big Tech avoids oversight by negotiating state-by-state." 
  },
  { 
    id: "banks", 
    label: "Stop Financing", 
    description: "Major banks are providing the capital for these fossil-fueled projects while making public net-zero pledges. Hold them accountable." 
  },
  { 
    id: "bigtech", 
    label: "Direct Pressure", 
    description: "Google, Microsoft, and Amazon are the primary tenants of these harmful facilities. Demand they stop expanding until they can prove zero impact." 
  },
];

export const NATIONWIDE_ACTIONS: NationwideAction[] = [
  {
    id: "epa-letter",
    category: "federal",
    type: "email",
    title: "Petition FERC",
    description: "Challenge Federal Agencies on Permitting Acceleration",
    target: "Federal Energy Regulatory Commission",
    url: "https://app.chilli.club/actions/c0e3d3b0-5cfe-4cf3-b147-c23124bc636a"
  },
  {
    id: "chase-petition",
    category: "banks",
    type: "email",
    title: "Call Out Goldman Sachs",
    description: "Stop Lending to Big Data & Attach Hard Environmental & Community Conditions to Lending",
    target: "Sustainability at Goldman Sachs",
    url: "https://app.chilli.club/actions/eeadb07c-301a-4d5f-8131-9010eda998dc?utm_source=karakkattoo&utm_medium=copy&utm_campaign=action-eeadb07c-301a-4d5f-8131-9010eda998dc"
  },
  {
    id: "msft-social",
    category: "bigtech",
    type: "email",
    title: "Call Out Model Providers for Water",
    description: "Demand Water Transparency from Hyperscale Cloud Operators",
    target: "Model Providers",
    url: "https://app.chilli.club/actions/a6118135-ac20-4d59-9fef-9266b93c181c"
  },
];

export const DATACENTERS: DatacenterProject[] = [
  {
    id: "mt-pleasant",
    name: "Microsoft Mt. Pleasant Data Center",
    company: "Microsoft",
    location: "Mt. Pleasant, Wisconsin",
    state: "Wisconsin",
    lat: 42.6975,
    lng: -87.8920,
    status: "approved",
    power_mw: 500,
    water_gallons_per_day: 1200000,
    energy_source: "Gas-fired backup / Grid",
    description: "Microsoft's expansion into the former Foxconn site threatens local water tables and relies on fossil-fuel heavy grid power.",
    concerns: [
      "Water depletion in local aquifers",
      "Increased electricity costs for residents",
      "Lack of community benefits agreement"
    ],
    actions: [
      {
        id: "wi-petition",
        type: "petition",
        title: "Stop the Expansion",
        description: "Sign the petition to demand Microsoft proves its water neutral claims before construction continues.",
        target: "Mt. Pleasant Village Board",
        url: "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f"
      }
    ]
  },
  {
    id: "abilene",
    name: "Lancaster Data Center",
    company: "Lancaster / Amazon",
    location: "Abilene, Texas",
    state: "Texas",
    lat: 32.4487,
    lng: -99.7331,
    status: "proposed",
    power_mw: 200,
    water_gallons_per_day: 800000,
    energy_source: "ERCOT Grid (Gas/Wind)",
    description: "Proposed project in a drought-prone region with significant concerns about grid stability during winter storms.",
    concerns: [
      "Grid reliability during peak demand",
      "Drought impact on community water",
      "Noise pollution from cooling towers"
    ],
    actions: [
      {
        id: "tx-call",
        type: "call",
        title: "Protect Our Grid",
        description: "Call your state representative to demand a moratorium on large-scale data center permits during drought.",
        target: "Texas State Legislature",
        url: "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f"
      }
    ]
  },
  {
    id: "berks",
    name: "Reading Data Hub",
    company: "Various",
    location: "Berks County, Pennsylvania",
    state: "Pennsylvania",
    lat: 40.4173,
    lng: -75.9269,
    status: "proposed",
    power_mw: 300,
    water_gallons_per_day: 950000,
    energy_source: "PJM Grid",
    description: "Large scale development on former agricultural land raising significant land-use and environmental concerns.",
    concerns: [
      "Loss of prime agricultural land",
      "Stormwater runoff issues",
      "Heat island effect"
    ],
    actions: [
      {
        id: "pa-email",
        type: "email",
        title: "Email the Zoning Board",
        description: "Urge the board to deny the variance request for industrial use on agricultural land.",
        target: "Berks County Planning Commission",
        url: "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f"
      }
    ]
  },
  {
    id: "dekalb",
    name: "Project Hammer",
    company: "Meta",
    location: "DeKalb, Illinois",
    state: "Illinois",
    lat: 41.9303,
    lng: -88.7504,
    status: "under-construction",
    power_mw: 400,
    water_gallons_per_day: 1100000,
    energy_source: "Nuclear / Fossil Backup",
    description: "Massive Meta data center project that received significant taxpayer subsidies while providing few long-term jobs.",
    concerns: [
      "Unfair tax breaks / subsidies",
      "Low permanent job creation",
      "Impact on local utility rates"
    ],
    actions: [
      {
        id: "il-comment",
        type: "comment",
        title: "Submit Public Comment",
        description: "Demand transparency on the true public cost of the subsidies granted to Meta.",
        target: "Illinois Department of Revenue",
        url: "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f"
      }
    ]
  },
  {
    id: "lowndes",
    name: "Valdosta AI Campus",
    company: "CloudHQ",
    location: "Lowndes County, Georgia",
    state: "Georgia",
    lat: 30.8327,
    lng: -83.2785,
    status: "proposed",
    power_mw: 250,
    water_gallons_per_day: 750000,
    energy_source: "Southern Co. Grid",
    description: "New project proposal targeting the Southeast, raising concerns about rapid industrialization of rural areas.",
    concerns: [
      "Rural displacement",
      "Light pollution",
      "Ecological impact on wetlands"
    ],
    actions: [
      {
        id: "ga-petition",
        type: "petition",
        title: "Sign the Protection Petition",
        description: "Join local residents in demanding an environmental impact study before any permits are issued.",
        target: "Lowndes County Commissioners",
        url: "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f"
      }
    ]
  },
  {
    id: "hermiston",
    name: "Amazon Eastern Oregon Campus",
    company: "Amazon",
    location: "Hermiston, Oregon",
    state: "Oregon",
    lat: 45.8404,
    lng: -119.2895,
    status: "operational",
    power_mw: 600,
    water_gallons_per_day: 1500000,
    energy_source: "Hydro / Natural Gas",
    description: "Existing Amazon footprint is expanding, putting immense pressure on the Columbia River basin water resources.",
    concerns: [
      "Columbia River water usage",
      "Transparency on energy mix",
      "Local grid congestion"
    ],
    actions: [
      {
        id: "or-email",
        type: "email",
        title: "Email the Governor",
        description: "Demand stricter water recycling requirements for data centers in the high desert regions.",
        target: "Governor of Oregon",
        url: "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f"
      }
    ]
  },
  {
    id: "memphis",
    name: "xAI Memphis Supercomputer",
    company: "xAI / Elon Musk",
    location: "Memphis, Tennessee",
    state: "Tennessee",
    lat: 35.1495,
    lng: -90.0490,
    status: "operational",
    power_mw: 150,
    water_gallons_per_day: 1000000,
    energy_source: "TVA Grid (Fossil Heavy)",
    description: "Elon Musk's xAI project was fast-tracked with minimal environmental review, raising massive community concerns about air and water.",
    concerns: [
      "Air pollution from diesel generators",
      "Draining of the Memphis Aquifer",
      "Fast-tracking without public input"
    ],
    actions: [
      {
        id: "tn-petition",
        type: "petition",
        title: "Protect Memphis Water",
        description: "Demand xAI installs on-site water recycling and ceases use of the pristine Memphis Aquifer.",
        target: "Memphis City Council",
        url: "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f"
      }
    ]
  },
  {
    id: "loudoun",
    name: "Data Center Alley Expansion",
    company: "Digital Realty / Various",
    location: "Loudoun County, Virginia",
    state: "Virginia",
    lat: 39.0438,
    lng: -77.4875,
    status: "operational",
    power_mw: 2000,
    water_gallons_per_day: 5000000,
    energy_source: "Dominion Energy (Coal/Gas)",
    description: "The largest concentration of data centers in the world is continuing to expand, causing massive new power lines and rate hikes.",
    concerns: [
      "Skyrocketing residential utility bills",
      "Massive new transmission lines through neighborhoods",
      "Excessive noise in residential zones"
    ],
    actions: [
      {
        id: "va-call",
        type: "call",
        title: "Call for Rate Protection",
        description: "Urge your state senator to support bills that prevent data center companies from shifting grid costs to residents.",
        target: "Virginia State Senate",
        url: "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f"
      }
    ]
  },
  {
    id: "mesa",
    name: "Mesa Digital Campus",
    company: "Google / Meta",
    location: "Mesa, Arizona",
    state: "Arizona",
    lat: 33.4151,
    lng: -111.8315,
    status: "under-construction",
    power_mw: 350,
    water_gallons_per_day: 1300000,
    energy_source: "SRP Grid",
    description: "Massive data center cluster in the desert, using millions of gallons of water during an ongoing water crisis.",
    concerns: [
      "Water scarcity in the Colorado River",
      "Extreme heat generation",
      "Unprecedented power demand"
    ],
    actions: [
      {
        id: "az-petition",
        type: "email",
        title: "Email Governor Katie Hobbs",
        description: "Protect Arizona Water from Big Tech",
        target: "Arizona Governor",
        url: "https://app.chilli.club/actions/c95ae9ea-9963-4d94-99b1-9928a4a5e14a"
      }
    ]
  },
  {
    id: "douglas",
    name: "Front Range Hub",
    company: "Google",
    location: "Douglas County, Colorado",
    state: "Colorado",
    lat: 39.3611,
    lng: -104.8519,
    status: "proposed",
    power_mw: 180,
    water_gallons_per_day: 600000,
    energy_source: "Xcel Energy",
    description: "New proposal near residential areas raising concerns about local infrastructure and quality of life.",
    concerns: [
      "Neighborhood noise",
      "Infrastructure strain",
      "Property value impact"
    ],
    actions: [
      {
        id: "co-email",
        type: "email",
        title: "Email the Douglas County Board",
        description: "Join neighbors in asking the board to require a comprehensive noise impact study.",
        target: "Douglas County Commissioners",
        url: "https://app.chilli.club/causes/3c29d439-dcc8-4f00-ac9f-5dbac975836f"
      }
    ]
  }
];

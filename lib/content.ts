/**
 * Pre-seeded learning passages so the app works without an API key.
 * Each passage has comprehension + recall questions.
 * The app picks one at random, avoiding repeats from recent sessions.
 */

import type { GeneratedContent } from "./types";

const PASSAGES: GeneratedContent[] = [
  {
    passage: {
      title: "How Consensus Algorithms Keep Distributed Systems in Sync",
      content: `When you send a message on WhatsApp or save a file to Google Drive, that data doesn't live on just one computer. It's replicated across multiple servers in different locations. But how do those servers agree on the "true" state of your data when network delays, crashes, and failures are inevitable?

This is the consensus problem — one of the hardest challenges in distributed computing. A consensus algorithm is a protocol that allows multiple machines to agree on a single value, even when some machines fail or messages get lost.

The most famous consensus algorithm is Paxos, proposed by Leslie Lamport in 1989. Imagine a group of politicians trying to pass a law by mail. A "proposer" sends a proposed law to all "acceptors." If a majority of acceptors agree, the law passes. The key insight is that you only need a majority, not unanimity — so the system keeps working even if some participants are unreachable.

Paxos works but is notoriously hard to understand and implement. In 2014, Diego Ongaro created Raft as a more understandable alternative. Raft breaks the problem into three sub-problems: leader election (who's in charge?), log replication (how do we copy data?), and safety (how do we prevent conflicts?). At any time, one server is the "leader" and all changes flow through it, making the system easier to reason about.

The trade-off is fundamental: stronger consistency guarantees mean slower performance. The CAP theorem, proven by Eric Brewer, states that a distributed system can provide at most two of three properties: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition tolerance (the system works despite network failures). Since network partitions are unavoidable in practice, you must choose between consistency and availability.`,
      domain: "tech",
      wordCount: 280,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "Why does Paxos only require a majority of acceptors rather than all of them?",
        options: [
          "To reduce the computational cost of the algorithm",
          "So the system continues working even if some participants are unreachable",
          "Because unanimity would make the algorithm too slow",
          "To prevent any single acceptor from having veto power",
        ],
        correctIndex: 1,
        explanation: "Requiring only a majority means the system tolerates failures — if some nodes crash or become unreachable, the remaining majority can still reach consensus and keep the system operational.",
      },
      {
        id: "c2",
        text: "What is the main advantage of Raft over Paxos?",
        options: [
          "Raft provides stronger consistency guarantees",
          "Raft is faster in production environments",
          "Raft is easier to understand and implement",
          "Raft doesn't require a leader node",
        ],
        correctIndex: 2,
        explanation: "Raft was explicitly designed as a more understandable alternative to Paxos. It achieves similar guarantees but breaks the problem into clearer sub-problems (leader election, log replication, safety), making it easier for engineers to implement correctly.",
      },
      {
        id: "c3",
        text: "According to the CAP theorem, if you must tolerate network partitions, what trade-off do you face?",
        options: [
          "Speed vs. storage capacity",
          "Consistency vs. availability",
          "Security vs. performance",
          "Latency vs. throughput",
        ],
        correctIndex: 1,
        explanation: "The CAP theorem states you can only guarantee two of three properties: Consistency, Availability, and Partition tolerance. Since network partitions are unavoidable in practice, the real choice is between consistency and availability.",
      },
      {
        id: "c4",
        text: "If a distributed system using Raft loses its leader node, what happens next?",
        options: [
          "The system stops accepting writes until the leader recovers",
          "A new leader is elected through Raft's leader election process",
          "All nodes become leaders temporarily",
          "The system switches to Paxos as a fallback",
        ],
        correctIndex: 1,
        explanation: "Leader election is one of Raft's three core sub-problems. When the current leader fails, the remaining nodes detect the absence of heartbeats and elect a new leader, allowing the system to resume operation.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "Who created the Raft consensus algorithm, and in what year?",
        options: [
          "Leslie Lamport in 1989",
          "Eric Brewer in 2000",
          "Diego Ongaro in 2014",
          "Barbara Liskov in 2007",
        ],
        correctIndex: 2,
        explanation: "Diego Ongaro created Raft in 2014 specifically to address the difficulty of understanding and implementing Paxos, which Leslie Lamport had proposed much earlier in 1989.",
      },
      {
        id: "r2",
        text: "What are the three sub-problems that Raft breaks consensus into?",
        options: [
          "Voting, replication, and failover",
          "Leader election, log replication, and safety",
          "Proposal, acceptance, and commitment",
          "Discovery, negotiation, and synchronization",
        ],
        correctIndex: 1,
        explanation: "Raft decomposes consensus into leader election (choosing who's in charge), log replication (copying data across nodes), and safety (preventing conflicts). This decomposition is what makes Raft easier to understand than Paxos.",
      },
      {
        id: "r3",
        text: "What are the three properties in the CAP theorem?",
        options: [
          "Correctness, Atomicity, Performance",
          "Consensus, Agreement, Partitioning",
          "Consistency, Availability, Partition tolerance",
          "Concurrency, Accuracy, Persistence",
        ],
        correctIndex: 2,
        explanation: "Eric Brewer's CAP theorem defines the three fundamental properties: Consistency (all nodes see the same data), Availability (every request gets a response), and Partition tolerance (the system survives network failures).",
      },
    ],
  },
  {
    passage: {
      title: "The Invisible Hand of Pricing: How Surge Pricing Actually Works",
      content: `When you open Uber during a rainstorm and see a 2.5x surge multiplier, your instinct might be that the company is gouging you. But surge pricing is one of the most elegant examples of real-time market design in the modern economy.

The core mechanism is simple: when demand for rides exceeds the supply of available drivers in an area, the price increases. This does two things simultaneously. First, it discourages marginal demand — people who could wait, take the bus, or walk decide the ride isn't worth the premium. Second, and more importantly, it pulls supply into the market. Drivers who weren't planning to work see the surge and go online. Drivers in nearby areas reposition toward the surge zone.

This is dynamic pricing — adjusting prices in real time based on supply and demand signals. Airlines have done this for decades (that's why the same seat costs different amounts depending on when you book), but Uber compressed the feedback loop from weeks to minutes.

The economics behind this rely on price elasticity. Demand elasticity measures how sensitive buyers are to price changes. If a 10% price increase causes a 20% drop in demand, demand is "elastic." For ride-sharing during emergencies, demand tends to be inelastic — people will pay the surge because they need the ride. This is where the ethical tension lives.

The alternative to surge pricing is a queue. When prices can't adjust, you get shortages — everyone wants a ride, no one can get one. Soviet-era bread lines were the extreme version of this: fixed prices with variable demand meant standing in line for hours. Surge pricing eliminates the queue by letting price do the rationing instead of time.

Companies like Uber have softened surge by adding caps, advance warnings, and fare estimates. But the fundamental mechanism — letting price balance supply and demand in real time — remains one of the most powerful ideas in market design.`,
      domain: "business",
      wordCount: 300,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What are the two simultaneous effects of surge pricing?",
        options: [
          "It increases company profit and reduces driver costs",
          "It discourages marginal demand and pulls more supply into the market",
          "It improves app performance and reduces customer complaints",
          "It raises wages for drivers and lowers prices for loyal customers",
        ],
        correctIndex: 1,
        explanation: "Surge pricing works on both sides of the market: higher prices cause people with flexible needs to defer their ride (reducing demand), while simultaneously incentivizing more drivers to go online and reposition toward the surge zone (increasing supply).",
      },
      {
        id: "c2",
        text: "Why is ride-sharing demand during emergencies described as 'inelastic'?",
        options: [
          "Because the supply of drivers decreases during emergencies",
          "Because people don't check prices during emergencies",
          "Because people will pay higher prices since they need the ride regardless",
          "Because surge pricing doesn't apply during emergencies",
        ],
        correctIndex: 2,
        explanation: "Inelastic demand means price changes don't significantly reduce the quantity demanded. During emergencies, people need rides urgently and will pay the premium regardless, so demand barely drops even when prices spike.",
      },
      {
        id: "c3",
        text: "What happens when prices CAN'T adjust to match demand?",
        options: [
          "The market becomes more efficient",
          "Companies make higher profits",
          "Shortages and queues form — rationing by time instead of price",
          "Supply automatically increases to meet demand",
        ],
        correctIndex: 2,
        explanation: "When prices are fixed but demand exceeds supply, the market can't clear through price. Instead, rationing happens through waiting — queues and shortages form, as illustrated by the Soviet-era bread lines example.",
      },
      {
        id: "c4",
        text: "How does Uber's pricing feedback loop differ from airline pricing?",
        options: [
          "Uber uses AI while airlines use manual pricing",
          "Uber adjusts in minutes while airlines adjust over weeks",
          "Uber prices are regulated while airline prices are not",
          "Uber prices only go up while airline prices go both ways",
        ],
        correctIndex: 1,
        explanation: "Both Uber and airlines use dynamic pricing based on supply and demand, but Uber compressed the feedback loop from weeks (airlines adjust prices over booking windows) to minutes (real-time response to local conditions).",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What historical example was used to illustrate the consequences of fixed pricing with variable demand?",
        options: [
          "The US housing crisis of 2008",
          "Soviet-era bread lines",
          "The Dutch tulip mania",
          "The oil embargo of 1973",
        ],
        correctIndex: 1,
        explanation: "The passage used Soviet-era bread lines as an extreme example of what happens when prices are fixed: variable demand with no price adjustment led to chronic shortages and hours-long queues.",
      },
      {
        id: "r2",
        text: "What does 'price elasticity of demand' measure?",
        options: [
          "How quickly prices change in a market",
          "How sensitive buyers are to price changes",
          "The maximum price consumers will pay",
          "The relationship between price and quality",
        ],
        correctIndex: 1,
        explanation: "Price elasticity of demand quantifies buyer sensitivity: if a 10% price increase causes a 20% drop in demand, demand is elastic. If demand barely changes, it's inelastic.",
      },
      {
        id: "r3",
        text: "What three mechanisms has Uber added to soften the impact of surge pricing?",
        options: [
          "Discounts, loyalty points, and free rides",
          "Caps, advance warnings, and fare estimates",
          "Insurance, refunds, and price matching",
          "Tipping, rating systems, and flat fares",
        ],
        correctIndex: 1,
        explanation: "Uber softened surge pricing by adding price caps (limiting how high surges can go), advance warnings (so riders aren't surprised), and fare estimates (so riders know the cost before committing).",
      },
    ],
  },
  {
    passage: {
      title: "Why Your Cells Self-Destruct: The Science of Apoptosis",
      content: `Every day, between 50 and 70 billion of your cells commit suicide. This isn't a malfunction — it's one of the most important processes keeping you alive. It's called apoptosis, from the Greek word for "falling off," like leaves from a tree.

Apoptosis is programmed cell death: a controlled, orderly process where a cell dismantles itself from the inside. Unlike necrosis (traumatic cell death from injury), apoptosis is clean. The cell shrinks, its DNA is neatly cut into fragments, and it packages itself into small membrane-wrapped pieces called "apoptotic bodies" that neighboring cells quickly consume. No inflammation, no mess.

Why would an organism evolve to kill its own cells? Several reasons. During development, apoptosis sculpts your body — your fingers exist because the cells between them died. Your immune system uses apoptosis to eliminate T-cells that would attack your own tissues (this is how autoimmune diseases are prevented). And critically, cells that accumulate DNA damage are supposed to trigger apoptosis to prevent themselves from becoming cancerous.

The molecular machinery is elegant. The key players are a family of enzymes called caspases — "molecular scissors" that cut specific proteins to disassemble the cell. There are two main activation pathways. The intrinsic pathway responds to internal stress signals: DNA damage, oxidative stress, or lack of survival signals from neighboring cells. The extrinsic pathway responds to external "death signals" from other cells — like immune cells telling an infected cell to self-destruct.

Both pathways converge on the same executioner caspases, which do the actual demolition work. Think of it like two different fuses leading to the same detonator.

Cancer is, in many ways, a disease of failed apoptosis. Tumor cells evolve mutations that disable their self-destruct mechanisms, allowing them to grow unchecked. One of the most commonly mutated genes in cancer, p53 (mutated in over 50% of human cancers), is a key trigger for apoptosis in damaged cells. When p53 breaks, cells that should die instead survive and proliferate.`,
      domain: "science",
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What is the key difference between apoptosis and necrosis?",
        options: [
          "Apoptosis is faster than necrosis",
          "Apoptosis is controlled and clean; necrosis is traumatic and causes inflammation",
          "Apoptosis only happens in immune cells; necrosis happens everywhere",
          "Apoptosis requires oxygen; necrosis does not",
        ],
        correctIndex: 1,
        explanation: "Apoptosis is a controlled, orderly self-dismantling — the cell shrinks, packages itself into apoptotic bodies, and gets consumed without inflammation. Necrosis is chaotic cell death from injury that triggers an inflammatory response.",
      },
      {
        id: "c2",
        text: "How does apoptosis relate to cancer?",
        options: [
          "Cancer cells use apoptosis to kill healthy cells",
          "Chemotherapy works by speeding up apoptosis in all cells",
          "Cancer cells evolve mutations that disable their self-destruct mechanisms",
          "Apoptosis causes the DNA mutations that lead to cancer",
        ],
        correctIndex: 2,
        explanation: "Cancer cells survive because they disable their self-destruct mechanisms. Mutations in genes like p53 prevent damaged cells from triggering apoptosis, allowing unchecked growth.",
      },
      {
        id: "c3",
        text: "Why does the passage describe caspases as 'molecular scissors'?",
        options: [
          "They physically cut cells in half during division",
          "They cut specific proteins to disassemble the cell from the inside",
          "They trim excess DNA during cell replication",
          "They separate chromosomes during mitosis",
        ],
        correctIndex: 1,
        explanation: "Caspases are enzymes that cut specific proteins inside the cell to systematically disassemble it — like scissors cutting a structure apart piece by piece, which is why the passage calls them 'molecular scissors'.",
      },
      {
        id: "c4",
        text: "What would likely happen if the intrinsic apoptosis pathway failed in a cell with DNA damage?",
        options: [
          "The cell would immediately die through necrosis",
          "The extrinsic pathway would always compensate",
          "The damaged cell could survive and potentially become cancerous",
          "The cell would repair its own DNA without any issues",
        ],
        correctIndex: 2,
        explanation: "The intrinsic pathway is the cell's main defense against DNA damage. Without it, a damaged cell survives and continues dividing — accumulating more mutations and potentially becoming cancerous.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "Approximately how many cells undergo apoptosis in your body each day?",
        options: [
          "1 to 5 million",
          "50 to 70 billion",
          "500 million to 1 billion",
          "10 to 20 trillion",
        ],
        correctIndex: 1,
        explanation: "The passage states that between 50 and 70 billion cells undergo apoptosis daily — a staggering number that shows how fundamental programmed cell death is to normal body maintenance.",
      },
      {
        id: "r2",
        text: "What is the name of the gene mutated in over 50% of human cancers that normally triggers apoptosis?",
        options: ["BRCA1", "p53", "RAS", "BCL-2"],
        correctIndex: 1,
        explanation: "p53 is described as a key trigger for apoptosis in damaged cells. When p53 is mutated, cells that should self-destruct instead survive and proliferate, which is why it's found mutated in over half of human cancers.",
      },
      {
        id: "r3",
        text: "What are the small membrane-wrapped pieces that a cell packages itself into during apoptosis?",
        options: [
          "Lysosomes",
          "Vesicles",
          "Apoptotic bodies",
          "Exosomes",
        ],
        correctIndex: 2,
        explanation: "During apoptosis, the cell neatly packages itself into membrane-wrapped fragments called apoptotic bodies, which neighboring cells quickly consume — keeping the process clean with no inflammation.",
      },
    ],
  },
  {
    passage: {
      title: "How CRISPR Edits Genes: A Molecular Cut-and-Paste",
      content: `In 2012, Jennifer Doudna and Emmanuelle Charpentier published a paper that would earn them the Nobel Prize and fundamentally change biology. They showed how a bacterial immune system could be repurposed into a precise gene-editing tool: CRISPR-Cas9.

The acronym stands for Clustered Regularly Interspaced Short Palindromic Repeats — sequences in bacterial DNA that store "mugshots" of viruses. When a virus attacks, the bacterium matches the invader's DNA against its stored library. If it finds a match, it deploys the Cas9 protein — a molecular pair of scissors — to cut the viral DNA and neutralize the threat.

Doudna and Charpentier realized they could program this system to cut any DNA sequence they wanted. The key is the guide RNA — a short piece of RNA that you design to match your target gene. The guide RNA leads Cas9 to the exact spot in the genome, and Cas9 makes a precise cut in both strands of the DNA double helix.

Once the DNA is cut, the cell's natural repair machinery kicks in. There are two main outcomes. If the cell uses its error-prone repair pathway (NHEJ — Non-Homologous End Joining), it often introduces small errors that disable the gene. This is useful for "knocking out" harmful genes. Alternatively, if you provide a DNA template alongside the cut, the cell can use its precise repair pathway (HDR — Homology-Directed Repair) to insert new genetic material. This is how you can correct a mutation or add a new gene entirely.

The implications are vast. Sickle cell disease, caused by a single mutation in the hemoglobin gene, has already been treated with CRISPR in clinical trials. Agricultural scientists are creating drought-resistant crops. But the technology also raises profound ethical questions — particularly around editing human embryos, where changes would be inherited by future generations.`,
      domain: "science",
      wordCount: 290,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What is the natural biological function of CRISPR in bacteria?",
        options: [
          "Regulating gene expression during growth",
          "An immune system that stores viral DNA and cuts matching invaders",
          "A mechanism for horizontal gene transfer between bacteria",
          "A system for repairing DNA damage from radiation",
        ],
        correctIndex: 1,
        explanation: "CRISPR evolved as a bacterial immune system: bacteria store 'mugshots' of viral DNA, and when the same virus attacks again, they match and cut the invader's DNA using the Cas9 protein.",
      },
      {
        id: "c2",
        text: "What determines WHERE in the genome Cas9 makes its cut?",
        options: [
          "The Cas9 protein recognizes specific DNA sequences on its own",
          "The guide RNA is designed to match the target gene and leads Cas9 there",
          "Scientists use electric fields to direct Cas9 to the right location",
          "Cas9 randomly cuts DNA and scientists select the correct result",
        ],
        correctIndex: 1,
        explanation: "The guide RNA is the programmable component — scientists design it to match a specific DNA sequence, and it physically leads the Cas9 protein to that exact location in the genome.",
      },
      {
        id: "c3",
        text: "What is the difference between NHEJ and HDR repair after a CRISPR cut?",
        options: [
          "NHEJ is faster but introduces errors (disabling genes); HDR uses a template for precise edits",
          "NHEJ works in all cells; HDR only works in stem cells",
          "NHEJ repairs both strands; HDR only repairs one strand",
          "NHEJ is the natural process; HDR is artificially induced by CRISPR",
        ],
        correctIndex: 0,
        explanation: "NHEJ (Non-Homologous End Joining) is error-prone and often disables the gene — useful for knockouts. HDR (Homology-Directed Repair) uses a provided DNA template to make precise edits or insertions.",
      },
      {
        id: "c4",
        text: "Why does editing human embryos raise unique ethical concerns compared to other CRISPR applications?",
        options: [
          "Because embryos are too small for the technology to work reliably",
          "Because changes would be inherited by future generations",
          "Because it requires destroying the embryo in the process",
          "Because embryo editing is more expensive than other applications",
        ],
        correctIndex: 1,
        explanation: "Editing somatic cells only affects the individual patient. But editing embryos creates germline changes — modifications passed to every future generation, raising concerns about consent, unintended consequences, and 'designer babies'.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "Who discovered that CRISPR could be used as a gene-editing tool, and when?",
        options: [
          "Francis Collins and Craig Venter in 2003",
          "Jennifer Doudna and Emmanuelle Charpentier in 2012",
          "Feng Zhang and George Church in 2013",
          "James Watson and Francis Crick in 1953",
        ],
        correctIndex: 1,
        explanation: "Jennifer Doudna and Emmanuelle Charpentier published their landmark paper in 2012 showing CRISPR-Cas9 could be reprogrammed, earning them the Nobel Prize.",
      },
      {
        id: "r2",
        text: "What does the Cas9 protein do in the CRISPR system?",
        options: [
          "It copies the guide RNA from bacterial DNA",
          "It repairs the DNA after the cut is made",
          "It cuts both strands of the DNA double helix at the target site",
          "It transports the edited DNA into the cell nucleus",
        ],
        correctIndex: 2,
        explanation: "Cas9 is the 'molecular scissors' — it makes a precise double-strand cut in the DNA at the location specified by the guide RNA, enabling the cell's repair machinery to then modify the gene.",
      },
      {
        id: "r3",
        text: "What disease was mentioned as already being treated with CRISPR in clinical trials?",
        options: [
          "Cystic fibrosis",
          "Huntington's disease",
          "Sickle cell disease",
          "Muscular dystrophy",
        ],
        correctIndex: 2,
        explanation: "Sickle cell disease is caused by a single point mutation in the hemoglobin gene, making it an ideal early target for CRISPR therapy since only one specific edit is needed.",
      },
    ],
  },
  {
    passage: {
      title: "Network Effects: Why Winners Take All in Platform Markets",
      content: `In 1876, there were over 1,000 telephone companies in the United States. By 1920, AT&T controlled nearly all of them. This wasn't just aggressive business strategy — it was the inevitable consequence of network effects, one of the most powerful forces in economics.

A network effect exists when a product becomes more valuable as more people use it. A telephone is useless if you're the only person who has one. With two people, there's one possible connection. With ten people, there are 45. With a thousand, nearly half a million. The value grows much faster than the number of users — this is Metcalfe's Law, which states that the value of a network is proportional to the square of the number of connected users.

There are two types. Direct network effects mean users directly benefit from other users: more people on WhatsApp means more people you can message. Indirect network effects work through a complementary market: more iPhone users attract more app developers, which makes the iPhone more valuable, which attracts more users. This is the platform flywheel.

Network effects create winner-take-all dynamics. Once a platform reaches critical mass, it becomes nearly impossible to dislodge. Why would you join a new social network where none of your friends are? This is the cold start problem — the chicken-and-egg challenge every platform must solve to get going.

Successful platforms solve cold start in different ways. Facebook started at Harvard, creating density in a small network before expanding. Uber subsidized both drivers and riders in each new city. Slack grew bottom-up within teams before spreading across organizations.

But network effects aren't permanent moats. Multi-homing (using multiple platforms simultaneously) weakens them — you can have both Uber and Lyft on your phone. And disruptive technology can reset the game entirely: Facebook displaced MySpace despite MySpace's network effects, because the product experience gap was large enough to overcome switching costs.`,
      domain: "business",
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "According to Metcalfe's Law, what happens to a network's value as users increase?",
        options: [
          "Value grows linearly with the number of users",
          "Value grows proportionally to the square of connected users",
          "Value doubles each time the user count doubles",
          "Value grows logarithmically and eventually plateaus",
        ],
        correctIndex: 1,
        explanation: "Metcalfe's Law states network value is proportional to n² (the square of users). With 10 users there are 45 connections; with 1,000 users there are nearly 500,000 — value grows much faster than user count.",
      },
      {
        id: "c2",
        text: "What is the difference between direct and indirect network effects?",
        options: [
          "Direct effects are stronger; indirect effects are weaker",
          "Direct effects benefit users from other users; indirect effects work through complementary markets",
          "Direct effects apply to hardware; indirect effects apply to software",
          "Direct effects are measurable; indirect effects are theoretical",
        ],
        correctIndex: 1,
        explanation: "Direct network effects come from users benefiting from other users (e.g., more people on WhatsApp = more people to message). Indirect effects work through complementary markets (e.g., more iPhone users attract more app developers, making the platform more valuable).",
      },
      {
        id: "c3",
        text: "Why does multi-homing weaken network effects?",
        options: [
          "It increases the cost of maintaining platforms",
          "It confuses users and reduces engagement",
          "Users can be on competing platforms simultaneously, reducing lock-in",
          "It forces platforms to lower prices below profitability",
        ],
        correctIndex: 2,
        explanation: "Multi-homing means users can be on Uber AND Lyft simultaneously. This reduces switching costs and lock-in, weakening the competitive moat that network effects normally create.",
      },
      {
        id: "c4",
        text: "How did Facebook's approach to solving the cold start problem differ from Uber's?",
        options: [
          "Facebook used advertising; Uber used word of mouth",
          "Facebook created density in a small network first; Uber subsidized both sides of the market",
          "Facebook launched globally; Uber launched locally",
          "Facebook was free; Uber charged from day one",
        ],
        correctIndex: 1,
        explanation: "Facebook solved cold start by creating high density in one small network (Harvard) before expanding outward. Uber subsidized both sides of its marketplace (drivers and riders) in each new city to bootstrap supply and demand simultaneously.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "How many telephone companies existed in the US in 1876?",
        options: [
          "About 100",
          "Over 1,000",
          "Around 500",
          "More than 5,000",
        ],
        correctIndex: 1,
        explanation: "The passage opens with this striking fact: over 1,000 telephone companies in 1876, consolidated to near-monopoly by AT&T by 1920 — illustrating the power of network effects.",
      },
      {
        id: "r2",
        text: "With 10 people on a telephone network, how many possible connections exist?",
        options: ["10", "20", "45", "100"],
        correctIndex: 2,
        explanation: "The number of connections in a network of n people is n(n-1)/2. With 10 people: 10×9/2 = 45 possible connections.",
      },
      {
        id: "r3",
        text: "What platform displaced MySpace despite MySpace's existing network effects?",
        options: ["Twitter", "LinkedIn", "Facebook", "Instagram"],
        correctIndex: 2,
        explanation: "Facebook displaced MySpace because the product experience gap was large enough to overcome switching costs — proving network effects aren't permanent moats when a competitor is significantly better.",
      },
    ],
  },
  {
    passage: {
      title: "How Your Brain Decides What to Remember While You Sleep",
      content: `You spend roughly a third of your life asleep, and for a long time, scientists assumed the brain was simply resting during those hours. We now know that sleep is when some of the most critical cognitive work happens — specifically, the consolidation of memories.

During the day, your hippocampus acts like a temporary notepad, rapidly encoding new experiences. But hippocampal storage is limited and fragile. During sleep, the brain replays these experiences and selectively transfers important ones to the neocortex for long-term storage. This process is called memory consolidation, and it happens primarily during two sleep stages.

Slow-wave sleep (SWS), the deepest stage, is when declarative memories — facts, events, and concepts — are consolidated. During SWS, the hippocampus spontaneously "replays" neural patterns from the day's experiences, but at compressed speeds. A sequence of neural firing that took minutes during waking life is replayed in milliseconds. The neocortex listens to these replays and gradually integrates the information into its existing knowledge networks.

REM sleep (the stage associated with dreaming) appears to consolidate procedural and emotional memories. This is when motor skills, emotional experiences, and creative connections are strengthened. Studies show that musicians who sleep after practicing a difficult passage play it better the next day — even better than they played it at the end of their practice session.

But here's the remarkable part: the brain doesn't just copy everything. It selectively strengthens memories it "judges" to be important — based on emotional intensity, relevance to goals, and whether you expected to need the information again. In one experiment, subjects told that they would be tested on material the next day retained significantly more than those told the test was canceled — even though both groups slept the same amount. The brain was selectively consolidating based on anticipated future relevance.

This has practical implications. Studying before sleep is more effective than studying in the morning. And "sleeping on a problem" isn't just a saying — the offline processing during sleep genuinely helps your brain find solutions by restructuring information.`,
      domain: "science",
      wordCount: 330,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What role does the hippocampus play in memory during waking hours?",
        options: [
          "It stores memories permanently in organized categories",
          "It acts as temporary storage, rapidly encoding new experiences",
          "It filters out unimportant sensory information",
          "It replays memories to keep them fresh throughout the day",
        ],
        correctIndex: 1,
        explanation: "The hippocampus acts like a temporary notepad during the day — it rapidly encodes new experiences but has limited, fragile storage. The actual long-term transfer happens during sleep.",
      },
      {
        id: "c2",
        text: "Why is the hippocampal replay during slow-wave sleep described as 'compressed'?",
        options: [
          "Because the hippocampus physically shrinks during sleep",
          "Because only the most important parts of experiences are replayed",
          "Because neural patterns that took minutes while awake are replayed in milliseconds",
          "Because the brain uses less energy during sleep",
        ],
        correctIndex: 2,
        explanation: "During slow-wave sleep, the hippocampus replays neural firing sequences at dramatically compressed timescales — patterns that took minutes while awake are replayed in milliseconds, allowing rapid transfer to the neocortex.",
      },
      {
        id: "c3",
        text: "What does the experiment about test expectations reveal about memory consolidation?",
        options: [
          "Stress improves memory consolidation during sleep",
          "The brain selectively consolidates memories based on anticipated future relevance",
          "Expecting a test causes people to study harder without realizing it",
          "Sleep only consolidates memories when the person is anxious",
        ],
        correctIndex: 1,
        explanation: "Subjects told they'd be tested retained more than those told the test was canceled — both slept equally. This shows the brain selectively consolidates based on anticipated future relevance, not just exposure.",
      },
      {
        id: "c4",
        text: "Based on the passage, which type of memory would REM sleep most likely strengthen?",
        options: [
          "Memorizing historical dates for an exam",
          "Learning to ride a bicycle or play piano",
          "Remembering a phone number you just heard",
          "Recalling the name of someone you just met",
        ],
        correctIndex: 1,
        explanation: "REM sleep consolidates procedural and emotional memories. Riding a bicycle and playing piano are motor skills (procedural memory), which is exactly the type REM strengthens — as the musician study demonstrated.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What are the two sleep stages primarily responsible for memory consolidation?",
        options: [
          "Light sleep and deep sleep",
          "Slow-wave sleep (SWS) and REM sleep",
          "Stage 1 and Stage 2 NREM sleep",
          "Alpha sleep and theta sleep",
        ],
        correctIndex: 1,
        explanation: "Slow-wave sleep (SWS) handles declarative memories (facts and concepts), while REM sleep handles procedural and emotional memories. Together they cover the full spectrum of memory consolidation.",
      },
      {
        id: "r2",
        text: "What three factors does the brain use to judge which memories are 'important' enough to consolidate?",
        options: [
          "Recency, frequency, and duration",
          "Emotional intensity, relevance to goals, and expected future need",
          "Novelty, complexity, and sensory richness",
          "Repetition, association, and timing",
        ],
        correctIndex: 1,
        explanation: "The brain prioritizes memories based on three criteria: emotional intensity (strong emotions flag importance), relevance to goals (connected to what you care about), and expected future need (will you need this again?).",
      },
      {
        id: "r3",
        text: "What evidence showed that sleep improves skill performance beyond just preventing decay?",
        options: [
          "Athletes ran faster after sleeping than after resting",
          "Students scored higher on tests after sleeping than after studying more",
          "Musicians played a passage better after sleep than at the end of their practice session",
          "Surgeons made fewer errors after a full night's sleep",
        ],
        correctIndex: 2,
        explanation: "Musicians played a difficult passage better after sleep than at the end of their practice session — meaning sleep actively improved performance, not just preserved it. This is evidence of offline memory consolidation during REM sleep.",
      },
    ],
  },
  // --- NEW PASSAGES (7-21) ---
  {
    passage: {
      title: "How DNS Translates Names to Numbers in Milliseconds",
      content: `Every time you type "google.com" into your browser, a behind-the-scenes process translates that human-readable name into an IP address like 142.250.80.46. This process is the Domain Name System (DNS), and it's often called the "phonebook of the internet" — though it works nothing like a phonebook.

DNS is a distributed, hierarchical database. No single server knows every domain-to-IP mapping. Instead, the system is organized into a tree structure. At the top are 13 root server clusters (labeled A through M) that know the addresses of top-level domain (TLD) servers (.com, .org, .uk). TLD servers know the addresses of authoritative nameservers for each domain. The authoritative nameserver for google.com knows the actual IP address.

When you request google.com, your computer first checks its local cache. If no cached answer exists, it asks a recursive resolver (usually run by your ISP or a service like 1.1.1.1 or 8.8.8.8). The resolver walks the hierarchy: root server → .com TLD → google.com authoritative server → IP address. This chain of queries is called recursive resolution.

The entire process typically takes under 50 milliseconds — and subsequent requests are even faster because every server in the chain caches answers. The TTL (Time to Live) field in DNS records tells caches how long to keep the answer. A TTL of 300 means "cache this for 5 minutes." Lower TTLs mean faster propagation of changes but more load on authoritative servers.

DNS is also a critical security vulnerability. DNS spoofing (returning fake IP addresses) can redirect users to malicious sites without their knowledge. DNSSEC (DNS Security Extensions) adds cryptographic signatures to DNS records so resolvers can verify authenticity, but adoption remains incomplete. DNS-over-HTTPS (DoH) encrypts DNS queries to prevent eavesdropping — your ISP can no longer see which domains you're visiting — but this has sparked debate because it also prevents network-level parental controls and corporate security filtering.`,
      domain: "tech",
      wordCount: 290,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "Why is DNS described as 'hierarchical' rather than centralized?",
        options: [
          "Because it uses different protocols at each level",
          "Because no single server knows all mappings — the system is a tree from root servers to TLD servers to authoritative nameservers",
          "Because some DNS servers are more important than others",
          "Because DNS was designed by a hierarchical organization",
        ],
        correctIndex: 1,
        explanation: "DNS distributes knowledge across layers: root servers → TLD servers → authoritative nameservers. Each level only knows enough to direct you to the next, and no single server holds all domain-to-IP mappings.",
      },
      {
        id: "c2",
        text: "What is the trade-off of setting a low TTL on DNS records?",
        options: [
          "Lower TTL makes the website faster",
          "Changes propagate faster, but authoritative servers handle more queries since caches expire sooner",
          "Lower TTL makes DNS more secure",
          "Lower TTL reduces bandwidth costs",
        ],
        correctIndex: 1,
        explanation: "Low TTL means caches discard answers quickly, so DNS changes take effect faster. But every expired cache triggers a new query to the authoritative server, increasing its load.",
      },
      {
        id: "c3",
        text: "Why has DNS-over-HTTPS (DoH) sparked debate?",
        options: [
          "Because it's slower than regular DNS",
          "Because it encrypts queries (preventing ISP snooping) but also blocks network-level parental controls and corporate security filtering",
          "Because it requires expensive certificates",
          "Because it only works with specific browsers",
        ],
        correctIndex: 1,
        explanation: "DoH encrypts DNS queries, protecting privacy from ISP surveillance. But the same encryption prevents legitimate network-level controls (parental filters, corporate security) from inspecting DNS traffic — a classic privacy vs. control tension.",
      },
      {
        id: "c4",
        text: "What is DNS spoofing and how does DNSSEC address it?",
        options: [
          "Spoofing is creating fake domains; DNSSEC blocks domain registration",
          "Spoofing returns fake IP addresses to redirect users; DNSSEC adds cryptographic signatures to verify record authenticity",
          "Spoofing is stealing DNS server credentials; DNSSEC adds password protection",
          "Spoofing is overloading DNS servers; DNSSEC adds rate limiting",
        ],
        correctIndex: 1,
        explanation: "DNS spoofing injects fake IP addresses, redirecting users to malicious sites. DNSSEC counters this by cryptographically signing DNS records so resolvers can verify they haven't been tampered with.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "How many root server clusters exist in DNS, and how are they labeled?",
        options: [
          "7, labeled 1 through 7",
          "13, labeled A through M",
          "26, labeled A through Z",
          "10, labeled by continent",
        ],
        correctIndex: 1,
        explanation: "There are 13 root server clusters labeled A through M. Despite the small number, each 'server' is actually a cluster of hundreds of machines distributed globally via anycast routing.",
      },
      {
        id: "r2",
        text: "What does a TTL of 300 mean in a DNS record?",
        options: [
          "The record expires after 300 queries",
          "Cache this answer for 300 seconds (5 minutes)",
          "The record was created 300 seconds ago",
          "The maximum hop count is 300",
        ],
        correctIndex: 1,
        explanation: "TTL (Time to Live) of 300 tells caching resolvers to keep this DNS answer for 300 seconds (5 minutes). After that, they must re-query the authoritative server for a fresh answer.",
      },
      {
        id: "r3",
        text: "What is the sequence of servers queried during recursive DNS resolution?",
        options: [
          "ISP server → website server → response",
          "Root server → TLD server → authoritative nameserver → IP address",
          "Local cache → CDN → origin server",
          "Browser → proxy → firewall → website",
        ],
        correctIndex: 1,
        explanation: "Recursive resolution walks the hierarchy: the resolver asks a root server (which points to the TLD server), then the TLD server (which points to the authoritative nameserver), then the authoritative server returns the actual IP address.",
      },
    ],
  },
  {
    passage: {
      title: "Zero-Knowledge Proofs: Proving You Know Without Revealing What You Know",
      content: `Imagine you're colorblind, and I claim I can distinguish a red ball from a green ball. You hold one ball behind your back, show it to me, hide it again, and sometimes secretly swap it. Each time you show me a ball, I tell you whether you swapped or not. After 100 correct answers in a row, you're convinced I can see color — even though you never learned anything about how color looks. This is the intuition behind zero-knowledge proofs (ZKPs): one party proves a statement is true without revealing any information beyond the truth of the statement itself.

In cryptography, ZKPs have three properties. Completeness: if the statement is true, an honest prover can always convince the verifier. Soundness: if the statement is false, no cheating prover can convince the verifier (except with negligible probability). Zero-knowledge: the verifier learns nothing except that the statement is true.

The classic example is the Ali Baba cave. A tunnel forks into two paths that meet at a locked door. The prover wants to show they know the secret password without revealing it. They enter the cave randomly. The verifier shouts which side to come out of. If the prover knows the password, they can always comply — unlocking the door if needed. After many rounds, the probability of faking it drops to near zero.

Modern ZKPs power blockchain privacy (Zcash uses zk-SNARKs to verify transactions without exposing sender, receiver, or amount), identity verification (proving you're over 18 without revealing your birthdate), and credential systems. The breakthrough of zk-SNARKs and zk-STARKs is making these proofs non-interactive — the prover generates a single proof that anyone can verify, no back-and-forth needed.

The trade-off is computational cost. Generating a zk-SNARK proof can require significant processing power, and the initial "trusted setup" ceremony for zk-SNARKs is a potential vulnerability. zk-STARKs eliminate the trusted setup but produce larger proofs. Research is rapidly closing these gaps.`,
      domain: "tech",
      wordCount: 290,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What are the three required properties of a zero-knowledge proof?",
        options: [
          "Privacy, security, and efficiency",
          "Completeness, soundness, and zero-knowledge",
          "Encryption, decryption, and verification",
          "Confidentiality, integrity, and availability",
        ],
        correctIndex: 1,
        explanation: "ZKPs must be complete (true statements are provable), sound (false statements can't be proven), and zero-knowledge (the verifier learns nothing beyond the truth of the statement).",
      },
      {
        id: "c2",
        text: "Why is the Ali Baba cave example effective at illustrating ZKPs?",
        options: [
          "It shows how encryption algorithms work in practice",
          "It demonstrates how repeated trials make cheating statistically impossible without revealing the secret",
          "It proves that all caves can be used for cryptography",
          "It shows that passwords are the most secure form of authentication",
        ],
        correctIndex: 1,
        explanation: "Each round the prover has a 50/50 chance of faking it. After many rounds, the probability of consistently faking drops to near zero — convincing the verifier without ever revealing the actual password.",
      },
      {
        id: "c3",
        text: "What is the key advantage of zk-STARKs over zk-SNARKs?",
        options: [
          "zk-STARKs produce smaller proofs",
          "zk-STARKs are faster to generate",
          "zk-STARKs eliminate the need for a trusted setup ceremony",
          "zk-STARKs use less memory",
        ],
        correctIndex: 2,
        explanation: "zk-SNARKs require an initial trusted setup ceremony that is a potential vulnerability. zk-STARKs remove this requirement entirely, though at the cost of larger proof sizes.",
      },
      {
        id: "c4",
        text: "How does Zcash use zero-knowledge proofs?",
        options: [
          "To mine new blocks faster than other cryptocurrencies",
          "To verify transactions without exposing sender, receiver, or amount",
          "To encrypt wallet addresses so they can't be hacked",
          "To reduce the size of the blockchain",
        ],
        correctIndex: 1,
        explanation: "Zcash uses zk-SNARKs so the network can verify a transaction is valid (correct amounts, no double-spending) without learning who sent what to whom or how much.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "In the colorblind analogy, what convinced the verifier that the prover could see color?",
        options: [
          "The prover described the colors accurately",
          "The prover correctly identified swaps 100 times in a row",
          "The prover sorted the balls by color",
          "The prover passed a scientific color vision test",
        ],
        correctIndex: 1,
        explanation: "After 100 correct swap identifications, the probability of guessing right every time is astronomically low (2^-100), convincing the verifier without them ever learning what color looks like.",
      },
      {
        id: "r2",
        text: "What makes zk-SNARKs and zk-STARKs a breakthrough compared to earlier ZKPs?",
        options: [
          "They're the first ZKPs that actually work in practice",
          "They make proofs non-interactive — a single proof anyone can verify",
          "They were the first to achieve true zero-knowledge",
          "They can prove any mathematical statement",
        ],
        correctIndex: 1,
        explanation: "Earlier ZKPs required multiple rounds of back-and-forth. zk-SNARKs and zk-STARKs produce a single proof that anyone can verify independently, making them practical for blockchains and other systems.",
      },
      {
        id: "r3",
        text: "What is the main trade-off of using zero-knowledge proofs?",
        options: [
          "They only work for simple statements",
          "They require both parties to be online simultaneously",
          "They require significant computational power to generate",
          "They can only be used once per statement",
        ],
        correctIndex: 2,
        explanation: "Generating ZKP proofs is computationally expensive. This is the primary practical limitation, though research is rapidly reducing the cost.",
      },
    ],
  },
  {
    passage: {
      title: "The Innovator's Dilemma: Why Great Companies Fail",
      content: `In 1997, Harvard professor Clayton Christensen posed a counterintuitive question: why do well-managed companies that listen to their customers and invest aggressively in new technology still lose market leadership? His answer — the innovator's dilemma — became one of the most influential business ideas of the past three decades.

The core insight is the distinction between sustaining and disruptive innovation. Sustaining innovations improve existing products along dimensions customers already value — a faster chip, a sharper screen, a more fuel-efficient engine. Incumbent companies excel at these because they have resources, expertise, and customer relationships.

Disruptive innovations are different. They start as inferior products that appeal to overlooked or price-sensitive customers. Early personal computers couldn't compete with mainframes for corporate computing. Digital cameras produced terrible photos compared to film. Online courses seemed laughable next to an MIT lecture hall.

But disruptive technologies improve faster than customer needs escalate. The PC eventually became good enough for business. Digital cameras surpassed film. And online learning now serves millions who could never access MIT. By the time incumbents notice the threat, the disruptor has built a cost advantage, a new customer base, and momentum.

Why can't incumbents simply adopt the disruption? Because their existing business model fights against it. A company with 30% margins has no rational reason to pursue a product with 10% margins. Their best customers don't want the inferior product. Internal resource allocation processes funnel investment toward what's profitable now, not what might matter in five years. The very practices that make them great at sustaining innovation — listening to current customers, investing in what's profitable — blind them to disruption from below.

Christensen's prescription: set up an autonomous unit with its own P&L, freed from the parent company's resource allocation process. Let it compete on the disruptive terms rather than the sustaining terms. Few companies have the discipline to do this.`,
      domain: "business",
      wordCount: 300,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What is the key difference between sustaining and disruptive innovation?",
        options: [
          "Sustaining innovation is internal; disruptive innovation comes from competitors",
          "Sustaining improves products for existing customers; disruptive starts inferior but serves overlooked markets",
          "Sustaining innovation is incremental; disruptive innovation is always revolutionary",
          "Sustaining innovation uses old technology; disruptive uses new technology",
        ],
        correctIndex: 1,
        explanation: "Sustaining innovation improves products along dimensions existing customers value. Disruptive innovation starts with worse products that appeal to overlooked or price-sensitive customers, then improves until it overtakes incumbents.",
      },
      {
        id: "c2",
        text: "Why does the innovator's dilemma specifically affect WELL-MANAGED companies?",
        options: [
          "Because they spend too much on R&D",
          "Because their best practices — listening to customers and investing in profitable lines — blind them to disruption",
          "Because they hire too many managers who resist change",
          "Because they grow too large to innovate",
        ],
        correctIndex: 1,
        explanation: "That's the dilemma: the rational, well-managed practices (serving current customers, allocating resources to profitable products) are exactly what prevents them from pursuing disruptive innovations with lower margins and unproven markets.",
      },
      {
        id: "c3",
        text: "Why do disruptive technologies eventually overtake incumbents?",
        options: [
          "Because customers always prefer cheaper products",
          "Because governments regulate incumbents more heavily",
          "Because disruptive technologies improve faster than customer needs escalate",
          "Because incumbents run out of sustaining innovations to make",
        ],
        correctIndex: 2,
        explanation: "Disruptive technologies improve at a rate faster than customer needs grow. Eventually the 'inferior' product becomes good enough for mainstream customers while offering cost or convenience advantages.",
      },
      {
        id: "c4",
        text: "What is Christensen's recommended strategy for incumbents facing disruption?",
        options: [
          "Acquire the disruptive competitor before it grows too large",
          "Pivot the entire company to the disruptive technology immediately",
          "Create an autonomous unit with its own P&L, freed from the parent's allocation process",
          "Focus even harder on sustaining innovation to stay ahead",
        ],
        correctIndex: 2,
        explanation: "An autonomous unit can pursue the disruptive opportunity on its own terms — accepting lower margins, targeting different customers — without being killed by the parent company's rational resource allocation process.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What three examples of disruptive technologies were mentioned in the passage?",
        options: [
          "Smartphones, streaming services, and electric cars",
          "Personal computers, digital cameras, and online learning",
          "The internet, cloud computing, and AI",
          "Email, social media, and video conferencing",
        ],
        correctIndex: 1,
        explanation: "The passage traced three disruptions: PCs disrupting mainframes, digital cameras disrupting film, and online courses disrupting traditional education.",
      },
      {
        id: "r2",
        text: "Who developed the Innovator's Dilemma theory, and when?",
        options: [
          "Michael Porter in 1985",
          "Peter Drucker in 1995",
          "Clayton Christensen in 1997",
          "Jim Collins in 2001",
        ],
        correctIndex: 2,
        explanation: "Harvard professor Clayton Christensen introduced the theory in his 1997 book 'The Innovator's Dilemma.'",
      },
      {
        id: "r3",
        text: "Why can't a company with 30% margins rationally pursue a 10% margin disruption?",
        options: [
          "Regulations prevent companies from reducing margins",
          "The company's resource allocation processes funnel investment toward what's profitable now",
          "Shareholders would immediately sell their stock",
          "Employees refuse to work on less profitable products",
        ],
        correctIndex: 1,
        explanation: "Internal resource allocation processes are designed to maximize current profitability. A 10% margin product can't compete for resources against 30% margin products — the system rationally kills the disruptive opportunity.",
      },
    ],
  },
  {
    passage: {
      title: "How mRNA Vaccines Reprogram Your Immune System",
      content: `Traditional vaccines work by exposing your immune system to a weakened or inactivated virus, letting it practice fighting the pathogen before the real thing arrives. mRNA vaccines take a fundamentally different approach: instead of delivering the pathogen, they deliver instructions that teach your own cells to manufacture a harmless piece of it.

The "piece" in COVID-19 vaccines is the spike protein — the molecular key SARS-CoV-2 uses to enter human cells. The mRNA is a single-stranded molecule that carries the genetic recipe for building this protein. When injected, the mRNA enters your cells (delivered inside lipid nanoparticles — tiny fat bubbles that fuse with cell membranes) and is read by ribosomes, the cell's protein-building machinery. Your cells then produce spike proteins and display them on their surface.

Your immune system sees these spike proteins as foreign and mounts a full response: B-cells produce antibodies that can neutralize the real virus, T-cells learn to destroy infected cells, and crucially, memory cells form that can rapidly re-activate the response months or years later.

The mRNA itself is fragile and temporary. It's degraded by the cell within hours to days — it never enters the nucleus and cannot alter your DNA. This is a common misconception: mRNA flows from DNA (in the nucleus) to ribosomes (in the cytoplasm) as a one-way messenger. There's no biological mechanism for mRNA to reverse-write itself into your genome.

The revolutionary advantage of mRNA technology is speed. Traditional vaccine development takes years because growing weakened viruses is slow and finicky. With mRNA, scientists just need the genetic sequence of the target protein. Moderna designed its COVID-19 vaccine in two days after receiving the SARS-CoV-2 genome — the remaining months were safety testing, not design. This platform could theoretically produce vaccines against new pandemics in weeks, and is being explored for cancer, HIV, and malaria.`,
      domain: "science",
      wordCount: 290,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "How do mRNA vaccines differ fundamentally from traditional vaccines?",
        options: [
          "mRNA vaccines use live viruses; traditional vaccines use dead ones",
          "mRNA vaccines deliver instructions for your cells to build a protein; traditional vaccines deliver the pathogen itself",
          "mRNA vaccines target DNA; traditional vaccines target RNA",
          "mRNA vaccines don't trigger an immune response; they just block the virus",
        ],
        correctIndex: 1,
        explanation: "Traditional vaccines expose you to the whole pathogen (weakened or inactivated). mRNA vaccines deliver genetic instructions so your own cells manufacture a harmless piece of the pathogen, triggering the immune response without ever introducing the actual virus.",
      },
      {
        id: "c2",
        text: "Why can't mRNA vaccines alter your DNA?",
        options: [
          "The mRNA is too large to enter the nucleus",
          "mRNA flows one-way from DNA to ribosomes — there's no mechanism to reverse-write into the genome",
          "The lipid nanoparticles prevent it from reaching DNA",
          "Special enzymes destroy any mRNA that approaches DNA",
        ],
        correctIndex: 1,
        explanation: "mRNA is a one-way messenger: DNA → mRNA → protein. There's no biological machinery in human cells to reverse this flow and write mRNA back into DNA. The mRNA stays in the cytoplasm and never enters the nucleus.",
      },
      {
        id: "c3",
        text: "What role do lipid nanoparticles play in mRNA vaccines?",
        options: [
          "They boost the immune response like an adjuvant",
          "They preserve the mRNA during long-term cold storage",
          "They deliver the mRNA into cells by fusing with cell membranes",
          "They carry antibodies that provide immediate protection",
        ],
        correctIndex: 2,
        explanation: "Lipid nanoparticles are tiny fat bubbles that encapsulate the fragile mRNA and fuse with cell membranes, delivering the mRNA payload into the cell's cytoplasm where ribosomes can read it.",
      },
      {
        id: "c4",
        text: "Why is the mRNA platform so much faster than traditional vaccine development?",
        options: [
          "mRNA vaccines don't need safety testing",
          "Scientists only need the genetic sequence of the target protein, not live virus cultures",
          "mRNA vaccines use artificial intelligence to design themselves",
          "The manufacturing process uses existing antibiotic factories",
        ],
        correctIndex: 1,
        explanation: "Traditional vaccines require growing and weakening actual viruses — slow, finicky work. With mRNA, you just need the target protein's genetic sequence to synthesize the mRNA. Moderna designed its COVID-19 vaccine in two days after getting the genome.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "How long did it take Moderna to design its COVID-19 mRNA vaccine after receiving the virus genome?",
        options: ["Two weeks", "Two days", "Two months", "Two hours"],
        correctIndex: 1,
        explanation: "Moderna designed the vaccine in just two days — the remaining months were all safety testing, not design, showcasing the speed advantage of the mRNA platform.",
      },
      {
        id: "r2",
        text: "What specific viral protein do COVID-19 mRNA vaccines instruct cells to produce?",
        options: [
          "The capsid protein",
          "The envelope protein",
          "The spike protein",
          "The nucleocapsid protein",
        ],
        correctIndex: 2,
        explanation: "The spike protein is the molecular key SARS-CoV-2 uses to enter human cells, making it the ideal target — antibodies against it can block the virus from infecting cells.",
      },
      {
        id: "r3",
        text: "What three types of immune cells respond to the vaccine-produced spike proteins?",
        options: [
          "Red blood cells, white blood cells, and platelets",
          "B-cells (antibodies), T-cells (cell destruction), and memory cells (long-term protection)",
          "Macrophages, neutrophils, and eosinophils",
          "Natural killer cells, dendritic cells, and mast cells",
        ],
        correctIndex: 1,
        explanation: "B-cells produce neutralizing antibodies, T-cells learn to destroy infected cells, and memory cells form for rapid re-activation if the real virus is encountered later.",
      },
    ],
  },
  {
    passage: {
      title: "How Load Balancers Distribute Traffic at Scale",
      content: `When you type "google.com" into your browser, you're not connecting to one server — you're being routed to one of thousands. The system that decides which server handles your request is a load balancer, and it's one of the most critical pieces of infrastructure in modern computing.

At its simplest, a load balancer sits between clients and a pool of backend servers, distributing incoming requests so no single server gets overwhelmed. But the algorithms behind this distribution are where things get interesting.

Round-robin is the simplest approach: requests go to servers in sequence — 1, 2, 3, 1, 2, 3. It's fair but naive. If some requests are computationally expensive and others are cheap, round-robin can leave one server drowning while another idles. Weighted round-robin lets you assign more traffic to more powerful servers.

Least-connections routing is smarter: each new request goes to the server currently handling the fewest active connections. This naturally adapts to varying request complexity — busy servers accumulate connections and get fewer new ones. The trade-off is that the load balancer needs to track the state of every connection, adding overhead.

For applications where a user's session state lives on a specific server (like a shopping cart stored in memory), you need sticky sessions — routing all requests from the same user to the same server. The load balancer typically uses a cookie or hashes the client's IP address. The downside is that one server can get overloaded if many heavy users get "stuck" to it.

Layer 4 load balancers operate at the TCP/UDP level — they route based on IP addresses and ports without inspecting the actual content. They're fast but blind. Layer 7 load balancers inspect HTTP headers, URLs, and cookies, enabling content-based routing: send API calls to one pool, static assets to another, and video streams to a third. The trade-off is latency — inspecting content takes time.

At Google-scale, even load balancers need load balancers. The architecture becomes hierarchical: DNS-based global routing → regional load balancers → local service-level load balancers.`,
      domain: "tech",
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "Why is round-robin load balancing considered 'naive'?",
        options: [
          "Because it can't handle more than three servers",
          "Because it doesn't account for varying request complexity — one server can drown while another idles",
          "Because it requires all servers to be identical",
          "Because it's too slow for modern applications",
        ],
        correctIndex: 1,
        explanation: "Round-robin distributes evenly by count but ignores that some requests are heavier than others. A server handling 10 expensive queries is far more loaded than one handling 10 cheap queries.",
      },
      {
        id: "c2",
        text: "What is the trade-off of least-connections routing compared to round-robin?",
        options: [
          "It's less fair to servers",
          "It requires tracking the state of every connection, adding overhead",
          "It doesn't work with encrypted traffic",
          "It can only handle a small number of servers",
        ],
        correctIndex: 1,
        explanation: "Least-connections is smarter because it adapts to real load, but the load balancer must track every active connection across all servers — adding state management overhead that round-robin doesn't need.",
      },
      {
        id: "c3",
        text: "What is the key difference between Layer 4 and Layer 7 load balancers?",
        options: [
          "Layer 4 is older technology; Layer 7 is newer",
          "Layer 4 routes by IP/port without inspecting content; Layer 7 inspects HTTP headers and URLs for content-based routing",
          "Layer 4 handles more traffic; Layer 7 is more reliable",
          "Layer 4 works for web traffic; Layer 7 works for database traffic",
        ],
        correctIndex: 1,
        explanation: "Layer 4 operates at TCP/UDP level (fast but blind to content). Layer 7 inspects application-level data (HTTP headers, URLs, cookies), enabling smart routing like sending API calls to one pool and static assets to another.",
      },
      {
        id: "c4",
        text: "Why can sticky sessions lead to uneven load distribution?",
        options: [
          "Because session cookies expire at different times",
          "Because heavy users can get 'stuck' to one server, overloading it",
          "Because sticky sessions prevent servers from being added to the pool",
          "Because the hash function distributes users randomly",
        ],
        correctIndex: 1,
        explanation: "Sticky sessions bind a user to one server for their entire session. If many resource-heavy users happen to get routed to the same server, it becomes overloaded while others stay light.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What is the typical mechanism used to implement sticky sessions?",
        options: [
          "Server-side caching and DNS records",
          "A cookie or hash of the client's IP address",
          "A dedicated session server that tracks all users",
          "Encrypted tokens stored in the URL",
        ],
        correctIndex: 1,
        explanation: "The load balancer typically sets a cookie or hashes the client's IP to consistently route the same user to the same backend server.",
      },
      {
        id: "r2",
        text: "What does the architecture look like at Google-scale load balancing?",
        options: [
          "One giant load balancer that handles all traffic",
          "Peer-to-peer load balancing between servers",
          "Hierarchical: DNS-based global → regional → local service-level load balancers",
          "Client-side load balancing using JavaScript",
        ],
        correctIndex: 2,
        explanation: "At massive scale, even load balancers need load balancers. The architecture becomes hierarchical: DNS routes globally, regional balancers distribute within regions, and service-level balancers handle individual services.",
      },
      {
        id: "r3",
        text: "In content-based routing with a Layer 7 load balancer, how might traffic be split?",
        options: [
          "By time of day and user location",
          "API calls to one pool, static assets to another, video streams to a third",
          "By user subscription tier — free vs. paid",
          "Randomly with weighted probability",
        ],
        correctIndex: 1,
        explanation: "Layer 7 can inspect HTTP content, so it can route different types of requests to specialized server pools — API calls, static assets, and video streams each go to infrastructure optimized for that workload.",
      },
    ],
  },
  {
    passage: {
      title: "Game Theory and the Prisoner's Dilemma: Why Rational People Make Irrational Choices",
      content: `Two suspects are arrested and interrogated separately. Each can either cooperate (stay silent) or defect (betray the other). If both cooperate, they each serve 1 year. If both defect, they each serve 3 years. If one defects while the other cooperates, the defector goes free and the cooperator serves 5 years. This is the Prisoner's Dilemma — perhaps the most famous problem in game theory, and it reveals something unsettling about rational decision-making.

The logic is airtight: regardless of what the other player does, you're better off defecting. If they cooperate and you defect, you go free (better than 1 year). If they defect and you also defect, you get 3 years (better than 5 years). Defection is the dominant strategy. But when both players follow this logic, they both get 3 years — worse than if they'd both cooperated for 1 year each. Individual rationality leads to collective irrationality.

This isn't just a thought experiment. It explains arms races (both countries would be safer disarming, but neither trusts the other to), overfishing (each fisher is better off catching more, but if everyone does, the fishery collapses), and climate change (each country benefits from polluting while others cut emissions).

The breakthrough came from Robert Axelrod's 1984 tournament. He invited game theorists to submit strategies for an iterated Prisoner's Dilemma — the game played repeatedly with the same opponent. The winner was Tit-for-Tat, submitted by Anatol Rapoport: cooperate on the first move, then copy whatever the other player did last. It's nice (starts cooperative), retaliatory (punishes defection immediately), forgiving (returns to cooperation after punishment), and clear (the opponent can easily understand its pattern).

The key insight: in one-shot games, defection dominates. But in repeated interactions — where reputation and future consequences matter — cooperation can emerge and stabilize. Trust isn't irrational; it's the optimal strategy when the game doesn't end.`,
      domain: "business",
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "Why is mutual defection the 'rational' outcome even though mutual cooperation is better for both?",
        options: [
          "Because the players are irrational and emotional",
          "Because defection is the dominant strategy — it's better regardless of what the other player does",
          "Because the rules prohibit cooperation",
          "Because players don't know the payoff structure",
        ],
        correctIndex: 1,
        explanation: "No matter what the other player chooses, defecting gives you a better personal outcome. But when both follow this individually rational logic, they end up at 3 years each — worse than the 1 year they'd each get by cooperating.",
      },
      {
        id: "c2",
        text: "What real-world situation does the Prisoner's Dilemma explain about climate change?",
        options: [
          "Countries compete to develop green technology",
          "Each country benefits from polluting while others cut emissions, leading to collective failure",
          "International treaties always solve the cooperation problem",
          "Climate change is too complex to model with game theory",
        ],
        correctIndex: 1,
        explanation: "Each country is individually better off polluting (cheaper) while hoping others bear the cost of reducing emissions. When everyone follows this logic, total emissions stay high — individual rationality producing collective irrationality.",
      },
      {
        id: "c3",
        text: "Why does Tit-for-Tat succeed in the iterated Prisoner's Dilemma?",
        options: [
          "Because it always defects and accumulates the highest individual scores",
          "Because it's unpredictable and opponents can't exploit it",
          "Because it's nice, retaliatory, forgiving, and clear — building cooperation while punishing defection",
          "Because it was designed by the most experienced game theorist",
        ],
        correctIndex: 2,
        explanation: "Tit-for-Tat starts cooperative (nice), punishes defection immediately (retaliatory), forgives after one punishment (forgiving), and is easy for opponents to understand (clear) — building stable cooperation while deterring exploitation.",
      },
      {
        id: "c4",
        text: "What is the fundamental difference between one-shot and repeated games?",
        options: [
          "Repeated games have higher stakes",
          "In repeated games, reputation and future consequences enable cooperation to emerge and stabilize",
          "One-shot games are simpler mathematically",
          "Repeated games always lead to cooperation",
        ],
        correctIndex: 1,
        explanation: "In one-shot games there's no future to worry about, so defection dominates. In repeated games, your reputation matters — defecting now means the other player punishes you next round, making cooperation the better long-term strategy.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "Who won Axelrod's 1984 tournament, and with what strategy?",
        options: [
          "John Nash with 'Always Defect'",
          "Anatol Rapoport with 'Tit-for-Tat'",
          "Robert Axelrod with 'Random'",
          "Thomas Schelling with 'Generous Tit-for-Tat'",
        ],
        correctIndex: 1,
        explanation: "Anatol Rapoport submitted Tit-for-Tat — a remarkably simple strategy that outperformed far more complex entries by building cooperation while deterring exploitation.",
      },
      {
        id: "r2",
        text: "What are the four properties that make Tit-for-Tat effective?",
        options: [
          "Smart, aggressive, persistent, and complex",
          "Nice, retaliatory, forgiving, and clear",
          "Random, adaptive, optimal, and fast",
          "Cooperative, dominant, strategic, and balanced",
        ],
        correctIndex: 1,
        explanation: "Nice (starts cooperative), retaliatory (punishes defection immediately), forgiving (returns to cooperation), and clear (opponents can understand the pattern and adjust).",
      },
      {
        id: "r3",
        text: "What three real-world examples of the Prisoner's Dilemma were mentioned?",
        options: [
          "Trade wars, sports doping, and tax evasion",
          "Arms races, overfishing, and climate change",
          "Price wars, patent trolling, and insider trading",
          "Deforestation, water pollution, and urban sprawl",
        ],
        correctIndex: 1,
        explanation: "The passage cited arms races (countries can't trust each other to disarm), overfishing (individual catch incentives collapse the fishery), and climate change (individual pollution vs. collective emission reduction).",
      },
    ],
  },
  {
    passage: {
      title: "Neuroplasticity: How Your Brain Rewires Itself",
      content: `For most of the 20th century, neuroscientists believed the adult brain was essentially fixed — you were born with a set number of neurons, and the only trajectory was decline. We now know this is profoundly wrong. The brain continuously reorganizes itself by forming new neural connections throughout life. This property is called neuroplasticity.

Neuroplasticity operates at multiple scales. At the synaptic level, connections between neurons strengthen or weaken based on activity — this is Hebbian learning, often summarized as "neurons that fire together wire together." When you practice a skill repeatedly, the synaptic pathways involved become more efficient. At the structural level, the brain can actually grow new connections (dendritic sprouting) and, in limited regions like the hippocampus, generate entirely new neurons (neurogenesis).

The most dramatic evidence comes from studies of brain injury. When a stroke destroys the brain region controlling the right hand, patients can sometimes recover hand function. How? Adjacent brain areas gradually take over the lost function — a process called cortical remapping. The brain literally reassigns real estate.

London taxi drivers provide a famous non-injury example. They must memorize 25,000 streets and thousands of landmarks to pass "The Knowledge" exam. MRI studies showed their posterior hippocampi — the region associated with spatial memory — were significantly larger than average. More years of driving correlated with more growth. The brain physically expanded in response to demand.

But neuroplasticity is a double-edged sword. The same mechanism that lets you learn piano also lets chronic pain become self-reinforcing. Pain signals repeated over months strengthen their neural pathways, and the brain can continue generating pain even after the original injury heals. This is why chronic pain is now understood as partly a brain disorder, not just a tissue problem.

The practical implication is that the brain is use-dependent: what you repeatedly do, think, and feel literally shapes its physical structure. This is both empowering (you can always learn) and cautionary (bad habits physically entrench themselves).`,
      domain: "science",
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What does 'neurons that fire together wire together' mean in practical terms?",
        options: [
          "Neurons physically move closer to each other when activated",
          "Repeatedly activating the same neural pathways strengthens the synaptic connections between them",
          "Neurons can only connect to adjacent neurons",
          "All neurons in the brain fire simultaneously during learning",
        ],
        correctIndex: 1,
        explanation: "Hebbian learning means co-activated neurons strengthen their connections. When you practice a skill, the specific neural pathways involved become more efficient through repeated firing — the basis of skill acquisition.",
      },
      {
        id: "c2",
        text: "How does the London taxi driver study demonstrate neuroplasticity?",
        options: [
          "Taxi drivers had naturally larger brains before starting the job",
          "Their hippocampi physically grew in response to spatial memory demands, with more years correlating to more growth",
          "They scored higher on IQ tests after memorizing streets",
          "Their visual cortex expanded to process more road information",
        ],
        correctIndex: 1,
        explanation: "MRI scans showed taxi drivers' posterior hippocampi were significantly larger than average, and the size correlated with years of driving — demonstrating that intensive use causes the brain to physically expand in that region.",
      },
      {
        id: "c3",
        text: "Why is neuroplasticity described as a 'double-edged sword'?",
        options: [
          "Because it works faster in children than adults",
          "Because it helps learning but also allows chronic pain to become self-reinforcing through strengthened pain pathways",
          "Because it requires energy that could be used for other brain functions",
          "Because new connections always replace old ones",
        ],
        correctIndex: 1,
        explanation: "The same mechanism that strengthens skill pathways also strengthens pain pathways. Chronic pain signals reinforce themselves neurally, so the brain continues generating pain even after the original injury heals.",
      },
      {
        id: "c4",
        text: "What is cortical remapping?",
        options: [
          "A surgical technique for treating brain injuries",
          "The process of creating a map of brain activity using fMRI",
          "Adjacent brain areas gradually taking over functions lost to injury",
          "The brain's ability to create new neurons after damage",
        ],
        correctIndex: 2,
        explanation: "When a brain region is destroyed (e.g., by stroke), nearby areas can gradually assume the lost function — the brain reassigns neural 'real estate' to compensate for the damage.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What exam must London taxi drivers pass, and what does it require?",
        options: [
          "'The Route Test' — memorizing all bus routes in London",
          "'The Knowledge' — memorizing 25,000 streets and thousands of landmarks",
          "'The Navigation' — passing a GPS-free driving test through London",
          "'The Memory' — recalling 10,000 passenger destinations",
        ],
        correctIndex: 1,
        explanation: "London taxi drivers must pass 'The Knowledge,' requiring memorization of 25,000 streets and thousands of landmarks — an extreme spatial memory challenge that physically grows their hippocampi.",
      },
      {
        id: "r2",
        text: "At what two scales does neuroplasticity operate?",
        options: [
          "Chemical and electrical",
          "Synaptic (connection strength) and structural (new connections/neurons)",
          "Conscious and unconscious",
          "Short-term and long-term",
        ],
        correctIndex: 1,
        explanation: "Synaptic plasticity strengthens or weakens existing connections based on activity. Structural plasticity creates entirely new connections (dendritic sprouting) or even new neurons (neurogenesis) in certain brain regions.",
      },
      {
        id: "r3",
        text: "Why is chronic pain now understood as partly a brain disorder?",
        options: [
          "Because all pain is imaginary",
          "Because pain medications affect brain chemistry",
          "Because repeated pain signals strengthen neural pathways, and the brain continues generating pain after the injury heals",
          "Because the brain can't distinguish between physical and emotional pain",
        ],
        correctIndex: 2,
        explanation: "Neuroplasticity means repeated pain signals entrench their pathways. The brain 'learns' pain so well that it keeps producing pain signals even after the tissue has healed — making chronic pain a neural pattern, not just tissue damage.",
      },
    ],
  },
  {
    passage: {
      title: "Git Internals: How Version Control Actually Works Under the Hood",
      content: `Most developers use Git daily without understanding that it's fundamentally a content-addressable filesystem with a version control interface bolted on top. Understanding the internals transforms Git from a mysterious set of commands into a logical system.

Git stores everything as objects in a simple key-value store. There are only four types: blobs (file contents), trees (directories — they map filenames to blob hashes), commits (snapshots — they point to a tree plus metadata like author, timestamp, and parent commit), and tags (named references to specific commits). Every object is identified by a SHA-1 hash of its contents.

When you run "git add file.txt", Git compresses the file, computes its SHA-1 hash, and stores the blob in .git/objects. The hash is the key, the compressed content is the value. Crucially, Git stores the entire file, not a diff. If you modify one line in a 10,000-line file and commit, Git stores a complete new blob. This sounds wasteful but enables O(1) lookups and makes branching essentially free.

Branches are just files containing a 40-character commit hash. When you create a branch, Git writes a 41-byte file (the hash plus a newline). That's it. A branch is a movable pointer to a commit — not a copy of your code. This is why "git branch feature" is instant regardless of project size.

A commit is a snapshot, not a diff. Each commit object points to a tree (the complete state of every file) and one or more parent commits. Git reconstructs diffs on the fly when you ask for them with "git diff" or "git log -p" — but internally, every commit records the full state.

To save disk space, Git periodically runs "garbage collection," which packs objects into compressed packfiles using delta compression. At this point Git does compute diffs — but only as a storage optimization, never as part of the data model. The conceptual model remains snapshots.`,
      domain: "tech",
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What are the four types of Git objects?",
        options: [
          "Files, folders, commits, and branches",
          "Blobs, trees, commits, and tags",
          "Snapshots, diffs, merges, and rebases",
          "Heads, refs, remotes, and stashes",
        ],
        correctIndex: 1,
        explanation: "Git's entire data model uses only four object types: blobs (file contents), trees (directories mapping names to blobs), commits (snapshots pointing to a tree + metadata), and tags (named references to commits).",
      },
      {
        id: "c2",
        text: "Why is creating a Git branch essentially instant regardless of project size?",
        options: [
          "Because Git uses symbolic links instead of copying files",
          "Because a branch is just a 41-byte file containing a commit hash — not a copy of code",
          "Because Git caches all branches in memory",
          "Because modern SSDs make file operations instant",
        ],
        correctIndex: 1,
        explanation: "A branch is literally a file containing a 40-character SHA-1 hash plus a newline. Creating a branch writes 41 bytes — it's a pointer to a commit, not a copy of the codebase.",
      },
      {
        id: "c3",
        text: "How does Git store file changes — as diffs or full snapshots?",
        options: [
          "Always as diffs to save space",
          "Full snapshots conceptually, with diffs only as a later storage optimization during garbage collection",
          "As diffs for small changes and snapshots for large changes",
          "As snapshots for the first version and diffs for subsequent versions",
        ],
        correctIndex: 1,
        explanation: "Git's data model is snapshot-based: every commit records the complete state. Diffs are computed on-the-fly when requested. Garbage collection later uses delta compression for storage efficiency, but this is an optimization, not part of the data model.",
      },
      {
        id: "c4",
        text: "What makes Git a 'content-addressable filesystem'?",
        options: [
          "Files are stored based on their creation date",
          "Every object is identified by a SHA-1 hash of its contents — the content IS the address",
          "Git uses a hierarchical directory structure like any filesystem",
          "Files can be addressed by either name or path",
        ],
        correctIndex: 1,
        explanation: "In a content-addressable store, the key (address) is derived from the value (content) via hashing. Two identical files always produce the same hash and are stored once — the content literally determines the address.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What happens internally when you run 'git add file.txt'?",
        options: [
          "Git records that the file should be included in the next commit",
          "Git compresses the file, computes its SHA-1 hash, and stores the blob in .git/objects",
          "Git creates a diff between the current and previous version",
          "Git moves the file to a staging area directory",
        ],
        correctIndex: 1,
        explanation: "git add compresses the entire file content, computes its SHA-1 hash (the key), and stores the compressed blob in .git/objects (the value). The staging area then references this blob.",
      },
      {
        id: "r2",
        text: "What does a commit object contain?",
        options: [
          "A list of all files that changed since the last commit",
          "A pointer to a tree (full state) plus metadata (author, timestamp, parent commit)",
          "A compressed diff of all changes",
          "A reference to the branch it belongs to",
        ],
        correctIndex: 1,
        explanation: "A commit points to a tree (complete snapshot of all files), its parent commit(s), and metadata like author and timestamp. It records the full state, not just what changed.",
      },
      {
        id: "r3",
        text: "What is the purpose of Git's garbage collection?",
        options: [
          "Deleting old branches that are no longer needed",
          "Removing uncommitted changes from the working directory",
          "Packing objects into compressed packfiles using delta compression to save disk space",
          "Cleaning up merge conflicts",
        ],
        correctIndex: 2,
        explanation: "Git GC packs loose objects into compressed packfiles, applying delta compression as a storage optimization. This is the only time Git computes diffs — purely for space savings, not as part of the data model.",
      },
    ],
  },
  {
    passage: {
      title: "The Monty Hall Problem: Why Switching Doors Doubles Your Odds",
      content: `You're on a game show. Three doors: behind one is a car, behind the other two are goats. You pick door 1. The host, Monty Hall, who knows what's behind each door, opens door 3 to reveal a goat. He asks: do you want to switch to door 2? Most people's intuition says it doesn't matter — two doors left, 50/50 chance. But switching wins two-thirds of the time.

The solution hinges on one crucial detail: Monty always opens a door with a goat. He's not choosing randomly. When you first pick, you have a 1/3 chance of being right and a 2/3 chance of being wrong. When Monty reveals a goat, those probabilities don't redistribute equally — they can't, because Monty's action is constrained by his knowledge.

Think of it this way: there are only three scenarios. If the car is behind door 1 (your pick, probability 1/3), Monty opens either losing door and switching loses. If the car is behind door 2 (probability 1/3), Monty must open door 3, and switching wins. If the car is behind door 3 (probability 1/3), Monty must open door 2, and switching wins. Switching wins in 2 out of 3 scenarios.

Another way to see it: imagine 100 doors. You pick one. Monty opens 98 doors, all with goats. Would you switch to the remaining door? Your initial pick had a 1/100 chance. The remaining door has absorbed the 99/100 probability from all the eliminated doors. Of course you'd switch.

The Monty Hall problem is a masterclass in conditional probability — how the probability of an event changes when you gain new information. The mistake most people make is treating Monty's reveal as random new information, when it's actually a structured, knowledge-based action. Understanding this distinction between random and structured information is fundamental to Bayesian reasoning.

When the problem was published in Parade magazine in 1990, roughly 10,000 readers wrote in to say the answer was wrong — including nearly 1,000 PhDs.`,
      domain: "science",
      wordCount: 320,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "Why don't the odds become 50/50 after Monty opens a door?",
        options: [
          "Because Monty sometimes lies about what's behind the door",
          "Because Monty's action is constrained by knowledge — he always reveals a goat, so the probabilities don't redistribute equally",
          "Because there are still three doors, even though one is open",
          "Because the car is more likely to be behind certain doors",
        ],
        correctIndex: 1,
        explanation: "Monty's reveal isn't random — he always opens a goat door. Your initial 1/3 chance doesn't change, and the 2/3 probability of being wrong concentrates on the remaining door rather than splitting evenly.",
      },
      {
        id: "c2",
        text: "In the 100-door version, why is switching so clearly correct?",
        options: [
          "Because you know which door the car is behind after 98 are opened",
          "Because your original pick had 1/100 odds, and the remaining door absorbed the 99/100 from all eliminated doors",
          "Because with more doors the host is more likely to make a mistake",
          "Because 100 doors means more goats, making goats less likely",
        ],
        correctIndex: 1,
        explanation: "Your original door had a 1% chance. When Monty eliminates 98 goat doors, the remaining unchosen door concentrates all 99% probability — making it overwhelmingly better to switch.",
      },
      {
        id: "c3",
        text: "What broader reasoning skill does the Monty Hall problem illustrate?",
        options: [
          "Statistical regression to the mean",
          "The gambler's fallacy",
          "Conditional probability — how structured information changes probability assessments",
          "The law of large numbers",
        ],
        correctIndex: 2,
        explanation: "The problem is fundamentally about conditional probability (Bayesian reasoning): the key is recognizing that Monty's structured, knowledge-based action changes the probability distribution differently than a random reveal would.",
      },
      {
        id: "c4",
        text: "In how many of the three possible scenarios does switching win?",
        options: [
          "1 out of 3",
          "2 out of 3",
          "All 3",
          "It depends on which door you initially pick",
        ],
        correctIndex: 1,
        explanation: "If the car is behind your door (1/3 chance), switching loses. If it's behind either other door (2/3 chance combined), Monty's reveal forces the car to be behind the remaining door — switching wins. 2 out of 3.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "When was the Monty Hall problem published in Parade magazine, and what happened?",
        options: [
          "1985 — it became a viral math puzzle",
          "1990 — roughly 10,000 readers wrote in saying the answer was wrong, including nearly 1,000 PhDs",
          "1995 — mathematicians agreed it proved game shows were unfair",
          "2000 — it was adapted into a probability textbook",
        ],
        correctIndex: 1,
        explanation: "Published in 1990, the problem generated massive backlash — around 10,000 readers and nearly 1,000 PhDs insisted the published answer (switch) was wrong, illustrating how counterintuitive conditional probability can be.",
      },
      {
        id: "r2",
        text: "What is the crucial detail that makes the Monty Hall problem work?",
        options: [
          "There are exactly three doors",
          "The contestant doesn't know where the car is",
          "Monty always opens a door with a goat — his action is constrained by knowledge",
          "The car is equally likely to be behind any door",
        ],
        correctIndex: 2,
        explanation: "If Monty opened doors randomly (possibly revealing the car), the problem wouldn't work. The solution depends on Monty's action being structured and knowledge-based — he always reveals a goat.",
      },
      {
        id: "r3",
        text: "What is the exact probability of winning if you switch?",
        options: ["1/3", "1/2", "2/3", "3/4"],
        correctIndex: 2,
        explanation: "Switching wins 2 out of 3 times (66.7%). You lose only if your initial pick was correct (1/3 chance), so switching wins with the complementary probability of 2/3.",
      },
    ],
  },
  {
    passage: {
      title: "Supply Chains Are the Economy's Nervous System",
      content: `In early 2021, a container ship called the Ever Given ran aground in the Suez Canal, blocking one of the world's most critical trade arteries for six days. The estimated cost: $9.6 billion per day in delayed goods. This single incident revealed just how fragile and interconnected global supply chains have become.

A supply chain is the entire network of organizations, people, activities, and resources involved in moving a product from raw materials to the end customer. For a simple cotton t-shirt, this might span five continents: cotton grown in India, spun into yarn in Vietnam, woven into fabric in China, sewn in Bangladesh, and sold in the United States.

Modern supply chains optimize ruthlessly for efficiency. Just-in-time (JIT) manufacturing, pioneered by Toyota in the 1970s, minimizes inventory by ordering parts only as they're needed. This eliminates waste — no money tied up in warehoused parts, no obsolete stock. But it also eliminates buffers. When a disruption hits, there's no slack in the system. The 2011 Tōhoku earthquake in Japan shut down auto production worldwide because a single supplier of a specialized resin went offline.

This exposes the efficiency-resilience trade-off. Lean supply chains maximize margins in normal times but are catastrophically vulnerable to disruption. Resilient supply chains maintain buffers, multiple suppliers, and geographic diversification — but at higher cost. After COVID-19, many companies shifted from pure JIT toward "just-in-case" models, increasing safety stock and dual-sourcing critical components.

The bullwhip effect amplifies disruptions as they travel upstream. A 10% increase in consumer demand might cause a retailer to order 20% more (to be safe), the distributor to order 30% more, and the manufacturer to order 50% more. Small demand signals get magnified into wild swings at the production end. This is why semiconductor shortages last years — factories can't ramp production fast enough to match the amplified signals bouncing through the supply chain.`,
      domain: "business",
      wordCount: 300,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What is the fundamental trade-off in supply chain design?",
        options: [
          "Speed vs. cost",
          "Efficiency vs. resilience — lean chains maximize margins but are vulnerable to disruption",
          "Domestic vs. international sourcing",
          "Quality vs. quantity of suppliers",
        ],
        correctIndex: 1,
        explanation: "Lean (JIT) supply chains maximize profit margins by eliminating waste but have no buffer when disruptions hit. Resilient chains maintain redundancy at higher cost. Companies must balance these tensions.",
      },
      {
        id: "c2",
        text: "What is the bullwhip effect?",
        options: [
          "When a single supplier failure cascades through the entire chain",
          "When small demand changes at the consumer end get amplified into wild swings at the production end",
          "When supply chain costs whip back and forth between high and low",
          "When companies rapidly switch between suppliers",
        ],
        correctIndex: 1,
        explanation: "Each layer of the supply chain over-orders to buffer uncertainty, amplifying the original signal. A 10% demand increase might become a 50% production surge — creating the oscillating, amplified pattern that gives the effect its name.",
      },
      {
        id: "c3",
        text: "Why does JIT manufacturing create vulnerability?",
        options: [
          "Because it uses lower-quality parts to save money",
          "Because it relies on a single transportation method",
          "Because it eliminates inventory buffers — there's no slack when disruptions hit",
          "Because it requires manual labor instead of automation",
        ],
        correctIndex: 2,
        explanation: "JIT orders parts only as needed, so there's zero buffer inventory. When a supplier fails or transport is disrupted, production stops immediately because there's no stockpile to draw from.",
      },
      {
        id: "c4",
        text: "Why do semiconductor shortages last years rather than weeks?",
        options: [
          "Because semiconductors are difficult to manufacture",
          "Because the bullwhip effect amplifies demand signals so much that factories can't ramp fast enough",
          "Because there's only one semiconductor factory in the world",
          "Because governments restrict semiconductor production",
        ],
        correctIndex: 1,
        explanation: "The bullwhip effect amplifies consumer demand signals into massive production swings. Semiconductor fabs take years to build and can't rapidly scale — so the amplified demand signal far outpaces production capacity.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What was the estimated daily cost of the Ever Given blocking the Suez Canal?",
        options: [
          "$1.2 billion per day",
          "$9.6 billion per day",
          "$500 million per day",
          "$3.4 billion per day",
        ],
        correctIndex: 1,
        explanation: "The Ever Given blockage cost an estimated $9.6 billion per day in delayed goods — illustrating the massive economic impact of disrupting a single critical trade route.",
      },
      {
        id: "r2",
        text: "Who pioneered Just-in-Time manufacturing, and when?",
        options: [
          "Ford in the 1920s",
          "Toyota in the 1970s",
          "Samsung in the 1990s",
          "Amazon in the 2000s",
        ],
        correctIndex: 1,
        explanation: "Toyota pioneered JIT in the 1970s as part of the Toyota Production System, revolutionizing manufacturing by minimizing inventory waste.",
      },
      {
        id: "r3",
        text: "What shift did many companies make after COVID-19 disrupted supply chains?",
        options: [
          "Moved all manufacturing domestically",
          "Shifted from JIT toward 'just-in-case' models with more safety stock and dual-sourcing",
          "Abandoned global supply chains entirely",
          "Invested heavily in drone delivery",
        ],
        correctIndex: 1,
        explanation: "COVID-19 exposed JIT's fragility. Many companies adopted 'just-in-case' strategies: increasing safety stock, dual-sourcing critical components, and diversifying geographically — trading some efficiency for resilience.",
      },
    ],
  },
  {
    passage: {
      title: "How Your Gut Microbiome Influences Your Brain",
      content: `Your gut contains roughly 38 trillion microorganisms — bacteria, fungi, viruses, and archaea — that collectively weigh about 2 kilograms. This ecosystem, called the gut microbiome, was long considered relevant only to digestion. We now know it has a profound and bidirectional connection with your brain, called the gut-brain axis.

The primary communication channel is the vagus nerve — the longest cranial nerve, running from the brainstem to the abdomen. It carries signals in both directions: the brain influences gut motility and secretion, while the gut sends information about its microbial state to the brain. Severing the vagus nerve in animal studies blocks many of the microbiome's effects on behavior.

Gut bacteria produce neurotransmitters directly. Roughly 90% of the body's serotonin — the molecule most antidepressants target — is produced in the gut, not the brain. Certain Lactobacillus and Bifidobacterium species produce GABA, the brain's primary inhibitory neurotransmitter. These molecules don't all cross the blood-brain barrier directly, but they influence the brain through vagus nerve signaling and immune system modulation.

The evidence linking microbiome composition to mental health is growing rapidly. Germ-free mice (raised without any microbiome) show exaggerated stress responses and anxiety-like behavior that normalizes when specific bacteria are introduced. In humans, patients with depression have consistently different microbiome profiles compared to healthy controls, though causality is hard to establish.

The most provocative experiments involve fecal microbiota transplants (FMTs). When gut bacteria from anxious mice are transplanted into calm mice, the calm mice develop anxious behavior — and vice versa. Similar behavioral changes have been observed in human FMT studies, though the research is still early.

Diet is the primary lever. A Mediterranean diet rich in fiber, fermented foods, and polyphenols promotes microbial diversity. Ultra-processed foods and antibiotics reduce it. The practical takeaway is that what you eat doesn't just feed your body — it feeds the organisms that influence your brain.`,
      domain: "science",
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What is the gut-brain axis?",
        options: [
          "A nerve that connects the stomach to the spinal cord",
          "A bidirectional communication system between the gut microbiome and the brain",
          "The part of the brain that controls digestion",
          "A hormonal pathway that regulates appetite",
        ],
        correctIndex: 1,
        explanation: "The gut-brain axis is the bidirectional communication network between the gut and brain, primarily mediated through the vagus nerve, neurotransmitters, and the immune system.",
      },
      {
        id: "c2",
        text: "Why is the statistic about serotonin production surprising?",
        options: [
          "Because serotonin was thought to only exist in the brain",
          "Because roughly 90% of serotonin is produced in the gut, not the brain — yet antidepressants target it as a 'brain chemical'",
          "Because serotonin is produced by bacteria, not human cells",
          "Because gut serotonin has no connection to mood",
        ],
        correctIndex: 1,
        explanation: "Most people associate serotonin with the brain and mood (it's what SSRIs target), but 90% of it is actually produced in the gut — highlighting the gut's unexpectedly large role in neurochemistry.",
      },
      {
        id: "c3",
        text: "What do fecal microbiota transplant experiments reveal?",
        options: [
          "That gut bacteria are identical across all mammals",
          "That transferring gut bacteria can transfer behavioral traits like anxiety between animals",
          "That FMTs cure depression in humans",
          "That the microbiome only affects digestion, not behavior",
        ],
        correctIndex: 1,
        explanation: "When anxious mice receive gut bacteria from calm mice, they become calmer — and vice versa. This demonstrates that the microbiome composition can directly influence behavioral traits.",
      },
      {
        id: "c4",
        text: "What is the primary way individuals can influence their gut microbiome?",
        options: [
          "Exercise and sleep",
          "Diet — fiber, fermented foods, and polyphenols promote diversity; processed food and antibiotics reduce it",
          "Probiotic supplements",
          "Reducing stress through meditation",
        ],
        correctIndex: 1,
        explanation: "Diet is the primary lever for microbiome health. A Mediterranean diet with fiber and fermented foods promotes microbial diversity, while ultra-processed foods and antibiotics diminish it.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What is the primary communication channel between the gut and brain?",
        options: [
          "The spinal cord",
          "The vagus nerve — the longest cranial nerve, running from brainstem to abdomen",
          "Blood-borne hormones",
          "The sympathetic nervous system",
        ],
        correctIndex: 1,
        explanation: "The vagus nerve is the main highway of the gut-brain axis, carrying bidirectional signals between the brainstem and the abdomen. Severing it blocks many microbiome effects on behavior.",
      },
      {
        id: "r2",
        text: "Approximately how many microorganisms live in the human gut?",
        options: [
          "About 1 billion",
          "Roughly 38 trillion",
          "Around 500 billion",
          "About 5 trillion",
        ],
        correctIndex: 1,
        explanation: "The gut hosts roughly 38 trillion microorganisms, collectively weighing about 2 kilograms — a massive ecosystem that rivals the number of human cells in the body.",
      },
      {
        id: "r3",
        text: "What happened when germ-free mice were compared to normal mice?",
        options: [
          "They were healthier and lived longer",
          "They showed exaggerated stress responses and anxiety-like behavior",
          "They had better memory and learning ability",
          "They showed no behavioral differences",
        ],
        correctIndex: 1,
        explanation: "Germ-free mice (no microbiome) showed exaggerated stress and anxiety-like behavior compared to normal mice — behavior that normalized when specific bacteria were introduced, demonstrating the microbiome's role in stress regulation.",
      },
    ],
  },
  {
    passage: {
      title: "API Design: Why Good Interfaces Are Hard to Build",
      content: `An API (Application Programming Interface) is a contract between two pieces of software. One side promises: "If you send me this input in this format, I'll give you this output." The quality of this contract determines whether developers love or hate working with your system. Good API design is one of the highest-leverage activities in software engineering because APIs outlive their implementations — once external code depends on your interface, changing it breaks other people's software.

The first principle is consistency. If your API uses "get_user" for one endpoint, don't use "fetchOrder" for another. Pick a naming convention and stick to it. REST APIs typically use nouns (GET /users/123), not verbs (GET /getUser/123). GraphQL uses a query language instead. Whatever pattern you choose, violations of consistency create cognitive load that compounds across hundreds of endpoints.

The second principle is that APIs should be hard to misuse. A function that accepts (latitude, longitude) as two separate floats invites bugs — callers will swap them. A function that accepts a Location object with named fields doesn't. Similarly, returning error codes as integers (where -1 means failure) is worse than returning a Result type that forces the caller to handle both success and failure cases. Make the right thing easy and the wrong thing hard.

The third principle is minimal surface area. Every public function, parameter, and response field is a promise you'll have to maintain. Adding features to an API is easy; removing them is nearly impossible because someone depends on them. This is Hyrum's Law: "With a sufficient number of users, all observable behaviors of your system will be depended on by somebody." Even bugs become features that people rely on.

Versioning is the escape hatch. When breaking changes are truly necessary, version your API (v1, v2) rather than silently changing behavior. But versioning has its own cost: you now maintain two systems. The best API design avoids needing versions by getting the abstraction right the first time — which is why the design phase matters more than the implementation.`,
      domain: "tech",
      wordCount: 320,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "Why does the passage say APIs 'outlive their implementations'?",
        options: [
          "Because APIs are stored on separate servers from the code",
          "Because once external code depends on your interface, you can't change it without breaking other people's software",
          "Because API documentation is kept indefinitely",
          "Because APIs use more durable storage formats",
        ],
        correctIndex: 1,
        explanation: "You can rewrite your internal implementation any time, but the API is a public contract. External code depends on it — changing it breaks downstream software, so the interface must be maintained long after the original code is replaced.",
      },
      {
        id: "c2",
        text: "What does Hyrum's Law mean for API maintenance?",
        options: [
          "APIs should be versioned every year",
          "All observable behaviors — even bugs — become features that someone depends on, making any change potentially breaking",
          "APIs should be as complex as possible to cover all use cases",
          "Only documented features need to be maintained",
        ],
        correctIndex: 1,
        explanation: "Hyrum's Law warns that with enough users, someone will depend on every observable behavior — including undocumented quirks and bugs. This means even 'fixing' a bug can be a breaking change.",
      },
      {
        id: "c3",
        text: "Why is accepting (latitude, longitude) as separate floats considered bad API design?",
        options: [
          "Floats are imprecise for geographic coordinates",
          "It creates a swap bug — callers will accidentally reverse them, and the compiler can't catch it",
          "It uses too much memory",
          "GPS coordinates should always be strings",
        ],
        correctIndex: 1,
        explanation: "Two float parameters of the same type are easily swapped with no compiler warning. A Location object with named fields (lat, lng) makes the swap impossible — following the principle of making the API hard to misuse.",
      },
      {
        id: "c4",
        text: "Why does the passage argue that API design matters more than implementation?",
        options: [
          "Because users only see the API, not the code",
          "Because implementation can be changed freely but the API is a permanent contract — getting it right avoids costly versioning",
          "Because implementation is automated by tools",
          "Because APIs are more complex than implementations",
        ],
        correctIndex: 1,
        explanation: "Implementation can be rewritten any time without affecting users. But the API is a public promise — mistakes require versioning (maintaining two systems) or breaking changes. Getting the abstraction right initially is far cheaper.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What is Hyrum's Law?",
        options: [
          "APIs should always be backward-compatible",
          "With sufficient users, all observable behaviors of your system will be depended on by somebody",
          "The complexity of an API grows proportionally to its user base",
          "Every API endpoint should have exactly one responsibility",
        ],
        correctIndex: 1,
        explanation: "Hyrum's Law states that with enough users, every observable behavior — documented or not, intentional or not — becomes a dependency that someone relies on.",
      },
      {
        id: "r2",
        text: "What are the three API design principles discussed in the passage?",
        options: [
          "Speed, security, and scalability",
          "Consistency, hard to misuse, and minimal surface area",
          "Documentation, testing, and versioning",
          "Simplicity, reliability, and extensibility",
        ],
        correctIndex: 1,
        explanation: "The passage covers: consistency (uniform naming and patterns), hard to misuse (make the right thing easy, wrong thing hard), and minimal surface area (every public element is a maintenance promise).",
      },
      {
        id: "r3",
        text: "Why is versioning described as both an 'escape hatch' and a cost?",
        options: [
          "Because versioning confuses users but protects developers",
          "Because it allows breaking changes but means maintaining two systems simultaneously",
          "Because version numbers take up space in URLs",
          "Because older versions are less secure",
        ],
        correctIndex: 1,
        explanation: "Versioning lets you make necessary breaking changes (the escape hatch), but you now maintain v1 and v2 in parallel (the cost). The best design avoids needing versions by getting the abstraction right initially.",
      },
    ],
  },
  {
    passage: {
      title: "How Fractional Reserve Banking Creates Money",
      content: `Most people assume that only governments or central banks create money. In reality, the majority of money in circulation is created by ordinary commercial banks through a mechanism called fractional reserve banking. Understanding this process reveals how modern economies expand — and why bank runs are so dangerous.

Here's how it works. You deposit $1,000 in Bank A. The bank is required to keep a fraction of your deposit as reserves (say 10%, or $100) and can lend out the rest ($900). This $900 goes to a borrower who pays it to a contractor, who deposits it in Bank B. Bank B keeps $90 as reserves and lends out $810. That $810 eventually gets deposited in Bank C, which keeps $81 and lends out $729. And so on.

From your single $1,000 deposit, the banking system creates a total of $10,000 in deposits (1/reserve ratio = 1/0.10 = 10). This is the money multiplier effect. The $1,000 in physical cash didn't multiply — but the deposits (which function as money in the modern economy) did. You can write a check for $1,000, the borrower has $900 in their account, the contractor has $810, and all of this "money" exists simultaneously.

This works because not everyone withdraws their money at the same time. Banks are essentially betting on this statistical reality. But when confidence collapses — when depositors lose faith and rush to withdraw simultaneously — the bank doesn't have the cash. It has $100 in reserves, not $1,000. This is a bank run, and it can destroy a solvent bank purely through panic.

This is why deposit insurance exists. The FDIC insures deposits up to $250,000, removing the incentive to panic-withdraw. Central banks also serve as "lenders of last resort," providing emergency liquidity to banks facing runs. These safety nets exist precisely because the fractional reserve system is powerful but inherently fragile — it depends on collective trust.`,
      domain: "business",
      wordCount: 310,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "How does fractional reserve banking 'create' money?",
        options: [
          "Banks print new physical currency to meet loan demand",
          "Each deposit gets partially lent out, creating new deposits at other banks, multiplying the original deposit through the system",
          "The government sends new money to banks electronically",
          "Banks invest deposits in stocks that appreciate in value",
        ],
        correctIndex: 1,
        explanation: "Banks keep a fraction of deposits as reserves and lend the rest. That lent money gets deposited elsewhere, creating new deposits that get partially lent again — the cascade multiplies the original deposit through the system.",
      },
      {
        id: "c2",
        text: "Why can a bank run destroy even a solvent bank?",
        options: [
          "Because the bank's investments lose value during a panic",
          "Because the bank only holds a fraction of deposits as cash — if everyone withdraws at once, there isn't enough, regardless of the bank's overall solvency",
          "Because employees leave during a crisis",
          "Because regulators shut down any bank experiencing withdrawals",
        ],
        correctIndex: 1,
        explanation: "A bank with $1,000 in deposits might only hold $100 in reserves (the rest is lent out). It's solvent on paper, but if more than 10% of depositors demand cash simultaneously, it can't pay — creating a self-fulfilling crisis.",
      },
      {
        id: "c3",
        text: "What is the money multiplier formula, and what does a 10% reserve ratio produce?",
        options: [
          "Reserve ratio × deposits = total money; produces $100",
          "1 / reserve ratio = multiplier; a 10% ratio produces a 10x multiplier",
          "Deposits / reserve ratio = money created; produces $100,000",
          "Reserve ratio / deposits = multiplier; produces 0.1x",
        ],
        correctIndex: 1,
        explanation: "The money multiplier is 1/reserve ratio. With a 10% requirement, the multiplier is 10 — meaning a $1,000 deposit can generate up to $10,000 in total deposits across the banking system.",
      },
      {
        id: "c4",
        text: "How does deposit insurance prevent bank runs?",
        options: [
          "It makes banks keep higher reserves",
          "It removes the incentive to panic-withdraw since depositors know their money is guaranteed up to the insured amount",
          "It prevents banks from lending too aggressively",
          "It punishes depositors who withdraw early",
        ],
        correctIndex: 1,
        explanation: "If your deposits are insured (FDIC covers up to $250,000), there's no reason to rush to the bank during a panic — your money is guaranteed. This breaks the self-fulfilling cycle of bank runs.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "In the passage's example, how much total money does the $1,000 deposit create?",
        options: [
          "$5,000",
          "$9,000",
          "$10,000",
          "$100,000",
        ],
        correctIndex: 2,
        explanation: "With a 10% reserve ratio, the money multiplier is 10. The original $1,000 deposit generates $10,000 in total deposits across the banking system through the lending cascade.",
      },
      {
        id: "r2",
        text: "What is the FDIC insurance limit per depositor?",
        options: [
          "$100,000",
          "$250,000",
          "$500,000",
          "$1,000,000",
        ],
        correctIndex: 1,
        explanation: "The FDIC insures deposits up to $250,000 per depositor per insured bank, providing a safety net that removes the incentive for panic withdrawals.",
      },
      {
        id: "r3",
        text: "What role do central banks play in the fractional reserve system?",
        options: [
          "They set interest rates for consumer loans",
          "They serve as 'lenders of last resort,' providing emergency liquidity to banks facing runs",
          "They hold all physical currency in the economy",
          "They approve every loan that commercial banks make",
        ],
        correctIndex: 1,
        explanation: "Central banks serve as lenders of last resort — when a bank faces a run and can't meet withdrawals, the central bank provides emergency cash to prevent collapse, backstopping the inherently fragile fractional reserve system.",
      },
    ],
  },
  {
    passage: {
      title: "The Placebo Effect Is Real Medicine",
      content: `In clinical trials, patients who receive sugar pills — placebos with no active ingredient — routinely improve. This isn't fakery or weakness. The placebo effect is a genuine physiological response where the brain, expecting improvement, triggers real biological changes. Understanding it has transformed how we think about the boundary between mind and body.

The neurochemistry is measurable. When Parkinson's patients receive a placebo they believe is medication, their brains release dopamine — the exact neurotransmitter their disease depletes. In pain studies, placebos trigger endorphin release; when researchers administer naloxone (a drug that blocks endorphins), the placebo's pain relief disappears. The belief isn't "tricking" the brain; it's activating the same pathways real drugs use.

The size of the placebo effect depends on contextual factors. Larger pills work better than smaller ones. Two pills work better than one. Injections outperform pills. Sham surgeries sometimes outperform real ones. Brand-name placebos outperform generic-looking ones. Even the color matters: blue pills are better sedatives, red pills are better stimulants — matching cultural associations. The more the treatment "looks like" powerful medicine, the stronger the brain's response.

Perhaps most surprising: placebos work even when patients know they're taking placebos. These "open-label" placebos have shown significant effects in IBS, chronic pain, and cancer-related fatigue. One theory is that the ritual of treatment — taking a pill on schedule, engaging with a healthcare provider — activates healing mechanisms independent of the substance.

The ethical implications are complex. If a patient improves on a placebo, is that real improvement? Medically, yes — the symptoms genuinely decrease. Should doctors prescribe them? The AMA says prescribing placebos deceptively violates patient autonomy. But open-label placebos sidestep this — the patient consents, knows it's a placebo, and still benefits. This challenges the assumption that medical effects must come from biochemically active molecules.`,
      domain: "science",
      wordCount: 300,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "What evidence shows the placebo effect is a real physiological response, not just imagination?",
        options: [
          "Patients report feeling better in surveys",
          "Parkinson's patients release dopamine and pain patients release endorphins — measurable neurochemical changes matching real drug effects",
          "Placebos work faster than real medications",
          "Brain scans show increased blood flow everywhere",
        ],
        correctIndex: 1,
        explanation: "The placebo effect produces measurable neurochemistry: Parkinson's patients release dopamine, pain patients release endorphins. Blocking endorphins with naloxone eliminates placebo pain relief — proving the biochemical pathway is real.",
      },
      {
        id: "c2",
        text: "Why do open-label placebos challenge traditional medical thinking?",
        options: [
          "Because they're cheaper than real drugs",
          "Because they show that patients can benefit even when they know there's no active ingredient — suggesting the treatment ritual itself has healing power",
          "Because they have no side effects",
          "Because they work better than deceptive placebos",
        ],
        correctIndex: 1,
        explanation: "If patients know it's a placebo and still improve, the benefit can't come from deception or belief in a drug. This suggests the ritual of treatment — taking pills, engaging with providers — independently activates healing mechanisms.",
      },
      {
        id: "c3",
        text: "How do contextual factors influence the placebo effect's strength?",
        options: [
          "Only the doctor's confidence matters",
          "Larger pills, injections over pills, brand names over generics, and culturally-matched colors all produce stronger effects",
          "Only the severity of the illness matters",
          "The patient's age is the primary factor",
        ],
        correctIndex: 1,
        explanation: "The more a treatment 'looks like' powerful medicine — bigger pills, injections, brand packaging, culturally appropriate colors — the stronger the brain's physiological response. Context shapes the biological effect.",
      },
      {
        id: "c4",
        text: "What ethical tension does the placebo effect create in medicine?",
        options: [
          "Placebos are too expensive for widespread use",
          "Prescribing placebos deceptively violates patient autonomy, but open-label placebos work and preserve consent",
          "Drug companies don't want doctors prescribing sugar pills",
          "Insurance companies refuse to cover placebos",
        ],
        correctIndex: 1,
        explanation: "Deceptive placebo prescriptions violate patient autonomy (the AMA position). But open-label placebos preserve informed consent while still producing real benefits — creating a new ethical middle ground.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "What happens when naloxone is administered after a placebo reduces pain?",
        options: [
          "The pain reduction increases further",
          "The placebo's pain relief disappears — proving it was mediated by endorphins",
          "Nothing changes, showing the effect is psychological",
          "The patient falls asleep",
        ],
        correctIndex: 1,
        explanation: "Naloxone blocks endorphin receptors. When administered after a placebo reduces pain, the pain relief vanishes — proving the placebo triggered real endorphin release through the same pathway as actual painkillers.",
      },
      {
        id: "r2",
        text: "How do pill color and cultural associations interact in the placebo effect?",
        options: [
          "Color has no effect; only size matters",
          "Blue pills work as better sedatives and red pills as better stimulants, matching cultural associations",
          "White pills always produce the strongest effect",
          "Color effects only work in children",
        ],
        correctIndex: 1,
        explanation: "Placebo effects follow cultural associations: blue (calming) pills are better sedatives, red (energizing) pills are better stimulants. The brain's expectation, shaped by cultural context, drives the biological response.",
      },
      {
        id: "r3",
        text: "What three conditions have open-label placebos shown significant effects in?",
        options: [
          "Headaches, insomnia, and allergies",
          "IBS, chronic pain, and cancer-related fatigue",
          "Depression, anxiety, and PTSD",
          "Diabetes, hypertension, and asthma",
        ],
        correctIndex: 1,
        explanation: "Open-label placebos (where patients know they're taking placebos) have shown significant effects in irritable bowel syndrome, chronic pain, and cancer-related fatigue.",
      },
    ],
  },
  {
    passage: {
      title: "Database Indexing: The Trade-Off Behind Every Fast Query",
      content: `When you search for a specific row in a database table with a million rows, the database has two options: scan every row until it finds the match (a full table scan), or use an index to jump directly to it. The difference can be the gap between 10 milliseconds and 10 seconds. Indexes are the most important performance tool in database engineering.

A database index is conceptually identical to the index at the back of a textbook. Instead of reading every page to find "recursion," you look up "recursion" in the index, get page 247, and flip directly there. A database index maps column values to the physical locations of rows on disk.

The most common index structure is the B-tree (balanced tree). B-trees keep data sorted and allow searches, insertions, and deletions in O(log n) time. For a table with one million rows, a B-tree index requires about 20 comparisons to find any row — versus up to one million comparisons for a full scan. The "B" doesn't stand for "binary" — it stands for the original creators at Boeing or simply "balanced," depending on who you ask.

Hash indexes offer O(1) lookup for exact matches but can't handle range queries ("find all orders between January and March"). B-trees handle both equality and range queries, which is why they're the default in most databases.

The critical trade-off is write performance. Every index that speeds up reads slows down writes. When you insert a row into a table with 5 indexes, the database must update all 5 index structures in addition to writing the row itself. This is why over-indexing is as harmful as under-indexing — a table with 20 indexes makes writes painfully slow.

Choosing which columns to index is an art. Index columns that appear in WHERE clauses, JOIN conditions, and ORDER BY clauses. Don't index columns with low cardinality (like a boolean "is_active" column — there are only two values, so the index barely narrows the search). Composite indexes on multiple columns follow the leftmost prefix rule: an index on (country, city, zip) can serve queries filtering by country alone or country + city, but not city alone.`,
      domain: "tech",
      wordCount: 340,
    },
    comprehensionQuestions: [
      {
        id: "c1",
        text: "Why is over-indexing harmful?",
        options: [
          "It uses too much memory for the database to function",
          "Every index slows down writes — inserting a row requires updating every index structure",
          "It makes the query planner confused about which index to use",
          "Indexes expire and need manual maintenance",
        ],
        correctIndex: 1,
        explanation: "Each index is a data structure that must be updated on every insert, update, or delete. A table with 20 indexes means every write triggers 20 index updates — the read speed gain becomes a write speed nightmare.",
      },
      {
        id: "c2",
        text: "Why are B-trees preferred over hash indexes as the default?",
        options: [
          "B-trees are faster for exact lookups",
          "B-trees handle both equality and range queries; hash indexes only support exact matches",
          "B-trees use less disk space",
          "Hash indexes are patented and expensive",
        ],
        correctIndex: 1,
        explanation: "Hash indexes give O(1) exact-match lookups but can't serve range queries (BETWEEN, >, <). B-trees handle both equality and range queries in O(log n), making them more versatile as a default.",
      },
      {
        id: "c3",
        text: "What is the leftmost prefix rule for composite indexes?",
        options: [
          "The first column in the index must be the primary key",
          "An index on (A, B, C) can serve queries on A, or A+B, or A+B+C — but not B alone",
          "The leftmost column must have the highest cardinality",
          "Composite indexes always read from left to right",
        ],
        correctIndex: 1,
        explanation: "A composite index on (country, city, zip) works like a phone book sorted by country first, then city, then zip. You can look up by country alone, but searching by city alone requires scanning all countries — the leftmost columns must be specified.",
      },
      {
        id: "c4",
        text: "Why shouldn't you index a boolean column like 'is_active'?",
        options: [
          "Booleans can't be indexed technically",
          "With only two possible values, the index barely narrows the search — low cardinality means low selectivity",
          "Boolean columns change too frequently for indexes to help",
          "Boolean indexes take up too much space",
        ],
        correctIndex: 1,
        explanation: "An index on a boolean column splits rows into only two buckets. If 90% of rows are active, the index for 'is_active = true' still matches 900,000 of 1 million rows — hardly narrowing the search at all.",
      },
    ],
    recallQuestions: [
      {
        id: "r1",
        text: "How many comparisons does a B-tree index need to find a row in a million-row table?",
        options: [
          "About 100",
          "About 20",
          "About 1,000",
          "About 500",
        ],
        correctIndex: 1,
        explanation: "B-trees operate in O(log n) time. For 1 million rows, log₂(1,000,000) ≈ 20 comparisons, compared to up to 1 million for a full table scan.",
      },
      {
        id: "r2",
        text: "What does the 'B' in B-tree actually stand for?",
        options: [
          "Binary",
          "Boeing or 'balanced' — the exact origin is debated",
          "Bayer (the inventor's name)",
          "Branching",
        ],
        correctIndex: 1,
        explanation: "Despite common assumption, the 'B' does not stand for 'binary.' It's attributed to Boeing (where it was developed) or simply 'balanced' — the exact origin remains debated.",
      },
      {
        id: "r3",
        text: "Which three types of SQL clauses should guide your indexing decisions?",
        options: [
          "SELECT, FROM, and GROUP BY",
          "WHERE, JOIN, and ORDER BY",
          "INSERT, UPDATE, and DELETE",
          "HAVING, LIMIT, and OFFSET",
        ],
        correctIndex: 1,
        explanation: "Index columns that appear in WHERE clauses (filtering), JOIN conditions (matching rows between tables), and ORDER BY clauses (sorting) — these are the operations that benefit most from indexed lookups.",
      },
    ],
  },
];

/**
 * Pick a random passage, optionally filtered by domain and avoiding the most recent title.
 */
export function getRandomContent(
  recentTitle?: string,
  preferredDomain?: string
): GeneratedContent {
  let pool = PASSAGES;

  // Filter by domain if specified
  if (preferredDomain) {
    const domainFiltered = pool.filter((p) => p.passage.domain === preferredDomain);
    if (domainFiltered.length > 0) pool = domainFiltered;
  }

  // Avoid repeating the most recent passage
  if (recentTitle) {
    const deduped = pool.filter((p) => p.passage.title !== recentTitle);
    if (deduped.length > 0) pool = deduped;
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

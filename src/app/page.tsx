import {
  ArrowRight,
  BusFront,
  Check,
  CircleDot,
  Cloud,
  MapPin,
  Navigation,
  Phone,
  Route,
  ShieldCheck,
  Signal,
  Sparkles,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    title: "GPS setup",
    nepali: "GPS जडान निःशुल्क",
    body: "Installation handled by us.",
    icon: Signal,
  },
  {
    title: "Required feature package",
    nepali: "सरकारी आवश्यकताका ४ सुविधा",
    body: "Covers the 4 mandated GPS features.",
    icon: ShieldCheck,
  },
  {
    title: "Rider app listing",
    nepali: "यात्रु एपमा मयुर बस",
    body: "Mayur appears in the app.",
    icon: Phone,
  },
  {
    title: "Hosted operation",
    nepali: "होस्टिङ सधैं निःशुल्क",
    body: "Server, updates, and app operation handled by us.",
    icon: Cloud,
  },
];

const appBuses = [
  {
    number: "MY-014",
    route: "Koteshwor to Banepa",
    nepaliRoute: "कोटेश्वरदेखि बनेपा",
    eta: "6 min",
    x: "52%",
    y: "42%",
  },
  {
    number: "MY-022",
    route: "Kathmandu to Bhaktapur",
    nepaliRoute: "काठमाडौं देखि भक्तपुर",
    eta: "11 min",
    x: "31%",
    y: "64%",
  },
  {
    number: "MY-031",
    route: "Banepa to Kathmandu",
    nepaliRoute: "बनेपादेखि काठमाडौं",
    eta: "18 min",
    x: "73%",
    y: "32%",
  },
];

const rollout = [
  "Choose the first buses",
  "Install the required GPS package",
  "Publish them in the rider app",
  "Add more Mayur buses as the route network grows",
];

function AppPreview() {
  return (
    <div className="phone-shell" aria-label="Passenger app preview showing Mayur buses">
      <div className="phone-screen">
        <div className="phone-status">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <Signal size={12} />
            5G
          </span>
        </div>

        <div className="phone-search">
          <MapPin size={15} />
          <span>Mayur bus near me</span>
        </div>

        <div className="mini-map">
          <svg viewBox="0 0 320 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path
              d="M14 238 C78 214 98 152 153 144 C213 135 222 69 302 51"
              fill="none"
              stroke="rgba(30, 78, 66, 0.14)"
              strokeWidth="30"
              strokeLinecap="round"
            />
            <path
              d="M14 238 C78 214 98 152 153 144 C213 135 222 69 302 51"
              fill="none"
              stroke="#1e4e42"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="10 12"
              className="route-flow"
            />
            <path
              d="M33 78 C101 120 151 79 221 118 C259 139 273 186 304 214"
              fill="none"
              stroke="rgba(14, 37, 58, 0.12)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute left-[8%] bottom-[14%] text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
            KTM
          </div>
          <div className="absolute right-[10%] top-[15%] text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
            Banepa
          </div>

          {appBuses.map((bus, index) => (
            <div
              key={bus.number}
              className="bus-pin"
              style={{ left: bus.x, top: bus.y, animationDelay: `${index * 0.6}s` }}
            >
              <span className="bus-pulse" />
              <span className="bus-dot">
                <Navigation size={12} />
              </span>
              <span className="bus-label">{bus.eta}</span>
            </div>
          ))}
        </div>

        <div className="phone-sheet">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-stone-300" />
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                Nearby Mayur Buses
              </p>
              <p className="text-xs text-stone-500">नजिकका मयुर बसहरू</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
              Live
            </span>
          </div>

          <div className="space-y-2">
            {appBuses.map((bus) => (
              <div key={bus.number} className="app-row">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#1e4e42] text-white">
                  <BusFront size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-stone-950">{bus.number}</p>
                    <p className="shrink-0 text-sm font-semibold text-[#1e4e42]">{bus.eta}</p>
                  </div>
                  <p className="truncate text-[11px] text-stone-500">{bus.nepaliRoute}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="proposal-page">
      <section className="hero-section">
        <nav className="proposal-nav" aria-label="Proposal navigation">
          <div className="flex items-center gap-2 font-semibold text-stone-950">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1e4e42] text-white">
              <BusFront size={17} />
            </span>
            Mayur GPS Proposal
          </div>
          <a href="#rollout" className="nav-cta">
            Start small
            <ArrowRight size={15} />
          </a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={16} />
              Proposal for Mayur Yatayat
            </div>
            <h1>Always-free GPS and rider app for Mayur Yatayat.</h1>
            <p className="nepali-lede">मयुर बसका लागि सधैं निःशुल्क GPS र यात्रु एप।</p>
            <p className="hero-subcopy">
              Includes the required GPS package, hosted operation, and passenger visibility.
            </p>
            <div className="hero-actions">
              <a href="#offer" className="primary-button">
                See the offer
                <ArrowRight size={17} />
              </a>
              <span className="proof-pill">
                <Check size={15} />
                No software team needed
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <AppPreview />
          </div>
        </div>
      </section>

      <section id="offer" className="content-section offer-section">
        <div className="section-heading">
          <p className="section-kicker">The full setup</p>
          <h2>What Mayur gets.</h2>
          <p>चार कुरा। एउटै जिम्मेवारी।</p>
        </div>

        <div className="benefit-grid">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="benefit-card">
                <div className="benefit-icon">
                  <Icon size={21} />
                </div>
                <h3>{item.title}</h3>
                <p className="nepali-card">{item.nepali}</p>
                <p>{item.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-section split-section">
        <div>
          <p className="section-kicker">Why this matters</p>
          <h2>Passengers wait for buses they can see.</h2>
          <p className="section-body">
            Today, a rider often does not know if the bus is close, late, or already gone. A simple passenger app changes that decision at the stop.
          </p>
          <p className="nepali-support">
            यात्रुले बस आइरहेको देखेपछि पर्खिने सम्भावना बढ्छ। यही दृश्यताले मयुर बसमा ट्राफिक बढाउन सक्छ।
          </p>
        </div>

        <div className="value-panel">
          <div className="value-line">
            <CircleDot size={18} />
            <span>Know which Mayur bus is coming</span>
          </div>
          <div className="value-line">
            <CircleDot size={18} />
            <span>See route and arrival time</span>
          </div>
          <div className="value-line">
            <CircleDot size={18} />
            <span>Choose Mayur with more confidence</span>
          </div>
        </div>
      </section>

      <section className="content-section app-section">
        <div className="section-heading compact">
          <p className="section-kicker">Consumer experience</p>
          <h2>The app can grow into a wider route network.</h2>
          <p>पछि अरू बस रुट थपिँदा एप यात्रुका लागि अझ उपयोगी हुन्छ।</p>
        </div>

        <div className="showcase-copy app-points">
          <div className="mini-stat">
            <UsersRound size={20} />
            <span>Riders make decisions at the stop.</span>
          </div>
          <div className="mini-stat">
            <Route size={20} />
            <span>They compare ETAs and route direction.</span>
          </div>
          <div className="mini-stat">
            <ShieldCheck size={20} />
            <span>Mayur stays visible as more routes join later.</span>
          </div>
        </div>
      </section>

      <section id="rollout" className="content-section rollout-section">
        <div className="section-heading compact">
          <p className="section-kicker">Rollout plan</p>
          <h2>Add the first buses, then expand.</h2>
          <p>पहिले केही बस। त्यसपछि मयुरका थप बसहरू।</p>
        </div>

        <div className="rollout-list">
          {rollout.map((step, index) => (
            <div key={step} className="rollout-step">
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <p className="section-kicker">The proposal</p>
        <h2>Give riders a reason to wait for Mayur.</h2>
        <p>प्रविधि हामी सम्हाल्छौं। मयुरलाई दृश्यता मिल्छ।</p>
        <a href="mailto:hello@example.com" className="primary-button closing-button">
          Discuss rollout
          <ArrowRight size={17} />
        </a>
      </section>
    </main>
  );
}

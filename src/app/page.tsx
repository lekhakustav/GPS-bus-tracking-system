import {
  BusFront,
  CircleDot,
  Gauge,
  MapPin,
  Navigation,
  Power,
  Route,
  Signal,
} from "lucide-react";

const benefits = [
  {
    title: "Geofencing",
    nepali: "रुट क्षेत्र निगरानी",
    body: "Know when a bus leaves its allowed route area.",
    icon: MapPin,
  },
  {
    title: "Overspeed alerts",
    nepali: "गति चेतावनी",
    body: "Flag unsafe speed in real time.",
    icon: Gauge,
  },
  {
    title: "Ignition status",
    nepali: "इग्निसन स्थिति",
    body: "See when the vehicle is on or off.",
    icon: Power,
  },
  {
    title: "Route tracking",
    nepali: "रुट जानकारी",
    body: "Show route movement and route information.",
    icon: Route,
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
              d="M14 238 C78 214 98 152 153 144 C213 135 222 69 302 51"
              fill="none"
              stroke="rgba(255, 250, 241, 0.95)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 18"
              className="route-spark"
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
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Forever free GPS and passenger app.</h1>
            <p className="nepali-lede">मयुर बसका लागि सधैं निःशुल्क GPS र यात्रु एप।</p>
            <p className="hero-subcopy">
              We install it. We host it. Passengers see Mayur buses in the app.
            </p>
          </div>

          <div className="hero-visual">
            <AppPreview />
          </div>
        </div>
      </section>

      <section id="offer" className="content-section offer-section">
        <div className="section-heading">
          <h2>The four GPS features.</h2>
          <p>सरकारी आवश्यकताका ४ GPS सुविधा हामी तपाईंलाई निःशुल्क उपलब्ध गराउँछौं।</p>
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
          <h2>If passengers see the bus, they wait.</h2>
          <p className="nepali-support">
            बस देखियो भने यात्रु पर्खिन्छन्।
          </p>
        </div>

        <div className="value-panel">
          <div className="value-line">
            <CircleDot size={18} />
            <span>More daily customers</span>
          </div>
          <div className="value-line">
            <CircleDot size={18} />
            <span>More seats filled</span>
          </div>
          <div className="value-line">
            <CircleDot size={18} />
            <span>More people choosing Mayur</span>
          </div>
        </div>
      </section>

      <section className="content-section app-section">
        <div className="section-heading compact">
          <h2>
            All Mayur buses first.
          </h2>
          <p>
            We will add more buses to the passenger app over time. We will make it the only app passengers need to open to see the route.
          </p>
        </div>
      </section>

      <section className="closing-section">
        <h2>Give passengers a reason to wait for Mayur.</h2>
        <p>प्रविधि हामी सम्हाल्छौं। मयुरलाई दृश्यता मिल्छ।</p>
        <div className="origin-note">
          हाम्रो टोलीमा धुलिखेलका विद्यार्थीहरू छन्। उनीहरूलाई यस्तै एप चाहिएको थियो, त्यसैले हामीले यो बनायौं।
        </div>
      </section>
    </main>
  );
}

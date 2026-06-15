import {
  ArrowUpRight,
  BusFront,
  CheckCircle2,
  Clock3,
  Gauge,
  MapPin,
  Megaphone,
  Navigation,
  Route,
  Signal,
  TrendingDown,
  Users,
} from "lucide-react";

type BilingualCopy = {
  ne: string;
  en: string;
};

const appBuses = [
  {
    number: "MY-014",
    route: { ne: "कोटेश्वरदेखि बनेपा", en: "Koteshwor to Banepa" },
    eta: { ne: "६ मिनेट", en: "6 min" },
    x: "52%",
    y: "42%",
  },
  {
    number: "MY-022",
    route: { ne: "काठमाडौंदेखि भक्तपुर", en: "Kathmandu to Bhaktapur" },
    eta: { ne: "११ मिनेट", en: "11 min" },
    x: "31%",
    y: "64%",
  },
  {
    number: "MY-031",
    route: { ne: "बनेपादेखि काठमाडौं", en: "Banepa to Kathmandu" },
    eta: { ne: "१८ मिनेट", en: "18 min" },
    x: "73%",
    y: "32%",
  },
];

const gpsBasics = [
  {
    icon: MapPin,
    title: { ne: "रुट क्षेत्र निगरानी", en: "Route area monitoring" },
    body: { ne: "बस रुट बाहिर गयो कि भनेर देखिन्छ।", en: "You can see if a bus leaves the route area." },
  },
  {
    icon: Gauge,
    title: { ne: "गति चेतावनी", en: "Speed warning" },
    body: { ne: "बस धेरै छिटो चलेको तुरुन्तै थाहा हुन्छ।", en: "You know when a bus is going too fast." },
  },
  {
    icon: Route,
    title: { ne: "प्रत्यक्ष रुट ट्र्याकिङ", en: "Live route tracking" },
    body: { ne: "बस कहाँ छ र कता जाँदैछ देखिन्छ।", en: "You can see where the bus is and where it is going." },
  },
];

const mayurBenefits = [
  {
    title: { ne: "यात्रु पर्खिन्छन्", en: "Passengers wait" },
    body: { ne: "एपमा बस देखेपछि यात्रु अर्को बसमा हतारिँदैनन्।", en: "When riders see the bus, they do not rush to another bus." },
  },
  {
    title: { ne: "सिट भर्न सजिलो हुन्छ", en: "Seats are easier to fill" },
    body: { ne: "मयुर यात्रुको फोनमा देखिन्छ।", en: "Mayur appears on the passenger's phone." },
  },
  {
    title: { ne: "व्यवस्थापनलाई प्रमाण मिल्छ", en: "Managers get proof" },
    body: { ne: "रुट, गति, र चालक बानी रिपोर्टमा देखिन्छ।", en: "Routes, speed, and driver habits show up in reports." },
  },
];

const reportRows = [
  { label: { ne: "अधिक गति", en: "Overspeed" }, value: "14", tone: "amber" },
  { label: { ne: "आइडल मिनेट", en: "Idle minutes" }, value: "38", tone: "green" },
  { label: { ne: "रुट बाहिर", en: "Route exits" }, value: "3", tone: "ink" },
];

const heroRows = [
  {
    ne: "GPS को झन्झट हामी लिन्छौं।",
    en: "We take responsibility for the GPS work.",
  },
  {
    ne: "फाइदा मयुरलाई: यात्रु देख्छन्, व्यवस्थापकले रिपोर्ट पाउँछन्, शुल्क लाग्दैन।",
    en: "Mayur gets the benefit: passengers see the buses, managers get reports, and there is no fee.",
  },
  {
    ne: "जडान हामी गर्छौं।",
    en: "We install it.",
  },
  {
    ne: "होस्टिङ हामी सम्हाल्छौं।",
    en: "We host it.",
  },
  {
    ne: "सहयोग हामी दिन्छौं।",
    en: "We support it.",
  },
];

const finalCards = [
  {
    icon: Users,
    title: { ne: "महानगर यातायात पहिले नै जोडिएको छ।", en: "Mahanagar Yatayat is already on board." },
    body: { ne: "हामी धेरै यातायातलाई एउटै यात्रु एपमा ल्याउँदैछौं।", en: "We are bringing more operators into one passenger app." },
  },
  {
    icon: Megaphone,
    title: { ne: "खर्च साना विज्ञापनले धान्छ।", en: "Small ads cover our costs." },
    body: { ne: "मयुरले सेटअप वा होस्टिङ शुल्क तिर्नु पर्दैन।", en: "Mayur does not pay setup or hosting fees." },
  },
  {
    icon: CheckCircle2,
    title: { ne: "नतिजा मयुरलाई।", en: "Mayur gets the benefit." },
    body: { ne: "दृश्यता, GPS, रिपोर्ट, र यात्रुको भरोसा।", en: "Visibility, GPS, reports, and passenger trust." },
  },
];

function TextPair({ copy, className = "" }: { copy: BilingualCopy; className?: string }) {
  return (
    <div className={`text-pair ${className}`}>
      <p className="nepali-line">{copy.ne}</p>
      <p>{copy.en}</p>
    </div>
  );
}

function AppPreview() {
  return (
    <div className="phone-shell" aria-label="Passenger app preview showing live Mayur buses">
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
          <span>
            मयुर बस कहाँ छ?
            <small>Where is the Mayur bus?</small>
          </span>
        </div>

        <div className="mini-map">
          <svg viewBox="0 0 320 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path
              d="M14 238 C78 214 98 152 153 144 C213 135 222 69 302 51"
              fill="none"
              stroke="rgba(27, 82, 69, 0.12)"
              strokeWidth="32"
              strokeLinecap="round"
            />
            <path
              d="M14 238 C78 214 98 152 153 144 C213 135 222 69 302 51"
              fill="none"
              stroke="#1b5245"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="12 14"
              className="route-flow"
            />
            <path
              d="M36 82 C103 118 151 79 221 118 C260 140 276 187 306 216"
              fill="none"
              stroke="rgba(25, 36, 33, 0.11)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <span className="map-label map-label-left">काठमाडौं / Kathmandu</span>
          <span className="map-label map-label-right">बनेपा / Banepa</span>

          {appBuses.map((bus, index) => (
            <div
              key={bus.number}
              className="bus-pin"
              style={{ left: bus.x, top: bus.y, animationDelay: `${index * 0.55}s` }}
            >
              <span className="bus-pulse" />
              <span className="bus-dot">
                <Navigation size={12} />
              </span>
              <span className="bus-label">
                {bus.eta.ne} / {bus.eta.en}
              </span>
            </div>
          ))}
        </div>

        <div className="phone-sheet">
          <div className="sheet-handle" />
          <div className="phone-sheet-head">
            <TextPair copy={{ ne: "नजिकका मयुर बसहरू", en: "Nearby Mayur buses" }} />
            <span>प्रत्यक्ष / Live</span>
          </div>

          <div className="space-y-2">
            {appBuses.map((bus) => (
              <div key={bus.number} className="app-row">
                <div className="app-row-icon">
                  <BusFront size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-stone-950">{bus.number}</p>
                    <p className="shrink-0 text-sm font-semibold text-[#1b5245]">
                      {bus.eta.ne} / {bus.eta.en}
                    </p>
                  </div>
                  <p className="truncate text-[11px] text-stone-500">{bus.route.ne}</p>
                  <p className="truncate text-[11px] text-stone-500">{bus.route.en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function OperatorDashboard() {
  return (
    <div className="dashboard-card" aria-label="Simple operator report preview">
      <div className="dashboard-topline">
        <TextPair copy={{ ne: "मयुरको मासिक रिपोर्ट", en: "Monthly Mayur report" }} />
        <span>हरेक महिना / Monthly</span>
      </div>

      <div className="saving-panel">
        <TrendingDown size={22} />
        <TextPair
          copy={{
            ne: "चालकलाई प्रतिक्रिया दिँदा इन्धन प्रयोग औसतमा करिब ३% सुधार हुन सक्छ।",
            en: "Driver feedback can improve fuel economy about 3% on average.",
          }}
        />
      </div>

      <div className="report-grid">
        {reportRows.map((row) => (
          <div className={`report-cell ${row.tone}`} key={row.label.ne}>
            <span>{row.value}</span>
            <TextPair copy={row.label} />
          </div>
        ))}
      </div>

      <div className="route-card">
        <div>
          <TextPair copy={{ ne: "बनेपा रुट", en: "Banepa route" }} />
          <p>MY-014 / MY-022 / MY-031</p>
        </div>
        <div className="route-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="proposal-page">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="language-board" aria-label="Nepali and English overview">
              <div className="language-column nepali-column">
                <span className="column-label">नेपाली</span>
                {heroRows.map((row) => (
                  <p key={row.ne}>{row.ne}</p>
                ))}
              </div>
              <div className="language-column english-column">
                <span className="column-label">English</span>
                {heroRows.map((row) => (
                  <p key={row.en}>{row.en}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-stage">
              <AppPreview />
              <div className="mini-dashboard">
                <TextPair copy={{ ne: "यात्रुले बस देख्छन्।", en: "Passengers see the bus." }} />
                <div className="mini-meter"><span /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section page-panel">
        <div className="section-heading centered">
          <span className="page-label">१ / Page 1</span>
          <TextPair
            copy={{
              ne: "हाम्रा GPS devices ले तपाईंलाई तीन सुविधा दिन्छन्।",
              en: "Our GPS devices give you three features.",
            }}
            className="section-title"
          />
        </div>

        <div className="essentials-grid three">
          {gpsBasics.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title.ne} className="essential-card">
                <div className="card-icon">
                  <Icon size={20} />
                </div>
                <TextPair copy={item.title} className="card-title" />
                <TextPair copy={item.body} className="card-body" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="feature-band passenger-band page-panel">
        <div className="band-copy">
          <span className="page-label">२ / Page 2</span>
          <TextPair
            copy={{
              ne: "यात्रुले एपमा मयुर देख्छन्।",
              en: "Passengers see Mayur inside the app.",
            }}
            className="section-title"
          />
          <TextPair
            copy={{
              ne: "बस आउँदैछ भन्ने थाहा भयो भने यात्रु पर्खिन्छन्।",
              en: "When riders know the bus is coming, they wait.",
            }}
            className="quiet-copy"
          />
        </div>

        <div className="outcome-stack">
          {mayurBenefits.map((item) => (
            <div className="outcome-row" key={item.title.ne}>
              <ArrowUpRight size={20} />
              <div>
                <TextPair copy={item.title} className="outcome-title" />
                <TextPair copy={item.body} className="outcome-body" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-band data-band page-panel">
        <div className="band-copy">
          <span className="page-label">३ / Page 3</span>
          <TextPair
            copy={{
              ne: "हरेक महिना हामी data analysis report दिन्छौं।",
              en: "We provide a data analysis report every month.",
            }}
            className="section-title"
          />
          <TextPair
            copy={{
              ne: "कुन बस छिटो चल्यो, कहाँ धेरै रोकियो, र कुन रुटमा समस्या छ भनेर हामी देखाउँछौं।",
              en: "We show which bus went too fast, where it waited too long, and which route needs attention.",
            }}
            className="quiet-copy"
          />
        </div>

        <OperatorDashboard />
      </section>

      <section className="closing-section page-panel">
        <div className="section-heading centered">
          <span className="page-label">४ / Page 4</span>
          <TextPair
            copy={{
              ne: "खर्च र भरोसाको कुरा स्पष्ट।",
              en: "The cost and trust are clear.",
            }}
            className="section-title"
          />
        </div>

        <div className="closing-grid">
          {finalCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <article className={`closing-card ${index === 2 ? "accent-card" : ""}`} key={card.title.ne}>
                <div className="card-icon">
                  <Icon size={20} />
                </div>
                <TextPair copy={card.title} className="card-title" />
                <TextPair copy={card.body} className="card-body" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="final-note">
        <Clock3 size={22} />
        <TextPair
          copy={{
            ne: "अर्को कदम: एउटा सानो पाइलट सुरु गरौं। बाँकी जिम्मा हाम्रो।",
            en: "Next step: start a small pilot. We take responsibility for the rest.",
          }}
        />
      </section>
    </main>
  );
}

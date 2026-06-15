import {
  BarChart3,
  BusFront,
  CheckCircle2,
  Gauge,
  MapPin,
  Megaphone,
  Navigation,
  Route,
  ShieldCheck,
  Signal,
  Sparkles,
  TrendingDown,
  Users,
} from "lucide-react";

type BilingualCopy = {
  en: string;
  ne: string;
};

const appBuses = [
  {
    number: "MY-014",
    route: { en: "Koteshwor to Banepa", ne: "कोटेश्वरदेखि बनेपा" },
    eta: { en: "6 min", ne: "६ मिनेट" },
    x: "52%",
    y: "42%",
  },
  {
    number: "MY-022",
    route: { en: "Kathmandu to Bhaktapur", ne: "काठमाडौंदेखि भक्तपुर" },
    eta: { en: "11 min", ne: "११ मिनेट" },
    x: "31%",
    y: "64%",
  },
  {
    number: "MY-031",
    route: { en: "Banepa to Kathmandu", ne: "बनेपादेखि काठमाडौं" },
    eta: { en: "18 min", ne: "१८ मिनेट" },
    x: "73%",
    y: "32%",
  },
];

const essentials = [
  {
    title: { en: "Geofencing", ne: "रुट क्षेत्र निगरानी" },
    body: { en: "Know when a bus leaves its approved area.", ne: "बस स्वीकृत क्षेत्रबाट बाहिरिँदा थाहा पाउनुहोस्।" },
    icon: MapPin,
  },
  {
    title: { en: "Overspeed alerts", ne: "गति चेतावनी" },
    body: { en: "See unsafe speed as it happens.", ne: "असुरक्षित गति तुरुन्तै देख्नुहोस्।" },
    icon: Gauge,
  },
  {
    title: { en: "Route tracking", ne: "रुट ट्र्याकिङ" },
    body: { en: "Track live movement and route history.", ne: "प्रत्यक्ष बस चाल र पुरानो रुट विवरण हेर्नुहोस्।" },
    icon: Route,
  },
  {
    title: { en: "Cost reports", ne: "खर्च घटाउने रिपोर्ट" },
    body: { en: "Find fuel and driving habits to improve.", ne: "सुधार गर्नुपर्ने इन्धन र चालक बानी पत्ता लगाउनुहोस्।" },
    icon: BarChart3,
  },
];

const outcomes = [
  {
    title: { en: "Passengers wait", ne: "यात्रु पर्खिन्छन्" },
    body: { en: "They can see the bus coming.", ne: "उनीहरूले बस आउँदै गरेको देख्छन्।" },
  },
  {
    title: { en: "Seats fill faster", ne: "सिट छिटो भरिन्छ" },
    body: { en: "Mayur becomes easier to choose.", ne: "मयुर रोज्न सजिलो हुन्छ।" },
  },
  {
    title: { en: "Managers see proof", ne: "व्यवस्थापकले प्रमाण देख्छन्" },
    body: { en: "Reports show route and driver patterns.", ne: "रिपोर्टले रुट र चालक बानी देखाउँछ।" },
  },
];

const reportRows = [
  { label: { en: "Overspeed", ne: "अधिक गति" }, value: "14", tone: "amber" },
  { label: { en: "Idle minutes", ne: "आइडल मिनेट" }, value: "38", tone: "green" },
  { label: { en: "Route exits", ne: "रुट बाहिर" }, value: "3", tone: "ink" },
];

function TextPair({ copy, className = "" }: { copy: BilingualCopy; className?: string }) {
  return (
    <div className={`text-pair ${className}`}>
      <p>{copy.en}</p>
      <p className="nepali-line">{copy.ne}</p>
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
            Mayur bus near me
            <small>मेरो नजिकको मयुर बस</small>
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

          <span className="map-label map-label-left">Kathmandu / काठमाडौं</span>
          <span className="map-label map-label-right">Banepa / बनेपा</span>

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
                {bus.eta.en} / {bus.eta.ne}
              </span>
            </div>
          ))}
        </div>

        <div className="phone-sheet">
          <div className="sheet-handle" />
          <div className="phone-sheet-head">
            <TextPair copy={{ en: "Nearby Mayur buses", ne: "नजिकका मयुर बसहरू" }} />
            <span>Live / प्रत्यक्ष</span>
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
                      {bus.eta.en} / {bus.eta.ne}
                    </p>
                  </div>
                  <p className="truncate text-[11px] text-stone-500">{bus.route.en}</p>
                  <p className="truncate text-[11px] text-stone-500">{bus.route.ne}</p>
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
    <div className="dashboard-card" aria-label="Operator dashboard preview">
      <div className="dashboard-topline">
        <TextPair copy={{ en: "Mayur operations report", ne: "मयुर सञ्चालन रिपोर्ट" }} />
        <span>Today / आज</span>
      </div>

      <div className="saving-panel">
        <TrendingDown size={22} />
        <TextPair
          copy={{
            en: "Driver feedback can improve fuel economy about 3% on average.",
            ne: "चालक प्रतिक्रिया दिएपछि इन्धन प्रयोग औसतमा करिब ३% सुधार हुन सक्छ।",
          }}
        />
      </div>

      <div className="report-grid">
        {reportRows.map((row) => (
          <div className={`report-cell ${row.tone}`} key={row.label.en}>
            <span>{row.value}</span>
            <TextPair copy={row.label} />
          </div>
        ))}
      </div>

      <div className="route-card">
        <div>
          <TextPair copy={{ en: "Banepa route", ne: "बनेपा रुट" }} />
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
            <div className="hero-mark">
              <Sparkles size={16} />
              <TextPair copy={{ en: "Free for Mayur", ne: "मयुरका लागि निःशुल्क" }} />
            </div>
            <h1 className="hero-title">
              <span>Mayur buses, visible before they arrive.</span>
              <span className="nepali-line">बस आउनुअघि नै मयुर देखिने।</span>
            </h1>
            <TextPair
              copy={{
                en: "Free GPS setup, live passenger app, and operator reports.",
                ne: "निःशुल्क GPS जडान, प्रत्यक्ष यात्रु एप, र सञ्चालक रिपोर्ट।",
              }}
              className="hero-lede"
            />
          </div>

          <div className="hero-visual">
            <div className="visual-stage">
              <AppPreview />
              <div className="mini-dashboard">
                <TextPair copy={{ en: "Seats are easier to fill.", ne: "सिट भर्न सजिलो हुन्छ।" }} />
                <div className="mini-meter"><span /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section essentials-section">
        <div className="section-heading centered">
          <TextPair
            copy={{
              en: "The important things are clear.",
              ne: "मुख्य कुरा स्पष्ट छन्।",
            }}
            className="section-title"
          />
        </div>

        <div className="essentials-grid">
          {essentials.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title.en} className="essential-card">
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

      <section className="feature-band passenger-band">
        <div className="band-copy">
          <TextPair
            copy={{
              en: "If passengers can see Mayur, they wait for Mayur.",
              ne: "यात्रुले मयुर देखे भने, उनीहरू मयुर पर्खिन्छन्।",
            }}
            className="section-title"
          />
        </div>

        <div className="outcome-stack">
          {outcomes.map((item) => (
            <div className="outcome-row" key={item.title.en}>
              <CheckCircle2 size={20} />
              <div>
                <TextPair copy={item.title} className="outcome-title" />
                <TextPair copy={item.body} className="outcome-body" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="feature-band data-band">
        <div className="band-copy">
          <TextPair
            copy={{
              en: "The same GPS data can reduce operating waste.",
              ne: "उही GPS डेटाले सञ्चालनको अनावश्यक खर्च घटाउन सक्छ।",
            }}
            className="section-title"
          />
          <TextPair
            copy={{
              en: "We show speed, idling, route exits, and driver patterns.",
              ne: "हामी गति, आइडलिङ, रुट बाहिर गएको समय, र चालक बानी देखाउँछौं।",
            }}
            className="quiet-copy"
          />
        </div>

        <OperatorDashboard />
      </section>

      <section className="closing-grid">
        <article className="closing-card">
          <div className="card-icon">
            <Users size={20} />
          </div>
          <TextPair
            copy={{
              en: "Mahanagar Yatayat is already on board.",
              ne: "महानगर यातायात पहिले नै जोडिएको छ।",
            }}
            className="card-title"
          />
          <TextPair
            copy={{
              en: "We aim to bring many more operators into the same passenger app.",
              ne: "हामी धेरै सेवा प्रदायकहरूलाई यही यात्रु एपमा ल्याउने लक्ष्य राख्छौं।",
            }}
            className="card-body"
          />
        </article>

        <article className="closing-card">
          <div className="card-icon">
            <Megaphone size={20} />
          </div>
          <TextPair
            copy={{
              en: "Small in-app ads cover our costs.",
              ne: "एपभित्रका साना विज्ञापनले हाम्रो खर्च धान्छ।",
            }}
            className="card-title"
          />
          <TextPair
            copy={{
              en: "Mayur does not pay setup or hosting fees.",
              ne: "मयुरले सेटअप वा होस्टिङ शुल्क तिर्नु पर्दैन।",
            }}
            className="card-body"
          />
        </article>

        <article className="closing-card accent-card">
          <div className="card-icon">
            <ShieldCheck size={20} />
          </div>
          <TextPair
            copy={{
              en: "We handle the technology with care.",
              ne: "प्रविधि हामी ध्यानपूर्वक सम्हाल्छौं।",
            }}
            className="card-title"
          />
          <TextPair
            copy={{
              en: "Mayur gets visibility, compliance, and useful reports.",
              ne: "मयुरले दृश्यता, अनुपालन, र उपयोगी रिपोर्ट पाउँछ।",
            }}
            className="card-body"
          />
        </article>
      </section>
    </main>
  );
}

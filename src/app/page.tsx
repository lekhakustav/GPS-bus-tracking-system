import {
  BarChart3,
  BusFront,
  CircleDot,
  Gauge,
  MapPin,
  Megaphone,
  Navigation,
  Route,
  ShieldCheck,
  Signal,
  TrendingDown,
  Users,
  Wrench,
} from "lucide-react";

type BilingualCopy = {
  en: string;
  ne: string;
};

const features = [
  {
    title: {
      en: "Geofencing",
      ne: "रुट क्षेत्र निगरानी",
    },
    body: {
      en: "Know when a bus leaves its approved route area.",
      ne: "बस स्वीकृत रुट क्षेत्रबाट बाहिरिँदा थाहा पाउनुहोस्।",
    },
    icon: MapPin,
  },
  {
    title: {
      en: "Overspeed alerts",
      ne: "गति चेतावनी",
    },
    body: {
      en: "Flag unsafe speed in real time and coach drivers with evidence.",
      ne: "असुरक्षित गति तुरुन्तै देखाउनुहोस् र प्रमाणसहित चालकलाई सुधार गर्न सहयोग गर्नुहोस्।",
    },
    icon: Gauge,
  },
  {
    title: {
      en: "Route tracking",
      ne: "रुट ट्र्याकिङ",
    },
    body: {
      en: "See live movement, route history, and route coverage.",
      ne: "प्रत्यक्ष बस चाल, पुरानो रुट विवरण, र रुट कभरेज हेर्नुहोस्।",
    },
    icon: Route,
  },
  {
    title: {
      en: "Driving behavior analysis",
      ne: "चालक व्यवहार विश्लेषण",
    },
    body: {
      en: "Review speed, harsh braking, idling, and route habits to find cost-saving measures.",
      ne: "गति, अचानक ब्रेक, लामो आइडलिङ, र रुट बानी हेरेर खर्च घटाउने उपाय पत्ता लगाउनुहोस्।",
    },
    icon: BarChart3,
  },
];

const appBuses = [
  {
    number: "MY-014",
    route: {
      en: "Koteshwor to Banepa",
      ne: "कोटेश्वरदेखि बनेपा",
    },
    eta: {
      en: "6 min",
      ne: "६ मिनेट",
    },
    x: "52%",
    y: "42%",
  },
  {
    number: "MY-022",
    route: {
      en: "Kathmandu to Bhaktapur",
      ne: "काठमाडौंदेखि भक्तपुर",
    },
    eta: {
      en: "11 min",
      ne: "११ मिनेट",
    },
    x: "31%",
    y: "64%",
  },
  {
    number: "MY-031",
    route: {
      en: "Banepa to Kathmandu",
      ne: "बनेपादेखि काठमाडौं",
    },
    eta: {
      en: "18 min",
      ne: "१८ मिनेट",
    },
    x: "73%",
    y: "32%",
  },
];

const valueLines = [
  {
    en: "More passengers wait because they can see the bus coming.",
    ne: "बस आउँदै गरेको देखेपछि धेरै यात्रुहरू पर्खिन्छन्।",
  },
  {
    en: "More seats are filled because the app makes Mayur easier to choose.",
    ne: "एपले मयुर रोज्न सजिलो बनाउने भएकाले धेरै सिट भरिन्छन्।",
  },
  {
    en: "More route trust is built because arrival information is visible.",
    ne: "आगमन जानकारी देखिने भएकाले रुटप्रति विश्वास बढ्छ।",
  },
];

const analysisPoints = [
  {
    title: {
      en: "Fuel-saving coaching",
      ne: "इन्धन बचत गर्ने चालक सुझाव",
    },
    body: {
      en: "Driver feedback research shows fuel economy can improve by about 3% on average, and fuel-focused drivers may improve by about 10%.",
      ne: "चालकलाई नियमित प्रतिक्रिया दिँदा इन्धन प्रयोग औसतमा करिब ३% सुधार हुन सक्छ, र इन्धन बचतमा केन्द्रित चालकले करिब १०% सम्म सुधार गर्न सक्छन्।",
    },
    icon: TrendingDown,
  },
  {
    title: {
      en: "Idle-time reduction",
      ne: "अनावश्यक आइडलिङ घटाउने उपाय",
    },
    body: {
      en: "Reports can show when buses wait with the engine running so managers can reduce wasted fuel.",
      ne: "बस इन्जिन चालु राखेर कुरिरहेको समय रिपोर्टले देखाउँछ, जसले अनावश्यक इन्धन खर्च घटाउन मद्दत गर्छ।",
    },
    icon: Wrench,
  },
  {
    title: {
      en: "Safer driving records",
      ne: "सुरक्षित चालक रेकर्ड",
    },
    body: {
      en: "Overspeed, harsh braking, and route deviation summaries help managers reward safer driving and spot risk early.",
      ne: "अधिक गति, अचानक ब्रेक, र रुट विचलनको सारांशले सुरक्षित चालकलाई प्रोत्साहन गर्न र जोखिम छिटो देख्न मद्दत गर्छ।",
    },
    icon: ShieldCheck,
  },
];

const trustPoints = [
  {
    en: "Mahanagar Yatayat is already on board.",
    ne: "महानगर यातायात हामीसँग पहिले नै जोडिएको छ।",
  },
  {
    en: "We aim to bring many more operators into the same passenger app.",
    ne: "हामी धेरै यातायात सेवा प्रदायकहरूलाई यही यात्रु एपमा ल्याउने लक्ष्य राख्छौं।",
  },
  {
    en: "Mayur can be one of the first visible names passengers see every day.",
    ne: "यात्रुले दैनिक देख्ने पहिलो दृश्य नाममध्ये मयुर हुन सक्छ।",
  },
];

function TextPair({ copy, className = "" }: { copy: BilingualCopy; className?: string }) {
  return (
    <div className={`text-pair ${className}`}>
      <p>{copy.en}</p>
      <p className="nepali-line">{copy.ne}</p>
    </div>
  );
}

function HeroTitle({ copy }: { copy: BilingualCopy }) {
  return (
    <h1 className="hero-title">
      <span>{copy.en}</span>
      <span className="nepali-line">{copy.ne}</span>
    </h1>
  );
}

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

          <div className="absolute left-[8%] bottom-[14%] text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            Kathmandu / काठमाडौं
          </div>
          <div className="absolute right-[10%] top-[15%] text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-500">
            Banepa / बनेपा
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
              <span className="bus-label">
                {bus.eta.en} / {bus.eta.ne}
              </span>
            </div>
          ))}
        </div>

        <div className="phone-sheet">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-stone-300" />
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">
                Nearby Mayur Buses
              </p>
              <p className="text-xs text-stone-500">नजिकका मयुर बसहरू</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
              Live / प्रत्यक्ष
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
                    <p className="shrink-0 text-sm font-semibold text-[#1e4e42]">
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

export default function Home() {
  return (
    <main className="proposal-page">
      <section className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <HeroTitle
              copy={{
                en: "Free GPS compliance, passenger visibility, and operator analytics for Mayur.",
                ne: "मयुरका लागि निःशुल्क GPS अनुपालन, यात्रु दृश्यता, र सञ्चालक विश्लेषण।",
              }}
            />
            <TextPair
              copy={{
                en: "We install it, host it, and show Mayur buses inside a passenger app.",
                ne: "हामी जडान गर्छौं, होस्ट गर्छौं, र यात्रु एपभित्र मयुर बस देखाउँछौं।",
              }}
              className="hero-lede"
            />
            <TextPair
              copy={{
                en: "Mayur gets the required GPS tools, passengers get live bus visibility, and managers get data that can reduce operating costs.",
                ne: "मयुरले आवश्यक GPS उपकरण पाउँछ, यात्रुले प्रत्यक्ष बस दृश्यता पाउँछन्, र व्यवस्थापकले सञ्चालन खर्च घटाउन सक्ने डेटा पाउँछन्।",
              }}
              className="hero-subcopy"
            />
          </div>

          <div className="hero-visual">
            <AppPreview />
          </div>
        </div>
      </section>

      <section id="offer" className="content-section offer-section">
        <div className="section-heading">
          <TextPair
            copy={{
              en: "The GPS features Mayur needs, plus the data Mayur can use.",
              ne: "मयुरलाई चाहिने GPS सुविधा, साथै मयुरले प्रयोग गर्न सक्ने डेटा।",
            }}
            className="section-title"
          />
          <TextPair
            copy={{
              en: "We provide the core government-ready GPS functions for free and add practical reports for daily management.",
              ne: "हामी सरकारी आवश्यकताका मुख्य GPS सुविधा निःशुल्क दिन्छौं र दैनिक व्यवस्थापनका लागि उपयोगी रिपोर्ट थप्छौं।",
            }}
          />
        </div>

        <div className="benefit-grid">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title.en} className="benefit-card">
                <div className="benefit-icon">
                  <Icon size={21} />
                </div>
                <TextPair copy={item.title} className="card-title" />
                <TextPair copy={item.body} className="card-body" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-section split-section">
        <div>
          <TextPair
            copy={{
              en: "If passengers see the bus, they wait for the bus.",
              ne: "यात्रुले बस देखे भने उनीहरू बसको प्रतीक्षा गर्छन्।",
            }}
            className="section-title"
          />
          <TextPair
            copy={{
              en: "The passenger app gives Mayur visibility at the exact moment a rider is deciding which bus to take.",
              ne: "यात्रुले कुन बस चढ्ने निर्णय गरिरहेको बेला यात्रु एपले मयुरलाई देखिने बनाउँछ।",
            }}
          />
        </div>

        <div className="value-panel">
          {valueLines.map((line) => (
            <div className="value-line" key={line.en}>
              <CircleDot size={18} />
              <TextPair copy={line} />
            </div>
          ))}
        </div>
      </section>

      <section className="content-section insight-section">
        <div className="section-heading">
          <TextPair
            copy={{
              en: "We turn vehicle data into cost-cutting suggestions.",
              ne: "हामी सवारी डेटा खर्च घटाउने सुझावमा बदल्छौं।",
            }}
            className="section-title"
          />
          <TextPair
            copy={{
              en: "The goal is not only to track buses, but also to help Mayur spend less on fuel, reduce risk, and manage drivers with evidence.",
              ne: "लक्ष्य बस ट्र्याक गर्नु मात्र होइन, मयुरलाई इन्धन खर्च घटाउन, जोखिम कम गर्न, र प्रमाणसहित चालक व्यवस्थापन गर्न सहयोग गर्नु हो।",
            }}
          />
        </div>

        <div className="insight-grid">
          {analysisPoints.map((item) => {
            const Icon = item.icon;
            return (
              <article className="insight-card" key={item.title.en}>
                <div className="benefit-icon">
                  <Icon size={21} />
                </div>
                <TextPair copy={item.title} className="card-title" />
                <TextPair copy={item.body} className="card-body" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-section trust-section">
        <div className="section-heading compact">
          <TextPair
            copy={{
              en: "Mayur will not be alone in the network.",
              ne: "मयुर यो नेटवर्कमा एक्लो हुनेछैन।",
            }}
            className="section-title"
          />
          <TextPair
            copy={{
              en: "We are building one passenger app where riders can discover reliable public transport options across the valley.",
              ne: "हामी एउटै यात्रु एप बनाउँदैछौं, जहाँ यात्रुले उपत्यकाभरिका भरपर्दा सार्वजनिक यातायात विकल्प भेट्न सक्छन्।",
            }}
          />
        </div>

        <div className="trust-grid">
          {trustPoints.map((point) => (
            <div className="trust-card" key={point.en}>
              <Users size={20} />
              <TextPair copy={point} />
            </div>
          ))}
        </div>
      </section>

      <section className="content-section cost-section">
        <div className="cost-card">
          <div className="benefit-icon">
            <Megaphone size={21} />
          </div>
          <TextPair
            copy={{
              en: "The GPS and passenger app stay free because small ads in the app cover our costs.",
              ne: "एपभित्र देखिने साना विज्ञापनले हाम्रो खर्च धान्ने भएकाले GPS र यात्रु एप निःशुल्क रहन्छ।",
            }}
            className="section-title"
          />
          <TextPair
            copy={{
              en: "Passengers still get a clean app, Mayur does not pay setup or hosting fees, and our team can keep improving the service.",
              ne: "यात्रुले सफा एप पाउँछन्, मयुरले सेटअप वा होस्टिङ शुल्क तिर्नु पर्दैन, र हाम्रो टोलीले सेवा सुधार गर्दै लैजान सक्छ।",
            }}
          />
        </div>
      </section>

      <section className="closing-section">
        <TextPair
          copy={{
            en: "Give passengers a reason to wait for Mayur.",
            ne: "यात्रुलाई मयुरको प्रतीक्षा गर्ने कारण दिनुहोस्।",
          }}
          className="section-title"
        />
        <TextPair
          copy={{
            en: "We handle the technology, Mayur gets visibility, and passengers get confidence before the bus arrives.",
            ne: "प्रविधि हामी सम्हाल्छौं, मयुरलाई दृश्यता मिल्छ, र बस आउनुअघि यात्रुले भरोसा पाउँछन्।",
          }}
        />
        <div className="origin-note">
          <TextPair
            copy={{
              en: "Our team includes students from Dhulikhel who wanted this exact kind of app, so we built it.",
              ne: "हाम्रो टोलीमा धुलिखेलका विद्यार्थीहरू छन्, उनीहरूलाई यही प्रकारको एप चाहिएको थियो, त्यसैले हामीले यो बनायौं।",
            }}
          />
        </div>
      </section>
    </main>
  );
}

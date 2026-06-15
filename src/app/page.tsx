"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BusFront,
  CheckCircle2,
  Clock3,
  Gauge,
  Languages,
  MapPin,
  Megaphone,
  Navigation,
  Route,
  Signal,
  TrendingDown,
  Users,
  type LucideIcon,
} from "lucide-react";

type Lang = "ne" | "en";

type Copy = {
  ne: string;
  en: string;
};

type IconCopy = {
  icon: LucideIcon;
  title: Copy;
  body: Copy;
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

const heroRows: Copy[] = [
  {
    ne: "GPS को झन्झट हामी लिन्छौं।",
    en: "We take responsibility for the GPS work.",
  },
  {
    ne: "फाइदा मयुरलाई: यात्रु देख्छन्, व्यवस्थापकले रिपोर्ट पाउँछन्, शुल्क लाग्दैन।",
    en: "Mayur gets the benefit: passengers see the buses, managers get reports, and there is no fee.",
  },
];

const responsibilityRows: Copy[] = [
  { ne: "जडान हामी गर्छौं।", en: "We install it." },
  { ne: "होस्टिङ हामी सम्हाल्छौं।", en: "We host it." },
  { ne: "सहयोग हामी दिन्छौं।", en: "We support it." },
];

const gpsBasics: IconCopy[] = [
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

const mayurBenefits: Copy[] = [
  {
    ne: "यात्रु पर्खिन्छन्",
    en: "Passengers wait",
  },
  {
    ne: "सिट भर्न सजिलो हुन्छ",
    en: "Seats are easier to fill",
  },
  {
    ne: "व्यवस्थापनलाई प्रमाण मिल्छ",
    en: "Managers get proof",
  },
];

const mayurBenefitBodies: Copy[] = [
  {
    ne: "एपमा बस देखेपछि यात्रु अर्को बसमा हतारिँदैनन्।",
    en: "When riders see the bus, they do not rush to another bus.",
  },
  {
    ne: "मयुर यात्रुको फोनमा देखिन्छ।",
    en: "Mayur appears on the passenger's phone.",
  },
  {
    ne: "रुट, गति, र चालक बानी रिपोर्टमा देखिन्छ।",
    en: "Routes, speed, and driver habits show up in reports.",
  },
];

const reportRows = [
  { label: { ne: "अधिक गति", en: "Overspeed" }, value: "14", tone: "amber" },
  { label: { ne: "आइडल मिनेट", en: "Idle minutes" }, value: "38", tone: "green" },
  { label: { ne: "रुट बाहिर", en: "Route exits" }, value: "3", tone: "blue" },
];

const finalCards: IconCopy[] = [
  {
    icon: Users,
    title: { ne: "महानगर यातायात पहिले नै जोडिएको छ।", en: "Mahanagar Yatayat is already on board." },
    body: {
      ne: "हामी धेरै यातायातलाई एउटै यात्रु एपमा ल्याउँदैछौं।",
      en: "We are bringing more operators into one passenger app.",
    },
  },
  {
    icon: Megaphone,
    title: { ne: "खर्च साना विज्ञापनले धान्छ।", en: "Small ads cover our costs." },
    body: {
      ne: "एपमा साना विज्ञापन चल्छन्, त्यसैले मयुरले सेटअप वा होस्टिङ शुल्क तिर्नु पर्दैन।",
      en: "Small ads run inside the app, so Mayur does not pay setup or hosting fees.",
    },
  },
  {
    icon: CheckCircle2,
    title: { ne: "नतिजा मयुरलाई।", en: "Mayur gets the benefit." },
    body: {
      ne: "दृश्यता, GPS, रिपोर्ट, र यात्रुको भरोसा।",
      en: "Visibility, GPS, reports, and passenger trust.",
    },
  },
];

const pageNumbers: Record<Lang, string[]> = {
  ne: ["१", "२", "३", "४"],
  en: ["01", "02", "03", "04"],
};

const t = (copy: Copy, lang: Lang) => copy[lang];

function LanguageSwap({ children, lang }: { children: React.ReactNode; lang: Lang }) {
  return (
    <motion.div
      key={lang}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ index, lang }: { index: number; lang: Lang }) {
  return (
    <span className="page-label">
      {pageNumbers[lang][index - 1]} / {lang === "ne" ? "४" : "04"}
    </span>
  );
}

function AppPreview({ lang }: { lang: Lang }) {
  return (
    <div className="phone-shell" aria-label={t({ ne: "यात्रु एपको नमुना", en: "Passenger app preview" }, lang)}>
      <div className="phone-screen">
        <div className="phone-status">
          <span>9:41</span>
          <span className="signal-pill">
            <Signal size={12} />
            5G
          </span>
        </div>

        <div className="phone-search">
          <MapPin size={16} />
          <span>
            {t({ ne: "मयुर बस कहाँ छ?", en: "Where is the Mayur bus?" }, lang)}
            <small>{t({ ne: "नजिकको बस प्रत्यक्ष देखिन्छ", en: "Nearest bus appears live" }, lang)}</small>
          </span>
        </div>

        <div className="mini-map">
          <svg viewBox="0 0 320 300" className="route-svg" aria-hidden="true">
            <path
              d="M14 238 C78 214 98 152 153 144 C213 135 222 69 302 51"
              fill="none"
              stroke="rgba(5, 55, 45, 0.11)"
              strokeLinecap="round"
              strokeWidth="32"
            />
            <path
              d="M14 238 C78 214 98 152 153 144 C213 135 222 69 302 51"
              className="route-flow"
              fill="none"
              stroke="#073f35"
              strokeDasharray="12 14"
              strokeLinecap="round"
              strokeWidth="5"
            />
            <path
              d="M36 82 C103 118 151 79 221 118 C260 140 276 187 306 216"
              fill="none"
              stroke="rgba(25, 36, 33, 0.11)"
              strokeLinecap="round"
              strokeWidth="4"
            />
          </svg>

          <span className="map-label map-label-left">
            {t({ ne: "काठमाडौं", en: "Kathmandu" }, lang)}
          </span>
          <span className="map-label map-label-right">{t({ ne: "बनेपा", en: "Banepa" }, lang)}</span>

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
              <span className="bus-label">{t(bus.eta, lang)}</span>
            </div>
          ))}
        </div>

        <div className="phone-sheet">
          <div className="sheet-handle" />
          <div className="phone-sheet-head">
            <div>
              <strong>{t({ ne: "नजिकका मयुर बसहरू", en: "Nearby Mayur buses" }, lang)}</strong>
              <small>{t({ ne: "यात्रुले पर्खिने आधार", en: "Proof for riders to wait" }, lang)}</small>
            </div>
            <span>{t({ ne: "प्रत्यक्ष", en: "Live" }, lang)}</span>
          </div>

          <div className="app-list">
            {appBuses.map((bus) => (
              <div key={bus.number} className="app-row">
                <div className="app-row-icon">
                  <BusFront size={17} />
                </div>
                <div className="app-row-copy">
                  <div className="app-row-top">
                    <p>{bus.number}</p>
                    <strong>{t(bus.eta, lang)}</strong>
                  </div>
                  <span>{t(bus.route, lang)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="app-ad-card">{t({ ne: "सानो विज्ञापन क्षेत्र", en: "Small ad space" }, lang)}</div>
        </div>
      </div>
    </div>
  );
}

function OperatorDashboard({ lang }: { lang: Lang }) {
  return (
    <motion.div className="dashboard-card">
      <div className="dashboard-topline">
        <div>
          <strong>{t({ ne: "मयुरको मासिक रिपोर्ट", en: "Monthly Mayur report" }, lang)}</strong>
          <small>{t({ ne: "हरेक महिना", en: "Every month" }, lang)}</small>
        </div>
        <span>{t({ ne: "डाटा विश्लेषण", en: "Data analysis" }, lang)}</span>
      </div>

      <div className="saving-panel">
        <TrendingDown size={22} />
        <p>
          {t(
            {
              ne: "चालकलाई प्रतिक्रिया दिँदा इन्धन प्रयोग औसतमा करिब ३% सुधार हुन सक्छ।",
              en: "Driver feedback can improve fuel economy about 3% on average.",
            },
            lang,
          )}
        </p>
      </div>

      <div className="report-grid">
        {reportRows.map((row) => (
          <div className={`report-cell ${row.tone}`} key={row.label.ne}>
            <span>{row.value}</span>
            <p>{t(row.label, lang)}</p>
          </div>
        ))}
      </div>

      <div className="route-card">
        <div>
          <strong>{t({ ne: "बनेपा रुट", en: "Banepa route" }, lang)}</strong>
          <p>MY-014 / MY-022 / MY-031</p>
        </div>
        <div className="route-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ne");

  return (
    <main className="proposal-page">
      <button
        className="translate-toggle"
        onClick={() => setLang((current) => (current === "ne" ? "en" : "ne"))}
        type="button"
      >
        <Languages size={17} />
        <span>{lang === "ne" ? "English" : "नेपाली"}</span>
      </button>

      <div className="ambient-orb orb-one" aria-hidden="true" />
      <div className="ambient-orb orb-two" aria-hidden="true" />
      <div className="ambient-orb orb-three" aria-hidden="true" />

      <section className="hero-section">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="eyebrow">{t({ ne: "मयुर GPS प्रस्ताव", en: "Mayur GPS proposal" }, lang)}</span>
            <LanguageSwap lang={lang}>
              <h1>{t(heroRows[0], lang)}</h1>
              <p className="hero-lede">{t(heroRows[1], lang)}</p>
            </LanguageSwap>

            <div className="responsibility-list">
              {responsibilityRows.map((row, index) => (
                <motion.div
                  className="responsibility-chip"
                  initial={{ opacity: 0, y: 12 }}
                  key={row.ne}
                  transition={{ delay: 0.15 + index * 0.08, duration: 0.46, ease: "easeOut" }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <CheckCircle2 size={16} />
                  <span>{t(row, lang)}</span>
                </motion.div>
              ))}
            </div>

            <div className="pilot-proof">
              <span>{t({ ne: "पहिले नै प्रमाण", en: "Already proven" }, lang)}</span>
              <strong>{t({ ne: "महानगर यातायात जोडिएको छ", en: "Mahanagar Yatayat is on board" }, lang)}</strong>
            </div>
          </motion.div>

          <motion.div
            className="hero-visual"
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ delay: 0.08, duration: 0.8, ease: "easeOut" }}
          >
            <div className="visual-stage">
              <AppPreview lang={lang} />
              <div className="mini-dashboard">
                <strong>{t({ ne: "यात्रुले बस देख्छन्।", en: "Passengers see the bus." }, lang)}</strong>
                <p>{t({ ne: "अब पर्खिने कारण छ।", en: "Now they have a reason to wait." }, lang)}</p>
                <div className="mini-meter">
                  <span />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <motion.div className="section-heading centered">
          <SectionLabel index={1} lang={lang} />
          <LanguageSwap lang={lang}>
            <h2>{t({ ne: "हाम्रा GPS उपकरणले तपाईंलाई तीन सुविधा दिन्छन्।", en: "Our GPS devices give you three features." }, lang)}</h2>
          </LanguageSwap>
        </motion.div>

        <div className="essentials-grid">
          {gpsBasics.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                className="essential-card"
                key={item.title.ne}
                transition={{ duration: 0.22, ease: "easeOut" }}
                whileHover={{ y: -6 }}
              >
                <div className="card-icon">
                  <Icon size={20} />
                </div>
                <h3>{t(item.title, lang)}</h3>
                <p>{t(item.body, lang)}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="feature-band passenger-band">
        <motion.div className="band-copy">
          <SectionLabel index={2} lang={lang} />
          <LanguageSwap lang={lang}>
            <h2>{t({ ne: "यात्रुले एपमा मयुर देख्छन्।", en: "Passengers see Mayur inside the app." }, lang)}</h2>
            <p className="quiet-copy">
              {t(
                {
                  ne: "बस आउँदैछ भन्ने थाहा भयो भने यात्रु पर्खिन्छन्।",
                  en: "When riders know the bus is coming, they wait.",
                },
                lang,
              )}
            </p>
          </LanguageSwap>
        </motion.div>

        <div className="outcome-stack">
          {mayurBenefits.map((title, index) => (
            <motion.div
              className="outcome-row"
              key={title.ne}
              transition={{ duration: 0.22, ease: "easeOut" }}
              whileHover={{ x: 6 }}
            >
              <ArrowUpRight size={20} />
              <div>
                <h3>{t(title, lang)}</h3>
                <p>{t(mayurBenefitBodies[index], lang)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="feature-band data-band">
        <motion.div className="band-copy">
          <SectionLabel index={3} lang={lang} />
          <LanguageSwap lang={lang}>
            <h2>{t({ ne: "हरेक महिना हामी डाटा विश्लेषण रिपोर्ट दिन्छौं।", en: "We provide a data analysis report every month." }, lang)}</h2>
            <p className="quiet-copy">
              {t(
                {
                  ne: "कुन बस छिटो चल्यो, कहाँ धेरै रोकियो, र कुन रुटमा समस्या छ भनेर हामी देखाउँछौं।",
                  en: "We show which bus went too fast, where it waited too long, and which route needs attention.",
                },
                lang,
              )}
            </p>
          </LanguageSwap>
        </motion.div>

        <OperatorDashboard lang={lang} />
      </section>

      <section className="closing-section">
        <motion.div className="section-heading centered">
          <SectionLabel index={4} lang={lang} />
          <LanguageSwap lang={lang}>
            <h2>{t({ ne: "खर्च र भरोसाको कुरा स्पष्ट।", en: "The cost and trust are clear." }, lang)}</h2>
          </LanguageSwap>
        </motion.div>

        <div className="closing-grid">
          {finalCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.article
                className={`closing-card ${index === 2 ? "accent-card" : ""}`}
                key={card.title.ne}
                transition={{ duration: 0.22, ease: "easeOut" }}
                whileHover={{ y: -6 }}
              >
                <div className="card-icon">
                  <Icon size={20} />
                </div>
                <h3>{t(card.title, lang)}</h3>
                <p>{t(card.body, lang)}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="final-note">
        <Clock3 size={22} />
        <p>{t({ ne: "अर्को कदम: एउटा सानो पाइलट सुरु गरौं। बाँकी जिम्मा हाम्रो।", en: "Next step: start a small pilot. We take responsibility for the rest." }, lang)}</p>
      </section>
    </main>
  );
}

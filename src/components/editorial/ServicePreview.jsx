import {
  Check,
  ClipboardCheck,
  Coins,
  FileText,
  HeartPulse,
  Image,
  Mail,
  Megaphone,
  RotateCw,
  Scale,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";
import styles from "./Services.module.css";

const previews = {
  service0: {
    title: "Workflow automation",
    Icon: Workflow,
    steps: [
      [FileText, "Request"],
      [Sparkles, "Process"],
      [Send, "Notify"],
    ],
  },
  service1: { title: "Guided breathing", Icon: HeartPulse },
  service2: { title: "Financial planning", Icon: Scale },
  service3: { title: "Campaign performance", Icon: Megaphone },
  service4: { title: "Process improvement", Icon: ClipboardCheck },
  service5: { title: "Document review", Icon: FileText },
  service6: {
    title: "Employee onboarding",
    Icon: Users,
    rows: ["Welcome new hire", "Set up access", "Schedule check-in"],
  },
};

const channels = [
  [Image, "Social"],
  [Search, "Search"],
  [Mail, "Email"],
];

export default function ServicePreview({ slug }) {
  const { title, Icon, steps, rows } = previews[slug];

  return (
    <div className={styles.preview} data-service={slug} aria-hidden="true">
      <div className={styles.previewPanel}>
        <div className={styles.previewHeading}>
          <Icon size={18} />
          {title}
        </div>
        {steps && (
          <div className={styles.previewFlow}>
            {steps.map(([StepIcon, label]) => (
              <div key={label} className={styles.previewStep}>
                <StepIcon size={22} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        )}
        {rows && (
          <div className={styles.previewChecklist}>
            {rows.map((label, index) => (
              <div
                key={label}
                className={styles.previewRow}
                style={{ "--order": index }}
              >
                <span className={styles.previewCheck}>
                  <Check size={12} />
                </span>
                {label}
              </div>
            ))}
          </div>
        )}
        {slug === "service1" && (
          <div className={styles.previewBreathing}>
            <div className={styles.breathingRing}>
              <HeartPulse size={28} />
            </div>
            <span className={styles.breatheIn}>Breathe in</span>
            <span className={styles.breatheOut}>Breathe out</span>
          </div>
        )}
        {slug === "service2" && (
          <div className={styles.previewBalance}>
            <div className={styles.balancePivot} />
            <div className={styles.balanceBeam}>
              <span>
                <TrendingUp size={20} />
                Revenue
              </span>
              <span>
                <Coins size={20} />
                Costs
              </span>
            </div>
          </div>
        )}
        {slug === "service4" && (
          <div className={styles.previewCycle}>
            <div className={styles.cycleTrack}>
              <RotateCw size={28} />
            </div>
            <div className={styles.cycleLabels}>
              <span>Assess</span>
              <span>Redesign</span>
              <span>Measure</span>
            </div>
          </div>
        )}
        {slug === "service5" && (
          <div className={styles.previewDocument}>
            <div className={styles.documentPage}>
              <strong>Agreement</strong>
              <span>Scope of work</span>
              <span>Terms &amp; obligations</span>
              <span>Review notes</span>
            </div>
            <div className={styles.documentScan}>
              <Search size={16} />
            </div>
          </div>
        )}
        {slug === "service3" && (
          <>
            <div className={styles.chartLabel}>Audience reach</div>
            <div className={styles.previewChart}>
              {[24, 42, 38, 64, 72, 91].map((height, index) => (
                <span
                  key={height}
                  style={{ "--bar-height": height + "%", "--order": index }}
                />
              ))}
            </div>
            <div className={styles.previewChannels}>
              {channels.map(([ChannelIcon, label]) => (
                <span key={label}>
                  <ChannelIcon size={13} />
                  {label}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

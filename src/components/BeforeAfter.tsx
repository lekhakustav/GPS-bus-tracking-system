"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, TrendingUp, HelpCircle, Eye, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/components/TranslationContext";

export default function BeforeAfter() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  } as const;

  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        {/* BEFORE CARD */}
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-2xl p-6 md:p-8 border-red-500/10 hover:border-red-500/20 bg-gradient-to-br from-[#1A1A2E] via-[#1A1A2E] to-red-500/[0.02] transition-colors relative overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <h3 className="text-xl font-bold text-slate-300 font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {t("wtmBeforeTitle")}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1 uppercase tracking-wider">
              <AlertCircle size={10} />
              {t("wtmBeforeSub")}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-8">
            <p className="text-sm text-brand-muted">
              {t("wtmBeforeSub")}
            </p>
            <ul className="space-y-3">
              {[t("wtmBeforePoint1"), t("wtmBeforePoint2"), t("wtmBeforePoint3")].map((point, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-brand-muted">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 shrink-0">
                    <HelpCircle size={12} />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div className="p-4 rounded-xl bg-red-500/[0.03] border border-red-500/10 text-center text-sm font-medium text-red-300">
            {t("wtmBeforeFooter")}
          </div>
        </motion.div>

        {/* AFTER CARD */}
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-2xl p-6 md:p-8 border-brand-accent/20 hover:border-brand-accent/40 bg-gradient-to-br from-[#1A1A2E] via-[#1A1A2E] to-brand-accent/[0.03] transition-colors relative overflow-hidden"
        >
          {/* Glowing background hint */}
          <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
            <h3 className="text-xl font-bold text-brand-text font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
              {t("wtmAfterTitle")}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-accent/20 text-brand-accent border border-brand-accent/30 flex items-center gap-1 uppercase tracking-wider">
              <CheckCircle2 size={10} />
              {t("wtmAfterSub").replace(":", "")}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-8">
            <p className="text-sm text-brand-text font-medium">
              {t("wtmAfterSub")}
            </p>
            <ul className="space-y-3">
              {[t("wtmAfterPoint1"), t("wtmAfterPoint2"), t("wtmAfterPoint3")].map((point, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-brand-text">
                  <div className="w-5 h-5 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0">
                    <Eye size={12} />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div className="p-4 rounded-xl bg-brand-accent/10 border border-brand-accent/20 text-center text-sm font-semibold text-brand-accent">
            {t("wtmAfterFooter")}
          </div>
        </motion.div>
      </motion.div>

      {/* Main Income Message */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 p-6 rounded-2xl border border-brand-border bg-brand-card flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <h4 className="text-base font-bold text-brand-text font-display">
              {t("wtmMainMsg1")}
            </h4>
            <p className="text-xs text-brand-muted mt-0.5">
              {t("wtmMainMsg2")}
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-brand-muted flex items-center gap-2">
          <ShieldCheck size={14} className="text-brand-accent shrink-0" />
          <span>{t("wygNoUpfront")}</span>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, X } from "lucide-react";

/**
 * Support contact details shown in the consultation dialog.
 * These mirror what the About page shows via <GetInTouch />.
 */
export const SUPPORT_PHONE_DISPLAY = "+91 7207646868";
export const SUPPORT_PHONE_HREF = "+917207646868";
export const SUPPORT_EMAIL = "Support@remdi.in";

interface BookConsultationButtonProps {
  /** Classes for the trigger button, so it can match whatever CTA it replaces. */
  className?: string;
  /** Trigger label. */
  children?: React.ReactNode;
  /** Adds a hover scale to the trigger (used by the bottom CTA). */
  hoverScale?: number;
}

/**
 * "Book Consultation" call to action. Instead of sending people to an external
 * scheduling page, it opens a dialog with the support phone number and email.
 */
const BookConsultationButton = ({
  className,
  children = "Book Consultation",
  hoverScale,
}: BookConsultationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // The dialog is portalled to <body>, which can only happen after mount.
  const [isMounted, setIsMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => setIsMounted(true), []);

  // Close on Escape, and keep the page behind the dialog from scrolling.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    // Move focus into the dialog for keyboard and screen-reader users.
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  // Return focus to the trigger once the dialog closes.
  useEffect(() => {
    if (!isOpen) triggerRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  const Trigger = hoverScale ? motion.button : "button";
  const triggerMotionProps = hoverScale ? { whileHover: { scale: hoverScale } } : {};

  /**
   * Rendered through a portal on <body>. The program pages wrap these buttons in
   * animated framer-motion elements, and a transform on an ancestor makes
   * `position: fixed` resolve against that ancestor and traps z-index inside its
   * stacking context - which put the dialog behind the hero image and navbar.
   */
  const dialog = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-consultation-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            // Clicks inside must not reach the backdrop's close handler.
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-[var(--background-color-plain)] p-6 sm:p-8 shadow-2xl outline-none"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-[var(--text-color-dark)]/60 hover:bg-[var(--text-color-dark)]/10 hover:text-[var(--text-color-dark)] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h2
              id="book-consultation-title"
              className="pr-8 font-['Libre_Baskerville',serif] text-[24px] sm:text-[28px] font-bold text-[var(--text-color-dark)]"
            >
              Book a consultation
            </h2>
            <p className="mt-3 font-['DM_Sans',sans-serif] text-[15px] sm:text-[16px] leading-relaxed text-[var(--text-color-dark)]/80">
              Reach out to our team and we&apos;ll help you find the right programme
              for your health goals.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href={`tel:${SUPPORT_PHONE_HREF}`}
                className="flex items-center gap-4 rounded-xl border border-[#DEDEDE] bg-[var(--background-color-plain3)] p-4 transition-colors hover:border-[var(--text-color-light)] hover:bg-[var(--background-color-plain2)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--background-color-dark)]">
                  <Phone className="h-5 w-5 text-[var(--text-color-plain)]" />
                </span>
                <span className="min-w-0">
                  <span className="block font-['DM_Sans',sans-serif] text-[13px] uppercase tracking-wide text-[var(--text-color-dark)]/60">
                    Call us
                  </span>
                  <span className="block break-words font-['DM_Sans',sans-serif] text-[16px] font-semibold text-[var(--text-color-dark)]">
                    {SUPPORT_PHONE_DISPLAY}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="flex items-center gap-4 rounded-xl border border-[#DEDEDE] bg-[var(--background-color-plain3)] p-4 transition-colors hover:border-[var(--text-color-light)] hover:bg-[var(--background-color-plain2)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--background-color-dark)]">
                  <Mail className="h-5 w-5 text-[var(--text-color-plain)]" />
                </span>
                <span className="min-w-0">
                  <span className="block font-['DM_Sans',sans-serif] text-[13px] uppercase tracking-wide text-[var(--text-color-dark)]/60">
                    Email us
                  </span>
                  <span className="block break-words font-['DM_Sans',sans-serif] text-[16px] font-semibold text-[var(--text-color-dark)]">
                    {SUPPORT_EMAIL}
                  </span>
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <Trigger
        ref={triggerRef as any}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={className}
        {...triggerMotionProps}
      >
        {children}
      </Trigger>

      {isMounted && createPortal(dialog, document.body)}
    </>
  );
};

export default BookConsultationButton;

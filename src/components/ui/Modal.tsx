import { useEffect, useRef, type ReactNode, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { X } from "lucide-react";
import { FocusTrap } from "./FocusTrap";

/**
 * Modal/Dialog component following design system specifications
 */

export interface ModalProps {
  /** Open state */
  open: boolean;
  /** Close handler */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal content */
  children: ReactNode;
  /** Size */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  /** Show close button */
  showClose?: boolean;
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on Escape */
  closeOnEscape?: boolean;
  /** Prevent body scroll */
  preventScroll?: boolean;
  /** Custom className */
  className?: string;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
} as const;

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  showClose = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventScroll = true,
  className,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = preventScroll ? "hidden" : "";
      // Focus first focusable element
      setTimeout(() => {
        contentRef.current?.focus();
      }, 0);
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, preventScroll]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
      }
      if (e.key === "Tab") {
        // Focus trap handled by FocusTrap component
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, onClose]);

  // Click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <FocusTrap>
        <div
          ref={contentRef}
          tabIndex={-1}
          className={cn(
            "relative w-full bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)] rounded-lg shadow-[var(--shadow-2xl)] animate-scale-in",
            "focus:outline-none focus:ring-4 focus:ring-[var(--color-bg-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-border-focus)]",
            sizeStyles[size],
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
        >
          {(title || showClose) && (
            <div className="flex items-start justify-between gap-4 p-6 border-b border-[var(--color-border-primary)]">
              <div>
                {title && (
                  <h2 id="modal-title" className="font-display font-semibold text-[var(--color-text-primary)]">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {description}
                  </p>
                )}
              </div>
              {showClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-shrink-0 p-1.5 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </FocusTrap>
    </div>
  );
}

/**
 * Alert Dialog - for confirmations
 */
export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "destructive" | "primary";
  loading?: boolean;
}

export function AlertDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  variant = "primary",
  loading = false,
}: AlertDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={title} description={description} size="sm" showClose={false}>
      <p className="text-[var(--color-text-secondary)]">{description}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium rounded-sm bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border-primary)] hover:bg-[var(--color-bg-hover)] transition-colors disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-sm transition-colors disabled:opacity-50",
            variant === "destructive"
              ? "bg-[var(--color-error)] text-white hover:bg-[var(--color-error)]/90"
              : "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-primary)]/90"
          )}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Chargement...
            </span>
          ) : (
            confirmText
          )}
        </button>
      </div>
    </Modal>
  );
}
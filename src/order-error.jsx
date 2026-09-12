import { useEffect } from "react";
import "./order-error.css";

function OrderError({ onClose }) {
  useEffect(() => {
    const dismissTimer = window.setTimeout(() => {
      onClose?.();
    }, 1500);

    return () => window.clearTimeout(dismissTimer);
  }, [onClose]);

  return (
    <main className="order-error-page" aria-labelledby="order-error-title">
      <section className="order-error-card">
        <div className="order-error-content">
          <button
            type="button"
            className="order-error-icon"
            aria-label="অর্ডার ত্রুটি বন্ধ করুন"
            onClick={onClose}
          >
            <svg viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2L12 12M12 2L2 12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h1 id="order-error-title">দুঃখিত!</h1>
          <p>
            আপনার অর্ডারটি নিশ্চিত করা সম্ভব হয়নি।
            <br />
            অনুগ্রহ করে আবার চেষ্টা করুন।
          </p>
        </div>
      </section>
    </main>
  );
}

export default OrderError;

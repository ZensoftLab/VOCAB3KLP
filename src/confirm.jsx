import { useEffect } from "react";
import "./confirm.css";

function Confirm() {
  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      window.location.assign("/");
    }, 10000);

    return () => window.clearTimeout(redirectTimer);
  }, []);

  return (
    <main className="confirm-page" aria-labelledby="confirm-title">
      <section className="confirm-card">
        <div className="confirm-content">
          <div className="confirm-check" aria-hidden="true">
            <svg viewBox="0 0 14 10" fill="none">
              <path
                d="M1.5 5L5 8.5L12.5 1.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 id="confirm-title">অভিনন্দন!</h1>
          <p>
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
            <br />
            খুব শিগগিরই আপনার অর্ডারটি প্রসেস করা হবে।
          </p>
        </div>
      </section>
    </main>
  );
}

export default Confirm;

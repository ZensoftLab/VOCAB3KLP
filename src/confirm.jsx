import "./confirm.css";

function Confirm() {
  return (
    <main className="confirm-page" aria-labelledby="confirm-title">
      <section className="confirm-card">
        <div className="confirm-content">
          <button
            type="button"
            className="confirm-close"
            aria-label="সফলতার বার্তা বন্ধ করুন"
            onClick={() => window.location.assign("/")}
          >
            ×
          </button>
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

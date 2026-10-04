import logo from "./images/logo.png";

function Footer() {
  return (
    <footer
      className="
        footer-root
        box-border
        w-full
        border-t
        border-[rgba(255,255,255,0.13)]
        bg-[#040914]
        px-4
        pb-[20px]
        pt-[52px]
        sm:px-6
        lg:px-8
      "
    >
      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}
      <div
        className="
          mx-auto
          footer-grid
          flex
          w-full
          max-w-[1152px]
          flex-col
          justify-between
          gap-[48px]
          lg:flex-row
          lg:items-start
        "
      >
        {/* =================================================
            LEFT BRAND AREA
        ================================================= */}
        <div
          className="
            footer-mobile-left
            flex
            w-full
            flex-col
            items-start
            lg:w-[371.5px]
          "
        >
          {/* Logo + Brand */}
          <a
            href="#top"
            className="
              flex
              h-[55.19px]
              min-h-[44px]
              items-center
              gap-[10.4px]
              no-underline
            "
          >
            {/* Logo */}
            <img
              src={logo}
              alt="অক্সফোর্ড ৩০০০ ভোকাবুলারি সিস্টেম"
              className="
                h-[37.64px]
                w-[49.59px]
                shrink-0
                object-contain
              "
            />

            {/* Brand */}
            <div
              className="
                flex
                h-[31px]
                w-[148.97px]
                shrink-0
                flex-col
              "
            >
              {/* অক্সফোর্ড ৩০০০ */}
              <div
                className="
                  whitespace-nowrap
                  font-['Baloo_Da_2']
                  text-[15.36px]
                  font-bold
                  leading-[16.13px]
                  tracking-[-0.0312px]
                  text-white
                "
              >
                অক্সফোর্ড ৩০০০
              </div>

              {/* ভোকাবুলারি সিস্টেম */}
              <div
                className="
                  mt-[4px]
                  whitespace-nowrap
                  font-['Baloo_Da_2']
                  text-[11.36px]
                  font-semibold
                  leading-[11.93px]
                  tracking-[1.1786px]
                  text-[#E8B84E]
                "
              >
                ভোকাবুলারি সিস্টেম
              </div>
            </div>
          </a>

          {/* Description */}
          <p
            className="
    m-0
    mt-[8px]
    w-full
    max-w-[371.5px]
    footer-description
    whitespace-nowrap
    font-['Inter']
    text-[13.76px]
    font-normal
    leading-[23px]
    tracking-[-0.131688px]
    text-[#B2BFD0]
  "
          >
            বই + অ্যাপ + লার্নিং সাপোর্ট
          </p>
          <p className="footer-copyright-column">
            © 2026 English Commando. সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>

        {/* =================================================
            QUICK LINKS
        ================================================= */}
        <div
          className="
            footer-quick-links
            flex
            w-full
            flex-col
            items-start
          "
        >
          <h3 className="footer-column-heading">Quick Link</h3>
          <div className="footer-social-links" aria-label="Social media links">
            <a href="https://www.facebook.com/oxfordvocabbd" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#1877F2" d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v2H6v4h3v5h4v-5h3l1-4h-4V9c0-.67.33-1 1-1Z" /></svg>
            </a>
            <a href="https://www.youtube.com/@oxfordvocabbd" target="_blank" rel="noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#FF0000" d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.4.58A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.86.58 9.4.58 9.4.58s7.54 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.5v-7l6 3.5-6 3.5Z" /></svg>
            </a>
            <a href="https://www.instagram.com/oxfordvocab.bd/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="instagram-brand-gradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse"><stop stopColor="#FFDC80" /><stop offset="0.35" stopColor="#FCAF45" /><stop offset="0.65" stopColor="#F77737" /><stop offset="0.82" stopColor="#E1306C" /><stop offset="1" stopColor="#833AB4" /></linearGradient></defs><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="url(#instagram-brand-gradient)" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="url(#instagram-brand-gradient)" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" fill="#E1306C" /></svg>
            </a>
          </div>
          <div className="footer-developer-credit mt-4 flex-shrink-0 whitespace-nowrap">
            <div className="mt-0 flex items-center justify-start gap-2 text-xs text-slate-600">
              <span className="flex items-center gap-2">
                <span>Developed by</span>
                <a
                  href="https://www.zensoftlab.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline"
                >
                  <img
                    alt="Zen Soft Lab Logo"
                    className="h-6 w-6 object-contain"
                    src="https://zensoftlab.com/assets/bannerIMG1-TWn9bZCF.png"
                  />
                  <span>ZenSoft Lab</span>
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* =================================================
            LEGAL
        ================================================= */}
        <div
          className="
            footer-mobile-links
            flex
            w-full
            flex-col
            items-end
            text-right
            lg:w-[204.31px]
            lg:items-end
          "
        >
          <h3 className="footer-column-heading">Legal</h3>
          <a href="/#privacy-policy" className="footer-legal-link">Privacy Policy</a>
          <a href="tel:01924521442" className="footer-legal-link">কল করুন: 01924521442</a>
          <a href="#top" className="footer-legal-link">উপরে যান ↑</a>
        </div>
      </div>

    </footer>
  );
}

export default Footer;

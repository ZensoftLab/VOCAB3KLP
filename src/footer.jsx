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
        </div>

        {/* =================================================
            RIGHT SIDE
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
          {/* Phone */}
          <a
            href="tel:01924521442"
            className="
              flex
              h-[44px]
              min-h-[44px]
              items-center
              whitespace-nowrap
              no-underline
              transition-colors
              hover:text-white
            "
          >
            <span
              className="
                font-['Hind_Siliguri']
                text-[16px]
                font-normal
                leading-[27px]
                tracking-[-0.3125px]
                text-[#D0D9E6]
              "
            >
              কল করুন: 01924521442
            </span>
          </a>

          {/* Privacy Policy */}
          <a
            href="/privacy-policy"
            className="
              ml-0
              flex
              h-[44px]
              min-h-[44px]
              items-center
              whitespace-nowrap
              no-underline
              transition-colors
              hover:text-white
              lg:ml-[106px]
            "
          >
            <span
              className="
                font-['Hind_Siliguri']
                text-[16px]
                font-normal
                leading-[27px]
                tracking-[-0.3125px]
                text-[#D0D9E6]
              "
            >
              গোপনীয়তা
            </span>
          </a>

          {/* Back To Top */}
          <a
            href="#top"
            className="
              ml-0
              flex
              h-[44px]
              min-h-[44px]
              items-center
              gap-[6.4px]
              whitespace-nowrap
              no-underline
              transition-colors
              hover:text-white
              lg:ml-[86px]
            "
          >
            <span
              className="
                font-['Hind_Siliguri']
                text-[16px]
                font-normal
                leading-[27px]
                tracking-[-0.3125px]
                text-[#D0D9E6]
              "
            >
              উপরে যান
            </span>

            <svg
              width="17.59"
              height="17.59"
              viewBox="0 0 24 24"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M6 14L12 8L18 14"
                stroke="#D0D9E6"
                strokeWidth="0.88"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ===================================================== */}
      <div
        className="
          footer-mobile-copy
          mx-auto
          mt-[18px]
          w-full
          max-w-[1152px]
          border-t
          border-[rgba(255,255,255,0.13)]
          pt-[18px]
        "
      >
        <div className="flex flex-col gap-1 font-['Hind_Siliguri'] text-[11.4667px] font-normal leading-[19px] tracking-[0.0358334px] text-[#7F8DA2] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 English Commando. সর্বস্বত্ব সংরক্ষিত।</span>
          <span>
            Developed by{" "}
            <a
              href="https://zensoftlab.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#B2BFD0] no-underline transition-colors hover:text-white"
            >
              Zensoftlab.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

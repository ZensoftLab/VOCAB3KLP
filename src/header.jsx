import { useEffect, useRef } from "react";
import logo from "./images/logo.png";

function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeSection,
  scrollProgress,
}) {
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    const handleOutsidePointer = (event) => {
      if (!mobileMenuOpen) return;
      if (menuRef.current?.contains(event.target)) return;
      if (menuToggleRef.current?.contains(event.target)) return;
      setMobileMenuOpen(false);
    };

    const handleScroll = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mobileMenuOpen, setMobileMenuOpen]);

  return (
    <header className="mobile-header fixed left-0 right-0 top-0 z-[100] box-border flex h-[101px] min-h-[80px] w-full flex-col items-start border-b border-white/[0.09] bg-[#050B18] px-0 py-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      <div className="mobile-header-inner mx-auto flex h-[80px] min-h-[80px] w-full max-w-[1152px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-0">
        {/* Logo */}
        <a
          href="/"
          className="mobile-header-logo flex items-center gap-3"
          aria-label="হোমপেজ"
        >
          <div className="flex items-center gap-[10.4px]">
            <img
              src={logo}
              alt="Oxford 3000 logo"
              className="mobile-header-logo-image h-[37.64px] w-[49.59px] shrink-0 object-contain"
            />

            <div>
              <div className="mobile-header-title font-['Baloo_Da_2'] text-[15.36px] font-bold leading-[16.13px] tracking-[-0.03px] text-white">
                অক্সফোর্ড ৩০০০
              </div>

              <div className="mobile-header-subtitle whitespace-nowrap font-['Baloo_Da_2'] text-[11.36px] font-semibold leading-[11.93px] tracking-[1.18px] text-[#E8B84E]">
                ভোকাবুলারি সিস্টেম
              </div>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-header-nav hidden h-[46.94px] items-center gap-5 text-sm text-white/84">
          {[
            ["how-it-works", "কীভাবে কাজ করে"],
            ["book", "বই দেখুন"],
            ["package", "সম্পূর্ণ প্যাকেজ"],
            ["student-stories", "শিক্ষার্থীদের অভিজ্ঞতা"],
            ["android-app", "App দেখুন"],
            ["faq", "প্রশ্নোত্তর"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-menu-link flex h-11 items-center whitespace-nowrap rounded-md px-[5.6px] font-['Baloo_Da_2'] text-[13.12px] font-semibold leading-[22px] tracking-[-0.084px] transition ${
                activeSection === id
                  ? "bg-white/12 text-white"
                  : "hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile Order Button */}
        <a
          href="#order"
          onClick={() => setMobileMenuOpen(false)}
          className="mobile-header-control mobile-order-cta flex h-11 w-[118px] shrink-0 items-center justify-center gap-2 rounded-[12px] bg-[#E8B84E] font-['Baloo_Da_2'] text-[15px] font-semibold leading-5 text-[#071526] transition hover:brightness-105"
        >
          <span>অর্ডার করুন</span>
          <svg
            viewBox="0 0 20 20"
            className="mobile-cta-arrow h-[18px] w-[18px] shrink-0"
            aria-hidden="true"
          >
            <path
              d="M4 10h11M10.5 5.5 15 10l-4.5 4.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
            />
          </svg>
        </a>

        {/* Mobile Navigation Toggle */}
        <button
          ref={menuToggleRef}
          type="button"
          aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          className="mobile-header-control mr-2 flex h-[44px] w-[40px] shrink-0 items-center justify-center rounded-[12px] border border-white/25 bg-white/[0.06] text-white shadow-[0_8px_22px_rgba(232,184,78,0.34),0_0_0_1px_rgba(255,255,255,0.08)] transition hover:bg-white/[0.12]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </svg>
        </button>

        {/* Desktop Order Button */}
        <a
          href="#order"
          className="desktop-header-order hidden h-[46.938px] min-h-[46.4px] w-[242.047px] items-center justify-center gap-[8.8px] rounded-[12px] border border-[rgba(0,0,0,0)] bg-[#E8B84E] px-[18.4px] py-[12.48px] font-['Baloo_Da_2'] text-[15.2px] font-bold leading-[19px] tracking-[-0.325px] text-[#071526] transition hover:-translate-y-0.5 hover:brightness-105"
        >
          অর্ডার করুন
          <svg
            viewBox="0 0 20 20"
            className="mobile-cta-arrow h-4 w-4 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M4 10h11M10.5 5.5 15 10l-4.5 4.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </a>

        {/* Mobile Navigation */}
        <nav
          ref={menuRef}
          aria-hidden={!mobileMenuOpen}
          className={`mobile-header-menu fixed left-0 right-0 top-[80px] z-[110] flex max-h-[calc(100vh-80px)] flex-col gap-1 overflow-y-auto border-t border-white/10 bg-[#050811] p-4 text-sm text-white/85 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileMenuOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none invisible -translate-y-4 scale-95 opacity-0"
          }`}
        >
          {[
            ["#how-it-works", "কীভাবে কাজ করে"],
            ["#book", "বই দেখুন"],
            ["#package", "সম্পূর্ণ প্যাকেজ"],
            ["#student-stories", "শিক্ষার্থীদের অভিজ্ঞতা"],
            ["#android-app", "App দেখুন"],
            ["#faq", "প্রশ্নোত্তর"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={`nav-menu-link whitespace-nowrap rounded-lg px-3 py-3 font-medium transition ${
                activeSection === href.slice(1)
                  ? "bg-white/12 text-white"
                  : "hover:bg-white/10 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}

          <a
            href="#order"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 flex items-center justify-center rounded-xl bg-[#f8c94b] px-4 py-3 font-bold text-[#10172a]"
          >
            এখনই অর্ডার করুন
          </a>
        </nav>
      </div>

      {/* Scroll Progress */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-white/[0.08]"
        aria-hidden="true"
      >
        <span
          className="block h-full origin-left will-change-transform"
          style={{
            background:
              "linear-gradient(90deg, #f8c94b 0%, #f8c94b 68%, #62d9e4 68%, #62d9e4 100%)",
            transform: `scaleX(${Math.min(100, Math.max(0, scrollProgress)) / 100})`,
          }}
        />
      </div>
    </header>
  );
}

export default Header;

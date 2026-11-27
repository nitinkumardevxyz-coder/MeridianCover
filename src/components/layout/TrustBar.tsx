export function TrustBar() {
  const trustItems = [
    { metric: '99.4%', label: 'Partner Claim Settlement Ratio (FY25)' },
    { metric: '14,200+', label: 'Cashless Network Hospitals' },
    { metric: '6,800+', label: 'Cashless Motor Repair Garages' },
    { metric: '24/7', label: 'Dedicated Claims Assistance Desk' },
  ];

  return (
    <section
      aria-label="Trust metrics"
      className="bg-[#0B1F3A] text-white border-b border-[#163257]"
    >
      <div className="max-w-[1380px] mx-auto px-4 md:px-6 py-3 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="flex items-baseline gap-2.5 text-xs md:text-sm"
          >
            <span className="font-mono-num font-semibold text-[#10B981] shrink-0">
              {item.metric}
            </span>
            <span className="text-slate-200 leading-snug">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

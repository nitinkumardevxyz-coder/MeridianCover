import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { AdSlot } from '../components/ads/AdSlot';
import { SmartlinkButton } from '../components/ads/SmartlinkButton';
import { FaqAccordion } from '../components/common/FaqAccordion';
import { ResilientImage } from '../components/common/ResilientImage';
import { PageShell, TocLink } from '../components/layout/PageShell';
import { IMAGES, TRAVEL_HOME_FAQS } from '../data/insuranceContent';

const TOC_LINKS: TocLink[] = [
  { id: 'th-hero', label: 'Travel & Home Overview' },
  { id: 'th-tabs', label: 'Interactive Travel / Home Guide' },
  { id: 'th-coverage-table', label: 'Perils & Coverage Tables' },
  { id: 'th-checklists', label: 'Safety & Pre-Trip Checklists' },
  { id: 'th-faqs', label: 'Travel & Home FAQs' },
];

export function TravelHomeInsurancePage() {
  const [activeTab, setActiveTab] = useState<'travel' | 'home'>('travel');

  return (
    <PageShell pageSlug="travel-home" tocLinks={TOC_LINKS}>
      {/* Hero Section */}
      <section
        id="th-hero"
        className="bg-white border border-[#DDE5F0] rounded-2xl overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-center space-y-4">
            <p className="text-xs font-semibold text-[#0E9F6E]">
              Dual Property &amp; Mobility Protection
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B1F3A] tracking-tight text-balance">
              Protect Your Residence &amp; Global Trips Under Clear All-Risk Terms
            </h1>
            <p className="text-[15px] text-[#4B5D75] leading-relaxed">
              From Schengen-compliant international medical evacuation and baggage delay cover to structural reinstatement and contents protection for homeowners and tenants—compare limits and exclusions side by side.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <SmartlinkButton label="Compare Live Quotes" variant="primary" />
              <SmartlinkButton label="Unlock Best Rates" variant="outline" />
            </div>
          </div>
          <div className="lg:col-span-5 min-h-[240px]">
            <ResilientImage
              src={IMAGES.travelHome}
              alt="Modern family residence exterior at golden hour representing property and travel insurance security"
              className="w-full h-full object-cover"
              fallbackTitle="Home & Travel Protection"
            />
          </div>
        </div>
      </section>

      <AdSlot format="468x60" slotId="travel-home-hero-468x60" />

      {/* Dual-Tab Split Long-Form Guide */}
      <section id="th-tabs" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
              Deep-Dive Coverage Guide
            </h2>
            <p className="text-sm text-[#4B5D75] mt-1">
              Switch between International/Domestic Travel Insurance and Home Structure &amp; Contents Protection.
            </p>
          </div>
          <div
            role="tablist"
            aria-label="Select insurance guide section"
            className="inline-flex p-1 bg-white border border-[#DDE5F0] rounded-lg shrink-0"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'travel'}
              onClick={() => setActiveTab('travel')}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'travel'
                  ? 'bg-[#0B1F3A] text-white'
                  : 'text-[#4B5D75] hover:text-[#0B1F3A]'
              }`}
            >
              Travel Insurance
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'home'}
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-[#0B1F3A] text-white'
                  : 'text-[#4B5D75] hover:text-[#0B1F3A]'
              }`}
            >
              Home &amp; Contents Insurance
            </button>
          </div>
        </div>

        {activeTab === 'travel' ? (
          <div className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-5">
            <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
              International &amp; Domestic Travel Insurance Architecture
            </h3>
            <p className="text-[15px] text-[#334155] leading-relaxed">
              A single emergency appendectomy or air-ambulance transfer in North America, Western Europe, or Japan can exceed $85,000–$180,000 within 72 hours. Domestic health policies do not pay foreign hospitals directly, making travel medical insurance with cashless global TPA support indispensable.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-[#F4F7FB] rounded-lg p-4">
                <p className="font-display font-bold text-[#0B1F3A]">
                  Single-Trip vs. Multi-Trip
                </p>
                <p className="text-[#4B5D75] mt-1.5 leading-relaxed">
                  Frequent flyers taking 3+ international trips annually save 35%–45% with an Annual Multi-Trip policy (up to 45–60 days per trip).
                </p>
              </div>
              <div className="bg-[#F4F7FB] rounded-lg p-4">
                <p className="font-display font-bold text-[#0B1F3A]">
                  Medical Evacuation Ceiling
                </p>
                <p className="text-[#4B5D75] mt-1.5 leading-relaxed">
                  Target at least $100,000 medical cover ($250k–$500k for US/Canada) plus separate $100k+ emergency air evacuation and repatriation.
                </p>
              </div>
              <div className="bg-[#F4F7FB] rounded-lg p-4">
                <p className="font-display font-bold text-[#0B1F3A]">
                  Schengen &amp; Student Visas
                </p>
                <p className="text-[#4B5D75] mt-1.5 leading-relaxed">
                  Schengen embassies require minimum €30,000 ($50k) medical and repatriation coverage with zero deductible for visa approval.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#DDE5F0] rounded-xl p-6 md:p-8 space-y-5">
            <h3 className="font-display text-xl font-bold text-[#0B1F3A]">
              Home Structure, Contents &amp; Liability Insurance Architecture
            </h3>
            <p className="text-[15px] text-[#334155] leading-relaxed">
              Home insurance protects two distinct assets: the physical dwelling structure (insured on <strong>Reinstatement / Rebuild Value</strong>, excluding land price) and your movable household contents (appliances, electronics, furniture, and scheduled valuables). Even apartment tenants should maintain standalone Contents + Personal Liability coverage against fire, water leaks into downstairs units, and burglary.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-[#F4F7FB] rounded-lg p-4">
                <p className="font-display font-bold text-[#0B1F3A]">
                  Reinstatement vs. Market Value
                </p>
                <p className="text-[#4B5D75] mt-1.5 leading-relaxed">
                  Always insure structure for full local construction cost per sq. ft., not depreciated market value, to prevent under-insurance penalties.
                </p>
              </div>
              <div className="bg-[#F4F7FB] rounded-lg p-4">
                <p className="font-display font-bold text-[#0B1F3A]">
                  Alternative Living Expenses
                </p>
                <p className="text-[#4B5D75] mt-1.5 leading-relaxed">
                  Pays temporary hotel or rental accommodation for up to 12–24 months while a fire- or storm-damaged residence is rebuilt.
                </p>
              </div>
              <div className="bg-[#F4F7FB] rounded-lg p-4">
                <p className="font-display font-bold text-[#0B1F3A]">
                  Water &amp; Electrical Surge
                </p>
                <p className="text-[#4B5D75] mt-1.5 leading-relaxed">
                  Verify burst-pipe water damage and appliance electrical breakdown riders are endorsed alongside standard fire and lightning perils.
                </p>
              </div>
            </div>
          </div>
        )}

        <AdSlot format="300x250" slotId="travel-home-mid-300x250" />
      </section>

      {/* Coverage Tables */}
      <section id="th-coverage-table" className="space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
            Travel &amp; Home Peril Coverage Matrix
          </h2>
          <p className="text-sm text-[#4B5D75] mt-1">
            Typical coverage limits, deductibles, and documentation requirements across both lines.
          </p>
        </div>

        <div className="bg-white border border-[#DDE5F0] rounded-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[660px]">
            <thead>
              <tr className="bg-[#F4F7FB] border-b border-[#DDE5F0] text-xs font-semibold text-[#0B1F3A]">
                <th className="py-3.5 px-4">Insurance Line</th>
                <th className="py-3.5 px-4">Event / Peril Covered</th>
                <th className="py-3.5 px-4">Recommended Limit</th>
                <th className="py-3.5 px-4">Key Claim Document</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF2F7] text-sm text-[#4B5D75]">
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">Travel</td>
                <td className="py-3.5 px-4">Emergency Hospitalization &amp; Evacuation</td>
                <td className="py-3.5 px-4 font-mono-num">$100,000–$500,000</td>
                <td className="py-3.5 px-4">Hospital diagnosis + TPA pre-auth</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">Travel</td>
                <td className="py-3.5 px-4">Checked Baggage Loss / Flight Delay (&gt;6h)</td>
                <td className="py-3.5 px-4 font-mono-num">$1,500–$3,000</td>
                <td className="py-3.5 px-4">Airline PIR report &amp; delay letter</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">Travel</td>
                <td className="py-3.5 px-4">Trip Cancellation / Missed Connection</td>
                <td className="py-3.5 px-4 font-mono-num">100% Prepaid Cost</td>
                <td className="py-3.5 px-4">Non-refundable receipts + cause proof</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">Home</td>
                <td className="py-3.5 px-4">Fire, Lightning, Explosion &amp; Windstorm</td>
                <td className="py-3.5 px-4 font-mono-num">100% Rebuild Cost</td>
                <td className="py-3.5 px-4">Fire/weather report + contractor quote</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">Home</td>
                <td className="py-3.5 px-4">Burglary, Theft &amp; Electronics Damage</td>
                <td className="py-3.5 px-4 font-mono-num">$30,000–$150,000</td>
                <td className="py-3.5 px-4">Police report + purchase invoices/photos</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-[#0B1F3A]">Home</td>
                <td className="py-3.5 px-4">Third-Party Personal &amp; Visitor Liability</td>
                <td className="py-3.5 px-4 font-mono-num">$300,000–$500,000</td>
                <td className="py-3.5 px-4">Incident statement + legal notice</td>
              </tr>
            </tbody>
          </table>
        </div>

        <AdSlot format="728x90" slotId="travel-home-mid-728x90" />
        <AdSlot format="320x50" slotId="travel-home-mid-320x50" />
        <AdSlot format="native" slotId="travel-home-native" />
      </section>

      {/* Pre-Travel & Homeowner Safety Checklists */}
      <section id="th-checklists" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#DDE5F0] rounded-xl p-6 space-y-4">
          <h2 className="font-display text-xl font-bold text-[#0B1F3A]">
            Pre-Travel Insurance Checklist
          </h2>
          <ul className="space-y-2.5 text-sm text-[#334155]">
            {[
              'Buy policy on the same day you book flights to lock trip-cancellation eligibility.',
              'Declare pre-existing chronic conditions and add a PED emergency waiver if over 55.',
              'Confirm adventure sports coverage if skiing, scuba diving, or trekking above 3,000m.',
              'Store passport scan, visa copy, and 24/7 global assistance collect-call number offline.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2
                  className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <SmartlinkButton label="Compare Live Quotes" variant="primary" />
        </div>

        <div className="bg-white border border-[#DDE5F0] rounded-xl p-6 space-y-4">
          <h2 className="font-display text-xl font-bold text-[#0B1F3A]">
            Homeowner Protection Checklist
          </h2>
          <ul className="space-y-2.5 text-sm text-[#334155]">
            {[
              'Record a 3-minute video inventory of every room, serial number, and high-value item.',
              'Keep digital copies of appliance receipts and jewelry appraisals in cloud storage.',
              'Install smart water shut-off sensors and UL-listed smoke/CO detectors for discounts.',
              'Update structure rebuild limits every 3 years to reflect local labor and material inflation.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2
                  className="w-4 h-4 text-[#0E9F6E] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <SmartlinkButton
            label="Download Policy Checklist PDF"
            variant="outline"
          />
        </div>
      </section>

      <AdSlot format="468x60" slotId="travel-home-468x60" />
      <AdSlot format="300x250" slotId="travel-home-pre-faq-300x250" />

      {/* FAQs */}
      <section id="th-faqs" className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-[#0B1F3A]">
          Travel &amp; Home Insurance FAQs
        </h2>
        <FaqAccordion items={TRAVEL_HOME_FAQS} idPrefix="th-faq" />
      </section>
    </PageShell>
  );
}

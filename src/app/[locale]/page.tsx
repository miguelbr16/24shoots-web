import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { ScrollHero } from "@/components/ScrollHero";
import { Marquee } from "@/components/Marquee";
import { DifferentiatorSection } from "@/components/DifferentiatorSection";
import { SectorsBand } from "@/components/SectorsBand";
import { ProcessSteps } from "@/components/ProcessSteps";
import { PacksSection } from "@/components/PacksSection";
import { StatsStrip } from "@/components/StatsStrip";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeading, Button } from "@/components/ui";
import { getPortfolioCaseLabels } from "@/lib/portfolio-labels";
import {
  getFeaturedClients,
  getInstagramPosts,
  getPages,
  getPortfolio,
  getServices,
  getPacks,
  getSiteConfig,
} from "@/lib/content";
import { buildMetadata, buildOrganizationJsonLd } from "@/lib/seo";
import { getRoute, isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

const sectionFallback = (minHeight: string) =>
  function SectionFallback() {
    return <div className={`${minHeight} bg-transparent`} aria-hidden />;
  };

const PortfolioShowcase = dynamic(
  () =>
    import("@/components/PortfolioShowcase").then((m) => ({
      default: m.PortfolioShowcase,
    })),
  { loading: sectionFallback("min-h-[540px]") }
);

const BeforeAfterSection = dynamic(
  () =>
    import("@/components/BeforeAfterSection").then((m) => ({
      default: m.BeforeAfterSection,
    })),
  { loading: sectionFallback("min-h-[420px]") }
);

const InstagramGrid = dynamic(
  () =>
    import("@/components/InstagramGrid").then((m) => ({
      default: m.InstagramGrid,
    })),
  { loading: sectionFallback("min-h-[480px]") }
);

const ClientSocialProofSection = dynamic(
  () =>
    import("@/components/ClientSocialProofSection").then((m) => ({
      default: m.ClientSocialProofSection,
    })),
  { loading: sectionFallback("min-h-[640px]") }
);

const FaqSection = dynamic(
  () =>
    import("@/components/FaqSection").then((m) => ({
      default: m.FaqSection,
    })),
  { loading: sectionFallback("min-h-[320px]") }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const locale = localeParam as Locale;
  const site = getSiteConfig();
  return buildMetadata({ locale, description: site.description[locale] });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const site = getSiteConfig();
  const pages = getPages(locale);
  const services = getServices(locale);
  const packs = getPacks(locale);
  const portfolio = getPortfolio(locale).filter((p) => p.featured).slice(0, 3);
  const instagramPosts = getInstagramPosts(locale);
  const featuredClients = getFeaturedClients();
  const { home } = pages;

  const jsonLd = buildOrganizationJsonLd(locale);
  const instagramHandle = site.contact.instagram
    .replace(/https?:\/\/(www\.)?instagram\.com\//, "")
    .replace(/\/$/, "");

  const caseLabels = getPortfolioCaseLabels(pages.portfolio);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Gancho */}
      <ScrollHero
        locale={locale}
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        subtitle={home.hero.subtitle}
        description={home.hero.description}
        ctaPrimary={home.hero.ctaPrimary}
        ctaSecondary={home.hero.ctaSecondary}
        videoSrc={site.heroVideo}
        posterSrc={site.heroPoster}
      />
      <Marquee text={home.marqueeText} />
      <DifferentiatorSection
        eyebrow={home.differentiatorSection.eyebrow}
        title={home.differentiatorSection.title}
        subtitle={home.differentiatorSection.subtitle}
        contrast={home.differentiatorSection.contrast}
        pillars={home.differentiatorSection.pillars}
        media={home.differentiatorSection.media}
      />

      {/* 2. Mapa mental */}
      <SectorsBand
        title={home.sectorsSection.title}
        sectors={pages.portfolioCategories}
      />

      {/* 3. Prueba visual */}
      <section className="border-b border-border py-28 md:py-36">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeading
            title={home.portfolioSection.title}
            subtitle={home.portfolioSection.subtitle}
          />
          <PortfolioShowcase
            items={portfolio}
            featuredLabel={home.portfolioSection.featuredLabel}
            caseLabels={caseLabels}
            locale={locale}
          />
          <div className="mt-12 text-center">
            <Button href={getRoute(locale, "portfolio")} variant="secondary" showArrow>
              {pages.nav.portfolio}
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Catálogo */}
      <section className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
        <SectionHeading
          title={home.servicesSection.title}
          subtitle={home.servicesSection.subtitle}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} locale={locale} index={i} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href={getRoute(locale, "services")} variant="secondary" showArrow>
            {pages.nav.services}
          </Button>
        </div>
      </section>

      {/* 5. Cómo contratar */}
      <PacksSection
        locale={locale}
        title={home.packsSection.title}
        subtitle={home.packsSection.subtitle}
        quoteNote={home.packsSection.quoteNote}
        featuredBadge={home.packsSection.featuredBadge}
        ctaLabel={home.packsSection.ctaLabel}
        packs={packs}
      />
      <ProcessSteps
        title={home.processSection.title}
        subtitle={home.processSection.subtitle}
        steps={home.processSection.steps}
      />

      {/* 6. Calidad */}
      <BeforeAfterSection
        title={home.beforeAfterSection.title}
        subtitle={home.beforeAfterSection.subtitle}
        rawLabel={home.beforeAfterSection.rawLabel}
        editedLabel={home.beforeAfterSection.editedLabel}
        dragHint={home.beforeAfterSection.dragHint}
        image={home.beforeAfterSection.image}
      />
      <InstagramGrid
        title={home.instagramSection.title}
        subtitle={home.instagramSection.subtitle}
        handle={instagramHandle}
        profileUrl={site.contact.instagram}
        followLabel={home.instagramSection.followLabel}
        embedFallback={home.instagramSection.embedFallback}
        embedCta={home.instagramSection.embedCta}
        posts={instagramPosts}
      />
      <StatsStrip stats={home.statsSection} />

      {/* 7. Confianza social */}
      <ClientSocialProofSection
        locale={locale}
        clients={featuredClients}
        headline={home.clientsSection.headline}
        headlineAccent={home.clientsSection.headlineAccent}
        headlineBrand={home.clientsSection.headlineBrand}
        subline={home.clientsSection.subline}
        dragHint={home.clientsSection.dragHint}
        privacyNote={home.clientsSection.privacyNote}
        ctaLabel={home.clientsSection.ctaLabel}
        reviewsTitle={home.reviewsSection.title}
        reviewsSubtitle={home.reviewsSection.subtitle}
        reviews={home.reviewsSection.items}
      />

      {/* 8. Argumentos */}
      <section className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-32">
        <SectionHeading title={home.whySection.title} />
        <div className="grid gap-12 md:grid-cols-3">
          {home.whySection.items.map((item, i) => (
            <div key={item.title} className="border-t border-border pt-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-medium tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Fricción final */}
      <FaqSection
        title={home.faqSection.title}
        subtitle={home.faqSection.subtitle}
        items={home.faqSection.items}
      />

      {/* 10. Cierre */}
      <section className="border-t border-border bg-panel py-24 md:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent">
            24Shoots
          </p>
          <h2 className="mt-4 text-balance text-3xl font-light tracking-tight md:text-4xl">
            {home.ctaSection.title}
          </h2>
          <p className="mt-4 text-muted">{home.ctaSection.description}</p>
          <div className="mt-10">
            <Button href={getRoute(locale, "contact")} showArrow>
              {home.ctaSection.button}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

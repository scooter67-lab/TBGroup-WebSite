import SEO from '../components/ui/SEO';
import Hero from '../components/home/Hero';
import AboutSnippet from '../components/home/AboutSnippet';
import ServicesGrid from '../components/home/ServicesGrid';
import Benefits from '../components/home/Benefits';
import CasesPreview from '../components/home/CasesPreview';
import ReviewsPreview from '../components/home/ReviewsPreview';
import CtaBlock from '../components/home/CtaBlock';

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <AboutSnippet />
      <ServicesGrid />
      <Benefits />
      <CasesPreview />
      <ReviewsPreview />
      <CtaBlock />
    </>
  );
}

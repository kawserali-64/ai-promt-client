import HeroBanner from "@/components/Banner";
import CustomerReviews from "@/components/CustomerReviews";
import FeaturedPrompts from "@/components/FeaturedPrompts";
import PremiumBenefits from "@/components/PremiumBenefits";
import TopCreators from "@/components/TopCreators";
import TrendingPrompts from "@/components/TrendingPrompts";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedPrompts />
      <CustomerReviews />
      <WhyChooseUs />
      <TrendingPrompts />
      <TopCreators />
      <PremiumBenefits />
    </div>
  );
}

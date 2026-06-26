import HeroBanner from "@/components/Banner";
import FeaturedPrompts from "@/components/FeaturedPrompts";
import TopCreators from "@/components/TopCreators";
import TrendingPrompts from "@/components/TrendingPrompts";
import WhyChooseUs from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedPrompts /> 
       <TrendingPrompts />
      <WhyChooseUs />
      <TopCreators />
    </div>
  );
}

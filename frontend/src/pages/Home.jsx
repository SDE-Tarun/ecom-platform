import MixedAutoSlider from "../components/MixedAutoSlider";
import SubscriptionForm from "../components/SubscriptionForm";
import Features from "../components/Features";
import LatestCollections from "../components/LatestCollections";
import { motion } from "framer-motion";
import BestSeller from "../components/BestSeller";



const Home = () => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="home-page text-center"
		>
			<div className="container">
				<MixedAutoSlider  />

				<LatestCollections/>
				
				<BestSeller />
				
				<Features />

				<SubscriptionForm />
			</div>
		</motion.section>
	);
};

export default Home;

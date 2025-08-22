import { motion } from "framer-motion";
import HeaderDashed from "../components/HeaderDashed";
import mainImg from "../assets/about.jpg";
import SubscriptionForm from "../components/SubscriptionForm";
import DescribedImage from "../components/DescribedImage";

const About = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="about-page text-center py-3 pt-5"
		>
			<div className="container">
				<HeaderDashed head1="ABOUT" head2="MADE BY INDIA" classStyle="fw-normal fs-3" />

				<DescribedImage
					img={mainImg}
					imgTitle="MADE BY INDIA"
					styleInLarge="column-gap-xl-4"
					styleImg="col-xl-5"
					styleText="col-xl-6"
					sideText={
						<>
							<p>
								Welcome to a world where the vibrant culture of India is celebrated through every purchase. <strong>MADE BY INDIA</strong> is not just an e-commerce platform, it's a movement.
							</p>
							<p>
								Our mission is to bring prosperity to Indian products and producers by offering them a stage to showcase their creativity and talent. We promote Swadeshi products that are unique, authentic, and made with love.
							</p>
							<p>
								Our range includes apparel, electronics, books, games, jewellery, kids and baby products, sports goods, tools, and more.
								We believe in Indian creativity and entrepreneurship. We're not just selling products – we're creating global recognition for Indian goods.
							</p>
							<p>
								Many amazing Indian products don’t get the recognition they deserve. <strong>MADE BY INDIA</strong> aims to change that by making them available to every household.
							</p>

							{/* Vision section */}
							<div className="mission">
								<h4 className="my-3 mt-4 c-black">Our Mission</h4>
								<p className="mb-0">
									Our vision is to support local economies and ensure fair value for Indian producers. Every purchase helps uplift artisans, entrepreneurs, and small-scale manufacturers.
								</p>
								<p>
									We’re more than a platform – we’re a community that celebrates Indian creativity. Whether you want traditional clothing, home decor, or Indian snacks, we’ve got something for you.
								</p>
								<p>
									Each product comes with a story – a piece of Indian heritage. Support local, empower communities, and experience the magic of Made By India.
								</p>
							</div>
						</>
					}
				/>

				{/* Subscription form */}
				<SubscriptionForm />
			</div>
		</motion.div>
	);
};

export default About;

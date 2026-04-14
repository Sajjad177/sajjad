import Services from '@/components/Services/Services';
import AboutUs from '@/components/website/AboutUs';
import Banner from '@/components/website/Banner/Banner';
import Contact from '@/components/website/Contact/Contact';
import Experience from '@/components/website/Experience/Experience';
import Projects from '@/components/website/Projects/Projects';
import Skills from '@/components/website/Skills/Skills';

const MainPage = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <Contact />
    </div>
  );
};

export default MainPage;
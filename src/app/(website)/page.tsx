import AboutUs from '@/components/website/AboutUs';
import Banner from '@/components/website/Banner/Banner';
import Projects from '@/components/website/Projects/Projects';
import Skills from '@/components/website/Skills/Skills';

const MainPage = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Skills />
      <Projects />
    </div>
  );
};

export default MainPage;
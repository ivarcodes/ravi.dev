import Contact from "./Contact";
import Education from "./Education";
import Experience from "./Experience";
import Hero from "./Hero";
import Projects from "./Projects";
import Skills from "./Skills";
import Testimonials from "./Testimonials";

/**
 * `/` shows every section stacked. Experience and project cards link through to
 * their own detail routes (/experience/:slug, /projects/:slug); every section
 * also has its own route.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Testimonials />
      <Education />
      <Contact />
    </>
  );
}

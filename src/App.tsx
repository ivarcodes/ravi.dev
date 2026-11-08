import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { data } from "./data/portfolio";
import Contact from "./pages/Contact";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import ExperienceDetail from "./pages/ExperienceDetail";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Testimonials from "./pages/Testimonials";

export default function App() {
  // Document meta
  useEffect(() => {
    document.title = data.meta.title;
    const meta = document.getElementById("meta-description") as HTMLMetaElement | null;
    if (meta) meta.content = data.meta.description;
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experience">
            <Route index element={<Experience standalone />} />
            <Route path=":slug" element={<ExperienceDetail />} />
          </Route>
          <Route path="skills" element={<Skills />} />
          <Route path="projects">
            <Route index element={<Projects standalone />} />
            <Route path=":slug" element={<ProjectDetail />} />
          </Route>
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="education" element={<Education />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

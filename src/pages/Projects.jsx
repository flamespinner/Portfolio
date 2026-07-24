import ProjectGrid from "../components/ProjectGrid";
import Seo from "../components/Seo";

function Projects() {
  return (
    <div style={{ width: "100%", marginBottom: "2rem", padding: "1rem" }}>
      <Seo
        title="Projects"
        description="A look at Michael Wilke's projects: SQL Server ETL pipelines and Azure automation for enterprise reporting, and Calico Core, a full-stack player management platform for a 300+ member RedM community."
        path="/projects"
      />
      <h1 style={{
        textAlign: "center",
        fontSize: "2.5rem",
        fontWeight: "bold",
        marginBottom: "8px",
        background: "linear-gradient(135deg, #fdba74, #ea580c)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        My Projects
      </h1>
      <p style={{
        textAlign: "center",
        color: "#a8a29e",
        marginBottom: "32px",
        fontSize: "1rem"
      }}>
        From SQL pipelines to cowboy roleplay servers. Have a look around.
      </p>
      <ProjectGrid />
    </div>
  );
}

export default Projects;

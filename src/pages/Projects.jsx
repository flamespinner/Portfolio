import MagicBento from "../components/BentoGrid";

function Projects() {
  return (
    <div style={{ textAlign: "center", marginBottom: "2rem", padding: "1rem" }}>
      <h1 style={{ 
        color: "#2575d6", 
        fontSize: "2.5rem", 
        fontWeight: "bold", 
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
      }}>
        My Projects
      </h1>
      <MagicBento 
        textAutoHide={true}
        enableStars={true}
        enableSpotlight={true}
        enableBorderGlow={true}
        enableTilt={true}
        enableMagnetism={true}
        clickEffect={true}
        spotlightRadius={300}
        particleCount={12}
        glowColor="132, 0, 255"
      />
    </div>
  );
}

export default Projects;
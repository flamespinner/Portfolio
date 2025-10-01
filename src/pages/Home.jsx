import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import CodeWindow from "../components/CodeWindow"; // adjust path if needed


export default function PortfolioHomepage() {
  const LINE1 = "Hello! I'm Michael!";
  const LINE2 = "";

  const [typed1, setTyped1] = useState("");
  const [typed2, setTyped2] = useState("");
  const [showSplit, setShowSplit] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => setCursorOn((s) => !s), 500);
    return () => clearInterval(id);
  }, []);

  // Type Line 1, then Line 2, then show split layout
  useEffect(() => {
    let cancelled = false;

    const typeLine = async (text, setter, delay = 60) => {
      for (let i = 0; i <= text.length; i++) {
        if (cancelled) return;
        setter(text.slice(0, i));
        await new Promise((res) => setTimeout(res, delay));
      }
    };

    (async () => {
      await typeLine(LINE1, setTyped1, 100);
      await new Promise((res) => setTimeout(res, 300));;
      if (!cancelled) setShowSplit(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const mainStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Keep vertical centering
    boxSizing: "border-box",
    color: "#fff",
    width: "100%",
    overflowX: "hidden", // Prevent horizontal scrolling
  };

  const centerTextStyle = {
    textAlign: "center",
    fontSize: 48,
    lineHeight: 1.15,
    whiteSpace: "pre-wrap",
  };

  return (
    <main style={mainStyle}>
      {/* Phase 1/2: center typing */}
      {!showSplit && (
        <div style={centerTextStyle}>
          <div>
            <span>{typed1}</span>
            <span style={{ opacity: cursorOn ? 1 : 0 }}>|</span>
          </div>
          <div style={{ marginTop: 12 }}>
            <span>{typed2}</span>
            <span style={{ opacity: typed2 ? (cursorOn ? 1 : 0) : 0 }}>|</span>
          </div>
        </div>
      )}

      {/* Phase 3: split hero */}
      {showSplit && (
        <div style={{ width: "100%", maxWidth: "1200px", overflowX: "hidden"}}>
          {/* Main Hero Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              marginBottom: 60,
            }}
          >
            {/* LEFT: text block */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ flex: 1 }}
            >
              <h1 style={{ fontSize: 48, margin: 0, marginBottom: 12 }}>
                Hello! I'm Michael!
              </h1>
              <h2 style={{ fontSize: 26, margin: 0, marginBottom: 20, color: "#bfbfbf" }}>
                It's Nice to meet you
              </h2>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{ marginBottom: 20, color: "#9aa3b2" }}
              >
                <strong>Full-stack developer</strong> • Data & automation • tinkerer
              </motion.div>

              {/* Social icons */}
              <motion.div
                initial={{ x: -12, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                style={{ display: "flex", gap: 16, justifyContent: "left" }}
              >
                <a
                  href="https://github.com/flamespinner"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  style={{ color: "inherit" }}
                >
                  <FaGithub size={28} />
                </a>
                <a
                  href="https://linkedin.com/in/michaelwfwilke"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  style={{ color: "inherit" }}
                >
                  <FaLinkedin size={28} />
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT: graphic placeholder */}
            <motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ flex: 1, minHeight: 320 }}
            >
              <CodeWindow />
            </motion.div>
          </motion.div>

          {/* Light Teasers Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: 24,
              marginBottom: 40
            }}
          >
            {/* About Teaser */}
            <div
              style={{
                background: "rgba(26, 26, 26, 0.7)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                padding: 24,
                borderRadius: 12,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.background = "rgba(26, 26, 26, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.background = "rgba(26, 26, 26, 0.7)";
              }}
              onClick={() => window.location.href = "/aboutme"}
            >
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: 12 
              }}>
                <h3 style={{ fontSize: 18, margin: 0, color: "#fff" }}>
                  About Me
                </h3>
                <FaArrowRight size={14} style={{ color: "#666" }} />
              </div>
              <p style={{ 
                color: "#9aa3b2", 
                lineHeight: 1.5, 
                fontSize: 14,
                margin: 0
              }}>
                Full-stack developer with expertise in data engineering, automation, 
                and building scalable solutions from SQL pipelines to user interfaces.
              </p>
            </div>

            {/* Featured Project Teaser */}
            <div
              style={{
                background: "rgba(26, 26, 26, 0.7)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                padding: 24,
                borderRadius: 12,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.background = "rgba(26, 26, 26, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.background = "rgba(26, 26, 26, 0.7)";
              }}
              onClick={() => window.location.href = "/projects"}
            >
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: 12 
              }}>
                <h3 style={{ fontSize: 18, margin: 0, color: "#fff" }}>
                  Featured: Data Engineering
                </h3>
                <FaArrowRight size={14} style={{ color: "#666" }} />
              </div>
              <p style={{ 
                color: "#9aa3b2", 
                lineHeight: 1.5, 
                fontSize: 14,
                margin: 0,
                marginBottom: 12
              }}>
                SQL Server ETL pipelines with automated blob storage integration 
                for enterprise reporting systems.
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["MS SQL", "PowerShell", "Azure"].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "2px 6px",
                      background: "#2a2a2a",
                      borderRadius: "3px",
                      fontSize: "11px",
                      color: "#bfbfbf",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Teaser */}
            <div
              style={{
                background: "rgba(26, 26, 26, 0.7)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                padding: 24,
                borderRadius: 12,
                border: "1px solid rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.currentTarget.style.background = "rgba(26, 26, 26, 0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.background = "rgba(26, 26, 26, 0.7)";
              }}
              onClick={() => window.location.href = "/contact"}
            >
              <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center", 
                marginBottom: 12 
              }}>
                <h3 style={{ fontSize: 18, margin: 0, color: "#fff" }}>
                  Let's Connect
                </h3>
                <FaArrowRight size={14} style={{ color: "#666" }} />
              </div>
              <p style={{ 
                color: "#9aa3b2", 
                lineHeight: 1.5, 
                fontSize: 14,
                margin: 0
              }}>
                Want to collab on a project? Just want to say hi? 
                I'm always open to new opportunities and conversations.
              </p>
            </div>
          </motion.div>

          {/* Quick Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            style={{ 
              textAlign: "center", 
              color: "#666", 
              fontSize: 14 
            }}
          >
            <p>Explore my work • Learn about my background • Get in touch</p>
          </motion.div>
        </div>
      )}
    </main>
  );
}
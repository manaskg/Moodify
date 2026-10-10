import React from "react";
import BrandLogo from "../../shared/components/BrandLogo";
import UserProfileMenu from "../../shared/components/UserProfileMenu";
import { Link } from "react-router";
import "../style/navbar.scss";

export default function Navbar({ currentMood = "happy" }) {
  const getMoodBadge = (mood) => {
    switch (mood) {
      case "happy":
        return { label: "Happy", emoji: "😊" };
      case "sad":
        return { label: "Sad", emoji: "🌧️" };
      case "surprised":
        return { label: "Surprised", emoji: "⚡" };
      default:
        return { label: "Active", emoji: "✨" };
    }
  };

  const badge = getMoodBadge(currentMood);

  return (
    <header className="moodify-navbar">
      <div className="moodify-navbar__inner">
        {/* Left Column: Brand Logo + Segmented Nav Links */}
        <div className="moodify-navbar__left">
          <Link to="/" style={{ textDecoration: "none" }} className="navbar-brand-link">
            <BrandLogo size="md" />
          </Link>

          <nav className="moodify-navbar__nav-links">
            <Link to="/" className="nav-link">
              Overview
            </Link>
            <Link to="/detect" className="nav-link nav-link--active">
              Studio
            </Link>
          </nav>
        </div>

        {/* Center Column: Perfectly Symmetrical Mood Indicator */}
        <div className="moodify-navbar__center">
          <div className="mood-indicator-pill">
            <span className="mood-emoji">{badge.emoji}</span>
            <span className="mood-text">{badge.label} Vibe</span>
          </div>
        </div>

        {/* Right Column: User Profile Menu */}
        <div className="moodify-navbar__right">
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
}

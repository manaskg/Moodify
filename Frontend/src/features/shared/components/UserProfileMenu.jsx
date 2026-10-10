import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { User, SignOut, Play, CaretDown, House } from "@phosphor-icons/react";
import { useAuth } from "../../auth/hooks/useAuth";
import "./userProfileMenu.scss";

export default function UserProfileMenu({ showQuickSignOut = false }) {
  const { user, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!user) return null;

  const onLogout = async () => {
    setIsOpen(false);
    await handleLogout();
    navigate("/");
  };

  const displayName = user.username || user.email?.split("@")[0] || "User";

  return (
    <div className="user-profile-menu-container" ref={menuRef}>
      {/* Profile Tablet Trigger */}
      <button
        type="button"
        className={`user-profile-tablet ${isOpen ? "user-profile-tablet--open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="User profile account menu"
      >
        <div className="user-avatar">
          <User size={15} weight="bold" />
        </div>
        <span className="user-name">{displayName}</span>
        <CaretDown
          size={12}
          weight="bold"
          className={`caret-icon ${isOpen ? "caret-icon--rotated" : ""}`}
        />
      </button>

      {/* Optional quick sign out icon button */}
      {showQuickSignOut && (
        <button
          type="button"
          className="btn btn--secondary btn--sm btn--icon quick-signout-btn"
          onClick={onLogout}
          title="Sign out"
          aria-label="Sign out"
        >
          <SignOut size={17} />
        </button>
      )}

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="user-profile-dropdown" role="menu">
          <div className="dropdown-user-header">
            <div className="dropdown-avatar-wrap">
              <div className="dropdown-avatar">
                <User size={20} weight="bold" />
              </div>
              <div className="dropdown-user-meta">
                <span className="dropdown-username">{displayName}</span>
                {user.email && <span className="dropdown-email">{user.email}</span>}
              </div>
            </div>
          </div>

          <div className="dropdown-divider" />

          <div className="dropdown-links">
            {location.pathname === "/detect" ? (
              <Link
                to="/"
                className="dropdown-item"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <House size={16} className="item-icon" />
                <span>Overview Page</span>
              </Link>
            ) : (
              <Link
                to="/detect"
                className="dropdown-item"
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                <Play size={16} weight="fill" className="item-icon" />
                <span>Open Emotion Studio</span>
              </Link>
            )}
          </div>

          <div className="dropdown-divider" />

          <button
            type="button"
            className="dropdown-item dropdown-item--danger"
            role="menuitem"
            onClick={onLogout}
          >
            <SignOut size={16} weight="bold" className="item-icon" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

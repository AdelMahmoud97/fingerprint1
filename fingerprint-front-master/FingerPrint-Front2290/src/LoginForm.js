"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import * as Components from "./Components"
import { useLanguage } from "./contexts/LanguageContext"
import { FaUserGraduate, FaChalkboardTeacher, FaLock } from "react-icons/fa"
import "./styles.css"
import config from "./config";




function LoginForm() {
  const theme = {
    background: "#f6f5f7",
    text: "#333",
    container: "#fff",
    form: "#ffffff",
    title: "#1b2a49",
    inputBackground: "#f8f9fa",
    inputFocusBackground: "#fff",
    inputFocusBorder: "#3498db",
    button: "#1b2a49",
    buttonHover: "#2c3e50",
    buttonActive: "#0f1a29",
    buttonText: "#fff",
    link: "#3498db",
    linkHover: "#2980b9",
    ghostButton: "#fff",
    ghostButtonHover: "rgba(255, 255, 255, 0.2)",
    error: "#e74c3c",
  }

  const [signIn, setSignIn] = useState(true)
  const navigate = useNavigate()
  const { t, toggleLanguage, language } = useLanguage()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

  //   Static Admin Login
    if (email === "admin@example.com" && password === "admin123") {
      const staticAdmin = {
        userType: "Admin",
        email,
        name: "Admin User"
      }
      localStorage.setItem("user", JSON.stringify(staticAdmin))
      navigate("/admin-dashboard")
      setLoading(false)
      return
    }

    try {
const res = await fetch(`${config.BASE_URL}/api/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data?.message || t("Invalid credentials. Please try again."))
        setLoading(false)
        return
      }

      if (signIn && data.userType !== "Student") {
        setError(t("❌ This account is not a student."))
        setLoading(false)
        return
      }
      if (!signIn && data.userType !== "Doctor") {
        setError(t("❌ This account is not a doctor."))
        setLoading(false)
        return
      }

      localStorage.setItem("user", JSON.stringify(data))

      if (data.userType === "Student") navigate("/dashboard")
      else if (data.userType === "Doctor") navigate("/doctor-dashboard")
      else if (data.userType === "Admin") navigate("/admin-dashboard")
      else navigate("/")

    } catch (err) {
      console.error("Login error:", err)
      setError("❌ Server error. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="login-page">
        <Components.GlobalStyle />

        <div className="language-toggle-container">
          <button className="language-toggle-button" onClick={toggleLanguage}>
            🌐 {language === "english" ? "العربية" : "English"}
          </button>
        </div>

        <div className="university-logo">
          <h1>{t("Akhbar El-Youm Academy")}</h1>
        </div>

        <Components.Container>
          <Components.SignUpContainer signinIn={!signIn}>
            <Components.Form onSubmit={handleSubmit}>
              <Components.Title>{t("Doctor Login")}</Components.Title>
              <div className="form-icon">
                <FaChalkboardTeacher size={40} color="#1b2a49" />
              </div>
              <Components.InputGroup>
                <Components.InputIcon>
                  <FaChalkboardTeacher />
                </Components.InputIcon>
                <Components.Input
                  type="email"
                  placeholder={t("Email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Components.InputGroup>
              <Components.InputGroup>
                <Components.InputIcon>
                  <FaLock />
                </Components.InputIcon>
                <Components.Input
                  type="password"
                  placeholder={t("Password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Components.InputGroup>
              {error && <Components.ErrorMessage>{error}</Components.ErrorMessage>}
              <Components.ForgotPassword>{t("Forgot your password?")}</Components.ForgotPassword>
              <Components.Button disabled={loading}>{loading ? t("Signing In...") : t("Sign In")}</Components.Button>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form onSubmit={handleSubmit}>
              <Components.Title>{t("Login Form")}</Components.Title>
              <div className="form-icon">
                <FaUserGraduate size={40} color="#1b2a49" />
              </div>
              <Components.InputGroup>
                <Components.InputIcon>
                  <FaUserGraduate />
                </Components.InputIcon>
                <Components.Input
                  type="email"
                  placeholder={t("Email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Components.InputGroup>
              <Components.InputGroup>
                <Components.InputIcon>
                  <FaLock />
                </Components.InputIcon>
                <Components.Input
                  type="password"
                  placeholder={t("Password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Components.InputGroup>
              {error && <Components.ErrorMessage>{error}</Components.ErrorMessage>}
              <Components.ForgotPassword>{t("Forgot your password?")}</Components.ForgotPassword>
              <Components.Button disabled={loading}>{loading ? t("Signing In...") : t("Sign In")}</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title inOverlay>{t("Welcome Doctor!")}</Components.Title>
                <Components.Paragraph>{t("For Students, Sign In below")}</Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(true)}>{t("Student Login")}</Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title inOverlay>{t("Welcome Students!")}</Components.Title>
                <Components.Paragraph>{t("For Instructors, Sign In below")}</Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(false)}>{t("Instructor Login")}</Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>

        <div className="login-footer">
          <p>
            © {new Date().getFullYear()} {t("Akhbar El-Youm Academy")}. {t("All rights reserved")}.
          </p>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default LoginForm

import { useState } from "react";
import { AppProvider, useApp } from "./contexts/AppContext";
import { Navigation } from "./components/Navigation";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Dashboard } from "./pages/Dashboard";
import { CreateRequest } from "./pages/CreateRequest";
import { MyRequests } from "./pages/MyRequests";
import { AcceptedRequests } from "./pages/AcceptedRequests";
import { Chat } from "./pages/Chat";
import { UserProfile } from "./pages/UserProfile";

function AppContent() {
  const { user } = useApp();
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  // Show authentication pages if user is not logged in
  if (!user) {
    if (currentPage === "signup") {
      return <SignUp onNavigate={handleNavigate} />;
    }
    return <Login onNavigate={handleNavigate} />;
  }

  // Render the appropriate page based on currentPage
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "create-request":
        return <CreateRequest onNavigate={handleNavigate} />;
      case "my-requests":
        return <MyRequests onNavigate={handleNavigate} />;
      case "accepted-requests":
        return <AcceptedRequests onNavigate={handleNavigate} />;
      case "chat":
        return <Chat onNavigate={handleNavigate} />;
      case "profile":
        return <UserProfile />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
      <main>{renderPage()}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
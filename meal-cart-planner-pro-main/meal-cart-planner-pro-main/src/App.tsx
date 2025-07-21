  // src/App.tsx
  import { Toaster } from "@/components/ui/toaster";
  import { Toaster as Sonner } from "@/components/ui/sonner";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
  import { useEffect, useState } from "react";

  // Existing Pages
  import Index from "./pages/Index";
  import NotFound from "./pages/NotFound";
  import Login from "./pages/Login";
  import Welcome from "./pages/Welcome";
  import GroceryList from "./pages/GroceryList";
  import SavedLists from "./pages/SavedLists";
  import Profile from "./pages/Profile";

  // Meal Pages
  import Breakfast from "./pages/Breakfast";
  import Lunch from "./pages/Lunch";
  import Dinner from "./pages/Dinner";

  const queryClient = new QueryClient();

  const App = () => {
    const [userData, setUserData] = useState<{
      username: string;
      familySize: string;
      userId: number;
    } | null>(null);

    // Load from localStorage on mount
    useEffect(() => {
      const username = localStorage.getItem("username");
      const familySize = localStorage.getItem("familySize");
      const userId = localStorage.getItem("user_id");

      if (username && familySize && userId) {
        setUserData({
          username,
          familySize,
          userId: parseInt(userId),
        });
      }
    }, []);

    // ✅ Test Backend Connection
    useEffect(() => {
      fetch("http://localhost:5000/test_connection")
        .then((res) => res.text())
        .then((data) => console.log("✅ Backend connected:", data))
        .catch((err) => console.error("❌ Backend not connected:", err));
    }, []);

    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path="/login"
                element={
                  <Login
                    onLogin={(data: {
                      username: string;
                      familySize: string;
                      userId: number;
                    }) => setUserData(data)}
                  />
                }
              />
              <Route
                path="/welcome"
                element={
                  userData ? (
                    <Welcome user={userData.username} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/grocery-list"
                element={
                  userData ? (
                    <GroceryList username={userData.username} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/saved-lists"
                element={
                  userData ? (
                    <SavedLists />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  userData ? (
                    <Profile />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/breakfast" element={<Breakfast />} />
              <Route path="/lunch" element={<Lunch />} />
              <Route path="/dinner" element={<Dinner />} />
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  };

  export default App;

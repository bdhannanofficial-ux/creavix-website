import { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const Home     = lazy(() => import("@/pages/Home"));
const Team     = lazy(() => import("@/pages/Team"));
const Contact  = lazy(() => import("@/pages/Contact"));
const Blog     = lazy(() => import("@/pages/Blog"));
const Terms    = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/not-found"));

/* ─────────────────────────────────────────────────────────────────────────────
   Custom wouter location hook — uses history.replaceState for every internal
   navigation so the browser's history stack never grows inside the site.
   Result: pressing Back once from any page exits the site immediately.
───────────────────────────────────────────────────────────────────────────── */
function useReplaceLocation(): [string, (to: string) => void] {
  const [path, setPath] = useState(
    () => window.location.pathname + window.location.search
  );

  /* Listen for actual browser back/forward navigation */
  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname + window.location.search);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  /* Navigate via replaceState — no new history entry is created */
  const navigate = useCallback((to: string) => {
    const current = window.location.pathname + window.location.search;
    if (current === to) return;          // already here, no-op
    window.history.replaceState(null, "", to);
    setPath(to);
    /* Scroll to top on page change */
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return [path, navigate];
}

/* ─── Loading spinner shown while lazy page chunks download ─── */
function PageLoader() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "hsl(222 47% 5%)",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "3px solid rgba(6,182,212,0.2)",
          borderTopColor: "#06b6d4",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function AppRouter() {
  return (
    /* hook prop wires our custom location into every Link / useLocation call */
    <Router hook={useReplaceLocation}>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/"        component={Home} />
          <Route path="/team"    component={Team} />
          <Route path="/blog"    component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/terms"   component={Terms} />
          <Route                 component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Toaster />
            <AppRouter />
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

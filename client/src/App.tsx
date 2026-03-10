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
   Navigation strategy:
   - history.replaceState so the browser stack never grows inside the site
   - Custom event "cx-nav" broadcasts the change to EVERY hook instance
     (Link, Switch, Route all share the same window event bus)
   - Single popstate listener for real browser back/forward
   Result: Back button exits site in one press; all links navigate instantly
───────────────────────────────────────────────────────────────────────────── */
const NAV_EVENT = "cx-nav";

function getPath() {
  return window.location.pathname + window.location.search;
}

function useReplaceLocation(): [string, (to: string) => void] {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    /* Sync this instance whenever any navigate() call or back/forward fires */
    const sync = () => setPath(getPath());
    window.addEventListener(NAV_EVENT, sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener(NAV_EVENT, sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const navigate = useCallback((to: string) => {
    if (getPath() === to) return;
    /* Replace instead of push — no extra history entry created */
    window.history.replaceState(null, "", to);
    /* Broadcast to every hook instance (Switch, Route, Link, useLocation) */
    window.dispatchEvent(new Event(NAV_EVENT));
    /* Scroll to top on page change */
    window.scrollTo(0, 0);
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

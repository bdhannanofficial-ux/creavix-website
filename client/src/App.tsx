import { useState, useEffect, useCallback } from "react";
import { Router, Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

/* ── Eager imports — all pages bundled together, zero per-page chunk latency ── */
import Home     from "@/pages/Home";
import Team     from "@/pages/Team";
import Contact  from "@/pages/Contact";
import Blog     from "@/pages/Blog";
import Terms    from "@/pages/Terms";
import NotFound from "@/pages/not-found";

/* ─────────────────────────────────────────────────────────────────────────────
   Navigation strategy:
   - history.replaceState → browser stack never grows inside the site
   - Custom event "cx-nav" broadcasts to EVERY hook instance simultaneously
     (Link, Switch, Route all share the same window event bus)
   - popstate listener handles browser back/forward
   Result: Back button exits site in one press; all links navigate instantly
───────────────────────────────────────────────────────────────────────────── */
const NAV_EVENT = "cx-nav";

function getPath() {
  return window.location.pathname + window.location.search;
}

function useReplaceLocation(): [string, (to: string) => void] {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
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
    window.history.replaceState(null, "", to);
    window.dispatchEvent(new Event(NAV_EVENT));
    window.scrollTo(0, 0);
  }, []);

  return [path, navigate];
}

function AppRouter() {
  return (
    <Router hook={useReplaceLocation}>
      <Switch>
        <Route path="/"        component={Home} />
        <Route path="/team"    component={Team} />
        <Route path="/blog"    component={Blog} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms"   component={Terms} />
        <Route                 component={NotFound} />
      </Switch>
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

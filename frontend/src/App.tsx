import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import Wrapper from "./components/pageWrapper/appBar/Wrapper";
import PageWrapper from "./components/pageWrapper/PageWrapper";
import { useState } from "react";
import SearchPage from "./pages/SearchPage/Search";
import JobsPage from "./pages/jobs/JobsPage";
import AgentsPage from "./pages/agents/AgentsPage";
import LoadersPage from "./pages/loaders/LoadersPage";
import LLMsPage from "./pages/llms/LLMsPage";
import SchemasPage from "./pages/schemas/schemasPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  palette: {
    primary: {
      main: "#115293",
    },
    secondary: indigo,
    info: {
      main: "##2d46bc",
    },
    warning: {
      main: "#ffa726",
    },
  },
});

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Wrapper isDrawerOpen={isOpen} setDrawerOpen={setIsOpen}>
            <Routes>
              <Route>
                <Route
                  path="/search"
                  element={
                    <PageWrapper
                      pageTitle="Search"
                      isOpen={isOpen}
                      page={<SearchPage />}
                    />
                  }
                />
                <Route
                  path="/jobs"
                  element={
                    <PageWrapper
                      pageTitle="Jobs"
                      isOpen={isOpen}
                      page={<JobsPage />}
                    />
                  }
                />
                <Route
                  path="/agents"
                  element={
                    <PageWrapper
                      pageTitle="Agents"
                      isOpen={isOpen}
                      page={<AgentsPage />}
                    />
                  }
                />
                <Route
                  path="/loaders"
                  element={
                    <PageWrapper
                      pageTitle="Loaders"
                      isOpen={isOpen}
                      page={<LoadersPage />}
                    />
                  }
                />
                <Route
                  path="/llms"
                  element={
                    <PageWrapper
                      pageTitle="LLMs"
                      isOpen={isOpen}
                      page={<LLMsPage />}
                    />
                  }
                />
                <Route
                  path="/schemas"
                  element={
                    <PageWrapper
                      pageTitle="Schemas"
                      isOpen={isOpen}
                      page={<SchemasPage />}
                    />
                  }
                />
              </Route>
            </Routes>
          </Wrapper>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;

import React from "react";
import { AppBar, Toolbar, Button, Typography, CircularProgress } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { WelcomePage } from "./WelcomePage";
import { ItemsPage } from "./ItemsPage";
import { RealmAppProvider, useRealmApp } from "./RealmApp";
import { ThemeProvider } from "./Theme";
import { AppName } from "./AppName";
import { appId } from "../realm.json";
import SearchBar from "material-ui-search-bar";
import * as Realm from "realm-web";
import "./App.css";

export default function AppWithRealm() {
  return (
    <ThemeProvider>
      <RealmAppProvider appId={appId}>
        <App />
      </RealmAppProvider>
    </ThemeProvider>
  );
}

export const PageContext = React.createContext("home");
export const SearchContext = React.createContext();

function App() {
  const { currentUser, logOut, logIn } = useRealmApp();
  const [ page, setPage ] = React.useState("home");
  const [ searchTerm, setSearchTerm ] = React.useState();
  React.useEffect(() => {
    if (!currentUser) {
      logIn(Realm.Credentials.anonymous());
    }
  }, []);
  return (
    <PageContext.Provider value={{ page, setPage }}>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        <div className="App">
          {
            !currentUser
            ? <CircularProgress />
            : (<>
              <AppBar position="sticky">
                <Toolbar>
                  <AppName />
                  <div
                    style={{
                      paddingRight: "1em",
                      flex: 2,
                    }}
                  >
                    <SearchBar
                      value={searchTerm}
                      onChange={(newValue) => setSearchTerm(newValue)}
                      onRequestSearch={() => setSearchTerm(`${searchTerm}`)}
                    />
                  </div>
                  <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                  {currentUser.providerType !== "anon-user" ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={async () => {
                        await logOut();
                      }}
                    >
                      <Typography variant="button">Logout</Typography>
                    </Button>
                  ) : (
                    <AccountCircleIcon
                      fontSize="large"
                      style={{
                        paddingRight: "16px",
                        cursor: "pointer"
                      }}
                      onClick={() => setPage("profile")}
                    />
                  )}
                  </div>
                </Toolbar>
              </AppBar>
              {
                currentUser.providerType === "anon-user" && page === "profile"
                ? <WelcomePage />
                : <ItemsPage />
              }
            </>)
          }
        </div>
      </SearchContext.Provider>
    </PageContext.Provider>
  );
}
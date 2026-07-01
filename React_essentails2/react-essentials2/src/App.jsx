import "./App.css";
import Header from './Header';
import { UserMenu } from "./UserMenu";
import { NavigationBar } from "./NavigationBar";
import { Avatar } from "./Avatar";
import React from "react";
import { UserContext } from "./UserContext";



function App() {


  const user={
    name:"Akua Oduro",
    role:"admin",
    theme:"dark"
  };

  return (
    <UserContext value={user}>
      <div>
        <h1>Dashboard</h1>
        <Header/>
      </div>
    </UserContext>
  );
 
}

export default App;
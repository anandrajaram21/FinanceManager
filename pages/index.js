import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Home from "../components/Home";
import Transactions from "../components/Transactions";
import { useSession } from "next-auth/react";

function App() {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>Finance Manager</title>
      </Head>
      <Navbar />
      {status === "authenticated" ? <Transactions /> : <Home />}
    </>
  );
}

export default App;

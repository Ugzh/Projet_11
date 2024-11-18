import { Navbar } from "../components/Navbar";

export function ProfileErrorPage() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <h1>You need to be connected</h1>
        <a href="/sign-in">Click here to connect</a>
      </main>
    </>
  );
}

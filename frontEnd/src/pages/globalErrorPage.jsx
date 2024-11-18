import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer";

export function GlobalErrorPage() {
  return (
    <>
      <Navbar></Navbar>
      <main className="main">
        <h1>There are no data here</h1>
        <a href="/" className="error-link-page">
          Return to the homepage
        </a>
      </main>
      <Footer></Footer>
    </>
  );
}

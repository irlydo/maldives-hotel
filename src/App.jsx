import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Video,
  Header,
  Gallery,
  About,
  Contact,
  Admin,
  AdminPanel,
  Calendar,
  Checkout,
  Completion,
  Footer,
  AnimatedText
} from "../src/index.js";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Video />
              <AnimatedText />
              <main id="main">
                <section id="images">
                  <Gallery />
                </section>
                <hr />
                <About />
                <hr />
                <section id="book">
                  <Calendar />
                </section>
                <hr />
                <section id="contact">
                  <Contact />
                </section>
                <hr></hr>
              </main>
              <section id="footer">
                <Footer />
              </section>
            </>
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<Completion />} />
      </Routes>
    </>
  );
}

export default App;

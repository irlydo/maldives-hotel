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
} from "../src/index.js";

import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const elts = {
      text1: document.getElementById("text1"),
      text2: document.getElementById("text2"),
    };

    const texts = [
      "If",
      "You",
      "Like",
      "Sunshine",
      "Why not visit",
      "The Maldives?",
    ];

    const morphTime = 1;
    const cooldownTime = 0.25;

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    }

    function setMorph(fraction) {
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
      morph = 0;

      elts.text2.style.filter = "";
      elts.text2.style.opacity = "100%";

      elts.text1.style.filter = "";
      elts.text1.style.opacity = "0%";
    }

    function animate() {
      requestAnimationFrame(animate);

      let newTime = new Date();
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime - time) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }

        doMorph();
      } else {
        doCooldown();
      }
    }

    animate();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Video />
              <div className="make-space">
                <div id="container">
                  <span id="text1"></span>
                  <span id="text2"></span>
                </div>

                <svg id="filters">
                  <defs>
                    <filter id="threshold">
                      <feColorMatrix
                        in="SourceGraphic"
                        type="matrix"
                        values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
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

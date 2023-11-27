export default function About() {
  return (
    <>
      <section id="about">
        <h1 className="about-h1">Welcome to paradise!</h1>
        <p className='about-p'>
          Here are all of the features that our hotel has to offer, accompanied
          by images above.
        </p>
        <ul className="features">
          <li>
            <i className="fa-solid fa-water-ladder"></i> Heat-controlled pool
          </li>
          <li>
            <i className="fa-solid fa-hot-tub-person"></i> Luxury hot tub for 8
            people
          </li>
          <li>
            <i className="fa-solid fa-bell-concierge"></i> 24/7 Concierge
          </li>
          <li>
            <i className="fa-solid fa-toilet-paper"></i> Fresh and clean towels,
            provided every day
          </li>
          <li>
            <i className="fa-solid fa-computer"></i> Professional desktop
            computer
          </li>
          <li>
            <i className="fa-solid fa-cart-shopping"></i> On-site convenience
            store (300m)
          </li>
          <li> </li>
        </ul>
      </section>
    </>
  );
}

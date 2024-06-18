import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Products from './products';
const Nav=(homeSection)=>{
  return <nav>
    <h1 className='logo'>FurnitureHub</h1>
    <div className='navItems'>
      <a href={`${homeSection.homeSection ? '#home':"/furniturehub/"}`}>{homeSection.homeSection?"Home":"Back to Home"}</a>
      {homeSection.homeSection?<>
      <a href='#features'>Features</a>
      <a href='#products'>Products</a>
      <a href='#contact'>Contact</a>
      </>:<></>}
    </div>
  </nav>
}
const Hero=()=>{
  return <main id='home'>
    <div className='heroContainer'>
      <div className='heroDetailsContainer'>
        <h3>Live the season in your style with FurnitureHub</h3>
        <a href='#products'>Explore Now</a>
      </div>
      <img src='https://klbtheme.com/furnob/wp-content/uploads/2022/01/image-07.png' alt='heroImage'/>
    </div>
  </main>
}
const Features=()=>{
  const featuredlist = ["Home-office", "Livingroom","Bedroom", "Business", "Bathroom", "Dining", "Kitchen", "Outdoor"];
  const containerRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseDownX, setMouseDownX] = useState(0);

  const handleMouseDown = (event) => {
    if (event.button === 0) {
      setIsMouseDown(true);
      setMouseDownX(event.clientX);
    }
  };

  const handleMouseMove = (event) => {
    if (isMouseDown) {
      const container = containerRef.current;
      if (container) {
        container.scrollLeft += (mouseDownX - event.clientX);
        setMouseDownX(event.clientX);
      }
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };
  return <div className='featuresContainer' id='features'>
    <h2>Featured categories</h2>
    <div className='features horizontal-scroll' onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} ref={containerRef}>
        {featuredlist.map((name, index)=><div key={index} className='feature'>
          <img src={`assets/icons/${name}.png`} draggable="false"/><p>{name}</p>
        </div>
        )}
    </div>
  </div>
}
const FeaturedProducts=()=>{
  const thumbnails = ["sofas","doors", "chairs", "cots", "stands", "diningtables"];
  const prices = ["10,000 - 45,000", "4,500 - 7,500", "1,000 - 5,000", "15,000 - 50,000", "2,500 - 5,000", "3,000 - 6,000"];
  return <div className='featuredProductsContainer' id='products'>
    <h2>Explore the wide range of collection from us</h2>
    <p>Visit our shop to see amazing creations from our designers.</p>
    <div className='thumbnailsContainer'>
    {
      thumbnails.map((name,index)=><div key={index}>
        <img src={`assets/thumbnails/${name}.jpg`}/>
        <h3>{name.toUpperCase()}</h3>
        <p>Price : Rs {prices[index]}</p>
        <Link to={`/furniturehub/${name}`}>More {name}</Link>
      </div>)
    }
    </div>
  </div>
}
const Footer=()=>{
  return <footer id='contact'>
      <h2>Contact Us</h2>
      <p>Address</p>
      <a href="tel:+917659821377">Call us at +91 76598 21377</a>
  </footer>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/furniturehub' element={
      <>
      <Nav homeSection={true}/>
      <Hero/>
      <Features/>
      <FeaturedProducts/>
      <Footer/>
      </>
    }/>
    <Route path='/furniturehub/:product' element={<><Nav homeSection={false}/><Products/></>}/>
  </Routes>
  </BrowserRouter>
);

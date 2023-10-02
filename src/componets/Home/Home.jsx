import React, { useState } from 'react'
import './Home.css'
import Products from '../Products/Products'
import data from '../../productData'
import watch from '../../Watch'


function Home() {

	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [currentProduct, setCurrentProuduct] = useState(0);
	// An array of image URLs for the banner
	const pro = [data, watch];
	const bannerImages = [
		'https://storage.pixteller.com/designs/designs-images/2020-12-21/05/laptop-new-arrival-sales-banner-1-5fe0c47813869.png',
	  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1woczsXYZM9P1xsscXrJq5zB5KIYbnqpMSjkQVgth&s',
		'https://m.media-amazon.com/images/I/71U-Q+N7PXL._SX3000_.jpg',
		'https://img.freepik.com/free-vector/gradient-summer-sale-banner-template-with-photo_23-2148935972.jpg',
	  'https://img.freepik.com/free-psd/furniture-facebook-cover-web-banner-template_237398-274.jpg?w=1480&t=st=1691684932~exp=1691685532~hmac=177072198756a0d60a46f99ce96bd9c9b3d5ae91e1007391a01cab1d26676df4'
	  // Add more image URLs as needed
	];
  
	// Function to handle the image change
	const changeImage = (direction) => {
		let newIndex;
		let newpro;
		if (direction === 'previous') {
			newIndex = (currentImageIndex - 1 + bannerImages.length) % bannerImages.length;
			newpro = 0;
		} else if (direction === 'next') {
			newIndex = (currentImageIndex + 1) % bannerImages.length;
			newpro = 1;
			
		}
		setCurrentImageIndex(newIndex);
		setCurrentProuduct(newpro);
		console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh"+watch[0].rating)
	  };
	// setInterval(function () {
	// 	changeImage('next')
	//   }, 10000);
	  
	
  
  return (
      <div className='home'>
		  <div className='home__container'>
			  <div className="banner">
					<button onClick={() => changeImage('previous')} className="arrow-button previous">
						&lt;
					</button>
					<img className='home__image' src={bannerImages[currentImageIndex]}
						alt="home banner image"  />
					<button onClick={() => changeImage('next')} className="arrow-button next">
						&gt;
					</button>
			  </div>

			  <div className='home__rowContaner'>
				  {/* First Row */}
				  <div>
					  <div className="home__row">
				{pro[currentProduct]?.map((item, index) => {
					const { title, img, rating, price, id } = item;
					return (
						<>
							{index<=1&& (
								<Products
									key={id}
									title={title}
									img={img}
									rating={rating}
									price={price}
									id={id}
								/>
							)}
						</>
					);
				})}
			</div>
			{/* Second Row */}
			<div className="home__row">
				{pro[currentProduct]?.map((item, index) => {
					const { title, img, rating, price, id } = item;
					return (
						<>
							{index >= 2 && index <= 4 && (
								<Products
									key={id}
									title={title}
									img={img}
									rating={rating}
									price={price}
									id={id}
								/>
							)}
						</>
					);
				})}
			</div>
			{/* Thrid Row */}
			<div className="home__row">
				{pro[currentProduct]?.map((item, index) => {
					const { title, img, rating, price, id } = item;

					return (
						<>
							{index === 5 && (
								<Products
									key={id}
									title={title}
									img={img}
									rating={rating}
									price={price}
									id={id}
								/>
							)}
						</>
					);
				})}
			</div>
				  </div>
				  
			  </div>
			
          </div>
          
    </div>
  )
}

export default Home

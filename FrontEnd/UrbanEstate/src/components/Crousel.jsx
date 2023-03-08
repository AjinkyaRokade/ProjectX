import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';

const items = [
  {
    // src: '../images/123.jpg',
    src : "https://i.pinimg.com/originals/10/e5/85/10e585db9cf2a39893f5814982024404.jpg",
    //altText: 'Slide 1',
    //caption: 'Slide 1',
    key: 1,
  },
  {
    src: 'https://pngimg.com/d/building_PNG33.png',
    //altText: 'Slide 2',
    //caption: 'Slide 2',
    key: 2,
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR750JET2xMXKBICvC4aOxKD4zdcCYBFVFCQ-_o33llCsdBSp3hg6d3eN1vlLB8-8t9Tw&usqp=CAU',
    // altText: 'Slide 3',
    // caption: 'Slide 3',
    key: 3,
  }
  // ,
  // {
  //   src: {
  //     src: 'https://www.netmeds.com/images/cms/offers/1660147767_about.jpg',
  //     // altText: 'Slide 3',
  //     // caption: 'Slide 3',
  //     key: 4,
  //   },
    
    
  // },
];

function Crousel (args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
    
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Crousel;
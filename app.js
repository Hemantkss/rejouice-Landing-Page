function locomotiveScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveScroll();

function cursorAnimation() {
  var page1Content = document.querySelector("#page1-content");
  var cursor = document.querySelector("#cursor");

  // Move the cursor to the position of the mouse pointer while hovering over the page content.
  page1Content.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
      x: e.x,
      y: e.y,
      duration: 0.5,
    });
  });

  // Show the cursor when the mouse pointer enters the page content,
  page1Content.addEventListener("mouseenter", function (e) {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });

  // Hide the cursor when the mouse pointer leaves the page content.
  page1Content.addEventListener("mouseleave", function (e) {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorAnimation();

function pageTwoAnimation() {
  gsap.from("#header #left span, #header #right span, #contents div p", {
    y: 120,
    opacity: 0,
    stagger: 0.5,
    duration: 1,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      // markers : true,
      scrub: 2,
      start: "top 40%",
      end: "top 37%",
    },
  });
}
pageTwoAnimation();

function swiperJs() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
  });
}
swiperJs();

function pageAnimatiom() {
  var tl = gsap.timeline();

  tl.from("#loader h3", {
    x: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
  });

  tl.to("#loader h3", {
    x: -40,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
  });

  tl.to("#loader", {
    opacity: 0,
  });
  tl.from("#page1-content h1 span", {
    y: 120,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    delay: -1,
  });

  tl.from("#page3-top h2, #page3-top h4", {
    y: 150,
    opacity: 0,
    stagger: 0.5,
    duration: 1,
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main",
      // markers : true,
      scrub: 2,
      start: "top 60%",
      end: "top 37%",
    },
  });

  tl.from("#text h1, #text h3", {
    y: 120,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: -0.5,
    scrollTrigger: {
      trigger: "#page4",
      scroller: "#main",
      // markers : true,
      scrub: 2,
      start: "top 30%",
      end: "top 37%",
    }
  })

  tl.to("#loader", {
    display: "none",
  });
}
pageAnimatiom();

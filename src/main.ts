import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pages = gsap.utils.toArray('.page')

const pageScrollTween = gsap.to(pages, {
  xPercent: -100,
  stagger: 0.6,
  ease: 'none',
  scrollTrigger: {
    trigger: '.main-container',
    end: '+=550%',
    scrub: 1,
    pin: true,
    markers: false,
  },
})

/**
 * About
 */
const aboutMarquee = document.querySelector('.about__marquee')
const aboutContainer = document.querySelector('.about__container')
const aboutItems = document.querySelectorAll('.about__item')

gsap.set(aboutMarquee, { x: -10 })
gsap.to(aboutMarquee, {
  xPercent: -120,
  scrollTrigger: {
    containerAnimation: pageScrollTween,
    trigger: aboutMarquee,
    start: 'left left+=22%',
    scrub: 1,
    // markers: { startColor: 'hotpink', endColor: 'blue' },
  },
})

gsap.from(aboutItems, {
  y: -50,
  opacity: 0,
  duration: 1.5,
  ease: 'elastic',
  stagger: 0.1,
  scrollTrigger: {
    containerAnimation: pageScrollTween,
    trigger: aboutContainer,
    start: 'left left+=20%',
    toggleActions: 'play none none reverse',
    // markers: { startColor: 'pink', endColor: 'purple', indent: 40 },
  },
})

/**
 * Manifesto
 */
const manifestoMarquee = document.querySelector('.manifesto__marquee')
const manifestoItems = gsap.utils.toArray('.manifesto__item')

const tlManifesto = gsap.timeline({
  scrollTrigger: {
    containerAnimation: pageScrollTween,
    trigger: '#page__about',
    start: 'right 85%',
    end: 'right 70%',
    scrub: 1,
    markers: true,
  },
})

tlManifesto
  .fromTo(
    manifestoMarquee,
    {
      translateX: '100rem',
    },
    { opacity: 1, translateX: '-50rem' }
  )
  .fromTo(
    manifestoItems,
    {
      translateX: (index) => `${index * 30 + 130}rem`,
    },
    {
      stagger: {
        from: 'end',
        each: 0.1,
      },
      translateX: (index) => `-${(manifestoItems.length - index) * 10}rem`,
    },
    '<'
  )

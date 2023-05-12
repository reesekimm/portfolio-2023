import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

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
 * Landing
 */
const name = document.querySelector('.landing__name')
const { chars: nameChars } = new SplitType(name)
const tlName = gsap.timeline()

tlName.from(nameChars, {
  y: 100,
  rotateX: -90,
  opacity: 0,
  stagger: 0.05,
})

const roles = document.querySelectorAll('.role__item')
const tlRoles = gsap.timeline()

const duration = 0.5
const pause = 2

const stagger = duration + pause
const repeatDelay = stagger * (roles.length - 1) + pause

tlRoles
  .from(roles, {
    y: 90,
    duration: duration,
    opacity: 0,
    stagger: {
      each: stagger,
      repeat: -1,
      repeatDelay: repeatDelay,
    },
  })
  .to(
    roles,
    {
      y: -90,
      duration: duration,
      opacity: 0,
      stagger: {
        each: stagger,
        repeat: -1,
        repeatDelay: repeatDelay,
      },
    },
    stagger
  )

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

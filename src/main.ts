import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.set('.page', { position: 'absolute' })

gsap.to('.page', {
  xPercent: '-100',
  stagger: 0.8,
  scrollTrigger: {
    horizontal: true,
    trigger: '.main-container',
    markers: true,
    end: '+=550%',
    scrub: 1,
    pin: true,
  },
})

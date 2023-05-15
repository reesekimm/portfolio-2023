import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ProfileCard from './ProfileCard'

gsap.registerPlugin(ScrollTrigger)

const pages = gsap.utils.toArray('.page')

const pageScrollTween = gsap.to(pages, {
  xPercent: -100,
  stagger: 0.6,
  ease: 'none',
  scrollTrigger: {
    trigger: '.main-container',
    end: '+=550%',
    scrub: 0.5,
    pin: true,
  },
})

/**
 * Landing
 */
const name = document.querySelector('.landing__name')
const { chars: nameChars } = new SplitType(name as HTMLElement)
const intro = document.querySelector('.landing__introduction')
const tlName = gsap.timeline()

tlName
  .from(nameChars, {
    y: 100,
    rotateX: -90,
    opacity: 0,
    stagger: 0.05,
  })
  .to(intro, {
    '--x': '0',
    duration: 1,
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

gsap.set(aboutMarquee, { x: -100 })
gsap.to(aboutMarquee, {
  xPercent: -100,
  scrollTrigger: {
    containerAnimation: pageScrollTween,
    trigger: aboutMarquee,
    start: 'left left-=5%',
    end: 'left left-=55%',
    scrub: 0.5,
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

const cardContainer = document.querySelector<HTMLDivElement>('.about__card')

const renderProfileCard = () => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })

  const width = cardContainer.offsetWidth
  const height = cardContainer.offsetHeight

  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  cardContainer?.appendChild(renderer.domElement)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

  camera.position.z = 25

  const controls = new OrbitControls(camera, renderer.domElement)

  controls.autoRotate = true
  controls.autoRotateSpeed = 2.5
  controls.rotateSpeed = 0.75
  controls.enableDamping = true
  controls.enableZoom = false
  controls.minPolarAngle = Math.PI / 2 - Math.PI / 3
  controls.maxPolarAngle = Math.PI / 2 + Math.PI / 3

  const card = new ProfileCard({ width: 16, height: 22, radius: 0.5 })
  card.mesh.rotation.z = Math.PI * 0.05

  scene.add(card.mesh)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  ambientLight.position.set(-5, -5, -5)

  scene.add(ambientLight)

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.3)
  const directionalLight2 = directionalLight1.clone()

  directionalLight1.position.set(1, 1, 3)
  directionalLight2.position.set(-1, 1, -3)

  scene.add(directionalLight1, directionalLight2)

  function render() {
    requestAnimationFrame(render)
    controls.update()
    renderer.render(scene, camera)
  }

  render()

  function handleResize() {
    const cardContainer = document.querySelector<HTMLDivElement>('.about__card')
    const width = cardContainer?.offsetWidth
    const height = cardContainer?.offsetHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.render(scene, camera)
  }

  window.addEventListener('resize', handleResize)
}

window.addEventListener('load', renderProfileCard)

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
    { translateX: '-50rem' }
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

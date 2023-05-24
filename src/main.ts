import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import SplitType from 'split-type'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import ProfileCard from './ProfileCard'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(Flip)

const pages = gsap.utils.toArray('.page')

const pageScrollTween = gsap.to(pages, {
  xPercent: -100,
  stagger: 0.5,
  ease: 'none',
  scrollTrigger: {
    trigger: '.main-container',
    end: '+=1200%',
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

const renderProfileCard = () => {
  const cardContainer = document.querySelector<HTMLDivElement>('.about__card')
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })

  if (!cardContainer) return

  const width = cardContainer.offsetWidth
  const height = cardContainer.offsetHeight

  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)

  cardContainer.appendChild(renderer.domElement)

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

  const card = new ProfileCard({ width: 18, height: 24, radius: 0.7 })
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

    if (!cardContainer) return

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
    start: 'right 75%',
    end: 'right 60%',
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
      translateX: (index: number) => `${index * 30 + 130}rem`,
    },
    {
      stagger: {
        from: 'end',
        each: 0.1,
      },
      translateX: (index: number) =>
        `-${(manifestoItems.length - index) * 10}rem`,
    },
    '<'
  )

/**
 * Projects
 */
const tlProjects = gsap.timeline({
  scrollTrigger: {
    containerAnimation: pageScrollTween,
    trigger: '#page__manifesto',
    start: 'right center',
    end: 'right 0',
    scrub: 1,
  },
})

tlProjects.fromTo(
  '.preview__img-inner',
  {
    backgroundPosition: `0px 50%`,
  },
  {
    backgroundPosition: `-${window.innerWidth / 10}px 50%`,
  }
)

const previews = [...document.querySelectorAll('.project__preview')]
const contents = [...document.querySelectorAll('.project__content')]
const backButton = document.querySelector('.close')

const hoverPreview = (event: Event, type: 'enter' | 'leave') => {
  if (event.target instanceof HTMLElement) {
    const targetPjt = event.target.closest('.project__preview')
    const targetPjtPreviewImg = targetPjt?.querySelector('.preview__img-inner')

    if (!targetPjtPreviewImg) return

    gsap.to(targetPjtPreviewImg, {
      duration: 0.7,
      scale: type === 'enter' ? 1.2 : 1,
      ease: 'ease',
    })
  }
}

const ANIMATION_CONFIG = { duration: 1.5, ease: 'power3.inOut' }
let targetPjtIndex = 0
let targetPjt: Element | null = null
let targetPjtPreviewImg: Element | null = null
// let targetPjtContentImg: Element | null = null
let adjacentItems = []

const getAdjacentItems = (item: Element) =>
  previews.reduce((items, curr, i) => {
    if (i !== targetPjtIndex) items.push({ el: curr, index: i })
    return items
  }, [])

const showContent = (event: Event) => {
  if (!(event.target instanceof HTMLElement)) return

  targetPjt = event.target.closest('.project__preview')

  if (!targetPjt) return

  targetPjtIndex = previews.indexOf(targetPjt)
  targetPjtPreviewImg = targetPjt.querySelector('.preview__img')
  adjacentItems = getAdjacentItems(targetPjt)

  const tl = gsap
    .timeline({
      defaults: ANIMATION_CONFIG,
      onStart: () => {
        // content 영역 표시
        gsap.set(contents[targetPjtIndex], {
          zIndex: 5,
          opacity: 1,
        })
      },
    })
    .addLabel('start')

  // 인접한 previews 숨기기
  for (const item of adjacentItems) {
    tl.to(
      item.el,
      {
        x: item.index < targetPjtIndex ? -window.innerWidth : window.innerWidth,
      },
      'start'
    )
  }

  // flip images
  tl.add(() => {
    const state = Flip.getState(targetPjtPreviewImg)

    contents[targetPjtIndex].insertAdjacentElement(
      'afterbegin',
      targetPjtPreviewImg
    )

    Flip.from(state, {
      ...ANIMATION_CONFIG,
      absolute: true,
    })
  }, 'start')

  // back 버튼 표시
  tl.to(
    backButton,
    {
      zIndex: 5,
      opacity: 1,
    },
    'start'
  )

  // preview title 숨기기
  tl.to(
    targetPjt?.querySelector('.project__title-preview'),
    {
      opacity: 0,
    },
    'start'
  )
}

const hideContent = () => {
  // back 버튼 숨기기
  // content 숨기기
  // 인접한 preview 표시
}

previews.forEach((preview) => {
  preview.addEventListener('mouseenter', (e) => hoverPreview(e, 'enter'))
  preview.addEventListener('mouseleave', (e) => hoverPreview(e, 'leave'))
  preview.addEventListener('click', showContent)
})

backButton?.addEventListener('click', hideContent)

import { gsap } from 'gsap'
import ProjectContent from './ProjectContent'

interface ProjectPreviewDOM {
  container: Element | null
  image: Element | null
  imageInner: Element | null
  title: Element | null
}

interface ProjectPreviewProps {
  element: Element
  contentElement: Element
}

export default class ProjectPreview {
  DOM: ProjectPreviewDOM = {
    container: null,
    image: null,
    imageInner: null,
    title: null,
  }

  content: ProjectContent

  constructor({ element, contentElement }: ProjectPreviewProps) {
    this.DOM = {
      container: element,
      image: element.querySelector('.preview__img'),
      imageInner: element.querySelector('.preview__img-inner'),
      title: element.querySelector('.project__title-preview'),
    }
    this.content = new ProjectContent(contentElement)

    this.addEventListeners()
  }

  onHover(type: 'enter' | 'leave') {
    gsap.to(this.DOM.imageInner, {
      duration: 0.7,
      scale: type === 'enter' ? 1.2 : 1,
      ease: 'ease',
    })
  }

  addEventListeners() {
    this.DOM.container?.addEventListener(
      'mouseenter',
      this.onHover.bind(this, 'enter')
    )
    this.DOM.container?.addEventListener(
      'mouseleave',
      this.onHover.bind(this, 'leave')
    )
  }
}

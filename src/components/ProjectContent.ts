interface ProjectContentDOM {
  container: Element | null
  links: Element | null
  titleInner: NodeListOf<Element> | null
  introInner: NodeListOf<Element> | null
  details: Element | null
}

export default class ProjectContent {
  DOM: ProjectContentDOM = {
    container: null,
    links: null,
    titleInner: null,
    introInner: null,
    details: null,
  }

  constructor(element: Element) {
    this.DOM = {
      container: element,
      links: element.querySelector('.project__links'),
      titleInner: element.querySelectorAll('.title-inner'),
      introInner: element.querySelectorAll('.intro-inner'),
      details: element.querySelector('.project__details'),
    }
  }
}

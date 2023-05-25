interface ProjectContentDOM {
  container: Element | null
  links: Element | null
  title: Element | null
  intro: Element | null
  details: Element | null
}

export default class ProjectContent {
  DOM: ProjectContentDOM = {
    container: null,
    links: null,
    title: null,
    intro: null,
    details: null,
  }

  constructor(element: Element) {
    this.DOM = {
      container: element,
      links: element.querySelector('.project__links'),
      title: element.querySelector('.project__title-content'),
      intro: element.querySelector('.project__intro'),
      details: element.querySelector('.project__details'),
    }
  }
}

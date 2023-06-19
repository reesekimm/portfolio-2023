interface ProjectContentDOM {
  container: Element | null
  period: Element | null
  stacks: NodeListOf<Element> | null
  linkSectionTitles: NodeListOf<Element> | null
  links: NodeListOf<Element> | null
  titleInner: NodeListOf<Element> | null
  introInner: NodeListOf<Element> | null
  details: NodeListOf<Element> | null
}

export default class ProjectContent {
  DOM: ProjectContentDOM = {
    container: null,
    period: null,
    stacks: null,
    linkSectionTitles: null,
    links: null,
    titleInner: null,
    introInner: null,
    details: null,
  }

  constructor(element: Element) {
    this.DOM = {
      container: element,
      period: element.querySelector('.period-inner'),
      stacks: element.querySelectorAll('.stack'),
      linkSectionTitles: element.querySelectorAll(
        '.project__link-section-wrapper'
      ),
      links: element.querySelectorAll('.project__link'),
      titleInner: element.querySelectorAll('.title-inner'),
      introInner: element.querySelectorAll('.intro-inner'),
      details: element.querySelectorAll('.detail-inner'),
    }
  }
}

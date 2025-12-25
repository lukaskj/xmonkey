export class DomSelector {
  private static instance: DomSelector;
  private isSelecting = false;

  private constructor() {}

  public static getInstance(): DomSelector {
    if (!DomSelector.instance) {
      DomSelector.instance = new DomSelector();
    }
    return DomSelector.instance;
  }

  private getHighlightElement() {
    const highlightId = "__xmwp_highligh_dom_selector";

    const existingElement = document.getElementById(highlightId);
    if (existingElement) {
      return existingElement;
    }

    const highlightBox = document.createElement("div");
    highlightBox.id = highlightId;
    document.body.appendChild(highlightBox);

    return highlightBox;
  }

  private cleanUp() {
    document.body.removeChild(this.getHighlightElement());
    this.isSelecting = false;
  }

  public selectElementWithMouse<T extends HTMLElement = HTMLElement>(): Promise<T> {
    if (this.isSelecting) {
      return Promise.reject("Element selection is already in progress.");
    }

    this.isSelecting = true;
    const highlightElement = this.getHighlightElement();

    return new Promise<T>((resolve) => {
      const mouseOverHandler = (event: MouseEvent) => {
        const targetElement = event.target as T;
        if (!targetElement || targetElement === highlightElement) {
          return;
        }

        const rect = targetElement.getBoundingClientRect();
        highlightElement.style.width = `${rect.width}px`;
        highlightElement.style.height = `${rect.height}px`;
        highlightElement.style.top = `${rect.top + window.scrollY}px`;
        highlightElement.style.left = `${rect.left + window.scrollX}px`;
      };

      const clickHandler = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        cleanup();
        resolve(event.target as T);
      };

      const keyDownEvent = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          cleanup();
        }
      };

      const cleanup = () => {
        this.cleanUp();
        document.removeEventListener("mouseover", mouseOverHandler, true);
        document.removeEventListener("click", clickHandler, true);
        document.removeEventListener("keydown", keyDownEvent, true);
      };

      document.addEventListener("mouseover", mouseOverHandler, true);
      document.addEventListener("click", clickHandler, true);
      document.addEventListener("keydown", keyDownEvent, true);
    });
  }
}

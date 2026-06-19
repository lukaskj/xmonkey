export class DomSelector {
  private static instance: DomSelector;
  private isSelecting = false;
  private readonly highlightId = "__xmwp_highligh_dom_selector";

  private constructor() {}

  public static getInstance(): DomSelector {
    if (!DomSelector.instance) {
      DomSelector.instance = new DomSelector();
    }
    return DomSelector.instance;
  }

  private getExistingHighlightElement(): HTMLElement | null {
    return document.getElementById(this.highlightId);
  }

  private getHighlightElement() {
    const existingElement = this.getExistingHighlightElement();
    if (existingElement) {
      return existingElement;
    }

    const highlightBox = document.createElement("div");
    highlightBox.id = this.highlightId;
    document.body.appendChild(highlightBox);

    // highlightBox.style.border = "1px solid #A0C6E8";
    highlightBox.style.background = "#A0C6E820";
    highlightBox.style.zIndex = "999999";
    highlightBox.style.position = "absolute";
    highlightBox.style.userSelect = "none";
    highlightBox.style.pointerEvents = "none";

    return highlightBox;
  }

  private cleanUp() {
    this.getExistingHighlightElement()?.remove();
    this.isSelecting = false;
  }

  public selectElementWithMouse<T extends HTMLElement = HTMLElement>(): Promise<T> {
    if (this.isSelecting) {
      return Promise.reject(new Error("Element selection is already in progress."));
    }

    this.isSelecting = true;
    const highlightElement = this.getHighlightElement();

    return new Promise<T>((resolve, reject) => {
      let settled = false;

      const mouseOverHandler = (event: MouseEvent) => {
        const targetElement = event.target;
        if (!(targetElement instanceof HTMLElement) || targetElement === highlightElement) {
          return;
        }

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
        const targetElement = event.target;
        if (!(targetElement instanceof HTMLElement) || targetElement === highlightElement) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        cleanup();
        settled = true;
        resolve(targetElement as T);
      };

      const keyDownEvent = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          cleanup();
          settled = true;
          reject(new Error("Element selection cancelled."));
        }
      };

      const cleanup = () => {
        if (settled) {
          return;
        }

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

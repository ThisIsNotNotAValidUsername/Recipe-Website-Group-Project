class Page {
    static next_id = 0;
    static selected_page = null;
    constructor(element_id) {
        this.element_id = element_id;
        this.id = this.getNextID();
        if (Page.selected_page === null) {
            Page.selected_page = this;
            const page_element = document.getElementById(this.element_id);
            page_element.classList.remove("hidden");
        }
    }

    getNextID() {
        const id = Page.next_id;
        Page.next_id++;
        return id;
    }

    swap() {
        const selected_page_element = document.getElementById(Page.selected_page.element_id);
        selected_page_element.classList.add("hidden");
        Page.selected_page = this;
        const page_element = document.getElementById(this.element_id);
        page_element.classList.remove("hidden");
    }
}
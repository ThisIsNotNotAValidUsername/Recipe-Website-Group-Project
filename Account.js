// To the others, feel free to change this at will, just decided I would try and make some sort of template.
class Account {
    static next_account_id = 0;

    constructor(first_name, last_name, email, password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.account_id = incrementAccountID();
        image_src = this.getAccountImage();
        this.setAccountImage(image_src);
    }

    // Getters
    getFirstName() { return this.first_name; }
    getLastName() { return this.last_name; }
    getEmail() { return this.email; }
    getPassword() { return this.password; }

    // Setters
    setFirstName(first_name) { this.first_name = first_name; }
    setLastName(last_name) { this.last_name = last_name; }
    setEmail(email) { this.email = email; }
    setPassword(password) { this.password = password; }

    // Increment account ID
    // Will likely need to move this to the backend
    incrementAccountID() {
        const id = Account.next_account_id;
        Account.next_account_id++;
        return id;
    }

    getAccountImage() {
        let img_src = "";
        // Fetch the image from the database

        // End Fetch
        // Placeholder, to be added if the fetch fails as well
        if (img_src === "") {
            img_src = "Default Images/Account_Image_Placeholder.webp";
        }
        return img_src;
    }

    setAccountImage(image_src) {
        const account_image_element = document.getElementById("account_image");
        account_image_element.src = image_src;
    }
}
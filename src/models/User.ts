interface Iuser {
    name: string
    password: string
}

type login = {
    (user: Iuser): void;
};

export class User implements Iuser {
    name: string
    password: string
    private login: login;

    constructor(name: string, password: string, login: login) {
        this.name = name;
        this.password = password;
        this.login = login
    }
    onClickLogin() {
        this.login({ name: this.name, password: this.password });
    }

}


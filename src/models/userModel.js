export default class UserModel {
    constructor(id, name, email, password, contact, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.role = role;
    }

    static getAllUsers() {
        return users;
    }

    static registerUserModel(name, email, password, contact, role) {
        const newUser = new UserModel(users.length + 1, name, email, password, contact, role);
        users.push(newUser);
    }

    static getUserByIdModel(id) {
        return users.find(user => user.id === id);
    }

    static loginValidUser(email, password) {
        const userExist = users.find(user => user.email === email && user.password === password);

        return userExist;
    }
}


var users = [
    new UserModel(1, "Ajay Gandhi", "avgfx15@gmail.com", 'aaaaaa', 7016046462, 'Job Seeker'),
    new UserModel(2, "Hitesh Gandhi", "hvg2411@gmail.com", 'aaaaaa', 9998814477, 'Job Seeker'),
    new UserModel(3, "Dhvani Gandhi", "dag1756@gmail.com", 'aaaaaa', 9499518222, 'Recruter'),
    new UserModel(4, "Rilpa Gandhi", "rag14584@gmail.com", 'aaaaaa', 9377114477, 'Recruter'),
]
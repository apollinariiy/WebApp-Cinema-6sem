class UserDto {
    constructor(model) {
        this.id = model.id;
        this.surname = model.surname;
        this.name = model.name;
        this.email = model.email;
        this.phone = model.phone;
        this.role = model.role;
    }
}

module.exports = UserDto;
    
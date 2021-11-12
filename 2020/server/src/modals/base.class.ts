//base class for the class which uses thrughout the system
abstract class Base {

    //common properties
    public id: number | undefined
    public created: Date | undefined
    public updated: Date | undefined

    constructor(base: Base) {
        this.id = base.id
        this.created = new Date()
        this.updated = new Date()
    }
}

export default Base
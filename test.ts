interface IA {
    name: string;
}

class A implements IA {
    name: string;
    constructor() {
       this.name = '11'; 
    }
}

const a:IA = new A();

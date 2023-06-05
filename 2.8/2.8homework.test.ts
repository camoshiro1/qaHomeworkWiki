class Animal {
    name: string;
    sound: string;
    food: string;
    constructor(name: string, sound: string, food: string) {
        this.name = name;
        this.sound = sound;
        this.food = food;
    }
    soundOff(): string {
        return `The ${this.name} makes the sound "${this.sound}".`;
    }
}

/**
* Fish extends Animal, but takes different properties, has a different soundOff() method, and a new method, habitat().
* @param {string} name - as expected
* @param {string} food - as expected
* @param {string} saltwater - true if the fish is a saltwater fish
*/
class fish extends Animal {
    saltwater: boolean; // required param for the fish class that is unique to the fish class
    constructor(name: string, food: string, saltwater: boolean) { //construtor is the one that pulls over
        super(name, null, food); // pulling from the class we extended, it is a shortcut
        this.saltwater = saltwater; // adding new params into the constructoe to be able to use outside of class
    }
    soundOff(): string { //adding the methods
        return `The ${this.name} is a fish and does not make sounds.`;
    };
    habitat(): string {
        return `The ${this.name} is a ${this.saltwater ? "saltwater" : "freshwater"}` // its giving 2 options - left (true) right (false)
        // ? means options for true/false
    }

}

/**
* Bird extends Animal, but takes an additional property, and has an additional method, fly().
* @param {string} name - as expected
* @param {string} sound - as expected
* @param {string} food - as expected
* @param {number} flightSpeed - the flight speed of the bird, in meters/second. This should be 0 for flightless birds.
*/

class Bird extends Animal {
    flightSpeed: number;
    constructor(name: string, sound: string, food: string, flightspeed: number) {
        super(name, sound, food);
        this.flightSpeed = flightspeed;
    }

    fly(): string {
        if (this.flightSpeed > 0)
            return `The ${this.name} flies at speed of up to ${this.flightSpeed} meters per second`
        else return `The ${this.name} is a flightless bird.`;
    }
}

describe("Testing animals", () => {
    test("a basic animal works as expected", () => {
        let lion = new Animal("lion", "roar", "meat");
        // lion is an animal
        expect(lion instanceof Animal).toBeTruthy();
        // lion.soundOff() has the expected output
        expect(lion.soundOff()).toBe('The lion makes the sound "roar".');
    });
    describe("Fish", () => {
        // Fish should only have the three parameters listed.
        let goldfish = new fish("goldfish", "pellets", false);
        let shark = new fish("shark", "fish", true);
        it("are animals", () => {
            // Fish *must* extend Animal
            expect(goldfish instanceof Animal).toBeTruthy();
        });
        it("doesn't make sound", () => {
            // Fish should give the expected soundOff, it's own version
            expect(goldfish.soundOff()).toBe(
                "The goldfish is a fish and does not make sounds."
            );
        });
        it("can be saltwater or freshwater", () => {
            // Fish gives the right habitat string based on the `saltwater` property
            expect(goldfish.habitat()).toBe("The goldfish is a freshwater fish.");
            expect(shark.habitat()).toBe("The shark is a saltwater fish.");
        });
    });
    describe("Birds", () => {
        // Bird should actually take four arguments
        let swallow = new Bird("swallow", "chattering chirp", "insects", 11);
        let emu = new Bird("emu", "grunt", "plants and insects", 0);
        it("are animals", () => {
            // Bird *must* extend Animal
            expect(swallow instanceof Animal).toBeTruthy();
        });
        it("make sounds", () => {
            // Bird uses the standard soundOff
            expect(swallow.soundOff()).toBe(
                'The swallow makes the sound "chattering chirp".'
            );
        });
        it("might be able to fly", () => {
            // Bird have a new method using the fly speed to give us these strings
            expect(swallow.fly()).toBe(
                "The swallow flies at speed of up to 11 meters per second"
            );
            expect(emu.fly()).toBe("The emu is a flightless bird.");
        });
    });
});
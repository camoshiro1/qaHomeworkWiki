import {
    Builder,  // build a new instant of chrome when used with chromedriver
    By,   //allows tester to excess elemenrs on the web page using the dom or the doc object
    Capabilities, // allows tester to use chrome capabilities with the browser
    until, // makes the automation wait until the element is found accaunting for 
    WebDriver, // what we use to accessthe DOM in order to complete tasks
    WebElement, //samthong as WebDriver just element specific
    Key, // or keys is just the keys on a keyboard this allows for typing in inpus or hitting common keys
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();
const bernice: By = By.name("employee1");
const marnie: By = By.name("employee2");
const phillip: By = By.name("employee3");
const nameDisplay: By = By.id("employeeTitle");
const nameInput: By = By.name("nameEntry");
const phoneInput: By = By.name("phoneEntry");
const titleInput: By = By.name("titleEntry");
const saveButton: By = By.id("saveBtn");
const cancelButton: By = By.name("cancel");
const errorCard: By = By.css(".errorCard");

describe("Employee Manager 1.2", () => {

    beforeEach(async () => {
        await driver.get(
            "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html" // what does it mean? first - go to this url?
        );
    });
    afterAll(async () => { // it means that after done to stop running?
        await driver.quit();
    });
    describe("handles unsaved, canceled, and saved changes correctly", () => {
        test("An unsaved change doesn't persist", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Edit the name input
            3. Open Phillip Weaver
            4. Open Bernice Ortiz
            5. Verify the name field is the original name
            */
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys("Test Name");
            await driver.findElement(phillip).click();
            await driver.wait(
                until.elementTextContains(
                    await driver.findElement(nameDisplay),
                    "Phillip"
                )
            );
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementTextContains(
                    await driver.findElement(nameDisplay),
                    "Bernice"
                )
            );
            expect(
                await (await driver.findElement(nameInput)).getAttribute("value")
            ).toBe("Bernice Ortiz");
        });

        test("A canceled change doesn't persist", async () => {  // async?
            /*
            This test follows these steps:
            1. Open Phillip Weaver
            2. Edit the name input
            3. Click cancel
            5. Verify the name field is the original name
            */
            await driver.findElement(phillip).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys("Test Name");
            await driver.findElement(cancelButton).click();
            expect(
                await (await driver.findElement(nameInput)).getAttribute("value")
            ).toBe("Phillip Weaver");
        });

        test("A saved change persists", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Edit the name input
            3. Save the change
            4. Open Phillip Weaver
            5. Open Bernice Ortiz's old record
            5. Verify the name field is the edited name
            */
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys("Test Name");
            await driver.findElement(saveButton).click();
            await driver.findElement(phillip).click();
            await driver.wait(
                until.elementTextContains(
                    await driver.findElement(nameDisplay),
                    "Phillip"
                )
            );
            await driver.findElement(bernice).click();
            expect(
                await (await driver.findElement(nameInput)).getAttribute("value")
            ).toBe("Test Name");
        });
    });

    describe("handles error messages correctly", () => {
        test("shows an error message for an empty name field", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            */
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement(saveButton).click();
            await driver.wait(until.elementLocated(errorCard));
            expect(await (await driver.findElement(errorCard)).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
        });
        test("lets you cancel out of an error message", async () => {
            /*
            This test follows these steps:
            1. Open Bernice Ortiz
            2. Clear the name input
            3. Save the change
            4. Verify the error is present
            5. Cancel the change
            6. Verify the error is gone
            */
            await driver.findElement(bernice).click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement(nameInput))
            );
            await driver.findElement(nameInput).clear();
            await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement(saveButton).click();
            await driver.wait(until.elementLocated(errorCard));
            expect(await (await driver.findElement(errorCard)).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
            await driver.findElement(nameInput).sendKeys(Key.SPACE);
            await driver.findElement(cancelButton).click();
            driver.wait(() => true, 500);
            expect(await driver.findElements(errorCard)).toHaveLength(0);
        });
    });
});

import { Builder, By, Capabilities, until, WebDriver, } from "selenium-webdriver";
const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

class employeePage {
    driver: WebDriver;
    url: string = "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html";
    //FILL OUT LOCATORS CONSTRUCTOR AND METHODS IN ORDER TO PASS THE TEST
    //locators
    header: By = By.css('.titleText');
    addEmployee: By = By.xpath('//li[@name="addEmployee"]');
    newEmployee: By = By.css('[name="employee11"]');
    nameInput: By = By.name('nameEntry');
    phoneInput: By = By.name('phoneEntry');
    titleInput: By = By.name('titleEntry');
    saveBtn: By = By.id('saveBtn');
    //constructors
    constructor(driver: WebDriver) {
        this.driver = driver
    }
    //methods = similar to functions but using classes --- put parameters in the parenthesis
    async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.header));
    };
    async click(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        return (await this.driver.findElement(elementBy)).click();
    };
    async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).sendKeys(keys);
    };
}


const emPage = new employeePage(driver) // in order to use the methods we should create the const (its setting the new instance  of class)

describe("Employee Manger Test", () => {
    beforeEach(async () => {
        await emPage.navigate();
    })
    afterAll(async () => {
        await emPage.driver.quit()
    })
    test("adding an employee", async () => {  //whats the difference driver and emPage
        await emPage.click(emPage.addEmployee)
        await emPage.click(emPage.newEmployee)
        await emPage.click(emPage.nameInput)
        await driver.findElement(emPage.nameInput).clear()
        await emPage.sendKeys(emPage.nameInput, "Change This")
        await emPage.click(emPage.phoneInput)
        await driver.findElement(emPage.phoneInput).clear()
        await emPage.sendKeys(emPage.phoneInput, "Change This")
        await emPage.click(emPage.titleInput)
        await driver.findElement(emPage.titleInput).clear()
        await emPage.sendKeys(emPage.titleInput, "Change This")
        await emPage.click(emPage.saveBtn)
    })
});

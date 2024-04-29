const { Builder, By, Key, until } = require('selenium-webdriver');

class OnlineStoreTest {
    constructor() {
        this.driver = new Builder().forBrowser('chrome').build();
    }

    async searchProduct(keyword) {
        try {
            await this.driver.get('https://www.21vek.by/'); 
            const acceptButton = await this.driver.findElement(By.xpath("//div[@class='Button-module__buttonText' and text()='Принять']")); 
            await acceptButton.click(); // Нажимаем на кнопку
            const searchInput = await this.driver.findElement(By.id('catalogSearch'));
            await searchInput.sendKeys(keyword, Key.RETURN);
            console.log('Перешло');
            await this.driver.wait(until.titleContains(keyword), 5000); 
            
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return null;
        }
    }
}

(async () => {
    const onlineStoreTest = new OnlineStoreTest();
    const searchResult = await onlineStoreTest.searchProduct('Samsung');
    await onlineStoreTest.close();
})();

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
            console.log('Перешли');
            await this.driver.wait(until.elementTextContains(this.driver.findElement(By.xpath("//*[@id='j-result-page-1']/div[1]/div/ul/li[1]/dl/dt/a/span[2]")), keyword), 5000);
            return true;
        } catch (error) {
            console.error('Произошла ошибка:', error);
            return null;
        }
    }
    
    async close() {
        try {
            await this.driver.quit(); // закрываем браузер
        } catch (error) {
            console.error('Произошла ошибка при закрытии браузера:', error);
        }
    }
}

(async () => {
    const onlineStoreTest = new OnlineStoreTest();
    const searchResult = await onlineStoreTest.searchProduct('Samsung');
    console.log(searchResult);
    await onlineStoreTest.close(); // закрываем браузер после выполнения теста
})();

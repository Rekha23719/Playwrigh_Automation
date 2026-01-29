const {test,expect} = require('@playwright/test'); // it will impots the playwright testing liberary 


test .only("End-To-End Web Automation" , async({browser}) => { 
  
    const context = await browser.newContext();
    const page = await context.newPage();
    const productname = "ADIDAS ORIGINAL";
    const email = "finedev@gmail.com";
    const value = "4542 9931 9292 2293";
    const products = await page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('[type="email"]').fill(email);
    await page.locator('input#userPassword').fill("Finedev@000");
    await page.locator('[value="Login"]').click();
    await page.locator(".card-body b").first().waitFor();
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title);
    const Count = await  products.count();
    for (let i=0; i<Count ; i++)
    {
        if(await products.nth(i).locator("b").textContent() === productname )
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
   await page.locator("[routerlink*=cart]").click();
   //await page.pause(); 
   await page.locator('div li').first().waitFor();
   const bool =  await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
     await page.locator("[placeholder='Select Country']").pressSequentially("Ind",{ delay: 150 });
     //delay: 150 means i ki 100 milliseconds n ki 100 milliseconds like that
    const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   expect(page.locator(".user__name  [type='text']").first()).toHaveText(email);
   await expect(page.locator(".field [type='text']").first()).toHaveValue(value);
   //await page.locator("[fdprocessedid='c']").fill("finedev");
    await page.locator(".action__submit ").click();
    expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
describe('making a post', function() {
    it('logs in and creates a new post', function () {
        browser.get('http://localhost:1172')
        element(by.css('nav .login')).click()
        
        
        element(by.model('username')).sendKeys('muru')
        element(by.model('password')).sendKeys('muru123')
        
        element(by.css('form .btn')).click()
    })
    
   // browser.pause()
    
})
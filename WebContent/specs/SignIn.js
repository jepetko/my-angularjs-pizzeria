describe('Sign in', function() {

	var login, password, btn = null;

    beforeEach(function() {
        browser.get('http://localhost:8080/my-angularjs-pizzeria');
    });
    
    beforeEach(function() {
	    login = element(by.name('login'));
	    password = element(by.name('password'));
	    btn = element(by.css('.btn'));	
    });
    
    describe('login credentials are correct', function() {
    	
    	beforeEach(function() {
		    login.sendKeys('hansi');
		    password.sendKeys('huber');
		    btn.click();    	    		
    	});
    	
    	it('redirects to the app url', function() {
    		expect(browser.getCurrentUrl()).toContain('http://localhost:8080/my-angularjs-pizzeria/app.jsp');
    	});
    	
        it('shows the users name', function () {
            var menu = element(by.css('.dropdown-toggle'))
            expect(menu.getAttribute('innerText')).toMatch(/hansi/g);
        });
    });
    
    describe('login credentials are wrong', function() {

    	beforeEach(function() {
		    login.sendKeys('wrong');
		    password.sendKeys('user');
		    btn.click();    	    		
    	});

    	it('remains at the login page', function() {
    		expect(browser.getCurrentUrl()).not.toContain('app.jsp');	
    		expect(browser.getCurrentUrl()).toContain('login');
    	});
    });
});
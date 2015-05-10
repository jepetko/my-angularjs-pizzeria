describe('Adding products to the bag', function() {

	/*
	it('adds 3 margarithas to the bag if the user puts the value 3 into the according text field', function() {
		expect(true).toBe(true);
	});
	*/
	
    beforeEach(function() {
        browser.get('http://localhost:8080/my-angularjs-pizzeria');
    });

    it('signs in successfully', function () {
        var login = element(by.name('login'));
        var password = element(by.name('password'));

        login.sendKeys('hansi');
        password.sendKeys('huber');
        btn.click();
    });	
});
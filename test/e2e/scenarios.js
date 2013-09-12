describe('SVR scenario Test', function(){
	describe('Setup item view', function(){
		
		beforeEach(function(){
			browser().navigateTo('/');
		});

		it('redirects to /setup/', function(){
			expect(browser().location().url()).toEqual('/setup');
		})

		it('adds four time ranges', function(){
      		expect(repeater('.m-time-bar-range').count()).toBe(5);
		});

		it('removes and adds range', function(){
			element(".m-time-bar-range:eq(0) .m-time-bar-range-remove-btn").click();
			expect(repeater('.m-time-bar-range').count()).toBe(3);
			element(".m-time-bar-needle-add-btn:eq(0)").click();
			expect(repeater('.m-time-bar-range').count()).toBe(4);
		})

	});	

});
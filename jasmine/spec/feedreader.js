/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('contain a URL and the URL is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(typeof feed.url).toBe('string');
                expect(feed.url).not.toBe('');
            });
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name and the name is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toBe('string');
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            /*
            To determine whether or not the menu is hidden by default, the body
            element is tested to see if it contains the menu-hidden class. As
            suggested by a Udacity reviewer, I made the change from using jQuery's
            .attr('class') method to the .hasClass method. In doing so, the body
            element can be tested to see if it contains the menu-hidden class,
            even when it contains other classes.
            */
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            /*
            The following Stack Overflow discussion helped me in deciding to use
            jQuery's .trigger() method for this test:
            https://stackoverflow.com/questions/10823790/testing-a-click-event-with-jasmine-that-appends-a-style-sheet-to-the-head
            */

            /*
            Like the test above, this test was reworked using jQuery's .hasClass
            method. After the menu icon is clicked initially, the body element
            should not contain the menu-hidden class.
            */
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            /*
            The menu icon is clicked again, which should hide the menu. The body
            should contain the menu-hidden class.
            */
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // First call the loadFeed function with the first (default) feed passed in
        beforeEach(function(done) {
            /*
            As suggested by a Udacity reviewer, this loadFeed function call was
            simplified, since there wasn't any code inside of it.
            */
            loadFeed(0, done);
        });

        /*
        After the loadFeed function is completed, begin the actual test.
        Since it was redundant, the done callback function was removed,
        as suggested by a Udacity reviewer.
        */
        it('are loaded and there is at least a single entry', function() {
            /*
            Determine whether or not at least one .entry element exists within
            the .feed container.
            jQuery site (https://api.jquery.com/find/) used as a reference.
            */
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // Declare these variables outside of the functions below
        var oldFeed;
        var newFeed;
        beforeEach(function(done) {
            // Load the first feed and save its first entry to a variable
            loadFeed(0, function() {
                oldFeed = $('.feed').find('.entry')[0];

                // Load the second feed and save its first entry to a variable
                loadFeed(1, function() {
                    newFeed = $('.feed').find('.entry')[0];
                    done();
                });
            });
        });

        it('changes content', function(done) {
            // Compare the two variables. They should be different.
            expect(oldFeed !== newFeed).toBe(true);
            expect(oldFeed).toBeDefined();
            expect(newFeed).toBeDefined();
            done();
        });
    });
}());

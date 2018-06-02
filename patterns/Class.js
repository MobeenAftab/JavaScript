/**
 * Creating class/namespace definition based object in JavaScript
 * 
 */

/**
 * Set up class namespace
 * Invoking this function will return an object
 * Object can have public and private variables and functions
 */
function class_name() {

    /* Define main object to be returned */
    var main_object = {};

    /**
     * Public functions attached to main_object
     * Can be accessed by returned main_object
     */

    main_object.hello_world = function () {
        console.log('Hello, World!');
    }

    main_object.goodbye = function () {
        console.log('Goodbye');
    }

    /**
     * Set user name of private variable
     * @param {*} name name to be set
     */
    main_object.set_user = function (name) {
        set_name(name);
    }

    /**
     * Call private function using public function
     */
    main_object.hello_user = function () {
        hello_you();
    }

    /**
     * Private variables
     */

    var user_name = '';

    /**
     * Private functions attached to main_object
     */

    hello_you = function () {
        console.log('Hello, ', this.name);
    }

    set_name = function (name) {
        this.name = name;
    }

    /**
     * Return main_object to caller and create class instance
     */
    return main_object;
}

/**
 * Running tests on class_name
 */

/**
 * Set up new instance of class_name called class_test
 */
var class_test = new class_name();

/**
 * Inspect object in console log to view avalible methods of main_object
 */
console.log(class_test);

/**
 * Call public functions
 */
class_test.hello_world();
class_test.goodbye();
class_test.set_user('Mobeen Aftab');
class_test.hello_user();

/**
 * Call to private functions will fail
 */
// class_test.hello_you();
// class_test.set_name('Mobeen Aftab');
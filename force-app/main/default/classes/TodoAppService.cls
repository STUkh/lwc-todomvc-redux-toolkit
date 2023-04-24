public with sharing class TodoAppService {
    @AuraEnabled(cacheable=true)
    public static String todoWireAdapter() {
        return '[{"id":1,"todo":"Do something nice for someone I care about","completed":true,"userId":26,"title":"Do something nice for someone I care about"},{"id":2,"todo":"Memorize the fifty states and their capitals","completed":false,"userId":48,"title":"Memorize the fifty states and their capitals"},{"id":3,"todo":"Watch a classic movie","completed":false,"userId":4,"title":"Watch a classic movie"},{"id":4,"todo":"Contribute code or a monetary donation to an open-source software project","completed":false,"userId":48,"title":"Contribute code or a monetary donation to an open-source software project"}]';
    }
}
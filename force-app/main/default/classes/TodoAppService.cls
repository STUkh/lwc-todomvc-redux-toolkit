public with sharing class TodoAppService {
    @AuraEnabled(cacheable=true)
    public static String todoWireAdapter() {
        return '[{"id": "firstId", "title": "Test todo 1", "completed": false }, { "id": "secondId", "title": "Test todo 2", "completed": true }, { "id": "thirdId", "title": "Test todo 3", "completed": false }]';
    }
}
public with sharing class AccountDetailsController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(String accId) {
        return [SELECT Id, FirstName, Title, LastName FROM Contact WHERE AccountId = :accId AND (Title = 'Customer Success' OR Title = 'Application Developer')];
    }
}

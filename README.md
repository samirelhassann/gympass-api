## RFs

- [ ] Should be possible to sign in;
- [ ] Should be possible to authenticate;
- [ ] Should be possible to get the logged user profile;
- [ ] Should be possible to do a check-in on a gym;
- [ ] Should be possible to get the check-ins quantity of the logged user;
- [ ] Should be possible to the user get the check-ins history;
- [ ] Should be possible to get the near gyms;
- [ ] Should be possible to search gyms by name;
- [ ] Should be possible to validate the check-in of a user;
- [ ] Should be possible to register a gym;

## RNs

- [ ] The user can not register with duplicated e-mail;  
- [ ] The user can not make 2 check-ins in the same day;  
- [ ] The user can not make check-in far from a gym;  
- [ ] The check-in must only be validated after 20 minutes after has been created;
- [ ] The check-in must only be validated by admin;
- [ ] Gyms can only be registered by admins;

## RNFs

- [ ] The user password must be encrypted;
- [ ] The application data must be persisted on a PostgreSQL database;
- [ ] The data list must be paginated by 20 items by page;
- [ ] The user must be identified by a JWT token;

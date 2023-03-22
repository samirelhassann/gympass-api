## gympass-api (In Progress)

## RFs

- [x] Should be possible to sign in;
- [x] Should be possible to authenticate;
- [x] Should be possible to get the logged user profile;
- [x] Should be possible to do a check-in on a gym;
- [x] Should be possible to register a gym;
- [x] Should be possible to get the check-ins quantity of the logged user;
- [x] Should be possible to the user get the check-ins history;
- [x] Should be possible to get the near gyms until 10 km;
- [x] Should be possible to search gyms by name;
- [ ] Should be possible to validate the check-in of a user;

## RNs

- [x] The user can not register with duplicated e-mail;
- [x] The user can not make 2 check-ins in the same day;
- [x] The user can not make check-in far from a gym;
- [x] The check-in must only be validated after 20 minutes after has been created;
- [ ] The check-in must only be validated by admin;
- [ ] Gyms can only be registered by admins;

## RNFs

- [x] The user password must be encrypted;
- [x] The application data must be persisted on a PostgreSQL database;
- [x] The data list must be paginated by 20 items by page;
- [ ] The user must be identified by a JWT token;

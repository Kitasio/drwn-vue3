# DRWN TODO

1. create sectors page admin
2. create sectors page user

### 12:00 - 13:30
---
1. sectors tab in admin page

---
1. see if you can deploy test version
2. cloud functions to change if user doesen't pay

---
### Subscription logic
1. When user pays save to db timestamp and subscriber: true
2. On every access to content check if today time passed the timestamp (also check if timestamp exists)
3. If it does send request to cloudpayments to get the new timestamp and status
4. If status active save the new timestamp
5. Else delete the timestamp and set subscriber to false

---
1. топбар вход
2. проверка пароля при регистрации
3. +подписаться кнопка на подписан если есть аккаунт
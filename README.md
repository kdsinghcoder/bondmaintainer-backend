# bondmaintainer-backend
![issue](https://img.shields.io/github/issues/kdsinghcoder/bondmaintainer-backend)
![GitHub language count](https://img.shields.io/github/languages/count/kdsinghcoder/bondmaintainer-backend)
![version](https://img.shields.io/github/package-json/v/kdsinghcoder/bondmaintainer-backend)
![image](https://user-images.githubusercontent.com/50829119/120977728-49f65d80-c791-11eb-875e-92b424ebe963.png)

### Hosted on
 <a href="https://bondmaintainer.herokuapp.com/">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Open sayhello">
</a>

## Intro

In today's world, everybody is busy on their own and no one has time for anyone. Taking this aspect, We aim in building software that will help a person manage his/her relationships or bondings with others effectively. The objective of the Bond Maintainer web-app will be to maintain a strong bonding with any person that may be his/her relatives, friends, or any random person he just met. This software will help to keep minute details of a person with whom you wanna keep in
contact.

### Scope
 The Bond Manager will automate the following processes:
 
- Bond Maintainer will contain reminders like traveling details of your friend, their birth dates, and some other important data related to them.
- Users will be getting a reminder they had to greet them on their birthday and wish them on their journey.
- This software will be the ultimate tool for a person to make a good and healthy circle around them.
- This software can be used by technical companies' HR teams to maintain healthy relationships between employees.
- Any common man can also use this app to maintain healthy relationships with their friends,relatives, or any other person.

### SMS 
![image](https://user-images.githubusercontent.com/50829119/123985446-1b138600-d9e3-11eb-9903-14c8e7c28719.png)


## Dependency
```
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.19.0",
    "connect-flash": "^0.1.1",
    "dotenv": "^10.0.0",
    "ejs": "^2.6.1",
    "express": "^4.16.4",
    "express-ejs-layouts": "^2.5.0",
    "express-session": "^1.15.6",
    "mongoose": "^5.12.3",
    "multer": "^1.4.2",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0"
```

## Running on Local System 

Running the project on local system is **strongly recommended**, even if you are not working on the backend. This is becuase to test the middlewars, client applications, or any other component, an instance of Bond Maintainer server is required. Make sure that you have a mongodb instance running. This step might be different depending on your installation type. If you do not have mongodb database installed, refer [this link](https://docs.mongodb.com/manual/administration/install-community/)

- Clone the repository to your system using `git clone https://github.com/bondmaintainer/bondmaintainer-backend`
- Now open the cloned repository using `cd bondmaintainer-backend`
- The project depends on numerous npm packages. Install them using `yarn install` or `npm install`
- Run `yarn start` or `npm start` to launch a development server.
- Open [localhost:5000](http://localhost:5000) and ensure that the server is running.

## Arcitcture 

### DATA FLOW DIAGRAM
![image](https://user-images.githubusercontent.com/50829119/123984234-18646100-d9e2-11eb-95be-b87be8c7f68b.png)

### Activity Diagram
![activity](https://user-images.githubusercontent.com/50829119/123984328-2b773100-d9e2-11eb-849d-a08c694b8bd1.png)

### Sequence Diagram
![image](https://user-images.githubusercontent.com/50829119/123985996-8d846600-d9e3-11eb-9e87-4ab6dd723360.png)



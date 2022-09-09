# FrameWall
FrameWall is a simple and fast photography social network. It is built with Silence and is no longer maintained from early 2021. It was a fun project to learn web development and to try out new technologies and ideas according to the recommendations of professors. It was carried out in the context of the subject "Introduction to Software Engineering and Information Systems II" of the degree in Software Engineering at the University of Seville.

## Prerequisites
- [Python 3.10+](https://www.python.org/downloads/)
- [MariaDB 10.9+](https://mariadb.org/download/?t=mariadb&p=mariadb&r=10.9.2&os=windows&cpu=x86_64&pkg=msi&m=ptisp)
- [HeidiSQL 12.1+](https://www.heidisql.com/download.php)
- [Silence 1.2.4](https://github.com/DEAL-US/Silence)

## Installation
1. Install the latest Python version available for your operating system.
2. Install MariaDB from the link above. Inside its installation assistant, you will be asked to change the default root password. Remember it, you will need it later.
3. Install HeidiSQL from the link above. 
4. Once we have all these programs installed, we open HeidiSQL and enter the root password that we set in the previous step. We will see a list of databases. We open a new console tab and execute the following command:
`CREATE DATABASE framewall`
5. We will see that the database has been created (refresh if you don't). We will now create a new user for the database. Go to Tools tab and click on User Administrator, and add a new user with the default parameters:
    > username: iissi_user 
    >
    > password: iissi$user

    Then, we add an object to the user and click on the framewall database. Once we added it, we check all the boxes for it. Finally, we save everything and exit the program.

6. Now it's time to install Silence framework. Since I did this project a long time ago, the latest version of this framework has caused several incompatibilities with the project. Therefore, we will install an specific version of it. To do so, we open a new Command Prompt and execute the following command:
`pip install Silence==1.2.4`

7. At this point, we have all the prerequisites installed. Now we will clone the project. To do so, we open a new command prompt and execute the following commands:
    
    ```
    git clone https://github.com/IsmaelP19/Proyecto-FrameWall
  
    cd Proyecto-FrameWall
  
    silence createdb
  
    silence run
    ```
  
   If any of these commands give you an error, it is probably because you haven't create the user or database correctly, or you haven't granted the correct privileges to the user.

   If the last command is the only one that shows you the error `cannot import name 'escape' from 'jinja2'`, you will have to uninstall flask and install it again. To do so, execute the following commands:
    ```
    pip uninstall flask
    
    pip install flask==2.1.0
    ```

8. If you have reached this point, you should be able to run correctly the project. To do so, run the following command: `silence run`.

9. At this point, you should be able to access the project from the following link: [http://localhost:8080](http://localhost:5000). 


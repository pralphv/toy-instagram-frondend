# toy-instagram-frondend
This repo is the frontend of the project Toy Instagram. The project is built with ReactJS. The backend used in this repo is https://github.com/pralphv/toy-instagram-backend. <a href="https://toy-instagram-frontend.herokuapp.com/">
  
Live Demo</a>

![alt text](https://github.com/pralphv/toy-instagram-frondend/blob/master/ezgif.com-crop.gif)
## Getting Started
Clone the repo
Install dependencies. Yarn is recommended.
```
yarn install
```
Change backendUrl in *config.js*. Feel free to also change localStorage name.
```
export const localStorageName = "instatest";
export const backendUrl = "http://127.0.0.1:5000/";  // change 
```
## Start the Server
```
npm start
```
The website will be opened by your browser. If you do not have the backend server running, you should see "Server Error".
## Coverage
![alt text](https://github.com/pralphv/toy-instagram-frondend/blob/master/fe_coverage.png)
## What's left
The biggest issue with the project currently is the low test coverage. This is mainly due to my lack of knowledge in how to test special cases properly. Here are some cases that I have not been able to solve:
1. It seems that methods of classes that are wrapped inside withRouter could not be spied on. I have tried removing withRouter from the components, and methods could then be spied on correctly. A workaround is to pull out static methods out of the component class. However, some methods affect the state of the class and thus is hard to pull out. Of course, the state could be changed even by outside functions. My personal opinion is if the workaround requires more complex code and results in hard-to-read code, then it is not worth it. Thus, I have left these methods untested. If there is anyone who knows how to test component class methods wrapped inside a withRouter, I would really appreciate it if you could comment the proper way to test them. The problematic files include: *login.js*, *register.js*.
2. For some reason, I could not mock an input for input files. I have tried several solutions from Stackoverflow, but none of them seem to work. Etc. https://stackoverflow.com/questions/39702776/files-upload-testing-in-enzyme. This has led to my inability to test file inputs. The affected file is: *upload.js*.

Point 1 in particular has left many methods untested. This is the main reason for the low test coverage.
### Optimizations
- Cacheing images
- Optimize/compress images
- Lazy load posts

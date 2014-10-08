# FrontEnd website

 - the website is a conventional structure that uses Hexo generator
 - theme and articles are submodules
 - file .gitmodules is committed, so there is no need to care about 

<br><br>

## clone repo with (submodules) theme and articles

**clones repo to the folder “frontend”**  
`git clone https://github.com/frontendsk/website frontendsk`  
`cd frontendsk`  
	
**clone submodules to the subfolders by the hexo convention**  
`npm install # install hexo packages`  
`cd themes/theme-v3/ # go to the theme`  
`nom install # install themes packages`  

<br><br>

## how to run repo in hexo generator

**install hexo static generator**  
`npm install -g hexo # should ask for sudo`  

**run hexo on your localhost:4000**  
`hexo server`  
    
**generate final static website that is deployed**  
`hexo generate # create the static content`  
`cd public # go to the generating folder`  
`python -m SimpleHTTPServer 5000 # serving to localhost:5000`  


<br><br>

Author: Samuel Ondrek